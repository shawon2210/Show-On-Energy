/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";
import { Move, Sparkles } from "lucide-react";
import { ProductFlavor } from "../types";

export interface CustomCanSpecs {
  brandText: string;
  subName: string;
  tagline: string;
  themeHex: string;
  accentHex: string;
  metalColor?: 'silver' | 'gold' | 'copper' | 'dark';
  volume?: string;
  caffeine?: string;
  sugar?: string;
  taurine?: string;
  bVitamins?: string;
  calories?: string;
}

interface ThreeDCanProps {
  currentFlavor?: ProductFlavor;
  customSpecs?: CustomCanSpecs;
  isAutoSpin?: boolean;
  spinSpeed?: number;
  glossiness?: number;
  metalSheen?: boolean;
}

interface CanLabelSpecs {
  name: string;
  subName: string;
  tagline: string;
  themeHex: string;
  accentHex: string;
  volume: string;
  caffeine: string;
  sugar: string;
  taurine: string;
  bVitamins: string;
  calories: string;
}

/**
 * Draws a high-fidelity flat brand label containing vector borders, barcodes, side warnings,
 * the majestic centralized main logo, and a detailed nutrition facts box.
 * This canvas is dynamically mapped onto the 3D cylinder.
 */
function drawCanLabel(canvas: HTMLCanvasElement, specs: CanLabelSpecs) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // 1. Solid can body theme background
  ctx.fillStyle = specs.themeHex;
  ctx.fillRect(0, 0, w, h);

  // 2. Linear gradient simulation of cylindrical reflection
  const cylinderGrad = ctx.createLinearGradient(0, 0, w, 0);
  cylinderGrad.addColorStop(0, "rgba(0,0,0,0.22)");
  cylinderGrad.addColorStop(0.2, "rgba(255,255,255,0.12)");
  cylinderGrad.addColorStop(0.4, "rgba(0,0,0,0.06)");
  cylinderGrad.addColorStop(0.6, "rgba(255,255,255,0.22)");
  cylinderGrad.addColorStop(0.8, "rgba(0,0,0,0.14)");
  cylinderGrad.addColorStop(1, "rgba(0,0,0,0.22)");

  ctx.fillStyle = cylinderGrad;
  ctx.fillRect(0, 0, w, h);

  // 3. Brushed aluminum vertical fine grain
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  for (let i = 0; i < w; i += 3) {
    if (Math.random() > 0.4) {
      ctx.fillRect(i, 0, 1 + Math.random() * 2, h);
    }
  }
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  for (let i = 0; i < w; i += 3) {
    if (Math.random() > 0.4) {
      ctx.fillRect(i, 0, 1 + Math.random() * 2, h);
    }
  }

  // 4. Tech grid patterns
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  const gridSize = 32;
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // ==========================================
  // SECTION A: LEFT SIDE (0px to 300px) - WARNINGS & BARCODES
  // ==========================================
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  ctx.beginPath();
  ctx.moveTo(300, 20);
  ctx.lineTo(300, h - 20);
  ctx.stroke();

  // Header
  ctx.fillStyle = specs.accentHex || "#ffffff";
  ctx.font = "bold 13px monospace";
  ctx.fillText("LAB FORMULA // ENERGY CELL", 25, 45);

  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.fillRect(25, 58, 250, 1);

  // Warning Text
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "9px monospace";
  const warnings = [
    "WARNING: HIGH ACTIVE VITAMIN CONCENTRATE.",
    "CONFORMS TO STRICT BIO-ENERGY STANDARDS.",
    "100% ETHICALLY HARVESTED COMBINATIONS.",
    "STORAGE: COOL FLUID ENVIRONMENT.",
    "DO NOT AGITATE BEFORE COLD ACTIVATION."
  ];
  warnings.forEach((line, idx) => {
    ctx.fillText(line, 25, 82 + idx * 16);
  });

  // Barcode card
  ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
  ctx.fillRect(25, 340, 150, 85);
  ctx.fillStyle = "#000000";
  const barcodePattern = [2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2];
  let currX = 35;
  barcodePattern.forEach((width) => {
    ctx.fillRect(currX, 350, width * 2, 50);
    currX += width * 2 + 3;
  });
  ctx.font = "bold 9px monospace";
  ctx.fillText("0 074213 892601", 38, 415);

  // Recyclable aluminum badge
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.beginPath();
  ctx.arc(240, 385, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = specs.accentHex || "#ffffff";
  ctx.font = "bold 10px monospace";
  ctx.textAlign = "center";
  ctx.fillText("ALU", 240, 388);
  ctx.font = "7px monospace";
  ctx.fillText("RECYCLABLE", 240, 420);
  ctx.restore();

  // ==========================================
  // SECTION B: MAIN MIDDLE (300px to 724px) - LOGO BRANDING
  // ==========================================
  ctx.save();
  const midX = 512;

  // Star Slogan Top
  ctx.textAlign = "center";
  ctx.fillStyle = specs.accentHex || "#ffffff";
  ctx.font = "bold 13px monospace";
  ctx.fillText("★ ACTIVE ORGANIC ENERGY ★", midX, 70);

  // Design borders
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(325, 40, 374, h - 80);

  // Elegant circles behind main logo
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.beginPath();
  ctx.arc(midX, h / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(midX, h / 2, 130, 0, Math.PI * 2);
  ctx.stroke();

  // Subname label
  ctx.fillStyle = specs.accentHex || "rgba(255, 255, 255, 0.85)";
  ctx.font = "bold 13px monospace";
  ctx.fillText(specs.subName.toUpperCase(), midX, 130);

  // Majestic Giant Brand Name
  ctx.fillStyle = specs.accentHex || "#ffffff";
  ctx.font = '900 60px "Impact", "Arial Black", "Helvetica Neue", sans-serif';
  ctx.fillText(specs.name, midX, 235);

  // Horizontal divider
  ctx.fillStyle = specs.accentHex || "#ffffff";
  ctx.fillRect(midX - 100, 265, 200, 3);

  // Tagline Probiotics Label
  ctx.font = "bold 11px monospace";
  ctx.fillText("PROBIOTIC ENERGY CELL", midX, 305);

  // Sub slogan description
  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.font = "italic 11px monospace";
  const taglineWords = (specs.tagline || "").split(" ");
  let line = "";
  let yPos = 350;
  taglineWords.forEach((word) => {
    if ((line + word).length > 36) {
      ctx.fillText(line.toUpperCase(), midX, yPos);
      line = word + " ";
      yPos += 18;
    } else {
      line += word + " ";
    }
  });
  if (line) {
    ctx.fillText(line.toUpperCase(), midX, yPos);
  }

  // Volume text at bottom
  ctx.fillStyle = specs.accentHex || "#ffffff";
  ctx.font = "bold 14px monospace";
  ctx.fillText(`VOLUME: ${specs.volume} e`, midX, 450);
  ctx.restore();

  // ==========================================
  // SECTION C: RIGHT SIDE (724px to 1024px) - NUTRITION FACTS
  // ==========================================
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  ctx.beginPath();
  ctx.moveTo(724, 20);
  ctx.lineTo(724, h - 20);
  ctx.stroke();

  // Nutrition Facts panel
  ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
  ctx.fillRect(750, 40, 240, 430);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
  ctx.strokeRect(750, 40, 240, 430);

  ctx.fillStyle = specs.accentHex || "#ffffff";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText("Nutrition Facts", 765, 75);

  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fillRect(765, 88, 210, 1);

  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = "11px monospace";
  ctx.fillText(`Serving Size: 1 Can (${specs.volume})`, 765, 110);

  ctx.fillStyle = specs.accentHex || "#ffffff";
  ctx.fillRect(765, 122, 210, 3);

  ctx.fillText("Amount per serving", 765, 142);
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("Calories", 765, 172);
  ctx.textAlign = "right";
  ctx.fillText(specs.calories, 975, 172);
  ctx.textAlign = "left";

  ctx.fillStyle = specs.accentHex || "#ffffff";
  ctx.fillRect(765, 185, 210, 2);

  const nutrRows = [
    { label: "Caffeine", value: specs.caffeine },
    { label: "Sugar", value: specs.sugar },
    { label: "Taurine", value: specs.taurine },
    { label: "B-Vitamins", value: specs.bVitamins }
  ];

  ctx.font = "bold 12px monospace";
  nutrRows.forEach((row, idx) => {
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText(row.label, 765, 215 + idx * 30);
    ctx.textAlign = "right";
    ctx.fillText(row.value, 975, 215 + idx * 30);
    ctx.textAlign = "left";

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.fillRect(765, 226 + idx * 30, 210, 1);
  });

  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "italic 9px monospace";
  ctx.fillText("* Percent values are based on active", 765, 345);
  ctx.fillText("  organic biological formulas.", 765, 360);

  // Milan formula stamp
  ctx.fillStyle = specs.accentHex || "#ffffff";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.strokeRect(765, 395, 210, 50);
  ctx.font = "bold 11px monospace";
  ctx.fillText("BATCH: B-004 // CULTURES: LIVE", 776, 415);
  ctx.fillText("FORMULATED IN MILAN LABS", 776, 432);

  ctx.restore();
}

export default function ThreeDCan({
  currentFlavor,
  customSpecs,
  isAutoSpin = true,
  spinSpeed = 1.2,
  glossiness = 0.85,
  metalSheen = true
}: ThreeDCanProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Refs to hold Three.js objects across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const canGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particleGeoRef = useRef<THREE.BufferGeometry | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const canMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const rimMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const canTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const mountedRef = useRef(false);

  // State refs to share variables between touch drag events and render frames
  const dragRef = useRef({
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRotationY: 0,
    targetRotationX: 0.1,
    currentRotationY: 0,
    currentRotationX: 0.1,
    spinVelocity: 0.006,
    floatTime: 0
  });

  // Effect 1: Setup Three.js scene (runs once on mount)
  useEffect(() => {
    if (hasError) return;
    const currentMount = mountRef.current;
    if (!currentMount) return;

    mountedRef.current = true;
    setHasError(false);

    // Remove any existing canvas
    const existingCanvas = currentMount.querySelector('canvas');
    if (existingCanvas) {
      currentMount.removeChild(existingCanvas);
    }

    try {
      const width = currentMount.clientWidth || 280;
      const height = currentMount.clientHeight || 460;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x050505, 0.025);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0.1, 5.2);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      currentMount.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.42);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
      dirLight.position.set(4, 5, 4);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      scene.add(dirLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.45);
      fillLight.position.set(-4, 2, -4);
      scene.add(fillLight);

      const specs: CanLabelSpecs = {
        name: customSpecs?.brandText || currentFlavor?.name || "SHOWON",
        subName: customSpecs?.subName || currentFlavor?.subName || "EXOTIQUE BURST",
        tagline: customSpecs?.tagline || currentFlavor?.tagline || "MOLECULAR ENERGY CELL",
        themeHex: customSpecs?.themeHex || currentFlavor?.themeHex || "#b512fa",
        accentHex: customSpecs?.accentHex || "#ffffff",
        volume: customSpecs?.volume || currentFlavor?.volume || "250ml",
        caffeine: customSpecs?.caffeine || currentFlavor?.nutrition?.caffeine || "150mg",
        sugar: customSpecs?.sugar || currentFlavor?.nutrition?.sugar || "2.5g",
        taurine: customSpecs?.taurine || currentFlavor?.nutrition?.taurine || "1000mg",
        bVitamins: customSpecs?.bVitamins || currentFlavor?.nutrition?.bVitamins || "250% DV",
        calories: customSpecs?.calories || currentFlavor?.nutrition?.calories || "15 kcal"
      };

      const flavorThemeColor = new THREE.Color(specs.themeHex);

      const pointLight = new THREE.PointLight(flavorThemeColor, 1.6, 12, 1.5);
      pointLight.position.set(0, -1, 3);
      scene.add(pointLight);
      pointLightRef.current = pointLight;

      const pointLightBack = new THREE.PointLight(flavorThemeColor, 0.8, 8, 2);
      pointLightBack.position.set(-3, 3, -3);
      scene.add(pointLightBack);

      // Texture
      const labelCanvas = document.createElement("canvas");
      labelCanvas.width = 1024;
      labelCanvas.height = 512;
      drawCanLabel(labelCanvas, specs);

      const canTexture = new THREE.CanvasTexture(labelCanvas);
      canTexture.colorSpace = THREE.SRGBColorSpace;
      canTexture.wrapS = THREE.RepeatWrapping;
      canTexture.wrapT = THREE.ClampToEdgeWrapping;
      canTextureRef.current = canTexture;

      const metalColors = {
        silver: 0xcccccc,
        gold: 0xd4af37,
        copper: 0xb87333,
        dark: 0x222222,
      };
      const rimColorValue = metalColors[customSpecs?.metalColor || "silver"] || 0xcccccc;

      const canMaterial = new THREE.MeshPhysicalMaterial({
        map: canTexture,
        roughness: 0.35 - (glossiness * 0.25),
        metalness: metalSheen ? 0.9 : 0.4,
        clearcoat: glossiness,
        clearcoatRoughness: 0.12 - (glossiness * 0.08)
      });
      canMaterialRef.current = canMaterial;

      const rimMaterial = new THREE.MeshStandardMaterial({
        color: rimColorValue,
        roughness: 0.25,
        metalness: 0.95
      });
      rimMaterialRef.current = rimMaterial;

      // Build can group
      const canGroup = new THREE.Group();
      scene.add(canGroup);
      canGroupRef.current = canGroup;

      const labelGeo = new THREE.CylinderGeometry(0.85, 0.85, 2.65, 64, 1, true);
      const labelMesh = new THREE.Mesh(labelGeo, canMaterial);
      labelMesh.castShadow = true;
      labelMesh.receiveShadow = true;
      canGroup.add(labelMesh);

      const neckGeo = new THREE.CylinderGeometry(0.78, 0.85, 0.12, 64, 1, true);
      const neckMesh = new THREE.Mesh(neckGeo, rimMaterial);
      neckMesh.position.y = 1.385;
      canGroup.add(neckMesh);

      const topRimGeo = new THREE.CylinderGeometry(0.8, 0.78, 0.05, 64);
      const topRimMesh = new THREE.Mesh(topRimGeo, rimMaterial);
      topRimMesh.position.y = 1.465;
      canGroup.add(topRimMesh);

      const lidGeo = new THREE.CylinderGeometry(0.78, 0.78, 0.02, 64);
      const lidMesh = new THREE.Mesh(lidGeo, rimMaterial);
      lidMesh.position.y = 1.455;
      canGroup.add(lidMesh);

      const tabGeo = new THREE.BoxGeometry(0.12, 0.015, 0.22);
      const tabMesh = new THREE.Mesh(tabGeo, rimMaterial);
      tabMesh.position.set(0, 1.47, 0.2);
      tabMesh.rotation.x = 0.08;
      canGroup.add(tabMesh);

      const bottomNeckGeo = new THREE.CylinderGeometry(0.85, 0.76, 0.12, 64, 1, true);
      const bottomNeckMesh = new THREE.Mesh(bottomNeckGeo, rimMaterial);
      bottomNeckMesh.position.y = -1.385;
      canGroup.add(bottomNeckMesh);

      const bottomRimGeo = new THREE.CylinderGeometry(0.76, 0.76, 0.04, 64);
      const bottomRimMesh = new THREE.Mesh(bottomRimGeo, rimMaterial);
      bottomRimMesh.position.y = -1.455;
      canGroup.add(bottomRimMesh);

      // Particles
      const particleCount = 42;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.2 + Math.random() * 1.8;
        const y = (Math.random() - 0.5) * 4.2;
        particlePositions[i * 3] = Math.cos(angle) * radius;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      particleGeoRef.current = particleGeo;

      const particleMaterial = new THREE.PointsMaterial({
        color: flavorThemeColor,
        size: 0.035,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });

      const particles = new THREE.Points(particleGeo, particleMaterial);
      scene.add(particles);
      particlesRef.current = particles;

      // Animation loop
      let animationId: number;
      const animate = () => {
        if (!mountedRef.current) return;
        animationId = requestAnimationFrame(animate);

        const drag = dragRef.current;
        const cg = canGroupRef.current;
        const pg = particleGeoRef.current;
        const pl = pointLightRef.current;
        const ren = rendererRef.current;
        const cam = cameraRef.current;
        const sc = sceneRef.current;
        if (!cg || !pg || !pl || !ren || !cam || !sc) return;

        drag.currentRotationY += (drag.targetRotationY - drag.currentRotationY) * 0.09;
        drag.currentRotationX += (drag.targetRotationX - drag.currentRotationX) * 0.09;

        if (!drag.isDragging) {
          drag.targetRotationY += drag.spinVelocity;
        }

        cg.rotation.y = drag.currentRotationY;
        cg.rotation.x = drag.currentRotationX;

        drag.floatTime += 0.012;
        cg.position.y = Math.sin(drag.floatTime) * 0.08;

        const positions = pg.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3 + 1;
          positions[idx] += 0.006;
          if (positions[idx] > 2.2) {
            positions[idx] = -2.2;
          }
        }
        pg.attributes.position.needsUpdate = true;

        pl.position.x = Math.sin(drag.floatTime * 0.5) * 1.5;
        pl.position.z = Math.cos(drag.floatTime * 0.5) * 2 + 1;

        ren.render(sc, cam);
      };

      animate();

      // Resize observer
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: newW, height: newH } = entry.contentRect;
          if (cameraRef.current && rendererRef.current) {
            cameraRef.current.aspect = newW / newH;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(newW, newH);
          }
        }
      });
      resizeObserver.observe(currentMount);

      return () => {
        mountedRef.current = false;
        cancelAnimationFrame(animationId);
        resizeObserver.unobserve(currentMount);
        resizeObserver.disconnect();

        if (renderer.domElement.parentNode === currentMount) {
          currentMount.removeChild(renderer.domElement);
        }

        labelGeo.dispose();
        neckGeo.dispose();
        topRimGeo.dispose();
        lidGeo.dispose();
        tabGeo.dispose();
        bottomNeckGeo.dispose();
        bottomRimGeo.dispose();
        canTexture.dispose();
        canMaterial.dispose();
        rimMaterial.dispose();
        particleGeo.dispose();
        particleMaterial.dispose();
        renderer.dispose();

        sceneRef.current = null;
        cameraRef.current = null;
        rendererRef.current = null;
        canGroupRef.current = null;
        particlesRef.current = null;
        particleGeoRef.current = null;
        pointLightRef.current = null;
        canMaterialRef.current = null;
        rimMaterialRef.current = null;
        canTextureRef.current = null;
      };
    } catch (err) {
      console.error('ThreeDCan: Failed to initialize Three.js scene', err);
      setHasError(true);
    }
    // Intentionally runs only once — setup effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect 2: Update texture, materials, lights when props change (no scene teardown)
  useEffect(() => {
    const canTex = canTextureRef.current;
    const canMat = canMaterialRef.current;
    const rimMat = rimMaterialRef.current;
    const pl = pointLightRef.current;
    if (!canTex || !canMat || !rimMat || !pl) return;

    const themeHex = customSpecs?.themeHex || currentFlavor?.themeHex || "#b512fa";
    const accentHex = customSpecs?.accentHex || "#ffffff";

    const specs: CanLabelSpecs = {
      name: customSpecs?.brandText || currentFlavor?.name || "SHOWON",
      subName: customSpecs?.subName || currentFlavor?.subName || "EXOTIQUE BURST",
      tagline: customSpecs?.tagline || currentFlavor?.tagline || "MOLECULAR ENERGY CELL",
      themeHex,
      accentHex,
      volume: customSpecs?.volume || currentFlavor?.volume || "250ml",
      caffeine: customSpecs?.caffeine || currentFlavor?.nutrition?.caffeine || "150mg",
      sugar: customSpecs?.sugar || currentFlavor?.nutrition?.sugar || "2.5g",
      taurine: customSpecs?.taurine || currentFlavor?.nutrition?.taurine || "1000mg",
      bVitamins: customSpecs?.bVitamins || currentFlavor?.nutrition?.bVitamins || "250% DV",
      calories: customSpecs?.calories || currentFlavor?.nutrition?.calories || "15 kcal"
    };

    // Redraw label
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 1024;
    labelCanvas.height = 512;
    drawCanLabel(labelCanvas, specs);
    canTex.image = labelCanvas;
    canTex.needsUpdate = true;

    // Update material properties
    canMat.roughness = 0.35 - (glossiness * 0.25);
    canMat.metalness = metalSheen ? 0.9 : 0.4;
    canMat.clearcoat = glossiness;
    canMat.clearcoatRoughness = 0.12 - (glossiness * 0.08);
    canMat.needsUpdate = true;

    // Update rim color
    const metalColors = {
      silver: 0xcccccc,
      gold: 0xd4af37,
      copper: 0xb87333,
      dark: 0x222222,
    };
    rimMat.color.setHex(metalColors[customSpecs?.metalColor || "silver"] || 0xcccccc);

    // Update point light color
    pl.color.set(themeHex);
  }, [
    currentFlavor?.id,
    customSpecs?.brandText,
    customSpecs?.subName,
    customSpecs?.tagline,
    customSpecs?.themeHex,
    customSpecs?.accentHex,
    customSpecs?.metalColor,
    customSpecs?.volume,
    customSpecs?.caffeine,
    customSpecs?.sugar,
    customSpecs?.taurine,
    customSpecs?.bVitamins,
    customSpecs?.calories,
    glossiness,
    metalSheen
  ]);

  // Effect 3: Update spin velocity
  useEffect(() => {
    dragRef.current.spinVelocity = isAutoSpin ? spinSpeed * 0.005 : 0;
  }, [isAutoSpin, spinSpeed]);

  // Effect 4: Flavor change — trigger spin boost
  useEffect(() => {
    dragRef.current.targetRotationY += Math.PI * 2;
  }, [currentFlavor?.id, customSpecs?.brandText]);

  if (hasError) {
    return (
      <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] h-[420px] xs:h-[480px] sm:h-[540px] flex items-center justify-center select-none">
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center">
            <span className="text-rose-400 text-xs font-bold">!</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-600">3D UNAVAILABLE</span>
        </div>
      </div>
    );
  }

  // L. INTERACTIVE POINTER MECHANICS
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!mountRef.current) return;
    
    mountRef.current.setPointerCapture(e.pointerId);
    setIsDragging(true);

    const drag = dragRef.current;
    drag.isDragging = true;
    drag.prevMouseX = e.clientX;
    drag.prevMouseY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    
    if (drag.isDragging) {
      const deltaX = e.clientX - drag.prevMouseX;
      const deltaY = e.clientY - drag.prevMouseY;

      drag.targetRotationY += deltaX * 0.009;
      drag.targetRotationX = Math.max(-0.4, Math.min(0.4, drag.targetRotationX + deltaY * 0.008));

      drag.prevMouseX = e.clientX;
      drag.prevMouseY = e.clientY;
    } else if (mountRef.current) {
      // Gentle cursor-following tilt (micro-interactive parallax)
      const rect = mountRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

      drag.targetRotationX = relativeY * 0.35 + 0.1;
      drag.targetRotationY += relativeX * 0.002;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (mountRef.current) {
      mountRef.current.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
    dragRef.current.isDragging = false;
  };

  return (
    <div
      ref={mountRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
        dragRef.current.isDragging = false;
        dragRef.current.targetRotationX = 0.1; // decay to default neutral angle
      }}
      className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] h-[420px] xs:h-[480px] sm:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none outline-none touch-none"
    >
      {/* Dynamic Ambient Blur Glow behind the WebGL Canvas */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentFlavor?.id || customSpecs?.brandText || 'default-glow'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.28, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
          className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full blur-[80px] sm:blur-[100px] pointer-events-none -z-10"
          style={{
            backgroundColor: customSpecs?.themeHex || currentFlavor?.themeHex || "#b512fa"
          }}
        />
      </AnimatePresence>

      {/* Hover Instruction Badge */}
      <AnimatePresence>
        {isHovered && !isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-4 z-20 flex items-center gap-2 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.5)] text-zinc-300 font-mono text-[9px] font-bold tracking-widest pointer-events-none select-none uppercase"
          >
            <Move className="w-3 h-3 text-lime-400 animate-pulse" />
            <span>DRAG TO ROTATE 3D</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
