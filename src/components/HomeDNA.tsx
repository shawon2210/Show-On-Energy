/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Check, ShieldCheck, Dumbbell, Code, Brain, Sunset, RefreshCw } from 'lucide-react';
import { ProductFlavor } from '../types';
import { FLAVORS, INGREDIENTS_DNA } from '../data';

interface HomeDNAProps {
  onAddToCart: (flavor: ProductFlavor) => void;
}

// Custom diagnostic workflows matching flavors to real use cases
const WORKFLOWS = [
  {
    id: 'coding',
    label: 'Nocturnal Code Sprint',
    icon: Code,
    matchedFlavorId: 'double-litchi',
    matchReason: 'Litchi combined with 150mg natural caffeine and robust B-vitamins unlocks high-velocity command line flow without the insulin spikes.',
    tag: 'COGNITIVE ACCELERANT',
  },
  {
    id: 'athletics',
    label: 'Extreme Physical Drill',
    icon: Dumbbell,
    matchedFlavorId: 'kiwi-concombre',
    matchReason: '160mg Green Tea extract combined with ultra-hydrating concombre juice and extra amino taurine primes muscle reactivity.',
    tag: 'PHYSICAL PERFORMANCE',
  },
  {
    id: 'relaxing',
    label: 'Tropical Reset & Chill',
    icon: Sunset,
    matchedFlavorId: 'coco-citron-vert',
    matchReason: 'Authentic coconut juice electrolytes blended with fresh lime zest creates the ultimate desalter for social chill.',
    tag: 'HYDRATION & CALM',
  },
  {
    id: 'brain-lock',
    label: 'Midday Fog Override',
    icon: Brain,
    matchedFlavorId: 'peche-blanche',
    matchReason: 'Suave white peach juice ferment provides clean sensory renewal to lift creative blockages and rekey mental focus.',
    tag: 'SENSORY FOCUS',
  },
];

