// components/ScrollStack/ScrollStack.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ScrollStackContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y proximity; /* Changed from mandatory to proximity */
  position: relative;
  scroll-behavior: smooth;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StackSection = styled.div`
  width: 100%;
  min-height: 100vh; /* Changed from height to min-height */
  display: flex;
  flex-direction: column;
  position: relative;
  scroll-snap-align: start;
  transition: transform 0.5s ease, opacity 0.5s ease;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 0;
`;

const ScrollableContent = styled.div`
  overflow-y: auto;
  max-height: 70vh;
  padding: 1rem;
  margin: 1rem 0;
  
  /* Hide scrollbar but allow scrolling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const ScrollStack = ({ children }) => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);
  const sectionRefs = useRef([]);

  const sections = React.Children.toArray(children);

  // Scroll to a specific section
  const scrollToSection = (index) => {
    if (isScrolling.current) return;
    
    isScrolling.current = true;
    setActiveSection(index);
    
    if (containerRef.current && sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
    }, 800);
  };

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling.current) return;
      
      const scrollTop = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const currentSection = Math.floor(scrollTop / sectionHeight);
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

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
      <ScrollStackContainer ref={containerRef}>
        {sections.map((section, index) => (
          <StackSection
            key={index}
            ref={el => sectionRefs.current[index] = el}
            style={{ 
              transform: `translateY(${index === activeSection ? 0 : (index < activeSection ? -10 : 10)}px) scale(${index === activeSection ? 1 : 0.97})`,
              opacity: index === activeSection ? 1 : 0.8,
              zIndex: sections.length - Math.abs(index - activeSection),
            }}
          >
            <SectionContent>
              {section}
            </SectionContent>
          </StackSection>
        ))}
      </ScrollStackContainer>
      
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
    </>
  );
};

// Styled components for navigation elements (keep these the same as before)
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
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

export default ScrollStack;