// NgoDashboard.jsx
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// NGO Wallet Configuration
const NGO_WALLET = "0x8283d8c080Ca6d6DbA241262b83Cd4070080d5a9"; // Fixed NGO wallet
const CONTRACT_ADDRESS = "0x1520b2965264e0B6Cf6260B345812656d55De16d"; // Your contract address
const REGULATORY_WALLET = "0x5A37BB96Fbc1a6253e1EC47fb07b9560546228c3"; // Regulatory wallet

// Minimal ERC-20 ABI
const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];

const NgoDashboard = () => {
  // State management
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  
  // Balances and fees
  const [ethBalance, setEthBalance] = useState("0");
  const [tokenBalance, setTokenBalance] = useState("0");
  const [gasFee, setGasFee] = useState("0");
  
  // Transaction data
  const [buyerAddress, setBuyerAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  
  // Analytics
  const [totalReceived, setTotalReceived] = useState("0");
  const [totalSent, setTotalSent] = useState("0");
  const [netBalance, setNetBalance] = useState("0");
  
  // Token info
  const [tokenSymbol, setTokenSymbol] = useState("");

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this dApp");
        return;
      }

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const web3Signer = web3Provider.getSigner();
      const connectedAccount = await web3Signer.getAddress();

      // Check if connected to Sepolia
      const network = await web3Provider.getNetwork();
      if (network.chainId !== 11155111) {
        alert("Please switch to Sepolia network in MetaMask");
        return;
      }

      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(connectedAccount);

      // Initialize contract
      const tokenContract = new ethers.Contract(CONTRACT_ADDRESS, TOKEN_ABI, web3Provider);
      setContract(tokenContract);

      // Load initial data
      await loadWalletData(web3Provider, tokenContract);
      await loadTransactionHistory(tokenContract, web3Provider);

    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet");
    }
  };

  // Load wallet balances and data
  const loadWalletData = async (prov = provider, contractInst = contract) => {
    if (!prov || !contractInst) return;

    try {
      // Load ETH balance
      const ethBal = await prov.getBalance(NGO_WALLET);
      setEthBalance(ethers.utils.formatEther(ethBal));

      // Load token balance
      const tokenBal = await contractInst.balanceOf(NGO_WALLET);
      const decimals = await contractInst.decimals().catch(() => 18);
      setTokenBalance(ethers.utils.formatUnits(tokenBal, decimals));

      // Load token symbol
      const symbol = await contractInst.symbol();
      setTokenSymbol(symbol);

      // Estimate gas fee for a typical transfer
      const gasPrice = await prov.getGasPrice();
      const estimatedGas = ethers.BigNumber.from(21000); // Basic transfer gas
      const estimatedFee = gasPrice.mul(estimatedGas);
      setGasFee(ethers.utils.formatEther(estimatedFee));

    } catch (error) {
      console.error("Error loading wallet data:", error);
    }
  };

  // Transfer credits to buyer
  const transferToBuyer = async () => {
    if (!signer || !contract) {
      alert("Please connect wallet first");
      return;
    }

    if (!buyerAddress || !transferAmount) {
      alert("Please enter buyer address and amount");
      return;
    }

    try {
      // Validate address
      if (!ethers.utils.isAddress(buyerAddress)) {
        alert("Invalid buyer address");
        return;
      }

      // Confirm transaction
      const confirmation = window.confirm(
        `Transfer ${transferAmount} ${tokenSymbol} to ${buyerAddress.slice(0, 8)}...?`
      );
      if (!confirmation) return;

      // Execute transfer
      const decimals = await contract.decimals().catch(() => 18);
      const amountInWei = ethers.utils.parseUnits(transferAmount, decimals);
      
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.transfer(buyerAddress, amountInWei);

      // Add to transaction history
      const newTx = {
        hash: tx.hash,
        type: "SENT_TO_BUYER",
        from: NGO_WALLET,
        to: buyerAddress,
        amount: transferAmount,
        symbol: tokenSymbol,
        timestamp: new Date().toLocaleString(),
        status: "Pending",
        direction: "outgoing"
      };
      
      setTransactionHistory(prev => [newTx, ...prev]);

      // Wait for confirmation
      await tx.wait();

      // Update status and reload balances
      setTransactionHistory(prev => 
        prev.map(tx => 
          tx.hash === newTx.hash ? { ...tx, status: "Confirmed" } : tx
        )
      );
      
      await loadWalletData();
      await loadTransactionHistory(); // Reload history to update analytics
      setBuyerAddress("");
      setTransferAmount("");
      
      alert("Transfer successful!");

    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed: " + error.message);
    }
  };

  // Load transaction history with both incoming and outgoing transactions
  const loadTransactionHistory = async (contractInst = contract, prov = provider) => {
    if (!contractInst || !prov) return;

    try {
      const currentBlock = await prov.getBlockNumber();
      const fromBlock = Math.max(0, currentBlock - 100000); // Increased block range

      // Get all transfers involving the NGO wallet
      const incomingTransfers = await contractInst.queryFilter(
        contractInst.filters.Transfer(null, NGO_WALLET),
        fromBlock
      );

      const outgoingTransfers = await contractInst.queryFilter(
        contractInst.filters.Transfer(NGO_WALLET, null),
        fromBlock
      );

      // Process incoming transfers (from regulator)
      const incomingHistory = incomingTransfers.map(tx => ({
        hash: tx.transactionHash,
        type: tx.args.from.toLowerCase() === REGULATORY_WALLET.toLowerCase() ? "RECEIVED_FROM_REGULATOR" : "RECEIVED_FROM_OTHER",
        from: tx.args.from,
        to: tx.args.to,
        amount: ethers.utils.formatUnits(tx.args.value, 18),
        symbol: tokenSymbol,
        timestamp: "On-chain",
        status: "Confirmed",
        block: tx.blockNumber,
        direction: "incoming"
      }));

      // Process outgoing transfers (to buyers)
      const outgoingHistory = outgoingTransfers.map(tx => ({
        hash: tx.transactionHash,
        type: "SENT_TO_BUYER",
        from: tx.args.from,
        to: tx.args.to,
        amount: ethers.utils.formatUnits(tx.args.value, 18),
        symbol: tokenSymbol,
        timestamp: "On-chain",
        status: "Confirmed",
        block: tx.blockNumber,
        direction: "outgoing"
      }));

      // Combine and sort by block number (newest first)
      const combinedHistory = [...incomingHistory, ...outgoingHistory]
        .sort((a, b) => (b.block || 0) - (a.block || 0));

      setTransactionHistory(combinedHistory);
      
      // Calculate analytics
      calculateAnalytics(combinedHistory);

    } catch (error) {
      console.error("Error loading transaction history:", error);
    }
  };

  // Calculate analytics from transaction history
  const calculateAnalytics = (transactions = transactionHistory) => {
    let received = 0;
    let sent = 0;

    transactions.forEach(tx => {
      const amount = parseFloat(tx.amount);
      if (tx.direction === "incoming") {
        received += amount;
      } else if (tx.direction === "outgoing") {
        sent += amount;
      }
    });

    setTotalReceived(received.toFixed(4));
    setTotalSent(sent.toFixed(4));
    setNetBalance((received - sent).toFixed(4));
  };

  // Auto-refresh data
  useEffect(() => {
    const loadData = async () => {
      if (provider && contract) {
        await loadWalletData();
        await loadTransactionHistory();
      }
    };

    loadData();
    
    const interval = setInterval(() => {
      loadData();
    }, 30000); // Refresh every 30s
    
    return () => clearInterval(interval);
  }, [provider, contract]);

  // Short address formatter
  const shortAddress = (addr) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  // Filter transactions by type
  const receivedFromRegulator = transactionHistory.filter(tx => tx.type === "RECEIVED_FROM_REGULATOR");
  const sentToBuyers = transactionHistory.filter(tx => tx.type === "SENT_TO_BUYER");

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="max-w-10xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 p-4 bg-white rounded-lg border border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🌍 NGO Dashboard</h1>
            <p className="text-teal-600">Sepolia Testnet - Credit Management</p>
          </div>
          
          {!account ? (
            <button
              onClick={connectWallet}
              className="bg-teal-800 text-white px-6 py-2 rounded font-bold"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="text-right">
              <p className="text-sm text-gray-700">Connected: {shortAddress(account)}</p>
              <p className="text-xs text-teal-600">Sepolia Network</p>
            </div>
          )}
        </header>

        {/* Analytics Section */}
        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
            <h3 className="text-teal-600 text-sm">Total Received</h3>
            <p className="text-2xl font-bold text-gray-900">{totalReceived} {tokenSymbol}</p>
            <p className="text-xs text-teal-500">From Regulator</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
            <h3 className="text-teal-600 text-sm">Total Sent</h3>
            <p className="text-2xl font-bold text-gray-900">{totalSent} {tokenSymbol}</p>
            <p className="text-xs text-teal-500">To Buyers</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
            <h3 className="text-teal-600 text-sm">Net Balance</h3>
            <p className="text-2xl font-bold text-gray-900">{netBalance} {tokenSymbol}</p>
            <p className="text-xs text-teal-500">Available Credits</p>
          </div>
        </section>

        {/* Wallet Info Section */}
        <section className="grid md:grid-cols-2 gap-6 mb-8">
          {/* NGO Wallet Info */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-900">NGO Wallet</h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-teal-600 text-sm">Force</label>
                <p className="font-mono text-sm break-all text-gray-700">{NGO_WALLET}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-teal-600 text-sm">ETH Balance</label>
                  <p className="text-lg font-bold text-gray-900">{parseFloat(ethBalance).toFixed(6)} ETH</p>
                </div>
                
                <div>
                  <label className="text-teal-600 text-sm">Token Balance</label>
                  <p className="text-lg font-bold text-gray-900">{parseFloat(tokenBalance).toFixed(4)} {tokenSymbol}</p>
                </div>
              </div>

              <div>
                <label className="text-teal-600 text-sm">Estimated Gas Fee</label>
                <p className="text-sm text-gray-700">{parseFloat(gasFee).toFixed(6)} ETH</p>
              </div>

              <div>
                <label className="text-teal-600 text-sm">Contract</label>
                <p className="font-mono text-xs break-all text-gray-700">{CONTRACT_ADDRESS}</p>
              </div>
            </div>
          </div>

          {/* Transfer Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Transfer Credits to Buyer</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-teal-600 text-sm mb-2">Buyer Address</label>
                <input
                  type="text"
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-teal-600 text-sm mb-2">Amount ({tokenSymbol})</label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-gray-800"
                />
              </div>
              
              <button
                onClick={transferToBuyer}
                disabled={!account || !buyerAddress || !transferAmount}
                className="w-full bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded font-bold"
              >
                Transfer to Buyer
              </button>
            </div>
          </div>
        </section>

        {/* Transaction History Section */}
        <section className="mb-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Credits Received from Regulator */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-900">📥 Received from Regulator</h2>
              
              {receivedFromRegulator.length === 0 ? (
                <p className="text-teal-600 text-center py-8">No credits received from regulator yet</p>
              ) : (
                <div className="overflow-x-auto max-h-80">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-2 text-gray-700">From</th>
                        <th className="text-left p-2 text-gray-700">Amount</th>
                        <th className="text-left p-2 text-gray-700">Block</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receivedFromRegulator.map((tx, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="p-2 font-mono text-sm text-gray-700">{shortAddress(tx.from)}</td>
                          <td className="p-2 font-bold text-teal-700">{tx.amount} {tx.symbol}</td>
                          <td className="p-2 text-sm text-gray-700">{tx.block}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-3 p-2 bg-gray-50 rounded border border-gray-200">
                <p className="text-sm text-teal-600">Total Received: <span className="font-bold text-gray-900">{totalReceived} {tokenSymbol}</span></p>
              </div>
            </div>

            {/* Credits Sent to Buyers */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-900">📤 Sent to Buyers</h2>
              
              {sentToBuyers.length === 0 ? (
                <p className="text-teal-600 text-center py-8">No credits sent to buyers yet</p>
              ) : (
                <div className="overflow-x-auto max-h-80">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-2 text-gray-700">To</th>
                        <th className="text-left p-2 text-gray-700">Amount</th>
                        <th className="text-left p-2 text-gray-700">Block</th>
                        <th className="text-left p-2 text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sentToBuyers.map((tx, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="p-2 font-mono text-sm text-gray-700">{shortAddress(tx.to)}</td>
                          <td className="p-2 font-bold text-teal-700">{tx.amount} {tx.symbol}</td>
                          <td className="p-2 text-sm text-gray-700">{tx.block}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              tx.status === "Confirmed" ? "bg-teal-100 text-teal-800" : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-3 p-2 bg-gray-50 rounded border border-gray-200">
                <p className="text-sm text-teal-600">Total Sent: <span className="font-bold text-gray-900">{totalSent} {tokenSymbol}</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Transaction History */}
        <section className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">📋 Complete Transaction History</h2>
            <span className="text-teal-600">
              {transactionHistory.length} transactions total
            </span>
          </div>
          
          {transactionHistory.length === 0 ? (
            <p className="text-teal-600 text-center py-8">No transactions yet</p>
          ) : (
            <div className="overflow-x-auto max-h-96">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 text-gray-700">Type</th>
                    <th className="text-left p-3 text-gray-700">From/To</th>
                    <th className="text-left p-3 text-gray-700">Amount</th>
                    <th className="text-left p-3 text-gray-700">Block</th>
                    <th className="text-left p-3 text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((tx, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          tx.type === "RECEIVED_FROM_REGULATOR" ? "bg-teal-100 text-teal-800" : 
                          tx.type === "SENT_TO_BUYER" ? "bg-teal-100 text-teal-800" : 
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {tx.type.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-sm text-gray-700">
                        {tx.direction === "incoming" ? 
                          `From: ${shortAddress(tx.from)}` : 
                          `To: ${shortAddress(tx.to)}`
                        }
                      </td>
                      <td className="p-3 font-bold">
                        <span className={tx.direction === "incoming" ? "text-teal-700" : "text-teal-700"}>
                          {tx.direction === "incoming" ? "+" : "-"}{tx.amount} {tx.symbol}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-700">{tx.block}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          tx.status === "Confirmed" ? "bg-teal-100 text-teal-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default NgoDashboard;
