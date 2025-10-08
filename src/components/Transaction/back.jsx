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
      timestamp: '2 minutes ago',
      status: 'Verified',
      statusColor: 'bg-green-100 text-green-800',
      statusDot: 'bg-green-500',
      buyer: 'EcoTech Solutions Pvt Ltd',
      ngoPartner: 'Mangrove Guardians Trust',
      project: 'Mangrove Restoration - Vembanad Lake, Kerala',
      mrvId: 'MRV-KL-2024-001',
      carbonCredits: '15,000',
      transactionValue: '₹427,500',
      pricePerCredit: '₹28.50'
    },
    {
      id: 'TX-2024-002',
      timestamp: '15 minutes ago',
      status: 'Processing',
      statusColor: 'bg-orange-100 text-orange-800',
      statusDot: 'bg-orange-500',
      buyer: 'Reliance Green Energy',
      ngoPartner: 'Ocean Conservation Bangladesh',
      project: 'Coastal Wetland Protection - Cox\'s Bazar',
      mrvId: 'MRV-BD-2024-007',
      carbonCredits: '8,500',
      transactionValue: '₹272,000',
      pricePerCredit: '₹32.00'
    },
    /*{
      id: 'TX-2024-003',
      timestamp: '1 hour ago',
      status: 'Verified',
      statusColor: 'bg-green-100 text-green-800',
      statusDot: 'bg-green-500',
      buyer: 'Tata Sustainability Initiative',
      ngoPartner: 'Tamil Nadu Marine Foundation',
      project: 'Seagrass Meadow Restoration - Pichavaram',
      mrvId: 'MRV-TN-2024-012',
      carbonCredits: '12,000',
      transactionValue: '₹450,000',
      pricePerCredit: '₹37.50'
    },
    {
      id: 'TX-2024-004',
      timestamp: '2 hours ago',
      status: 'Verified',
      statusColor: 'bg-green-100 text-green-800',
      statusDot: 'bg-green-500',
      buyer: 'Infosys Carbon Neutral',
      ngoPartner: 'Sri Lanka Coastal Trust',
      project: 'Mangrove Nursery Development - Negombo Lagoon',
      mrvId: 'MRV-LK-2024-005',
      carbonCredits: '18,700',
      transactionValue: '₹561,000',
      pricePerCredit: '₹30.00'
    },
    {
      id: 'TX-2024-005',
      timestamp: '3 hours ago',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      statusDot: 'bg-yellow-500',
      buyer: 'Wipro Green Initiative',
      ngoPartner: 'Maldives Blue Initiative',
      project: 'Coral-Seagrass Ecosystem Restoration - North Malé Atoll',
      mrvId: 'MRV-MV-2024-003',
      carbonCredits: '24,500',
      transactionValue: '₹980,000',
      pricePerCredit: '₹40.00'
    }*/
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
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-100/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-slate-200/[0.3]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Full Transparency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-medium text-sm">Full Transparency</span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-slate-800">Public </span>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Transparency Dashboard
            </span>
          </h2>
          
          <p className="text-slate-600 text-lg max-w-4xl mx-auto leading-relaxed">
            Complete visibility into all carbon credit transactions, project verifications, and NGO activities. 
            Building trust through radical transparency.
          </p>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Total Transaction Volume */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">₹{stats.totalVolume} Cr</div>
                <div className="text-slate-800 font-semibold mb-1">Total Transaction Volume</div>
                <div className="text-green-600 text-sm">This Month</div>
              </div>
            </div>
          </div>

          {/* Completed Transactions */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{stats.completedTransactions}</div>
                <div className="text-slate-800 font-semibold mb-1">Completed Transactions</div>
                <div className="text-green-600 text-sm">Last 30 Days</div>
              </div>
            </div>
          </div>

          {/* Verification Rate */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{stats.verificationRate}%</div>
                <div className="text-slate-800 font-semibold mb-1">Verification Rate</div>
                <div className="text-purple-600 text-sm">MRV Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-4 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-800">Recent Transactions</h3>
            <div className="flex items-center gap-2 text-slate-600">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Live Updates</span>
            </div>
          </div>

          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg shadow-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  {/* Status and Timestamp */}
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${transaction.statusDot}`}></div>
                    <span className="text-sm text-slate-500">{transaction.timestamp}</span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${transaction.statusColor}`}>
                      {transaction.status === 'Verified' && <CheckCircle className="w-3 h-3" />}
                      {transaction.status === 'Processing' && <Clock className="w-3 h-3" />}
                      {transaction.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {transaction.status}
                    </span>
                  </div>
                  
                  {/* Transaction ID */}
                  <div className="text-sm text-slate-400 font-mono">{transaction.id}</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Transaction Details */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Buyer</div>
                      <div className="font-semibold text-slate-800">{transaction.buyer}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-slate-500 mb-1">NGO Partner</div>
                      <div className="font-semibold text-slate-800">{transaction.ngoPartner}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Project</div>
                      <div className="font-semibold text-slate-800">{transaction.project}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-slate-500 mb-1">MRV ID</div>
                      <div className="font-mono text-purple-600">{transaction.mrvId}</div>
                    </div>
                  </div>

                  {/* Right Column - Financial Details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">{transaction.carbonCredits}</div>
                        <div className="text-xs text-slate-500">Carbon Credits</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-slate-800 mb-1">{transaction.transactionValue}</div>
                        <div className="text-xs text-slate-500">Transaction Value</div>
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-sm text-slate-500 mb-1">Price per Credit</div>
                      <div className="text-lg font-semibold text-slate-800">{transaction.pricePerCredit}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-full font-semibold transition-all duration-300 hover:bg-slate-700 hover:scale-105 hover:shadow-lg">
            <Eye className="w-5 h-5" />
            <span>View Complete Audit Trail</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-600/25 hover:scale-105">
            <TrendingUp className="w-5 h-5" />
            <span>Start Trading Credits</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-slate-200\/\[0\.3\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(226 232 240 / 0.3)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  );
};

export default Transaction;
