import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ComposedChart } from 'recharts';
import { Users, Leaf, DollarSign, MapPin, TrendingUp, Upload, FileText, Eye, Medal, Calendar, CheckCircle, Clock, AlertCircle, Download, Filter, Search, Bell, Settings, Globe, Zap, Target, Award, Activity, BarChart3, Camera, Trash2, Edit3, Plus, Star, Bookmark, Share2, RefreshCw, Mail, Phone, Map, CreditCard } from 'lucide-react';
import TransactionTab from './TransactionTab';
import { ChevronDown, LogOut, X } from 'lucide-react';

const NgoDashboard = () => {
  const [currentAccount, setCurrentAccount] = useState(null); // 
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [realTimeData, setRealTimeData] = useState(45230);
  const [balance, setBalance] = useState("0");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isConnected, setIsConnected] = useState(false);


  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => prev + Math.floor(Math.random() * 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced sample data
  const carbonTrendData = [
    { month: 'Jan', credits: 2000, target: 2200, verified: 1800, pending: 200 },
    { month: 'Feb', credits: 2500, target: 2400, verified: 2200, pending: 300 },
    { month: 'Mar', credits: 3000, target: 2800, verified: 2700, pending: 300 },
    { month: 'Apr', credits: 3500, target: 3200, verified: 3200, pending: 300 },
    { month: 'May', credits: 4500, target: 4000, verified: 4100, pending: 400 },
    { month: 'Jun', credits: 5500, target: 5000, verified: 5000, pending: 500 }
  ];

  const revenueGrowthData = [
    { month: 'Jan', revenue: 45000, expenses: 35000, profit: 10000 },
    { month: 'Feb', revenue: 55000, expenses: 40000, profit: 15000 },
    { month: 'Mar', revenue: 65000, expenses: 45000, profit: 20000 },
    { month: 'Apr', revenue: 75000, expenses: 50000, profit: 25000 },
    { month: 'May', revenue: 95000, expenses: 65000, profit: 30000 },
    { month: 'Jun', revenue: 127850, expenses: 85000, profit: 42850 }
  ];

  const impactData = [
    { category: 'CO2 Reduction', current: 85, target: 100 },
    { category: 'Biodiversity', current: 92, target: 100 },
    { category: 'Water Quality', current: 78, target: 100 },
    { category: 'Soil Health', current: 88, target: 100 },
    { category: 'Local Economy', current: 75, target: 100 },
    { category: 'Community Engagement', current: 95, target: 100 }
  ];

  const monthlyImpactData = [
    { month: 'Jan', co2: 120, biodiversity: 85, water: 90, soil: 75 },
    { month: 'Feb', co2: 135, biodiversity: 92, water: 95, soil: 82 },
    { month: 'Mar', co2: 150, biodiversity: 98, water: 88, soil: 89 },
    { month: 'Apr', co2: 170, biodiversity: 105, water: 92, soil: 94 },
    { month: 'May', co2: 185, biodiversity: 112, water: 96, soil: 98 },
    { month: 'Jun', co2: 200, biodiversity: 120, water: 100, soil: 102 }
  ];

  const geographicData = [
    { region: 'Asia', projects: 8, credits: 25000, area: 1200 },
    { region: 'Africa', projects: 3, credits: 12000, area: 800 },
    { region: 'Americas', projects: 4, credits: 15000, area: 600 },
    { region: 'Europe', projects: 2, credits: 8000, area: 400 },
    { region: 'Oceania', projects: 1, credits: 5230, area: 340 }
  ];

  const projectDistributionData = [
    { name: 'Mangrove Restoration', value: 45, color: '#0d9488', credits: 20000 },
    { name: 'Seagrass Conservation', value: 35, color: '#14b8a6', credits: 15000 },
    { name: 'Coastal Protection', value: 20, color: '#2dd4bf', credits: 10230 }
  ];

  const timeSeriesData = [
    { time: '00:00', value: 42000 }, { time: '04:00', value: 42500 },
    { time: '08:00', value: 43200 }, { time: '12:00', value: 44100 },
    { time: '16:00', value: 44800 }, { time: '20:00', value: 45230 }
  ];

  const projects = [
    {
      id: 1, name: 'Mangrove Restoration - Bay of Bengal', location: 'Bangladesh • 450 hectares',
      credits: 12500, progress: 85, status: 'Verified', lastUpdate: '2 days ago',
      budget: 150000, spent: 127500, team: 15, rating: 4.8, category: 'Mangrove',
      startDate: '2023-06-15', endDate: '2024-12-31', impact: { co2: 2500, biodiversity: 95, water: 88 }
    },
    {
      id: 2, name: 'Seagrass Conservation - Mediterranean', location: 'Greece • 230 hectares',
      credits: 8900, progress: 65, status: 'Pending Review', lastUpdate: '1 week ago',
      budget: 120000, spent: 78000, team: 12, rating: 4.6, category: 'Seagrass',
      startDate: '2023-08-01', endDate: '2025-03-31', impact: { co2: 1800, biodiversity: 87, water: 92 }
    },
    {
      id: 3, name: 'Coastal Wetland Protection - Australia', location: 'Queensland • 680 hectares',
      credits: 0, progress: 25, status: 'Draft', lastUpdate: '3 days ago',
      budget: 200000, spent: 50000, team: 18, rating: 4.9, category: 'Wetland',
      startDate: '2024-01-15', endDate: '2025-08-31', impact: { co2: 0, biodiversity: 25, water: 30 }
    },
    {
      id: 4, name: 'Kelp Forest Restoration - Pacific', location: 'California • 320 hectares',
      credits: 6800, progress: 78, status: 'Verified', lastUpdate: '5 days ago',
      budget: 180000, spent: 140400, team: 20, rating: 4.7, category: 'Kelp',
      startDate: '2023-04-20', endDate: '2024-10-31', impact: { co2: 1360, biodiversity: 78, water: 85 }
    }
  ];

  const mrvData = [
    { type: 'Satellite Images', count: 245, lastUpdate: '2 hours ago', status: 'Active' },
    { type: 'Drone Footage', count: 89, lastUpdate: '1 day ago', status: 'Processing' },
    { type: 'Field Reports', count: 156, lastUpdate: '3 hours ago', status: 'Active' },
    { type: 'Water Samples', count: 78, lastUpdate: '2 days ago', status: 'Completed' },
    { type: 'Soil Analysis', count: 45, lastUpdate: '1 week ago', status: 'Pending' }
  ];

  const creditHistory = [
    { id: 1, project: 'Mangrove Restoration', date: '2024-01-15', credits: 12500, status: 'Verified', price: 45.2, total: 565000 },
    { id: 2, project: 'Seagrass Conservation', date: '2024-01-10', credits: 8900, status: 'Pending Review', price: 42.8, total: 380920 },
    { id: 3, project: 'Coastal Wetland', date: '2024-01-08', credits: 15600, status: 'Verified', price: 44.1, total: 687960 }
  ];

  const financialData = [
    { month: 'Jan', income: 45000, expenses: 35000, grants: 15000, investments: 8000 },
    { month: 'Feb', income: 55000, expenses: 40000, grants: 18000, investments: 12000 },
    { month: 'Mar', income: 65000, expenses: 45000, grants: 20000, investments: 15000 },
    { month: 'Apr', income: 75000, expenses: 50000, grants: 22000, investments: 18000 },
    { month: 'May', income: 95000, expenses: 65000, grants: 25000, investments: 22000 },
    { month: 'Jun', income: 127850, expenses: 85000, grants: 30000, investments: 28000 }
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleExport = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Data exported successfully!');
  };

  const handleNotificationDismiss = () => {
    setNotifications(prev => Math.max(0, prev - 1));
  };

  const StatCard = ({ icon: Icon, title, value, change, color = 'text-teal-600', trend, subtitle }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gray-100 group-hover:bg-teal-50`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        {notifications > 0 && title.includes('Projects') && (
          <div className="relative">
            <Bell className="h-5 w-5 text-yellow-500 cursor-pointer" onClick={handleNotificationDismiss} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-gray-900 text-3xl font-bold mb-2">{value}</p>
        {subtitle && <p className="text-gray-500 text-xs mb-2">{subtitle}</p>}
        <div className="flex items-center justify-between">
          {change && (
            <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-teal-600' : trend === 'down' ? 'text-red-600' : 'text-yellow-600'}`}>
              <TrendingUp className={`h-4 w-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
          <div className="text-right">
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full bg-teal-500`} 
                   style={{ width: `${Math.random() * 100}%` }}></div>
            </div>
          </div>
        </div>
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

  const ProgressBar = ({ progress, color = 'bg-teal-500', height = 'h-2' }) => (
    <div className={`w-full bg-gray-200 rounded-full ${height}`}>
      <div className={`${color} ${height} rounded-full`} 
           style={{ width: `${progress}%` }}>
      </div>
    </div>
  );

  const StatusBadge = ({ status, size = 'normal' }) => {
    const statusStyles = {
      'Verified': 'bg-teal-100 text-teal-800 border-teal-200',
      'Pending Review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Draft': 'bg-gray-100 text-gray-800 border-gray-200',
      'completed': 'bg-teal-100 text-teal-800 border-teal-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Active': 'bg-teal-100 text-teal-800 border-teal-200',
      'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Completed': 'bg-teal-100 text-teal-800 border-teal-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };

    const sizeStyles = size === 'small' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

    return (
      <span className={`${sizeStyles} rounded-full font-medium border ${statusStyles[status] || statusStyles.Draft}`}>
        {status}
      </span>
    );
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Real-time Analytics */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Live Analytics</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-teal-700 text-sm">Live</span>
            <RefreshCw className="h-4 w-4 text-teal-600 animate-spin" />
          </div>
        </div>
        <p className="text-3xl font-bold text-teal-700 mb-2">{realTimeData.toLocaleString()}</p>
        <p className="text-gray-600">Total Carbon Credits (Real-time)</p>
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carbon Credits with Target Comparison */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">Credits vs Target</h3>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={carbonTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Bar dataKey="verified" fill="#0d9488" opacity={0.8} />
              <Bar dataKey="pending" fill="#f59e0b" opacity={0.6} />
              <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-600 rounded"></div>
              <span className="text-sm text-gray-600">Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border-2 border-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Target</span>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <DollarSign className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">Financial Overview</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Area type="monotone" dataKey="income" stackId="1" stroke="#0d9488" fill="#0d9488" opacity={0.6} />
              <Area type="monotone" dataKey="grants" stackId="1" stroke="#3b82f6" fill="#3b82f6" opacity={0.6} />
              <Area type="monotone" dataKey="investments" stackId="1" stroke="#6366f1" fill="#6366f1" opacity={0.6} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impact Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Target className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">Environmental Impact</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={impactData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar name="Current" dataKey="current" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} strokeWidth={2} />
              <Radar name="Target" dataKey="target" stroke="#14b8a6" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">Global Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geographicData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="region" type="category" stroke="#6b7280" />
              <Bar dataKey="projects" fill="#0d9488" opacity={0.8} />
              <Bar dataKey="credits" fill="#14b8a6" opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-semibold text-gray-900">Live Activity Feed</h3>
        </div>
        <div className="space-y-4 max-h-60 overflow-y-auto">
          {[
            { action: 'New satellite data received', project: 'Mangrove Restoration', time: '2 min ago', type: 'data' },
            { action: 'Credits verified and issued', project: 'Seagrass Conservation', time: '15 min ago', type: 'success' },
            { action: 'Field report uploaded', project: 'Coastal Wetland', time: '1 hour ago', type: 'upload' },
            { action: 'Payment processed', project: 'Kelp Forest', time: '2 hours ago', type: 'payment' },
            { action: 'New team member added', project: 'Mangrove Restoration', time: '3 hours ago', type: 'team' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                activity.type === 'success' ? 'bg-teal-500' :
                activity.type === 'data' ? 'bg-blue-500' :
                activity.type === 'upload' ? 'bg-yellow-500' :
                activity.type === 'payment' ? 'bg-green-500' :
                'bg-indigo-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-gray-700 text-sm">{activity.action}</p>
                <p className="text-gray-500 text-xs">{activity.project} • {activity.time}</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => {
    const filteredProjects = projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'All' || project.status === filterStatus)
    );

    return (
      <div className="space-y-6">
        {/* Project Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
          
          <div className="flex flex-wrap items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500"
              />
            </div>
            
            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => handleFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-teal-500"
            >
              <option value="All">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Draft">Draft</option>
            </select>

            {/* Export Button */}
            <button
              onClick={handleExport}
              disabled={isLoading}
              className="bg-teal-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
            >
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              <span>{isLoading ? 'Exporting...' : 'Export'}</span>
            </button>

            {/* Create New Project */}
            <button className="bg-teal-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <p className="text-teal-700 text-2xl font-bold">{filteredProjects.length}</p>
            <p className="text-gray-600 text-sm">Total Projects</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700 text-2xl font-bold">
              {filteredProjects.filter(p => p.status === 'Verified').length}
            </p>
            <p className="text-gray-600 text-sm">Verified</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-700 text-2xl font-bold">
              {filteredProjects.filter(p => p.status === 'Pending Review').length}
            </p>
            <p className="text-gray-600 text-sm">Pending</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-indigo-700 text-2xl font-bold">
              {Math.round(filteredProjects.reduce((acc, p) => acc + p.progress, 0) / filteredProjects.length)}%
            </p>
            <p className="text-gray-600 text-sm">Avg Progress</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-700">{project.name.split(' - ')[0]}</h3>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(project.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">{project.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{project.location}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Team: {project.team}</span>
                    <span>Category: {project.category}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusBadge status={project.status} />
                  <button className="text-gray-500 hover:text-teal-600">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Project Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-50 rounded-lg p-3">
                  <p className="text-teal-700 text-lg font-bold">{project.credits.toLocaleString()}</p>
                  <p className="text-gray-600 text-xs">Credits Generated</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-700 text-lg font-bold">{project.progress}%</p>
                  <p className="text-gray-600 text-xs">Complete</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 md:col-span-1 col-span-2">
                  <p className="text-indigo-700 text-lg font-bold">${(project.spent / 1000).toFixed(0)}k</p>
                  <p className="text-gray-600 text-xs">Spent / ${(project.budget / 1000).toFixed(0)}k</p>
                </div>
              </div>

              {/* Progress Visualization */}
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">Overall Progress</span>
                    <span className="text-sm text-teal-700">{project.progress}%</span>
                  </div>
                  <ProgressBar progress={project.progress} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">Budget Used</span>
                    <span className="text-sm text-blue-700">{Math.round((project.spent / project.budget) * 100)}%</span>
                  </div>
                  <ProgressBar progress={(project.spent / project.budget) * 100} color="bg-blue-500" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleProjectSelect(project)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                >
                  <Eye className="h-4 w-4" />
                  <span>Details</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  <Camera className="h-4 w-4" />
                  <span>Media</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-teal-600 text-white rounded-lg text-sm">
                  <FileText className="h-4 w-4" />
                  <span>MRV</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Project Timeline */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Started: {project.startDate}</span>
                  <span>Ends: {project.endDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.name}</h2>
                  <p className="text-gray-600">{selectedProject.location}</p>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="text-teal-700 font-semibold mb-2">Environmental Impact</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">CO2 Reduction:</span>
                      <span className="text-gray-900">{selectedProject.impact.co2} tons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Biodiversity:</span>
                      <span className="text-gray-900">{selectedProject.impact.biodiversity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Water Quality:</span>
                      <span className="text-gray-900">{selectedProject.impact.water}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-blue-700 font-semibold mb-2">Financial Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Budget:</span>
                      <span className="text-gray-900">${selectedProject.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Spent:</span>
                      <span className="text-gray-900">${selectedProject.spent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Remaining:</span>
                      <span className="text-gray-900">${(selectedProject.budget - selectedProject.spent).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="text-indigo-700 font-semibold mb-2">Team & Timeline</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Team Size:</span>
                      <span className="text-gray-900">{selectedProject.team} members</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Duration:</span>
                      <span className="text-gray-900">18 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Rating:</span>
                      <span className="text-gray-900">{selectedProject.rating}/5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-900 font-semibold mb-4">Progress Timeline</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={[
                      { month: 'Jan', progress: 10 },
                      { month: 'Feb', progress: 25 },
                      { month: 'Mar', progress: 45 },
                      { month: 'Apr', progress: 65 },
                      { month: 'May', progress: selectedProject.progress }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Line type="monotone" dataKey="progress" stroke="#0d9488" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-gray-900 font-semibold mb-4">Recent Activities</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {[
                      { action: 'Satellite imagery updated', time: '2 hours ago' },
                      { action: 'Field report submitted', time: '1 day ago' },
                      { action: 'Budget review completed', time: '3 days ago' },
                      { action: 'Team meeting conducted', time: '5 days ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 text-sm">{activity.action}</span>
                        <span className="text-gray-500 text-xs">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMRVData = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">MRV Data Submission</h2>
          <p className="text-gray-600">Upload monitoring, reporting, and verification data for your projects</p>
        </div>
        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Sync All Data</span>
        </button>
      </div>

      {/* MRV Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {mrvData.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-900 font-medium text-sm">{item.type}</h3>
              <StatusBadge status={item.status} size="small" />
            </div>
            <p className="text-2xl font-bold text-teal-700 mb-1">{item.count}</p>
            <p className="text-gray-500 text-xs">Updated {item.lastUpdate}</p>
          </div>
        ))}
      </div>

      {/* Upload Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual Upload */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <div className="text-center mb-6">
            <Camera className="h-16 w-16 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Data Upload</h3>
            <p className="text-gray-600 mb-6">Satellite images, drone footage, and field photos</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-teal-50 rounded-lg p-4 text-center">
              <p className="text-teal-700 text-2xl font-bold">245</p>
              <p className="text-gray-600 text-sm">Satellite Images</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-blue-700 text-2xl font-bold">89</p>
              <p className="text-gray-600 text-sm">Drone Videos</p>
            </div>
          </div>

          <button className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Visual Data</span>
          </button>
        </div>

        {/* Document Upload */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <div className="text-center mb-6">
            <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Document Upload</h3>
            <p className="text-gray-600 mb-6">Reports, assessments, and verification documents</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-blue-700 text-2xl font-bold">156</p>
              <p className="text-gray-600 text-sm">Field Reports</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <p className="text-indigo-700 text-2xl font-bold">78</p>
              <p className="text-gray-600 text-sm">Lab Results</p>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Upload Documents</span>
          </button>
        </div>
      </div>

      {/* Data Processing Pipeline */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Processing Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { stage: 'Collection', status: 'Active', count: 45, color: 'teal' },
            { stage: 'Processing', status: 'Processing', count: 23, color: 'blue' },
            { stage: 'Verification', status: 'Pending', count: 12, color: 'yellow' },
            { stage: 'Completed', status: 'Completed', count: 156, color: 'green' }
          ].map((stage, index) => (
            <div key={index} className={`bg-${stage.color}-50 border border-${stage.color}-200 rounded-lg p-4 text-center`}>
              <h4 className={`text-${stage.color}-700 font-semibold mb-2`}>{stage.stage}</h4>
              <p className={`text-${stage.color}-700 text-2xl font-bold mb-1`}>{stage.count}</p>
              <StatusBadge status={stage.status} size="small" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent MRV Activity */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent MRV Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Satellite imagery processed for Mangrove Restoration', time: '2 hours ago', type: 'processing', project: 'Mangrove Restoration' },
            { action: 'Field report submitted for Seagrass Conservation', time: '1 day ago', type: 'upload', project: 'Seagrass Conservation' },
            { action: 'Water quality data verified for Coastal Wetland', time: '2 days ago', type: 'verification', project: 'Coastal Wetland' },
            { action: 'Drone footage analysis completed for Kelp Forest', time: '3 days ago', type: 'completed', project: 'Kelp Forest' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'processing' ? 'bg-blue-500' :
                  activity.type === 'upload' ? 'bg-teal-500' :
                  activity.type === 'verification' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div>
                  <p className="text-gray-700 text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.project} • {activity.time}</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Drag and Drop Area */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <div className="border-2 border-dashed border-gray-300 hover:border-teal-400 rounded-lg p-16 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">Drag and drop files here</p>
          <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
          <p className="text-gray-400 text-xs">Supports: JPG, PNG, PDF, DOC, XLS (Max 10MB each)</p>
        </div>
      </div>
    </div>
  );

  const renderCredits = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Carbon Credits Management</h2>
        <div className="flex space-x-4">
          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Credits</span>
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>Request Verification</span>
          </button>
        </div>
      </div>

      {/* Credits Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Credits Wallet */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-teal-100 rounded-lg">
              <Leaf className="h-8 w-8 text-teal-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Credits Wallet</h3>
              <p className="text-teal-700">Real-time balance</p>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-5xl font-bold text-teal-700 mb-2">{realTimeData.toLocaleString()}</p>
            <p className="text-gray-700 text-lg">Total Credits Earned</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-teal-700 text-sm">Live updating</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-teal-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-teal-700 mb-1">32,150</p>
              <p className="text-gray-700 text-sm">Verified Credits</p>
              <div className="mt-2">
                <ProgressBar progress={75} height="h-1" />
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-yellow-700 mb-1">13,080</p>
              <p className="text-gray-700 text-sm">Pending Review</p>
              <div className="mt-2">
                <ProgressBar progress={45} color="bg-yellow-400" height="h-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Credits Performance */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">Credits Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={carbonTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Bar dataKey="verified" fill="#0d9488" opacity={0.8} radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" opacity={0.6} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Credit Breakdown by Project */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Credits by Project Type</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={projectDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="credits"
                >
                  {projectDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {projectDistributionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-semibold">{item.credits.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">{item.value}% of total</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Credits History Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Credit Transaction History</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
              Filter
            </button>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm">
              Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Project</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Date</th>
                <th className="text-right py-3 px-4 text-gray-700 font-medium">Credits</th>
                <th className="text-right py-3 px-4 text-gray-700 font-medium">Price ($)</th>
                <th className="text-right py-3 px-4 text-gray-700 font-medium">Total Value</th>
                <th className="text-center py-3 px-4 text-gray-700 font-medium">Status</th>
                <th className="text-center py-3 px-4 text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {creditHistory.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-gray-900 font-medium">{item.project}</p>
                      <p className="text-gray-500 text-sm">ID: #{item.id.toString().padStart(6, '0')}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{item.date}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-teal-700 font-semibold">+{item.credits.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-700">${item.price}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-gray-900 font-semibold">${item.total.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <StatusBadge status={item.status} size="small" />
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

      {/* Credit Marketplace */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Credit Marketplace</h3>
            <p className="text-indigo-700">Sell your verified carbon credits</p>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-yellow-700 text-sm">Live Market</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-indigo-700 text-sm mb-1">Current Price</p>
            <p className="text-gray-900 text-2xl font-bold">$45.75</p>
            <p className="text-green-600 text-sm">+2.3% today</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-700 text-sm mb-1">Available Credits</p>
            <p className="text-gray-900 text-2xl font-bold">32,150</p>
            <p className="text-gray-600 text-sm">Ready to sell</p>
          </div>
          <div className="bg-teal-50 rounded-lg p-4">
            <p className="text-teal-700 text-sm mb-1">Estimated Value</p>
            <p className="text-gray-900 text-2xl font-bold">$1.47M</p>
            <p className="text-gray-600 text-sm">At current rates</p>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg font-medium">
            Sell Credits
          </button>
          <button className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium">
            View Marketplace
          </button>
        </div>
      </div>
    </div>
  );

  const renderPayouts = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payout Dashboard</h2>
          <p className="text-gray-600">Track your earnings and payment history</p>
        </div>
        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Statements</span>
        </button>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 text-teal-700" />
            <TrendingUp className="h-5 w-5 text-teal-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
          <p className="text-gray-900 text-3xl font-bold">$127,850</p>
          <div className="mt-2">
            <ProgressBar progress={100} color="bg-teal-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="h-8 w-8 text-blue-700" />
            <div className="text-green-600 text-sm font-medium">+12%</div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Paid Out</p>
          <p className="text-gray-900 text-3xl font-bold">$89,200</p>
          <div className="mt-2">
            <ProgressBar progress={70} color="bg-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-yellow-700" />
            <AlertCircle className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Pending</p>
          <p className="text-gray-900 text-3xl font-bold">$38,650</p>
          <div className="mt-2">
            <ProgressBar progress={30} color="bg-yellow-400" />
          </div>
        </div>
      </div>

      {/* Revenue Growth Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Growth</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
              <span className="text-gray-700 text-sm">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700 text-sm">Expenses</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Area type="monotone" dataKey="revenue" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} />
            <Area type="monotone" dataKey="expenses" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            <Line type="monotone" dataKey="profit" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {[
              { project: 'Mangrove Restoration', date: '2024-01-15', amount: 25400, status: 'completed', type: 'payout' },
              { project: 'Seagrass Conservation', date: '2024-01-10', amount: 18200, status: 'completed', type: 'payout' },
              { project: 'Coastal Wetland', date: '2024-01-05', amount: 11500, status: 'pending', type: 'payout' },
              { project: 'Kelp Forest Restoration', date: '2024-01-02', amount: 39000, status: 'completed', type: 'grant' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'payout' ? 'bg-teal-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'payout' ? 
                      <DollarSign className="h-4 w-4 text-teal-700" /> : 
                      <Award className="h-4 w-4 text-blue-700" />
                    }
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm font-medium">{transaction.project}</p>
                    <p className="text-gray-500 text-xs">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-semibold">${transaction.amount.toLocaleString()}</p>
                  <StatusBadge status={transaction.status} size="small" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h3>
          <div className="space-y-4">
            {[
              { method: 'Bank Transfer', account: '****4832', primary: true, balance: 89200 },
              { method: 'PayPal', account: 'ngo@carbonprojects.org', primary: false, balance: 15600 },
              { method: 'Crypto Wallet', account: '0x1a2b...c3d4', primary: false, balance: 23050 }
            ].map((method, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${method.primary ? 'bg-teal-500' : 'bg-gray-400'}`}></div>
                    <span className="text-gray-900 font-medium">{method.method}</span>
                  </div>
                  {method.primary && (
                    <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full">Primary</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{method.account}</p>
                <p className="text-gray-900 text-lg font-bold">${method.balance.toLocaleString()}</p>
                <div className="mt-2">
                  <ProgressBar progress={(method.balance / 127850) * 100} color="bg-teal-500" height="h-1" />
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Payment Method</span>
          </button>
        </div>
      </div>

      {/* Upcoming Payouts */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Payouts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Project</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Due Date</th>
                <th className="text-right py-3 px-4 text-gray-700 font-medium">Amount</th>
                <th className="text-center py-3 px-4 text-gray-700 font-medium">Status</th>
                <th className="text-center py-3 px-4 text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { project: 'Mangrove Restoration', date: '2024-02-15', amount: 28500, status: 'pending' },
                { project: 'Seagrass Conservation', date: '2024-02-10', amount: 21500, status: 'pending' },
                { project: 'Coastal Wetland', date: '2024-02-05', amount: 12500, status: 'scheduled' },
                { project: 'Kelp Forest Restoration', date: '2024-02-01', amount: 32000, status: 'scheduled' }
              ].map((payout, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="text-gray-900 font-medium">{payout.project}</p>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{payout.date}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-teal-700 font-semibold">${payout.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <StatusBadge status={payout.status} size="small" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="text-gray-500 hover:text-teal-600">
                        <Calendar className="h-4 w-4" />
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

  // Main render function
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 pt-0 md:pt-2 px-4 pb-8 md:px-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2 space-y-2 lg:space-y-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
            NGO Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Manage your blue carbon projects and track your environmental impact</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 w-64"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-600">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          
          {/* Settings */}
          <button className="p-2 text-gray-600">
            <Settings className="h-5 w-5" />
          </button>
          
          {/* User Profile */}
          {/* User Profile with Dropdown */}
          <div className="relative group">
            {/* Profile Trigger */}
            <div className="flex items-center space-x-3 bg-white rounded-lg p-2 cursor-pointer">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">NGO Manager</p>
                <p className="text-xs text-gray-500">Carbon Projects</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <div className="px-3 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">NGO Manager</p>
                  <p className="text-xs text-gray-500">Carbon Projects</p>
                </div>
                
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md text-gray-700">
                  Project Dashboard
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md text-gray-700">
                  Manage Projects
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md text-gray-700">
                  NGO Profile
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
          icon={Leaf} 
          title="Active Projects" 
          value="12" 
          change="+2 this month" 
          trend="up"
          color="text-teal-600"
        />
        <StatCard 
          icon={Zap} 
          title="Carbon Credits Earned" 
          value={realTimeData.toLocaleString()} 
          change="+1,230 today" 
          trend="up"
          color="text-yellow-600"
          subtitle="Real-time updating"
        />
        <StatCard 
          icon={DollarSign} 
          title="Total Revenue" 
          value="$127,850" 
          change="+12.5% growth" 
          trend="up"
          color="text-blue-600"
        />
        <StatCard 
          icon={MapPin} 
          title="Area Protected" 
          value="2,340" 
          change="+120 hectares" 
          trend="up"
          color="text-indigo-600"
          subtitle="Hectares restored"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex flex-wrap space-x-4">
          <TabButton name="Overview" isActive={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <TabButton name="Projects" isActive={activeTab === 'Projects'} onClick={() => setActiveTab('Projects')} />
          <TabButton name="MRV Data" isActive={activeTab === 'MRV Data'} onClick={() => setActiveTab('MRV Data')} hasNotification />
          <TabButton name="Credits" isActive={activeTab === 'Credits'} onClick={() => setActiveTab('Credits')} />
          <TabButton name="Transactions" isActive={activeTab === 'Transactions'} onClick={() => setActiveTab('Transactions')} />
          <TabButton name="Payouts" isActive={activeTab === 'Payouts'} onClick={() => setActiveTab('Payouts')} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {activeTab === 'Overview' && renderOverview()}
        {activeTab === 'Projects' && renderProjects()}
        {activeTab === 'MRV Data' && renderMRVData()}
        {activeTab === 'Credits' && renderCredits()}
        {activeTab === 'Transactions' && <TransactionTab />}
        {activeTab === 'Payouts' && renderPayouts()}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-teal-600" />
            <span className="text-gray-600">Carbon Neutral Since 2023</span>
          </div>
          <div className="flex space-x-6">
            <span className="text-gray-600 text-sm">© 2024 Carbon Projects NGO</span>
            <span className="text-gray-600 text-sm">Privacy Policy</span>
            <span className="text-gray-600 text-sm">Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoDashboard;
