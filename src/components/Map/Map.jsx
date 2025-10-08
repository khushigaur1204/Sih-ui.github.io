import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BarChart3, ArrowRight, MapPin, Globe, TrendingUp, Filter, Search, Download, ChevronDown } from "lucide-react";

// Fix default marker icons (Leaflet expects image assets)
const defaultIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Modern blue pin as SVG base64 for project markers
const blueIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDI4QzIyLjYyNzQgMjggMjggMjIuNjI3NCAyOCAxNkMyOCA5LjM3MjU4IDIyLjYyNzQgNCAxNiA0QzkuMzcyNTggNCA0IDkuMzcyNTggNCAxNkM0IDIyLjYyNzQgOS4zNzI1OCAyOCAxNiAyOFoiIGZpbGw9InVybCgjcGluR3JhZGllbnQpIi8+CjxwYXRoIGQ9Ik0xNiAyMEMxOC4yMDkxIDIwIDIwIDE4LjIwOTEgMjAgMTZDMjAgMTMuNzkwOSAxOC4yMDkxIDEyIDE2IDEyQzEzLjc5MDkgMTIgMTIgMTMuNzkwOSAxMiAxNkMxMiAxOC4yMDkxIDEzLjc5MDkgMjAgMTYgMjBaIiBmaWxsPSJ3aGl0ZSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwaW5HcmFkaWVudCIgeDE9IjE2IiB5MT0iNCIgeDI9IjE2IiB5Mj0iMjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwOTlmZiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDY2Y2MiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4=",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const projects = [
  { id: 1, name: "Solar Farm Project", location: "Rajasthan, India", coordinates: [27.0238, 74.2179], impact: "2,500 tons CO₂/year", description: "Large-scale solar farm generating clean energy for local communities.", startDate: "2021-08-22", status: "Active", type: "solar" },
  { id: 2, name: "Wind Energy Initiative", location: "Tamil Nadu, India", coordinates: [10.9094, 78.3665], impact: "3,200 tons CO₂/year", description: "Wind turbines generating renewable energy for the southern grid.", startDate: "2020-11-30", status: "Active", type: "wind" },
  { id: 3, name: "Mangrove Restoration", location: "Kerala, India", coordinates: [9.9312, 76.2673], impact: "1,800 tons CO₂/year", description: "Restoring mangrove forests in Kerala backwaters to protect against erosion.", startDate: "2022-06-15", status: "Active", type: "forest" },
  { id: 4, name: "Hyderabad Solar Rooftops", location: "Telangana, India", coordinates: [17.3850, 78.4867], impact: "1,200 tons CO₂/year", description: "Installing solar panels on residential and commercial buildings.", startDate: "2023-01-10", status: "Active", type: "solar" },
  { id: 5, name: "Bangalore E-Waste Recycling", location: "Karnataka, India", coordinates: [12.9716, 77.5946], impact: "950 tons CO₂/year", description: "Recycling electronic waste to reduce landfill emissions.", startDate: "2022-09-05", status: "Active", type: "recycling" },
  { id: 6, name: "Chennai Water Conservation", location: "Tamil Nadu, India", coordinates: [13.0827, 80.2707], impact: "1,100 tons CO₂/year", description: "Water conservation and management reducing energy consumption.", startDate: "2021-12-18", status: "Active", type: "water" },
  { id: 7, name: "Coastal Protection Project", location: "Goa, India", coordinates: [15.2993, 74.1240], impact: "1,400 tons CO₂/year", description: "Protecting coastal ecosystems and preventing erosion.", startDate: "2022-03-22", status: "Active", type: "coastal" },
  { id: 8, name: "Mangrove Restoration", location: "Indonesia", coordinates: [-0.7893, 113.9213], impact: "1,800 tons CO₂/year", description: "Restoring mangrove forests to protect coastlines and sequester carbon.", startDate: "2022-11-05", status: "Active", type: "forest" },
  { id: 9, name: "Solar Irrigation", location: "Bangladesh", coordinates: [23.6850, 90.3563], impact: "1,100 tons CO₂/year", description: "Solar-powered irrigation systems reducing diesel dependency for farmers.", startDate: "2023-02-22", status: "Active", type: "solar" },
  { id: 10, name: "Amazon Reforestation", location: "Brazil", coordinates: [-3.4653, -62.2159], impact: "1,250 tons CO₂/year", description: "Reforestation efforts in the Amazon rainforest to restore biodiversity and capture carbon.", startDate: "2022-01-15", status: "Active", type: "forest" },
  { id: 11, name: "Wind Energy Initiative", location: "Texas, USA", coordinates: [31.9686, -99.9018], impact: "3,750 tons CO₂/year", description: "Wind turbines generating renewable energy to replace fossil fuel power plants.", startDate: "2023-03-10", status: "Active", type: "wind" },
];

function MapLoadAnimator({ center = [15, 78], zoom = 5 }) {
  const map = useMap();
  useEffect(() => {
    // subtle zoom/center animation on first load
    try {
      map.setView(center, zoom, { animate: true, duration: 1.2 });
    } catch (e) {}
  }, [map, center, zoom]);
  return null;
}

