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
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
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

      <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-primary"
          style={{ width: `${progress}%` }}
          layout
        />
      </div>
      
      {src && (
        <audio 
          ref={audioRef} 
          src={src} 
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => { setIsPlaying(false); setProgress(0); }}
        />
      )}
    </div>
  );
}
