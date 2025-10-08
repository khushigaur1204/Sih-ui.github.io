import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';


const HeroSection = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef([]);
  
  // Professional video backgrounds - using reliable CDN sources
  const backgrounds = [
    {
      type: 'video',
      sources: [
        { src: '' }
      ],
      fallback: 'https://wallpaperaccess.com/full/4574532.jpg'
    },
    {
      type: 'video', 
      sources: [
        { src: '' }
      ],
      fallback: 'https://wallpaperaccess.com/full/3495156.jpg'
    },
    {
      type: 'video',
      sources: [
        { src: '' }
      ],
      fallback: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop'
    },
    {
      type: 'video',
      sources: [
        { src: '' }
      ],
      fallback: 'https://cms.happiplans.com/wp-content/uploads/2023/10/happiplans-promotions-homepage-scaled.jpg'
    }
  ];

  // Handle video loading and playing
  useEffect(() => {
    const playCurrentVideo = () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === currentBg) {
            video.currentTime = 0;
            video.play().catch(error => {
              console.log('Video autoplay failed:', error);
            });
          } else {
            video.pause();
          }
        }
      });
    };

    playCurrentVideo();
    setIsLoading(false);
  }, [currentBg]);

  // Auto-change background every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const nextBg = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  const prevBg = () => {
    setCurrentBg((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentBg(index);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <Navbar />
      
      {/* Background Videos/Images */}
      {backgrounds.map((bg, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === currentBg ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          {bg.type === 'video' ? (
            <>
              <video 
                ref={el => videoRefs.current[index] = el}
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover scale-105"
                poster={bg.fallback}
                preload="auto"
              >
                {bg.sources.map((source, i) => (
                  <source key={i} src={source.src} type={source.type} />
                ))}
              </video>
              {/* Fallback image */}
              <img 
                src={bg.fallback} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover scale-105"
                style={{ display: 'none' }}
                onError={(e) => e.target.style.display = 'block'}
              />
            </>
          ) : (
            <img 
              src={bg.source} 
              alt="" 
              className="w-full h-full object-cover scale-105"
            />
          )}
          
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
        </div>
      ))}
      
      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center z-10">
        <div className="text-center px-4 md:px-8 max-w-6xl mx-auto">
          {/* Main heading with animation */}
          <div className="overflow-hidden">
            <h1 className="text-white font-light text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-tight tracking-[0.02em] mb-3 animate-slideUp">
              MAKING YOUR TRANSITION TO
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-white font-bold text-[36px] sm:text-[48px] md:text-[56px] lg:text-[72px] leading-none tracking-[0.01em] animate-slideUp animation-delay-200">
              ZERO EASY AND SMOOTH
            </h1>
          </div>
          
          {/* Optional subtitle */}
          <div className="mt-8 overflow-hidden">
            <p className="text-white/80 text-sm md:text-base lg:text-lg max-w-2xl mx-auto animate-fadeIn animation-delay-400">
              Transform your carbon footprint with innovative solutions designed for a sustainable future
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="mt-10 animate-fadeIn animation-delay-600">
            <button className="group relative px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium text-sm uppercase tracking-[1.5px] hover:bg-white hover:text-black transition-all duration-500 overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>

          
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevBg}
        className="absolute left-6 md:left-10 top-1/2 transform -translate-y-1/2 z-20 text-white/50 hover:text-white transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg className="w-12 h-12 md:w-14 md:h-14 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextBg}
        className="absolute right-6 md:right-10 top-1/2 transform -translate-y-1/2 z-20 text-white/50 hover:text-white transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg className="w-12 h-12 md:w-14 md:h-14 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 ${
              index === currentBg 
                ? 'w-12 h-1 bg-white' 
                : 'w-6 h-1 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(60px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .duration-2000 {
          transition-duration: 2000ms;
        }
      `}</style>
      
    </div>
  );
};

export default HeroSection;