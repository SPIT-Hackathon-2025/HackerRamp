// const hre = require("hardhat");

// async function main() {
//   try {
//     // Get deployer's address
//     const [deployer] = await hre.ethers.getSigners();
//     console.log("Deploying contracts with the account:", deployer.address);

//     // Get deployer's balance
//     const balance = await deployer.provider.getBalance(deployer.address);
//     console.log("Account balance:", hre.ethers.formatEther(balance));

//     // Contract parameters
//     const tenant = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Replace with actual tenant address
//     const arbitrator = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with actual arbitrator address
//     const rentAmount = hre.ethers.parseEther("0.1"); // 0.1 ETH per month
//     const securityDeposit = hre.ethers.parseEther("0.2"); // 0.2 ETH
//     const rentPeriod = 12; // 12 months
//     const isAutoDeduct = true;

//     // Deploy contract
//     console.log("Deploying RentalAgreement...");
//     const RentalAgreement = await hre.ethers.getContractFactory("AdvancedRentalAgreement");
//     const rental = await RentalAgreement.deploy(
//       tenant,
//       arbitrator,
//       rentAmount,
//       securityDeposit,
//       rentPeriod,
//       isAutoDeduct,
//       { value: securityDeposit }
//     );

//     await rental.waitForDeployment();
    
//     const address = await rental.getAddress();
//     console.log("RentalAgreement deployed to:", address);

//     // Log configuration details
//     console.log("\nContract Configuration:");
//     console.log("- Landlord:", deployer.address);
//     console.log("- Tenant:", tenant);
//     console.log("- Arbitrator:", arbitrator);
//     console.log("- Rent Amount:", hre.ethers.formatEther(rentAmount), "ETH");
//     console.log("- Security Deposit:", hre.ethers.formatEther(securityDeposit), "ETH");
//     console.log("- Rent Period:", rentPeriod, "months");
//     console.log("- Auto Deduct:", isAutoDeduct);

//     // Verify contract on Etherscan (for supported networks)
//     if (process.env.ETHERSCAN_API_KEY && hre.network.name !== "hardhat") {
//       console.log("\nVerifying contract on Etherscan...");
//       await hre.run("verify:verify", {
//         address: address,
//         constructorArguments: [
//           tenant,
//           arbitrator,
//           rentAmount,
//           securityDeposit,
//           rentPeriod,
//           isAutoDeduct
//         ],
//       });
//     }

//   } catch (error) {
//     console.error("Deployment failed:", error);
//     process.exit(1);
//   }
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

const hre = require("hardhat");

async function main() {
  // Deploy TorRent contract
  const torRent = await hre.ethers.deployContract("TorRent");
  await torRent.waitForDeployment();
  console.log("TorRent deployed to:", await torRent.getAddress());

  const [deployer, tenant] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});