
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Referral = require('../models/Referral');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// @route   POST api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { email, password } = req.body;
  
  try {
    // Check if admin exists
    let admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    
    // Generate JWT
    const payload = {
      admin: {
        id: admin.id,
        role: admin.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, admin: { name: admin.name, email: admin.email, role: admin.role } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin only)
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    // Get counts
    const userCount = await User.countDocuments();
    const transactionCount = await Transaction.countDocuments();
    const pendingTransactions = await Transaction.countDocuments({ status: 'pending' });
    const totalWithdrawals = await Transaction.aggregate([
      { $match: { type: 'withdrawal', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Get recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('-password');
    
    // Get recent transactions
    const recentTransactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');
    
    res.json({
      stats: {
        userCount,
        transactionCount,
        pendingTransactions,
        totalWithdrawn: totalWithdrawals.length > 0 ? totalWithdrawals[0].total : 0
      },
      recentUsers,
      recentTransactions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/admin/transactions
// @desc    Get all transactions
// @access  Private (Admin only)
router.get('/transactions', adminAuth, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/admin/transactions/:id
// @desc    Update transaction status
// @access  Private (Admin only)
router.put('/transactions/:id', adminAuth, async (req, res) => {
  try {
    const { status, txHash } = req.body;
    
    // Find and update transaction
    let transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    
    transaction.status = status || transaction.status;
    if (txHash) transaction.txHash = txHash;
    
    await transaction.save();
    
    // If this is a completed withdrawal, update user balance
    if (transaction.type === 'withdrawal' && status === 'completed' && transaction.status !== 'completed') {
      const user = await User.findById(transaction.user);
      
      if (user) {
        // No need to update balance as it was deducted at request time
        // Just save the updated transaction
        await transaction.save();
      }
    }
    
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/admin/create-admin
// @desc    Create a new admin (SuperAdmin only)
// @access  Private (SuperAdmin only)
router.post('/create-admin', adminAuth, [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  // Check if current admin is superadmin
  if (req.admin.role !== 'superadmin') {
    return res.status(403).json({ msg: 'Not authorized to create admin accounts' });
  }
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, email, password, role } = req.body;
  
  try {
    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    
    if (admin) {
      return res.status(400).json({ errors: [{ msg: 'Admin already exists' }] });
    }
    
    // Create new admin
    admin = new Admin({
      name,
      email,
      password,
      role: role || 'admin'
    });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    
    // Save admin to database
    await admin.save();
    
    res.json({ msg: 'Admin created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
