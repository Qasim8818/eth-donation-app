import React from 'react';
import useWallet from '../hooks/useWallet';

const WalletConnect = () => {
  const { account, error, connectWallet } = useWallet();

  return (
    <div style={{ margin: '1rem', textAlign: 'center' }}>
      {account ? (
        <p>Connected Wallet: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WalletConnect;
