/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Sliders, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Settings2, 
  Palette, 
  FileCode, 
  Cpu,
  Move,
  Coffee,
  ExternalLink
} from 'lucide-react';
import ShowOnCan from './ShowOnCan';
import ThreeDCan from './ThreeDCan';

const CanExporter = React.lazy(() => import('./CanExporter'));

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
                    className="group relative flex items-center gap-3 rounded-lg border border-white/5 bg-zinc-900/60 hover:bg-zinc-900 px-4 py-3 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
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
                <Settings2 className="w-[18px] h-[18px] text-lime-400" />
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
                    className="w-[18px] h-[18px] rounded border-white/10 text-lime-500 focus:ring-0 focus:ring-offset-0 bg-transparent"
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
          <React.Suspense fallback={<div className="h-64 flex items-center justify-center text-zinc-600 text-xs font-mono">Loading exporter...</div>}>
            <CanExporter
              brandText={brandText}
              subName={subName}
              tagline={tagline}
              themeHex={themeHex}
              accentHex={accentHex}
              metalColor={metalColor}
              glossiness={glossiness}
              metalSheen={metalSheen}
              exportTab={exportTab}
              onSetExportTab={setExportTab}
            />
          </React.Suspense>
        </div>

      </div>
    </section>
  );
}
