import React, { useState, useEffect } from 'react';
import { Leaf, Award, TrendingUp, Users } from 'lucide-react';

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
    return num.toLocaleString();
  };

  const statsCards = [
    {
      icon: <Leaf className="w-6 h-6" />,
      value: formatNumber(counts.co2),
      label: "CO₂ Absorbed (tons)",
      change: "+34% this month",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: counts.projects,
      label: "Active Projects",
      change: "+19% this month",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: formatNumber(counts.credits),
      label: "Carbon Credits Issued",
      change: "+32% this month",
      color: "from-teal-500 to-green-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: counts.ngos,
      label: "Verified NGOs",
      change: "+39% this month",
      color: "from-green-600 to-teal-600"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-slate-100/50">
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Live Tracker Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
            </span>
            <span className="text-green-700 font-medium text-sm tracking-wide">Live Impact Tracker</span>
          </div>
        </div>

        {/* Main Title with Background Text */}
        <div className="relative text-center mb-6">
          {/* Background blur text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-[8rem] md:text-[12rem] font-black text-green-200/20 select-none">
              OCEAN
            </h1>
          </div>
          
          {/* Main title */}
          <h2 className="relative text-4xl md:text-6xl font-bold mb-6">
            <span className="text-slate-800">Real-time </span>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Ocean Impact
            </span>
          </h2>
          
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Watch as our network of NGOs and buyers create measurable environmental impact
            across Asia's coastal regions.
          </p>
        </div>

        {/* Stats Grid with Spotlight Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Spotlight effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>
              
              {/* Card */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
                {/* Icon with gradient background */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-6`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                
                {/* Value */}
                <div className="text-4xl font-bold text-slate-800 mb-2 font-mono">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-slate-600 text-sm font-medium mb-4">
                  {stat.label}
                </div>
                
                {/* Change indicator */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-green-600 text-xs font-semibold">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {stat.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-20 pt-12 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-600">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="text-sm font-medium">Blockchain Verified</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="text-sm font-medium">Global Standards</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="text-sm font-medium">MRV Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;