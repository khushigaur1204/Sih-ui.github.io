import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Leaf, BarChart3, MapPin, Users, Shield, TrendingUp, Activity, Globe, Waves, TreePine, Cloud, Zap, Check, ArrowRight, Sparkles, Database, Lock, Timer, Award, Target, Eye, Home, Search, Bell, User, Calendar, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InteractiveDemo from '../MobileApp/MobileApp';

const MobileShowcase = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const progress = scrollLeft / maxScroll;
        setScrollProgress(progress);
        
        // Calculate current section (0-3)
        const section = Math.floor(progress * 4);
        setCurrentSection(Math.min(section, 3));
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (index) => {
    if (scrollContainerRef.current) {
      const targetScroll = window.innerWidth * index;
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const PhoneCard = ({ variant }) => {
    const content = {
      dashboard: (
        <>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Blue Carbon MRV</h3>
              <p className="text-gray-400 text-xs">Track Ocean Impact</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 text-sm">Active Projects</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">677</p>
            <p className="text-emerald-400 text-xs">Projects worldwide</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 text-sm">Total Carbon Offset</span>
              <Cloud className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white">12.4M tCO₂</p>
            <p className="text-cyan-400 text-xs">Sequestered Annually</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 text-sm">Ecosystem Health</span>
              <Activity className="w-4 h-4 text-green-400" />
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </>
      ),
      mrv: (
        <>
          <h3 className="text-white font-bold text-lg mb-4">Modern Slavery Claims</h3>
          
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-400 text-xs font-semibold">VERIFIED</span>
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-white font-medium">Zero Tolerance Policy</p>
              <p className="text-gray-400 text-xs mt-1">Supply Chain Verified</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-xs font-semibold">ACTIVE</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-white font-medium">Ethical Sourcing</p>
              <p className="text-gray-400 text-xs mt-1">100% Transparent</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 text-xs font-semibold">AUDITED</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-white font-medium">Third Party Verification</p>
              <p className="text-gray-400 text-xs mt-1">Bureau Veritas Certified</p>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl p-3">
            <p className="text-xs text-gray-300">Compliance Score</p>
            <p className="text-2xl font-bold text-white">98.5%</p>
          </div>
        </>
      ),
      tracking: (
        <>
          <h3 className="text-white font-bold text-lg mb-4">Real-time Monitoring</h3>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300 text-sm">Satellite Data</span>
              <Eye className="w-4 h-4 text-blue-400" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Coverage</span>
                <span className="text-white">95%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-blue-400 h-1 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300 text-sm">IoT Sensors</span>
              <Database className="w-4 h-4 text-purple-400" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/30 rounded p-2">
                <p className="text-gray-400">Temperature</p>
                <p className="text-white font-bold">26.3°C</p>
              </div>
              <div className="bg-black/30 rounded p-2">
                <p className="text-gray-400">pH Level</p>
                <p className="text-white font-bold">8.2</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">AI Analysis</p>
                <p className="text-gray-400 text-xs mt-1">Pattern Recognition Active</p>
              </div>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </>
      ),
      partner: (
        <>
          <h3 className="text-white font-bold text-lg mb-4">Your Partner Details</h3>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
              <div>
                <p className="text-white font-semibold">Ocean Partners Ltd.</p>
                <p className="text-gray-400 text-xs">Verified Partner</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">Active</span>
              <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded-full">Premium</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
              <span className="text-gray-400 text-sm">Projects</span>
              <span className="text-white font-bold">24</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
              <span className="text-gray-400 text-sm">Carbon Credits</span>
              <span className="text-white font-bold">142K</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
              <span className="text-gray-400 text-sm">Verification</span>
              <span className="text-emerald-400 font-bold">100%</span>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl mt-4">
            View Full Profile
          </button>
        </>
      )
    };

    return (
      <div className="relative">
        {/* Phone Frame */}
        <div className="relative mx-auto w-72 h-[600px]">
          <div className="absolute inset-0 bg-black rounded-[3rem] p-3 shadow-2xl shadow-emerald-500/30 border border-gray-800">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] h-full overflow-hidden relative">
              {/* Status Bar */}
              <div className="flex justify-between items-center px-6 py-3 text-white text-xs">
                <span>9:45</span>
                <div className="flex space-x-1">
                  <div className="w-4 h-3 bg-white rounded-sm"></div>
                  <div className="w-1 h-3 bg-white rounded-sm"></div>
                  <div className="w-4 h-3 bg-white rounded-sm"></div>
                </div>
              </div>

              {/* App Content */}
              <div className="px-6 pb-6">
                {content[variant]}
              </div>

              {/* Bottom Navigation */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-3">
                <div className="flex justify-around">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <Activity className="w-5 h-5 text-gray-400" />
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <Leaf className="w-8 h-8 text-emerald-400" />
          <span className="text-white font-bold text-xl">CARBON VERSE</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">SOLUTIONS</a>
          <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">MRV SYSTEM</a>
          <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">PROJECTS</a>
          <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">ABOUT</a>
        </div>
        {/* Back to Home Button */}
        <button 
          onClick={() => navigate('/')}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-lg transition-all flex items-center space-x-2"
        >
          <span>Back to Home</span>
          <Home className="w-4 h-4" />
        </button>
      </nav>

      {/* Carousel Navigation Arrows */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
        <button 
          onClick={() => scrollToSection(Math.max(0, currentSection - 1))}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
          disabled={currentSection === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <button 
          onClick={() => scrollToSection(Math.min(3, currentSection + 1))}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
          disabled={currentSection === 3}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Section Indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex space-x-3">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSection === index 
                ? 'bg-emerald-400 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Horizontal Scrolling Container */}
      <div 
        ref={scrollContainerRef}
        className="h-screen overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex h-full" style={{ width: '400vw' }}>
          
          {/* Section 1 - Text Left, Phone Right */}
          <div className="w-screen h-full flex items-center justify-center px-8 relative">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="text-white space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  IT'S TIME TO LOOK
                  <br />
                  AT <span className="text-emerald-400">BLUE CARBON</span>
                </h1>
                <p className="text-gray-400 text-lg">
                  Track, measure, and verify your ocean-based carbon projects with our advanced MRV system.
                </p>
                <button 
                  onClick={() => scrollToSection(1)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-4 rounded-lg transition-all flex items-center space-x-2"
                >
                  <span>Explore MRV</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <PhoneCard variant="dashboard" />
              </div>
            </div>
          </div>

          {/* Section 2 - Phone Left, Text Right */}
          <div className="w-screen h-full flex items-center justify-center px-8 relative">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="relative order-2 md:order-1">
                <PhoneCard variant="mrv" />
              </div>
              <div className="text-white space-y-6 order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-bold">
                  IT'S TIME TO LOOK AT
                  <br />
                  <span className="text-cyan-400">MRV CLAIMS</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <p className="font-semibold">100% Verified Data</p>
                      <p className="text-gray-400 text-sm">Blockchain-backed verification system</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <p className="font-semibold">Supply Chain Transparency</p>
                      <p className="text-gray-400 text-sm">End-to-end traceability</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <p className="font-semibold">International Standards</p>
                      <p className="text-gray-400 text-sm">ISO certified processes</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => scrollToSection(2)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-lg transition-all flex items-center space-x-2"
                >
                  <span>View Tracking</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Section 3 - Text Left, Phone Right */}
          <div className="w-screen h-full flex items-center justify-center px-8 relative">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="text-white space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  REAL-TIME
                  <br />
                  <span className="text-purple-400">MONITORING</span>
                </h2>
                <div className="space-y-3">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-purple-400" />
                      <div className="flex-1">
                        <p className="font-semibold">Satellite Monitoring</p>
                        <p className="text-gray-400 text-sm">24/7 ecosystem surveillance</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-purple-400" />
                      <div className="flex-1">
                        <p className="font-semibold">IoT Integration</p>
                        <p className="text-gray-400 text-sm">Real-time sensor data</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => scrollToSection(3)}
                  className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-8 py-4 rounded-lg transition-all flex items-center space-x-2"
                >
                  <span>Meet Partners</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <PhoneCard variant="tracking" />
              </div>
            </div>
          </div>

          {/* Section 4 - Phone Left, Text Right */}
          <div className="w-screen h-full flex items-center justify-center px-8 relative">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="relative order-2 md:order-1">
                <PhoneCard variant="partner" />
              </div>
              <div className="text-white space-y-6 order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-bold">
                  YOUR PARTNER ON
                  <br />
                  <span className="text-emerald-400">THE JOURNEY</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Join a network of verified partners committed to ocean conservation and carbon reduction.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <p className="text-3xl font-bold text-emerald-400">500+</p>
                    <p className="text-gray-400 text-sm">Verified Partners</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <p className="text-3xl font-bold text-cyan-400">98%</p>
                    <p className="text-gray-400 text-sm">Success Rate</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-4 rounded-lg transition-all">
                    Get Started
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-all border border-white/20">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <InteractiveDemo />
    </div>
  );
}


const ProjectDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileShowcase />
      <InteractiveDemo />
    </div>
  );
};

export default ProjectDetails;