import React, { useState, useRef, useEffect } from 'react';

const DragCounterComponent = () => {
  const [count, setCount] = useState(10);
  const [isCounting, setIsCounting] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const containerRef = useRef(null);
  const countdownRef = useRef(null);

  // Handle the scroll event
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
    
    if (isAtEnd && !isCounting) {
      setShowCounter(true);
      setIsCounting(true);
      setCount(10);
    } else if (!isAtEnd && showCounter) {
      setShowCounter(false);
      setIsCounting(false);
    }
  };

  // Countdown effect
  useEffect(() => {
    let interval;
    if (isCounting && count > 0) {
      interval = setInterval(() => {
        setCount(prev => prev - 1);
      }, 1000);
    } else if (count === 0) {
      setTimeout(() => {
        setShowCounter(false);
        setIsCounting(false);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isCounting, count]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          YOUR SMOOTHEST<br />
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            TRANSITION TO ZERO
          </span>
        </h1>
        <p className="text-gray-400 mt-4">Drag to the right to reveal the counter</p>
      </div>

      <div 
        ref={containerRef}
        className="w-full max-w-4xl overflow-x-auto whitespace-nowrap scrollbar-hide rounded-xl bg-gray-800 p-6 relative"
        onScroll={handleScroll}
        style={{ cursor: 'grab' }}
      >
        <div className="inline-flex space-x-6">
          {['Kingson', 'Lorem', 'Susan', 'Tamara', 'Joshua', 'Written', 'Legend', 'Unseen', 'Same'].map((item, index) => (
            <div key={index} className="inline-block w-64 h-64 bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-300 flex-shrink-0">
              <h3 className="text-xl font-semibold mb-3">{item}</h3>
              <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>

        {/* Counter */}
        <div 
          ref={countdownRef}
          className={`absolute bottom-6 right-6 w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-300 ${showCounter ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        >
          {count.toString().padStart(2, '0')}
        </div>

        {/* Drag indicator */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center text-gray-400 text-sm">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
          <span>Drag to the end</span>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>03:684211 • 000.0000000</p>
        <p className="mt-2">© 2023 CarbonZero. All rights reserved.</p>
      </div>
    </div>
  );
};

export default DragCounterComponent;