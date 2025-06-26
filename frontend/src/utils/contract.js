import { ethers } from 'ethers';
import DonationABI from '../abi/Donation.json'; // Adjust path if needed

// Your deployed contract address
const contractAddress = '0x849A2C9DAd3E41e3CC9952A4a860b864B43088ea';

let donationContract;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  const provider = new ethers.providers.Web3Provider(window.ethereum); // For ethers v5
  const signer = provider.getSigner();
  donationContract = new ethers.Contract(contractAddress, DonationABI, signer);
} else {
  console.warn("MetaMask is not available. Connect wallet to use the app.");
}

export default donationContract;
