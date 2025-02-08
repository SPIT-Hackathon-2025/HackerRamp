// const dotenv = require("dotenv");
// dotenv.config({ path: "../.env" });
// const express = require("express");
// const cors = require("cors");
// const { ethers } = require("ethers");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// const contractABI = require("./RentalAgreementABI.json");
// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed contract address

// const contract = new ethers.Contract(contractAddress, contractABI.abi, wallet);

// app.post("/deploy", async (req, res) => {
//     try {
//         const { tenant, rentAmount, securityDeposit, dueDate } = req.body;
//         const tx = await contract.deploy(
//             tenant,
//             ethers.parseEther(rentAmount),
//             ethers.parseEther(securityDeposit),
//             dueDate,
//             { value: ethers.parseEther(securityDeposit) }
//         );
//         await tx.wait();
//         res.json({ message: "Contract Deployed!", txHash: tx.hash });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.post("/pay-rent", async (req, res) => {
//     try {
//         const tx = await contract.payRent({ value: ethers.parseEther(req.body.rentAmount) });
//         await tx.wait();
//         res.json({ message: "Rent Paid!", txHash: tx.hash });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.post("/terminate", async (req, res) => {
//     try {
//         const tx = await contract.terminateAgreement();
//         await tx.wait();
//         res.json({ message: "Agreement Terminated!", txHash: tx.hash });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.post("/refund-deposit", async (req, res) => {
//     try {
//         const tx = await contract.refundDeposit();
//         await tx.wait();
//         res.json({ message: "Deposit Refunded!", txHash: tx.hash });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));













require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI = require("./RentalAgreementABI.json");
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual contract address
const contract = new ethers.Contract(contractAddress, contractABI.abi, wallet);

// Deploy Rental Agreement
app.post("/deploy", async (req, res) => {
    try {
        const { tenant, rentAmount, securityDeposit, dueDate } = req.body;

        const tx = await contract.deploy(
            tenant,
            ethers.parseEther(rentAmount),
            ethers.parseEther(securityDeposit),
            dueDate,
            { value: ethers.parseEther(securityDeposit) }
        );
        await tx.wait();

        res.json({ message: "Contract Deployed!", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Pay Rent
app.post("/pay-rent", async (req, res) => {
    try {
        const tx = await contract.payRent({ value: ethers.parseEther(req.body.rentAmount) });
        await tx.wait();
        res.json({ message: "Rent Paid!", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Terminate Agreement
app.post("/terminate", async (req, res) => {
    try {
        const tx = await contract.terminateAgreement();
        await tx.wait();
        res.json({ message: "Agreement Terminated!", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Refund Security Deposit
app.post("/refund-deposit", async (req, res) => {
    try {
        const tx = await contract.refundDeposit();
        await tx.wait();
        res.json({ message: "Deposit Refunded!", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));









