/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Star, Quote, Code, ShieldCheck, HeartPulse } from 'lucide-react';

const ENDORSEMENTS = [
  {
    author: 'nocturnal_dev',
    role: 'Lead Blockchain Architect',
    quote: "No heart flutters. Pure command line flow for 8 hours straight. Aspartame-free and doesn't trigger insulin drops. 10/10.",
    rating: 5,
    tag: 'CODE LOGS',
    accentColor: 'text-purple-400',
    accentBg: 'bg-purple-500/5',
    accentBorder: 'border-purple-500/10',
  },
  {
    author: 'downhill_racer',
    role: 'Enduro & Downhill MTB Athlete',
    quote: "The Kiwi Concombre variant is dangerously fresh. Keeps response times razor-sharp during technical steep declines without any sluggish heavy feeling.",
    rating: 5,
    tag: 'BIOMETRIC FLOW',
    accentColor: 'text-lime-400',
    accentBg: 'bg-lime-500/5',
    accentBorder: 'border-lime-500/10',
  },
  {
    author: '3d_generative_artist',
    role: 'Nocturnal VFX Director',
    quote: "I drink White Peach during generative render sprints. The taste profile is incredibly clean and subtle—not syrupy or artificial like corporate cans.",
    rating: 5,
    tag: 'CREATIVE FUEL',
    accentColor: 'text-pink-400',
    accentBg: 'bg-rose-500/5',
    accentBorder: 'border-rose-500/10',
  },
];

export default function HomeTestimonials() {
  return (
    <section id="endorsements" className="relative bg-[#080809] py-24 sm:py-32 border-t border-white/[0.03] overflow-hidden">
      
      {/* Background film-grain and radial glow */}
      <div className="absolute inset-0 bg-noise opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-lime-950/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/10 bg-purple-500/5 px-3 py-1 mb-4 font-mono text-[9px] font-bold tracking-[0.25em] text-purple-400 uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>COMMUNITY PROTOCOL DATA</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            COMMITTED TO THE REBELLION
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm mt-3 max-w-xl leading-relaxed">
            Read validated feedback logs from developers, extreme athletes, and digital rule-breakers who swapped chemical-heavy corporate stimulants for our bio-active formulas.
          </p>
        </div>

        {/* Dynamic Bento Endorsement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ENDORSEMENTS.map((review, idx) => {
            return (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group rounded-2xl border border-white/[0.04] bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between text-left relative overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-zinc-900/10`}
              >
                {/* Accent glow mesh */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-30 ${review.accentColor}`} />

                <div>
                  {/* Rating Stars & Tag */}
                  <div className="flex items-center justify-between mb-6 font-mono text-[9px]">
                    <span className={`font-bold tracking-widest px-2.5 py-0.5 rounded-full uppercase border ${review.accentColor} ${review.accentBorder} ${review.accentBg}`}>
                      {review.tag}
                    </span>
                    <div className="flex items-center gap-0.5 text-lime-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Quote text */}
                  <div className="relative">
                    <Quote className="absolute -top-3.5 -left-3 w-8 h-8 text-white/[0.02] pointer-events-none" />
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed relative z-10 italic">
                      "{review.quote}"
                    </p>
                  </div>
                </div>

                {/* Author Info */}
                <div className="mt-8 pt-5 border-t border-white/[0.03] flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-white tracking-wide uppercase font-mono">
                      @{review.author}
                    </span>
                    <span className="block text-[10px] text-zinc-500 font-medium">
                      {review.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-600 font-bold bg-white/[0.02] border border-white/[0.02] px-2 py-0.5 rounded uppercase">
                    <span>VERIFIED LOG</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Global Performance Stamp Banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/[0.03] bg-zinc-950/60 p-6 rounded-2xl text-left">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-lime-500/10 flex items-center justify-center text-lime-400 border border-lime-500/20 shrink-0">
              <HeartPulse className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wide">
                PHYSIOLOGICAL ACCELERATOR AUDIT
              </h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed mt-0.5 max-w-xl">
                All sensory logs are pulled from registered, dual-blind clinic feedback reports inside our Milan, Italy R&D facility. 0% Synthetic sugar additives ensures zero reactive hypoglycemic crashes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400 font-bold tracking-widest bg-zinc-900 border border-white/[0.03] px-3.5 py-2 rounded-xl uppercase shrink-0">
            <ShieldCheck className="w-4 h-4 text-lime-400" />
            <span>100% CLINICAL STANDARD</span>
          </div>
        </div>

      </div>
    </section>
  );
}
