import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ComposedChart, Tooltip, Legend } from 'recharts';
import { Users, Leaf, DollarSign, MapPin, TrendingUp, Upload, FileText, Eye, Medal, Calendar, CheckCircle, Clock, AlertCircle, Download, Filter, Search, Bell, Settings, Globe, Zap, Target, Award, Activity, BarChart3, Camera, Trash2, Edit3, Plus, Star, Bookmark, Share2, RefreshCw, Mail, Phone, Map, Shield, Gavel, Scale, ClipboardList, FileCheck, AlertTriangle, Lock, Unlock, ZoomIn, ZoomOut, DownloadCloud, UploadCloud, Cpu, Database, Network, FileSearch, Calculator, Percent, BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import TransactionRegulatoryBody from './TransactionRegulatoryBody';
import { ChevronDown, LogOut, X } from 'lucide-react';

const RegulatoryBodyDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(8);
  const [realTimeData, setRealTimeData] = useState(124560);
  const [verificationQueue, setVerificationQueue] = useState(12);
  const [complianceRate, setComplianceRate] = useState(94.2);
  const [riskLevel, setRiskLevel] = useState('Low');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [chartScale, setChartScale] = useState(1);
  const [auditMode, setAuditMode] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const chartRef = useRef(null);

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => prev + Math.floor(Math.random() * 5));
      setVerificationQueue(prev => Math.max(0, prev + (Math.random() > 0.7 ? 1 : 0)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced sample data for regulatory perspective
  const systemOverviewData = [
    { metric: 'Total Projects', value: 156, change: '+8%', trend: 'up', target: 200 },
    { metric: 'Verified Credits', value: 124560, change: '+2.3%', trend: 'up', target: 150000 },
    { metric: 'Compliance Rate', value: '94.2%', change: '+1.5%', trend: 'up', target: '95%' },
    { metric: 'Pending Audits', value: 23, change: '-3', trend: 'down', target: 10 },
    { metric: 'Risk Level', value: 'Low', change: 'Stable', trend: 'neutral', target: 'Low' },
    { metric: 'Avg Verification Time', value: '4.2d', change: '-0.8d', trend: 'down', target: '3d' }
  ];

  const complianceTrendData = [
    { month: 'Jan', compliance: 89.2, violations: 4, audits: 8 },
    { month: 'Feb', compliance: 91.5, violations: 3, audits: 12 },
    { month: 'Mar', compliance: 92.8, violations: 2, audits: 10 },
    { month: 'Apr', compliance: 93.6, violations: 3, audits: 15 },
    { month: 'May', compliance: 94.2, violations: 1, audits: 11 },
    { month: 'Jun', compliance: 95.1, violations: 1, audits: 9 }
  ];

  const riskAssessmentData = [
    { category: 'Methodology Compliance', score: 92, threshold: 85, status: 'Low Risk' },
    { category: 'Data Accuracy', score: 88, threshold: 90, status: 'Medium Risk' },
    { category: 'MRV Compliance', score: 95, threshold: 85, status: 'Low Risk' },
    { category: 'Financial Reporting', score: 82, threshold: 80, status: 'Medium Risk' },
    { category: 'Environmental Impact', score: 96, threshold: 85, status: 'Low Risk' },
    { category: 'Community Engagement', score: 78, threshold: 75, status: 'High Risk' }
  ];

  const regionalComplianceData = [
    { region: 'Asia-Pacific', projects: 45, compliance: 96.2, credits: 45000, risk: 'Low' },
    { region: 'Europe', projects: 38, compliance: 95.8, credits: 38000, risk: 'Low' },
    { region: 'North America', projects: 28, compliance: 93.5, credits: 29000, risk: 'Medium' },
    { region: 'South America', projects: 22, compliance: 91.2, credits: 18000, risk: 'Medium' },
    { region: 'Africa', projects: 15, compliance: 89.7, credits: 12500, risk: 'High' },
    { region: 'Oceania', projects: 8, compliance: 97.1, credits: 8200, risk: 'Low' }
  ];

  const verificationQueueData = [
    { id: 'VRF-001', project: 'Mangrove Restoration - Indonesia', ngo: 'EcoGuardians', submitted: '2h ago', type: 'Initial', priority: 'High', status: 'Pending' },
    { id: 'VRF-002', project: 'Seagrass Conservation - Mediterranean', ngo: 'BlueLife', submitted: '4h ago', type: 'Quarterly', priority: 'Medium', status: 'In Review' },
    { id: 'VRF-003', project: 'Coastal Wetland - Australia', ngo: 'OceanProtect', submitted: '1d ago', type: 'Annual', priority: 'Low', status: 'Pending' },
    { id: 'VRF-004', project: 'Kelp Forest - California', ngo: 'MarineGrowth', submitted: '1d ago', type: 'Initial', priority: 'High', status: 'In Review' },
    { id: 'VRF-005', project: 'Mangrove Conservation - Bangladesh', ngo: 'GreenShore', submitted: '2d ago', type: 'Quarterly', priority: 'Medium', status: 'Pending' }
  ];

  const auditFindingsData = [
    { id: 'AUD-2024-001', project: 'Mangrove Restoration - Bay of Bengal', finding: 'Data inconsistency in MRV reports', severity: 'High', status: 'Open', dueDate: '2024-07-15' },
    { id: 'AUD-2024-002', project: 'Seagrass Conservation - Greece', finding: 'Incomplete community engagement records', severity: 'Medium', status: 'In Progress', dueDate: '2024-07-20' },
    { id: 'AUD-2024-003', project: 'Coastal Wetland - Queensland', finding: 'Minor methodology deviation', severity: 'Low', status: 'Resolved', dueDate: '2024-06-30' },
    { id: 'AUD-2024-004', project: 'Kelp Forest - Pacific', finding: 'Equipment calibration records missing', severity: 'Medium', status: 'Open', dueDate: '2024-07-10' }
  ];

  const ngoPerformanceData = [
    { name: 'EcoGuardians', projects: 12, compliance: 98.2, credits: 25000, risk: 'Low', rating: 4.9 },
    { name: 'BlueLife', projects: 8, compliance: 95.7, credits: 18000, risk: 'Low', rating: 4.7 },
    { name: 'OceanProtect', projects: 15, compliance: 92.3, credits: 32000, risk: 'Medium', rating: 4.5 },
    { name: 'MarineGrowth', projects: 6, compliance: 89.8, credits: 12500, risk: 'Medium', rating: 4.2 },
    { name: 'GreenShore', projects: 10, compliance: 96.5, credits: 22000, risk: 'Low', rating: 4.8 }
  ];

  const methodologyComplianceData = [
    { methodology: 'VM0033', projects: 45, compliance: 96.8, credits: 52000 },
    { methodology: 'VM0042', projects: 38, compliance: 94.2, credits: 41000 },
    { methodology: 'AR-ACM003', projects: 28, compliance: 91.5, credits: 29000 },
    { methodology: 'VM0007', projects: 22, compliance: 89.7, credits: 18000 },
    { methodology: 'AR-AMS0003', projects: 15, compliance: 97.1, credits: 15500 }
  ];

  // Enhanced handlers
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleNGOSelect = (ngo) => {
    setSelectedNGO(ngo);
  };

  const handleExport = async (type = 'full') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert(`${type === 'full' ? 'Full' : 'Filtered'} data exported successfully!`);
  };

  const handleVerificationAction = (id, action) => {
    setVerificationQueue(prev => Math.max(0, prev - 1));
    alert(`Verification ${id} ${action}`);
  };

  const handleAuditModeToggle = () => {
    setAuditMode(!auditMode);
  };

  const handleChartZoom = (direction) => {
    setChartScale(prev => Math.max(0.5, Math.min(2, prev + (direction === 'in' ? 0.1 : -0.1))));
  };

  // Custom Components
  const StatCard = ({ icon: Icon, title, value, change, color = 'text-teal-600', trend, subtitle, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gray-100 group-hover:bg-teal-50`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        {notifications > 0 && title.includes('Pending') && (
          <div className="relative">
            <Bell className="h-5 w-5 text-yellow-500 cursor-pointer" onClick={() => setNotifications(0)} />
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

  const TabButton = ({ name, isActive, onClick, hasNotification, count }) => (
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
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count || '!'}
        </span>
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
      'Low Risk': 'bg-teal-100 text-teal-800 border-teal-200',
      'Medium Risk': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'High Risk': 'bg-red-100 text-red-800 border-red-200',
      'Pending': 'bg-gray-100 text-gray-800 border-gray-200',
      'In Review': 'bg-blue-100 text-blue-800 border-blue-200',
      'Approved': 'bg-teal-100 text-teal-800 border-teal-200',
      'Rejected': 'bg-red-100 text-red-800 border-red-200',
      'Open': 'bg-red-100 text-red-800 border-red-200',
      'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Resolved': 'bg-teal-100 text-teal-800 border-teal-200'
    };

    const sizeStyles = size === 'small' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

    return (
      <span className={`${sizeStyles} rounded-full font-medium border ${statusStyles[status] || statusStyles.Pending}`}>
        {status}
      </span>
    );
  };

  const RiskIndicator = ({ level }) => {
    const colors = {
      'Low': 'bg-teal-500',
      'Medium': 'bg-yellow-500',
      'High': 'bg-red-500'
    };
    
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${colors[level]}`}></div>
        <span className="text-sm">{level} Risk</span>
      </div>
    );
  };

  // Tab Render Functions
  const renderOverview = () => (
    <div className="space-y-8">
      {/* System Health Dashboard */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Regulatory System Health</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-teal-700 text-sm">All Systems Operational</span>
            <RefreshCw className="h-4 w-4 text-teal-600 animate-spin" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {systemOverviewData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 text-center border border-gray-100">
              <p className="text-gray-600 text-sm mb-1">{item.metric}</p>
              <p className="text-gray-900 text-xl font-bold mb-1">{item.value}</p>
              <div className={`text-xs ${item.trend === 'up' ? 'text-teal-600' : item.trend === 'down' ? 'text-red-600' : 'text-yellow-600'}`}>
                {item.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance & Risk Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compliance Trend */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">Compliance Trend</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => handleChartZoom('out')} className="p-1 hover:bg-gray-100 rounded">
                <ZoomOut className="h-4 w-4" />
              </button>
              <button onClick={() => handleChartZoom('in')} className="p-1 hover:bg-gray-100 rounded">
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={complianceTrendData} style={{ transform: `scale(${chartScale})` }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Bar dataKey="violations" fill="#ef4444" opacity={0.8} />
              <Bar dataKey="audits" fill="#f59e0b" opacity={0.6} />
              <Line type="monotone" dataKey="compliance" stroke="#0d9488" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Assessment Radar */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={riskAssessmentData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar name="Score" dataKey="score" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} strokeWidth={2} />
              <Radar name="Threshold" dataKey="threshold" stroke="#ef4444" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Compliance Map */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">Regional Compliance Overview</h3>
          </div>
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-gray-900"
          >
            <option value="Global">Global</option>
            <option value="Asia-Pacific">Asia-Pacific</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regionalComplianceData.map((region, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-gray-900 font-semibold">{region.region}</h4>
                <RiskIndicator level={region.risk} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Projects:</span>
                  <span className="text-gray-900">{region.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Compliance:</span>
                  <span className="text-teal-700">{region.compliance}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Credits:</span>
                  <span className="text-gray-900">{region.credits.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Activity className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">Live Verification Queue</h3>
          </div>
          <div className="space-y-4">
            {verificationQueueData.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-900 text-sm font-medium">{item.id}</p>
                  <p className="text-gray-600 text-xs">{item.project}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusBadge status={item.status} size="small" />
                  <button className="text-gray-500 hover:text-teal-600">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Audit Findings</h3>
          </div>
          <div className="space-y-4">
            {auditFindingsData.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-900 text-sm font-medium">{item.id}</span>
                  <StatusBadge status={item.status} size="small" />
                </div>
                <p className="text-gray-700 text-xs mb-2">{item.finding}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xs">Due: {item.dueDate}</span>
                  <span className={`text-xs ${
                    item.severity === 'High' ? 'text-red-600' : 
                    item.severity === 'Medium' ? 'text-yellow-600' : 'text-teal-600'
                  }`}>
                    {item.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Verification Management</h2>
          <p className="text-gray-600">Review and approve carbon credit verification requests</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter Queue</span>
          </button>
          <button 
            onClick={handleAuditModeToggle}
            className={`${auditMode ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} px-6 py-3 rounded-lg font-medium flex items-center space-x-2`}
          >
            {auditMode ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            <span>Audit Mode: {auditMode ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Verification Queue */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Verification Queue ({verificationQueue})</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
              Sort by Priority
            </button>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm">
              Bulk Actions
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700 font-medium">ID</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Project</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">NGO</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Submitted</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Priority</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                <th className="text-center py-3 px-4 text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {verificationQueueData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <span className="text-teal-700 font-mono">{item.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900 font-medium">{item.project}</p>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{item.ngo}</td>
                  <td className="py-4 px-4 text-gray-700">{item.submitted}</td>
                  <td className="py-4 px-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{item.type}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.priority === 'High' ? 'bg-red-100 text-red-700' :
                      item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-teal-100 text-teal-700'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={item.status} size="small" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => handleVerificationAction(item.id, 'review')}
                        className="p-2 bg-teal-600 text-white rounded-lg"
                      >
                        <FileSearch className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleVerificationAction(item.id, 'approve')}
                        className="p-2 bg-teal-600 text-white rounded-lg"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleVerificationAction(item.id, 'reject')}
                        className="p-2 bg-red-600 text-white rounded-lg"
                      >
                        <AlertCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="text-gray-900 font-semibold mb-4">Verification Performance</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600 text-sm">Approval Rate</span>
                <span className="text-teal-700 text-sm">92.3%</span>
              </div>
              <ProgressBar progress={92.3} color="bg-teal-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600 text-sm">Average Processing Time</span>
                <span className="text-blue-700 text-sm">4.2 days</span>
              </div>
              <ProgressBar progress={70} color="bg-blue-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600 text-sm">Rejection Rate</span>
                <span className="text-red-700 text-sm">7.7%</span>
              </div>
              <ProgressBar progress={7.7} color="bg-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="text-gray-900 font-semibold mb-4">Methodology Compliance</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={methodologyComplianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="methodology" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Bar dataKey="compliance" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="text-gray-900 font-semibold mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <button className="w-full bg-teal-600 text-white py-2 rounded-lg text-sm">
              Schedule Batch Verification
            </button>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm">
              Generate Compliance Report
            </button>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm">
              Update Verification Guidelines
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm">
              View Audit Trail
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Additional tab render functions would follow the same pattern...
  // Due to length constraints, I'll show the structure for the remaining tabs

  const renderCompliance = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compliance Monitoring</h2>
          <p className="text-gray-600">Track regulatory compliance across all projects and NGOs</p>
        </div>
        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
          <DownloadCloud className="h-4 w-4" />
          <span>Export Compliance Report</span>
        </button>
      </div>
      {/* Compliance content would go here */}
    </div>
  );

  const renderNGOPerformance = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">NGO Performance Dashboard</h2>
          <p className="text-gray-600">Monitor and evaluate NGO performance metrics</p>
        </div>
        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
          <BarChart2 className="h-4 w-4" />
          <span>Performance Analytics</span>
        </button>
      </div>
      {/* NGO Performance content would go here */}
    </div>
  );

  const renderAudit = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit & Investigations</h2>
          <p className="text-gray-600">Manage audits, investigations, and compliance enforcement</p>
        </div>
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
          <Gavel className="h-4 w-4" />
          <span>Initiate Investigation</span>
        </button>
      </div>
      {/* Audit content would go here */}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
            Regulatory Body Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Blue Carbon MRV System - Monitoring & Compliance Center</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search projects, NGOs, reports..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
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
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">Regulatory Officer</p>
                <p className="text-xs text-gray-500">Blue Carbon Authority</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <div className="px-3 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Regulatory Officer</p>
                  <p className="text-xs text-gray-500">Blue Carbon Authority</p>
                </div>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md text-gray-700">
                  Audit Projects
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md text-gray-700">
                  Reports
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
          icon={Shield} 
          title="System Compliance" 
          value="94.2%" 
          change="+1.5% this month" 
          trend="up"
          color="text-teal-600"
        />
        <StatCard 
          icon={FileCheck} 
          title="Pending Verifications" 
          value={verificationQueue} 
          change="-3 this week" 
          trend="down"
          color="text-yellow-600"
        />
        <StatCard 
          icon={Scale} 
          title="Active Audits" 
          value="23" 
          change="+2 ongoing" 
          trend="up"
          color="text-red-600"
        />
        <StatCard 
          icon={TrendingUp} 
          title="Total Credits" 
          value={realTimeData.toLocaleString()} 
          change="+2.3% growth" 
          trend="up"
          color="text-teal-600"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex flex-wrap space-x-4">
          <TabButton name="Overview" isActive={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <TabButton name="Verification" isActive={activeTab === 'Verification'} onClick={() => setActiveTab('Verification')} hasNotification count={verificationQueue} />
          <TabButton name="Compliance" isActive={activeTab === 'Compliance'} onClick={() => setActiveTab('Compliance')} />
          <TabButton name="NGO Performance" isActive={activeTab === 'NGO Performance'} onClick={() => setActiveTab('NGO Performance')} />
          <TabButton name="Audit" isActive={activeTab === 'Audit'} onClick={() => setActiveTab('Audit')} hasNotification count={3} />
          <TabButton name="Transactions" isActive={activeTab === 'Transactions'} onClick={() => setActiveTab('Transactions')} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {activeTab === 'Overview' && renderOverview()}
        {activeTab === 'Verification' && renderVerification()}
        {activeTab === 'Compliance' && renderCompliance()}
        {activeTab === 'NGO Performance' && renderNGOPerformance()}
        {activeTab === 'Audit' && renderAudit()}
        {activeTab === 'Transactions' && <TransactionRegulatoryBody />}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-teal-600" />
            <span className="text-gray-600">Blue Carbon Regulatory Authority v2.1</span>
          </div>
          <div className="flex space-x-6">
            <span className="text-gray-600 text-sm">© 2024 Blue Carbon MRV System</span>
            <span className="text-gray-600 text-sm">Compliance Guidelines</span>
            <span className="text-gray-600 text-sm">Regulatory Framework</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryBodyDashboard;
