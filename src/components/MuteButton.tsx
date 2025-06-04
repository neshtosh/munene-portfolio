import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const MuteButton: React.FC = () => {
  const { isMuted, toggleMute, volume, setVolume } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint is 768px
    };

    // Set initial mobile state
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile && showVolumeSlider) {
      // Start timer to hide slider after 2 seconds on mobile
      timerRef.current = setTimeout(() => {
        setShowVolumeSlider(false);
      }, 2000); // 2000ms = 2 seconds
    } else if (timerRef.current) {
      // Clear timer if slider is hidden or not on mobile
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Cleanup timer on unmount or state change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showVolumeSlider, isMobile]); // Re-run effect when showVolumeSlider or isMobile changes

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    // Reset timer on volume change to keep slider visible while interacting
    if (isMobile) {
       if (timerRef.current) {
        clearTimeout(timerRef.current);
       }
       timerRef.current = setTimeout(() => {
          setShowVolumeSlider(false);
       }, 2000);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted) return <VolumeX className="w-5 h-5" />;
    if (volume < 0.3) return <Volume1 className="w-5 h-5" />;
    return <Volume2 className="w-5 h-5" />;
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => !isMobile && setShowVolumeSlider(true)} // Only show on hover if not mobile
      onMouseLeave={() => !isMobile && setShowVolumeSlider(false)} // Only hide on leave if not mobile
      onClick={() => isMobile && setShowVolumeSlider(!showVolumeSlider)} // Toggle on click if mobile
    >
      <button
        onClick={toggleMute}
        className="p-2 rounded-full hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>
      
      {showVolumeSlider && (
        <div className="absolute right-0 top-full mt-2 p-2 bg-white dark:bg-dark rounded-lg shadow-lg border border-dark/10 dark:border-light/10 transition-opacity duration-300 ease-out" style={{ opacity: showVolumeSlider ? 1 : 0 }}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-highlight dark:bg-dark-600 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${volume * 100}%, var(--color-highlight) ${volume * 100}%, var(--color-highlight) 100%)`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MuteButton; 