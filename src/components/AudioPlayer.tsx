import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  title: string;
  composer: string;
  src?: string;
}

export function AudioPlayer({ title, composer, src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      // Si no hay src, simplemente simulamos la reproducción visualmente
      if (src) {
        audioRef.current?.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Simulación de progreso si no hay archivo real
  useEffect(() => {
    let interval: number;
    if (isPlaying && !src) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 500);
    }
    return () => window.clearInterval(interval);
  }, [isPlaying, src]);

  // Actualización de progreso real
  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setCurrentTime(audioRef.current.currentTime);
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current && src) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      
      const newTime = (percentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percentage);
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary-dark hover:bg-primary/20 transition-colors shrink-0"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-lg text-text truncate flex items-center gap-2">
            <Music size={14} className="text-primary" />
            {title}
          </h4>
          <p className="text-sm text-text-muted font-sans uppercase tracking-widest truncate">
            {composer}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div 
          ref={progressBarRef}
          onClick={handleSeek}
          className="relative h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer group"
        >
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary group-hover:bg-primary-dark transition-colors"
            style={{ width: `${progress}%` }}
            layout
          />
        </div>
        {src && (
          <div className="flex justify-between text-[10px] text-text-muted font-sans px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        )}
      </div>
      
      {src && (
        <audio 
          ref={audioRef} 
          src={src} 
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => { setIsPlaying(false); setProgress(0); setCurrentTime(0); }}
        />
      )}
    </div>
  );
}
