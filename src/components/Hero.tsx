/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";

import { ProductFlavor } from "../types";
import { FLAVORS } from "../data";
import ThreeDCan from "./ThreeDCan";

interface HeroProps {
  currentFlavor: ProductFlavor;
  onFlavorChange: (flavor: ProductFlavor) => void;
  onNavigateToProducts: () => void;
  onOpenStoreModal: () => void;
}

export default function Hero({
  currentFlavor,
  onFlavorChange,
  onNavigateToProducts,
  onOpenStoreModal,
}: HeroProps) {
  const currentIndex = FLAVORS.findIndex(
    (f) => f.id === currentFlavor.id
  );

  const nextFlavor = () =>
    onFlavorChange(
      FLAVORS[(currentIndex + 1) % FLAVORS.length]
    );

  const prevFlavor = () =>
    onFlavorChange(
      FLAVORS[
        (currentIndex - 1 + FLAVORS.length) %
          FLAVORS.length
      ]
    );

  // Mouse Parallax coordinates for a premium depth effect
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // Scroll Parallax hooks using useScroll and useTransform
  const { scrollY } = useScroll();

  // Background glow parallax values
  const bgGlowY = useTransform(scrollY, [0, 800], [0, 180]);
  const bgGlowScale = useTransform(scrollY, [0, 800], [1, 0.88]);

  // Floating 3D Can container parallax values
  const canY = useTransform(scrollY, [0, 800], [0, 140]);
  const canScale = useTransform(scrollY, [0, 800], [1, 0.94]);

  // Stage glow behind can parallax
  const stageGlowY = useTransform(scrollY, [0, 800], [0, 110]);

  // Decorative rings parallax
  const ringsY = useTransform(scrollY, [0, 800], [0, 90]);

  // Colossal display signature background watermark parallax
  const watermarkY = useTransform(scrollY, [0, 800], [0, -120]);

  useEffect(() => {
    let rafId: number;
    let latestCoords = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      latestCoords.x = (e.clientX / window.innerWidth) - 0.5;
      latestCoords.y = (e.clientY / window.innerHeight) - 0.5;
    };

    const throttleLoop = () => {
      setMouseCoords(latestCoords);
      rafId = requestAnimationFrame(throttleLoop);
    };

    rafId = requestAnimationFrame(throttleLoop);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevFlavor();
      else if (e.key === 'ArrowRight') nextFlavor();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <section className="relative min-h-screen lg:h-screen w-full overflow-hidden bg-[#050505] pt-24 pb-12 lg:py-0 flex items-center">
      
      {/* BACKGROUND GRAPHICS & RADIAL GLOWS */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        
        {/* Giant Dynamic Fluid Ambient Glow */}
        <motion.div style={{ y: bgGlowY, scale: bgGlowScale }} className="absolute inset-0 pointer-events-none select-none">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentFlavor.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-[700px] w-[700px] sm:h-[850px] sm:w-[850px]
              -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] sm:blur-[180px]"
              style={{
                background: `radial-gradient(circle, ${currentFlavor.themeHex}33 0%, ${currentFlavor.themeHex}08 70%, transparent 100%)`,
              }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Subtle Interactive Parallax Stars / Particles */}
        <motion.div 
          className="absolute inset-0"
          style={{
            x: mouseCoords.x * 25,
            y: mouseCoords.y * 25,
          }}
        >
          <div className="absolute top-[15%] left-[10%] w-1 h-1 bg-white/20 rounded-full" />
          <div className="absolute top-[25%] right-[20%] w-1.5 h-1.5 bg-white/10 rounded-full" />
          <div className="absolute bottom-[30%] left-[25%] w-1 h-1 bg-white/15 rounded-full" />
          <div className="absolute bottom-[20%] right-[15%] w-2 h-2 bg-white/5 rounded-full" />
        </motion.div>

        {/* Textured Film Grain / Noise */}
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />

        {/* Vignette & Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      {/* HERO CONTAINER */}
      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1400px]
          px-6
          sm:px-10
          md:px-14
          lg:px-16
          grid
          grid-cols-1
          lg:grid-cols-12
          gap-12
          lg:gap-6
          items-center
          h-full
        "
      >
        {/* LEFT COLUMN: Premium Copywriting & Brand Statement */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center order-2 lg:order-1 select-text">
          
          {/* Tagline / Sub-label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full
            border border-white/10
            bg-white/5
            px-4
            py-1.5
            text-[10px]
            font-semibold
            font-mono
            uppercase
            tracking-[0.25em]
            text-zinc-300
            backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
            <span>{currentFlavor.subName}</span>
          </motion.div>

          {/* Majestic Colossal Name */}
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentFlavor.id}
                initial={{ opacity: 0, y: 60, skewY: 2 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                exit={{ opacity: 0, y: -45, skewY: -2 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="
                  font-display
                  text-[2.8rem]
                  xs:text-[3.5rem]
                  sm:text-[5rem]
                  md:text-[6rem]
                  lg:text-[6.5rem]
                  xl:text-[7.8rem]
                  font-black
                  leading-[0.9]
                  tracking-tighter
                  text-white
                  uppercase
                "
                style={{
                  textShadow: `0 0 40px ${currentFlavor.themeHex}18`
                }}
              >
                {currentFlavor.name}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Premium Description Block */}
          <div className="relative mt-6 min-h-[90px] sm:min-h-[100px] w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFlavor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="
                  text-sm
                  sm:text-base
                  md:text-lg
                  leading-relaxed
                  text-zinc-400
                  max-w-xl
                "
              >
                {currentFlavor.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* High-End Double Action Call-to-actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onOpenStoreModal}
              className="
                group
                flex
                items-center
                justify-center
                rounded-full
                bg-white
                px-8
                py-4
                sm:px-9
                sm:py-5
                font-bold
                text-xs
                tracking-widest
                uppercase
                text-black
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]
                active:scale-[0.98]
              "
            >
              <span>ORDER NOW</span>
              <ArrowRight className="ml-2.5 h-[18px] w-[18px] transition-transform group-hover:translate-x-1.5" />
            </button>

            <button
              onClick={onNavigateToProducts}
              className="
                flex
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/5
                px-8
                py-4
                sm:px-9
                sm:py-5
                font-bold
                text-xs
                tracking-widest
                uppercase
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:bg-white/10
                hover:border-white/25
                active:scale-[0.98]
              "
            >
              View Flavors
            </button>
          </motion.div>
        </div>

         {/* RIGHT COLUMN: Interactive 3D Holographic Stage */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center order-1 lg:order-2 select-none h-[440px] sm:h-[520px] lg:h-full w-full">
          
          {/* Colossal display signature background watermark */}
          <motion.div 
            style={{ y: watermarkY }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0 opacity-[0.03]"
          >
            <span className="font-display font-black text-[120px] sm:text-[160px] tracking-tighter text-white uppercase select-none leading-none -rotate-12">
              SHOWON
            </span>
          </motion.div>
 
          {/* Subtle concentric sound/aesthetic wave rings */}
          <motion.div 
            style={{ y: ringsY }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div className="absolute h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] md:h-[520px] md:w-[520px] rounded-full border border-white/[0.03]" />
            <div className="absolute h-[220px] w-[220px] sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px] rounded-full border border-white/[0.03]" />
            <div className="absolute h-[150px] w-[150px] sm:h-[240px] sm:w-[240px] md:h-[280px] md:w-[280px] rounded-full border border-white/[0.02] border-dashed" />
          </motion.div>
 
          {/* Focused dynamic ambient spotlight behind the active can */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${currentFlavor.id}-stage-glow`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.7 }}
              className="absolute h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] rounded-full blur-[80px] sm:blur-[100px]"
              style={{
                background: currentFlavor.themeHex,
                opacity: 0.38,
                y: stageGlowY,
              }}
            />
          </AnimatePresence>
 
          {/* Left Arrow Carousel Controller */}
          <button
            onClick={prevFlavor}
            className="
              absolute
              left-0
              xs:left-4
              sm:left-6
              lg:-left-4
              xl:left-0
              z-30
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-black/45
              text-white
              backdrop-blur-xl
              transition-all
              duration-300
              hover:scale-110
              hover:bg-zinc-900
              hover:text-lime-400
              hover:border-lime-500/20
              shadow-[0_4px_16px_rgba(0,0,0,0.6)]
              active:scale-95
            "
            aria-label="Previous Flavor"
          >
            <ChevronLeft size={22} />
          </button>
 
          {/* INTERACTIVE 3D SPINNING PRODUCT CAN */}
          <motion.div 
            style={{ y: canY, scale: canScale }}
            className="relative z-20 w-full flex items-center justify-center animate-none"
          >
            <ThreeDCan currentFlavor={currentFlavor} />
          </motion.div>

          {/* Right Arrow Carousel Controller */}
          <button
            onClick={nextFlavor}
            className="
              absolute
              right-0
              xs:right-4
              sm:right-6
              lg:-right-4
              xl:right-0
              z-30
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-black/45
              text-white
              backdrop-blur-xl
              transition-all
              duration-300
              hover:scale-110
              hover:bg-zinc-900
              hover:text-lime-400
              hover:border-lime-500/20
              shadow-[0_4px_16px_rgba(0,0,0,0.6)]
              active:scale-95
            "
            aria-label="Next Flavor"
          >
            <ChevronRight size={22} />
          </button>

          {/* Bottom Flavor Capsule Switcher Menu */}
          <div className="absolute bottom-[-10px] sm:bottom-[10px] z-30 flex flex-wrap justify-center gap-2 max-w-full px-4">
            {FLAVORS.map((flavor) => {
              const active = flavor.id === currentFlavor.id;
              return (
                <button
                  key={flavor.id}
                  onClick={() => onFlavorChange(flavor)}
                  className={`
                    rounded-full
                    px-4
                    py-1.5
                    text-[9px]
                    font-mono
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    transition-all
                    duration-300
                    backdrop-blur-md
                    ${
                      active
                        ? "text-black shadow-lg shadow-black/40 scale-105"
                        : "border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:border-white/10"
                    }
                  `}
                  style={
                    active
                      ? {
                          backgroundColor: flavor.themeHex,
                        }
                      : {}
                  }
                >
                  {flavor.name.replace(" COCO", "").replace(" POMME", "").replace(" DOUBLE", "")}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
