// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App









// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import axios from "axios";

// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace after deployment
// const contractABI = [
//   {
//     "inputs": [
//       { "internalType": "address", "name": "_tenant", "type": "address" },
//       { "internalType": "uint256", "name": "_rentAmount", "type": "uint256" },
//       { "internalType": "uint256", "name": "_securityDeposit", "type": "uint256" },
//       { "internalType": "uint256", "name": "_dueDate", "type": "uint256" }
//     ],
//     "stateMutability": "payable",
//     "type": "constructor"
//   },
//   { "inputs": [], "name": "payRent", "outputs": [], "stateMutability": "payable", "type": "function" },
//   { "inputs": [], "name": "terminateAgreement", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
//   { "inputs": [], "name": "refundDeposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
//   { "inputs": [], "name": "landlord", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
//   { "inputs": [], "name": "tenant", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
//   { "inputs": [], "name": "isActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }
// ];

// function App() {
//   const [account, setAccount] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [tenant, setTenant] = useState("");
//   const [rentAmount, setRentAmount] = useState("");
//   const [securityDeposit, setSecurityDeposit] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     connectWallet();
//   }, []);

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      
//       setAccount(await signer.getAddress());
//       setContract(contractInstance);
//       fetchContractData(contractInstance);
//     } else {
//       alert("Please install MetaMask");
//     }
//   };

//   const fetchContractData = async (contractInstance) => {
//     try {
//       const tenant = await contractInstance.tenant();
//       const active = await contractInstance.isActive();
//       setTenant(tenant);
//       setIsActive(active);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deployAgreement = async () => {
//     if (!contract) return;
    
//     const value = ethers.parseEther(securityDeposit);
//     try {
//       const tx = await contract.deploy(tenant, ethers.parseEther(rentAmount), value, dueDate, { value });
//       await tx.wait();
//       alert("Rental Agreement Deployed!");
//       fetchContractData(contract);
//     } catch (error) {
//       console.error(error);
//       alert("Error deploying agreement");
//     }
//   };

//   const payRent = async () => {
//     if (!contract) return;
    
//     try {
//       const tx = await contract.payRent({ value: ethers.parseEther(rentAmount) });
//       await tx.wait();
//       alert("Rent Paid!");
//     } catch (error) {
//       console.error(error);
//       alert("Error paying rent");
//     }
//   };

//   const terminateAgreement = async () => {
//     if (!contract) return;

//     try {
//       const tx = await contract.terminateAgreement();
//       await tx.wait();
//       alert("Agreement Terminated!");
//       fetchContractData(contract);
//     } catch (error) {
//       console.error(error);
//       alert("Error terminating agreement");
//     }
//   };

//   const refundDeposit = async () => {
//     if (!contract) return;

//     try {
//       const tx = await contract.refundDeposit();
//       await tx.wait();
//       alert("Security Deposit Refunded!");
//     } catch (error) {
//       console.error(error);
//       alert("Error refunding deposit");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Blockchain Rental Agreement</h1>
//       {account ? <p>Connected: {account}</p> : <button onClick={connectWallet}>Connect Wallet</button>}

//       <h2>Deploy Rental Agreement</h2>
//       <input type="text" placeholder="Tenant Address" value={tenant} onChange={(e) => setTenant(e.target.value)} />
//       <input type="text" placeholder="Rent Amount (ETH)" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} />
//       <input type="text" placeholder="Security Deposit (ETH)" value={securityDeposit} onChange={(e) => setSecurityDeposit(e.target.value)} />
//       <input type="text" placeholder="Due Date (Timestamp)" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
//       <button onClick={deployAgreement}>Deploy Agreement</button>

//       <h2>Manage Agreement</h2>
//       <button onClick={payRent} disabled={!isActive}>Pay Rent</button>
//       <button onClick={terminateAgreement} disabled={!isActive}>Terminate Agreement</button>
//       <button onClick={refundDeposit} disabled={isActive}>Refund Deposit</button>
//     </div>
//   );
// }

