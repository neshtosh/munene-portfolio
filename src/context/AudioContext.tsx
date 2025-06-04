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
    } else {
      // Attempt to play on initial load if not previously muted
      audioRef.current.play().catch(error => {
        console.error('Initial autoplay failed:', error);
      });
    }

    if (savedVolume !== null) {
      setVolume(JSON.parse(savedVolume));
    }

    // Function to attempt audio playback
    const attemptPlay = async () => {
      if (!audioRef.current || isMuted || audioRef.current.paused) return;
      
      try {
        await audioRef.current.play();
        console.log('Audio playback attempted and likely succeeded');
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    };

    // Add event listeners for any user interaction
    const handleUserInteraction = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        console.log('User interaction detected, hasInteracted set to true');
        // Attempt to play after interaction if not muted and page is visible
        if (!isMuted && document.visibilityState === 'visible') {
           attemptPlay();
        }
      } else {
        console.log('User interaction detected, but already interacted');
         // If already interacted, just ensure playback if not muted and visible
         if (!isMuted && audioRef.current?.paused && document.visibilityState === 'visible') {
            attemptPlay();
         }
      }
    };

    const interactionEvents = ['scroll', 'touchstart', 'click', 'keydown'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true }); // Use once:true to avoid multiple handlers per event type initially
    });

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.visibilityState === 'hidden') {
        console.log('Page hidden, pausing audio');
        audioRef.current.pause();
      } else {
        console.log('Page visible');
        // Attempt to resume playback only if not muted and interacted before and currently paused
        if (!isMuted && hasInteracted.current && audioRef.current.paused) {
           attemptPlay();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
       interactionEvents.forEach(event => {
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
       // Attempt to play when unmuted, if user has interacted and page is visible
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed on unmute:', error);
      });
    } else {
       console.log('Audio not played on unmute: no interaction or page hidden');
    }
  }, [isMuted, hasInteracted]);

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