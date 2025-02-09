import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Wallet, DollarSign, AlertCircle } from "lucide-react";
import ABI from "../../TorRentABI.json";
const CONTRACT_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3"

const TenantDashboard = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [agreements, setAgreements] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  let provider;

  useEffect(() => {
    if (account) {
      fetchData();
    }
  }, [account]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchBalance(), fetchAgreements(), fetchTransactions()]);
      setError("");
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch dashboard data");
    } finally {
      setIsLoading(false);
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
      provider = new ethers.BrowserProvider(window.ethereum);
      setError("");
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError("Failed to connect wallet");
    }
  };

  const fetchBalance = async () => {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance));
    } catch (err) {
      console.error("Error fetching balance:", err);
      throw err;
    }
  };

  const fetchAgreements = async () => {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const count = await contract.agreementCount();

      const fetchedAgreements = [];
      for (let i = 1; i <= count; i++) {
        const agreement = await contract.agreements(i);
        fetchedAgreements.push({
          landlord: agreement.landlord,
          tenant: agreement.tenant,
          rent: agreement.rent,
          deposit: agreement.deposit,
          depositPaid: agreement.depositPaid || false, // Update logic if your contract tracks depositPaid
        });
      }

      const tenantAgreements = fetchedAgreements.filter(
        (agreement) => agreement.tenant.toLowerCase() === account.toLowerCase()
      );

      setAgreements(tenantAgreements);
    } catch (err) {
      console.error("Error fetching agreements:", err);
      throw err;
    }
  };

  const fetchTransactions = async () => {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

      const filter = contract.filters.RentPaid(null, account);
      const events = await contract.queryFilter(filter);

      const transactions = await Promise.all(
        events.map(async (event) => {
          const block = await event.getBlock();
          return {
            agreementId: event.args[0].toString(),
            amount: ethers.formatEther(event.args[2]),
            timestamp: new Date(block.timestamp * 1000).toLocaleDateString(),
          };
        })
      );

      setTransactions(transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      throw err;
    }
  };

  const payRent = async (agreementId, rentAmount) => {
    setIsLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.payRent(agreementId, {
        value: ethers.parseEther(rentAmount.toString()),
      });
      await tx.wait();

      await fetchData();
      setError("");
    } catch (err) {
      console.error("Error paying rent:", err);
      setError("Failed to pay rent");
    } finally {
      setIsLoading(false);
    }
  };

  const payDeposit = async (agreementId, depositAmount) => {
    setIsLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.payDeposit(agreementId, {
        value: ethers.parseEther(depositAmount.toString()),
      });
      await tx.wait();

      await fetchAgreements();
      setError("");
    } catch (err) {
      console.error("Error paying deposit:", err);
      setError("Failed to pay deposit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Tenant Dashboard</h1>
              <p className="mt-2 text-lg text-gray-600">Manage your rental agreements and payments</p>
            </div>
            {!account ? (
              <button
                onClick={connectWallet}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all"
              >
                <Wallet size={20} /> Connect Wallet
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg px-6 py-3">
                  <p className="text-sm text-gray-600">Wallet Balance</p>
                  <p className="font-semibold text-blue-900">{parseFloat(balance).toFixed(4)} ETH</p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-6 py-3">
                  <p className="text-sm text-gray-600">Connected As</p>
                  <p className="font-mono text-sm truncate w-32">{account}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto mt-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {account && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold">Active Rental Agreements</h2>
              <div className="mt-4 space-y-4">
                {agreements.length > 0 ? (
                  agreements.map((agreement, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm text-gray-600">Landlord: {agreement.landlord}</p>
                        <p className="text-sm text-gray-600">Rent: {ethers.formatEther(agreement.rent)} ETH</p>
                        <p className="text-sm text-gray-600">Deposit: {ethers.formatEther(agreement.deposit)} ETH</p>
                      </div>
                      {!agreement.depositPaid && (
                        <button
                          onClick={() =>
                            payDeposit(index + 1, ethers.formatEther(agreement.deposit))
                          }
                          disabled={isLoading}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Pay Deposit
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No active agreements found</p>
                )}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold">Recent Transactions</h2>
              <div className="mt-4 space-y-4">
                {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-medium">Agreement #{tx.agreementId}</p>
                        <p className="text-sm text-gray-600">{tx.timestamp}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-800">{tx.amount} ETH</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No transactions found</p>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default TenantDashboard;