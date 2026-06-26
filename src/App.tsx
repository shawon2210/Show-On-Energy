/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, ShieldCheck, Instagram, Twitter, MessageSquareCode, Sparkles } from 'lucide-react';
import { PageId, ProductFlavor } from './types';
import { FLAVORS } from './data';

// Critical path components (eagerly loaded)
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StoreModal from './components/StoreModal';


// Lazy-loaded route components
const OurStory = React.lazy(() => import('./components/OurStory'));
const Products = React.lazy(() => import('./components/Products'));
const Contact = React.lazy(() => import('./components/Contact'));
const Can3DLab = React.lazy(() => import('./components/Can3DLab'));
const HomeCatalog = React.lazy(() => import('./components/HomeCatalog'));
const HomePoster = React.lazy(() => import('./components/HomePoster'));
const HomeDNA = React.lazy(() => import('./components/HomeDNA'));
const HomeTestimonials = React.lazy(() => import('./components/HomeTestimonials'));

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-lime-400 border-t-transparent animate-spin" />
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  const [isPreloading, setIsPreloading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [currentFlavor, setCurrentFlavor] = useState<ProductFlavor>(FLAVORS[0]);
  
  // Shopping Cart state
  const [cartItems, setCartItems] = useState<{ [id: string]: number }>({});
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; flavorName: string; themeHex: string; volume: string }>>([]);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleAddToCart = (flavor: ProductFlavor) => {
    setCartItems((prev) => ({
      ...prev,
      [flavor.id]: (prev[flavor.id] || 0) + 1
    }));

    // Trigger elegant layout toast notification
    const newToast = {
      id: Math.random().toString(36).substring(2, 9),
      flavorName: flavor.name,
      themeHex: flavor.themeHex,
      volume: flavor.volume
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3000);
  };

  const handleUpdateQuantity = (flavorId: string, qty: number) => {
    setCartItems((prev) => ({
      ...prev,
      [flavorId]: qty
    }));
  };

  const handleClearCart = () => {
    setCartItems({});
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterError('EMAIL IS REQUIRED');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterError('INVALID EMAIL ROUTE');
      return;
    }

    setNewsletterError('');
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setNewsletterSuccess(false);
    }, 5000);
  };

  // Helper to change active global flavor profile from anywhere
  const handleFlavorChange = (flavor: ProductFlavor) => {
    setCurrentFlavor(flavor);
  };

  return (
    <div id="ciao-root-wrapper" className="min-h-screen bg-black text-zinc-100 selection:bg-lime-400 selection:text-black antialiased font-sans flex flex-col justify-between">
      
      {/* 1. Introductory Preloader Screen */}
      <AnimatePresence mode="wait">
        {isPreloading && (
          <Preloader key="app-preloader" onComplete={() => setIsPreloading(false)} />
        )}
      </AnimatePresence>

      {!isPreloading && (
        <div className="flex-1 flex flex-col justify-between">
          
          {/* 2. Top Navigation Bar */}
          <Navbar 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            onOpenStoreModal={() => setIsStoreOpen(true)}
            cartItems={cartItems}
          />

          {/* 3. Screen Router containing Framer Motion Page Shifts */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {currentPage === 'home' && (
                <motion.div
                  key="home-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Hero 
                    currentFlavor={currentFlavor} 
                    onFlavorChange={handleFlavorChange}
                    onNavigateToProducts={() => setCurrentPage('products')}
                    onOpenStoreModal={() => setIsStoreOpen(true)}
                  />

                  {/* Enhanced Product Catalog Showcase */}
                  <Suspense fallback={null}>
                    <HomeCatalog 
                      onAddToCart={handleAddToCart}
                      onFlavorChange={handleFlavorChange}
                      onNavigateToLab={() => setCurrentPage('can3d')}
                    />
                  </Suspense>

                  {/* Cinematic Brand Poster Section */}
                  <Suspense fallback={null}>
                    <HomePoster 
                      onNavigateToLab={() => setCurrentPage('can3d')}
                    />
                  </Suspense>

                  {/* Technical Ingredients DNA & Matcher quiz */}
                  <Suspense fallback={null}>
                    <HomeDNA 
                      onAddToCart={handleAddToCart}
                    />
                  </Suspense>

                  {/* High Fidelity Community Testimonials */}
                  <Suspense fallback={null}>
                    <HomeTestimonials />
                  </Suspense>
                </motion.div>
              )}

              {currentPage === 'story' && (
                <motion.div
                  key="story-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <Suspense fallback={<PageSkeleton />}>
                    <OurStory />
                  </Suspense>
                </motion.div>
              )}

              {currentPage === 'products' && (
                <motion.div
                  key="products-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <Suspense fallback={<PageSkeleton />}>
                    <Products onAddToCart={handleAddToCart} />
                  </Suspense>
                </motion.div>
              )}

              {currentPage === 'contact' && (
                <motion.div
                  key="contact-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <Suspense fallback={<PageSkeleton />}>
                    <Contact />
                  </Suspense>
                </motion.div>
              )}

              {currentPage === 'can3d' && (
                <motion.div
                  key="can3d-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <Suspense fallback={<PageSkeleton />}>
                    <Can3DLab />
                  </Suspense>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* 4. Branded Interactive Footer */}
          <footer id="app-footer" className="border-t border-white/[0.04] bg-zinc-950/40 py-16">
            <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
              
              {/* Brand Col */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-white text-black font-black font-display shadow-md">
                    C
                  </div>
                  <span className="font-display text-lg font-black tracking-widest text-white">CIAO ENERGY</span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mt-2">
                  Zero-sugar, zero-crash premium fuel formulated for nocturnal builders, creators, and digital rule-breakers. Built in consultation with molecular biophysicists.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-zinc-900 border border-white/[0.03] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/[0.1] transition-all" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-zinc-900 border border-white/[0.03] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/[0.1] transition-all" aria-label="Twitter">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-600 font-bold tracking-widest bg-zinc-900/60 rounded border border-white/[0.03] px-2 py-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                    <span>0% SYNTH APPROVED</span>
                  </div>
                </div>
              </div>

              {/* Quick Links Column */}
              <div className="md:col-span-2 flex flex-col gap-4">
                <h4 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  PRODUCT LINEUP
                </h4>
                <nav className="flex flex-col gap-2.5">
                  {FLAVORS.slice(0, 4).map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setCurrentFlavor(f);
                        setCurrentPage('products');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs text-zinc-400 hover:text-white transition-colors text-left uppercase font-semibold"
                    >
                      {f.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Company Col */}
              <div className="md:col-span-2 flex flex-col gap-4">
                <h4 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  THE SYSTEM
                </h4>
                <nav className="flex flex-col gap-2.5 text-xs text-zinc-400 font-semibold">
                  <button onClick={() => { setCurrentPage('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors text-left">MANIFESTO</button>
                  <button onClick={() => { setCurrentPage('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors text-left">BIO-FORMULA DNA</button>
                  <button onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors text-left">MILAN LABS</button>
                  <button onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors text-left">GLOBAL DEPOT</button>
                </nav>
              </div>

              {/* Subscription Input Form Col */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <h4 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  JOIN THE REBEL CELL
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Subscribe to receive distribution drops, batch restocks, and testing lab updates directly.
                </p>

                <AnimatePresence mode="wait">
                  {newsletterSuccess ? (
                    <motion.div
                      key="subscribe-success"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl border border-lime-500/10 bg-lime-500/5 text-xs text-lime-400 font-mono tracking-wide"
                    >
                      SUCCESSFUL TRANSMISSION. CELL LOGGED.
                    </motion.div>
                  ) : (
                    <motion.form
                      key="subscribe-form"
                      onSubmit={handleNewsletterSubmit}
                      className="flex flex-col gap-2"
                    >
                      <div className="relative">
                        <input
                          type="text"
                          value={newsletterEmail}
                          onChange={(e) => {
                            setNewsletterEmail(e.target.value);
                            if (newsletterError) setNewsletterError('');
                          }}
                          placeholder="your.secure@email.com"
                          className="w-full rounded-xl border border-white/[0.04] bg-zinc-900/60 focus:border-white/[0.15] px-4 py-3 text-xs text-white focus:outline-none transition-all placeholder-zinc-600"
                        />
                        <button
                          type="submit"
                          className="absolute right-1.5 top-1.5 bottom-1.5 h-8 px-3 rounded-lg bg-white hover:bg-lime-400 text-black flex items-center justify-center transition-colors"
                          aria-label="Submit newsletter subscription"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                      {newsletterError && (
                        <span className="font-mono text-[9px] text-rose-500 font-bold text-left tracking-wide block mt-0.5">
                          ! {newsletterError}
                        </span>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Bottom Credits */}
            <div className="mx-auto max-w-7xl px-6 md:px-12 border-t border-white/[0.04] pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
              <div className="text-left flex flex-wrap gap-x-6 gap-y-2">
                <span>© 2026 CIAO ENERGY INC.</span>
                <span>MILAN HQ: VIA DELLA MOSCOVA 34</span>
                <span>NYC CORP: 55 HUDSON YARDS</span>
              </div>
              <div className="flex items-center gap-1 bg-zinc-900 px-3 py-1 rounded border border-white/[0.02]">
                <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                <span>ZERO-BULLSHIT MOVEMENT APPROVED</span>
              </div>
            </div>
          </footer>

          {/* 5. Cart/Checkout popup Modal */}
          <StoreModal 
            isOpen={isStoreOpen}
            onClose={() => setIsStoreOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
          />

          {/* Floating Cart Notification Toasts with subtle layout-transition pop */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0">
            <AnimatePresence>
              {toasts.map((toast) => (
                <motion.div
                  key={toast.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                  className="pointer-events-auto flex items-center gap-4 bg-zinc-950/95 border border-white/[0.08] p-4 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden relative"
                >
                  {/* Accent glow line inside */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-[4px]"
                    style={{ backgroundColor: toast.themeHex }}
                  />

                  {/* Pulsing indicator */}
                  <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.05]">
                    <Sparkles className="w-4 h-4 text-lime-400" />
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400"></span>
                    </span>
                  </div>

                  <div className="flex-1 text-left">
                    <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase block">
                      CARGO SECURED // DEPLOYED
                    </span>
                    <span className="font-display font-black text-xs text-white uppercase block leading-tight mt-0.5">
                      {toast.flavorName} (12-PACK)
                    </span>
                    <span className="font-mono text-[9px] text-lime-400 font-bold uppercase block mt-1">
                      +1 ADDED TO BATCH VESSEL
                    </span>
                  </div>

                  {/* Aesthetic laser grid background */}
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                    <div className="h-10 w-10 bg-gradient-to-br from-transparent to-white/20 rounded-tl-full" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      )}

    </div>
  );
}
