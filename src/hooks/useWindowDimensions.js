import { useState, useEffect } from 'react';

const getWindowDimensions = () => ({ 
    width: window.innerWidth, 
    height: window.innerHeight
  });

const useWindowDimensions = () => {

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const windowResizeHandler = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', windowResizeHandler);
    
    return () => window.removeEventListener('resize', windowResizeHandler);
  }, []);
  
  return windowDimensions;
};

export default useWindowDimensions;