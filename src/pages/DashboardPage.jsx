import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Leaf, Calendar, MapPin, Activity, ArrowRight, Eye, Download, Filter, Search, Bell, Settings, LogOut } from 'lucide-react';

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedTab, setSelectedTab] = useState('overview');

  const user = {
    name: 'Dr. Sarah Johnson',
    role: 'Environmental Scientist',
    organization: 'Ocean Conservation Institute',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    joinDate: '2023-01-15',
    totalCredits: 12500,
    totalInvestment: 450000,
    projectsSupported: 8
  };

  const stats = [
    {
      title: 'Total Carbon Credits',
      value: '12,500',
      change: '+15.2%',
      changeType: 'positive',
      icon: <Leaf className="w-6 h-6" />,
      color: 'text-teal-700',
      bgColor: 'bg-teal-100'
    },
    {
      title: 'Total Investment',
      value: '₹4,50,000',
      change: '+8.7%',
      changeType: 'positive',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-teal-700',
      bgColor: 'bg-teal-100'
    },
    {
      title: 'Projects Supported',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: <Users className="w-6 h-6" />,
      color: 'text-teal-700',
      bgColor: 'bg-teal-100'
    },
    {
      title: 'CO₂ Offset',
      value: '2,340 tons',
      change: '+12.5%',
      changeType: 'positive',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-teal-700',
      bgColor: 'bg-teal-100'
    }
  ];

  const recentTransactions = [
    {
      id: 'TXN-001',
      type: 'Purchase',
      project: 'Mangrove Restoration - Kerala',
      credits: 500,
      amount: 14250,
      date: '2024-01-15',
      status: 'Completed',
      statusColor: 'bg-teal-500/20 text-teal-700'
    },
    {
      id: 'TXN-002',
      type: 'Sale',
      project: 'Coastal Wetland Protection',
      credits: 200,
      amount: 6400,
      date: '2024-01-12',
      status: 'Completed',
      statusColor: 'bg-teal-500/20 text-teal-700'
    },
    {
      id: 'TXN-003',
      type: 'Purchase',
      project: 'Seagrass Meadow Restoration',
      credits: 300,
      amount: 11250,
      date: '2024-01-10',
      status: 'Processing',
      statusColor: 'bg-amber-500/20 text-amber-700'
    },
    {
      id: 'TXN-004',
      type: 'Purchase',
      project: 'Coral-Seagrass Ecosystem',
      credits: 150,
      amount: 6000,
      date: '2024-01-08',
      status: 'Completed',
      statusColor: 'bg-teal-500/20 text-teal-700'
    }
  ];

  const portfolioProjects = [
    {
      id: 1,
      name: 'Mangrove Restoration - Kerala',
      organization: 'Mangrove Guardians Trust',
      credits: 2500,
      investment: 71250,
      currentValue: 82500,
      return: '+15.8%',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Coastal Wetland Protection',
      organization: 'Ocean Conservation Bangladesh',
      credits: 1800,
      investment: 57600,
      currentValue: 61200,
      return: '+6.3%',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      name: 'Seagrass Meadow Restoration',
      organization: 'Tamil Nadu Marine Foundation',
      credits: 1200,
      investment: 45000,
      currentValue: 42000,
      return: '-6.7%',
      status: 'Monitoring',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const notificationsData = [
    {
      id: 1,
      title: 'New Credit Available',
      message: 'Mangrove Restoration - Kerala has new credits available for purchase',
      time: '2 hours ago',
      type: 'info',
      read: false
    },
    {
      id: 2,
      title: 'Transaction Completed',
      message: 'Your purchase of 500 credits from Coastal Wetland Protection has been completed',
      time: '1 day ago',
      type: 'success',
      read: false
    },
    {
      id: 3,
      title: 'Project Update',
      message: 'Seagrass Meadow Restoration project has reached 75% completion milestone',
      time: '3 days ago',
      type: 'update',
      read: true
    }
  ];

  const [notifications, setNotifications] = useState(notificationsData);

  const handleExportData = () => {
    alert('Exporting your portfolio data... This would generate a CSV/PDF report.');
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleLogout = () => {
    alert('Logging out... This would redirect to login page.');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-teal-800">
                  Welcome back, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-gray-700">{user.role} at {user.organization}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-teal-700">
                <Bell className="w-6 h-6" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-600 hover:text-teal-700">
                <Settings className="w-6 h-6" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-teal-700"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <button 
            onClick={handleExportData}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-800 text-white rounded-lg font-medium"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-teal-700' : 'text-red-600'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-700">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'transactions', label: 'Transactions' },
            { id: 'notifications', label: 'Notifications' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium ${
                selectedTab === tab.id
                  ? 'bg-teal-100 text-teal-800 border border-teal-300'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Portfolio Performance Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio Performance</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-teal-700 mx-auto mb-2" />
                  <p className="text-gray-700">Performance chart would be integrated here</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentTransactions.slice(0, 3).map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        transaction.type === 'Purchase' ? 'bg-teal-600' : 'bg-teal-500'
                      }`}></div>
                      <div>
                        <div className="font-semibold text-gray-900">{transaction.type}</div>
                        <div className="text-sm text-gray-700">{transaction.project}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{transaction.credits} credits</div>
                      <div className="text-sm text-gray-700">₹{transaction.amount.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Your Portfolio</h3>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg font-medium border border-gray-200">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioProjects.map(project => (
                <div key={project.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.return.startsWith('+') ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-600'
                      }`}>
                        {project.return}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h4>
                    <p className="text-sm text-gray-700 mb-4">{project.organization}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Credits:</span>
                        <span className="font-semibold text-gray-900">{project.credits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Investment:</span>
                        <span className="font-semibold text-gray-900">₹{project.investment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Current Value:</span>
                        <span className="font-semibold text-gray-900">₹{project.currentValue.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-800 text-white rounded-xl font-medium">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'transactions' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Transaction History</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg font-medium border border-gray-200">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Transaction ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Credits</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map(transaction => (
                    <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono text-gray-700">{transaction.id}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'Purchase' ? 'bg-teal-100 text-teal-700' : 'bg-teal-100 text-teal-700'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{transaction.project}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{transaction.credits}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{transaction.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{transaction.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.statusColor}`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'notifications' && (
          <div className="space-y-4">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className={`p-6 bg-white rounded-2xl border border-gray-200 cursor-pointer ${
                  !notification.read ? 'ring-2 ring-teal-500/20' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-teal-600' :
                    notification.type === 'info' ? 'bg-teal-500' : 'bg-amber-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                      <span className="text-sm text-gray-600">{notification.time}</span>
                    </div>
                    <p className="text-gray-700">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
