import React, { useState } from 'react';
import { ethers } from 'ethers';
import donationContract from '../utils/contract'; // Smart contract instance



const Donate = ({ account }) => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const sendDonation = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    if (!account) {
      setStatus("❌ Please connect your wallet first");
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setStatus("❌ Enter a valid ETH amount");
      return;
    }

    try {
      setLoading(true);
      setStatus("⏳ Sending donation...");

      const tx = await donationContract.donate({
        value: ethers.parseEther(amount)
      });

      setStatus(`📦 Transaction sent: ${tx.hash}`);
      await tx.wait();

      // Save to backend
     await fetch('http://localhost:5000/donate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    walletAddress: account,
    amount,
    txHash: tx.hash,
  }),
});


      setStatus("✅ Donation complete!");
      setAmount('');
    } catch (err) {
      console.error(err);
      setStatus(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        disabled={loading}
        className="border px-4 py-2 rounded w-full"
      />
      <button
        onClick={sendDonation}
        disabled={loading || !account}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Sending...' : account ? '🚀 Send Donation' : '🔒 Connect Wallet'}
      </button>
      <p className="text-sm">{status}</p>
    </div>
  );
};

export default Donate;
