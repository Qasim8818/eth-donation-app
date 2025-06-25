import React from 'react';

const DonationStatus = ({ status }) => {
  return (
    <div style={{ margin: '1rem', textAlign: 'center' }}>
      <h2>Donation Status</h2>
      <p>{status ? 'Donation confirmed!' : 'No donation yet.'}</p>
    </div>
  );
};

export default DonationStatus;
