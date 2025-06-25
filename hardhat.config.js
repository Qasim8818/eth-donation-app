require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/a0a24acf88c34d378c95f39b0b7f2db9",
      accounts: ["0x8d174ea94f7c726907902fc4b8e223433351274317c80efd4021a583845ad5a9"],
    },
  },
  etherscan: {
    apiKey: "YXNMUZZSVEJPGRWG5NW7QTR4J8GKZHH2GX",
  },
};
