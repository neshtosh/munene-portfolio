import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const MuteButton: React.FC = () => {
  const { isMuted, toggleMute, volume, setVolume } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to hide the slider after a delay
  const startVolumeTimer = () => {
    // Clear any existing timer
    if (volumeTimerRef.current) {
      clearTimeout(volumeTimerRef.current);
    }
    // Set a new timer to hide the slider after 2 seconds
    volumeTimerRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  // Clear timer on component unmount
  useEffect(() => {
    return () => {
      if (volumeTimerRef.current) {
        clearTimeout(volumeTimerRef.current);
      }
    };
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    // Restart the timer whenever the volume changes
    startVolumeTimer();
  };

  const handleButtonClick = () => {
    // Toggle mute state
    toggleMute();
    
    // Show slider on button click only on small screens
    if (window.innerWidth < 768) { // Tailwind's md breakpoint is 768px
      setShowVolumeSlider(true);
      startVolumeTimer(); // Start the timer to hide it
    } else {
       // On larger screens, the slider visibility is handled by hover
       // If the button is clicked on a large screen, we might want to toggle visibility or just rely on hover.
       // For now, keep hover behavior on large screens.
    }
  };

  const handleMouseEnter = () => {
    // Only show slider on hover on large screens
    if (window.innerWidth >= 768) {
      setShowVolumeSlider(true);
      // Clear the timer if it exists when hovering on larger screens
      if (volumeTimerRef.current) {
        clearTimeout(volumeTimerRef.current);
        volumeTimerRef.current = null; // Clear ref after clearing timer
      }
    }
  };

  const handleMouseLeave = () => {
    // Only hide slider on mouse leave on large screens
    if (window.innerWidth >= 768) {
      setShowVolumeSlider(false);
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleButtonClick}
        className="p-2 rounded-full hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>
      
      {showVolumeSlider && (
        // Add a check for window size here as well to be extra sure
        // or rely on the logic above to only set showVolumeSlider true on mobile click
        <div className="absolute right-0 top-full mt-2 p-2 bg-white dark:bg-dark rounded-lg shadow-lg border border-dark/10 dark:border-light/10">
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