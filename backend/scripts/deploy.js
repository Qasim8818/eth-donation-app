const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

async function main() {
  const Donate = await hre.ethers.getContractFactory("DonateToMe");
  const donate = await Donate.deploy();
  await donate.waitForDeployment();
  console.log("Contract deployed to:", donate.target);

  // Save contract address and ABI to frontend directory
  const frontendDir = path.resolve(__dirname, "../frontend");

  // Ensure frontend directory exists
  if (!fs.existsSync(frontendDir)) {
    fs.mkdirSync(frontendDir, { recursive: true });
  }

  // Save deployed contract address
  const addressPath = path.join(frontendDir, "deployedAddress.json");
  fs.writeFileSync(addressPath, JSON.stringify({ address: donate.target }, null, 2));

  // Save contract ABI
  const abiPath = path.join(frontendDir, "abi.json");
  const abi = Donate.interface.format("json");
  fs.writeFileSync(abiPath, JSON.stringify(abi, null, 2));

  console.log("ABI and deployed address saved to frontend directory");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
