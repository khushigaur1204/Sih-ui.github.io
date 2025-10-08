import React from 'react';
import styled from 'styled-components';
import Particles from '../Particles/Particles';
import Orb from '../ORB/Orb';

const LoadingPage = ({ 
  title = "Welcome to CarbonVerse",
  subtitle = "Your sustainable future starts here",
  showLoadingBar = true
}) => {
  return (
    <AppContainer>
      <MainContent>
        {/* Background Particles - Full Viewport */}
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden'
        }}>
          <Particles
            particleCount={window.innerWidth < 1024 ? 5000 : 3000}
            particleSpread={15}
            speed={0.2}
            particleBaseSize={200}
            particleColors={['#11FF00']}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={true}
            cameraDistance={2.5}
          />
        </div>
        
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          width: '100vw',
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          padding: '20px',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            padding: '20px'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: 'min(90vw, 700px)',
              height: 'min(60vh, 500px)',
              minHeight: '300px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
              }}>
                <Orb
                  hoverIntensity={0.5}
                  rotateOnHover={true}
                  hue={120}
                  forceHoverState={false}
                />
                
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  color: 'white',
                  zIndex: 4,
                  width: '150%',
                  maxWidth: '130%',
                  pointerEvents: 'none',
                  padding: '0 20px'
                }}>
                  <h1 style={{
                    fontSize: 'clamp(1.8rem, 6vw, 4rem)',
                    fontWeight: 'bold',
                    margin: '0 0 1rem 0',
                    textShadow: '0 0 15px rgba(17, 255, 0, 0.7)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.5px'
                  }}>{title}</h1>
                  <p style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
                    margin: '1rem 0 0.5rem 0',
                    opacity: 0.9,
                    textShadow: '0 0 10px rgba(17, 255, 0, 0.5)',
                    lineHeight: '1.4',
                    maxWidth: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>{subtitle}</p>
                  {showLoadingBar && (
                    <div style={{
                      position: 'relative',
                      width: '18%',
                      height: '8px',
                      backgroundColor: 'rgba(17, 255, 0, 0.15)',
                      borderRadius: '4px',
                      margin: '2.5rem auto 0',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        height: '100%',
                        width: '40%',
                        backgroundColor: '#11FF00',
                        borderRadius: '4px',
                        boxShadow: '0 0 15px rgba(17, 255, 0, 0.7)',
                        left: 0,
                        animation: 'loading 1s infinite linear',
                      }}></div>
                      <style>{
                        `@keyframes loading {
                          0% { 
                            transform: translateX(-100%);
                            opacity: 0.7;
                          }
                          50% {
                            opacity: 1;
                          }
                          100% { 
                            transform: translateX(330%);
                            opacity: 0.7;
                          }
                        }`
                      }</style>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  background-color: #000;
  width: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.5s ease-out;
  
  &.fade-out {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s ease-out;
  }
`;

const MainContent = styled.div`
  padding-top: 100px;
  
  /* Loading bar animation */
  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(330%); }
  }
  
  /* Loading bar element */
  [style*="animation: loading"] {
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: loading 1.5s infinite;
    }
  }
`;

export default LoadingPage;