/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RotateCw, 
  Sliders, 
  Code2, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  ChevronRight, 
  Settings2, 
  Palette, 
  FileCode, 
  CheckCircle2,
  Cpu,
  Move,
  Coffee,
  ExternalLink
} from 'lucide-react';
import ShowOnCan from './ShowOnCan';
import ThreeDCan from './ThreeDCan';

interface Preset {
  id: string;
  name: string;
  brandText: string;
  subName: string;
  tagline: string;
  themeHex: string;
  accentHex: string;
  metalColor: 'silver' | 'gold' | 'copper' | 'dark';
}

const PRESETS: Preset[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Volt',
    brandText: 'SHOWON',
    subName: 'HYPER ELECTRA',
    tagline: '100% RAW AMBROSIA // ZERO SYNTH BIOMASS',
    themeHex: '#84cc16',
    accentHex: '#ffffff',
    metalColor: 'dark'
  },
  {
    id: 'classic-cola',
    name: 'Classic Red Cola',
    brandText: 'COCOLA',
    subName: 'CLASSIC SWEET',
    tagline: 'EST. 1886 // HIGHLY CARBONATED ORIGINAL FUEL',
    themeHex: '#e11d48',
    accentHex: '#ffffff',
    metalColor: 'silver'
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave Dream',
    brandText: 'DREAM',
    subName: 'CHILL SYNTH',
    tagline: 'RETRO CHILLWAVE // DIGITAL SYSTEM FLUID',
    themeHex: '#d946ef',
    accentHex: '#fef08a',
    metalColor: 'gold'
  },
  {
    id: 'toxic-emerald',
    name: 'Toxic Emerald',
    brandText: 'NEXUS',
    subName: 'TOXIC SURGE',
    tagline: 'FORMULATED FOR LONG Mental PROJECTS & CAMPAIGNS',
    themeHex: '#10b981',
    accentHex: '#ffffff',
    metalColor: 'copper'
  },
  {
    id: 'carbon-dark',
    name: 'Midnight Carbon',
    brandText: 'CARBON',
    subName: 'ABSOLUTE RAW',
    tagline: 'RAW BENCHMARK // DESIGNED FOR DARK MODE BUILDERS',
    themeHex: '#18181b',
    accentHex: '#a3e635',
    metalColor: 'dark'
  }
];

