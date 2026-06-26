/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, HeartPulse, Award, Users, Info, ExternalLink } from 'lucide-react';
import { INGREDIENTS_DNA } from '../data';

export default function OurStory() {
  const [hoveredDna, setHoveredDna] = useState<number | null>(null);

  return (
    <section id="story-section" className="relative min-h-screen bg-black pt-28 pb-20 overflow-hidden">
      {/* Background graphic accents */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-lime-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Core Header section */}
        <div id="story-header" className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/20 bg-lime-500/5 px-3.5 py-1.5 mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-lime-400"></span>
            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-lime-400 uppercase">
              THE MANIFESTO
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 uppercase">
            WE ARE THE REBELLION
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            We didn’t create CIAO to fit onto pretty supermarket shelves. We built it because we were sick of synthetic mystery powders, chemical crashes, and corporate labels that require a chemistry degree to decipher. This is clean, hard-hitting fuel for nocturnal creators, modern athletes, and digital rule-breakers.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div id="story-bento-grid" className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: RAW ORIGIN (6 Columns on md, High impact) */}
          <div 
            id="bento-raw-origin"
            className="md:col-span-7 rounded-3xl border border-white/[0.04] bg-zinc-950 overflow-hidden min-h-[340px] flex flex-col justify-between relative group hover:border-purple-500/20 transition-all duration-300"
          >
            {/* Background image hotlink: Litchi Backdrop */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZoipZjJfjD1hJAkhvDoCfQp1G1UgBjY_DuYv0oCByZJDwF_bgf4pRAj3pXRM7Etui9z_XkrlK-Uz1GSfMgZolkE7JlG8W6Qfap3GjfkJOoyUTfeYW-p-qD7Pr9EdUuB52HdAeXJu3Z-Rjs46Y5YquoqBk3CiZRzKDz-bMllcA6e6CpR-1GvAPkOuj1E8TRJsDwf4NzxrKZISmMllK8haD0PuP2QgNbFhpPCgFk2AHXTUirNmiAAjrIrpg6JpYA-3gaYxfE2HGxxx4"
                alt="Fresh organic Litchi fruit background"
                className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <span className="font-mono text-[9px] font-bold tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 w-fit">
                NATURALNESS
              </span>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mt-12 mb-3">
                  RAW ORIGIN
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-lg">
                  Every drop starts in remote litchi orchards. Cold-pressed to retain its essential antioxidants and natural sweetness, creating a clean fruit base that works in perfect synergy with metabolic performance.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: ZERO SYNTHETICS (5 Columns on md) */}
          <div 
            id="bento-zero-synth"
            className="md:col-span-5 rounded-3xl border border-white/[0.04] bg-zinc-950 p-8 flex flex-col justify-between hover:border-lime-500/20 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-lime-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold tracking-widest text-lime-400 bg-lime-500/10 border border-lime-500/20 rounded-full px-3 py-1">
                INTEGRITY
              </span>
              <HeartPulse className="w-5 h-5 text-zinc-500" />
            </div>

            <div className="my-10">
              <h3 className="font-display text-2xl font-black text-white tracking-tight mb-3">
                ZERO SYNTHETICS
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                No chemical binders. No fake coloring agents. No synthetic artificial sweeteners like aspartame that mess with your body's sugar processing. It’s power directly from clean botanical compounds.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 border-t border-white/[0.04] pt-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-lime-400"></span>
                <span>VITAMIN-B COMPLEX</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-lime-400"></span>
                <span>L-THEANINE MATRIX</span>
              </div>
            </div>
          </div>

          {/* Card 3: TRANSPARENCY WITHOUT LIMITS (5 Columns on md, Vertical styling) */}
          <div 
            id="bento-transparency"
            className="md:col-span-5 rounded-3xl border border-white/[0.04] bg-zinc-950 p-8 flex flex-col justify-between hover:border-pink-500/20 transition-all duration-300 relative group overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-full px-3 py-1">
                  OPEN SOURCE
                </span>
                <ShieldCheck className="w-5 h-5 text-zinc-500" />
              </div>
              <h3 className="font-display text-2xl font-black text-white tracking-tight">
                TRANSPARENCY WITHOUT LIMITS
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                We believe you have the absolute right to know what fuel you are feeding your engine. Our open label approach list every bio-active weight ratio transparently. No secret recipes or proprietary tricks.
              </p>

              {/* Minimal feature list */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-white/[0.02]">
                  <span className="text-[10px] font-mono font-bold text-rose-400">01 /</span>
                  <span className="text-xs text-zinc-300 font-semibold">OPEN SOURCE BATCH LOGS</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-white/[0.02]">
                  <span className="text-[10px] font-mono font-bold text-rose-400">02 /</span>
                  <span className="text-xs text-zinc-300 font-semibold">CERTIFIED ALPINE PURITY</span>
                </div>
              </div>
            </div>

            {/* In-card product preview can */}
            <div className="relative mt-8 h-40 flex items-center justify-center overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeQFkuH44si6cePQpN4a9mhnxPb0hlDqIjQjNAoe-oSWuHBz6yPzQJ8MQM4VKk1e3LkOco1YtwF6KLQOjfYaGekh5uf5Fk6iEP3BsfpCja2zA20TT6iFCcTMTeKzfmPdhTiae1FDexMZeK7-9zY5C37Y_9rEuGEXEHH6_1IrXQbIdGd569bxoYce5aJP7evFhgG9ND7LDtM99hViIHe_kdbA3725zJrgaXURvACiVHg1PvKrtK68FvB2TKDWqFl4nVTTk88VuGl6Zk"
                alt="Matte black transparency can"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Card 4: THE MODERN EDGE & INTERACTIVE DNA (7 Columns on md) */}
          <div 
            id="bento-modern-edge"
            className="md:col-span-7 rounded-3xl border border-white/[0.04] bg-zinc-950 overflow-hidden flex flex-col justify-between hover:border-white/[0.08] transition-all duration-300"
          >
            {/* Top Group Image Banner */}
            <div className="h-44 relative overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYhYaJqqSchJGXSnvTO75BYT_-j9oTjA8OM3oSxlor9QqhzDuZfKxVuCXdVgTOVL33bP2khZweOAuqg2YNt19lCpTvlXEf5LJ5EF2Daic5t0_ZRE8l2zdBFm1KFRPKogZPPrn329AhIBRrpttn5Unoy9xBnWxb5ZE1oVl60sjr6D-0pV-L2dOJG8spPAXJYqubihBTZurTGq3gWoHtc5UZvD5byRVAkCWIGtqYekknawvVvI8Cj_-GmzFSuEQFLxtEmBtXMpMynyXv"
                alt="Group of rebellious creators"
                className="w-full h-full object-cover object-center filter grayscale opacity-60 hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="font-mono text-[9px] font-bold tracking-widest text-white bg-black/60 backdrop-blur-sm border border-white/[0.06] rounded-full px-3 py-1">
                  THE CULTURE
                </span>
              </div>
            </div>

            {/* Interactive Ingredients DNA Selector */}
            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white tracking-wide">
                    THE BIO-FORMULA DNA
                  </h3>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    Hover segments to reveal cellular composition weight ratios.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
                  <Award className="w-3.5 h-3.5 text-lime-400" />
                  <span>EFSA COMPLIANT</span>
                </div>
              </div>

              {/* Stacked Percentage Chart */}
              <div className="w-full bg-zinc-900 rounded-xl p-4 border border-white/[0.02]">
                <div className="flex h-6 rounded-md overflow-hidden bg-zinc-950 relative">
                  {INGREDIENTS_DNA.map((item, index) => {
                    // Match unique color maps
                    const bgColors = [
                      'bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.3)]',
                      'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]',
                      'bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.3)]',
                      'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                    ];
                    return (
                      <button
                        key={item.name}
                        onMouseEnter={() => setHoveredDna(index)}
                        onMouseLeave={() => setHoveredDna(null)}
                        className={`h-full ${bgColors[index]} transition-all duration-200 relative cursor-pointer`}
                        style={{ 
                          width: `${item.percent}%`,
                          opacity: hoveredDna !== null && hoveredDna !== index ? 0.4 : 1
                        }}
                        aria-label={`Ingredient: ${item.name}`}
                      />
                    );
                  })}
                </div>

                {/* Live Dynamic description display */}
                <div className="mt-4 min-h-[48px] flex items-center justify-between border-t border-white/[0.04] pt-3">
                  {hoveredDna !== null ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full flex items-center justify-between"
                    >
                      <div>
                        <span className="font-display font-black text-sm text-white">
                          {INGREDIENTS_DNA[hoveredDna].name}
                        </span>
                        <span className="block text-[11px] text-zinc-400">
                          {INGREDIENTS_DNA[hoveredDna].description}
                        </span>
                      </div>
                      <div className="font-mono text-lg font-black text-lime-400">
                        {INGREDIENTS_DNA[hoveredDna].percent}%
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-2 text-zinc-500 text-xs italic">
                      <Info className="w-4 h-4 text-zinc-600 shrink-0" />
                      <span>Hover over the bar blocks above to inspect molecular volume...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
