import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return; // Ignore mouse events if touch is active
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
      setIsVisible(true);
    };

    const handleTouchStart = (e: TouchEvent) => {
      setIsTouch(true);
      if (e.touches.length > 0) {
        setPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        });
        setIsVisible(true);
      }
    };

     const handleTouchMove = (e: TouchEvent) => {
       if (!isTouch || e.touches.length === 0) return; // Only track touchmove if touch started
       setPosition({
           x: e.touches[0].clientX,
           y: e.touches[0].clientY
         });
     };

    const handleTouchEnd = () => {
        setIsVisible(false);
        // Keep isTouch true until next mouse movement to avoid flickers
    };

    const handleMouseLeave = () => {
        if (!isTouch) {
            setIsVisible(false);
        }
    };

     const handleMouseEnter = () => {
        if (!isTouch) {
            setIsVisible(true);
        }
    };

    // Reset isTouch on first mouse move after touch ends
    const handleFirstMouseMoveAfterTouch = () => {
        setIsTouch(false);
        document.removeEventListener('mousemove', handleFirstMouseMoveAfterTouch);
    };


    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Add a listener to reset isTouch after touch ends
    document.addEventListener('mousemove', handleFirstMouseMoveAfterTouch);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousemove', handleFirstMouseMoveAfterTouch);
    };
  }, [isTouch]); // Re-run effect if isTouch changes

  return (
    <div
      className="custom-cursor-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: 'none', // Ensure clicks pass through
        transition: 'opacity 0.2s ease-in-out' // Smooth fade
      }}
    >
      {/* Representing the abstract design with divs */}
      <div className="cursor-line"></div>
      <div className="cursor-circle small"></div>
      <div className="cursor-circle medium"></div>
      <div className="cursor-circle large"></div>
    </div>
  );
};

export default CustomCursor; 