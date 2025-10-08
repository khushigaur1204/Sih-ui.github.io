import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { 
  Filter, Search, Download, BarChart3, Clock, 
  Compare, BookOpen, RefreshCw, X, Sliders 
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icons for different project types
const createCustomIcon = (color) => new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}"/>
      <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="white"/>
    </svg>
  `)}`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const projectIcons = {
  solar: createCustomIcon('#FFCC00'),
  wind: createCustomIcon('#0099FF'),
  forest: createCustomIcon('#00CC66'),
  water: createCustomIcon('#0066FF'),
  recycling: createCustomIcon('#9966FF'),
  coastal: createCustomIcon('#00AAFF')
};

const MapFeatures = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState([2020, 2024]);
  const [impactVisualization, setImpactVisualization] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [storyMode, setStoryMode] = useState(false);
  const [currentStory, setCurrentStory] = useState(0);
  const [realTimeData, setRealTimeData] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    setIsClient(true);
    
    if (realTimeData) {
      const interval = setInterval(updateRealTimeData, 5000);
      return () => clearInterval(interval);
    }
  }, [realTimeData]);

  const projects = [
    // South Indian projects
    {
      id: 1,
      name: 'Solar Farm Project',
      location: 'Rajasthan, India',
      coordinates: [27.0238, 74.2179],
      impact: 2500,
      description: 'Large-scale solar farm generating clean energy for local communities.',
      startDate: '2021-08-22',
      status: 'Active',
      type: 'solar',
      progress: 85,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Wind Energy Initiative',
      location: 'Tamil Nadu, India',
      coordinates: [10.9094, 78.3665],
      impact: 3200,
      description: 'Wind turbines generating renewable energy for the southern grid.',
      startDate: '2020-11-30',
      status: 'Active',
      type: 'wind',
      progress: 92,
      image: 'https://images.unsplash.com/photo-1495012379376-194c2fb0f4b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      name: 'Mangrove Restoration',
      location: 'Kerala, India',
      coordinates: [9.9312, 76.2673],
      impact: 1800,
      description: 'Restoring mangrove forests in Kerala backwaters to protect against erosion.',
      startDate: '2022-06-15',
      status: 'Active',
      type: 'forest',
      progress: 78,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      name: 'Hyderabad Solar Rooftops',
      location: 'Telangana, India',
      coordinates: [17.3850, 78.4867],
      impact: 1200,
      description: 'Installing solar panels on residential and commercial buildings.',
      startDate: '2023-01-10',
      status: 'Active',
      type: 'solar',
      progress: 65,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 5,
      name: 'Bangalore E-Waste Recycling',
      location: 'Karnataka, India',
      coordinates: [12.9716, 77.5946],
      impact: 950,
      description: 'Recycling electronic waste to reduce landfill emissions.',
      startDate: '2022-09-05',
      status: 'Active',
      type: 'recycling',
      progress: 88,
      image: 'https://images.unsplash.com/photo-1587334274527-ba54f0b5a357?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 6,
      name: 'Chennai Water Conservation',
      location: 'Tamil Nadu, India',
      coordinates: [13.0827, 80.2707],
      impact: 1100,
      description: 'Water conservation and management reducing energy consumption.',
      startDate: '2021-12-18',
      status: 'Active',
      type: 'water',
      progress: 72,
      image: 'https://images.unsplash.com/photo-1613312443158-32c6ed14c16f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 7,
      name: 'Coastal Protection Project',
      location: 'Goa, India',
      coordinates: [15.2993, 74.1240],
      impact: 1400,
      description: 'Protecting coastal ecosystems and preventing erosion.',
      startDate: '2022-03-22',
      status: 'Active',
      type: 'coastal',
      progress: 81,
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    // Other projects
    {
      id: 8,
      name: 'Mangrove Restoration',
      location: 'Indonesia',
      coordinates: [-0.7893, 113.9213],
      impact: 1800,
      description: 'Restoring mangrove forests to protect coastlines and sequester carbon.',
      startDate: '2022-11-05',
      status: 'Active',
      type: 'forest',
      progress: 90,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 9,
      name: 'Solar Irrigation',
      location: 'Bangladesh',
      coordinates: [23.6850, 90.3563],
      impact: 1100,
      description: 'Solar-powered irrigation systems reducing diesel dependency for farmers.',
      startDate: '2023-02-22',
      status: 'Active',
      type: 'solar',
      progress: 60,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const stories = [
    {
      title: "South India's Renewable Revolution",
      description: "Explore how South India is leading the way in renewable energy projects.",
      center: [13.5, 78],
      zoom: 6,
      projects: [1, 2, 4]
    },
    {
      title: "Coastal Conservation Efforts",
      description: "Discover projects protecting India's valuable coastline ecosystems.",
      center: [12.5, 77],
      zoom: 6,
      projects: [3, 7]
    },
    {
      title: "Urban Sustainability Initiatives",
      description: "See how major cities are implementing sustainable solutions.",
      center: [13.5, 78],
      zoom: 6,
      projects: [5, 6]
    }
  ];

  const updateRealTimeData = () => {
    // Simulate real-time data updates
    const updatedProjects = projects.map(project => ({
      ...project,
      impact: Math.floor(project.impact * (1 + (Math.random() * 0.05))),
      progress: Math.min(100, project.progress + (Math.random() * 2))
    }));
    // In a real app, this would update the state with new data
  };

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const toggleProjectSelection = (projectId) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

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
    
    // Filter by time range
    const projectYear = parseInt(project.startDate.split('-')[0]);
    if (projectYear < timeRange[0] || projectYear > timeRange[1]) {
      return false;
    }
    
    return true;
  });

  const exportData = () => {
    const dataStr = JSON.stringify(filteredProjects, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'carbon-projects.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const startStory = (index) => {
    setStoryMode(true);
    setCurrentStory(index);
    const story = stories[index];
    
    if (mapRef.current) {
      mapRef.current.setView(story.center, story.zoom);
    }
  };

  const nextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
      const story = stories[currentStory + 1];
      
      if (mapRef.current) {
        mapRef.current.setView(story.center, story.zoom);
      }
    } else {
      setStoryMode(false);
    }
  };

  const calculateRadius = (impact) => {
    return Math.sqrt(impact) * 1000;
  };

  if (!isClient) {
    return <div>Loading map features...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>Advanced Project Explorer</Title>
        <Subtitle>Interactive tools to explore our carbon offset projects</Subtitle>
      </Header>

      <ControlsContainer>
        <SearchBox>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBox>

        <FilterGroup>
          <FilterLabel><Filter size={16} /> Project Type</FilterLabel>
          <FilterOptions>
            {Object.keys(projectIcons).map(type => (
              <FilterButton 
                key={type} 
                active={activeFilters.includes(type)}
                onClick={() => toggleFilter(type)}
              >
                {type}
              </FilterButton>
            ))}
          </FilterOptions>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel><Clock size={16} /> Timeline</FilterLabel>
          <TimeRange>
            <span>{timeRange[0]}</span>
            <input 
              type="range" 
              min="2020" 
              max="2024" 
              step="1"
              value={timeRange[1]}
              onChange={(e) => setTimeRange([timeRange[0], parseInt(e.target.value)])}
            />
            <span>{timeRange[1]}</span>
          </TimeRange>
        </FilterGroup>

        <ActionButtons>
          <ActionButton 
            active={impactVisualization}
            onClick={() => setImpactVisualization(!impactVisualization)}
          >
            <BarChart3 size={16} />
            Impact Visualization
          </ActionButton>

          <ActionButton 
            active={realTimeData}
            onClick={() => setRealTimeData(!realTimeData)}
          >
            <RefreshCw size={16} />
            Real-time Data
          </ActionButton>

          <ActionButton onClick={exportData}>
            <Download size={16} />
            Export Data
          </ActionButton>

          <ActionButton 
            active={storyMode}
            onClick={() => setStoryMode(!storyMode)}
          >
            <BookOpen size={16} />
            Story Mode
          </ActionButton>
        </ActionButtons>
      </ControlsContainer>

      {storyMode && (
        <StoryContainer>
          <StoryHeader>
            <h3>{stories[currentStory].title}</h3>
            <p>{stories[currentStory].description}</p>
            <StoryNavigation>
              <button onClick={() => setStoryMode(false)}>
                <X size={16} /> Exit Story
              </button>
              <button onClick={nextStory}>
                {currentStory < stories.length - 1 ? 'Next Story' : 'Finish'}
              </button>
            </StoryNavigation>
          </StoryHeader>
        </StoryContainer>
      )}

      <MapComparisonContainer>
        <MapWrapper>
          <StyledMapContainer 
            center={[15, 78]} 
            zoom={5} 
            scrollWheelZoom={true}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {filteredProjects.map((project) => (
              <React.Fragment key={project.id}>
                <Marker 
                  position={project.coordinates}
                  icon={projectIcons[project.type]}
                >
                  <Popup>
                    <PopupContent>
                      <ProjectImage src={project.image} alt={project.name} />
                      <ProjectType className={project.type}>{project.type}</ProjectType>
                      <h4>{project.name}</h4>
                      <p><strong>Location:</strong> {project.location}</p>
                      <p><strong>Impact:</strong> {project.impact} tons CO₂/year</p>
                      <p><strong>Status:</strong> <span className="status">{project.status}</span></p>
                      <p><strong>Started:</strong> {project.startDate}</p>
                      <p><strong>Progress:</strong> {project.progress}%</p>
                      <p>{project.description}</p>
                      
                      <ActionRow>
                        <CompareButton 
                          onClick={() => toggleProjectSelection(project.id)}
                          selected={selectedProjects.includes(project.id)}
                        >
                          <Compare size={14} />
                          {selectedProjects.includes(project.id) ? 'Remove from Compare' : 'Add to Compare'}
                        </CompareButton>
                      </ActionRow>
                    </PopupContent>
                  </Popup>
                </Marker>
                
                {impactVisualization && (
                  <Circle
                    center={project.coordinates}
                    radius={calculateRadius(project.impact)}
                    fillColor={getColorForType(project.type)}
                    fillOpacity={0.2}
                    color={getColorForType(project.type)}
                    weight={1}
                  />
                )}
              </React.Fragment>
            ))}
          </StyledMapContainer>
        </MapWrapper>

        {selectedProjects.length > 0 && (
          <ComparisonPanel>
            <ComparisonHeader>
              <h3>Project Comparison ({selectedProjects.length})</h3>
              <button onClick={() => setSelectedProjects([])}>Clear All</button>
            </ComparisonHeader>
            
            <ComparisonGrid>
              {projects
                .filter(p => selectedProjects.includes(p.id))
                .map(project => (
                  <ComparisonCard key={project.id}>
                    <h4>{project.name}</h4>
                    <p><strong>Type:</strong> {project.type}</p>
                    <p><strong>Impact:</strong> {project.impact} tons CO₂/year</p>
                    <p><strong>Progress:</strong> {project.progress}%</p>
                    <p><strong>Location:</strong> {project.location}</p>
                    <RemoveButton onClick={() => toggleProjectSelection(project.id)}>
                      Remove
                    </RemoveButton>
                  </ComparisonCard>
                ))
              }
            </ComparisonGrid>
          </ComparisonPanel>
        )}
      </MapComparisonContainer>

      <StoriesContainer>
        <StoriesHeader>
          <h3>Featured Story Maps</h3>
          <p>Take guided tours through our project clusters</p>
        </StoriesHeader>
        
        <StoriesGrid>
          {stories.map((story, index) => (
            <StoryCard key={index} onClick={() => startStory(index)}>
              <StoryNumber>{index + 1}</StoryNumber>
              <h4>{story.title}</h4>
              <p>{story.description}</p>
              <StoryStats>{story.projects.length} projects</StoryStats>
            </StoryCard>
          ))}
        </StoriesGrid>
      </StoriesContainer>
    </Container>
  );
};

