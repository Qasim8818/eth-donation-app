import React, { useState } from 'react';
import { ethers } from 'ethers';
import DonationABI from '../abi/Donation.json'; // adjust path
const contractAddress = '0x...'; // your deployed contract address

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const donationContract = new ethers.Contract(contractAddress, DonationABI, signer);


const WalletConnect = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('User denied wallet connection:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div className="text-center">
      {account ? (
        <p className="text-green-500">Connected: {account}</p>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
