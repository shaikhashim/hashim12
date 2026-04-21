/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SnakeBoard } from './components/SnakeBoard';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020205] text-white overflow-hidden relative flex flex-col items-center justify-center p-4">
      {/* Immersive background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-cyan/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] rounded-full bg-neon-pink/10 blur-[80px]" />
        
        {/* Animated grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12"
      >
        {/* Left Side - Info/Brand */}
        <div className="flex flex-col gap-6 lg:w-1/4 order-2 lg:order-1">
          <div className="space-y-2">
            <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink">
              NEON<br />SNAKE<br />BEATS
            </h1>
            <div className="h-1 w-20 bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
          </div>
          
          <p className="text-sm text-neutral-500 font-mono leading-relaxed">
            SYSTEM_v2.0 ACTIVE // 
            SYNCING AUDIO TO MOTOR REFLEXES...
            STAY IN FLOW.
          </p>

          <MusicPlayer />
        </div>

        {/* Center - Snake Game */}
        <div className="flex-1 order-1 lg:order-2">
          <SnakeBoard />
        </div>

        {/* Right Side - Visuals/Stats */}
        <div className="hidden xl:flex flex-col gap-8 lg:w-1/4 order-3">
          <div className="p-4 border border-neon-cyan/30 rounded-lg bg-black/40 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-widest text-neon-cyan mb-2">Neural Visualizer</div>
            <div className="flex items-end gap-1 h-24">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${20 + Math.random() * 60}%`, `${30 + Math.random() * 70}%`, `${20 + Math.random() * 60}%`] }}
                  transition={{ repeat: Infinity, duration: 1 + Math.random(), ease: 'easeInOut' }}
                  className="flex-1 bg-neon-cyan/50"
                  style={{ opacity: 0.3 + (i / 12) * 0.7 }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-4 text-xs font-mono">
                <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_5px_rgba(57,255,20,1)]" />
                <span className="text-neutral-400">ARCADE ENGINE: ONLINE</span>
             </div>
             <div className="flex items-center gap-4 text-xs font-mono">
                <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_5px_rgba(0,255,255,1)]" />
                <span className="text-neutral-400">AUDIO BUFFER: OPTIMIZED</span>
             </div>
             <div className="flex items-center gap-4 text-xs font-mono">
                <div className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_5px_rgba(255,0,255,1)]" />
                <span className="text-neutral-400">NEURAL LINK: ESTABLISHED</span>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Footer Decals */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none opacity-20">
        <div className="text-[10px] font-mono whitespace-pre">
          [ MODEL: GEN-3_PRV ]{"\n"}
          [ STATUS: EXPERIMENTAL ]
        </div>
        <div className="text-[10px] font-mono text-right">
          (C) 2026 NEURAL INTERFACE PROTOTYPE{"\n"}
          AUTHORIZED ACCESS ONLY
        </div>
      </div>
    </div>
  );
}

