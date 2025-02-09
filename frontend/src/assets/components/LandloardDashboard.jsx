import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Wallet, AlertCircle } from "lucide-react";
import { Alert } from "flowbite-react";
import ABI from "../../TorRentABI.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const LandlordDashboard = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [agreements, setAgreements] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newAgreement, setNewAgreement] = useState({
    tenantAddress: "",
    rent: "",
    deposit: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (account) {
      fetchData();
    }
  }, [account]);

  const fetchData = async () => {
    try {
      await Promise.all([fetchBalance(), fetchAgreements(), fetchTransactions()]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch dashboard data");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setError("");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError("Failed to connect wallet!");
    }
  };

  const fetchBalance = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.formatEther(balance));
  };

  const fetchAgreements = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, provider);

    const agreementCount = await contract.agreementCount();
    const agreementPromises = [];

    for (let i = 1; i <= agreementCount; i++) {
      agreementPromises.push(contract.agreements(i));
    }

    const agreementResults = await Promise.all(agreementPromises);
    const filteredAgreements = agreementResults
      .map((agreement, index) => ({
        id: index + 1,
        landlord: agreement.landlord,
        tenant: agreement.tenant,
        rent: ethers.formatEther(agreement.rent),
        deposit: ethers.formatEther(agreement.deposit),
        startDate: new Date(agreement.startDate * 1000).toLocaleDateString(),
        endDate: new Date(agreement.endDate * 1000).toLocaleDateString(),
        isActive: agreement.isActive,
      }))
      .filter((agreement) => agreement.landlord.toLowerCase() === account.toLowerCase());

    setAgreements(filteredAgreements);
  };

  const fetchTransactions = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, provider);

    const filter = contract.filters.RentPaid();
    const events = await contract.queryFilter(filter);

    const txs = await Promise.all(
      events.map(async (event) => {
        const agreement = await contract.agreements(event.args.agreementId);
        if (agreement.landlord.toLowerCase() === account.toLowerCase()) {
          return {
            agreementId: event.args.agreementId,
            tenant: event.args.tenant,
            amount: ethers.formatEther(event.args.amount),
            timestamp: new Date((await event.getBlock()).timestamp * 1000).toLocaleString(),
          };
        }
        return null;
      })
    );

    setTransactions(txs.filter((tx) => tx !== null));
  };

//   const createAgreement = async () => {
//     if (!account) {
//       setError("Please connect your wallet first");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);

//       const startTimestamp = Math.floor(new Date(newAgreement.startDate).getTime() / 1000);
//       const endTimestamp = Math.floor(new Date(newAgreement.endDate).getTime() / 1000);

//       const tx = await contract.createAgreement(
//         newAgreement.tenantAddress,
//         ethers.parseEther(newAgreement.rent),
//         ethers.parseEther(newAgreement.deposit),
//         startTimestamp,
//         endTimestamp,
//         { value: ethers.parseEther(newAgreement.deposit) }
//       );

//       await tx.wait();
//       await fetchData();
//       setNewAgreement({
//         tenantAddress: "",
//         rent: "",
//         deposit: "",
//         startDate: "",
//         endDate: "",
//       });
//       setError("");
//     } catch (error) {
//       console.error("Error creating agreement:", error);
//       setError("Failed to create agreement");
//     } finally {
//       setIsLoading(false);
//     }
//   };

const createAgreement = async () => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }
  
    setIsLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);
  
      const startTimestamp = Math.floor(new Date(newAgreement.startDate).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(newAgreement.endDate).getTime() / 1000);
  
      const tx = await contract.createAgreement(
        newAgreement.tenantAddress,
        ethers.parseEther(newAgreement.rent),
        ethers.parseEther(newAgreement.deposit),
        startTimestamp,
        endTimestamp
      );
  
      await tx.wait();
      await fetchData();
      setNewAgreement({
        tenantAddress: "",
        rent: "",
        deposit: "",
        startDate: "",
        endDate: "",
      });
      setError("");
    } catch (error) {
      console.error("Error creating agreement:", error);
      setError("Failed to create agreement");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Landlord Dashboard</h1>
            <p className="mt-1 text-gray-500">Manage your rental properties and agreements</p>
          </div>
          {!account ? (
            <button
              onClick={connectWallet}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              <Wallet size={20} />
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <p className="text-sm text-gray-500">Balance</p>
                <p className="font-semibold">{parseFloat(balance).toFixed(4)} ETH</p>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <p className="text-sm text-gray-500">Account</p>
                <p className="font-mono text-sm truncate w-32">{account}</p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <Alert color="failure" icon={AlertCircle} className="mb-6">
            <span>
              <span className="font-medium">Error:</span> {error}
            </span>
          </Alert>
        )}

        {/* New Agreement Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Agreement</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Tenant Address"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={newAgreement.tenantAddress}
              onChange={(e) => setNewAgreement({ ...newAgreement, tenantAddress: e.target.value })}
            />
            <input
              type="text"
              placeholder="Rent (ETH)"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={newAgreement.rent}
              onChange={(e) => setNewAgreement({ ...newAgreement, rent: e.target.value })}
            />
            <input
              type="text"
              placeholder="Deposit (ETH)"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={newAgreement.deposit}
              onChange={(e) => setNewAgreement({ ...newAgreement, deposit: e.target.value })}
            />
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={newAgreement.startDate}
              onChange={(e) => setNewAgreement({ ...newAgreement, startDate: e.target.value })}
            />
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={newAgreement.endDate}
              onChange={(e) => setNewAgreement({ ...newAgreement, endDate: e.target.value })}
            />
          </div>
          <button
            onClick={createAgreement}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Agreement"}
          </button>
        </div>

        {/* Agreements List */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Agreements</h2>
          {agreements.length === 0 ? (
            <p className="text-gray-500">No agreements found</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rent (ETH)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deposit (ETH)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agreements.map((agreement) => (
                  <tr key={agreement.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{agreement.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{agreement.tenant}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{agreement.rent}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{agreement.deposit}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{agreement.startDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{agreement.endDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {agreement.isActive ? "Active" : "Inactive"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Transactions */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions found</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agreement ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount (ETH)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((tx, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900">{tx.agreementId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{tx.tenant}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{tx.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;