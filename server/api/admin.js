const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Admin = require('../models/Admin');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
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
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      admin: {
        id: admin.id,
        role: admin.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin)
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const pendingTransactions = await Transaction.countDocuments({ status: 'pending' });
    
    // Get total withdrawals
    const withdrawals = await Transaction.aggregate([
      { $match: { type: 'withdrawal', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalWithdrawals = withdrawals.length > 0 ? withdrawals[0].total : 0;

    // Get recent users
    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent transactions
    const recentTransactions = await Transaction.find()
      .populate('user', ['name', 'email'])
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: {
        totalUsers,
        totalTransactions,
        pendingTransactions,
        totalWithdrawals
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
// @access  Private (Admin)
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
// @access  Private (Admin)
router.get('/transactions', adminAuth, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('user', ['name', 'email'])
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/admin/transactions/:id
// @desc    Update transaction status
// @access  Private (Admin)
router.put('/transactions/:id', [
  adminAuth,
  check('status', 'Status is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { status, txHash } = req.body;
    
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    transaction.status = status;
    if (txHash) {
      transaction.txHash = txHash;
    }

    await transaction.save();

    // If withdrawal is completed, no need to update user balance as it was already deducted
    
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/admin/create-admin
// @desc    Create new admin
// @access  Private (Superadmin only)
router.post('/create-admin', [
  adminAuth,
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('role', 'Role is required').not().isEmpty()
], async (req, res) => {
  // Check if user is superadmin
  if (req.admin.role !== 'superadmin') {
    return res.status(403).json({ msg: 'Access denied. Superadmin role required.' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ errors: [{ msg: 'Admin already exists' }] });
    }

    admin = new Admin({
      name,
      email,
      password,
      role
    });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    await admin.save();

    res.json({
      msg: 'Admin created successfully',
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;