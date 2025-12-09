const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Deploying HorseRacing contract to Base Mainnet...");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  // Get account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy contract
  const HorseRacing = await hre.ethers.getContractFactory("HorseRacing");
  const horseRacing = await HorseRacing.deploy();

  await horseRacing.waitForDeployment();

  const contractAddress = await horseRacing.getAddress();
  console.log("✅ HorseRacing deployed to:", contractAddress);

  // Save contract address to .env
  const envPath = path.join(__dirname, "..", ".env");
  let envContent = fs.readFileSync(envPath, "utf8");

  // Update or add NEXT_PUBLIC_CONTRACT_ADDRESS
  if (envContent.includes("NEXT_PUBLIC_CONTRACT_ADDRESS=")) {
    envContent = envContent.replace(
      /NEXT_PUBLIC_CONTRACT_ADDRESS=.*/,
      `NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`
    );
  } else {
    envContent += `\nNEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}\n`;
  }

  fs.writeFileSync(envPath, envContent);
  console.log("📄 Contract address saved to .env");

  // Save ABI to src/contracts
  const artifactPath = path.join(
    __dirname,
    "..",
    "artifacts",
    "contracts",
    "HorseRacing.sol",
    "HorseRacing.json"
  );
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  const contractsDir = path.join(__dirname, "..", "src", "contracts");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  const abiPath = path.join(contractsDir, "HorseRacingABI.ts");
  const abiContent = `export const HORSE_RACING_ABI = ${JSON.stringify(artifact.abi, null, 2)} as const;

export const HORSE_RACING_ADDRESS = "${contractAddress}" as const;
`;

  fs.writeFileSync(abiPath, abiContent);
  console.log("📄 ABI saved to src/contracts/HorseRacingABI.ts");

  console.log("\n🎉 Deployment complete!");
  console.log("📋 Summary:");
  console.log("   Contract Address:", contractAddress);
  console.log("   Network: Base Mainnet");
  console.log("   Chain ID: 8453");
  console.log("\n🔗 View on BaseScan:");
  console.log(`   https://basescan.org/address/${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