// Helper function to get color for project type
const getColorForType = (type) => {
  const colors = {
    solar: '#FFCC00',
    wind: '#0099FF',
    forest: '#00CC66',
    water: '#0066FF',
    recycling: '#9966FF',
    coastal: '#00AAFF'
  };
  return colors[type] || '#00FF87';
};

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #0a0a0a, #111);
  min-height: 100vh;
  color: #fff;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #00ff87, #60efff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: #ccc;
  font-size: 1.1rem;
`;

const ControlsContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  
  input {
    background: none;
    border: none;
    color: #fff;
    padding: 0.5rem;
    width: 100%;
    outline: none;
    
    &::placeholder {
      color: #888;
    }
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #00ff87;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#00ff87' : 'transparent'};
  color: ${props => props.active ? '#000' : '#00ff87'};
  border: 1px solid #00ff87;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: #00ff87;
    color: #000;
  }
`;

const TimeRange = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  input {
    flex: 1;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#00ff87' : 'transparent'};
  color: ${props => props.active ? '#000' : '#00ff87'};
  border: 1px solid #00ff87;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: #00ff87;
    color: #000;
  }
`;

const MapComparisonContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.hasComparison ? '2fr 1fr' : '1fr'};
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const MapWrapper = styled.div`
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  
  .leaflet-container {
    background: #1a1a1a;
  }
