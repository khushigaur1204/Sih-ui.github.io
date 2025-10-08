import React from 'react';
import { Users, Building, Shield, Settings, ArrowRight, CheckCircle, Star, Globe, TrendingUp, Lock } from 'lucide-react';

const GeneralDashboardPage = () => {
  const dashboards = [
    {
      id: 'ngo',
      title: 'NGO Dashboard',
      subtitle: 'For Conservation Organizations',
      description: 'Manage your conservation projects, track carbon credits, and connect with buyers.',
      icon: <Users className="w-8 h-8" />,
      color: 'from-teal-600 to-emerald-700',
      bgColor: 'bg-teal-100',
      borderColor: 'border-teal-300',
      features: [
        'Project Management',
        'Carbon Credit Issuance',
        'Impact Tracking',
        'Buyer Network Access',
        'MRV Reporting',
        'Revenue Analytics'
      ],
      access: 'Verified NGOs',
      role: 'Project Sellers',
      requirements: [
        'Valid NGO Registration',
        'Environmental Certification',
        'MRV Compliance',
        'Project Documentation'
      ]
    },
    {
      id: 'company',
      title: 'Company Dashboard',
      subtitle: 'For Corporate Buyers',
      description: 'Purchase carbon credits, track your sustainability goals, and report on ESG metrics.',
      icon: <Building className="w-8 h-8" />,
      color: 'from-teal-600 to-emerald-700',
      bgColor: 'bg-teal-100',
      borderColor: 'border-teal-300',
      features: [
        'Credit Marketplace',
        'Portfolio Management',
        'ESG Reporting',
        'Impact Analytics',
        'Compliance Tracking',
        'Sustainability Goals'
      ],
      access: 'Corporate Entities',
      role: 'Credit Buyers',
      requirements: [
        'Business Registration',
        'Corporate Verification',
        'Sustainability Commitment',
        'Financial Compliance'
      ]
    },
    {
      id: 'regulatory',
      title: 'Regulatory Dashboard',
      subtitle: 'For Government Bodies',
      description: 'Monitor carbon markets, verify projects, and ensure regulatory compliance.',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-teal-600 to-emerald-700',
      bgColor: 'bg-teal-100',
      borderColor: 'border-teal-300',
      features: [
        'Market Oversight',
        'Project Verification',
        'Compliance Monitoring',
        'Audit Trails',
        'Regulatory Reports',
        'Policy Implementation'
      ],
      access: 'Government Agencies',
      role: 'Market Regulators',
      requirements: [
        'Official Authorization',
        'Regulatory Mandate',
        'Compliance Certification',
        'Audit Capabilities',
        'Policy Implementation'
      ]
    },
    {
      id: 'admin',
      title: 'Admin Dashboard',
      subtitle: 'For Platform Administrators',
      description: 'Manage the entire platform, oversee transactions, and ensure system integrity.',
      icon: <Settings className="w-8 h-8" />,
      color: 'from-teal-600 to-emerald-700',
      bgColor: 'bg-teal-100',
      borderColor: 'border-teal-300',
      features: [
        'Platform Management',
        'User Administration',
        'Transaction Oversight',
        'System Monitoring',
        'Security Management',
        'Analytics & Reports'
      ],
      access: 'Platform Administrators',
      role: 'System Managers',
      requirements: [
        'Admin Authorization',
        'Security Clearance',
        'Technical Expertise',
        'Platform Access'
      ]
    }
  ];

  const stats = [
    { label: 'Active Users', value: '2,500+', icon: <Users className="w-5 h-5" /> },
    { label: 'Projects Listed', value: '150+', icon: <Globe className="w-5 h-5" /> },
    { label: 'Credits Traded', value: '1.2M+', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Countries', value: '25+', icon: <Globe className="w-5 h-5" /> }
  ];

  const handleRequestAccess = () => {
    // Redirect to signup page
    window.location.href = '/signup';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">Platform </span>
              <span className="text-teal-800">
                Dashboards
              </span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Access specialized dashboards designed for different stakeholders in the blue carbon ecosystem. 
              Each dashboard provides tailored tools and insights for your specific role and responsibilities.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl border border-gray-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4">
                <div className="text-teal-700">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${dashboard.bgColor} ${dashboard.borderColor} border`}>
                    <div className={`bg-gradient-to-r ${dashboard.color} bg-clip-text text-transparent`}>
                      {dashboard.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{dashboard.title}</h3>
                    <p className="text-lg font-semibold text-teal-700 mb-2">{dashboard.subtitle}</p>
                    <p className="text-gray-700 leading-relaxed">{dashboard.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {dashboard.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Access Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Access Level</div>
                    <div className="font-semibold text-gray-900">{dashboard.access}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Primary Role</div>
                    <div className="font-semibold text-gray-900">{dashboard.role}</div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Access Requirements</h4>
                  <div className="space-y-2">
                    {dashboard.requirements.map((requirement, reqIndex) => (
                      <div key={reqIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <Star className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <span>{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={handleRequestAccess}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-teal-800 text-white rounded-xl font-semibold"
                >
                  <Lock className="w-5 h-5" />
                  <span>Request Access</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How Dashboard Access Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-700">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Apply for Access</h3>
              <p className="text-gray-700">Submit your application with required documentation and credentials.</p>
            </div>
            <div className="text-center p-6 rounded-xl">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-700">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verification Process</h3>
              <p className="text-gray-700">Our team reviews your application and verifies your credentials.</p>
            </div>
            <div className="text-center p-6 rounded-xl">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-700">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Access</h3>
              <p className="text-gray-700">Get approved and access your specialized dashboard with full features.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join the blue carbon revolution and access the tools you need to make a real impact on ocean conservation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleRequestAccess}
              className="inline-flex items-center gap-3 px-8 py-4 bg-teal-800 text-white rounded-full font-semibold"
            >
              <span>Apply for Access</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-800 rounded-full font-semibold border border-gray-200">
              <span>Learn More</span>
              <Globe className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDashboardPage;
