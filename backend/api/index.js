require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Donation = require('./models/Donation')
const authMiddleware = require('../middleware/authMiddleware');
const adminAuthRoutes = require('./routes/adminAuth');
const userAuthRoutes = require('./routes/userAuth');
const authRoutes = require('./routes/auth');
const auth = require('../middleware/auth');


const app = express(); 
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/admin', adminAuthRoutes);
app.use('/auth', userAuthRoutes);
app.use('/api/auth', authRoutes);

// MongoDB connection
const mongoURI = process.env.CONNECTION_STRING || 'mongodb+srv://naeembangash57:naeem.18435@cluster0.mmdca.mongodb.net/eth-donation-app';
mongoose.connect(mongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.get('/', (req, res) => {
  res.send('Eth Donation API is running');
});

// Get all donations (admin route)
app.get('/donations', auth, async (req, res) => {
  const userId = req.user.userId;
  const donations = await Donation.find({ walletAddress: req.user.email }).sort({ timestamp: -1 });
  res.json(donations);
});

// Add a new donation
app.post('/donate', async (req, res) => {
  const { walletAddress, amount, txHash } = req.body;
  if (!walletAddress || !amount || !txHash) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const donation = new Donation({ walletAddress, amount, txHash });
  try {
    const savedDonation = await donation.save();
    res.status(201).json(savedDonation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;