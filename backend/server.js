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
// console.log("Contract ABI:", contractABI); 
// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

// const contract = new ethers.Contract(contractAddress, contractABI.abi, wallet);

// app.post("/deploy", async (req, res) => {
//     try {
//         const { tenant, rentAmount, securityDeposit, dueDate } = req.body;
//         const tx = await contract.deploy(tenant, ethers.parseEther(rentAmount), ethers.parseEther(securityDeposit), dueDate, { value: ethers.parseEther(securityDeposit) });
//         await tx.wait();
//         res.json({ message: "Contract Deployed!" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));


// const dotenv = require("dotenv").config();





// require("dotenv").config({ path: "../.env" });
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const { ethers } = require("ethers");
// const mongoose = require("mongoose");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// const MONGO_URI = process.env.MONGO_URI;
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error(err));

// // Aadhaar Authentication API
// const generateAnonymousID = () => ethers.Wallet.createRandom().address;

// app.post("/aadhaar-auth", async (req, res) => {
//   const { aadhaarNumber, otp } = req.body;

//   // Verify OTP (Simulated for Demo - Integrate with UIDAI API)
//   if (otp === "123456") { 
//     const anonID = generateAnonymousID();
//     return res.json({ success: true, anonymousID: anonID });
//   } else {
//     return res.status(400).json({ success: false, message: "Invalid OTP" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// require("dotenv").config({ path: "../.env" });
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { ethers } = require("ethers");
// const mongoose = require("mongoose");


// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error(err));

// // In-memory OTP store (use a database for production)
// const otpStore = {};

// // Generate Anonymous ID
// const generateAnonymousID = () => ethers.Wallet.createRandom().address;

// // 📌 **1. Request OTP (Displays in Console)**
// app.post("/request-otp", async (req, res) => {
//   const { aadhaarNumber, phone } = req.body;

//   if (!aadhaarNumber || !phone) {
//     return res.status(400).json({ success: false, message: "Aadhaar and phone number are required!" });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
//   otpStore[phone] = otp;

//   console.log(`📢 OTP for ${phone}: ${otp}`); // Show OTP in console for manual entry

//   res.json({ success: true, message: "OTP Generated (Check Backend Console)" });
// });

// // 📌 **2. Verify OTP**
// app.post("/verify-otp", async (req, res) => {
//   const { aadhaarNumber, phone, otp } = req.body;

//   if (!aadhaarNumber || !phone || !otp) {
//     return res.status(400).json({ success: false, message: "All fields are required!" });
//   }

//   if (otpStore[phone] && otpStore[phone] == otp) {
//     delete otpStore[phone]; // OTP used, remove from store
//     const anonID = generateAnonymousID();
//     return res.json({ success: true, anonymousID: anonID });
//   } else {
//     return res.status(400).json({ success: false, message: "Invalid OTP" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ⚡ Connect to Ethereum Blockchain
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Ethereum provider URL (Infura/Alchemy)
const privateKey = "4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356"; // Load private key from .env
const signer = new ethers.Wallet(privateKey, provider);

const rentalAuthABI = require("./RentalAuthABI.json"); // Smart contract ABI
const contractAddress = process.env.CONTRACT_ADDRESS; // Smart contract address
const rentalAuth = new ethers.Contract(contractAddress, rentalAuthABI.abi, signer);
console.log("rentalAuth:", rentalAuth);

// In-memory OTP store (for testing, replace with DB in production)
const otpStore = {};

// 📌 **Generate Anonymous ID**
const generateAnonymousID = () => ethers.Wallet.createRandom().address;

// 📌 **1. Request OTP (Displays in Console)**
app.post("/request-otp", async (req, res) => {
  const { aadhaarNumber, phone } = req.body;

  if (!aadhaarNumber || !phone) {
    return res.status(400).json({ success: false, message: "Aadhaar and phone number are required!" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  otpStore[phone] = otp;

  console.log(`📢 OTP for ${phone}: ${otp}`); // Show OTP in console for manual entry

  res.json({ success: true, message: "OTP Generated (Check Backend Console)" });
});

// 📌 **2. Verify OTP & Store Anonymous ID on Blockchain**
app.post("/verify-otp", async (req, res) => {
  const { aadhaarNumber, phone, otp } = req.body;

  if (!aadhaarNumber || !phone || !otp) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  if (otpStore[phone] && otpStore[phone] == otp) {
    delete otpStore[phone]; // OTP used, remove from store
    const anonID = generateAnonymousID();

    try {
      // 🛠️ Register Anonymous ID on Blockchain
      const tx = await rentalAuth.verifyUser(anonID);  // Call your smart contract's register function
      await tx.wait(); // Wait for the transaction to be mined
      console.log(`✅ Anonymous ID Registered on Blockchain: ${anonID}`);

      return res.json({ success: true, anonymousID: anonID });
    } catch (err) {
      console.error("❌ Blockchain Registration Error:", err);
      return res.status(500).json({ success: false, message: "Error registering on blockchain" });
    }
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

app.post("/check-verification", async (req, res) => {
    const { anonID } = req.body;

    if (!anonID) {
        return res.status(400).json({ success: false, message: "Anonymous ID is required!" });
    }

    try {
        // Check if the anonymous ID is verified on the blockchain
        const isVerified = await rentalAuth.isUserVerified(anonID);

        if (isVerified) {
            return res.json({ success: true, message: "User is verified on the blockchain!" });
        } else {
            return res.json({ success: false, message: "User is not verified on the blockchain." });
        }
    } catch (err) {
        console.error("❌ Error checking verification:", err);
        return res.status(500).json({ success: false, message: "Error checking verification status" });
    }
});

// 📌 **3. Verify Aadhaar Number and Check Anonymous ID**
// 📌 **3. Verify Aadhaar Number and Check Anonymous ID**
app.post("/verify-aadhaar", async (req, res) => {
    const { aadhaarNumber } = req.body;

    if (!aadhaarNumber) {
        return res.status(400).json({ success: false, message: "Aadhaar number is required!" });
    }

    try {
        // Query the blockchain for the anonymous ID associated with the given Aadhaar number.
        const anonID = await rentalAuth.getAnonymousID(aadhaarNumber); // Call getAnonymousID function

        if (anonID === ethers.ZeroAddress) { // Use ethers.ZeroAddress for null address comparison
            return res.status(400).json({ success: false, message: "Aadhaar number not found." });
        }

        // Check if the anonymous ID is verified
        const isVerified = await rentalAuth.isUserVerified(anonID);

        if (isVerified) {
            return res.json({ success: true, message: "User is verified on the blockchain!", anonID });
        } else {
            return res.json({ success: false, message: "User not verified on the blockchain!", anonID });
        }
    } catch (err) {
        console.error("❌ Error verifying Aadhaar:", err);
        return res.status(500).json({ success: false, message: "Error verifying Aadhaar number" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));










