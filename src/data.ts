/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductFlavor, BentoItem } from './types';

export const FLAVORS: ProductFlavor[] = [
  {
    id: 'double-litchi',
    name: 'DOUBLE LITCHI',
    subName: 'EXOTIQUE EXPLOSION',
    tagline: 'L\'ALTERNATIVE SAINE AUX SODAS CLASSIQUES.',
    description: 'Une explosion fruitée associant la douceur naturelle du litchi exotique aux bienfaits probiotiques du kombucha bio fermenté. Naturellement pétillant, sans édulcorants artificiels.',
    colorName: 'purple',
    themeHex: '#b512fa',
    glowClass: 'text-glow-purple',
    accentTextClass: 'text-purple-400',
    accentBgClass: 'bg-purple-600',
    accentBorderClass: 'border-purple-500/30',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkIfgzi_EHBXBy7koQvHFMBJaV0yxygp4uvQwvMIugYjkILoANcM29lW9vkKE3lYTeV9AkzpJHaTv02xRAwjv4vXuBp_JmsT0QJjJUxbxfdfmV_sab9epNnR1vlmeCKBhrYJYtdDQlzDO5-f3jEYg7bNiug63jT9n8WucUurgHRVTH2T_Ybu3I6WH1_P5DHq4y-kxuHX6ycyl6xobvXew0MRuHhLxCVqKig9cFVCbOsSHZip42UOBPQAjaN9tqCYr0v_Dfomq3Ye7y',
    volume: '250ml',
    nutrition: {
      caffeine: '150mg',
      sugar: '2.5g',
      calories: '15 kcal',
      taurine: '1000mg',
      bVitamins: '250% DV'
    },
    features: ['Vrai Extrait de Litchi', 'Riche en Probiotiques Bio', 'Sans Colorants Artificiels']
  },
  {
    id: 'kiwi-concombre',
    name: 'KIWI CONCOMBRE',
    subName: 'FRAÎCHEUR ULTIME',
    tagline: 'LE DUO ULTRA-DÉSALTÉRANT ET ACIDULÉ.',
    description: 'Une alliance rafraîchissante de kiwi vert juteux et de concombre croquant infusés de thé vert fermenté. Conçu pour réveiller vos sens et vos papilles saines.',
    colorName: 'lime',
    themeHex: '#84cc16',
    glowClass: 'text-glow-lime',
    accentTextClass: 'text-lime-400',
    accentBgClass: 'bg-lime-500',
    accentBorderClass: 'border-lime-500/30',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeQFkuH44si6cePQpN4a9mhnxPb0hlDqIjQjNAoe-oSWuHBz6yPzQJ8MQM4VKk1e3LkOco1YtwF6KLQOjfYaGekh5uf5Fk6iEP3BsfpCja2zA20TT6iFCcTMTeKzfmPdhTiae1FDexMZeK7-9zY5C37Y_9rEuGEXEHH6_1IrXQbIdGd569bxoYce5aJP7evFhgG9ND7LDtM99hViIHe_kdbA3725zJrgaXURvACiVHg1PvKrtK68FvB2TKDWqFl4nVTTk88VuGl6Zk',
    volume: '330ml',
    nutrition: {
      caffeine: '160mg',
      sugar: '2.8g',
      calories: '18 kcal',
      taurine: '1200mg',
      bVitamins: '300% DV'
    },
    features: ['Kiwi Vert Bio', 'Concombre Distillé', 'Thé Vert Antioxydant']
  },
  {
    id: 'coco-citron-vert',
    name: 'COCO CITRON VERT',
    subName: 'BRISE EXOTIQUE',
    tagline: 'UN VENT DE PARADIS SAIN ET ACIDULÉ.',
    description: 'La rondeur onctueuse de l\'eau de coco mariée à la vivacité du citron vert pressé. Un voyage gustatif sain, tonifiant, et débordant de vitalité naturelle.',
    colorName: 'cyan',
    themeHex: '#06b6d4',
    glowClass: 'text-glow-cyan',
    accentTextClass: 'text-cyan-400',
    accentBgClass: 'bg-cyan-600',
    accentBorderClass: 'border-cyan-500/30',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4rAOiuIlfRQbJkTbI9teDgRnNcFPOaXKATwjRyNd7eorLhOHUhC0ruq083s02sTxvzWtGITZEMl-1AyT8B3Ur_P1WGbofGSK6SsBu_9A5Pq1vJXtbfrdOqb3gkVTCalRWutTOnuT_FNL5G673kGyyyrg5g69cuY0oZGU7hbFwETGBOrOlmPPsnnkt0KoP1HaOE-xh3Avt15C5Z9pUUc0CNLe2R2dd_CCOunr3Je6PcvKyM6P3MyCY3_AAwBwYplnvwOujmeRXyR9m',
    volume: '250ml',
    nutrition: {
      caffeine: '150mg',
      sugar: '2.4g',
      calories: '14 kcal',
      taurine: '1000mg',
      bVitamins: '250% DV'
    },
    features: ['Eau de Coco Pure', 'Zeste de Citron Vert', 'Active Kombucha Culture']
  },
  {
    id: 'peche-blanche',
    name: 'PÊCHE BLANCHE',
    subName: 'DOUCEUR FRUITÉE',
    tagline: 'LA CHAIR PARFUMÉE D\'UNE PÊCHE SANS SOUCI.',
    description: 'La saveur suave et parfumée de pêches blanches mûries au soleil fusionnée avec notre kombucha artisanal bio. Un délice rafraîchissant à savourer à chaque instant.',
    colorName: 'orange',
    themeHex: '#f97316',
    glowClass: 'text-glow-orange',
    accentTextClass: 'text-orange-400',
    accentBgClass: 'bg-orange-500',
    accentBorderClass: 'border-orange-500/30',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWPPMHz4OWBq6hgtlWsh5BtJFbzWr7b5atqTcCANjpYzxHYDSS36io06gumZEdxMI8Jxdm0n1obsnVj2nZLc_GnQehRl9s6anKV6GRLKa43z36QfPqL-yN69Df_ncgTeZDRBWr4b-JC7hvCUe9f10P7GMl8nLlUB8qIn4fV-pgJGpdb3aNUBwns0aK9YiCWgsLYIT6F2NxKDenOEfcbHg_EAulc6qEp0TOwlzaqNfY8dGrthKJldDU48oYad5TPlO6eBb61N5M9f6Q',
    volume: '330ml',
    nutrition: {
      caffeine: '140mg',
      sugar: '2.9g',
      calories: '16 kcal',
      taurine: '800mg',
      bVitamins: '200% DV'
    },
    features: ['Vraie Pêche Blanche', 'Équilibre Sucre-Acidité', 'Fermentation Naturelle']
  },
  {
    id: 'pomme-rhubarbe',
    name: 'POMME RHUBARBE',
    subName: 'ÉQUILIBRE ACIDULÉ',
    tagline: 'L\'ACCORD AUDACIEUX ENTRE DOUCEUR ET ACIDITÉ.',
    description: 'Le mariage parfait d\'une pomme rouge croquante et d\'une rhubarbe intensément acidulée. Une recette vivifiante pour faire le plein de fraîcheur et d\'énergie naturelle.',
    colorName: 'pink',
    themeHex: '#f43f5e',
    glowClass: 'text-glow-pink',
    accentTextClass: 'text-rose-400',
    accentBgClass: 'bg-rose-600',
    accentBorderClass: 'border-rose-500/30',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDookbVCvi6gAo7THKdwbIzF9zoTtTAjJOubZEf2G5ltJPi3e8AtFkXkLPZj_Erm0YJA1cvG2wGDuN_4LWMdEapGd6sk4dqL_9nBbmekzz9sEyBPLdy3pGJsUZNhVUZYbwdXXejDnSsoPlHCSuGq6D4MM3J3rGzeNeX1ANwzs_xZA0T70siI99_pKLibgrwYIQlJzz6cO_pk_M0N26eAo5DIZwseyS49_CO4KB2oI4ctRhpZ48VHRIZ1vMmS96nlgA-BsUANvMsUJuR',
    volume: '250ml',
    nutrition: {
      caffeine: '145mg',
      sugar: '2.6g',
      calories: '14 kcal',
      taurine: '900mg',
      bVitamins: '220% DV'
    },
    features: ['Pomme Rouge Pressée', 'Rhubarbe Sauvage', '100% Probiotiques Actifs']
  }
];

