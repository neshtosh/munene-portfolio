import React, { useState } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const MuteButton: React.FC = () => {
  const { isMuted, toggleMute, volume, setVolume } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (isMuted) return <VolumeX className="w-5 h-5" />;
    if (volume < 0.3) return <Volume1 className="w-5 h-5" />;
    return <Volume2 className="w-5 h-5" />;
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      <button
        onClick={toggleMute}
        className="p-2 rounded-full hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>
      
      {showVolumeSlider && (
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