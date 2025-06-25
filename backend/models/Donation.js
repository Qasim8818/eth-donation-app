const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  txHash: { type: String, required: true },
});

module.exports = mongoose.model('Donation', donationSchema);
