import React, { useEffect, useState, ReactNode } from 'react';
import styles from "./index.module.css";
import { UseScreenHeight } from '@/utils/screenUtils';

interface AnimatedComponentProps {
  direction: 'up' | 'down' | 'left' | 'right'; 
  threshold: number;
  children: ReactNode; 
}

const ScrollAnimationComponent: React.FC<AnimatedComponentProps> = ({ direction, threshold, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const screenHeight = UseScreenHeight();
  useEffect(() => {
    const handleScroll = () => {
      if (screenHeight !== null && window.scrollY >= threshold) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    handleScroll();

    return () => {
      console.log("scrollY: "+ window.scrollY)
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, screenHeight]);

  return (
    <div className={`${styles[`fade-in-${direction}`]} ${isVisible ? styles.show : ''}`}>
      {children}
    </div>
  );
};

export default ScrollAnimationComponent;