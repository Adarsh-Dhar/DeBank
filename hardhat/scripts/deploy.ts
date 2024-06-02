// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // Get the contract factories
  const YieldToken = await hre.ethers.getContractFactory("YieldToken");
  const YieldVault = await hre.ethers.getContractFactory("YieldVault");

  // Deploy the YieldToken contract
  const yieldToken = await YieldToken.deploy();
  await yieldToken.deployed();
  console.log("YieldToken deployed to:", yieldToken.address);

  // Deploy the YieldVault contract with the address of the deployed YieldToken
  const yieldVault = await YieldVault.deploy(yieldToken.address);
  await yieldVault.deployed();
  console.log("YieldVault deployed to:", yieldVault.address);

  // Optionally, you can add any further configuration or initialization code here
}

// Recommended pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
