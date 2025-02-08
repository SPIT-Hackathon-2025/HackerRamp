// const { ethers } = require("hardhat");

// async function main() {
//     const [deployer, tenant] = await ethers.getSigners(); // Get two accounts

//     console.log("Deploying the contract with:", deployer.address);

//     const RentalAgreement = await ethers.getContractFactory("RentalAgreement");

//     // Define the constructor arguments
//     const rentAmount = ethers.parseEther("0.1"); // Example: 0.1 ETH
//     const securityDeposit = ethers.parseEther("0.5"); // Example: 0.5 ETH
//     const dueDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days from now

//     // Deploy with required arguments
//     const rentalAgreement = await RentalAgreement.deploy(
//         tenant.address, // Tenant's address
//         rentAmount,
//         securityDeposit,
//         dueDate
//     );

//     await rentalAgreement.waitForDeployment(); // Wait for deployment to finish

//     console.log("RentalAgreement deployed to:", await rentalAgreement.getAddress());
// }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });








// const { ethers } = require("hardhat");

// async function main() {
//     const [deployer, tenant] = await ethers.getSigners();
    
//     console.log("Deploying the contract with:", deployer.address);
//     const RentalAuth = await hre.ethers.getContractFactory("RentalAuth");
//     const RentalAgreement = await ethers.getContractFactory("RentalAgreement");

//     const rentAmount = ethers.parseEther("0.1");
//     const securityDeposit = ethers.parseEther("0.5");
//     const dueDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

//     // Deploy contract with security deposit
//     const rentalAgreement = await RentalAgreement.deploy(
//         tenant.address,
//         rentAmount,
//         securityDeposit,
//         dueDate,
//         { value: securityDeposit } // Send the security deposit
//     );


//         //trying-correct code
// //     const RentalAuth = await hre.ethers.getContractFactory("RentalAuth");
// //   const rentalAuth = await RentalAuth.deploy();
// //   await rentalAgreement.waitForDeployment();
// //   //await rentalAuth.deployed();
// //   console.log(`RentalAuth deployed to: ${rentalAuth.address}`);






// //     console.log("RentalAgreement deployed to:", await rentalAgreement.getAddress());

// //trying 2nd time

// const rentalAuth = await RentalAuth.deploy();
//     await rentalAuth.waitForDeployment();
   

// }


// const rentalAuthAddress = await rentalAuth.getAddress();
// console.log("RentalAuth deployed to:", rentalAuthAddress);


// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });






const hre = require("hardhat");

async function main() {
    const [deployer, tenant] = await hre.ethers.getSigners();

    console.log("Deploying contracts with:", deployer.address);

    // Deploy RentalAuth
    const RentalAuth = await hre.ethers.getContractFactory("RentalAuth");
    const rentalAuth = await RentalAuth.deploy();
    await rentalAuth.waitForDeployment();
    console.log("RentalAuth deployed to:", await rentalAuth.getAddress());

    // Deploy RentalAgreement
    const RentalAgreement = await hre.ethers.getContractFactory("RentalAgreement");
    const rentAmount = hre.ethers.parseEther("0.1");
    const securityDeposit = hre.ethers.parseEther("0.5");
    const dueDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

    const rentalAgreement = await RentalAgreement.deploy(
        tenant.address,
        rentAmount,
        securityDeposit,
        dueDate,
        { value: securityDeposit }
    );

    await rentalAgreement.waitForDeployment();
    console.log("RentalAgreement deployed to:", await rentalAgreement.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

