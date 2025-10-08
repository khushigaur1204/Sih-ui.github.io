import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Star, Eye, ShoppingCart, Heart, ArrowRight, ExternalLink, Calendar, MapPin, Leaf, Shield, Check, Clock, Users, BarChart3 } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground/ParticlesBackground';

const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [creditType, setCreditType] = useState('carbon-credits');
  const [selectedVolume, setSelectedVolume] = useState('all');

  const carbonCredits = [
    {
      id: 1,
      title: 'Mangrove Restoration Credits',
      project: 'Sundarbans Conservation Initiative',
      organization: 'Green Delta Foundation',
      location: 'West Bengal, India',
      price: 45.00,
      availableCredits: 2500,
      soldCredits: 1500,
      rating: 4.8,
      category: 'Mangrove',
      verification: 'VCS Verified',
      vintage: 2024,
      impact: '1 ton CO₂e per credit',
      image: 'https://img.freepik.com/premium-photo/jungle-river-thapom-mangrove-forest_35977-2289.jpg',
      description: 'High-quality carbon credits from mangrove restoration project with verified VCS certification.',
      methodology: 'VCS VM0007 - Afforestation, Reforestation and Revegetation',
      coBenefits: ['Biodiversity Protection', 'Coastal Protection', 'Community Livelihoods'],
      expiryDate: '2034-12-31',
      isVerified: true,
      isPremium: true,
      volume: 'volume1'
    },
    {
      id: 2,
      title: 'Seagrass Meadow Credits',
      project: 'Lakshadweep Marine Conservation',
      organization: 'Ocean Conservation India',
      location: 'Lakshadweep, India',
      price: 52.00,
      availableCredits: 1800,
      soldCredits: 1200,
      rating: 4.6,
      category: 'Seagrass',
      verification: 'Gold Standard',
      vintage: 2024,
      impact: '1 ton CO₂e per credit',
      image: 'https://tse1.mm.bing.net/th/id/OIP.pU1y9pKnjYDZxlWTShBRlgHaEc?w=500&h=300&rs=1&pid=ImgDetMain&o=7&rm=3',
      description: 'Premium seagrass carbon credits with Gold Standard certification and marine ecosystem co-benefits.',
      methodology: 'Gold Standard GS-VER - Marine Ecosystem Restoration',
      coBenefits: ['Marine Biodiversity', 'Fisheries Support', 'Carbon Storage'],
      expiryDate: '2034-12-31',
      isVerified: true,
      isPremium: false,
      volume: 'volume1'
    },
    {
      id: 3,
      title: 'Coral Reef Restoration Credits',
      project: 'Andaman Coral Recovery Program',
      organization: 'Marine Life Conservancy',
      location: 'Andaman & Nicobar Islands',
      price: 68.00,
      availableCredits: 900,
      soldCredits: 600,
      rating: 4.7,
      category: 'Coral',
      verification: 'Plan Vivo',
      vintage: 2024,
      impact: '1 ton CO₂e per credit',
      image: 'https://images.prismic.io/ocean-agency-cms/eff7160a-e2ec-4eae-8e4e-0ab237e7d480_2000+seagrass+category.jpg?auto=compress,format',
      description: 'Marine carbon credits from coral reef restoration with verified blue carbon benefits.',
      methodology: 'Plan Vivo - Coastal Ecosystem Restoration',
      coBenefits: ['Coral Protection', 'Tourism Support', 'Climate Resilience'],
      expiryDate: '2034-12-31',
      isVerified: true,
      isPremium: true,
      volume: 'volume1'
    },
    {
      id: 4,
      title: 'Saltmarsh Conservation Credits',
      project: 'Gujarat Coastal Protection',
      organization: 'Coastal Guardians',
      location: 'Gujarat, India',
      price: 38.00,
      availableCredits: 3200,
      soldCredits: 1800,
      rating: 4.5,
      category: 'Salt Marsh',
      verification: 'VCS Certified',
      vintage: 2024,
      impact: '1 ton CO₂e per credit',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Estuarine carbon credits from salt marsh conservation with verified ecosystem benefits.',
      methodology: 'VCS VM0033 - Estuarine Carbon Methodology',
      coBenefits: ['Water Filtration', 'Flood Control', 'Bird Habitat'],
      expiryDate: '2034-12-31',
      isVerified: true,
      isPremium: false,
      volume: 'volume2'
    },
    {
      id: 5,
      title: 'Blue Carbon Bundle',
      project: 'Multi-Ecosystem Initiative',
      organization: 'Southern Marine Alliance',
      location: 'Tamil Nadu, India',
      price: 42.00,
      availableCredits: 1500,
      soldCredits: 1000,
      rating: 4.9,
      category: 'Bundle',
      verification: 'Gold Standard',
      vintage: 2024,
      impact: '1 ton CO₂e per credit',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Diversified blue carbon credits from multiple marine ecosystems with Gold Standard certification.',
      methodology: 'Gold Standard GS-VER - Multi-Ecosystem Approach',
      coBenefits: ['Biodiversity', 'Community Development', 'Ecosystem Health'],
      expiryDate: '2034-12-31',
      isVerified: true,
      isPremium: true,
      volume: 'volume2'
    },
    {
      id: 6,
      title: 'Kelp Forest Credits',
      project: 'Arabian Sea Kelp Restoration',
      organization: 'Western Coast Conservancy',
      location: 'Maharashtra, India',
      price: 75.00,
      availableCredits: 750,
      soldCredits: 450,
      rating: 4.4,
      category: 'Kelp',
      verification: 'MRV Certified',
      vintage: 2024,
      impact: '1 ton CO₂e per credit',
      image: 'https://imgs.mongabay.com/wp-content/uploads/sites/20/2020/04/02102156/kelp4.jpg',
      description: 'Innovative kelp forest carbon credits with verified MRV certification and marine benefits.',
      methodology: 'VCS VM0034 - Marine Vegetation Restoration',
      coBenefits: ['Fisheries Enhancement', 'Ocean Health', 'Coastal Protection'],
      expiryDate: '2034-12-31',
      isVerified: true,
      isPremium: true,
      volume: 'volume2'
    }
  ];

  // New statistics data
  const statsData = {
    avgPrice: 48.50,
    available: 12700,
    tonsCO2: 89000,
    projects: 25
  };

  const categories = ['all', 'Mangrove', 'Wetland', 'Seagrass', 'Coral', 'Salt Marsh', 'Kelp', 'Bundle'];
  const creditTypes = ['Carbon Credits', 'Project Investments', 'Credit Bundles'];
  const volumes = ['all', 'volume1', 'volume2'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'available', label: 'Most Available' }
  ];

  // Filtering logic
  const filteredCredits = carbonCredits.filter(credit => {
    const matchesSearch = credit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || credit.category === selectedCategory;
    const matchesPrice = credit.price >= priceRange[0] && credit.price <= priceRange[1];
    const matchesVolume = selectedVolume === 'all' || credit.volume === selectedVolume;
    return matchesSearch && matchesCategory && matchesPrice && matchesVolume;
  });

  // Sorting logic
  const sortedCredits = [...filteredCredits].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.vintage) - new Date(a.vintage);
      case 'oldest':
        return new Date(a.vintage) - new Date(b.vintage);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'available':
        return b.availableCredits - a.availableCredits;
      default:
        return 0;
    }
  });

  // Event handlers
  const handleAddToCart = (credit) => {
    setCart(prev => [...prev, { ...credit, quantity: 1 }]);
    alert(`${credit.title} added to cart!`);
  };

  const handleAddToWishlist = (creditId) => {
    if (wishlist.includes(creditId)) {
      setWishlist(prev => prev.filter(id => id !== creditId));
    } else {
      setWishlist(prev => [...prev, creditId]);
    }
  };

  const handleViewDetails = (credit) => {
    setSelectedCredit(credit);
  };

  const handleCloseModal = () => {
    setSelectedCredit(null);
  };

  const handleBuyNow = (credit) => {
    alert(`Redirecting to payment for ${credit.title}. This would integrate with payment gateway.`);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Mangrove': 'bg-teal-100 text-teal-800',
      'Wetland': 'bg-teal-100 text-teal-800',
      'Seagrass': 'bg-teal-100 text-teal-800',
      'Coral': 'bg-teal-100 text-teal-800',
      'Salt Marsh': 'bg-teal-100 text-teal-800',
      'Kelp': 'bg-teal-100 text-teal-800',
      'Bundle': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-slate-100 text-slate-800';
  };

  const getVerificationColor = (verification) => {
    const colors = {
      'VCS Verified': 'bg-teal-100 text-teal-800',
      'Gold Standard': 'bg-amber-100 text-amber-800',
      'MRV Certified': 'bg-teal-100 text-teal-800',
      'Plan Vivo': 'bg-teal-100 text-teal-800',
      'VCS Certified': 'bg-teal-100 text-teal-800'
    };
    return colors[verification] || 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      <ParticlesBackground />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cenlon Credits</h1>
              <p className="text-gray-600 mt-1">Buy and trade verified carbon credits from ocean restoration projects</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500">
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button className="relative p-2 text-gray-500">
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-teal-100 text-teal-800' : 'text-gray-500'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-teal-100 text-teal-800' : 'text-gray-500'}`}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="bg-current h-1 rounded-sm"></div>
                  <div className="bg-current h-1 rounded-sm"></div>
                  <div className="bg-current h-1 rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Buy Verified Blue Carbon Credits</h2>
          <p className="text-gray-600 mb-6">Purchase high-quality, verified blue carbon credits from ocean conservation projects. Every credit directly supports marine ecosystem restoration and climate action.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-700">${statsData.avgPrice}</div>
              <div className="text-sm text-gray-500">Avg. Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{statsData.available.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{statsData.tonsCO2.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Tons CO₂e</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{statsData.projects}</div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-6 pb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
          {/* Credit Type Filter */}
          <div className="flex gap-4 mb-6">
            {creditTypes.map(type => (
              <button
                key={type}
                onClick={() => setCreditType(type.toLowerCase().replace(' ', '-'))}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  creditType === type.toLowerCase().replace(' ', '-')
                    ? 'bg-teal-100 text-teal-800 border border-teal-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search credits by project, location, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-teal-100 text-teal-800 border border-teal-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>

          {/* Volume Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Volume:</label>
            <div className="flex gap-2">
              {volumes.map(volume => (
                <button
                  key={volume}
                  onClick={() => setSelectedVolume(volume)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedVolume === volume
                      ? 'bg-teal-100 text-teal-800 border border-teal-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {volume === 'all' ? 'All Volumes' : volume === 'volume1' ? 'Volume 1' : 'Volume 2'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Special Credit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* VCS Verified Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <span className="text-sm font-medium text-teal-800">VCS Verified</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Mangrove Restoration Credits</h3>
            <p className="text-sm text-gray-600 mb-4">Sundarbans Conservation Initiative</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">West Bengal, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-gray-600">Green Delta Foundation</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Vintage 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-gray-600">1 ton CO₂e per credit</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-teal-700">$45</div>
                <div className="text-sm text-gray-500">per credit</div>
              </div>
              <div className="text-sm text-gray-500">Available: 2,500</div>
            </div>
            <button 
              onClick={() => handleAddToCart(carbonCredits[0])}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-800 text-white rounded-xl font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>

          {/* Gold Standard Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-sm font-medium text-amber-800">Gold Standard</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Seagrass Meadow Credits</h3>
            <p className="text-sm text-gray-600 mb-4">Lakshadweep Marine Conservation</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Lakshadweep, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-gray-600">Ocean Conservation India</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Vintage 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-gray-600">1 ton CO₂e per credit</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-teal-700">$52</div>
                <div className="text-sm text-gray-500">per credit</div>
              </div>
              <div className="text-sm text-gray-500">Available: 1,800</div>
            </div>
            <button 
              onClick={() => handleAddToCart(carbonCredits[1])}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-800 text-white rounded-xl font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>

          {/* Plan Vivo Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <span className="text-sm font-medium text-teal-800">Plan Vivo</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Coral Reef Restoration Credits</h3>
            <p className="text-sm text-gray-600 mb-4">Andaman Coral Recovery Program</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-gray-600">Andaman & Nicobar Islands</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-gray-600">Marine Life Conservancy</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Vintage 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-gray-600">1 ton CO₂e per credit</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-teal-700">$68</div>
                <div className="text-sm text-gray-500">per credit</div>
              </div>
              <div className="text-sm text-gray-500">Available: 900</div>
            </div>
            <button 
              onClick={() => handleAddToCart(carbonCredits[2])}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-800 text-white rounded-xl font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Volume Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Volume 1</h2>
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {sortedCredits.filter(credit => credit.volume === 'volume1').map((credit, index) => (
              <div
                key={credit.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200"
              >
                <div className="relative">
                  {/* Credit Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={credit.image} 
                      alt={credit.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(credit.category)}`}>
                        <Leaf className="w-3 h-3" />
                        {credit.category}
                      </span>
                    </div>

                    {/* Premium Badge */}
                    {credit.isPremium && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <Star className="w-3 h-3" />
                          Premium
                        </span>
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button 
                      onClick={() => handleAddToWishlist(credit.id)}
                      className="absolute bottom-4 right-4 p-2 bg-white/90 rounded-lg"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(credit.id) ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                    </button>
                  </div>

                  {/* Credit Content */}
                  <div className="p-6">
                    {/* Verification Badge */}
                    <div className="mb-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getVerificationColor(credit.verification)}`}>
                        <Shield className="w-3 h-3" />
                        {credit.verification}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {credit.title}
                    </h3>

                    {/* Project & Organization */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{credit.project}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{credit.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Vintage {credit.vintage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Leaf className="w-4 h-4 text-teal-600" />
                        <span className="text-sm">{credit.impact}</span>
                      </div>
                    </div>

                    {/* Price and Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-teal-700">${credit.price}</div>
                        <div className="text-sm text-gray-500">per credit</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-900">{credit.rating}</span>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Available Credits</span>
                        <span className="text-sm font-semibold text-gray-900">{credit.availableCredits.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-600 h-2 rounded-full"
                          style={{ width: `${(credit.availableCredits / (credit.availableCredits + credit.soldCredits)) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(credit)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button 
                        onClick={() => handleAddToCart(credit)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-800 text-white rounded-xl font-medium"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Volume 2</h2>
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {sortedCredits.filter(credit => credit.volume === 'volume2').map((credit, index) => (
              <div
                key={credit.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200"
              >
                <div className="relative">
                  {/* Credit Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={credit.image} 
                      alt={credit.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(credit.category)}`}>
                        <Leaf className="w-3 h-3" />
                        {credit.category}
                      </span>
                    </div>

                    {/* Premium Badge */}
                    {credit.isPremium && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <Star className="w-3 h-3" />
                          Premium
                        </span>
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button 
                      onClick={() => handleAddToWishlist(credit.id)}
                      className="absolute bottom-4 right-4 p-2 bg-white/90 rounded-lg"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(credit.id) ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                    </button>
                  </div>

                  {/* Credit Content */}
                  <div className="p-6">
                    {/* Verification Badge */}
                    <div className="mb-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getVerificationColor(credit.verification)}`}>
                        <Shield className="w-3 h-3" />
                        {credit.verification}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {credit.title}
                    </h3>

                    {/* Project & Organization */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{credit.project}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{credit.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Vintage {credit.vintage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Leaf className="w-4 h-4 text-teal-600" />
                        <span className="text-sm">{credit.impact}</span>
                      </div>
                    </div>

                    {/* Price and Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-teal-700">${credit.price}</div>
                        <div className="text-sm text-gray-500">per credit</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-900">{credit.rating}</span>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Available Credits</span>
                        <span className="text-sm font-semibold text-gray-900">{credit.availableCredits.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-600 h-2 rounded-full"
                          style={{ width: `${(credit.availableCredits / (credit.availableCredits + credit.soldCredits)) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(credit)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button 
                        onClick={() => handleAddToCart(credit)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-800 text-white rounded-xl font-medium"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold">
            <span>Load More Credits</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Credit Detail Modal */}
      {selectedCredit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{selectedCredit.title}</h2>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedCredit.image} 
                    alt={selectedCredit.title}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-600">{selectedCredit.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Impact</h3>
                      <p className="text-gray-600">{selectedCredit.impact}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Co-benefits</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCredit.coBenefits.map((benefit, index) => (
                          <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold text-teal-700">${selectedCredit.price} per credit</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Available:</span>
                        <span className="font-semibold text-gray-900">{selectedCredit.availableCredits.toLocaleString()} credits</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vintage:</span>
                        <span className="font-semibold text-gray-900">{selectedCredit.vintage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expiry:</span>
                        <span className="font-semibold text-gray-900">{selectedCredit.expiryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Methodology:</span>
                        <span className="font-semibold text-sm text-gray-900">{selectedCredit.methodology}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Purchase Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Minimum Purchase:</span>
                        <span className="font-semibold text-gray-900">10 credits</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Bulk Discount:</span>
                        <span className="font-semibold text-teal-700">5% off 100+ credits</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleAddToCart(selectedCredit)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(selectedCredit)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-teal-800 text-white rounded-xl font-semibold"
                    >
                      <span>Buy Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
