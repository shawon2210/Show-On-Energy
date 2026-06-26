/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Eye, ArrowUpRight, Zap, Flame, ShieldAlert, Check, Sparkles, Orbit } from 'lucide-react';
import { ProductFlavor } from '../types';
import { FLAVORS } from '../data';

interface HomeCatalogProps {
  onAddToCart: (flavor: ProductFlavor) => void;
  onFlavorChange: (flavor: ProductFlavor) => void;
  onNavigateToLab: () => void;
}

// Custom flavor profile data for visual charts/graphs in the premium catalog
const FLAVOR_PROFILES: Record<string, { sweet: number; acid: number; fizzy: number; focus: number }> = {
  'double-litchi': { sweet: 85, acid: 40, fizzy: 70, focus: 90 },
  'kiwi-concombre': { sweet: 35, acid: 75, fizzy: 85, focus: 95 },
  'coco-citron-vert': { sweet: 50, acid: 80, fizzy: 65, focus: 90 },
  'peche-blanche': { sweet: 80, acid: 45, fizzy: 75, focus: 85 },
  'pomme-rhubarbe': { sweet: 55, acid: 85, fizzy: 80, focus: 92 },
};

export default function HomeCatalog({ onAddToCart, onFlavorChange, onNavigateToLab }: HomeCatalogProps) {
  const [activeCatalogId, setActiveCatalogId] = useState<string>(FLAVORS[0].id);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const selectedFlavor = FLAVORS.find((f) => f.id === activeCatalogId) || FLAVORS[0];
  const activeProfile = FLAVOR_PROFILES[selectedFlavor.id] || { sweet: 50, acid: 50, fizzy: 50, focus: 50 };

  const handleBuyClick = (flavor: ProductFlavor, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(flavor);
    setAddedProductId(flavor.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  const handleLoadInLab = (flavor: ProductFlavor) => {
    onFlavorChange(flavor);
    onNavigateToLab();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="home-catalog" className="relative bg-[#080809] py-24 sm:py-32 border-t border-white/[0.03] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-[-10%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, ${selectedFlavor.themeHex} 0%, transparent 80%)` }}
      />
      <div className="absolute bottom-1/4 left-[-10%] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-10 bg-lime-500" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/10 bg-lime-500/5 px-3 py-1 mb-4 font-mono text-[9px] font-bold tracking-[0.25em] text-lime-400 uppercase">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>THE REBEL BATCH LINEUP</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
              CHOOSE YOUR CHEMICAL ACCELERANT
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-3 max-w-lg leading-relaxed">
              Explore our highly calibrated formula variants, each crafted to deliver extreme cognitive focus, sustained physical power, and authentic organic botanical profiles.
            </p>
          </div>
          
          {/* Quick Stats Ticker */}
          <div className="flex items-center gap-6 font-mono text-[10px] text-zinc-500 border border-white/[0.04] bg-black/40 rounded-2xl px-5 py-3 self-start md:self-auto">
            <div className="text-left">
              <span className="text-zinc-600 block">BATCH LOG</span>
              <span className="text-white font-bold">MIL-B-004</span>
            </div>
            <div className="w-px h-6 bg-white/[0.06]" />
            <div className="text-left">
              <span className="text-zinc-600 block">TOTAL ACTIVE</span>
              <span className="text-lime-400 font-bold">5 RECIPIES</span>
            </div>
          </div>
        </div>

        {/* Dynamic Studio Layout: Selector + Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-10">
          
          {/* LEFT SELECTOR: Vertical interactive list (4 Cols on lg) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 order-2 lg:order-1">
            <div className="flex flex-col gap-2.5">
              {FLAVORS.map((flavor, idx) => {
                const isActive = flavor.id === activeCatalogId;
                return (
                  <button
                    key={flavor.id}
                    onClick={() => setActiveCatalogId(flavor.id)}
                    className={`group relative text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between overflow-hidden ${
                      isActive 
                        ? 'bg-zinc-900/60 border-white/[0.15] shadow-lg' 
                        : 'bg-black/35 border-white/[0.03] hover:bg-zinc-900/30 hover:border-white/[0.08]'
                    }`}
                  >
                    {/* Active dynamic visual glow border accent */}
                    {isActive && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-[4px] rounded-r-full"
                        style={{ backgroundColor: flavor.themeHex }}
                      />
                    )}

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-zinc-600 font-bold group-hover:text-zinc-400 transition-colors">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className={`block font-display text-sm font-extrabold tracking-wide uppercase transition-colors ${
                          isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                        }`}>
                          {flavor.name}
                        </span>
                        <span className="block font-mono text-[9px] text-zinc-600 tracking-wider">
                          {flavor.subName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-zinc-500 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/[0.03]">
                        {flavor.volume}
                      </span>
                      <ChevronRightArrow isActive={isActive} activeColor={flavor.themeHex} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Micro Call to Action Banner inside selector */}
            <div className="rounded-2xl border border-white/[0.03] bg-zinc-950 p-5 text-left flex flex-col justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="h-9 w-9 rounded-xl bg-lime-500/10 flex items-center justify-center text-lime-400 border border-lime-500/20 shrink-0">
                  <Orbit className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-white tracking-wide uppercase">
                    3D STUDIO DESIGN PLATFORM
                  </h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed mt-0.5">
                    Customize your own formulas, change can metals (copper, gold, dark), adjust light gradients and export direct HTML embeds instantly.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleLoadInLab(selectedFlavor)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-white text-white hover:text-black py-2.5 font-mono text-[10px] font-bold tracking-widest uppercase transition-all border border-white/[0.04]"
              >
                <span>LAUNCH FORMULA LAB</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT SHOWCASE PANE: Detailed layout with image, profile indicators (8 Cols on lg) */}
          <div className="lg:col-span-8 rounded-3xl border border-white/[0.04] bg-zinc-950 overflow-hidden relative flex flex-col order-1 lg:order-2">
            
            {/* Ambient radial blur backplate */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, transparent 70%)' }} />
            
            <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center justify-between text-left h-full">
              
              {/* Product Floating Display Image */}
              <div className="relative w-full md:w-1/2 flex items-center justify-center h-72 sm:h-80 md:h-96 shrink-0">
                
                {/* Floating floor reflection */}
                <div 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-5 rounded-full blur-xl opacity-80"
                  style={{ background: `radial-gradient(circle, ${selectedFlavor.themeHex}4A 0%, transparent 70%)` }}
                />

                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedFlavor.id}
                    initial={{ opacity: 0, scale: 0.85, y: 15, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -15, rotate: 3 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 180 }}
                    src={selectedFlavor.imageUrl}
                    alt={selectedFlavor.name}
                    className="max-h-[320px] md:max-h-[340px] w-auto object-contain z-10 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Technical Coordinates stamp overlay */}
                <div className="absolute top-2 left-2 font-mono text-[8px] text-zinc-600 border border-white/[0.02] bg-black/40 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  SPEC_04 // COLOR: {selectedFlavor.colorName}
                </div>
              </div>

              {/* Specs and interactive chemical profile */}
              <div className="w-full flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className="h-2 w-2 rounded-full animate-ping"
                      style={{ backgroundColor: selectedFlavor.themeHex }}
                    />
                    <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                      CHEMICAL MATRIX DETAILS
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none mb-4">
                    {selectedFlavor.name}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-md">
                    {selectedFlavor.description}
                  </p>

                  {/* Flavor Taste sliders */}
                  <div className="space-y-3.5 mb-6 border-t border-white/[0.04] pt-5">
                    <h4 className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      BIO-ACTIVE PERFORMANCE SCALE
                    </h4>
                    
                    {/* Sweetness */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-zinc-400">Sweetness profile</span>
                        <span className="text-zinc-500">{activeProfile.sweet}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${activeProfile.sweet}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedFlavor.themeHex }}
                        />
                      </div>
                    </div>

                    {/* Acidic Bite */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-zinc-400">Citric / Acidic bite</span>
                        <span className="text-zinc-500">{activeProfile.acid}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${activeProfile.acid}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedFlavor.themeHex }}
                        />
                      </div>
                    </div>

                    {/* Fizzy Bubbles */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-zinc-400">Fizz Carbonation</span>
                        <span className="text-zinc-500">{activeProfile.fizzy}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${activeProfile.fizzy}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedFlavor.themeHex }}
                        />
                      </div>
                    </div>

                    {/* Focus Index */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-zinc-400">Focus acceleration</span>
                        <span className="text-zinc-500">{activeProfile.focus}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${activeProfile.focus}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedFlavor.themeHex }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Double action layout */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04] mt-auto">
                  <button
                    onClick={(e) => handleBuyClick(selectedFlavor, e)}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold tracking-widest transition-all ${
                      addedProductId === selectedFlavor.id 
                        ? 'bg-lime-400 text-black font-extrabold' 
                        : 'bg-white hover:bg-lime-400 text-black hover:shadow-[0_0_20px_rgba(163,230,53,0.3)]'
                    }`}
                  >
                    {addedProductId === selectedFlavor.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>SPECIMEN ADDED</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleLoadInLab(selectedFlavor)}
                    className="flex h-12 px-5 items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-black text-xs text-zinc-300 font-mono hover:text-white hover:border-white/[0.2] transition-colors"
                    aria-label="View 3D custom specifications"
                  >
                    <Orbit className="w-4 h-4 text-zinc-400" />
                    <span className="hidden sm:inline">CUSTOMIZE IN 3D</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// Custom indicator element
function ChevronRightArrow({ isActive, activeColor }: { isActive: boolean; activeColor: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <span 
        className={`w-4 h-4 flex items-center justify-center rounded-full transition-transform duration-300 ${
          isActive ? 'rotate-90' : 'group-hover:translate-x-0.5'
        }`}
      >
        <svg className="w-2.5 h-2.5 stroke-current text-zinc-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" strokeWidth="3">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
