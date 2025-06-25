import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeDisplay = ({ value }) => {
  return (
    <div style={{ margin: '1rem', textAlign: 'center' }}>
      <h2>Scan to Donate</h2>
      <QRCode value={value} size={180} />
    </div>
  );
};

export default QRCodeDisplay;