export const BENTO_STORY_ITEMS: BentoItem[] = [
  {
    id: 'raw-origin',
    category: 'NATURALNESS',
    title: 'RAW ORIGIN',
    subtitle: 'Litchi & Botanic Bio-Harvest',
    description: 'Harvested from pristine, sustainably sourced mountain groves. No chemistry labs, no synthetic shortcuts, no corporate white lies. Just pure soil, clean water, and extreme energy.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZoipZjJfjD1hJAkhvDoCfQp1G1UgBjY_DuYv0oCByZJDwF_bgf4pRAj3pXRM7Etui9z_XkrlK-Uz1GSfMgZolkE7JlG8W6Qfap3GjfkJOoyUTfeYW-p-qD7Pr9EdUuB52HdAeXJu3Z-Rjs46Y5YquoqBk3CiZRzKDz-bMllcA6e6CpR-1GvAPkOuj1E8TRJsDwf4NzxrKZISmMllK8haD0PuP2QgNbFhpPCgFk2AHXTUirNmiAAjrIrpg6JpYA-3gaYxfE2HGxxx4',
    accentColor: 'text-purple-400'
  },
  {
    id: 'zero-synthetics',
    category: 'INTEGRITY',
    title: 'ZERO SYNTHETICS',
    subtitle: 'Pure Power Bio-Engineered',
    description: 'Engineered with plant-derived L-Theanine, clean natural tea extracts, and pure taurine. We banish artificial sweeteners, chemical food colorings, and mystery crash powders.',
    accentColor: 'text-lime-400'
  }
];

