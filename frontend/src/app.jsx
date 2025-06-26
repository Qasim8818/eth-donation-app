import React from 'react';
import WalletConnect from './components/WalletConnect';
import Donate from './components/Donate';
import DonationHistory from './components/DonationHistory';
import DonationStatus from './components/DonationStatus';
import Hero from './components/Hero';
import DarkModeToggle from './components/DarkModeToggle';
import NFTReward from './components/NFTReward';
import QRCodeDisplay from './components/QRCodeDisplay';

import './App.css'; // Optional: your own styles
import './index.css'; // Tailwind must be loaded here

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all">
      <DarkModeToggle />

      <header className="text-center py-8">
        <Hero />
      </header>

      <main className="max-w-4xl mx-auto px-4 space-y-12">
        <section className="flex justify-center">
          <WalletConnect />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">🚀 Make a Donation</h2>
          <Donate />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">📬 Donation Status</h2>
          <DonationStatus />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">📜 Donation History</h2>
          <DonationHistory />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">🎁 NFT Reward</h2>
          <NFTReward />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">📷 QR Code</h2>
          <QRCodeDisplay />
        </section>
      </main>

      <footer className="text-center py-8 text-sm opacity-60">
        © {new Date().getFullYear()} ETH Donation App
      </footer>
    </div>
  );
};

export default App;