`;

const PopupContent = styled.div`
  max-width: 300px;
  
  h4 {
    margin: 0.5rem 0;
    color: #00ff87;
  }
  
  p {
    margin: 0.25rem 0;
    color: #ccc;
    font-size: 0.9rem;
    
    strong {
      color: #fff;
    }
    
    .status {
      color: #00ff87;
      font-weight: bold;
    }
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
`;

const ProjectType = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
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

const ActionRow = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const CompareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.selected ? '#00ff87' : 'transparent'};
  color: ${props => props.selected ? '#000' : '#00ff87'};
  border: 1px solid #00ff87;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background: #00ff87;
    color: #000;
  }
`;

const ComparisonPanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  overflow-y: auto;
`;

const ComparisonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0;
    color: #00ff87;
  }
  
  button {
    background: transparent;
    color: #ff6b6b;
    border: 1px solid #ff6b6b;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    
    &:hover {
      background: #ff6b6b;
      color: #000;
    }
  }
`;

const ComparisonGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const ComparisonCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #00ff87;
  }
  
  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: #ccc;
    
    strong {
      color: #fff;
    }
  }
`;

const RemoveButton = styled.button`
  margin-top: 0.5rem;
  background: transparent;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background: #ff6b6b;
    color: #000;
  }
`;

const StoriesContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
`;

const StoriesHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h3 {
    color: #00ff87;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #ccc;
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const StoryCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 135, 0.1);
    transform: translateY(-5px);
  }
  
  h4 {
    color: #00ff87;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #ccc;
    margin-bottom: 1rem;
  }
`;

const StoryNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #00ff87;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StoryStats = styled.div`
  color: #00ff87;
  font-weight: bold;
`;

const StoryContainer = styled.div`
  background: rgba(0, 255, 135, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const StoryHeader = styled.div`
  text-align: center;
  
  h3 {
    color: #00ff87;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #ccc;
    margin-bottom: 1rem;
  }
`;

const StoryNavigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    
    &:first-child {
      background: transparent;
      color: #ff6b6b;
      border: 1px solid #ff6b6b;
      
      &:hover {
        background: #ff6b6b;
        color: #000;
      }
    }
    
    &:last-child {
      background: #00ff87;
      color: #000;
      border: none;
      
      &:hover {
        background: #00cc66;
      }
    }
  }
`;

export default MapFeatures;