export const INGREDIENTS_DNA = [
  { name: 'Pure Water', percent: 84, description: 'Alpine-filtered high-electrolyte base' },
  { name: 'Organic Fruit Concentrate', percent: 10, description: 'True, cold-pressed plant essences' },
  { name: 'Natural Co-stimulants', percent: 4, description: 'Green tea extract, Ginseng, & Guarana seeds' },
  { name: 'Biotic Enhancers', percent: 2, description: 'Pure Taurine, L-Theanine & B-Vitamins' }
];

export const SCIENCE_METRICS = [
  { label: 'Clean Sources', value: '100%', detail: 'All ingredients ethically wild-harvested' },
  { label: 'Zero Crash', value: '0mg', detail: 'Chemical binders that cause lethargy' },
  { label: 'Batch Standard', value: 'B-004', detail: 'Tested inside our Milan R&D Facility' }
];

export const OFFICE_LOCATIONS = [
  { city: 'MILAN, ITALY', type: 'GLOBAL HQ & R&D LAB', address: 'Via della Moscova, 34, 20121 Milano', phone: '+39 02 8821 5422' },
  { city: 'NEW YORK, USA', type: 'CULTURE & DISTRIBUTION', address: '55 Hudson Yards, New York, NY 10001', phone: '+1 (212) 555-0143' }
];

export const BRAND_INFO = {
  name: "MD SHAWON MOLLA",
  username: "shawon2210",
  tagline: "Full-Stack Developer & 3D Web Creative",
  location: "Bangladesh",
  email: "shawonshanto104141@gmail.com",
  phone: "01766998555",
  github: "https://github.com/shawon2210",
};

export const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/shawon2210" },
  { name: "Email", url: "mailto:shawonshanto104141@gmail.com" }
];

