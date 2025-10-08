import { useState, useEffect, useRef } from 'react';

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ecosystemScore, setEcosystemScore] = useState(85);
  const [carbonData, setCarbonData] = useState([]);
  const swipeStart = useRef(null);

  // Sample projects data
  const projects = [
    { id: 1, name: "Mangrove Restoration", location: "Southeast Asia", carbon: 250000, status: "active" },
    { id: 2, name: "Seagrass Conservation", location: "Caribbean", carbon: 180000, status: "completed" },
    { id: 3, name: "Tidal Marsh Protection", location: "North America", carbon: 320000, status: "planning" },
    { id: 4, name: "Algae Farm Expansion", location: "Australia", carbon: 420000, status: "active" },
  ];

  // Generate sample carbon data
  const generateCarbonData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2023, i).toLocaleString('default', { month: 'short' }),
      carbon: Math.floor(Math.random() * 1000000) + 500000
    }));
  };

  // Initialize carbon data
  useEffect(() => {
    setCarbonData(generateCarbonData());
  }, []);

  // Simulate live data updates
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCarbonData(generateCarbonData());
        setEcosystemScore(prev => {
          const newScore = prev + (Math.random() > 0.5 ? 1 : -1);
          return Math.max(70, Math.min(95, newScore));
        });
        setNotificationCount(prev => prev + 1);
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle swipe gestures for mobile navigation
  const handleTouchStart = (e) => {
    swipeStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!swipeStart.current) return;
    
    const swipeEnd = e.changedTouches[0].clientX;
    const diff = swipeStart.current - swipeEnd;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      const tabs = ['dashboard', 'projects', 'notifications', 'profile'];
      const currentIndex = tabs.indexOf(activeTab);
      
      if (diff > 0 && currentIndex < tabs.length - 1) {
        // Swipe left - go to next tab
        setActiveTab(tabs[currentIndex + 1]);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - go to previous tab
        setActiveTab(tabs[currentIndex - 1]);
      }
    }
    
    swipeStart.current = null;
  };

  // Icons component for Lucide icons
  const Icons = {
    BarChart3: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
      </svg>
    ),
    Shield: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    Activity: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    Users: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    TrendingUp: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 14 4-4-4-4"/><path d="M2 18V7a5 5 0 0 1 5-5h11"/><path d="M14 12v6"/><path d="M8 12v6"/><path d="M2 12h2"/>
      </svg>
    ),
    Cloud: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
    ),
    Leaf: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    Check: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    ),
    Award: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    Eye: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    Database: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>
      </svg>
    ),
    Sparkles: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/>
      </svg>
    ),
    ArrowRight: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    ),
    Home: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    X: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
      </svg>
    ),
    Play: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    Pause: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
      </svg>
    ),
    Map: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.106 5.553a2 2 0 0 0-1.788 0l-4 2a2 2 0 0 0-1.106 1.789v6.316a2 2 0 0 0 1.106 1.789l4 2a2 2 0 0 0 1.788 0l4-2a2 2 0 0 0 1.106-1.789V9.342a2 2 0 0 0-1.106-1.789l-4-2Z"/><path d="M15 5.764v13.472"/><path d="M9 5.764v13.472"/><path d="m15 5.764 4.894 2.447a2 2 0 0 1 1.106 1.789v6.316a2 2 0 0 1-1.106 1.789L15 19.236"/><path d="m9 5.764-4.894 2.447A2 2 0 0 0 3 9.342v6.316a2 2 0 0 0 1.106 1.789L9 19.236"/>
      </svg>
    ),
    Download: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
      </svg>
    ),
    Share: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/>
      </svg>
    ),
    Bell: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
      </svg>
    ),
    Settings: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Try the <span className="text-emerald-400">Interactive Demo</span>
          </h2>
          <p className="text-xl text-gray-300">
            Experience the full functionality of our Blue Carbon MRV mobile app
          </p>
          
          <div className="mt-6 flex justify-center space-x-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg transition-all"
            >
              {isPlaying ? (
                <>
                  <Icons.Pause className="w-4 h-4" />
                  <span>Pause Simulation</span>
                </>
              ) : (
                <>
                  <Icons.Play className="w-4 h-4" />
                  <span>Start Simulation</span>
                </>
              )}
            </button>
            
            <button 
              onClick={() => {
                setCarbonData(generateCarbonData());
                setEcosystemScore(85);
                setNotificationCount(3);
              }}
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg transition-all"
            >
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center space-y-12 lg:space-y-0 lg:space-x-12">
          {/* Interactive Mobile Screen */}
          <div className="relative w-full max-w-[400px] min-w-[300px] h-[840px] max-h-[90vh] bg-black rounded-[3rem] p-3 shadow-2xl shadow-emerald-500/30 border border-gray-800 mx-auto">
            <div 
              className="w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] overflow-hidden flex flex-col"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Status bar */}
              <div className="flex justify-between items-center px-6 py-3 text-white text-xs">
                <span>9:11</span>
                <div className="flex items-center space-x-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
                  </svg>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5z" />
                    <path d="M8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7z" />
                    <path d="M14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <div className="w-10 h-4 bg-gray-700 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute -top-0.5 -left-0.5"></div>
                  </div>
                </div>
              </div>

              {/* App header */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <Icons.Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Blue Carbon MRV</h3>
                    <p className="text-gray-400 text-xs">Track Ocean Impact</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="relative">
                    <Icons.Bell className="w-5 h-5 text-gray-400" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </button>
                  <Icons.Settings className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'dashboard' && (
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Active Projects</span>
                        <Icons.TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">677</p>
                      <p className="text-emerald-400 text-xs">Projects worldwide</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Total Carbon Offset</span>
                        <Icons.Cloud className="w-4 h-4 text-cyan-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">12.4M tCO₂</p>
                      <p className="text-cyan-400 text-xs">Sequestered Annually</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Ecosystem Health</span>
                        <Icons.Activity className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-lg font-bold">{ecosystemScore}%</span>
                        <div className="w-3/4 bg-gray-700 rounded-full h-2 mt-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${ecosystemScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Interactive Carbon Chart */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300 text-sm">Monthly Carbon Capture</span>
                        <button className="text-xs text-emerald-400">View Report</button>
                      </div>
                      <div className="h-32 flex items-end justify-between space-x-1">
                        {carbonData.map((month, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                              style={{ height: `${month.carbon / 10000}%` }}
                              title={`${month.carbon.toLocaleString()} tCO₂`}
                            ></div>
                            <span className="text-gray-400 text-xs mt-1">{month.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-bold text-lg">Project Portfolio</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {projects.map(project => (
                        <div 
                          key={project.id}
                          className={`bg-white/10 backdrop-blur-md rounded-xl p-3 border transition-all cursor-pointer hover:scale-[1.02] ${
                            selectedProject?.id === project.id 
                              ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' 
                              : 'border-white/20'
                          }`}
                          onClick={() => setSelectedProject(project)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              project.status === 'active' 
                                ? 'bg-emerald-500/20 text-emerald-400' 
                                : project.status === 'completed'
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {project.status.toUpperCase()}
                            </span>
                            <Icons.Map className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-white font-medium">{project.name}</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-gray-400 text-xs">{project.location}</p>
                            <p className="text-cyan-400 text-xs font-bold">{project.carbon.toLocaleString()} tCO₂</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedProject && (
                      <div className="mt-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl p-4 animate-fadeIn">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-bold">{selectedProject.name}</h4>
                            <p className="text-gray-300 text-sm">{selectedProject.location}</p>
                          </div>
                          <button onClick={() => setSelectedProject(null)}>
                            <Icons.X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="bg-black/30 rounded-lg p-2">
                            <p className="text-gray-400 text-xs">Status</p>
                            <p className="text-white font-semibold capitalize">{selectedProject.status}</p>
                          </div>
                          <div className="bg-black/30 rounded-lg p-2">
                            <p className="text-gray-400 text-xs">Carbon</p>
                            <p className="text-cyan-400 font-semibold">{selectedProject.carbon.toLocaleString()} tCO₂</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium py-2 rounded-lg transition-all">
                            View Details
                          </button>
                          <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 flex items-center justify-center rounded-lg transition-all">
                            <Icons.Share className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-4">
                    <h3 className="text-white font-bold text-lg mb-4">Real-time Monitoring</h3>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-300 text-sm">Satellite Data</span>
                        <Icons.Eye className="w-4 h-4 text-blue-400" />
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
                        <Icons.Database className="w-4 h-4 text-purple-400" />
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
                        <div className="bg-black/30 rounded p-2">
                          <p className="text-gray-400">Salinity</p>
                          <p className="text-white font-bold">35 ppt</p>
                        </div>
                        <div className="bg-black/30 rounded p-2">
                          <p className="text-gray-400">Oxygen</p>
                          <p className="text-white font-bold">6.2 mg/L</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold text-sm">AI Analysis</p>
                          <p className="text-gray-400 text-xs mt-1">Pattern Recognition Active</p>
                        </div>
                        <Icons.Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                      </div>
                      <div className="mt-3 bg-black/30 rounded-lg p-2">
                        <p className="text-gray-400 text-xs">Latest Detection</p>
                        <p className="text-white text-sm">Mangrove growth increased by 2.3% in Q3</p>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-xl mt-4 flex items-center justify-center space-x-2">
                      <Icons.Download className="w-4 h-4" />
                      <span>Export Data Report</span>
                    </button>
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    <h3 className="text-white font-bold text-lg mb-4">Your Partner Details</h3>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">OP</span>
                        </div>
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

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mt-4">
                      <p className="text-gray-300 text-sm mb-2">Account Progress</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-cyan-400 text-xs mt-2">Complete profile to unlock all features</p>
                    </div>

                    <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl mt-4">
                      View Full Profile
                    </button>
                  </div>
                )}
              </div>

              

              {/* Bottom navigation */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
                <div className="flex justify-around">
                  {[
                    { id: 'dashboard', icon: Icons.BarChart3, label: 'Dashboard' },
                    { id: 'projects', icon: Icons.Shield, label: 'MRV' },
                    { id: 'notifications', icon: Icons.Activity, label: 'Tracking' },
                    { id: 'profile', icon: Icons.Users, label: 'Partner' }
                  ].map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-b from-emerald-500/30 to-cyan-500/30 text-emerald-400'
                            : 'text-gray-400 hover:text-gray-300'
                        }`}
                      >
                        <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''}`} />
                        <span className="text-xs">{tab.label}</span>
                        {isActive && (
                          <div className="w-1 h-1 bg-emerald-400 rounded-full mt-1"></div>
                        )}
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
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Advanced MRV Features
            </h3>
            
            <div className="flex space-x-2 mb-6">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'projects' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'notifications' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Monitoring
              </button>
            </div>
            
            <div className="space-y-6">
              {activeTab === 'dashboard' && (
                <>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Icons.TrendingUp className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">Real-time Dashboard</h4>
                        <p className="text-gray-300 text-sm">Monitor all your blue carbon projects in one place with live data updates and performance metrics.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Icons.BarChart3 className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">Data Visualization</h4>
                        <p className="text-gray-300 text-sm">Interactive charts and graphs help you understand carbon sequestration trends and project performance.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'projects' && (
                <>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Icons.Shield className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">Project Management</h4>
                        <p className="text-gray-300 text-sm">Easily manage all your blue carbon projects, track progress, and monitor verification status.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Icons.Database className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">Detailed Analytics</h4>
                        <p className="text-gray-300 text-sm">Dive deep into project metrics with detailed analytics and exportable reports for stakeholders.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'notifications' && (
                <>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Icons.Activity className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">Real-time Monitoring</h4>
                        <p className="text-gray-300 text-sm">Track carbon sequestration and ecosystem health with live satellite data and IoT sensors.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Icons.Sparkles className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">AI Analytics</h4>
                        <p className="text-gray-300 text-sm">Advanced pattern recognition and predictive analysis for ecosystem health and carbon capture forecasting.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'profile' && (
                <>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Icons.Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">Partner Network</h4>
                        <p className="text-gray-300 text-sm">Connect with 500+ verified partners in the blue carbon ecosystem and collaborate on projects.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Icons.Award className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">Certification Tracking</h4>
                        <p className="text-gray-300 text-sm">Manage your certifications and verification status with our integrated tracking system.</p>
                      </div>
                    </div>
                  </div>
                  
                </>
              )}
            </div>
            
            <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-4 rounded-xl mt-8 hover:from-emerald-400 hover:to-cyan-400 transition-all flex items-center justify-center space-x-2">
              <span>Request Demo</span>
              <Icons.ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
        </div>
      </div>

      
    </div>
  );
};

export default InteractiveDemo;