import React, { useState } from 'react';
import { Check, Copy, ChevronRight, Code2 } from 'lucide-react';

interface CanExporterProps {
  brandText: string;
  subName: string;
  tagline: string;
  themeHex: string;
  accentHex: string;
  metalColor: string;
  glossiness: number;
  metalSheen: boolean;
  exportTab: 'how' | 'code';
  onSetExportTab: (tab: 'how' | 'code') => void;
}

function getComponentCodeString(
  brandText: string,
  subName: string,
  tagline: string,
  themeHex: string,
  accentHex: string,
  metalColor: string,
  glossiness: number,
  metalSheen: boolean
) {
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
        background: \${metalSheen}
          ? \`linear-gradient(135deg, \${themeHex}dd 0%, \${themeHex}ff 50%, \${themeHex}cc 100%)\`
          : themeHex,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
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
              className="showoncan-face absolute top-0 bottom-0 overflow-hidden"
              style={{
                width: \`\${stripWidth}px\`,
                left: \`calc(50% - \${stripWidth / 2}px)\`,
                transform: \`rotateY(\${faceAngle}deg) translateZ(\${canRadius - 0.25}px)\`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                boxShadow: 'inset 1px 0 0 rgba(0,0,0,0.25), inset -1px 0 0 rgba(0,0,0,0.25)',
                '--d': \`\${1 - shadingIntensity}\`,
                '--r': \`\${rimIntensity * 0.4 * glossiness}\`,
              } as React.CSSProperties}
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

              <div
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-10"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)',
                  opacity: specularIntensity * glossiness,
                }}
              />
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
}

export default function CanExporter({
  brandText,
  subName,
  tagline,
  themeHex,
  accentHex,
  metalColor,
  glossiness,
  metalSheen,
  exportTab,
  onSetExportTab,
}: CanExporterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    const code = getComponentCodeString(brandText, subName, tagline, themeHex, accentHex, metalColor, glossiness, metalSheen);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
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

        <div className="flex items-center gap-2 font-mono text-xs font-bold">
          <button
            onClick={() => onSetExportTab('how')}
            className={`px-4 py-2 rounded-lg border transition-all uppercase ${exportTab === 'how' ? 'bg-zinc-800 text-white border-white/10' : 'bg-transparent border-transparent text-zinc-500 hover:text-white'}`}
          >
            1. How to Use
          </button>
          <button
            onClick={() => onSetExportTab('code')}
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
                onClick={() => onSetExportTab('code')}
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

          <div className="max-h-[500px] overflow-y-auto p-6 bg-[#0c0c0e] border-t border-white/[0.04]">
            <pre className="text-xs font-mono text-zinc-400 leading-relaxed select-text font-medium">
              {getComponentCodeString(brandText, subName, tagline, themeHex, accentHex, metalColor, glossiness, metalSheen)}
            </pre>
          </div>
        </div>
      )}

      {/* Exporter Footer */}
      <div className="bg-zinc-900/30 px-6 py-4 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 inline-flex items-center justify-center text-lime-400" dangerouslySetInnerHTML={{ __html: '&#10003;' }} />
          <span>Tested & Verified with React 18/19 & Tailwind CSS v4</span>
        </div>
        <span>ZERO-DEPENDENCY 3D ROTATING SYSTEM</span>
      </div>
    </>
  );
}
