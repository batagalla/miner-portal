const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { check, validationResult } = require('express-validator');

// @route   GET api/payouts/transactions
// @desc    Get user's transactions
// @access  Private
router.get('/transactions', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/payouts/recent
// @desc    Get recent successful withdrawals (public)
// @access  Public
router.get('/recent', async (req, res) => {
  try {
    const recentTransactions = await Transaction.find({ 
      type: 'withdrawal',
      status: 'completed'
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('-user');
    
    res.json(recentTransactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/payouts/withdraw
// @desc    Create a withdrawal request
// @access  Private
router.post('/withdraw', [
  auth,
  check('amount', 'Amount is required').isNumeric(),
  check('bitcoinAddress', 'Bitcoin address is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { amount, bitcoinAddress } = req.body;
  
  try {
    // Check if amount is above minimum withdrawal
    if (parseFloat(amount) < 0.001) {
      return res.status(400).json({ errors: [{ msg: 'Minimum withdrawal amount is 0.001 BTC' }] });
    }
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Check if user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({ errors: [{ msg: 'Insufficient balance' }] });
    }
    
    // Create transaction
    const transaction = new Transaction({
      user: req.user.id,
      type: 'withdrawal',
      amount,
      address: bitcoinAddress,
      status: 'pending'
    });
    
    // Deduct balance from user
    user.balance -= amount;
    
    await user.save();
    await transaction.save();
    
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;