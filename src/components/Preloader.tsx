/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ShieldAlert, Cpu } from 'lucide-react';

interface PreloaderProps {
  key?: string;
  onComplete: () => void;
}

const PRELOAD_STEPS = [
  'INITIALIZING REBEL CELL...',
  'PURGING SYNTHETIC IMPURITIES...',
  'BOOSTING LITCHI INFUSED MATRIX...',
  'CALIBRATING NATURAL CAFFEINE...',
  'MAX OCTANE UNLOCKED. GAUGE FULL.'
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const onCompleteRef = React.useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Increment progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onCompleteRef.current();
          }, 600);
          return 100;
        }
        // Random speedups
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Dynamic status step index based on progress percentage
    const stepRatio = 100 / PRELOAD_STEPS.length;
    const index = Math.min(Math.floor(progress / stepRatio), PRELOAD_STEPS.length - 1);
    setStatusIndex(index);
  }, [progress]);

  return (
    <motion.div
      id="ciao-preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none"
    >
      {/* Aesthetic cyber grid backdrop */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated logo/ring */}
        <div className="relative w-36 h-36 mb-12 flex items-center justify-center">
          {/* Pulsing neon purple outer circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          />

          {/* Glitchy lime inner circle */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-lime-400/40 border-t-transparent border-b-transparent shadow-[0_0_15px_rgba(163,230,53,0.1)]"
          />

          {/* Central Logo Lettering / Icon */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center justify-center"
          >
            <Zap className="w-10 h-10 text-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]" />
            <span className="text-xl font-black font-display tracking-widest text-white mt-1">CIAO</span>
          </motion.div>
        </div>

        {/* Live battery style percentage */}
        <div className="mb-4">
          <motion.h1
            className="text-6xl font-black font-display tracking-tight text-white flex items-baseline justify-center"
            layoutId="preload-percentage"
          >
            {progress}
            <span className="text-2xl font-normal text-zinc-500 ml-1">%</span>
          </motion.h1>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/80 mb-6 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-lime-400 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Dynamic loading status readout */}
        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-medium"
            >
              {PRELOAD_STEPS[statusIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Tactical status logs for added tech-honesty (humble footer inside preloader) */}
        <div className="mt-16 flex items-center gap-6 border-t border-zinc-900 pt-4 w-64 justify-center">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
            <Cpu className="w-3.5 h-3.5" />
            <span>CELL-004</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
            <ShieldAlert className="w-3.5 h-3.5 text-lime-400/80" />
            <span>0% SYNTH</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