// export default App;

















// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";

// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed contract address
// const contractABI = [
//     {
//       "inputs": [
//         { "internalType": "address", "name": "_tenant", "type": "address" },
//         { "internalType": "uint256", "name": "_rentAmount", "type": "uint256" },
//         { "internalType": "uint256", "name": "_securityDeposit", "type": "uint256" },
//         { "internalType": "uint256", "name": "_dueDate", "type": "uint256" }
//       ],
//       "stateMutability": "payable",
//       "type": "constructor"
//     },
//     { "inputs": [], "name": "payRent", "outputs": [], "stateMutability": "payable", "type": "function" },
//     { "inputs": [], "name": "terminateAgreement", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
//     { "inputs": [], "name": "refundDeposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
//     { "inputs": [], "name": "landlord", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
//     { "inputs": [], "name": "tenant", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
//     { "inputs": [], "name": "isActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }
//   ];

// function App() {
//   const [account, setAccount] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [rentAmount, setRentAmount] = useState("");

//   useEffect(() => {
//     connectWallet();
//   }, []);

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      
//       setAccount(await signer.getAddress());
//       setContract(contractInstance);
//     } else {
//       alert("Please install MetaMask");
//     }
//   };

//   const payRent = async () => {
//     if (!contract) return alert("Connect wallet first.");

//     try {
//       const gasLimit = await contract.payRent.estimateGas({ value: ethers.parseEther(rentAmount) });
//       const tx = await contract.payRent({ value: ethers.parseEther(rentAmount), gasLimit });
//       await tx.wait();
//       alert("Rent Paid!");
//     } catch (error) {
//       console.error(error);
//       alert("Error paying rent: " + (error.message || "Unknown error"));
//     }
//   };

//   return (
//     <div>
//       <h1>Blockchain Rental Agreement</h1>
//       {account ? <p>Connected: {account}</p> : <button onClick={connectWallet}>Connect Wallet</button>}

//       <h2>Pay Rent</h2>
//       <input type="text" placeholder="Rent Amount (ETH)" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} />
//       <button onClick={payRent}>Pay Rent</button>
//     </div>
//   );
// }

// export default App;




























// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";

// function App() {
//   const [account, setAccount] = useState(null);
//   const [rentAmount, setRentAmount] = useState("");

//   useEffect(() => {
//     connectWallet();
//   }, []);

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       setAccount(await signer.getAddress());
//     } else {
//       alert("Please install MetaMask");
//     }
//   };

//   const deployAgreement = async () => {
//     if (!account) return alert("Connect wallet first.");

//     try {
//         const response = await fetch("http://localhost:5000/deploy", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 tenant: account,
//                 rentAmount: "0.1", // Example value
//                 securityDeposit: "0.5",
//                 dueDate: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
//             }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             alert(`Contract Deployed at: ${data.contractAddress}`);
//         } else {
//             alert(`Error: ${data.error}`);
//         }
//     } catch (error) {
//         console.error(error);
//         alert("Deployment Failed");
//     }
// };


//   const payRent = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/pay-rent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rentAmount }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Rent Paid! Tx: " + data.txHash);
//       } else {
//         alert("Error: " + data.error);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error paying rent");
//     }
//   };

//   return (
//     <div>
//       <h1>Blockchain Rental Agreement</h1>
//       {account ? <p>Connected: {account}</p> : <button onClick={connectWallet}>Connect Wallet</button>}

//       <h2>Deploy Agreement</h2>
//       <button onClick={deployAgreement}>Deploy Agreement</button>

//       <h2>Pay Rent</h2>
//       <input
//         type="text"
//         placeholder="Rent Amount (ETH)"
//         value={rentAmount}
//         onChange={(e) => setRentAmount(e.target.value)}
//       />
//       <button onClick={payRent}>Pay Rent</button>
      
//     </div>
//   );
// }

// export default App;










// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";

// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed contract address
// const contractABI = [
//   {
//     "inputs": [
//       { "internalType": "address", "name": "_tenant", "type": "address" },
//       { "internalType": "uint256", "name": "_rentAmount", "type": "uint256" },
//       { "internalType": "uint256", "name": "_securityDeposit", "type": "uint256" },
//       { "internalType": "uint256", "name": "_dueDate", "type": "uint256" }
//     ],
//     "stateMutability": "payable",
//     "type": "constructor"
//   },
//   { "inputs": [], "name": "payRent", "outputs": [], "stateMutability": "payable", "type": "function" },
//   { "inputs": [], "name": "terminateAgreement", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
//   { "inputs": [], "name": "refundDeposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
//   { "inputs": [], "name": "landlord", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
//   { "inputs": [], "name": "tenant", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
//   { "inputs": [], "name": "isActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }
// ];

// function App() {
//   const [account, setAccount] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
  
//   // Agreement form state
//   const [tenant, setTenant] = useState("");
//   const [rentAmount, setRentAmount] = useState("");
//   const [securityDeposit, setSecurityDeposit] = useState("");
//   const [dueDate, setDueDate] = useState("");

//   // Function to connect MetaMask wallet
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const web3Provider = new ethers.BrowserProvider(window.ethereum);
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const web3Signer = await web3Provider.getSigner();
//         const userAddress = await web3Signer.getAddress();
//         const contractInstance = new ethers.Contract(contractAddress, contractABI, web3Signer);

//         setProvider(web3Provider);
//         setSigner(web3Signer);
//         setContract(contractInstance);
//         setAccount(userAddress);

//         console.log("Wallet connected:", userAddress);
//       } catch (error) {
//         console.error("Error connecting wallet:", error);
//       }
//     } else {
//       alert("MetaMask is not installed. Please install it to use this feature.");
//     }
//   };

// //   // Function to pay rent
// const payRent = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/pay-rent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ rentAmount }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       alert("Rent Paid! Tx: " + data.txHash);
//     } else {
//       alert("Error: " + data.error);
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Error paying rent");
//   }
// };


//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Blockchain Rental Agreement</h1>
      
//       {account ? (
//         <p>Connected Wallet: <b>{account}</b></p>
//       ) : (
//         <button onClick={connectWallet} style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}>
//           Connect MetaMask
//         </button>
//       )}

//       <h2>Manage Agreement</h2>
//       <input type="text" placeholder="Rent Amount (ETH)" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} />
//       <br />
//       <button onClick={payRent} style={{ padding: "10px", marginTop: "10px", fontSize: "16px", cursor: "pointer" }}>
//         Pay Rent
//       </button>
//     </div>
//   );
// }

// export default App;















// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { Search, Users, Calendar, ChevronDown } from "lucide-react";


// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed contract address
// const contractABI = [
//   {
//     "inputs": [
//       { "internalType": "address", "name": "_tenant", "type": "address" },
//       { "internalType": "uint256", "name": "_rentAmount", "type": "uint256" },
//       { "internalType": "uint256", "name": "_securityDeposit", "type": "uint256" },
//       { "internalType": "uint256", "name": "_dueDate", "type": "uint256" }
//     ],
//     "stateMutability": "payable",
//     "type": "constructor"
//   },
//   { "inputs": [], "name": "payRent", "outputs": [], "stateMutability": "payable", "type": "function" },
//   { "inputs": [], "name": "terminateAgreement", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
//   { "inputs": [], "name": "refundDeposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
//   { "inputs": [], "name": "landlord", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
//   { "inputs": [], "name": "tenant", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
//   { "inputs": [], "name": "isActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }
// ];

// function App() {
//   const [account, setAccount] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
  
//   // Agreement form state
//   const [tenant, setTenant] = useState("");
//   const [rentAmount, setRentAmount] = useState("");
//   const [securityDeposit, setSecurityDeposit] = useState("");
//   const [dueDate, setDueDate] = useState("");

