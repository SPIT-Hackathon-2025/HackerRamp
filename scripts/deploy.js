const { ethers } = require("hardhat");

async function main() {
    const [deployer, tenant] = await ethers.getSigners(); // Get two accounts

    console.log("Deploying the contract with:", deployer.address);

    const RentalAgreement = await ethers.getContractFactory("RentalAgreement");

    // Define the constructor arguments
    const rentAmount = ethers.parseEther("0.1"); // Example: 0.1 ETH
    const securityDeposit = ethers.parseEther("0.5"); // Example: 0.5 ETH
    const dueDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days from now

    // Deploy with required arguments
    const rentalAgreement = await RentalAgreement.deploy(
        tenant.address, // Tenant's address
        rentAmount,
        securityDeposit,
        dueDate
    );

    await rentalAgreement.waitForDeployment(); // Wait for deployment to finish

    console.log("RentalAgreement deployed to:", await rentalAgreement.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
