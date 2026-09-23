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

  const attemptPlay = async () => {
    if (
      !audioRef.current ||
      isMuted ||
      audioRef.current.readyState < 3 ||
      document.visibilityState === 'hidden'
    ) {
      return;
    }

    try {
      await audioRef.current.play();
    } catch {
      // Autoplay may be blocked until a real user gesture.
    }
  };

  const handleUserInteraction = () => {
    hasInteracted.current = true;
    if (
      !isMuted &&
      document.visibilityState === 'visible' &&
      audioRef.current &&
      audioRef.current.paused
    ) {
      void attemptPlay();
    }
  };

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.src = '/ambient-music.mp3';
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'none';

    const savedMuteState = localStorage.getItem('isMuted');
    const savedVolume = localStorage.getItem('volume');

    if (savedMuteState !== null) {
      setIsMuted(JSON.parse(savedMuteState));
    }

    if (savedVolume !== null) {
      setVolume(JSON.parse(savedVolume));
    }

    if (!isMuted && document.visibilityState === 'visible') {
      void attemptPlay();
    }

    const interactionEvents = ['scroll', 'touchstart', 'click', 'keydown'] as const;
    interactionEvents.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.visibilityState === 'hidden') {
        audioRef.current.pause();
      } else if (!isMuted && hasInteracted.current && audioRef.current.paused) {
        void attemptPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      interactionEvents.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    localStorage.setItem('isMuted', JSON.stringify(isMuted));

    if (
      !isMuted &&
      hasInteracted.current &&
      document.visibilityState === 'visible' &&
      audioRef.current.paused
    ) {
      void attemptPlay();
    } else if (isMuted) {
      audioRef.current.pause();
    }
  }, [isMuted]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
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
