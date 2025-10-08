import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, CheckCircle, Clock, ExternalLink, ArrowRight, Eye, Activity } from 'lucide-react';

const Transaction = () => {
  const [stats, setStats] = useState({
    totalVolume: 0,
    completedTransactions: 0,
    verificationRate: 0
  });

  const [transactions, setTransactions] = useState([
    {
      id: 'TX-2024-001',
      timestamp: '2 min ago',
      status: 'Verified',
      statusColor: 'bg-teal-500/20 text-teal-700',
      statusDot: 'bg-teal-500',
      buyer: 'EcoTech Solutions',
      ngoPartner: 'Mangrove Guardians',
      project: 'Mangrove Restoration - Kerala',
      mrvId: 'MRV-KL-2024-001',
      carbonCredits: '15,000',
      transactionValue: '₹4.27L',
      pricePerCredit: '₹28.50'
    },
    {
      id: 'TX-2024-002',
      timestamp: '15 min ago',
      status: 'Processing',
      statusColor: 'bg-amber-500/20 text-amber-700',
      statusDot: 'bg-amber-500',
      buyer: 'Reliance Green',
      ngoPartner: 'Ocean Conservation BD',
      project: 'Coastal Protection - Cox\'s Bazar',
      mrvId: 'MRV-BD-2024-007',
      carbonCredits: '8,500',
      transactionValue: '₹2.72L',
      pricePerCredit: '₹32.00'
    }
  ]);

  // Animate stats on component mount
  useEffect(() => {
    const animateStats = () => {
      const targets = {
        totalVolume: 2.4,
        completedTransactions: 156,
        verificationRate: 100
      };

      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let current = { totalVolume: 0, completedTransactions: 0, verificationRate: 0 };

      const timer = setInterval(() => {
        current.totalVolume += targets.totalVolume / steps;
        current.completedTransactions += targets.completedTransactions / steps;
        current.verificationRate += targets.verificationRate / steps;

        if (current.totalVolume >= targets.totalVolume) {
          current.totalVolume = targets.totalVolume;
          current.completedTransactions = targets.completedTransactions;
          current.verificationRate = targets.verificationRate;
          clearInterval(timer);
        }

        setStats({
          totalVolume: Math.floor(current.totalVolume * 10) / 10,
          completedTransactions: Math.floor(current.completedTransactions),
          verificationRate: Math.floor(current.verificationRate)
        });
      }, increment);
    };

    animateStats();
  }, []);

  return (
    <section className="relative py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          {/* Full Transparency Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 mb-4">
            <Shield className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-teal-700 font-medium text-xs">Full Transparency</span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-gray-900">Public </span>
            <span className="text-teal-800">
              Transparency Dashboard
            </span>
          </h2>
          
          <p className="text-gray-700 text-sm max-w-2xl mx-auto">
            Complete visibility into carbon credit transactions, verifications, and NGO activities.
          </p>
        </div>

        {/* Summary Statistics - Compact Layout */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {/* Total Transaction Volume */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-center">
              <div className="text-xl font-bold text-teal-800 mb-1">₹{stats.totalVolume} Cr</div>
              <div className="text-xs text-gray-700 font-medium">Transaction Volume</div>
              <div className="text-teal-600 text-[10px] mt-1">This Month</div>
            </div>
          </div>

          {/* Completed Transactions */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-center">
              <div className="text-xl font-bold text-teal-800 mb-1">{stats.completedTransactions}</div>
              <div className="text-xs text-gray-700 font-medium">Transactions</div>
              <div className="text-teal-600 text-[10px] mt-1">Last 30 Days</div>
            </div>
          </div>

          {/* Verification Rate */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-center">
              <div className="text-xl font-bold text-teal-800 mb-1">{stats.verificationRate}%</div>
              <div className="text-xs text-gray-700 font-medium">Verification Rate</div>
              <div className="text-teal-600 text-[10px] mt-1">MRV Certified</div>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-3 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
            <div className="flex items-center gap-1 text-gray-600">
              <Activity className="w-3.5 h-3.5" />
              <span className="text-xs">Live Updates</span>
            </div>
          </div>

          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="bg-white rounded-xl border border-gray-200"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  {/* Status and Timestamp */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${transaction.statusDot}`}></div>
                    <span className="text-xs text-gray-500">{transaction.timestamp}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${transaction.statusColor}`}>
                      {transaction.status === 'Verified' && <CheckCircle className="w-2.5 h-2.5" />}
                      {transaction.status === 'Processing' && <Clock className="w-2.5 h-2.5" />}
                      {transaction.status}
                    </span>
                  </div>
                  
                  {/* Transaction ID */}
                  <div className="text-xs text-gray-500 font-mono">{transaction.id}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column - Transaction Details */}
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Buyer</div>
                      <div className="text-sm font-semibold text-gray-900">{transaction.buyer}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">NGO Partner</div>
                      <div className="text-sm font-semibold text-gray-900">{transaction.ngoPartner}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Project</div>
                      <div className="text-sm font-semibold text-gray-900">{transaction.project}</div>
                    </div>
                  </div>

                  {/* Right Column - Financial Details */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="text-sm font-bold text-teal-800 mb-0.5">{transaction.carbonCredits}</div>
                        <div className="text-[10px] text-gray-500">Credits</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="text-sm font-bold text-gray-900 mb-0.5">{transaction.transactionValue}</div>
                        <div className="text-[10px] text-gray-500">Value</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Price/Credit:</span>
                      <span className="font-semibold text-gray-900">{transaction.pricePerCredit}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">MRV ID:</span>
                      <span className="font-mono text-teal-700">{transaction.mrvId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons - Compact */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-gray-800 rounded-full text-sm font-semibold border border-gray-200">
            <Eye className="w-4 h-4" />
            <span>View Audit Trail</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-800 text-white rounded-full text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>Start Trading</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Transaction;
