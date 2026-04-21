import { useState, useEffect, useRef, useCallback } from 'react';

export type Track = {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
};

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'AI Synthwave',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/neon/400/400'
  },
  {
    id: '2',
    title: 'Cyber Runner',
    artist: 'Future Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/cyber/400/400'
  },
  {
    id: '3',
    title: 'Midnight Drive',
    artist: 'Lofi Horizons',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/night/400/400'
  }
];

export function useMusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (!audioRef.current) {
        audioRef.current = new Audio(currentTrack.url);
    } else {
        audioRef.current.src = currentTrack.url;
    }
    
    const audio = audioRef.current;
    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch(e => console.error("Playback failed", e));
    }

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      skipNext();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => setIsPlaying(prev => !prev);

  const skipNext = useCallback(() => {
    setCurrentTrackIndex(prev => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  }, []);

  const skipPrev = useCallback(() => {
    setCurrentTrackIndex(prev => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  }, []);

  const seek = (val: number) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
      setProgress(val);
    }
  };

  return {
    currentTrack,
    isPlaying,
    progress,
    volume,
    setVolume,
    togglePlay,
    skipNext,
    skipPrev,
    seek,
    tracks: DUMMY_TRACKS
  };
}
