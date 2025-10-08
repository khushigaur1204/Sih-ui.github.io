import React, { useState } from 'react';
import { Leaf, MapPin, TrendingUp, Users, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

const Projects = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Mangrove Restoration',
      organization: 'OMCAR Foundation',
      location: 'Velivayal, Tamil Nadu , India',
      area: '125 hectares',
      co2Year: '2,250 tons/year',
      progress: 78,
      credits: '15,000',
      status: 'Active',
      statusColor: 'bg-teal-500/20 text-teal-700',
      icon: <Leaf className="w-4 h-4" />,
      gradient: 'from-teal-500 to-emerald-600',
      image: 'https://th.bing.com/th/id/R.7d2765a26d5cc9fab368e090ae2bdffa?rik=L5TLEB%2fd0Jx3ww&riu=http%3a%2f%2fwww.wur.nl%2fupload%2f41b32f4c-70e1-48da-b9cd-db64aa2487b2_Young-mangroves-testing-the-ground---Wetlands-International.jpg&ehk=SQxe9RZ0htQ9jeb%2blFMem4qrdtsKP%2f6rZlUD15nsGfg%3d&risl=&pid=ImgRaw&r=0'
    },
    {
      id: 2,
      title: 'Coastal Wetland Protection',
      organization: 'Vanshakti',
      location: 'Mumbai, Maharashtra , India',
      area: '89 hectares',
      co2Year: '1,875 tons/year',
      progress: 92,
      credits: '12,500',
      status: 'Planning',
      statusColor: 'bg-amber-500/20 text-amber-700',
      icon: <Calendar className="w-4 h-4" />,
      gradient: 'from-emerald-500 to-teal-600',
      image: 'https://www.vanashakti.org/storage/albums/wetlands-conservation-1700737940708.jpg'
    },
    {
      id: 3,
      title: 'Seagrass Meadow Restoration',
      organization: 'TREE Foundation',
      location: 'Chennai, Tamil Nadu , India',
      area: '67 hectares',
      co2Year: '1,335 tons/year',
      progress: 65,
      credits: '8,900',
      status: 'Monitoring',
      statusColor: 'bg-sky-500/20 text-sky-700',
      icon: <Users className="w-4 h-4" />,
      gradient: 'from-cyan-500 to-teal-600',
      image: 'https://www.vibrahotels.com/blog/wp-content/uploads/2019/02/Apadrina-metre-posidonia-Formentera.jpg'
    },
    {
      id: 4,
      title: 'Mangrove Nursery Development',
      organization: 'Ammachi Labs Research Center',
      location: 'Vallikavu, Kerala , India',
      area: '156 hectares',
      co2Year: '2,805 tons/year',
      progress: 88,
      credits: '18,700',
      status: 'Expanding',
      statusColor: 'bg-indigo-500/20 text-indigo-700',
      icon: <TrendingUp className="w-4 h-4" />,
      gradient: 'from-teal-600 to-cyan-600',
      image: 'https://img.freepik.com/premium-photo/mangrove-saplings-cultivation-serene-aquatic-nursery_501731-15210.jpg'
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          {/* Active Projects Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-6">
            <Leaf className="w-4 h-4 text-teal-700" />
            <span className="text-teal-700 font-medium text-sm">Active Projects</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-900">Featured </span>
            <span className="text-teal-800">
              Conservation Projects
            </span>
          </h2>
          
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Real projects from verified NGOs across Asia making measurable impact on ocean restoration.
          </p>
        </div>

        {/* Projects Grid - Responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 h-full flex flex-col"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${project.statusColor}`}>
                    {project.icon}
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 md:p-6 flex-1 flex flex-col">
                {/* Project Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>

                {/* Organization & Location */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{project.organization}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Area</div>
                    <div className="text-sm font-semibold text-gray-900">{project.area}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">CO₂/Year</div>
                    <div className="text-sm font-semibold text-gray-900">{project.co2Year}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-semibold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Credits Available */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">Credits Available</span>
                  <span className="text-lg font-bold text-teal-700">{project.credits}</span>
                </div>

                {/* Learn More Button - Pushed to bottom */}
                <div className="mt-auto">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-700 to-emerald-700 text-white rounded-xl font-medium">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-800 rounded-full font-semibold border border-gray-200">
            <span>View All Projects</span>
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <button className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-teal-800 to-emerald-800 text-white rounded-full font-semibold">
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
