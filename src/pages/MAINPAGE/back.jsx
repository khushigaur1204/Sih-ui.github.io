import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const MainPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const isScrolling = useRef(false);

  const sections = [
    { id: 'hero', title: 'Hero Section', color: '#4a6fa5', content: 'Welcome to our website' },
    { id: 'about', title: 'About Us', color: '#4e4187', content: 'Learn about our story' },
    { id: 'impact', title: 'Our Impact', color: '#3083dc', content: 'See the difference we make' },
    { id: 'projects', title: 'Projects', color: '#2f9c95', content: 'Explore our work' },
    { id: 'brands', title: 'Trusted Brands', color: '#2c6e49', content: 'Companies we work with' },
    { id: 'transaction', title: 'Transactions', color: '#4c956c', content: 'Our business process' },
    { id: 'map', title: 'Our Reach', color: '#3b5b5d', content: 'Where we operate' },
    { id: 'contact', title: 'Contact Us', color: '#5c374c', content: 'Get in touch' },
    { id: 'footer', title: 'Footer', color: '#1e1e1e', content: 'Additional information' },
  ];

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling.current) return;
      
      const scrollTop = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const currentSection = Math.floor(scrollTop / sectionHeight);
      const progress = (scrollTop % sectionHeight) / sectionHeight;
      
      setActiveSection(currentSection);
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section when clicked on navigation
  const scrollToSection = (index) => {
    if (containerRef.current) {
      isScrolling.current = true;
      const sectionHeight = window.innerHeight;
      containerRef.current.scrollTo({
        top: index * sectionHeight,
        behavior: 'smooth'
      });
      
      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && activeSection < sections.length - 1) {
        e.preventDefault();
        scrollToSection(activeSection + 1);
      } else if (e.key === 'ArrowUp' && activeSection > 0) {
        e.preventDefault();
        scrollToSection(activeSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, sections.length]);

  return (
    <>
      <GlobalStyles />
      <PageContainer ref={containerRef}>
        {sections.map((section, index) => (
          <Section
            key={section.id}
            ref={el => sectionsRef.current[index] = el}
            style={{ 
              backgroundColor: section.color,
              transform: `translateY(${-scrollProgress * 50}px) scale(${1 - Math.abs(index - activeSection) * 0.05})`,
              opacity: 1 - Math.abs(index - activeSection) * 0.3,
              zIndex: sections.length - Math.abs(index - activeSection),
            }}
          >
            <SectionContent>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
              <SectionNumber>{index + 1}/{sections.length}</SectionNumber>
            </SectionContent>
            
            {index === activeSection && (
              <ScrollHint>
                <Arrow>{activeSection === sections.length - 1 ? '↑' : '↓'}</Arrow>
                <HintText>Scroll {activeSection === sections.length - 1 ? 'up' : 'down'}</HintText>
              </ScrollHint>
            )}
          </Section>
        ))}
        
        <NavigationDots>
          {sections.map((_, index) => (
            <Dot
              key={index}
              active={index === activeSection}
              onClick={() => scrollToSection(index)}
            />
          ))}
        </NavigationDots>
        
        <ProgressBar>
          <ProgressFill style={{ width: `${(activeSection / (sections.length - 1)) * 100}%` }} />
        </ProgressBar>
        
        <ScrollIndicator>
          <span>Scroll to navigate</span>
          <ScrollArrow>↓</ScrollArrow>
        </ScrollIndicator>
      </PageContainer>
    </>
  );
};

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body, #root {
    height: 100%;
    overflow: hidden;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  position: relative;
  scroll-behavior: smooth;
  background-color: #1e1e1e;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Section = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  scroll-snap-align: start;
  transition: transform 0.3s ease, opacity 0.3s ease;
  padding: 20px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4), transparent);
    z-index: 10;
  }
`;

const SectionContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  z-index: 5;
  
  h2 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  p {
    font-size: 1.5rem;
    opacity: 0.9;
  }
`;

const SectionNumber = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 1.2rem;
  opacity: 0.7;
`;

const ScrollHint = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Arrow = styled.div`
  font-size: 2.5rem;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const HintText = styled.div`
  font-size: 1.2rem;
  opacity: 0.8;
`;

const NavigationDots = styled.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
`;

const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  transform: ${props => props.active ? 'scale(1.4)' : 'scale(1)'};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  
  &:hover {
    transform: scale(1.4);
    background-color: white;
  }
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 1000;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #ff7b00, #ff0055);
  transition: width 0.3s ease;
`;

const ScrollIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 1rem;
  opacity: 0.7;
  z-index: 1000;
  
  @media (max-height: 600px) {
    display: none;
  }
`;

const ScrollArrow = styled.div`
  font-size: 1.8rem;
  animation: bounce 2s infinite;
`;

export default MainPage;