//   // Function to connect MetaMask wallet
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const web3Provider = new ethers.BrowserProvider(window.ethereum);
//        const accounts= await window.ethereum.request({ method: "eth_requestAccounts" });
//         const web3Signer = await web3Provider.getSigner();
//         const userAddress = await web3Signer.getAddress();
//         const contractInstance = new ethers.Contract(contractAddress, contractABI, web3Signer);
//         console.log("Wallet connected:" ,{accounts} );
//         setProvider(web3Provider);
//         setSigner(web3Signer);
//         setContract(contractInstance);
//         setAccount(userAddress);

//         console.log("Wallet connected:", userAddress);
//       } catch (error) {
//         console.error("Error connecting wallet:", error);
//       }
//     } else {
//       alert("MetaMask is not installed. Please install it to use this feature.");
//     }
//   };

//   // Function to pay rent
//   const payRent = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/pay-rent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rentAmount }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Rent Paid! Tx: " + data.txHash);
//       } else {
//         alert("Error: " + data.error);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error paying rent");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="bg-white border-b">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="text-2xl font-bold">Tor-Rent</div>
//           <nav className="hidden md:flex space-x-8">
//             <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Landlords</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Blog</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Contacts</a>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div className="bg-pink-50">
//         <div className="container mx-auto px-6 py-16">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h1 className="text-5xl font-bold mb-6">Secure your rental agreement on blockchain</h1>
//               <p className="text-gray-600 mb-8">
//                 Experience the future of property rental with our decentralized platform. 
//                 Transparent, secure, and efficient.
//               </p>

//               {/* Search Bar */}
//               <div className="bg-white rounded-full shadow-lg p-2 flex items-center space-x-4">
//                 <div className="flex-1 flex items-center space-x-4 px-4">
//                   <Search className="text-gray-400" />
//                   <input 
//                     type="text" 
//                     placeholder="Enter property address"
//                     className="w-full focus:outline-none"
//                   />
//                 </div>
//                 <div className="flex items-center space-x-4 px-4 border-l border-gray-200">
//                   <Users className="text-gray-400" />
//                   <span className="text-gray-600">Guests</span>
//                   <ChevronDown className="text-gray-400" />
//                 </div>
//                 <button className="bg-blue-900 text-white px-8 py-3 rounded-full">
//                   Search
//                 </button>
//               </div>
//             </div>

