/**
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductFlavor {
  id: string;
  name: string;
  subName: string;
  tagline: string;
  description: string;
  colorName: string; // 'purple' | 'lime' | 'pink' | 'emerald' | 'crimson' | 'neutral'
  themeHex: string;
  glowClass: string;
  accentTextClass: string;
  accentBgClass: string;
  accentBorderClass: string;
  imageUrl: string;
  volume: string;
  nutrition: {
    caffeine: string;
    sugar: string;
    calories: string;
    taurine: string;
    bVitamins: string;
  };
  features: string[];
}

export interface BentoItem {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  accentColor?: string;
}

export type PageId = 'home' | 'story' | 'products' | 'contact' | 'can3d';
