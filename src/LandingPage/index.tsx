import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeDesktop } from './WelcomeDesktop';
import { WelcomeMobile } from './WelcomeMobile';

export const LandingPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [playAnimation, setPlayAnimation] = useState<boolean>(true);
  const navigate = useNavigate();

  // Dynamic Serving Logic
  useEffect(() => {
    const checkIsMobile = () => {
      // 768px matches the md breakpoint in Tailwind, dividing our Mobile vs Desktop rendering
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Listener for window resize
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // SessionStorage Animation Logic
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('has_seen_welcome');
    if (hasSeenWelcome === 'true') {
      setPlayAnimation(false);
    } else {
      setPlayAnimation(true);
      // We set it to true immediately after deciding to play it. 
      // This ensures if they refresh mid-animation, it won't play again.
      sessionStorage.setItem('has_seen_welcome', 'true');
    }
  }, []);

  const handleEnter = () => {
    navigate('/hub');
  };

  // Serve the correct component based on screen width
  return isMobile ? (
    <WelcomeMobile playAnimation={playAnimation} onEnter={handleEnter} />
  ) : (
    <WelcomeDesktop playAnimation={playAnimation} onEnter={handleEnter} />
  );
};
