
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/transactions
// @desc    Get all transactions for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/transactions/recent
// @desc    Get recent public transactions
// @access  Public
router.get('/recent', async (req, res) => {
  try {
    const transactions = await Transaction.find({ 
      type: 'withdrawal',
      status: 'completed' 
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('-user');
    
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/transactions/withdraw
// @desc    Create a new withdrawal transaction
// @access  Private
router.post('/withdraw', [
  auth,
  [
    check('amount', 'Amount is required').isNumeric(),
    check('address', 'Bitcoin address is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { amount, address } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Check if user has enough balance
    if (user.balance < amount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }
    
    // Create new transaction
    const transaction = new Transaction({
      user: req.user.id,
      type: 'withdrawal',
      amount,
      address,
      status: 'pending'
    });
    
    // Update user balance
    user.balance -= amount;
    
    await user.save();
    await transaction.save();
    
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/transactions/stats
// @desc    Get transaction statistics for the authenticated user
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const totalWithdrawals = await Transaction.aggregate([
      { $match: { user: req.user.id, type: 'withdrawal', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalMining = await Transaction.aggregate([
      { $match: { user: req.user.id, type: 'mining' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalAffiliate = await Transaction.aggregate([
      { $match: { user: req.user.id, type: 'affiliate' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    res.json({
      withdrawals: totalWithdrawals.length > 0 ? totalWithdrawals[0].total : 0,
      mining: totalMining.length > 0 ? totalMining[0].total : 0,
      affiliate: totalAffiliate.length > 0 ? totalAffiliate[0].total : 0
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/transactions/mining
// @desc    Create a new mining transaction
// @access  Private
router.post('/mining', auth, async (req, res) => {
  const { amount } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Create new transaction
    const transaction = new Transaction({
      user: req.user.id,
      type: 'mining',
      amount,
      status: 'completed'
    });
    
    // Update user balance and mining activity
    user.balance += amount;
    user.lastMiningActivity = Date.now();
    
    await user.save();
    await transaction.save();
    
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