export default function MapSection({ onShowMapFeatures = () => {} }) {
  const [isClient, setIsClient] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleCards, setVisibleCards] = useState(Array(projects.length).fill(false));
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef(null);
  const statsRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // ensure client-only render (useful for SSR setups)
    setIsClient(true);
    
    // Initialize Intersection Observer for cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all card elements
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Filter projects based on active filters and search query
  const filteredProjects = projects.filter(project => {
    // Filter by type
    if (activeFilters.length > 0 && !activeFilters.includes(project.type)) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !project.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // tiny helper for popup content styling classes
  const typeBadgeColor = (type) => {
    switch (type) {
      case "solar": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "wind": return "bg-sky-500/20 text-sky-300 border-sky-500/30";
      case "forest": return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
      case "water": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "recycling": return "bg-violet-500/20 text-violet-300 border-violet-500/30";
      case "coastal": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(filteredProjects, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'carbon-projects.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!isClient) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-900">Our Global Impact</h2>
          <p className="text-gray-600 mt-2">Loading map...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="global-impact" className="h-100 py-20 bg-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-70 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-70 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* small decorative top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* header */}
        <div className="flex flex-col items-center text-center mb-16 gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-2">
            <Globe className="w-4 h-4 text-teal-700" />
            <span className="text-teal-700 text-sm font-medium">Global Projects</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 relative">
            Our <span className="text-teal-800">Global Impact</span>
          </h2>
          
          <p className="text-gray-700 max-w-2xl text-lg">
            Explore our carbon offset projects making a difference around the world
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={onShowMapFeatures}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 bg-teal-800 text-white hover:bg-teal-900 hover:shadow-xl hover:gap-4"
            >
              <BarChart3 size={20} />
              <span>Advanced Features</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
            >
              <Filter size={20} />
              <span>Filter Projects</span>
              <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm animate-fadeIn">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Type</h3>
                <div className="flex flex-wrap gap-2">
                  {['solar', 'wind', 'forest', 'water', 'recycling', 'coastal'].map(type => (
                    <button
                      key={type}
                      onClick={() => toggleFilter(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeFilters.includes(type) 
                          ? 'bg-teal-800 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Search Projects</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <span className="text-gray-600">
                Showing {filteredProjects.length} of {projects.length} projects
              </span>
              
              <button 
                onClick={exportData}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Download size={16} />
                Export Data
              </button>
            </div>
          </div>
        )}

        {/* map */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent pointer-events-none z-10"></div>
          <MapContainer
            center={[15, 78]}
            zoom={5}
            scrollWheelZoom={true}
            ref={mapRef}
            className="w-full h-96 md:h-[500px] bg-gray-50"
          >
            <MapLoadAnimator center={[15, 78]} zoom={5} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />

            {filteredProjects.map((p) => (
              <Marker
                key={p.id}
                position={p.coordinates}
                icon={p.id <= 9 ? blueIcon : defaultIcon}
                eventHandlers={{
                  mouseover: () => setHoveredProject(p),
                  mouseout: () => setHoveredProject(null),
                }}
              >
                <Popup>
                  <div className="w-72 bg-white border border-teal-500/20 rounded-xl p-4 shadow-lg">
                    <span className={`inline-block px-3 py-1 text-xs rounded-full border ${typeBadgeColor(p.type)} font-medium`}>
                      {p.type.toUpperCase()}
                    </span>
                    <h4 className="text-teal-800 mt-3 font-bold text-lg">{p.name}</h4>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{p.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <TrendingUp className="w-4 h-4" />
                      <span><strong className="text-gray-900">Impact:</strong> {p.impact}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">{p.description}</p>
                    <button className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-700 to-teal-800 font-semibold text-white hover:shadow-lg transition-shadow">
                      View Project Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm transition-all duration-500 hover:border-teal-300 hover:shadow-md">
            <div className="text-5xl font-black text-teal-800 mb-2">{projects.length}</div>
            <div className="text-gray-700 text-lg">Active Projects</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm transition-all duration-500 hover:border-teal-300 hover:shadow-md">
            <div className="text-5xl font-black text-teal-800 mb-2">7</div>
            <div className="text-gray-700 text-lg">Projects in South India</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm transition-all duration-500 hover:border-teal-300 hover:shadow-md">
            <div className="text-5xl font-black text-teal-800 mb-2">18,500+</div>
            <div className="text-gray-700 text-lg">Tons CO₂ Reduced Yearly</div>
          </div>
        </div>
      </div>

      {/* small custom CSS for animations (kept local and minimal) */}
      <style>{`
        /* Leaflet popup overrides to match light UI */
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          color: #1f2937 !important;
          border-radius: 8px !important;
          box-shadow: none !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          padding: 0 !important;
        }
        .leaflet-popup-tip {
          background: white !important;
        }
        
        /* Custom animations */
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
