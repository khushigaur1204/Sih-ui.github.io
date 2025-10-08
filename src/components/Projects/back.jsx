import React, { useState } from 'react';
import { Leaf, MapPin, TrendingUp, Users, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

const Projects = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Mangrove Restoration - Vembanad Lake',
      organization: 'Mangrove Guardians Trust',
      location: 'Kerala, India',
      area: '125 hectares',
      co2Year: '2,250 tons/year',
      progress: 78,
      credits: '15,000',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      icon: <Leaf className="w-5 h-5" />,
      gradient: 'from-emerald-500 to-teal-600',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Coastal Wetland Protection',
      organization: 'Ocean Conservation Bangladesh',
      location: 'Cox\'s Bazar, Bangladesh',
      area: '89 hectares',
      co2Year: '1,875 tons/year',
      progress: 92,
      credits: '12,500',
      status: 'Expanding',
      statusColor: 'bg-blue-100 text-blue-800',
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: 'from-blue-500 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Seagrass Meadow Restoration',
      organization: 'Tamil Nadu Marine Foundation',
      location: 'Pichavaram, India',
      area: '67 hectares',
      co2Year: '1,335 tons/year',
      progress: 65,
      credits: '8,900',
      status: 'Monitoring',
      statusColor: 'bg-purple-100 text-purple-800',
      icon: <Users className="w-5 h-5" />,
      gradient: 'from-purple-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Mangrove Nursery Development',
      organization: 'Sri Lanka Coastal Trust',
      location: 'Negombo Lagoon, Sri Lanka',
      area: '156 hectares',
      co2Year: '2,805 tons/year',
      progress: 88,
      credits: '18,700',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      icon: <Leaf className="w-5 h-5" />,
      gradient: 'from-green-500 to-emerald-600',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Coral-Seagrass Ecosystem Restoration',
      organization: 'Maldives Blue Initiative',
      location: 'North Malé Atoll, Maldives',
      area: '203 hectares',
      co2Year: '3,675 tons/year',
      progress: 56,
      credits: '24,500',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: 'from-teal-500 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Salt Marsh Rehabilitation',
      organization: 'Goa Estuarine Conservancy',
      location: 'Mandovi Estuary, India',
      area: '78 hectares',
      co2Year: '1,470 tons/year',
      progress: 34,
      credits: '9,800',
      status: 'Planning',
      statusColor: 'bg-orange-100 text-orange-800',
      icon: <Calendar className="w-5 h-5" />,
      gradient: 'from-orange-500 to-red-600',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-100/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-slate-200/[0.3]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Active Projects Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-6">
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-medium text-sm">Active Projects</span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-slate-800">Featured </span>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Conservation Projects
            </span>
          </h2>
          
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Real projects from verified NGOs across Asia making measurable impact on ocean restoration.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>
              
              {/* Card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200 hover:border-green-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 shadow-sm h-full flex flex-col">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${project.statusColor}`}>
                      {project.icon}
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Organization & Location */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">{project.organization}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Area</div>
                      <div className="text-sm font-semibold text-slate-800">{project.area}</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">CO₂/Year</div>
                      <div className="text-sm font-semibold text-slate-800">{project.co2Year}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="text-sm font-semibold text-slate-800">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Credits Available */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-600">Credits Available</span>
                    <span className="text-lg font-bold text-green-600">{project.credits}</span>
                  </div>

                  {/* Learn More Button - Pushed to bottom */}
                  <div className="mt-auto">
                    <button className="w-full group/btn relative inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:scale-105">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-full font-semibold transition-all duration-300 hover:bg-slate-700 hover:scale-105 hover:shadow-lg">
            <span>View All Projects</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-600/25 hover:scale-105">
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-slate-200\/\[0\.3\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(226 232 240 / 0.3)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  );
};

export default Projects;
