const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Referral = require('../models/Referral');

// @route   GET api/affiliate/stats
// @desc    Get affiliate statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Get total referrals count
    const totalReferrals = await Referral.countDocuments({ referrer: req.user.id });
    
    // Get active miners count (users who mined in the last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const activeMiners = await User.countDocuments({
      referredBy: req.user.id,
      lastMiningActivity: { $gte: sevenDaysAgo }
    });
    
    // Get total affiliate earnings
    const totalEarnings = user.affiliateEarnings;
    
    // Get this month's earnings
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);
    
    const referrals = await Referral.find({
      referrer: req.user.id,
      createdAt: { $gte: firstDayOfMonth }
    });
    
    const thisMonthEarnings = referrals.reduce((total, referral) => total + referral.earnings, 0);
    
    res.json({
      totalReferrals,
      activeMiners,
      totalEarnings,
      thisMonthEarnings
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/affiliate/referrals
// @desc    Get user's referrals
// @access  Private
router.get('/referrals', auth, async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer: req.user.id })
      .sort({ createdAt: -1 })
      .populate('user', ['name', 'isActive']);
    
    res.json(referrals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/affiliate/link
// @desc    Generate referral link if not exists
// @access  Private
router.post('/link', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // If user already has a referral code, return it
    if (user.referralCode) {
      return res.json({ referralCode: user.referralCode });
    }
    
    // Generate unique referral code
    const referralCode = Math.random().toString(36).substring(2, 8);
    
    user.referralCode = referralCode;
    await user.save();
    
    res.json({ referralCode });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;