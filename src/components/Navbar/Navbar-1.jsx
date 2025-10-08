import React, { useState, useEffect } from 'react';

const Navbar1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 flex justify-between items-center py-5 px-8 md:px-16 lg:px-24 z-50 transition-all duration-300 bg-black/40 backdrop-blur-lg`}>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-transparent to-black/20 pointer-events-none"></div>
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-white font-semibold text-xl md:text-2xl tracking-tight">
            CarbonVerse
          </div>
        </div>
        
        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex items-center space-x-10 lg:space-x-12 absolute left-1/2 transform -translate-x-1/2">
          <a href="/" className="text-white/90 text-[13px] font-medium hover:text-white transition-all duration-300 uppercase tracking-[1.5px] relative group">
            HOME
            <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/mobile/project-details" className="text-white/90 text-[13px] font-medium hover:text-white transition-all duration-300 uppercase tracking-[1.5px] relative group">
            MOBILE
            <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/projects" className="text-white/90 text-[13px] font-medium hover:text-white transition-all duration-300 uppercase tracking-[1.5px] relative group">
            PROJECTS
            <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/marketplace" className="text-white/90 text-[13px] font-medium hover:text-white transition-all duration-300 uppercase tracking-[1.5px] relative group">
            MARKETPLACE
            <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/dashboards" className="text-white/90 text-[13px] font-medium hover:text-white transition-all duration-300 uppercase tracking-[1.5px] relative group">
            DASHBOARDS
            <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/signup" className="text-white/90 text-[13px] font-medium hover:text-white transition-all duration-300 uppercase tracking-[1.5px] relative group">
            SIGN UP
            <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Right side - Signup Button */}
        <div className="hidden md:flex items-center">
          <a href="/login" className="text-white font-semibold text-xl md:text-2xl tracking-tight hover:text-green-400 transition-colors duration-300">
            LOGIN
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none relative w-8 h-8 flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span className={`block h-[2px] w-full bg-white transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
            }`}></span>
            <span className={`block h-[2px] w-full bg-white transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`block h-[2px] w-full bg-white transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
            }`}></span>
          </div>
        </button>
      </nav>
      
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-[4.5rem]"></div>
      
      {/* Mobile Menu - Fullscreen */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <a 
            href="/" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-2xl font-light uppercase tracking-[2px] hover:tracking-[4px] transition-all duration-300"
          >
            HOME
          </a>
          <a 
            href="/projects" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-2xl font-light uppercase tracking-[2px] hover:tracking-[4px] transition-all duration-300"
          >
            PROJECTS
          </a>
          <a 
            href="/mobile/project-details" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-2xl font-light uppercase tracking-[2px] hover:tracking-[4px] transition-all duration-300"
          >
            PROJECT DETAILS
          </a>
          <a 
            href="/marketplace" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-2xl font-light uppercase tracking-[2px] hover:tracking-[4px] transition-all duration-300"
          >
            MARKETPLACE
          </a>
          <a 
            href="/dashboards" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-2xl font-light uppercase tracking-[2px] hover:tracking-[4px] transition-all duration-300"
          >
            DASHBOARDS
          </a>
          <a 
            href="/signup" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-2xl font-light uppercase tracking-[2px] hover:tracking-[4px] transition-all duration-300"
          >
            SIGN UP
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar1;

