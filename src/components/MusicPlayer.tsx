import { motion } from 'motion/react';
import { useMusicPlayer } from '@/src/hooks/useMusicPlayer';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';

export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    setVolume,
    togglePlay,
    skipNext,
    skipPrev,
    seek,
    tracks
  } = useMusicPlayer();

  return (
    <Card className="w-full max-w-[400px] bg-black/40 border-neon-purple shadow-[0_0_20px_rgba(188,19,254,0.1)] backdrop-blur-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-2 border-neon-cyan p-1 shadow-[0_0_10px_rgba(0,255,255,0.3)]"
          >
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-neon-cyan truncate drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate uppercase tracking-widest">
              {currentTrack.artist}
            </p>
          </div>
          <motion.div
            animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Music className="w-5 h-5 text-neon-pink" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <Slider
              value={[progress]}
              onValueChange={(vals) => seek(vals[0])}
              max={100}
              step={0.1}
              className="[&>.SliderTrack]:bg-neon-purple/20 [&>.SliderRange]:bg-neon-cyan"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono uppercase">
              <span>Progress</span>
              <span>{Math.floor(progress)}%</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={skipPrev}
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              <SkipBack className="w-6 h-6 fill-current" />
            </Button>
            <Button
              size="icon"
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-neon-purple text-white hover:bg-neon-purple/80 hover:scale-105 transition-all shadow-[0_0_15px_rgba(188,19,254,0.5)]"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={skipNext}
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              <SkipForward className="w-6 h-6 fill-current" />
            </Button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[volume * 100]}
              onValueChange={(vals) => setVolume(vals[0] / 100)}
              max={100}
              className="[&>.SliderRange]:bg-neon-purple"
            />
          </div>
        </div>

        <div className="mt-6 border-t border-neon-purple/20 pt-4">
          <div className="text-[10px] text-muted-foreground font-mono uppercase mb-2">Playlist</div>
          <div className="space-y-2">
            {tracks.map((track, idx) => (
              <div
                key={track.id}
                className={`flex items-center justify-between text-xs p-2 rounded transition-colors cursor-pointer ${
                  currentTrack.id === track.id ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-muted-foreground hover:bg-neutral-800'
                }`}
              >
                <span className="truncate">{track.title}</span>
                {currentTrack.id === track.id && isPlaying && (
                    <div className="flex gap-1 h-3 items-end">
                        <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-neon-cyan" />
                        <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-neon-cyan" />
                        <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 bg-neon-cyan" />
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
