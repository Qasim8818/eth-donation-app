import React from 'react';
import Hero from './components/Hero';
import WalletConnect from './components/WalletConnect';
import DonationStatus from './components/DonationStatus';
import DonationHistory from './components/DonationHistory';
import DarkModeToggle from './components/DarkModeToggle';
import QRCodeDisplay from './components/QRCodeDisplay';
import NFTReward from './components/NFTReward';

function App() {
  const donationAddress = '0xYourDonationAddressHere'; // Replace with actual donation address
  const donationConfirmed = false; // Placeholder for donation status

  return (
    <div>
      <Hero />
      <WalletConnect />
      <DonationStatus status={donationConfirmed} />
      <DonationHistory />
      <DarkModeToggle />
      <QRCodeDisplay value={donationAddress} />
      <NFTReward />
    </div>
  );
}

export default App;
