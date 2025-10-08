import React from 'react';
import { Globe, Shield, Activity, BarChart3, Target, Users, Leaf } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Network",
      description: "Worldwide ocean restoration projects",
      stat: "50+ Countries"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Credits",
      description: "Blockchain-backed carbon verification",
      stat: "100% Transparency"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-time Monitoring",
      description: "Satellite and drone verification",
      stat: "24/7 Tracking"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Data Insights",
      description: "Optimize your carbon offset strategy",
      stat: "AI Powered"
    }
  ];

  const stats = [
    { value: "250+", label: "Clients", icon: <Users className="w-4 h-4" /> },
    { value: "400+", label: "Projects", icon: <Target className="w-4 h-4" /> },
    { value: "1M+", label: "CO₂ Offset", icon: <Leaf className="w-4 h-4" /> }
  ];

  return (
    <section className="relative py-16 bg-gray-100 overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm text-gray-700 mb-6 border border-gray-200">
            <span className="w-2 h-2 bg-teal-800 rounded-full mr-2 animate-pulse"></span>
            PIONEERING <span className="text-teal-800 font-semibold ml-1">BLUE CARBON</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Revolutionizing Ocean Conservation Through{' '}
            <span className="text-teal-800">
              Technology
            </span>
          </h2>
          
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Why <span className="text-gray-900 font-medium">Carbonverse</span>? Carbonverse connects global restoration projects with real businesses through 
            transparent, verifiable <span className="text-teal-800 font-medium">blue carbon credits</span>.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4"
            >
              <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                {React.cloneElement(stat.icon, { 
                  className: `w-4 h-4 text-teal-800` 
                })}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-700">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 inline-flex">
                {React.cloneElement(feature.icon, { 
                  className: `w-6 h-6 text-teal-800` 
                })}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                {feature.description}
              </p>
              <div className="text-xs font-medium text-teal-800">
                {feature.stat}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-teal-800 text-white font-medium py-3 px-8 rounded-full">
            Join Our <span className="font-semibold">Mission</span>
          </button>
          <p className="text-gray-700 text-sm mt-4">
            Trusted by leading <span className="text-gray-900 font-medium">sustainable organizations</span> worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
