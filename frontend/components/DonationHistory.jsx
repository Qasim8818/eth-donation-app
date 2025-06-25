import React, { useState, useEffect } from 'react';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:5000/donations');
        if (!response.ok) {
          throw new Error('Failed to fetch donations');
        }
        const data = await response.json();
        setDonations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <p>Loading donation history...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ margin: '1rem' }}>
      <h2>Donation History</h2>
      {donations.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <ul>
          {donations.map((donation) => (
            <li key={donation._id}>
              {donation.walletAddress} donated {donation.amount} ETH - Tx: {donation.txHash}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DonationHistory;
