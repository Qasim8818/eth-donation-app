import { useState } from 'react';

export default function useWallet() {
  const [account, setAccount] = useState(null);
  const [donationStatus, setDonationStatus] = useState('');
  const [isDonating, setIsDonating] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("User denied wallet access", err);
      }
    } else {
      alert("MetaMask not detected");
    }
  };

  const donate = async (amountInEth) => {
    if (!window.ethereum || !account) {
      alert("Please connect your wallet first");
      return { success: false };
    }

    setIsDonating(true);
    setDonationStatus('Sending donation...');

    try {
      // Convert ETH to hex string (in wei)
      const amountInWei = BigInt(amountInEth * 1e18).toString(16);

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: account,
          to: import.meta.env.VITE_DONATION_WALLET, // Required in .env
          value: `0x${amountInWei}`,
        }],
      });

      console.log('Transaction hash:', txHash);

      // Send confirmation to backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/donate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: account,
          amount: amountInEth,
          txHash
        })
      });

      if (response.ok) {
        setDonationStatus('Donation successful!');
        return { success: true };
      } else {
        const error = await response.json();
        setDonationStatus(`Backend error: ${error.message}`);
        return { success: false };
      }

    } catch (err) {
      console.error('Transaction failed:', err);
      setDonationStatus(`Transaction failed: ${err.message}`);
      return { success: false };
    } finally {
      setIsDonating(false);
    }
  };

  return {
    account,
    connectWallet,
    donate,
    donationStatus,
    isDonating,
    setDonationStatus, // optional for manual reset
  };
}
