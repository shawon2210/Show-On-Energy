# SHOW ON ENERGY

**Premium active organic energy drinks — Interactive 3D can design lab and molecular energy blends.**

A high-performance React SPA with real-time Three.js 3D rendering, a PWA-powered storefront, and a full-featured 3D can design studio with live preview and code export.

**Live site:** [https://show-on-energy.vercel.app](https://show-on-energy.vercel.app)

---

## Features

- **Interactive 3D Product Viewer** — WebGL-powered rotating can display with dynamic label rendering, real-time Phong shading, specular highlights, and rim lighting
- **3D Can Design Lab** — Customize brand text, colors, metal finishes (silver, gold, copper, dark), glossiness, and export the component as standalone React/Tailwind source code
- **Offline-First PWA** — Service worker with precaching, runtime caching for Google-hosted images and fonts, installable on mobile/desktop
- **Route-Level Code Splitting** — Lazy-loaded route components with React.Suspense for optimal initial bundle size
- **Accessible** — Keyboard navigation (Escape, arrow keys, Enter/Space), ARIA attributes (dialog, modal, expanded, live regions), focus management in modals
- **Responsive Design** — Mobile-first layout using Tailwind CSS v4, adaptive grid system
- **Shopping Cart** — Client-side cart with quantity controls, checkout flow with validation
- **SEO Optimized** — Open Graph, Twitter Card, JSON-LD structured data, canonical URL, robots meta

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + TypeScript 5.8 |
| **Bundler** | Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **3D Rendering** | Three.js 0.185 |
| **Animation** | Motion (Framer Motion) v12 |
| **Icons** | Lucide React |
| **PWA** | vite-plugin-pwa (Workbox) |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Environment

Copy `.env.example` to `.env.local` and add your Gemini API key (required for the contact form).

```env
GEMINI_API_KEY=your_key_here
APP_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000)

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type checking (`tsc --noEmit`) |
| `npm run lint:eslint` | ESLint static analysis |
| `npm run clean` | Remove `dist/` and `server.js` |

---

## Project Structure

```
src/
├── components/
│   ├── Can3DLab.tsx        # 3D can design studio (interactive controls + preview)
│   ├── CanExporter.tsx     # Lazy-loaded source code exporter
│   ├── Contact.tsx         # Contact form with validation
│   ├── ErrorBoundary.tsx   # React error boundary with retry
│   ├── Hero.tsx            # Hero section with parallax + 3D can
│   ├── HomeCatalog.tsx     # Product catalog showcase
│   ├── HomeDNA.tsx         # Ingredients DNA + flavor matcher
│   ├── HomePoster.tsx      # Cinematic brand poster
│   ├── HomeTestimonials.tsx# User testimonials
│   ├── Navbar.tsx          # Navigation with slide-out drawer
│   ├── OurStory.tsx        # Brand story bento grid
│   ├── Preloader.tsx       # Splash preloader animation
│   ├── Products.tsx        # Product grid with detail modal
│   ├── ReloadPrompt.tsx    # PWA update notification
│   ├── ShowOnCan.tsx       # Pure CSS 3D can component
│   ├── StoreModal.tsx      # Shopping cart + checkout
│   └── ThreeDCan.tsx       # WebGL Three.js 3D can renderer
├── utils/
│   ├── fallbackImg.ts      # Image onError fallback handler
│   └── observability.ts    # Logging + env validation utilities
├── App.tsx                 # Root app with routing + state
├── main.tsx                # Entry point + global error handlers
├── index.css               # Global styles + Tailwind import
└── types.ts                # Shared TypeScript types
```

---

## PWA

The app is a fully installable Progressive Web App:

- **Manifest** — Auto-generated with `theme_color: #030303`, SVG icon
- **Service Worker** — Precache-first for app shell, CacheFirst for Google images (30-day expiry) and Google Fonts (1-year expiry)
- **Update Prompt** — `ReloadPrompt` component notifies users when a new SW is available

---

## Deployment

### Vercel (current)

The project is deployed at [show-on-energy.vercel.app](https://show-on-energy.vercel.app) via Git integration. Pushes to `main` trigger automatic deployments.

### Manual deploy

```bash
npm run build
npx vercel --prod
```

A `vercel.json` is included with SPA rewrites, immutable asset caching, and SW cache-control headers.

---

## License

Apache-2.0
