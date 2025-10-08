import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ComposedChart, Tooltip, Legend } from 'recharts';
import { ShoppingCart, CreditCard, Shield, Eye, Download, Filter, Search, Bell, Settings, Globe, Zap, Target, Award, Activity, BarChart3, Camera, Star, Bookmark, Share2, RefreshCw, Mail, Phone, Map, TrendingUp, Users, Leaf, DollarSign, MapPin, Calendar, CheckCircle, Clock, AlertCircle, Plus, Minus, Heart, ShoppingBag, Wallet, ArrowUpDown, BarChart2, PieChart as PieChartIcon, Database, FileText, ChevronDown, ExternalLink, QrCode, Lock, Unlock, Coins, Sparkles, X } from 'lucide-react';
import TransactionBuyer from './TansactionBuyer';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Marketplace');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([40, 60]);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [realTimePrices, setRealTimePrices] = useState({});

  // Real-time price updates
  useEffect(() => {
    const projects = ['Mangrove Restoration', 'Seagrass Conservation', 'Coastal Wetland', 'Kelp Forest'];
    const interval = setInterval(() => {
      const newPrices = {};
      projects.forEach(project => {
        newPrices[project] = Math.random() * 20 + 40; // $40-60 range
      });
      setRealTimePrices(newPrices);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Sample data
  const marketTrendData = [
    { month: 'Jan', price: 42.5, volume: 12000, demand: 85 },
    { month: 'Feb', price: 44.2, volume: 15000, demand: 78 },
    { month: 'Mar', price: 46.8, volume: 18000, demand: 92 },
    { month: 'Apr', price: 45.3, volume: 16000, demand: 88 },
    { month: 'May', price: 48.1, volume: 22000, demand: 95 },
    { month: 'Jun', price: 50.2, volume: 25000, demand: 98 }
  ];

  const portfolioData = [
    { project: 'Mangrove', credits: 5000, value: 225000, growth: 12.5, color: '#0d9488' },
    { project: 'Seagrass', credits: 3200, value: 144000, growth: 8.3, color: '#14b8a6' },
    { project: 'Wetland', credits: 1800, value: 81000, growth: 15.2, color: '#2dd4bf' },
    { project: 'Kelp', credits: 1200, value: 54000, growth: 6.7, color: '#5eead4' }
  ];

  const availableCredits = [
    {
      id: 1,
      project: 'Mangrove Restoration - Bay of Bengal',
      type: 'Mangrove',
      location: 'Bangladesh • 450 hectares',
      price: 48.75,
      available: 12500,
      verified: true,
      rating: 4.8,
      impact: { co2: 2500, biodiversity: 95, community: 88 },
      certification: 'Gold Standard',
      vintage: 2023,
      delivery: 'Instant'
    },
    {
      id: 2,
      project: 'Seagrass Conservation - Mediterranean',
      type: 'Seagrass',
      location: 'Greece • 230 hectares',
      price: 52.30,
      available: 8900,
      verified: true,
      rating: 4.6,
      impact: { co2: 1800, biodiversity: 87, community: 92 },
      certification: 'Verra',
      vintage: 2023,
      delivery: '2-3 days'
    },
    {
      id: 3,
      project: 'Coastal Wetland Protection - Australia',
      type: 'Wetland',
      location: 'Queensland • 680 hectares',
      price: 45.90,
      available: 15600,
      verified: true,
      rating: 4.9,
      impact: { co2: 3100, biodiversity: 92, community: 85 },
      certification: 'Gold Standard',
      vintage: 2024,
      delivery: 'Instant'
    },
    {
      id: 4,
      project: 'Kelp Forest Restoration - Pacific',
      type: 'Kelp',
      location: 'California • 320 hectares',
      price: 55.10,
      available: 6800,
      verified: true,
      rating: 4.7,
      impact: { co2: 1360, biodiversity: 78, community: 90 },
      certification: 'Verra',
      vintage: 2023,
      delivery: '1 week'
    }
  ];

  const transactionHistory = [
    { id: 1, project: 'Mangrove Restoration', date: '2024-01-15', credits: 1000, price: 47.50, total: 47500, status: 'Completed', type: 'Purchase' },
    { id: 2, project: 'Seagrass Conservation', date: '2024-01-10', credits: 500, price: 51.20, total: 25600, status: 'Completed', type: 'Purchase' },
    { id: 3, project: 'Coastal Wetland', date: '2024-01-08', credits: 2000, price: 44.80, total: 89600, status: 'Pending', type: 'Purchase' },
    { id: 4, project: 'Kelp Forest', date: '2024-01-05', credits: 800, price: 53.75, total: 43000, status: 'Completed', type: 'Purchase' }
  ];

  const impactMetrics = [
    { category: 'CO2 Sequestered', value: 12500, unit: 'tons', target: 15000, progress: 83 },
    { category: 'Biodiversity', value: 92, unit: '%', target: 95, progress: 97 },
    { category: 'Community Impact', value: 88, unit: '%', target: 90, progress: 98 },
    { category: 'Water Quality', value: 94, unit: '%', target: 95, progress: 99 }
  ];

  // Cart functionality
  const addToCart = (credit) => {
    setCartItems(prev => [...prev, { ...credit, quantity: 1 }]);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleWatchlist = (credit) => {
    if (watchlist.find(item => item.id === credit.id)) {
      setWatchlist(prev => prev.filter(item => item.id !== credit.id));
    } else {
      setWatchlist(prev => [...prev, credit]);
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color = 'text-teal-600', trend, subtitle }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gray-100 group-hover:bg-teal-50`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-teal-600' : 'text-red-600'}`}>
            <TrendingUp className={`h-4 w-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-gray-900 text-3xl font-bold mb-2">{value}</p>
        {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
      </div>
    </div>
  );

  const TabButton = ({ name, isActive, onClick, hasNotification }) => (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 font-medium border-b-2 ${
        isActive
          ? 'text-teal-700 border-teal-700 bg-teal-50'
          : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {name}
      {hasNotification && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">!</span>
      )}
    </button>
  );

  const StatusBadge = ({ status, size = 'normal' }) => {
    const statusStyles = {
      'Completed': 'bg-teal-100 text-teal-800 border-teal-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Verified': 'bg-teal-100 text-teal-800 border-teal-200',
      'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Instant': 'bg-green-100 text-green-800 border-green-200'
    };

    const sizeStyles = size === 'small' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

    return (
      <span className={`${sizeStyles} rounded-full font-medium border ${statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status}
      </span>
    );
  };

  const renderMarketplace = () => (
    <div className="space-y-8">
      {/* Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Market Overview</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-teal-700 text-sm">Live</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-teal-700 mb-2">${(Object.values(realTimePrices)[0] || 48.75).toFixed(2)}</p>
          <p className="text-gray-600">Average Credit Price</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Trading Volume</h3>
          <p className="text-3xl font-bold text-blue-700 mb-2">24.5K</p>
          <p className="text-gray-600">Credits Traded Today</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Market Sentiment</h3>
          <p className="text-3xl font-bold text-indigo-700 mb-2">Bullish</p>
          <p className="text-gray-600">+8.2% this week</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-gray-900">Available Carbon Credits</h2>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-teal-500"
            >
              <option value="All">All Types</option>
              <option value="Mangrove">Mangrove</option>
              <option value="Seagrass">Seagrass</option>
              <option value="Wetland">Wetland</option>
              <option value="Kelp">Kelp</option>
            </select>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Price: ${priceRange[0]} - ${priceRange[1]}</span>
              <input
                type="range"
                min="40"
                max="60"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Credits Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {availableCredits.map((credit) => (
          <div key={credit.id} className="bg-white border border-gray-200 rounded-xl p-6 group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-700">
                    {credit.project.split(' - ')[0]}
                  </h3>
                  {credit.verified && <Shield className="h-4 w-4 text-teal-600" />}
                </div>
                <p className="text-gray-600 mb-2">{credit.location}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{credit.rating}</span>
                  </span>
                  <span>{credit.certification}</span>
                  <span>Vintage: {credit.vintage}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => toggleWatchlist(credit)}
                  className={`p-2 rounded-lg ${
                    watchlist.find(item => item.id === credit.id) 
                      ? 'text-red-500 bg-red-100' 
                      : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className="h-4 w-4" fill={watchlist.find(item => item.id === credit.id) ? 'currentColor' : 'none'} />
                </button>
                <StatusBadge status={credit.delivery} size="small" />
              </div>
            </div>

            {/* Price and Availability */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-teal-50 rounded-lg p-3">
                <p className="text-teal-700 text-lg font-bold">${credit.price}</p>
                <p className="text-gray-600 text-xs">Per Credit</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-700 text-lg font-bold">{credit.available.toLocaleString()}</p>
                <p className="text-gray-600 text-xs">Available</p>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="text-center">
                <p className="text-gray-900 font-semibold">{credit.impact.co2}t</p>
                <p className="text-gray-500 text-xs">CO2</p>
              </div>
              <div className="text-center">
                <p className="text-gray-900 font-semibold">{credit.impact.biodiversity}%</p>
                <p className="text-gray-500 text-xs">Biodiversity</p>
              </div>
              <div className="text-center">
                <p className="text-gray-900 font-semibold">{credit.impact.community}%</p>
                <p className="text-gray-500 text-xs">Community</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedCredit(credit)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg"
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </button>
              <button 
                onClick={() => addToCart(credit)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-teal-700 text-white rounded-lg"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Market Trends Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Market Trends</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
              <span className="text-gray-700 text-sm">Price</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700 text-sm">Volume</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={marketTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Area type="monotone" dataKey="demand" fill="#6366f1" stroke="#6366f1" fillOpacity={0.3} />
            <Bar dataKey="volume" fill="#3b82f6" opacity={0.8} />
            <Line type="monotone" dataKey="price" stroke="#0d9488" strokeWidth={3} dot={{ fill: '#0d9488' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-8">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Wallet className="h-8 w-8 text-teal-700" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Portfolio Value</h3>
              <p className="text-teal-700">Real-time valuation</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-teal-700 mb-2">$504,000</p>
          <p className="text-gray-600">+12.3% this month</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Total Credits</h3>
          <p className="text-4xl font-bold text-blue-700 mb-2">11,200</p>
          <p className="text-gray-600">Across 4 projects</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Average Return</h3>
          <p className="text-4xl font-bold text-indigo-700 mb-2">10.7%</p>
          <p className="text-gray-600">Annualized ROI</p>
        </div>
      </div>

      {/* Portfolio Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Performance</h3>
          <div className="space-y-4">
            {portfolioData.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                  <div>
                    <p className="text-gray-900 font-medium">{project.project}</p>
                    <p className="text-gray-500 text-sm">{project.credits} credits</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-semibold">${project.value.toLocaleString()}</p>
                  <p className="text-teal-700 text-sm">+{project.growth}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={marketTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Area type="monotone" dataKey="price" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Transaction Analysis</h2>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <TransactionBuyer />
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
        <div className="flex space-x-4">
          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Project</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Date</th>
                <th className="text-right py-3 px-4 text-gray-700 font-medium">Credits</th>
                <th className="text-right py-3 px-4 text-gray-700 font-medium">Price</th>
                <th className="text-right py-3 px-4 text-gray-700 font-medium">Total</th>
                <th className="text-center py-3 px-4 text-gray-700 font-medium">Status</th>
                <th className="text-center py-3 px-4 text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <p className="text-gray-900 font-medium">{transaction.project}</p>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{transaction.date}</td>
                  <td className="py-4 px-4 text-right text-teal-700 font-semibold">
                    {transaction.credits.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-700">${transaction.price}</td>
                  <td className="py-4 px-4 text-right text-gray-900 font-semibold">
                    ${transaction.total.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <StatusBadge status={transaction.status} size="small" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="text-gray-500 hover:text-teal-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-500 hover:text-blue-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderImpact = () => (
    <div className="space-y-8">
      {/* Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{metric.category}</h3>
            <div className="flex items-end justify-between mb-3">
              <p className="text-3xl font-bold text-teal-700">
                {metric.value}{metric.unit}
              </p>
              <p className="text-gray-600 text-sm">Target: {metric.target}{metric.unit}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-600 h-2 rounded-full"
                style={{ width: `${metric.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Environmental Impact Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Carbon Offset Impact</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Impact Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={impactMetrics}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar name="Current" dataKey="value" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} />
              <Radar name="Target" dataKey="target" stroke="#14b8a6" fill="transparent" strokeDasharray="5 5" />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{cartItems.length} items</span>
          <button className="bg-teal-700 text-white px-6 py-3 rounded-lg font-medium">
            Checkout (${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()})
          </button>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Add some carbon credits to make a positive impact!</p>
          <button 
            onClick={() => setActiveTab('Marketplace')}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Browse Marketplace
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Leaf className="h-8 w-8 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.project}</h3>
                    <p className="text-gray-600 text-sm">{item.location}</p>
                    <p className="text-teal-700 font-semibold">${item.price} per credit</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded bg-gray-100">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-gray-900 font-semibold w-8 text-center">{item.quantity}</span>
                    <button className="p-1 rounded bg-gray-100">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <p className="text-gray-900 font-semibold text-lg">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
            Buyer Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Invest in verified carbon credits and track your environmental impact</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search credits..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 w-64"
            />
          </div>
          
          {/* Cart */}
          <button 
            onClick={() => setActiveTab('Cart')}
            className="relative p-2 text-gray-600"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          
          {/* Watchlist */}
          <button 
            onClick={() => setActiveTab('Watchlist')}
            className="relative p-2 text-gray-600"
          >
            <Heart className="h-5 w-5" />
            {watchlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {watchlist.length}
              </span>
            )}
          </button>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-600">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          {/* User Profile */}
          {/* User Profile with Dropdown */}
          <div className="relative group">
            {/* Profile Trigger */}
            <div className="flex items-center space-x-3 bg-white rounded-lg p-2 cursor-pointer">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">Carbon Investor</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <div className="px-3 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Carbon Investor</p>
                  <p className="text-xs text-gray-500">carbon@investor.com</p>
                </div>
                
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md text-gray-700">
                  Profile Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md text-gray-700">
                  Account
                </button>
                
                {/* Logout Button */}
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md mt-1"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={Coins} 
          title="Available Credits" 
          value="45,230" 
          change="+2,300 today" 
          trend="up"
          color="text-teal-600"
        />
        <StatCard 
          icon={TrendingUp} 
          title="Average Price" 
          value="$48.75" 
          change="+2.3% today" 
          trend="up"
          color="text-yellow-600"
        />
        <StatCard 
          icon={Sparkles} 
          title="Verified Projects" 
          value="12" 
          change="+2 this month" 
          trend="up"
          color="text-blue-600"
        />
        <StatCard 
          icon={Globe} 
          title="CO2 Offset" 
          value="125K tons" 
          change="+12.5K today" 
          trend="up"
          color="text-indigo-600"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex flex-wrap space-x-4">
          <TabButton name="Marketplace" isActive={activeTab === 'Marketplace'} onClick={() => setActiveTab('Marketplace')} />
          <TabButton name="Portfolio" isActive={activeTab === 'Portfolio'} onClick={() => setActiveTab('Portfolio')} />
          <TabButton name="Transactions" isActive={activeTab === 'Transactions'} onClick={() => setActiveTab('Transactions')} />
          <TabButton name="Analysis" isActive={activeTab === 'Analysis'} onClick={() => setActiveTab('Analysis')} />
          <TabButton name="Impact" isActive={activeTab === 'Impact'} onClick={() => setActiveTab('Impact')} />
          <TabButton name="Cart" isActive={activeTab === 'Cart'} onClick={() => setActiveTab('Cart')} hasNotification={cartItems.length > 0} />
          <TabButton name="Watchlist" isActive={activeTab === 'Watchlist'} onClick={() => setActiveTab('Watchlist')} hasNotification={watchlist.length > 0} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {activeTab === 'Marketplace' && renderMarketplace()}
        {activeTab === 'Portfolio' && renderPortfolio()}
        {activeTab === 'Transactions' && renderTransactions()}
        {activeTab === 'Analysis' && renderAnalysis()}
        {activeTab === 'Impact' && renderImpact()}
        {activeTab === 'Cart' && renderCart()}
        {activeTab === 'Watchlist' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Watchlist ({watchlist.length} items)</h2>
            {/* Similar to marketplace but for watchlist items */}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-teal-600" />
            <span className="text-gray-600">Carbon Neutral Investments Since 2023</span>
          </div>
          <div className="flex space-x-6">
            <span className="text-gray-600 text-sm">© 2024 Blue Carbon Marketplace</span>
            <span className="text-gray-600 text-sm">Privacy Policy</span>
            <span className="text-gray-600 text-sm">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Credit Detail Modal */}
      {selectedCredit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCredit.project}</h2>
                <p className="text-gray-600">{selectedCredit.location}</p>
              </div>
              <button 
                onClick={() => setSelectedCredit(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Modal content for credit details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
                {/* Add detailed project information */}
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Purchase Options</h3>
                {/* Add purchase interface */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
