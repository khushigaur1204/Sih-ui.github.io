import React, { useState, useEffect } from 'react';
import { Leaf, Award, TrendingUp, Users, CheckCircle } from 'lucide-react';

const Impact = () => {
  const [counts, setCounts] = useState({
    co2: 0,
    projects: 0,
    credits: 0,
    ngos: 0
  });

  // Animated counter effect
  useEffect(() => {
    const targets = {
      co2: 45700,
      projects: 247,
      credits: 1200000,
      ngos: 89
    };

    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const timers = [];
    
    Object.keys(targets).forEach(key => {
      let current = 0;
      const target = targets[key];
      const step = target / steps;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, increment);
      
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const statsCards = [
    {
      icon: <Leaf className="w-5 h-5" />,
      value: formatNumber(counts.co2),
      label: "CO₂ Absorbed",
      change: "+34% this month",
      color: "bg-teal-500"
    },
    {
      icon: <Award className="w-5 h-5" />,
      value: counts.projects,
      label: "Active Projects",
      change: "+19% this month",
      color: "bg-teal-500"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      value: formatNumber(counts.credits),
      label: "Carbon Credits",
      change: "+32% this month",
      color: "bg-teal-500"
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: counts.ngos,
      label: "Verified NGOs",
      change: "+39% this month",
      color: "bg-teal-500"
    }
  ];

  const certifications = [
    "Blockchain Verified",
    "Global Standards",
    "MRV Certified",
    "Transparent Reporting"
  ];

  return (
    <section className="relative py-16 bg-gray-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        {/* Live Tracker Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
            <span className="text-teal-700 font-medium text-sm">Live Impact Tracker</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real-time{' '}
            <span className="text-teal-800">
              Ocean Impact
            </span>
          </h2>
          
          <p className="text-gray-700 max-w-2xl mx-auto">
            Measurable environmental impact across Asia's coastal regions through verified carbon credits.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
                {React.cloneElement(stat.icon, { className: "w-5 h-5 text-white" })}
              </div>
              
              {/* Value */}
              <div className="text-2xl font-bold text-gray-900 mb-1 font-mono">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-gray-600 text-sm mb-2">
                {stat.label}
              </div>
              
              {/* Change indicator */}
              <div className="flex items-center text-teal-700 text-xs font-semibold">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-teal-700 flex-shrink-0" />
              <span>{cert}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-teal-800 hover:bg-teal-900 text-white font-medium py-3 px-8 rounded-full transition-colors">
            View Impact Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default Impact;
