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

  // Function to attempt audio playback (used for resume logic, not initial interaction directly)
  const attemptPlay = async () => {
    // Check readyState, mute state, and visibility before attempting to play
    if (!audioRef.current || isMuted || audioRef.current.readyState < 3 || document.visibilityState === 'hidden') {
       console.log('AttemptPlay blocked: muted, not ready, or hidden');
       return;
    }
      
    try {
      await audioRef.current.play();
      console.log('Audio playback attempted and likely succeeded');
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

   // Add event listeners for any user interaction
  const handleUserInteraction = () => {
     console.log('User interaction detected');
     hasInteracted.current = true; // Set interacted immediately on any interaction
     // Attempt play if not muted and page is visible, and audio is paused
     if (!isMuted && document.visibilityState === 'visible' && audioRef.current && audioRef.current.paused) {
        attemptPlay();
     }
  };


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

    // Attempt initial autoplay if not muted and page is visible (might be blocked)
    // This initial autoplay might be blocked, interaction will handle it.
    if (!isMuted && document.visibilityState === 'visible'){
        attemptPlay();
    }

    // Add event listeners for initial user interaction
    const interactionEvents = ['scroll', 'touchstart', 'click', 'keydown']; // Changed from initialInteractionEvents
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction); // Removed { once: true }
    });

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.visibilityState === 'hidden') {
        console.log('Page hidden, pausing audio');
        audioRef.current.pause();
      } else {
        console.log('Page visible');
        // Attempt to resume playback only if not muted, interacted before, currently paused, and page is visible
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
    
    // When unmuted, if user has interacted and page is visible, attempt to play if paused
    if (!isMuted && hasInteracted.current && document.visibilityState === 'visible' && audioRef.current.paused) { 
      console.log('Unmuted and interacted, attempting to play audio');
       attemptPlay(); // Use attemptPlay to benefit from its internal checks
    } else if (isMuted) {
      console.log('Muted, pausing audio');
      audioRef.current.pause();
    }
     else {
       console.log('Audio state changed, but playback conditions not met (no interaction, page hidden, or not paused)');
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