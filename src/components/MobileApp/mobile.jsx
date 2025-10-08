import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Leaf, BarChart3, MapPin, Users, Shield, TrendingUp, Activity, Globe, Waves, TreePine, Cloud, Zap, Check, ArrowRight, Sparkles, Database, Lock, Timer, Award, Target, Eye, Home, Search, Bell, User, Calendar, Filter } from 'lucide-react';

const MobileShowcase = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);
  const [phonePositions, setPhonePositions] = useState([0, 0, 0, 0]);

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
        
        // Calculate phone positions for parallax effect
        const newPositions = [
          Math.min(scrollLeft * 0.5, 100),
          Math.max(0, (scrollLeft - window.innerWidth) * 0.5),
          Math.max(0, (scrollLeft - window.innerWidth * 2) * 0.5),
          Math.max(0, (scrollLeft - window.innerWidth * 3) * 0.5)
        ];
        setPhonePositions(newPositions);
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

  const PhoneCard = ({ variant, isFlipped, position }) => {
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
      <div 
        className="relative transform transition-all duration-1000"
        style={{ 
          transform: `translateY(${position}px) ${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}`,
          transformStyle: 'preserve-3d'
        }}
      >
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
          <span className="text-white font-bold text-xl">CARBON COLLECTIVE</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">SOLUTIONS</a>
          <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">MRV SYSTEM</a>
          <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">PROJECTS</a>
          <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">ABOUT</a>
        </div>
      </nav>

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
              <div className="relative perspective-1000">
                <PhoneCard variant="dashboard" isFlipped={false} position={phonePositions[0]} />
              </div>
            </div>
          </div>

          {/* Section 2 - Phone Left, Text Right */}
          <div className="w-screen h-full flex items-center justify-center px-8 relative">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="relative perspective-1000 order-2 md:order-1">
                <PhoneCard variant="mrv" isFlipped={currentSection >= 1} position={-phonePositions[1]} />
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
              <div className="relative perspective-1000">
                <PhoneCard variant="tracking" isFlipped={currentSection >= 2} position={phonePositions[2]} />
              </div>
            </div>
          </div>

          {/* Section 4 - Phone Left, Text Right */}
          <div className="w-screen h-full flex items-center justify-center px-8 relative">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="relative perspective-1000 order-2 md:order-1">
                <PhoneCard variant="partner" isFlipped={currentSection >= 3} position={-phonePositions[3]} />
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

      {/* Progress Indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-50">
        <div className="flex space-x-2">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`h-1 rounded-full transition-all ${
                currentSection === index ? 'bg-emerald-400 w-12' : 'bg-gray-600 w-8'
              }`}
            />
          ))}
        </div>
        {currentSection < 3 && (
          <button 
            onClick={() => scrollToSection(currentSection + 1)}
            className="text-emerald-400 animate-pulse"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
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

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Try the <span className="text-teal-400">Interactive Demo</span>
          </h2>
          <p className="text-xl text-gray-300">
            Experience the full functionality of our Blue Carbon MRV mobile app
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center space-y-12 lg:space-y-0 lg:space-x-12">
          {/* Interactive Mobile Screen */}
          <div className="relative w-80 h-[640px] bg-black rounded-[3rem] p-3 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
              {/* Status bar */}
              <div className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center text-xs">
                <span>9:41 AM</span>
                <div className="flex items-center space-x-1">
                  <span>●●●</span>
                  <span>📶</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* App header */}
              <div className="bg-teal-500 text-white p-4">
                <h3 className="text-lg font-semibold">Blue Carbon MRV</h3>
                <p className="text-sm opacity-90">Real-time Monitoring System</p>
              </div>

              {/* Content area */}
              <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
                {activeTab === 'dashboard' && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold">Today's Overview</h4>
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-teal-600">24</div>
                          <div className="text-xs text-gray-500">Active Sites</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">1.2k</div>
                          <div className="text-xs text-gray-500">CO₂ Tons</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold mb-3">Recent Activity</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm">Mangrove data updated</span>
                          </div>
                          <span className="text-xs text-gray-500">2 min</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm">Verification completed</span>
                          </div>
                          <span className="text-xs text-gray-500">1 hour</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">My Projects</h4>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                    <div 
                      className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedProject(selectedProject ? null : 1)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">Sundarbans Restoration</h5>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <MapPin className="w-3 h-3 mr-1" />
                        West Bengal, India
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500">78% Complete</div>
                      
                      {selectedProject && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="font-medium">Carbon Stored</div>
                              <div className="text-teal-600">245 tons</div>
                            </div>
                            <div>
                              <div className="font-medium">Area Covered</div>
                              <div className="text-green-600">150 hectares</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Notifications</h4>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <Bell className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Data Sync Complete</div>
                            <div className="text-xs text-gray-500">All monitoring points updated successfully</div>
                            <div className="text-xs text-gray-400 mt-1">5 minutes ago</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Carbon Credit Verified</div>
                            <div className="text-xs text-gray-500">125 credits added to your account</div>
                            <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                      <div className="w-16 h-16 bg-teal-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold">Dr. Marine Researcher</h4>
                      <p className="text-sm text-gray-600">Blue Carbon Specialist</p>
                      <div className="inline-flex items-center mt-2 px-2 py-1 bg-green-100 rounded-full">
                        <span className="text-xs text-green-800">✓ Verified</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium mb-3">Account Stats</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Projects</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Data Points</span>
                          <span className="font-medium">3,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Accuracy</span>
                          <span className="font-medium text-green-600">98.5%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom navigation */}
              <div className="bg-white border-t border-gray-200 p-2">
                <div className="flex justify-around">
                  {[
                    { id: 'dashboard', icon: Home, label: 'Dashboard' },
                    { id: 'projects', icon: Search, label: 'Projects' },
                    { id: 'notifications', icon: Bell, label: 'Alerts' },
                    { id: 'profile', icon: User, label: 'Profile' }
                  ].map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-teal-500 text-white'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 mb-1" />
                        <span className="text-xs">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white rounded-full opacity-50"></div>
          </div>

          {/* Feature descriptions */}
          <div className="text-white max-w-md">
            <h3 className="text-2xl font-bold mb-6">Key Features</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Real-time Monitoring</h4>
                  <p className="text-gray-400 text-sm">Track carbon sequestration and ecosystem health in real-time</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Project Management</h4>
                  <p className="text-gray-400 text-sm">Manage multiple blue carbon projects from one dashboard</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Smart Alerts</h4>
                  <p className="text-gray-400 text-sm">Get notified about important changes and verification updates</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Expert Verification</h4>
                  <p className="text-gray-400 text-sm">Verified by marine biology and carbon credit experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand watermark */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
          <div className="w-6 h-6 bg-teal-500 rounded-full mr-2"></div>
          BLUE CARBON MRV
        </div>
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileShowcase />
      <InteractiveDemo />
    </div>
  );
};

export default ProjectDetails;