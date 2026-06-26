/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface ShowOnCanProps {
  // Brand Copy
  brandText?: string;
  subName?: string;
  tagline?: string;
  
  // Visual Styles
  themeHex?: string;       // Background metallic color (e.g. #ff003c for cola red)
  accentHex?: string;      // Accent text and logo color (e.g. #ffffff)
  metalColor?: 'silver' | 'gold' | 'copper' | 'dark'; // Cap and bottom metal material
  
  // Custom Controls
  rotationY?: number;      // Current Y rotation (degrees)
  rotationX?: number;      // Current X rotation (degrees)
  scale?: number;          // Can size scale multiplier
  glossiness?: number;     // Intensity of specular highlight (0 to 1)
  metalSheen?: boolean;    // Whether the label itself has a metallic brushed finish
}

/**
 * ShowOnCan - A high-performance, purely CSS 3D cylindrical beverage can.
 * Features customizable HTML textures, live Blinn-Phong shading, and specular reflections.
 * Built with standard React, Tailwind CSS, and zero external 3D engine dependencies.
 */
export default function ShowOnCan({
  brandText = "SHOWON",
  subName = "EXOTIQUE BURST",
  tagline = "THE MOLECULAR ENERGY CELL // ZERO CRASH",
  themeHex = "#b512fa",
  accentHex = "#ffffff",
  metalColor = "silver",
  rotationY = 0,
  rotationX = 10,
  scale = 1.0,
  glossiness = 0.8,
  metalSheen = true
}: ShowOnCanProps) {
  const numFaces = 24; // Smoothness of the cylinder
  const canHeight = 330; // Height of the cylindrical label (px)
  const canRadius = 92; // Radius of the cylinder (px)
  
  // Exact chord width for 24 faces: 2 * R * sin(180/24) = 2 * 92 * sin(7.5deg) ≈ 24.03px
  // We use 24.3px to create a tiny 0.25px overlap to eliminate sub-pixel rendering gaps
  const stripWidth = 24.3; 
  const labelWidth = 578; // Circumference C = 2 * Math.PI * 92 ≈ 578px

  // Material settings for the metallic top/bottom rims
  const metalColors = {
    silver: {
      base: '#d1d5db',
      border: '#9ca3af',
      gradient: 'radial-gradient(circle at 50% 50%, #f3f4f6 0%, #e5e7eb 45%, #9ca3af 80%, #4b5563 100%)',
      ring: 'linear-gradient(90deg, #9ca3af, #f3f4f6, #9ca3af, #4b5563, #9ca3af)'
    },
    gold: {
      base: '#eab308',
      border: '#ca8a04',
      gradient: 'radial-gradient(circle at 50% 50%, #fef08a 0%, #facc15 45%, #ca8a04 80%, #854d0e 100%)',
      ring: 'linear-gradient(90deg, #ca8a04, #fef08a, #ca8a04, #854d0e, #ca8a04)'
    },
    copper: {
      base: '#ea580c',
      border: '#c2410c',
      gradient: 'radial-gradient(circle at 50% 50%, #ffedd5 0%, #f97316 45%, #c2410c 80%, #7c2d12 100%)',
      ring: 'linear-gradient(90deg, #c2410c, #ffedd5, #c2410c, #7c2d12, #c2410c)'
    },
    dark: {
      base: '#1f2937',
      border: '#111827',
      gradient: 'radial-gradient(circle at 50% 50%, #4b5563 0%, #1f2937 45%, #111827 80%, #030712 100%)',
      ring: 'linear-gradient(90deg, #111827, #4b5563, #111827, #030712, #111827)'
    }
  }[metalColor];

  // Render a highly detailed flat beverage label in pure HTML vector graphics
  const renderLabel = () => (
    <div 
      className="relative flex select-none text-white overflow-hidden"
      style={{ 
        width: `${labelWidth}px`, 
        height: `${canHeight}px`,
        background: metalSheen 
          ? `linear-gradient(135deg, ${themeHex}dd 0%, ${themeHex}ff 50%, ${themeHex}cc 100%)`
          : themeHex,
      }}
    >
      {/* Brushed metal label sheen overlay */}
      {metalSheen && (
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 10px)'
          }}
        />
      )}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* SECTION A: SIDE WARNINGS & BARCODES (0px to 140px) */}
      <div 
        className="w-[140px] h-full shrink-0 border-r border-white/5 p-4 flex flex-col justify-between font-mono text-[8px] text-white/50 leading-tight"
        style={{ width: '140px' }}
      >
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-white tracking-widest border-b border-white/20 pb-1">
            LAB FORMULA
          </div>
          <p>WARNING: HIGH VITAMIN CONCENTRATE. CONFORMS TO SYSTEM ENERGY SPECIFICATIONS.</p>
          <p>STORAGE: COOL FLUID ENVIRONMENT. KEEP SEALED UNTIL MOLECULAR ACTIVATION.</p>
        </div>

        {/* Barcode representation */}
        <div className="space-y-2">
          <div className="bg-white/80 p-1 rounded-sm w-fit">
            <div className="flex items-end gap-[1px] h-8 bg-black p-1">
              {[1,3,1,2,1,4,1,1,2,3,1,1,3,1,2,1,1,4,2,1,1,3,1,1].map((w, idx) => (
                <div 
                  key={idx} 
                  className="bg-white h-full" 
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>
            <div className="text-[6px] text-black text-center font-bold tracking-widest mt-0.5">
              0074213892601
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full border border-white/30 flex items-center justify-center text-[7px] text-white font-bold">
              18
            </div>
            <span>RECYCLABLE ALUMINUM</span>
          </div>
        </div>
      </div>

      {/* SECTION B: GIANT FRONT BRANDING (140px to 420px) */}
      <div 
        className="w-[280px] h-full shrink-0 relative flex flex-col items-center justify-between py-6 px-4 text-center border-r border-white/5"
        style={{ width: '280px' }}
      >
        {/* Subtle geometric circles behind logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-48 h-48 rounded-full border border-white" />
          <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-white" />
        </div>

        {/* Top small label */}
        <div className="relative font-mono text-[8px] tracking-[0.3em] opacity-80" style={{ color: accentHex }}>
          ★ COLD-BREW PROBIOTIC BATCH ★
        </div>

        {/* Majestic Centered Logo */}
        <div className="relative flex flex-col items-center my-auto">
          {/* Main Giant Vertical/Diagonal Name */}
          <h1 
            className="font-black text-5xl md:text-[3.25rem] tracking-tighter leading-none select-none uppercase"
            style={{ 
              color: accentHex,
              fontFamily: '"Space Grotesk", sans-serif',
              textShadow: '0 4px 15px rgba(0,0,0,0.3)',
              transform: 'skewX(-4deg)'
            }}
          >
            {brandText}
          </h1>
          <div 
            className="h-[2px] w-32 my-2.5" 
            style={{ backgroundColor: accentHex }} 
          />
          <span 
            className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold"
            style={{ color: accentHex }}
          >
            {subName}
          </span>
        </div>

        {/* Bottom Slogan */}
        <p className="relative font-mono text-[7px] tracking-widest opacity-60 uppercase max-w-[200px] mx-auto leading-normal">
          {tagline}
        </p>
      </div>

      {/* SECTION C: NUTRITION FACTS (420px to 578px) */}
      <div 
        className="w-[158px] h-full shrink-0 p-4 flex flex-col justify-between font-sans text-white/70"
        style={{ width: '158px' }}
      >
        <div className="border border-white/20 p-2 bg-black/25 rounded-md text-[7px] leading-tight space-y-1">
          <div className="font-bold text-[9px] text-white border-b border-white/30 pb-0.5 uppercase">
            Nutrition Facts
          </div>
          <div className="flex justify-between border-b border-white/10 pb-0.5">
            <span>Can Size</span>
            <span className="font-bold text-white">250ml</span>
          </div>
          <div className="flex justify-between font-bold text-white border-b border-white/20 pb-0.5">
            <span>Calories</span>
            <span>15 kcal</span>
          </div>
          
          {/* Values table */}
          <div className="space-y-0.5 text-white/50 pt-1">
            <div className="flex justify-between border-b border-white/5">
              <span>Caffeine</span>
              <span className="text-white">150mg</span>
            </div>
            <div className="flex justify-between border-b border-white/5">
              <span>Sugar</span>
              <span className="text-white">2.5g</span>
            </div>
            <div className="flex justify-between border-b border-white/5">
              <span>Taurine</span>
              <span className="text-white">1000mg</span>
            </div>
            <div className="flex justify-between border-b border-white/5">
              <span>B-Vitamins</span>
              <span className="text-white">250% DV</span>
            </div>
          </div>
        </div>

        {/* Small warning labels */}
        <div className="font-mono text-[6px] text-white/40 space-y-0.5">
          <div>BATCH REF // SYS_004</div>
          <div>FORMULATED & CELL CAPSULED IN MILAN LABS.</div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="relative flex items-center justify-center select-none"
      style={{ 
        width: `${canRadius * 2 * scale}px`, 
        height: `${(canHeight + 50) * scale}px`,
        transform: `scale(${scale})`,
        perspective: '1200px'
      }}
    >
      {/* 3D CAN CONTAINER */}
      <div
        className="relative"
        style={{
          width: `${canRadius * 2}px`,
          height: `${canHeight}px`,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${-rotationX}deg) rotateY(${rotationY}deg)`,
        }}
      >
        {/* A. METAL TOP LID (Tilted circular cap at height) */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: `${canRadius * 2}px`,
            height: `${canRadius * 2}px`,
            left: 0,
            top: `-${canRadius}px`,
            transform: `rotateX(90deg) translateZ(${canHeight / 2}px)`,
            background: metalColors.gradient,
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
            backfaceVisibility: 'visible',
          }}
        >
          {/* Concentric metal rings */}
          <div className="w-4/5 h-4/5 rounded-full border border-black/10 flex items-center justify-center">
            <div className="w-2/3 h-2/3 rounded-full border border-white/30 flex items-center justify-center">
              {/* Soda Can Pull Tab Simulation */}
              <div 
                className="w-5 h-8 bg-zinc-400 border border-zinc-500 rounded-md relative flex flex-col items-center justify-between p-0.5 shadow-sm origin-center"
                style={{
                  transform: 'rotate(-45deg) translateY(-2px)',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #9ca3af 100%)'
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-600 border border-zinc-700 mt-1" />
                <div className="w-3.5 h-1.5 rounded-sm bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>

        {/* B. METAL BOTTOM PLINTH */}
        <div
          className="absolute rounded-full"
          style={{
            width: `${canRadius * 2}px`,
            height: `${canRadius * 2}px`,
            left: 0,
            bottom: `-${canRadius}px`,
            transform: `rotateX(-90deg) translateZ(${canHeight / 2}px)`,
            background: metalColors.gradient,
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6)',
            backfaceVisibility: 'visible',
          }}
        />

        {/* C. 24 CYLINDER STRIPS (The 3D curved cylinder wall) */}
        {Array.from({ length: numFaces }).map((_, i) => {
          // Angle of this face around the cylinder center
          const faceAngle = i * (360 / numFaces);
          
          // Absolute angle relative to the screen, accounting for the parent's rotateY
          const totalAngleDeg = (faceAngle + rotationY) % 360;
          const totalAngleRad = (totalAngleDeg * Math.PI) / 180;
          
          // Phong illumination calculations:
          // 1. Shading (lambertian diffuse): darker on sides, brighter in the center
          const shadingIntensity = Math.max(0.15, Math.cos(totalAngleRad));
          
          // 2. Main Specular Highlight (Tight shiny white strip from light source at -40 degrees)
          const lightSourceRad = -40 * (Math.PI / 180);
          const specularIntensity = Math.pow(Math.max(0, Math.cos(totalAngleRad - lightSourceRad)), 5);
          
          // 3. Sub Rim Light (Soft glowing edge from opposite light source at 120 degrees)
          const rimSourceRad = 120 * (Math.PI / 180);
          const rimIntensity = Math.pow(Math.max(0, Math.cos(totalAngleRad - rimSourceRad)), 2);

          return (
            <div
              key={i}
              className="absolute top-0 bottom-0 overflow-hidden"
              style={{
                width: `${stripWidth}px`,
                // Centering the strip on the Y-axis pivot point
                left: `calc(50% - ${stripWidth / 2}px)`,
                
                // 3D placement: Rotate to its position on the circle, then push out to the radius
                transform: `rotateY(${faceAngle}deg) translateZ(${canRadius - 0.25}px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Seamless Sliced Texture Container */}
              <div
                className="relative h-full"
                style={{
                  width: `${labelWidth}px`,
                  // Shifts the label left by the strip position to map the texture
                  transform: `translateX(-${i * (labelWidth / numFaces)}px)`,
                }}
              >
                {/* Custom-rendered Brand Label */}
                {renderLabel()}
              </div>

              {/* REAL-TIME Phong 3D Lighting Shading Overlays */}
              
              {/* 1. Diffuse Shading Overlay (Dark shadow to bend the flat strips into a 3D cylinder) */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-100"
                style={{
                  backgroundColor: 'black',
                  opacity: 1 - shadingIntensity,
                }}
              />

              {/* 2. Specular Glossy Reflection (Stationary shiny light highlight) */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-100"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)',
                  opacity: specularIntensity * glossiness,
                }}
              />

              {/* 3. Rim Lighting Overlay (Gently illuminates the curved silhouette edges) */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-100"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  opacity: rimIntensity * 0.4 * glossiness,
                }}
              />

              {/* Extreme edge dark shadow to soften geometry lines */}
              <div 
                className="absolute left-0 w-[1px] h-full bg-black/25 pointer-events-none"
              />
              <div 
                className="absolute right-0 w-[1px] h-full bg-black/25 pointer-events-none"
              />
            </div>
          );
        })}
        
        {/* Metal Top Ring Bezel Trim (to seal the gap between the cap and the cylinder) */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5 pointer-events-none rounded-t-lg z-30"
          style={{
            background: metalColors.ring,
            opacity: 0.85
          }}
        />

        {/* Metal Bottom Ring Bezel Trim */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1.5 pointer-events-none rounded-b-lg z-30"
          style={{
            background: metalColors.ring,
            opacity: 0.85
          }}
        />
      </div>
    </div>
  );
}
