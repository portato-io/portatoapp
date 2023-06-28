import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from './how-it-works-animation.json';

const LottieAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }
  }, []);

  return <div ref={containerRef}></div>;
};

export default LottieAnimation;
