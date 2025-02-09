require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize provider and contract
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const privateKey = "4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356";
const signer = new ethers.Wallet(privateKey, provider);

const rentalAuthABI = require("./RentalAuthABI.json");
const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // Update this after deployment
const rentalAuth = new ethers.Contract(contractAddress, rentalAuthABI.abi, signer);

// In-memory OTP store
const otpStore = {};

// Generate Anonymous ID
const generateAnonymousID = () => ethers.Wallet.createRandom().address;

app.post("/request-otp", async (req, res) => {
  const { aadhaarNumber, phone } = req.body;

  if (!aadhaarNumber || !phone) {
    return res.status(400).json({ success: false, message: "Aadhaar and phone number are required!" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[phone] = otp;

  console.log(`📢 OTP for ${phone}: ${otp}`);
  res.json({ success: true, message: "OTP Generated (Check Backend Console)" });
});

app.post("/verify-otp", async (req, res) => {
  const { aadhaarNumber, phone, otp } = req.body;

  if (!aadhaarNumber || !phone || !otp) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  if (otpStore[phone] && otpStore[phone] == otp) {
    try {
      delete otpStore[phone];
      const anonID = generateAnonymousID();
      
      // Hash Aadhaar number
      const aadhaarHash = ethers.keccak256(ethers.toUtf8Bytes(aadhaarNumber));
      
      console.log("Registering with hash:", aadhaarHash, "and anonID:", anonID);
      
      // Register on blockchain
      const tx = await rentalAuth.registerAadhaar(aadhaarHash, anonID);
      const receipt = await tx.wait();
      
      console.log("Transaction receipt:", receipt);
      return res.json({ 
        success: true, 
        anonymousID: anonID,
        transactionHash: receipt.hash 
      });
    } catch (err) {
      console.error("❌ Blockchain Registration Error:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Error registering on blockchain",
        error: err.message 
      });
    }
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));