//             {/* Connect Wallet Section */}
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               {!account ? (
//                 <button 
//                   onClick={connectWallet}
//                   className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition"
//                 >
//                   Connect MetaMask
//                 </button>
//               ) : (
//                 <div className="text-center mb-6">
//                   <p className="text-gray-600">Connected Wallet</p>
//                   <p className="font-mono text-sm mt-2">{account}</p>
//                 </div>
//               )}

//               {/* Rental Agreement Form */}
//               <div className="space-y-4 mt-6">
//                 <input
//                   type="text"
//                   placeholder="Tenant Address"
//                   value={tenant}
//                   onChange={(e) => setTenant(e.target.value)}
//                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Rent Amount (ETH)"
//                   value={rentAmount}
//                   onChange={(e) => setRentAmount(e.target.value)}
//                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Security Deposit (ETH)"
//                   value={securityDeposit}
//                   onChange={(e) => setSecurityDeposit(e.target.value)}
//                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Due Date"
//                   value={dueDate}
//                   onChange={(e) => setDueDate(e.target.value)}
//                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="grid grid-cols-2 gap-4 mt-6">
//                 <button
//                   onClick={payRent}
//                   className="bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition"
//                 >
//                   Pay Rent
//                 </button>
//                 <button
//                   className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
//                 >
//                   Terminate
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Feature Section */}
//       <div className="container mx-auto px-6 py-16">
//         <h2 className="text-3xl font-bold mb-12 text-center">The future is flexible</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="text-center">
//             <div className="bg-pink-50 p-6 rounded-lg mb-4">
//               <Calendar className="mx-auto text-blue-900" size={32} />
//             </div>
//             <h3 className="font-bold mb-2">Smart Contracts</h3>
//             <p className="text-gray-600">Automated and secure rental agreements on the blockchain</p>
//           </div>
//           <div className="text-center">
//             <div className="bg-pink-50 p-6 rounded-lg mb-4">
//               <Users className="mx-auto text-blue-900" size={32} />
//             </div>
//             <h3 className="font-bold mb-2">Transparent</h3>
//             <p className="text-gray-600">Clear terms and conditions for all parties</p>
//           </div>
//           <div className="text-center">
//             <div className="bg-pink-50 p-6 rounded-lg mb-4">
//               <Search className="mx-auto text-blue-900" size={32} />
//             </div>
//             <h3 className="font-bold mb-2">Efficient</h3>
//             <p className="text-gray-600">Quick and easy rental payment processing</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default App;



















//verifycode

import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import "./App.css";

const contractAddress = "0xYourDeployedContractAddress";
const contractABI = [ /* ABI from compilation */ ];

function App() {
  const [aadhaar, setAadhaar] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [anonID, setAnonID] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  // 📌 Request OTP from Backend
  const requestOTP = async () => {
    if (!aadhaar || !phone) {
      alert("Please enter Aadhaar and Phone Number!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/request-otp", {
        aadhaarNumber: aadhaar,
        phone: phone
      });

      if (res.data.success) {
        alert("OTP sent! Check backend console for the OTP.");
        setOtpSent(true);
      } else {
        alert("Error requesting OTP.");
      }
    } catch (err) {
      console.error("Request OTP Error:", err);
      alert("Failed to send OTP. Try again.");
    }
  };

  // 📌 Verify OTP and Get Anonymous ID
  const verifyAadhaar = async () => {
    if (!otp) {
      alert("Please enter the OTP!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/verify-otp", {
        aadhaarNumber: aadhaar,
        phone: phone,
        otp: otp
      });

      if (res.data.success) {
        setAnonID(res.data.anonymousID);
        alert("Aadhaar Verified! Anonymous ID Generated.");
      } else {
        alert("Invalid OTP. Try again.");
      }
    } catch (err) {
      console.error("Verify OTP Error:", err);
      alert("OTP verification failed.");
    }
  };

  // 📌 Connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3Signer = await web3Provider.getSigner();
      const rentalContract = new ethers.Contract(contractAddress, contractABI, web3Signer);

      setProvider(web3Provider);
      setSigner(web3Signer);
      setContract(rentalContract);
    } else {
      alert("MetaMask is required!");
    }
  };

  // 📌 Register on Blockchain
  const registerOnBlockchain = async () => {
    if (!contract) return alert("Connect MetaMask first!");
    try {
      const tx = await contract.verifyUser(anonID);
      await tx.wait();
      alert("User Registered on Blockchain!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Aadhaar Anonymous Blockchain Login</h1>

      <input 
        type="text" 
        placeholder="Enter Aadhaar Number" 
        value={aadhaar} 
        onChange={(e) => setAadhaar(e.target.value)} 
      />
      
      <input 
        type="text" 
        placeholder="Enter Phone Number" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      
      <button onClick={requestOTP} disabled={otpSent}>
        {otpSent ? "OTP Sent (Check Console)" : "Request OTP"}
      </button>

      {otpSent && (
        <>
          <input 
            type="text" 
            placeholder="Enter OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
          />
          <button onClick={verifyAadhaar}>Verify Aadhaar</button>
        </>
      )}

      {anonID && (
        <div>
          <p>Anonymous ID: <b>{anonID}</b></p>
          <button onClick={connectWallet}>Connect MetaMask</button>
          <button onClick={registerOnBlockchain}>Register on Blockchain</button>
        </div>
      )}
    </div>
  );
}

export default App;







// import React from 'react';
// import AadhaarVerification from './AadhaarVerification';

// const App = () => {
//   return (
//     <div className="App">
//       <h1>Welcome to the Aadhaar Verification System</h1>
//       <AadhaarVerification />
//     </div>
//   );
// };

// export default App;

