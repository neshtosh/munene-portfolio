import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.src = '/ambient-music.mp3';
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';

    // Load audio preferences from localStorage
    const savedMuteState = localStorage.getItem('isMuted');
    const savedVolume = localStorage.getItem('volume');
    
    if (savedMuteState !== null) {
      setIsMuted(JSON.parse(savedMuteState));
    }
    if (savedVolume !== null) {
      setVolume(JSON.parse(savedVolume));
    }

    // Function to start audio playback
    const startAudio = async () => {
      if (!audioRef.current || isMuted) return;
      
      try {
        await audioRef.current.play();
        hasInteracted.current = true;
        console.log('Audio started playing');
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    };

    // Add event listeners for user interaction
    const handleUserInteraction = () => {
      console.log('User interaction detected');
      if (!hasInteracted.current) {
        startAudio();
      }
    };

    // Listen for scroll and touch events
    const events = ['scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction);
    });

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []); // Empty dependency array as we only want to initialize once

  useEffect(() => {
    if (!audioRef.current) return;

    // Save mute state to localStorage
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
    
    if (isMuted) {
      audioRef.current.pause();
    } else if (hasInteracted.current) {
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
    }
  }, [isMuted]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    // Update audio volume
    audioRef.current.volume = volume;
    // Save volume to localStorage
    localStorage.setItem('volume', JSON.stringify(volume));
  }, [volume]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}; 