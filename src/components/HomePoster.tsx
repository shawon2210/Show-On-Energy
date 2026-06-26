/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Cpu, Eye, HelpCircle, Leaf, ShieldCheck, Sparkles, Wand2 } from 'lucide-react';

interface HomePosterProps {
  onNavigateToLab: () => void;
}

// Formulation hot nodes on the poster
const POSTER_NODES = [
  {
    id: 'purified-base',
    x: '25%',
    y: '32%',
    title: 'ALPINE WATER EXTRACTION',
    description: 'We source from natural sub-glacial streams in Lombardy, triple-filtered for high electrolyte bio-availability.',
  },
  {
    id: 'organic-essence',
    x: '55%',
    y: '68%',
    title: 'BIO-SYNERGISTIC CAFFEINE',
    description: 'Extracted from raw organic coffee cherries and robust green tea, paired with L-Theanine to eliminate jitteriness.',
  },
  {
    id: 'live-cultures',
    x: '78%',
    y: '42%',
    title: 'BIO-ACTIVE KOMBUCHA FERMENT',
    description: 'Active probiotic cultures that optimize gut health, metabolic uptake, and long-term cellular respiration.',
  },
];

export default function HomePoster({ onNavigateToLab }: HomePosterProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const activeNode = POSTER_NODES.find((node) => node.id === activeNodeId);

  return (
    <section id="brand-poster" className="relative bg-black py-24 sm:py-32 overflow-hidden border-t border-white/[0.03]">
      
      {/* Absolute Grid Backplate */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-purple-900/10 via-transparent to-lime-950/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/10 bg-purple-500/5 px-3 py-1 mb-4 font-mono text-[9px] font-bold tracking-[0.25em] text-purple-400 uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>MOLECULAR VISUAL ART</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            THE ANATOMY OF EXTREME FUEL
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm mt-3 max-w-xl leading-relaxed">
            Hover over the visual hotspots on our laboratory blueprints below to deconstruct our bio-engineered formula design and understand the molecular synergy inside CIAO.
          </p>
        </div>

        {/* WIDESCREEN CINEMATIC POSTER */}
        <div className="relative rounded-3xl border border-white/[0.04] bg-zinc-950/40 p-4 sm:p-6 lg:p-8 overflow-hidden backdrop-blur-sm shadow-[0_30px_100px_rgba(0,0,0,0.85)] flex flex-col items-stretch min-h-[500px] lg:min-h-[600px] justify-between">
          
          {/* Scanline Grid Design Overlay */}
          <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none z-0" />
          <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black via-transparent to-black/30" />

          {/* BACKGROUND POSTER ART WORK (Litchi splat background with stylized overlays) */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-lighten pointer-events-none">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX2slw5ToS-2rb8ZPrv4mkQVnnJNPOZ9wdNSIFoV6L3644lavVtZFWqCiVHBevgJVB53DTbs19aJXBoTfaZ-DgckFL3HG0MVl9S6u4lC5HA4waKttiZm7aecDM9h5svsBjaSy2In3fnAD7Y3hdsrJXEVwc8sGiShmx9JJZWUc7SiCaZkkVx3Yi2SU_pNbqiHjz5rNJ6ULnCbtmPmHK6KRJMndBnU51Aqy8sCBF-j1MYzFsaWIDIcDkdOGRdZsjGwzxr8xTR_IsPeO6" 
              alt="Artistic botanical splatter poster" 
              className="w-full h-full object-cover filter grayscale scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* POSTER HEADER BRANDING */}
          <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-zinc-500 border-b border-white/[0.04] pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-white font-bold tracking-widest uppercase">LAB BLUEPRINT LOG: MAP_004</span>
            </div>
            <div className="flex items-center gap-6">
              <span>SCALE: 1:1 CAN SIZE</span>
              <span>CLASSIFIED DATA SHEET</span>
            </div>
          </div>

          {/* MAIN INTERACTIVE CORE STAGE */}
          <div className="relative z-20 flex-1 my-8 flex items-center justify-center min-h-[260px]">
            
            {/* Poster Centered Big Display Typography */}
            <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
              <h3 className="font-display text-[9vw] lg:text-[7vw] leading-[0.8] font-black text-white/[0.03] uppercase tracking-tighter text-center">
                FORMULA FOR REBELS
              </h3>
            </div>

            {/* Glowing Blueprint concentric wire circles */}
            <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full border border-white/[0.02] pointer-events-none" />
            <div className="absolute w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] rounded-full border border-white/[0.03] border-dashed pointer-events-none" />

            {/* Interactive Pins */}
            {POSTER_NODES.map((node) => {
              const isActive = activeNodeId === node.id;
              return (
                <div 
                  key={node.id}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: node.x, top: node.y }}
                >
                  <button
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    onMouseLeave={() => setActiveNodeId(null)}
                    onClick={() => setActiveNodeId(isActive ? null : node.id)}
                    className="relative flex items-center justify-center h-8 w-8 group"
                    aria-label={`Highlight formula node: ${node.title}`}
                  >
                    {/* Ring ping animate */}
                    <span className="absolute inset-0 rounded-full bg-purple-500/20 border border-purple-500/30 scale-110 group-hover:scale-125 transition-transform duration-300" />
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-purple-400 group-hover:bg-lime-400 transition-colors duration-300 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                  </button>
                </div>
              );
            })}

            {/* Float HUD Box containing dynamic info when pin is hovered */}
            <AnimatePresence>
              {activeNode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 max-w-sm rounded-2xl border border-purple-500/20 bg-black/90 p-5 text-left backdrop-blur-md shadow-2xl z-40"
                >
                  <div className="flex items-center gap-2 text-purple-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>BIO-CHEM METRIC VERIFIED</span>
                  </div>
                  <h4 className="font-display text-xs font-black text-white uppercase tracking-wide">
                    {activeNode.title}
                  </h4>
                  <p className="text-zinc-400 text-[11px] leading-relaxed mt-2.5">
                    {activeNode.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fallback info card helper for touch viewports */}
            {!activeNode && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-zinc-500 uppercase tracking-widest bg-black/60 border border-white/[0.02] px-3.5 py-1.5 rounded-full">
                [ HOVER THE BLUEPRINT HOTSPOTS FOR FORMULA DATA ]
              </div>
            )}
          </div>

          {/* POSTER FOOTER WITH CALL TO ACTIONS */}
          <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-white/[0.04] text-left">
            <div className="max-w-md">
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                BRAND MANDATE
              </span>
              <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                We empower night shifts, creators, and rebels. Change the way you perceive design by building your custom fuel cans in our interactive WebGL designer.
              </p>
            </div>

            <button
              onClick={onNavigateToLab}
              className="group rounded-xl bg-white hover:bg-lime-400 text-black px-6 py-3.5 font-display text-xs font-black tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 shrink-0 self-start md:self-auto"
            >
              <Wand2 className="w-4 h-4" />
              <span>CUSTOMIZE IN 3D STUDIO</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>

        {/* INFINITE RUNNING TICKER MARQUEE BELOW POSTER */}
        <div className="relative w-full mt-10 overflow-hidden py-3 border-y border-white/[0.04] bg-zinc-950/20 select-none">
          <div className="flex whitespace-nowrap gap-8 animate-[marquee_25s_linear_infinite] text-[10px] font-mono text-zinc-600 font-bold tracking-[0.2em] uppercase">
            <span>ZERO SYNTHETIC CHEMISTRY</span>
            <span>★</span>
            <span className="text-white">100% RAW ORGANIC EXTRACTS</span>
            <span>★</span>
            <span>NO SUGAR INJECTION</span>
            <span>★</span>
            <span className="text-lime-400">MILAN LAB FORMULATION</span>
            <span>★</span>
            <span>POWER FOR BUILDERS & RULE-BREAKERS</span>
            <span>★</span>
            <span>ZERO SYNTHETIC CHEMISTRY</span>
            <span>★</span>
            <span className="text-white">100% RAW ORGANIC EXTRACTS</span>
            <span>★</span>
            <span>NO SUGAR INJECTION</span>
          </div>
        </div>

      </div>
    </section>
  );
}
