import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero/Hero';
import AboutUs from '../components/AboutUs/AboutUs';
import Projects from '../components/Projects/Projects';
import TrustedBrands from '../components/TrustedBrands/TrustedBrands';
import Impact from '../components/Impact/Impact';
import Transaction from '../components/Transaction/Transaction';
import MapSection from '../components/Map/Map';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import LoadingPage from '../components/LoadingPage/LoadingPage';
const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <PageContainer>
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <AboutUs />

      {/* Impact Section */}
      <Impact />
      
      {/* Projects Section */}
      <Projects />
      
      {/* Trusted Brands Section */}
      <TrustedBrands />
      
      {/* Transaction Section */}
      <Transaction />
      
      {/* Map Section */}
      <MapSection />
      
      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <Footer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export default MainPage;
