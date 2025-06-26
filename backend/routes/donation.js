const express = require('express');
const router = express.router;
const authMiddleware = require('./middleware/authMiddleware');

const donation = [];

router.post('/', (req, res) => {
    const { address, amount, txHash } = req.body
    if (!address || !amount || !txHash ) return res.status(400).send("Missing fields");
    const donation = { address, amount,txHash, date: new Date() };
    donation.push(donation);
    res.status(200).json({ message: "Donation stored", donation})
 });

 router.get('/', (req, res) => {
    res.json(donation);
 });

 module.exports = router;
