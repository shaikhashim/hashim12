import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSnakeGame } from '@/src/hooks/useSnakeGame';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SnakeBoard() {
  const {
    snake,
    food,
    isGameOver,
    score,
    isPaused,
    setIsPaused,
    resetGame,
    GRID_SIZE
  } = useSnakeGame();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear board
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (subtle)
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw food with glow
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00ff';
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2.5,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#00ffff' : '#39ff14';
      ctx.shadowBlur = isHead ? 10 : 0;
      ctx.shadowColor = '#00ffff';
      
      const padding = 1;
      ctx.fillRect(
        segment.x * cellSize + padding,
        segment.y * cellSize + padding,
        cellSize - padding * 2,
        cellSize - padding * 2
      );
    });
    ctx.shadowBlur = 0;

  }, [snake, food, GRID_SIZE]);

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div className="flex justify-between w-full max-w-[400px] items-center mb-2">
        <div className="text-2xl font-bold font-mono text-neon-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
          SCORE: {score.toString().padStart(4, '0')}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPaused(!isPaused)}
            className="border-neon-purple text-neon-purple hover:bg-neon-purple/20 transition-all shadow-[0_0_10px_rgba(188,19,254,0.3)]"
          >
            {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={resetGame}
            className="border-neon-green text-neon-green hover:bg-neon-green/20 transition-all shadow-[0_0_10px_rgba(57,255,20,0.3)]"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative p-1 rounded-xl bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-pink shadow-[0_0_30px_rgba(0,255,255,0.2)]">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="rounded-lg bg-[#0a0a1a] cursor-none"
        />

        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg backdrop-blur-sm"
            >
              <h2 className="text-5xl font-black text-neon-pink mb-4 drop-shadow-[0_0_15px_rgba(255,0,255,1)]">
                GAME OVER
              </h2>
              <div className="text-xl text-neon-cyan mb-8 font-mono">
                FINAL SCORE: {score}
              </div>
              <Button
                onClick={resetGame}
                size="lg"
                className="bg-neon-cyan text-black hover:bg-white transition-all px-8 py-6 text-lg font-bold shadow-[0_0_20px_rgba(0,255,255,0.5)]"
              >
                PLAY AGAIN
              </Button>
            </motion.div>
          )}

          {isPaused && !isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg backdrop-blur-[2px]"
            >
              <div className="text-3xl font-bold text-neon-cyan animate-pulse">
                PAUSED
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-xs text-muted-foreground font-mono mt-2 tracking-widest uppercase">
        Use Arrow Keys to Move • Space to Pause
      </div>
    </div>
  );
}
