 import React from 'react';
import Hero from '../../frontend/src/components/Hero';
import WalletConnect from '../../frontend/src/components/WalletConnect';
import Donate from '../components/Donate';
import DonationStatus from '../../frontend/src/components/DonationStatus';
import QRCodeDisplay from '../../frontend/src/components/QRCodeDisplay';
import NFTReward from '../../frontend/src/components/NFTReward';

const Home = ({ account, setAccount }) => (
  <div className="space-y-6">
    <Hero />
    <WalletConnect account={account} setAccount={setAccount} />
    <Donate account={account} />
    <DonationStatus />
    <QRCodeDisplay account={account} />
    <NFTReward account={account} />
  </div>
);

export default Home;
