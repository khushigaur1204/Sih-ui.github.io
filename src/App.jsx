import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType, Navigate } from 'react-router-dom';

// Import all pages
import ProjectsPage from './pages/ProjectsPage';
import MarketplacePage from './pages/MarketplacePage';
import DashboardPage from './pages/DashboardPage';
import GeneralDashboardPage from './pages/GeneralDashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NgoDashboard from './pages/ngo/NgoDashboard';
import RegulatoryBodyDashboard from './pages/RegulatoryBody/RegulatoryBodyDashboard';
// Import other dashboard components as they're created
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

// Import components
import Navbar from './components/Navbar/Navbar';
import Navbar1 from './components/Navbar/Navbar-1';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import LoadingPage from './components/LoadingPage/LoadingPage'; // Import LoadingPage
import Hero from './components/Hero/Hero';
import About from './components/AboutUs/AboutUs';
import Impact from './components/Impact/Impact';
import Projects from './components/Projects/Projects';
import Transaction from './components/Transaction/Transaction';
import MapSection from './components/Map/Map';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ProjectDetails from './components/MobileApp/ProjectDetails';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <Hero />

      {/* About Us Section */}
      <About />

      {/* Impact Section */}
      <Impact />

      {/* Projects Section */}
      <Projects />

      {/* Transaction Section */}
      <Transaction />

      {/* Map Section */}
      <MapSection />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};



// HomePage with Loading - Only for the homepage
const HomePageWithLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 3 seconds loading for homepage

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingPage /> : <HomePage />;
};

// PageWrapper for other pages (not homepage)
const PageWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only show loading for page navigations
    if (navigationType === 'PUSH' || navigationType === 'POP' || navigationType === 'REPLACE') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Shorter duration for page transitions

      return () => clearTimeout(timer);
    }
  }, [location, navigationType]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        {children}
      </div>
    </>
  );
};

// Create Auth Context
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const renderPage = (Component, isPublic = true) => {
    const isDashboardRoute = [
      '/dashboard',
      '/ngo/dashboard',
      '/regulatory/dashboard',
      '/buyer/dashboard',
      '/admin/dashboard'
    ].includes(location.pathname);
    
    const content = (
      <PageWrapper>
        <Component />
      </PageWrapper>
    );

    if (isDashboardRoute) {
      return !isPublic ? (
        <ProtectedRoute>
          {content}
        </ProtectedRoute>
      ) : content;
    }

    return !isPublic ? (
      <ProtectedRoute>
        <Navbar1 />
        {content}
      </ProtectedRoute>
    ) : (
      <>
        <Navbar1 />
        {content}
      </>
    );
  }
  

  return (
    <div className="min-h-screen">
      <Routes location={location} key={location.pathname}>
        {/* HomePage with LoadingPage */}
        <Route path="/" element={<HomePageWithLoading />} />
        
        {/* Public routes */}
        <Route path="/projects" element={renderPage(ProjectsPage)} />
        <Route path="/marketplace" element={renderPage(MarketplacePage)} />
        <Route path="/dashboards" element={renderPage(GeneralDashboardPage)} />
        <Route path="/login" element={renderPage(LoginPage)} />
        <Route path="/signup" element={renderPage(SignupPage)} />
        <Route path="/mobile/project-details" element={<ProjectDetails />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={renderPage(DashboardPage, false)} />
        <Route path="/ngo/dashboard" element={renderPage(NgoDashboard, false)} />
        <Route path="/regulatory/dashboard" element={renderPage(RegulatoryBodyDashboard, false)} />
        <Route path="/buyer/dashboard" element={renderPage(BuyerDashboard, false)} />
        <Route path="/admin/dashboard" element={renderPage(AdminDashboard, false)} />
        
        {/* Catch all other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;