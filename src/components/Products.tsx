/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Eye, ArrowUpRight, Zap, Info, ShieldAlert, Check } from 'lucide-react';
import { ProductFlavor } from '../types';
import { FLAVORS, SCIENCE_METRICS } from '../data';

interface ProductsProps {
  onAddToCart: (flavor: ProductFlavor) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductFlavor | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleBuyClick = (flavor: ProductFlavor, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(flavor);
    setAddedProductId(flavor.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <section id="products-catalog-section" className="relative min-h-screen bg-black pt-28 pb-24 overflow-hidden">
      {/* Visual background atmosphere */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-zinc-900/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="catalog-header" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/5 px-3.5 py-1.5 mb-4">
              <span className="flex h-1.5 w-1.5 rounded-full bg-pink-500"></span>
              <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-pink-400 uppercase">
                THE LINEUP
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
              HIGH OCTANE FLAVOR FUEL
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-500 tracking-wider">
            FILTER: <span className="text-white font-bold">BATCH_004 CATALOGUE</span> [5 ITEMS ACTIVE]
          </div>
        </div>

        {/* Catalog Grid */}
        <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FLAVORS.map((flavor, index) => {
            const isAdded = addedProductId === flavor.id;
            return (
              <motion.div
                key={flavor.id}
                id={`product-card-${flavor.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setSelectedProduct(flavor)}
                className="group relative rounded-3xl border border-white/[0.04] bg-zinc-950 p-6 flex flex-col justify-between cursor-pointer hover:border-white/[0.12] hover:bg-zinc-900/30 transition-all duration-300"
              >
                {/* Product Glow Card Backdrop */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: flavor.themeHex }}
                />

                {/* Card Top Information */}
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
                    <span>0{index + 1} // {flavor.volume}</span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-lime-400" />
                      {flavor.nutrition.caffeine}
                    </span>
                  </div>

                  {/* Can Floating Showcase */}
                  <div className="relative my-8 h-64 flex items-center justify-center">
                    {/* Shadow underneath */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-3.5 bg-black rounded-full blur-md opacity-70 group-hover:scale-90 transition-transform duration-300" />
                    
                    <img
                      src={flavor.imageUrl}
                      alt={flavor.name}
                      className="h-full w-auto object-contain transition-transform duration-400 group-hover:-translate-y-3 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Label Grouping */}
                  <div className="text-left">
                    <h3 className="font-display text-xl font-extrabold text-white tracking-wide uppercase leading-tight group-hover:text-lime-400 transition-colors">
                      {flavor.name}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-500 tracking-widest mt-0.5">
                      {flavor.subName}
                    </p>
                  </div>
                </div>

                {/* Card Button Actions */}
                <div className="flex items-center gap-3 mt-6 border-t border-white/[0.04] pt-4">
                  <button
                    id={`buy-btn-${flavor.id}`}
                    onClick={(e) => handleBuyClick(flavor, e)}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold tracking-widest transition-all ${
                      isAdded 
                        ? 'bg-lime-400 text-black' 
                        : 'bg-zinc-900 hover:bg-white text-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>ADDED TO LAB</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>

                  <button
                    id={`view-btn-${flavor.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(flavor);
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.05] bg-zinc-950 text-zinc-400 hover:text-white hover:border-white/[0.15] transition-colors"
                    aria-label="View specifications"
                  >
                    <Eye className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Science Section of Unstoppable */}
        <div id="science-section" className="relative rounded-3xl border border-white/[0.04] bg-zinc-950 mt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Background image hotlink: Coffee Beans Splash */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX2slw5ToS-2rb8ZPrv4mkQVnnJNPOZ9wdNSIFoV6L3644lavVtZFWqCiVHBevgJVB53DTbs19aJXBoTfaZ-DgckFL3HG0MVl9S6u4lC5HA4waKttiZm7aecDM9h5svsBjaSy2In3fnAD7Y3hdsrJXEVwc8sGiShmx9JJZWUc7SiCaZkkVx3Yi2SU_pNbqiHjz5rNJ6ULnCbtmPmHK6KRJMndBnU51Aqy8sCBF-j1MYzFsaWIDIcDkdOGRdZsjGwzxr8xTR_IsPeO6"
              alt="Scientific water splash background"
              className="w-full h-full object-cover opacity-15 filter grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-6">
              <span className="font-mono text-[9px] font-bold tracking-widest text-lime-400 uppercase">
                FORMULA R&D LABS
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4 uppercase">
                THE SCIENCE OF UNSTOPPABLE
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
                We design our matrices in tight consultation with molecular biochemists and pro athletes. By using raw organic adaptogens and plant-based amino acids, Ciao delivers sustained high-velocity cognitive focus without the insulin spike, heart flutters, or rapid crash of normal synthetic canned stimulants.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {SCIENCE_METRICS.map((metric) => (
                <div key={metric.label} className="p-5 rounded-2xl bg-black/60 border border-white/[0.03] backdrop-blur-md">
                  <span className="block font-display text-2xl sm:text-3xl font-black text-white">
                    {metric.value}
                  </span>
                  <span className="block font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                    {metric.label}
                  </span>
                  <span className="block text-[10px] text-zinc-400 mt-2">
                    {metric.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Product Detail Modal Backdrop */}
      <AnimatePresence>
        {selectedProduct && (
          <div 
            id="product-modal-container"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl rounded-3xl border border-white/[0.08] bg-zinc-950 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.85)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Visual side pane with flavor color accent */}
                <div className="md:col-span-5 relative p-8 flex items-center justify-center min-h-[300px]" style={{ background: `radial-gradient(circle, ${selectedProduct.themeHex}1A 0%, #09090b 100%)` }}>
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="max-h-[280px] w-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)] animate-[pulse_4s_ease-in-out_infinite]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[10px] font-bold text-white bg-black/60 border border-white/[0.05] px-3 py-1 rounded-full uppercase">
                      {selectedProduct.volume} BATCH
                    </span>
                  </div>
                </div>

                {/* Data specifications pane */}
                <div className="md:col-span-7 p-8 flex flex-col justify-between text-left">
                  <div>
                    {/* Header Spec */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] font-bold tracking-widest text-lime-400 uppercase bg-lime-500/10 border border-lime-500/20 rounded-full px-2.5 py-0.5">
                        {selectedProduct.subName}
                      </span>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase"
                      >
                        [ CLOSE ]
                      </button>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                      {selectedProduct.description}
                    </p>

                    {/* Nutrition Matrix list */}
                    <div className="border-t border-white/[0.05] pt-4">
                      <h4 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                        NUTRITIONAL CELL MATRIX
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/[0.02]">
                          <span className="block text-[9px] font-mono text-zinc-500">CAFFEINE STRIP</span>
                          <span className="block font-display text-sm font-bold text-white mt-0.5">{selectedProduct.nutrition.caffeine}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/[0.02]">
                          <span className="block text-[9px] font-mono text-zinc-500">SUGAR CARB</span>
                          <span className="block font-display text-sm font-bold text-white mt-0.5">{selectedProduct.nutrition.sugar}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/[0.02]">
                          <span className="block text-[9px] font-mono text-zinc-500">ENERGY VAL</span>
                          <span className="block font-display text-sm font-bold text-white mt-0.5">{selectedProduct.nutrition.calories}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/[0.02]">
                          <span className="block text-[9px] font-mono text-zinc-500">TAURINE AMINO</span>
                          <span className="block font-display text-sm font-bold text-white mt-0.5">{selectedProduct.nutrition.taurine}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/[0.02]">
                          <span className="block text-[9px] font-mono text-zinc-500">B-VIT MATRIX</span>
                          <span className="block font-display text-sm font-bold text-white mt-0.5">{selectedProduct.nutrition.bVitamins}</span>
                        </div>
                      </div>
                    </div>

                    {/* Flavor highlights list */}
                    <div className="mt-6">
                      <h4 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                        FLAVOR INTEGRITY HIGHLIGHTS
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.features.map((feat) => (
                          <span key={feat} className="text-[10px] font-mono text-zinc-300 bg-zinc-900 border border-white/[0.03] rounded-md px-2.5 py-1">
                            + {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add action CTA */}
                  <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center gap-4">
                    <button
                      id="modal-direct-buy"
                      onClick={(e) => {
                        handleBuyClick(selectedProduct, e);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white text-black py-4 text-xs font-black tracking-widest hover:bg-lime-400 hover:shadow-lg transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>ORDER THIS FLAVOR PACK</span>
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
