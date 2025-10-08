import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ArrowRight, BarChart3 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom green icon for projects
const greenIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIyQzE3LjUyMjggMjIgMjIgMTcuNTIyOCAyMiAxMkMyMiA2LjQ3NzE1IDE3LjUyMjggMiAxMiAyQzYuNDc3MTUgMiAyIDYuNDc3MTUgMiAxMkMyIDE3LjUyMjggNi40NzcxNSAyMiAxMiAyMloiIGZpbGw9IiMwMGZmODciLz4KPHBhdGggZD0iTTEyIDEzQzEyLjU1MjMgMTMgMTMgMTIuNTUyMyAxMyAxMkMxMyAxMS40NDc3IDEyLjU1MjMgMTEgMTIgMTFDMTEuNDQ3NyAxMSAxMSAxMS40NDc3IDExIDEyQzExIDEyLjU1MjMgMTEuNDQ3NyAxMyAxMiAxM1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const MapSection = ({ onShowMapFeatures }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef();
  
  useEffect(() => {
    // This ensures the component is only rendered on the client side
    setIsClient(true);
  }, []);
  
  const projects = [
    // South Indian projects
    {
      id: 1,
      name: 'Solar Farm Project',
      location: 'Rajasthan, India',
      coordinates: [27.0238, 74.2179],
      impact: '2,500 tons CO₂/year',
      description: 'Large-scale solar farm generating clean energy for local communities.',
      startDate: '2021-08-22',
      status: 'Active',
      type: 'solar'
    },
    {
      id: 2,
      name: 'Wind Energy Initiative',
      location: 'Tamil Nadu, India',
      coordinates: [10.9094, 78.3665],
      impact: '3,200 tons CO₂/year',
      description: 'Wind turbines generating renewable energy for the southern grid.',
      startDate: '2020-11-30',
      status: 'Active',
      type: 'wind'
    },
    {
      id: 3,
      name: 'Mangrove Restoration',
      location: 'Kerala, India',
      coordinates: [9.9312, 76.2673],
      impact: '1,800 tons CO₂/year',
      description: 'Restoring mangrove forests in Kerala backwaters to protect against erosion.',
      startDate: '2022-06-15',
      status: 'Active',
      type: 'forest'
    },
    {
      id: 4,
      name: 'Hyderabad Solar Rooftops',
      location: 'Telangana, India',
      coordinates: [17.3850, 78.4867],
      impact: '1,200 tons CO₂/year',
      description: 'Installing solar panels on residential and commercial buildings.',
      startDate: '2023-01-10',
      status: 'Active',
      type: 'solar'
    },
    {
      id: 5,
      name: 'Bangalore E-Waste Recycling',
      location: 'Karnataka, India',
      coordinates: [12.9716, 77.5946],
      impact: '950 tons CO₂/year',
      description: 'Recycling electronic waste to reduce landfill emissions.',
      startDate: '2022-09-05',
      status: 'Active',
      type: 'recycling'
    },
    {
      id: 6,
      name: 'Chennai Water Conservation',
      location: 'Tamil Nadu, India',
      coordinates: [13.0827, 80.2707],
      impact: '1,100 tons CO₂/year',
      description: 'Water conservation and management reducing energy consumption.',
      startDate: '2021-12-18',
      status: 'Active',
      type: 'water'
    },
    {
      id: 7,
      name: 'Coastal Protection Project',
      location: 'Goa, India',
      coordinates: [15.2993, 74.1240],
      impact: '1,400 tons CO₂/year',
      description: 'Protecting coastal ecosystems and preventing erosion.',
      startDate: '2022-03-22',
      status: 'Active',
      type: 'coastal'
    },
    // Other Asian projects
    {
      id: 8,
      name: 'Mangrove Restoration',
      location: 'Indonesia',
      coordinates: [-0.7893, 113.9213],
      impact: '1,800 tons CO₂/year',
      description: 'Restoring mangrove forests to protect coastlines and sequester carbon.',
      startDate: '2022-11-05',
      status: 'Active',
      type: 'forest'
    },
    {
      id: 9,
      name: 'Solar Irrigation',
      location: 'Bangladesh',
      coordinates: [23.6850, 90.3563],
      impact: '1,100 tons CO₂/year',
      description: 'Solar-powered irrigation systems reducing diesel dependency for farmers.',
      startDate: '2023-02-22',
      status: 'Active',
      type: 'solar'
    },
    // Global projects
    {
      id: 10,
      name: 'Amazon Reforestation',
      location: 'Brazil',
      coordinates: [-3.4653, -62.2159],
      impact: '1,250 tons CO₂/year',
      description: 'Reforestation efforts in the Amazon rainforest to restore biodiversity and capture carbon.',
      startDate: '2022-01-15',
      status: 'Active',
      type: 'forest'
    },
    {
      id: 11,
      name: 'Wind Energy Initiative',
      location: 'Texas, USA',
      coordinates: [31.9686, -99.9018],
      impact: '3,750 tons CO₂/year',
      description: 'Wind turbines generating renewable energy to replace fossil fuel power plants.',
      startDate: '2023-03-10',
      status: 'Active',
      type: 'wind'
    }
  ];

  const handleProjectHover = (project) => {
    setActiveProject(project);
  };

  const handleProjectLeave = () => {
    setActiveProject(null);
  };

  // Don't render the map on the server side
  if (!isClient) {
    return (
      <MapContainerWrapper id="global-impact">
        <Container>
          <SectionTitle>Our Global Impact</SectionTitle>
          <SectionSubtitle>Loading map...</SectionSubtitle>
        </Container>
      </MapContainerWrapper>
    );
  }

  return (
    <MapContainerWrapper id="global-impact">
      <Container>
        <SectionHeader>
          <div>
            <SectionTitle>Our Global Impact</SectionTitle>
            <SectionSubtitle>Explore our carbon offset projects around the world</SectionSubtitle>
          </div>
          <AdvancedFeaturesButton onClick={onShowMapFeatures}>
            <BarChart3 size={18} />
            Advanced Features
            <ArrowRight size={16} />
          </AdvancedFeaturesButton>
        </SectionHeader>
        
        <MapContent>
          <StyledMapContainer 
            center={[15, 78]} 
            zoom={5} 
            scrollWheelZoom={true}
            style={{ height: '500px', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {projects.map((project) => (
              <Marker 
                key={project.id} 
                position={project.coordinates}
                icon={project.id <= 9 ? greenIcon : defaultIcon}
                eventHandlers={{
                  mouseover: () => handleProjectHover(project),
                  mouseout: handleProjectLeave
                }}
              >
                <Popup>
                  <PopupContent>
                    <ProjectType className={project.type}>{project.type}</ProjectType>
                    <h4>{project.name}</h4>
                    <p><strong>Location:</strong> {project.location}</p>
                    <p><strong>Impact:</strong> {project.impact}</p>
                    <p><strong>Status:</strong> <span className="status">{project.status}</span></p>
                    <p><strong>Started:</strong> {project.startDate}</p>
                    <p>{project.description}</p>
                    <ViewDetailsButton>View Project Details</ViewDetailsButton>
                  </PopupContent>
                </Popup>
              </Marker>
            ))}
          </StyledMapContainer>
        </MapContent>
        
        <StatsContainer>
          <StatItem>
            <StatNumber>{projects.length}</StatNumber>
            <StatLabel>Active Projects</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>7</StatNumber>
            <StatLabel>Projects in South India</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>18,500+</StatNumber>
            <StatLabel>Tons CO₂ Reduced Yearly</StatLabel>
          </StatItem>
        </StatsContainer>
      </Container>
    </MapContainerWrapper>
  );
};

// Styled Components
const MapContainerWrapper = styled.section`
  padding: 5rem 0;
  background: linear-gradient(to bottom, #0a0a0a, #111);
  position: relative;
  scroll-margin-top: 80px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff87, transparent);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #fff;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #00ff87, #60efff);
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 700px;
`;

const AdvancedFeaturesButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, #00ff87, #00cc66);
  border: none;
  border-radius: 30px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(90deg, #00cc66, #00ff87);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 135, 0.3);
  }
  
  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

const MapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const StyledMapContainer = styled(MapContainer)`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  
  // Leaflet specific styles
  .leaflet-container {
    height: 100%;
    width: 100%;
    background: #1a1a1a;
  }
  
  .leaflet-popup-content-wrapper {
    border-radius: 8px;
    padding: 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }
  
  .leaflet-popup-content {
    margin: 0;
    padding: 16px;
    width: 300px !important;
  }
  
  .leaflet-popup-tip {
    background: #1a1a1a;
  }
  
  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 480px) {
    height: 300px;
  }
`;

const PopupContent = styled.div`
  h4 {
    margin: 0 0 12px 0;
    color: #00ff87;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0 0 8px 0;
    color: #ccc;
    font-size: 0.9rem;
    line-height: 1.4;
    
    strong {
      color: #fff;
    }
    
    .status {
      color: #00ff87;
      font-weight: bold;
    }
  }
`;

const ProjectType = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-transform: uppercase;
  
  &.solar {
    background-color: rgba(255, 204, 0, 0.2);
    color: #ffcc00;
  }
  
  &.wind {
    background-color: rgba(0, 153, 255, 0.2);
    color: #0099ff;
  }
  
  &.forest {
    background-color: rgba(0, 204, 102, 0.2);
    color: #00cc66;
  }
  
  &.water {
    background-color: rgba(0, 153, 255, 0.2);
    color: #0099ff;
  }
  
  &.recycling {
    background-color: rgba(153, 102, 255, 0.2);
    color: #9966ff;
  }
  
  &.coastal {
    background-color: rgba(0, 102, 255, 0.2);
    color: #0066ff;
  }
`;

const ViewDetailsButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-top: 12px;
  background: linear-gradient(90deg, #00ff87, #00cc66);
  border: none;
  border-radius: 4px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(90deg, #00cc66, #00ff87);
    transform: translateY(-2px);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: rgba(0, 255, 135, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(0, 255, 135, 0.1);
  min-width: 180px;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #00ff87;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #ccc;
`;

export default MapSection;
