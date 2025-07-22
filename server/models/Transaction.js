const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  type: {
    type: String,
    enum: ['withdrawal', 'deposit', 'mining', 'affiliate'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  txHash: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('transaction', TransactionSchema);