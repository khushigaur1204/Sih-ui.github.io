import React from 'react';
import { Globe, Shield, Activity, ArrowRight } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Blue Carbon Network",
      description: "Connect with ocean restoration projects worldwide through our comprehensive MRV platform.",
      gradient: "from-emerald-500 to-teal-600",
      delay: "0ms"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Carbon Credits",
      description: "Blockchain-backed verification ensures authenticity and traceability of every carbon credit.",
      gradient: "from-green-500 to-emerald-600",
      delay: "150ms"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "Satellite and drone monitoring provide continuous verification of project progress.",
      gradient: "from-teal-500 to-green-600",
      delay: "300ms"
    }
  ];

  const stats = [
    { value: "250+", label: "Clients Served" },
    { value: "400+", label: "Projects Completed" }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-100/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-slate-200/[0.3]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Section Title with Background Text */}
            <div className="relative">
              {/* Background blur text */}
              {/*<div className="absolute -left-4 -top-8 pointer-events-none select-none">
                <span className="text-[6rem] font-black text-green-500/5 leading-none">
                  ABOUT
                </span>
              </div>*/}
              
              <div className="relative space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="text-slate-800">Why Choose </span>
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Carbonverse?
                  </span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                  Revolutionary technology meets ocean conservation. Our platform ensures
                  transparent, verifiable, and scalable blue carbon solutions.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-3xl font-bold text-green-600">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span className="text-sm text-green-700">Smart Strategies</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span className="text-sm text-green-700">Local Impact</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span className="text-sm text-green-700">24×7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
                style={{ 
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: feature.delay,
                  opacity: 0
                }}
              >
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-slate-200 hover:border-green-400/50 transition-all duration-500 hover:transform hover:translate-x-2 shadow-sm hover:shadow-md">
                  {/* Gradient line on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-emerald-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3 flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 group-hover:text-green-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Learn More Link */}
                      <button className="inline-flex items-center gap-2 text-green-600 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-600 mb-8">
            Ready to make a real impact on ocean conservation?
          </p>
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green-600/25 hover:scale-105">
            <span>Get Started Today</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .bg-grid-slate-200\/\[0\.3\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(226 232 240 / 0.3)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  );
};

export default About;