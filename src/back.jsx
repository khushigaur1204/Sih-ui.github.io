// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';

// Import all pages
import MainPage from './pages/MainPage'; // Import MainPage
import ProjectsPage from './pages/ProjectsPage';
import MarketplacePage from './pages/MarketplacePage';
import DashboardPage from './pages/DashboardPage';
import GeneralDashboardPage from './pages/GeneralDashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Import components
import Navbar from './components/Navbar/Navbar';
import Navbar1 from './components/Navbar/Navbar-1';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ProjectDetails from './components/MobileApp/ProjectDetails';

const PageWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only show loading for page navigations, not initial load
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

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const renderPage = (Component) => (
    <>
      {!isHomePage && <Navbar1 />}
      <PageWrapper>
        <Component />
      </PageWrapper>
    </>
  );

  return (
    <div className="min-h-screen">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} /> {/* Use MainPage here */}
        <Route path="/projects" element={renderPage(ProjectsPage)} />
        <Route path="/marketplace" element={renderPage(MarketplacePage)} />
        <Route path="/dashboard" element={renderPage(DashboardPage)} />
        <Route path="/dashboards" element={renderPage(GeneralDashboardPage)} />
        <Route path="/login" element={renderPage(LoginPage)} />
        <Route path="/signup" element={renderPage(SignupPage)} />
        <Route path="/mobile/project-details" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;