export default function Can3DLab() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Customization States
  const [brandText, setBrandText] = useState('SHOWON');
  const [subName, setSubName] = useState('HYPER ELECTRA');
  const [tagline, setTagline] = useState('100% RAW AMBROSIA // ZERO SYNTH BIOMASS');
  const [themeHex, setThemeHex] = useState('#84cc16');
  const [accentHex, setAccentHex] = useState('#ffffff');
  const [metalColor, setMetalColor] = useState<'silver' | 'gold' | 'copper' | 'dark'>('dark');

  // Interactive Engine States
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(10);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [spinSpeed, setSpinSpeed] = useState(1.2);
  const [glossiness, setGlossiness] = useState(0.85);
  const [metalSheen, setMetalSheen] = useState(true);
  const [canScale, setCanScale] = useState(1.0);
  
  // Physics/Inertia Drag States
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 });
  const [copied, setCopied] = useState(false);
  const [exportTab, setExportTab] = useState<'how' | 'code'>('how');

  // Handle Preset Selection
  const applyPreset = (preset: Preset) => {
    setBrandText(preset.brandText);
    setSubName(preset.subName);
    setTagline(preset.tagline);
    setThemeHex(preset.themeHex);
    setAccentHex(preset.accentHex);
    setMetalColor(preset.metalColor);
  };

  // Continuous auto-spin animation loop
  useEffect(() => {
    if (!isAutoSpin || isDragging) return;
    
    let animFrameId: number;
    const animate = () => {
      setRotationY((prev) => (prev + spinSpeed) % 360);
      animFrameId = requestAnimationFrame(animate);
    };
    
    animFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameId);
  }, [isAutoSpin, spinSpeed, isDragging]);

  // Pointer event drag mechanics to spin the can 360 degrees
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotY: rotationY,
      rotX: rotationX
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Y rotation is adjusted by horizontal drag, X rotation is adjusted by vertical drag (clamped)
    setRotationY((dragStartRef.current.rotY + deltaX * 0.75) % 360);
    setRotationX(Math.max(-25, Math.min(25, dragStartRef.current.rotX - deltaY * 0.6)));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  // Function to copy the raw React component code to clipboard
  const handleCopyCode = () => {
    const code = getComponentCodeString();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Raw component string to copy
  const getComponentCodeString = () => {
    return `/**
 * ShowOnCan.tsx
 * Pure CSS 3D cylindrical soda/beverage can.
 * Fully responsive, hardware-accelerated, customizable HTML/Tailwind styling.
 * Supports inertia dragging and live Phong 3D shading calculations!
 */

import React from 'react';

interface ShowOnCanProps {
  brandText?: string;
  subName?: string;
  tagline?: string;
  themeHex?: string;
  accentHex?: string;
  metalColor?: 'silver' | 'gold' | 'copper' | 'dark';
  rotationY?: number;
  rotationX?: number;
  scale?: number;
  glossiness?: number;
  metalSheen?: boolean;
}

export default function ShowOnCan({
  brandText = "${brandText}",
  subName = "${subName}",
  tagline = "${tagline}",
  themeHex = "${themeHex}",
  accentHex = "${accentHex}",
  metalColor = "${metalColor}",
  rotationY = 0,
  rotationX = 10,
  scale = 1.0,
  glossiness = ${glossiness},
  metalSheen = ${metalSheen}
}: ShowOnCanProps) {
  const numFaces = 24;
  const canHeight = 330;
  const canRadius = 92;
  const stripWidth = 24.3; 
  const labelWidth = 578;

  const metalColors = {
    silver: {
      gradient: 'radial-gradient(circle at 50% 50%, #f3f4f6 0%, #e5e7eb 45%, #9ca3af 80%, #4b5563 100%)',
      ring: 'linear-gradient(90deg, #9ca3af, #f3f4f6, #9ca3af, #4b5563, #9ca3af)'
    },
    gold: {
      gradient: 'radial-gradient(circle at 50% 50%, #fef08a 0%, #facc15 45%, #ca8a04 80%, #854d0e 100%)',
      ring: 'linear-gradient(90deg, #ca8a04, #fef08a, #ca8a04, #854d0e, #ca8a04)'
    },
    copper: {
      gradient: 'radial-gradient(circle at 50% 50%, #ffedd5 0%, #f97316 45%, #c2410c 80%, #7c2d12 100%)',
      ring: 'linear-gradient(90deg, #c2410c, #ffedd5, #c2410c, #7c2d12, #c2410c)'
    },
    dark: {
      gradient: 'radial-gradient(circle at 50% 50%, #4b5563 0%, #1f2937 45%, #111827 80%, #030712 100%)',
      ring: 'linear-gradient(90deg, #111827, #4b5563, #111827, #030712, #111827)'
    }
  }[metalColor];

  const renderLabel = () => (
    <div 
      className="relative flex select-none text-white overflow-hidden"
      style={{ 
        width: \`\${labelWidth}px\`, 
        height: \`\${canHeight}px\`,
        background: ${metalSheen} 
          ? \`linear-gradient(135deg, \${themeHex}dd 0%, \${themeHex}ff 50%, \${themeHex}cc 100%)\`
          : themeHex,
      }}
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* SECTION A: SIDE WARNINGS & BARCODES */}
      <div className="w-[140px] h-full shrink-0 border-r border-white/5 p-4 flex flex-col justify-between font-mono text-[8px] text-white/50 leading-tight">
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-white tracking-widest border-b border-white/20 pb-1 uppercase">
            LAB FORMULA
          </div>
          <p>WARNING: HIGH VITAMIN CONCENTRATE. CONFORMS TO SYSTEM ENERGY SPECIFICATIONS.</p>
          <p>STORAGE: COOL ENVIRONMENT. KEEP SEALED UNTIL MOLECULAR ACTIVATION.</p>
        </div>
        <div className="space-y-2">
          <div className="bg-white/80 p-1 rounded-sm w-fit">
            <div className="flex items-end gap-[1px] h-8 bg-black p-1">
              {[1,3,1,2,1,4,1,1,2,3,1,1,3,1,2,1,1,4,2,1,1,3,1,1].map((w, idx) => (
                <div key={idx} className="bg-white h-full" style={{ width: \`\${w}px\` }} />
              ))}
            </div>
            <div className="text-[6px] text-black text-center font-bold tracking-widest mt-0.5">0074213892601</div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full border border-white/30 flex items-center justify-center text-[7px] text-white font-bold">18</div>
            <span>RECYCLABLE ALUMINUM</span>
          </div>
        </div>
      </div>

      {/* SECTION B: GIANT FRONT BRANDING */}
      <div className="w-[280px] h-full shrink-0 relative flex flex-col items-center justify-between py-6 px-4 text-center border-r border-white/5">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-48 h-48 rounded-full border border-white" />
          <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-white" />
        </div>
        <div className="relative font-mono text-[8px] tracking-[0.3em] opacity-80" style={{ color: accentHex }}>
          ★ COLD-BREW PROBIOTIC BATCH ★
        </div>
        <div className="relative flex flex-col items-center my-auto">
          <h1 className="font-black text-5xl tracking-tighter leading-none select-none uppercase" style={{ color: accentHex, transform: 'skewX(-4deg)' }}>
            {brandText}
          </h1>
          <div className="h-[2px] w-32 my-2.5" style={{ backgroundColor: accentHex }} />
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold" style={{ color: accentHex }}>
            {subName}
          </span>
        </div>
        <p className="relative font-mono text-[7px] tracking-widest opacity-60 uppercase max-w-[200px] mx-auto leading-normal">
          {tagline}
        </p>
      </div>

      {/* SECTION C: NUTRITION FACTS */}
      <div className="w-[158px] h-full shrink-0 p-4 flex flex-col justify-between font-sans text-white/70">
        <div className="border border-white/20 p-2 bg-black/25 rounded-md text-[7px] leading-tight space-y-1">
          <div className="font-bold text-[9px] text-white border-b border-white/30 pb-0.5 uppercase">Nutrition Facts</div>
          <div className="flex justify-between border-b border-white/10 pb-0.5"><span>Can Size</span><span className="font-bold text-white">250ml</span></div>
          <div className="flex justify-between font-bold text-white border-b border-white/20 pb-0.5"><span>Calories</span><span>15 kcal</span></div>
          <div className="space-y-0.5 text-white/50 pt-1">
            <div className="flex justify-between border-b border-white/5"><span>Caffeine</span><span className="text-white">150mg</span></div>
            <div className="flex justify-between border-b border-white/5"><span>Sugar</span><span className="text-white">2.5g</span></div>
            <div className="flex justify-between border-b border-white/5"><span>Taurine</span><span className="text-white">1000mg</span></div>
            <div className="flex justify-between border-b border-white/5"><span>B-Vitamins</span><span className="text-white">250% DV</span></div>
          </div>
        </div>
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
        width: \`\${canRadius * 2 * scale}px\`, 
        height: \`\${(canHeight + 50) * scale}px\`,
        transform: \`scale(\${scale})\`,
        perspective: '1200px'
      }}
    >
      <div
        className="relative"
        style={{
          width: \`\${canRadius * 2}px\`,
          height: \`\${canHeight}px\`,
          transformStyle: 'preserve-3d',
          transform: \`rotateX(\${-rotationX}deg) rotateY(\${rotationY}deg)\`,
        }}
      >
        {/* Top lid */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: \`\${canRadius * 2}px\`,
            height: \`\${canRadius * 2}px\`,
            left: 0,
            top: \`-\${canRadius}px\`,
            transform: \`rotateX(90deg) translateZ(\${canHeight / 2}px)\`,
            background: metalColors.gradient,
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
            backfaceVisibility: 'visible',
          }}
        >
          <div className="w-4/5 h-4/5 rounded-full border border-black/10 flex items-center justify-center">
            <div className="w-2/3 h-2/3 rounded-full border border-white/30 flex items-center justify-center">
              <div 
                className="w-5 h-8 rounded-md relative flex flex-col items-center justify-between p-0.5 shadow-sm origin-center"
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

        {/* Bottom plinth */}
        <div
          className="absolute rounded-full"
          style={{
            width: \`\${canRadius * 2}px\`,
            height: \`\${canRadius * 2}px\`,
            left: 0,
            bottom: \`-\${canRadius}px\`,
            transform: \`rotateX(-90deg) translateZ(\${canHeight / 2}px)\`,
            background: metalColors.gradient,
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6)',
            backfaceVisibility: 'visible',
          }}
        />

        {/* Cylinder strips */}
        {Array.from({ length: numFaces }).map((_, i) => {
          const faceAngle = i * (360 / numFaces);
          const totalAngleDeg = (faceAngle + rotationY) % 360;
          const totalAngleRad = (totalAngleDeg * Math.PI) / 180;
          const shadingIntensity = Math.max(0.15, Math.cos(totalAngleRad));
          const lightSourceRad = -40 * (Math.PI / 180);
          const specularIntensity = Math.pow(Math.max(0, Math.cos(totalAngleRad - lightSourceRad)), 5);
          const rimSourceRad = 120 * (Math.PI / 180);
          const rimIntensity = Math.pow(Math.max(0, Math.cos(totalAngleRad - rimSourceRad)), 2);

          return (
            <div
              key={i}
              className="absolute top-0 bottom-0 overflow-hidden"
              style={{
                width: \`\${stripWidth}px\`,
                left: \`calc(50% - \${stripWidth / 2}px)\`,
                transform: \`rotateY(\${faceAngle}deg) translateZ(\${canRadius - 0.25}px)\`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <div
                className="relative h-full"
                style={{
                  width: \`\${labelWidth}px\`,
                  transform: \`translateX(-\${i * (labelWidth / numFaces)}px)\`,
                }}
              >
                {renderLabel()}
              </div>

              {/* Shading/Lighting Overlays */}
              <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ backgroundColor: 'black', opacity: 1 - shadingIntensity }} />
              <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)', opacity: specularIntensity * glossiness }} />
              <div className="absolute inset-0 pointer-events-none mix-blend-screen" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)', opacity: rimIntensity * 0.4 * glossiness }} />
            </div>
          );
        })}
        
        {/* Metal Trim Bezels */}
        <div className="absolute top-0 left-0 right-0 h-1.5 pointer-events-none rounded-t-lg z-30" style={{ background: metalColors.ring, opacity: 0.85 }} />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 pointer-events-none rounded-b-lg z-30" style={{ background: metalColors.ring, opacity: 0.85 }} />
      </div>
    </div>
  );
}`;
  };

  return (
    <section className="relative min-h-screen bg-[#030303] text-zinc-100 pt-28 pb-20 overflow-hidden font-sans select-text">
      
      {/* Background Ambience / Glow circles */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div 
          className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] transition-all duration-1000"
          style={{ background: `${themeHex}0f` }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[180px] transition-all duration-1000"
          style={{ background: `${themeHex}08` }}
        />
        <div className="absolute inset-0 bg-noise opacity-[0.22] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* LAB TITLE & CONCEPT STATEMENT */}
        <div className="mb-12 border-b border-white/[0.04] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/10 bg-lime-500/5 px-3 py-1 font-mono text-[9px] font-bold text-lime-400 tracking-widest uppercase">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>WebGL 3D Studio Lab</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
              3D CAN DESIGN LAB
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-xl">
              An elite design tool for generating real-time 3D aluminum cans in high-performance WebGL. Customize colors, textures, glossiness, metal finishes, and interact seamlessly!
            </p>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs">
            <span className="font-bold text-white uppercase bg-zinc-900 border border-white/5 px-2.5 py-1 rounded">
              360° WEB COMPONENT
            </span>
            <span>v2.1 STABLE</span>
          </div>
        </div>

        {/* MAIN LAB PLATFORM: INTERACTIVE CANVAS + CONTROLS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* COLUMN 1: THE INTERACTIVE CANVAS STAGE (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Interactive 3D Canvas Box */}
            <div 
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative h-[420px] xs:h-[480px] sm:h-[550px] w-full rounded-2xl border border-white/[0.04] bg-zinc-950/65 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-300 touch-none ${isDragging ? 'cursor-grabbing border-white/10' : 'cursor-grab hover:border-white/[0.08]'}`}
            >
              {/* Radial Highlight Behind the Can */}
              <div 
                className="absolute w-[360px] h-[360px] rounded-full blur-[90px] opacity-25 pointer-events-none select-none transition-all duration-1000"
                style={{
                  background: `radial-gradient(circle, ${themeHex} 0%, transparent 70%)`
                }}
              />

              {/* Orbital grid decorations */}
              <div className="absolute w-[440px] h-[440px] rounded-full border border-white/[0.02] pointer-events-none" />
              <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-white/[0.02] pointer-events-none" />

              {/* THE LIVE 3D CAN */}
              <div className="relative z-10 w-full h-[340px] xs:h-[380px] sm:h-[420px] pointer-events-auto">
                <ThreeDCan 
                  customSpecs={{
                    brandText,
                    subName,
                    tagline,
                    themeHex,
                    accentHex,
                    metalColor,
                    volume: '250ml',
                    caffeine: '150mg',
                    sugar: '2.5g',
                    taurine: '1000mg',
                    bVitamins: '250% DV',
                    calories: '15 kcal'
                  }}
                  isAutoSpin={isAutoSpin}
                  spinSpeed={spinSpeed}
                  glossiness={glossiness}
                  metalSheen={metalSheen}
                />
              </div>

              {/* Instructions Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[10px] font-mono text-zinc-600 pointer-events-none select-none">
                <div className="flex items-center gap-2">
                  <Move className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
                  <span>DRAG TO ROTATE ANY ANGLE</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoSpin ? 'animate-spin' : ''}`} />
                  <span>ROTATION_Y: {Math.round(rotationY)}°</span>
                </div>
              </div>

              {/* Action Controls Overlay (Right corner) */}
              <div className="absolute top-5 right-5 flex items-center gap-2 z-20">
                <button
                  onClick={() => setIsAutoSpin(!isAutoSpin)}
                  className={`p-2 rounded-lg border text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 transition-all ${isAutoSpin ? 'bg-lime-500/10 border-lime-500/20 text-lime-400' : 'bg-zinc-900 border-white/5 text-zinc-400 hover:text-white'}`}
                  title="Toggle Auto Spin"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoSpin ? 'animate-spin' : ''}`} />
                  <span>{isAutoSpin ? 'SPINNING' : 'PAUSED'}</span>
                </button>

                <button
                  onClick={() => {
                    setRotationY(0);
                    setRotationX(10);
                  }}
                  className="p-2 rounded-lg border border-white/5 bg-zinc-900 text-zinc-400 hover:text-white transition-all"
                  title="Reset Angle"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Presets Drawer */}
            <div className="rounded-xl border border-white/[0.04] bg-zinc-950/40 p-5 space-y-4">
              <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs font-bold tracking-wider uppercase">
                <Palette className="w-4 h-4 text-lime-400" />
                <span>SELECT PRESET CORE FORMULA</span>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 w-full">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className="group relative flex items-center gap-3 rounded-lg border border-white/5 bg-zinc-900/60 hover:bg-zinc-900 px-4 py-3 text-left transition-all hover:scale-[1.02] active:scale-98"
                  >
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20 transition-transform group-hover:scale-110" 
                      style={{ backgroundColor: preset.themeHex }}
                    />
                    <div>
                      <div className="text-xs font-bold text-white tracking-wide uppercase">{preset.name}</div>
                      <div className="text-[9px] font-mono text-zinc-500 tracking-wider">Rim: {preset.metalColor}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: THE CUSTOMIZATION CONTROL PANEL (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Design Controls Box */}
            <div className="rounded-2xl border border-white/[0.04] bg-zinc-950/65 backdrop-blur-xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-white/[0.04] pb-4">
                <Settings2 className="w-4.5 h-4.5 text-lime-400" />
                <h3 className="font-display text-base font-black tracking-wider uppercase text-white">
                  CAN CONTEXT CONFIG
                </h3>
              </div>

              {/* BRAND TEXT INJECTOR */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                  Brand Heavy Title (SHOWON)
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={brandText}
                  onChange={(e) => setBrandText(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-white/5 bg-zinc-900/70 focus:border-white/15 px-4 py-3 text-xs text-white focus:outline-none transition-all font-sans font-bold tracking-wider"
                />
              </div>

              {/* SUB LABEL */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                  Sub-Flavor Name
                </label>
                <input
                  type="text"
                  maxLength={22}
                  value={subName}
                  onChange={(e) => setSubName(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-white/5 bg-zinc-900/70 focus:border-white/15 px-4 py-3 text-xs text-white focus:outline-none transition-all font-mono"
                />
              </div>

              {/* SLOGAN TAGLINE */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                  Bottom Slogan / Lab Formula Slogan
                </label>
                <textarea
                  maxLength={70}
                  rows={2}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-white/5 bg-zinc-900/70 focus:border-white/15 px-4 py-2.5 text-xs text-white focus:outline-none transition-all font-mono resize-none leading-relaxed"
                />
              </div>

              {/* GRID: COLOR INPUTS & METAL RIM PICKER */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                    Can Body Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={themeHex}
                      onChange={(e) => setThemeHex(e.target.value)}
                      className="w-10 h-10 rounded border border-white/10 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeHex}
                      onChange={(e) => setThemeHex(e.target.value)}
                      className="w-full rounded-lg border border-white/5 bg-zinc-900/70 px-2.5 py-2 text-[10px] text-white font-mono uppercase focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                    Text / Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentHex}
                      onChange={(e) => setAccentHex(e.target.value)}
                      className="w-10 h-10 rounded border border-white/10 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={accentHex}
                      onChange={(e) => setAccentHex(e.target.value)}
                      className="w-full rounded-lg border border-white/5 bg-zinc-900/70 px-2.5 py-2 text-[10px] text-white font-mono uppercase focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* CHOOSE METAL MATERIAL */}
              <div className="space-y-2.5">
                <label className="block text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                  Top & Bottom Aluminum Material
                </label>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-bold">
                  {(['silver', 'gold', 'copper', 'dark'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMetalColor(m)}
                      className={`py-2 rounded-lg border transition-all uppercase ${metalColor === m ? 'bg-white text-black border-white' : 'bg-zinc-900 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* SLIDERS FOR REFINING RENDERER */}
              <div className="space-y-4 pt-4 border-t border-white/[0.04]">
                
                {/* Auto spin speed */}
                {isAutoSpin && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-mono text-[9px] font-bold text-zinc-500 uppercase">
                      <span>Auto Spin Speed</span>
                      <span className="text-white">{spinSpeed.toFixed(1)}°/f</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="4.0"
                      step="0.1"
                      value={spinSpeed}
                      onChange={(e) => setSpinSpeed(parseFloat(e.target.value))}
                      className="w-full accent-lime-400 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}

                {/* Glossiness specular highlight intensity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[9px] font-bold text-zinc-500 uppercase">
                    <span>Specular Glossiness (Phong Light)</span>
                    <span className="text-white">{Math.round(glossiness * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={glossiness}
                    onChange={(e) => setGlossiness(parseFloat(e.target.value))}
                    className="w-full accent-lime-400 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Can scale multiplier */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[9px] font-bold text-zinc-500 uppercase">
                    <span>Render Scale</span>
                    <span className="text-white">{Math.round(canScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.75"
                    max="1.3"
                    step="0.05"
                    value={canScale}
                    onChange={(e) => setCanScale(parseFloat(e.target.value))}
                    className="w-full accent-lime-400 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Metallic brushed sheen checkbox */}
                <label className="flex items-center gap-3 bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 p-3 rounded-xl cursor-pointer select-none transition-all">
                  <input
                    type="checkbox"
                    checked={metalSheen}
                    onChange={(e) => setMetalSheen(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-white/10 text-lime-500 focus:ring-0 focus:ring-offset-0 bg-transparent"
                  />
                  <div>
                    <span className="block text-xs font-bold text-white uppercase tracking-wide">
                      Brushed Metallic Label Sheen
                    </span>
                    <span className="block text-[9px] text-zinc-500 font-mono leading-normal">
                      Simulates brushed radial aluminum lining across the cylinder surface
                    </span>
                  </div>
                </label>

              </div>

            </div>

          </div>

        </div>

        {/* DEVELOPER SOURCE EXPORTER & INSTRUCTIONS PANEL */}
        <div className="mt-16 rounded-2xl border border-white/[0.04] bg-zinc-950/65 backdrop-blur-xl overflow-hidden shadow-2xl">
          
          {/* Header & Exporter tabs */}
          <div className="bg-zinc-900/60 px-6 py-4 border-b border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-lime-400" />
              <div>
                <h3 className="font-display text-sm font-black text-white uppercase tracking-wider">
                  DEVELOPER INTEGRATION SUITE
                </h3>
                <p className="text-[10px] font-mono text-zinc-500 tracking-wider">
                  100% SEAMLESS REACT + TAILWIND STYLED WEB COMPONENT
                </p>
              </div>
            </div>

            {/* Code Navigation Tabs */}
            <div className="flex items-center gap-2 font-mono text-xs font-bold">
              <button
                onClick={() => setExportTab('how')}
                className={`px-4 py-2 rounded-lg border transition-all uppercase ${exportTab === 'how' ? 'bg-zinc-800 text-white border-white/10' : 'bg-transparent border-transparent text-zinc-500 hover:text-white'}`}
              >
                1. How to Use
              </button>
              <button
                onClick={() => setExportTab('code')}
                className={`px-4 py-2 rounded-lg border transition-all uppercase ${exportTab === 'code' ? 'bg-zinc-800 text-white border-white/10' : 'bg-transparent border-transparent text-zinc-500 hover:text-white'}`}
              >
                2. Component Source Code
              </button>
            </div>
          </div>

          {/* TAB CONTENT A: HOW TO USE */}
          {exportTab === 'how' && (
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="space-y-3">
                <div className="h-8 w-8 rounded-full bg-lime-500/10 text-lime-400 flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Create component file
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Create a new file in your project directory at <code className="text-lime-400 font-mono bg-zinc-900 px-1 py-0.5 rounded">src/components/ShowOnCan.tsx</code> and copy the complete source code from the next tab.
                </p>
              </div>

              <div className="space-y-3">
                <div className="h-8 w-8 rounded-full bg-lime-500/10 text-lime-400 flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Declare Tailwind v4 config
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  The cylinder utilizes standard hardware-accelerated CSS 3D transforms. Ensure your project has standard <strong className="text-zinc-300">Tailwind CSS</strong> configured with support for basic CSS perspective grids.
                </p>
              </div>

              <div className="space-y-3">
                <div className="h-8 w-8 rounded-full bg-lime-500/10 text-lime-400 flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Mount & Spin Anywhere
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Import the component and mount it with any active state controllers or interactive mouse pointers as we did here to drive the rotation live!
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setExportTab('code')}
                    className="inline-flex items-center gap-1.5 text-xs text-lime-400 font-bold hover:underline"
                  >
                    <span>View Component Code</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB CONTENT B: SOURCE CODE EXPANDED */}
          {exportTab === 'code' && (
            <div className="relative">
              
              {/* Overlay floating buttons */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-2 bg-black/80 hover:bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-xs font-bold font-mono tracking-wide text-zinc-300 hover:text-white transition-all shadow-md"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-lime-400" />
                      <span className="text-lime-400">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-400" />
                      <span>COPY ENTIRE FILE</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Pre container */}
              <div className="max-h-[500px] overflow-y-auto p-6 bg-[#0c0c0e] border-t border-white/[0.04]">
                <pre className="text-xs font-mono text-zinc-400 leading-relaxed select-text font-medium">
                  {getComponentCodeString()}
                </pre>
              </div>

            </div>
          )}

          {/* Exporter Footer */}
          <div className="bg-zinc-900/30 px-6 py-4 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-lime-400" />
              <span>Tested & Verified with React 18/19 & Tailwind CSS v4</span>
            </div>
            <span>ZERO-DEPENDENCY 3D ROTATING SYSTEM</span>
          </div>

        </div>

      </div>
    </section>
  );
}
