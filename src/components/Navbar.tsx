/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Instagram, Twitter, Compass, Flame, ShoppingBag } from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onOpenStoreModal: () => void;
  cartItems?: { [id: string]: number };
}

export default function Navbar({ currentPage, setCurrentPage, onOpenStoreModal, cartItems = {} }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'story', label: 'OUR STORY' },
    { id: 'products', label: 'PRODUCTS' },
    { id: 'can3d', label: '3D CAN LAB' },
    { id: 'contact', label: 'CONTACT' }
  ] as const;

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <header id="main-header" className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.04] bg-black/65 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Brand Logo */}
          <div 
            id="brand-logo-container"
            onClick={() => handleNavClick('home')} 
            className="flex cursor-pointer items-center gap-2 select-none"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black font-black font-display shadow-[0_0_15px_rgba(255,255,255,0.25)]">
              C
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-extrabold tracking-widest text-white leading-none">SHOW</span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 leading-none">ON ENERGY</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-5 py-2 text-xs font-semibold tracking-widest text-zinc-400 hover:text-white transition-colors duration-250 select-none"
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-zinc-900 border border-white/[0.05]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Burger Menu */}
          <div className="flex items-center gap-4">
            <button
              id="desktop-shop-btn"
              onClick={onOpenStoreModal}
              className="group hidden sm:flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold tracking-widest text-black transition-all hover:bg-lime-400 hover:shadow-[0_0_20px_rgba(163,230,53,0.35)] relative overflow-visible"
            >
              <div className="relative">
                <ShoppingBag className="w-4.5 h-4.5" />
                {totalItems > 0 && (
                  <motion.span
                    key={`cart-ripple-${totalItems}`}
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-full bg-lime-500 pointer-events-none"
                  />
                )}
              </div>
              <span>SHOP NOW</span>
              {totalItems > 0 && (
                <motion.span
                  key={`cart-count-${totalItems}`}
                  initial={{ scale: 0.6, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="px-2 py-0.5 rounded-full bg-black text-lime-400 font-mono text-[9px] font-bold border border-lime-400/20 shadow-[0_0_10px_rgba(163,230,53,0.25)]"
                >
                  {totalItems}
                </motion.span>
              )}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Menu Toggle Trigger */}
            <button
              id="menu-drawer-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-950 text-white hover:bg-zinc-900 transition-colors"
              aria-label="Toggle Navigation Drawer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Right Slide-out Hamburger Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              id="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-45 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.aside
              id="side-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-zinc-950 border-l border-white/[0.05] p-8 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 flex items-center justify-center rounded bg-white text-black font-black font-display text-sm">
                    C
                  </div>
                  <span className="font-display text-sm font-bold tracking-widest text-white">REBEL RAIL</span>
                </div>
                <button
                  id="drawer-close-btn"
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4 my-10">
                <div className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-2 pl-4">
                  NAVIGATION DIRECTORY
                </div>
                {navItems.map((item, index) => {
                  const isActive = currentPage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      id={`drawer-link-${item.id}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.id)}
                      className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-left transition-colors"
                      style={{ background: isActive ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs ${isActive ? 'text-lime-400 font-bold' : 'text-zinc-600'}`}>
                          0{index + 1}.
                        </span>
                        <span className={`font-display text-xl font-bold tracking-wider ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-lime-400' : 'text-zinc-600'}`} />
                    </motion.button>
                  );
                })}
              </nav>

              {/* Drawer Footer CTA & Info */}
              <div className="border-t border-white/[0.05] pt-6 flex flex-col gap-6">
                <button
                  id="drawer-shop-cta"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenStoreModal();
                  }}
                  className="w-full flex items-center justify-between rounded-xl bg-white px-6 py-4 font-display text-sm font-black text-black hover:bg-lime-400 transition-all shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <span className="tracking-widest">SHOP THE FLAVORS</span>
                    {totalItems > 0 && (
                      <motion.span
                        key={`drawer-cart-count-${totalItems}`}
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1 }}
                        className="px-2 py-0.5 rounded-full bg-black text-lime-400 font-mono text-[10px] font-bold border border-lime-400/20"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </div>
                  <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                </button>

                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>MILAN, IT // NYC, US</span>
                  <div className="flex items-center gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