export default function HomeDNA({ onAddToCart }: HomeDNAProps) {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(WORKFLOWS[0].id);
  const [addedMatchId, setAddedMatchId] = useState<string | null>(null);

  const activeWorkflow = WORKFLOWS.find((w) => w.id === selectedWorkflowId) || WORKFLOWS[0];
  const matchedFlavor = FLAVORS.find((f) => f.id === activeWorkflow.matchedFlavorId) || FLAVORS[0];

  const handleBuyMatch = (flavor: ProductFlavor) => {
    onAddToCart(flavor);
    setAddedMatchId(flavor.id);
    setTimeout(() => {
      setAddedMatchId(null);
    }, 1500);
  };

  return (
    <section id="formula-dna" className="relative bg-[#050505] py-24 sm:py-32 border-t border-white/[0.03] overflow-hidden">
      {/* Background radial spotlights */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/10 bg-lime-500/5 px-3 py-1 mb-4 font-mono text-[9px] font-bold tracking-[0.25em] text-lime-400 uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>BIO-ACTIVE SYNERGY CELL</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            DIAGNOSE YOUR ENERGY STATUS
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm mt-3 max-w-xl leading-relaxed">
            Every task requires different chemistry. Match your current mental or physical workflow using our reactive diagnostics engine to unlock the perfect specimen formula.
          </p>
        </div>

        {/* TWO COLUMN GRID: Diagnostics Widget (Left) + Ingredients DNA (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT PANEL: The Interactive Matchmaker Quiz (7 Columns) */}
          <div className="lg:col-span-7 rounded-3xl border border-white/[0.04] bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />

            {/* Selector Grid */}
            <div>
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-4">
                [ DIAGNOSTIC STEP 01 // SELECT WORKFLOW STATE ]
              </span>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                {WORKFLOWS.map((workflow) => {
                  const isSelected = workflow.id === selectedWorkflowId;
                  const IconComponent = workflow.icon;
                  return (
                    <button
                      key={workflow.id}
                      onClick={() => setSelectedWorkflowId(workflow.id)}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-6 transition-all duration-300 relative ${
                        isSelected 
                          ? 'bg-zinc-900 border-white/[0.12] shadow-lg' 
                          : 'bg-black/35 border-white/[0.03] hover:bg-zinc-900/30 hover:border-white/[0.08]'
                      }`}
                    >
                      <IconComponent 
                        className={`w-5 h-5 transition-colors ${
                          isSelected ? 'text-lime-400' : 'text-zinc-600'
                        }`} 
                      />
                      <span className={`font-display text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors ${
                        isSelected ? 'text-white' : 'text-zinc-500'
                      }`}>
                        {workflow.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Matched Formula Presentation */}
              <div className="border-t border-white/[0.04] pt-6 mt-6">
                <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-4">
                  [ RESULT // CALIBRATED BATCH FORMULA MATCHED ]
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedWorkflowId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row gap-6 items-center bg-black/40 border border-white/[0.03] p-5 rounded-2xl"
                  >
                    {/* Can image small */}
                    <img
                      src={matchedFlavor.imageUrl}
                      alt={matchedFlavor.name}
                      loading="lazy"
                      className="h-32 w-auto object-contain filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)] shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-mono text-[8px] font-bold text-black bg-lime-400 px-2 py-0.5 rounded-full uppercase">
                          {activeWorkflow.tag}
                        </span>
                        <span className="font-mono text-[8px] text-zinc-500 uppercase">
                          MATCH VALUE: 98.7%
                        </span>
                      </div>

                      <h4 className="font-display text-lg font-black text-white uppercase tracking-tight">
                        {matchedFlavor.name}
                      </h4>
                      <p className="font-mono text-[9px] text-zinc-600 tracking-wider mt-0.5">
                        {matchedFlavor.subName}
                      </p>

                      <p className="text-zinc-400 text-xs leading-relaxed mt-3">
                        {activeWorkflow.matchReason}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Diagnostic Action Button */}
            <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between gap-4 flex-col sm:flex-row">
              <div className="text-left">
                <span className="font-mono text-[9px] text-zinc-600 block">NUTRITION FACT HIGHLIGHT</span>
                <span className="font-mono text-[10px] text-zinc-400 font-semibold uppercase mt-0.5 block">
                  {matchedFlavor.nutrition.caffeine} CAFFEINE // {matchedFlavor.nutrition.calories} ENERGY CELL
                </span>
              </div>

              <button
                onClick={() => handleBuyMatch(matchedFlavor)}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all ${
                  addedMatchId === matchedFlavor.id
                    ? 'bg-lime-400 text-black font-black'
                    : 'bg-white hover:bg-lime-400 text-black'
                }`}
              >
                {addedMatchId === matchedFlavor.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>MATCH DISPATCHED</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>ORDER MATCH PACK</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: Pure Ingredients DNA Breakdown (5 Columns) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/[0.04] bg-zinc-950 p-8 flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-36 h-36 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-3">
                [ FORMULA COMPOSITION // DNA INDEX ]
              </span>
              <h3 className="font-display text-2xl font-black text-white tracking-tight mb-4">
                OPEN SOURCE CHEMICAL DESIGN
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8">
                No corporate proprietary lies. We break down the precise chemical weight volume of every active botanical fluid we blend inside our cans. Fully transparent, fully audited.
              </p>

              {/* Composition lists */}
              <div className="space-y-5">
                {INGREDIENTS_DNA.map((dna, idx) => {
                  return (
                    <div key={dna.name} className="relative">
                      <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-600 font-bold">0{idx + 1}/</span>
                          <span className="text-zinc-300 font-bold uppercase">{dna.name}</span>
                        </div>
                        <span className="text-lime-400 font-black">{dna.percent}%</span>
                      </div>

                      {/* Bar indicator */}
                      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${dna.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: idx * 0.1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-lime-600 to-lime-400"
                        />
                      </div>

                      <span className="block text-[10px] text-zinc-500 mt-1 leading-normal font-mono">
                        {dna.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botanical Quality Standard Stamp */}
            <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center gap-3 font-mono text-[9px] text-zinc-600">
              <span className="h-[18px] w-[18px] rounded-full bg-lime-500/10 text-lime-400 flex items-center justify-center font-bold text-[8px] border border-lime-500/20">
                A
              </span>
              <span>CERTIFIED BIO-VEGAN & NON-GMO RECIPIES // BATCH_004 STANDARD</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
