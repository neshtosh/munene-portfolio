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
      } finally {
        // Remove event listeners after first successful interaction
        const events = ['scroll', 'touchstart'];
        events.forEach(event => {
          document.removeEventListener(event, handleUserInteraction);
        });
        console.log('Removed interaction listeners');
      }
    };

    // Add event listeners for initial user interaction
    const handleUserInteraction = () => {
      console.log('User interaction detected');
      if (!hasInteracted.current) {
        startAudio();
      }
    };

    const initialInteractionEvents = ['scroll', 'touchstart'];
    initialInteractionEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction);
    });

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.visibilityState === 'hidden') {
        console.log('Page hidden, pausing audio');
        audioRef.current.pause();
      } else {
        console.log('Page visible');
        // Attempt to resume playback only if not muted and interacted before
        if (!isMuted && hasInteracted.current) {
           audioRef.current.play().catch(error => {
            console.error('Audio resume failed:', error);
          });
        } else {
          console.log('Audio not resumed: muted or no prior interaction');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      initialInteractionEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); // Empty dependency array as we only want to initialize once

  useEffect(() => {
    if (!audioRef.current) return;

    // Save mute state to localStorage
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
    
    if (isMuted) {
      console.log('Muted, pausing audio');
      audioRef.current.pause();
    } else if (hasInteracted.current && document.visibilityState === 'visible') { // Only play if not muted, interacted, and page is visible
      console.log('Unmuted and interacted, attempting to play audio');
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed on unmute:', error);
      });
    } else {
       console.log('Audio not played on unmute: no interaction or page hidden');
    }
  }, [isMuted, hasInteracted]); // Added hasInteracted to dependency array to react to interaction state changes

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