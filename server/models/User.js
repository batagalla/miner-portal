const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
  referralCode: {
    type: String
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  balance: {
    type: Number,
    default: 0
  },
  affiliateEarnings: {
    type: Number,
    default: 0
  },
  lastMiningActivity: {
    type: Date
  },
  walletAddresses: [
    {
      address: {
        type: String
      },
      label: {
        type: String
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);