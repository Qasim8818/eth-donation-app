import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import QRCode from 'qrcode';

const contractAddress = "0x849A2C9DAd3E41e3CC9952A4a860b864B43088ea";

const DonationApp = () => {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [signer, setSigner] = useState(null);
  const [qrUrl, setQrUrl] = useState("");
  const [usd, setUsd] = useState("");
  const [dark, setDark] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.body.className = dark ? 'dark' : '';
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  useEffect(() => {
    QRCode.toDataURL(contractAddress)
      .then(setQrUrl)
      .catch(console.error);
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
      setStatus("Wallet connected ✅");
    } catch (err) {
      setStatus("❌ Error connecting wallet");
    }
  };

  const donate = async () => {
    if (!amount || isNaN(amount)) return alert("Enter a valid amount");

    try {
      const tx = await signer.sendTransaction({
        to: contractAddress,
        value: ethers.utils.parseEther(amount)
      });
      setStatus("Transaction sent: " + tx.hash);
      await tx.wait();
      setStatus("✅ Donation complete!");
    } catch (err) {
      setStatus("❌ Error: " + (err.message || err));
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    alert("Address copied to clipboard!");
  };

  const fetchUSD = async (eth) => {
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
      const data = await res.json();
      const usd = (parseFloat(eth) * data.ethereum.usd).toFixed(2);
      setUsd(usd);
    } catch (e) {
      setUsd("");
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    fetchUSD(e.target.value);
  };

  return (
    <div className="container">
      <button className="toggle" onClick={() => setDark(!dark)}>🌙 Toggle Dark Mode</button>
      <h1>💸 Donate ETH</h1>
      <button onClick={connectWallet}>🔗 Connect Wallet</button><br /><br />

      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={handleAmountChange}
      />
      <button onClick={donate}>🚀 Send Donation</button>
      <div>{usd && <>~ ${usd} USD</>}</div>
      <p>{status}</p>

      <h3>Your Donation Wallet:</h3>
      <img src={qrUrl} alt="QR Code" style={{ maxWidth: "200px" }} />
      <p><code>{contractAddress}</code></p>
      <button onClick={copyAddress}>📋 Copy Address</button>
    </div>
  );
};

export default DonationApp;
