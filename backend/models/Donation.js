const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true
  },
  amount: {
    type: String, // Use string to preserve ETH decimal precision
    required: true
  },
  txHash: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);
