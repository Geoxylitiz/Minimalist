# Minimalist Editorial Portfolio

A high-end, editorial, minimalist portfolio website built with **React 19**, **Vite**, **Tailwind CSS v4**, **GSAP (ScrollTrigger + useGSAP)**, and **Lenis Smooth Scroll**.

This document serves as an exhaustive design system and architectural guide to help AI agents, developers, and designers maintain visual consistency, understand the aesthetic ethos, and extend the project without diluting the design language.

---

## ✦ Design Philosophy & Aesthetic Core

The website is crafted around an **editorial, gallery-grade minimalist aesthetic** inspired by high-end design studios, architecture monographs, and luxury art curation platforms.

### Core Tenets
1. **Charcoal & Obsidian Canvas**: Deep dark-mode foundation (`#0c0c0c` and `#161616`), avoiding stark pitch black or generic slate/blue tones.
2. **Champagne Gold Accents**: Muted warm gold/bronze accents (`#c4a47c`) used sparingly for focus points, hairline borders, and subtle glowing gradients.
3. **High-Contrast Typographic Pairing**: Monumental modern Serif display headings paired with clean, architectural Sans-serif micro-labels and body text.
4. **Tactile Grain / Noise**: A fixed SVG fractal noise overlay (3.5% opacity) gives a physical film/paper print texture across the entire viewport.
5. **Scroll-Driven Narrative**: Butter-smooth inertial scrolling via Lenis synchronized directly with GSAP ScrollTrigger ticker for pinned, multi-axis choreography (horizontal slides, scrubbed text reveals, scramble decoding).
6. **Hardware-Accelerated Motion**: Animations strictly leverage `transform` and `opacity` to maintain a consistent 60+ FPS experience with full `prefers-reduced-motion` accessibility support.

---

## 🎨 Design Tokens & Style Guide

### 1. Color Palette

All colors are declared as CSS variables in [`src/index.css`](file:///c:/Users/awse/Desktop/WEB%20DESIGN/PORTFOLIO_MINIMALIST/src/index.css) and exposed through Tailwind CSS v4 `@theme`.

| Token | Class Name | Hex / Value | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg` | `bg-sc-bg` / `text-sc-bg` | `#0c0c0c` | Primary deep canvas background |
| `--surface` | `bg-sc-surface` | `#161616` | Elevated content sections (e.g. About, Contact) |
| `--text-primary` | `text-sc-text-primary` | `#f0f0f0` | Crisp off-white primary headers and strong text |
| `--text-muted` | `text-sc-text-muted` | `#a0a0a0` | Editorial subheadings, labels, and secondary copy |
| `--border` | `border-sc-border` | `rgba(255, 255, 255, 0.1)` | Subtle hairline division lines and borders |
| `--accent` | `text-sc-accent` / `bg-sc-accent` | `#c4a47c` | Warm champagne gold for focal accents and live indicators |

#### Ambient Plasma Gradients (Canvas in Hero)
- Primary glow: `#c4a47c` (Champagne Gold, alpha 0.2)
- Secondary glow: `#8a6d4a` (Warm Bronze, alpha 0.2)
- Deep slate shadow: `#3a3a3a` (Slate, alpha 0.2)

---

### 2. Typography

Configured Google Fonts: **Playfair Display** (Display Serif) + **Inter** (Body Sans-serif).

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

#### Typography Rules:
- **Hero Title**: `text-[clamp(3.5rem,10vw,12rem)]`, leading `leading-[0.85]`, tracking `tracking-tighter`, uppercase with deliberate staggered padding offsets (`pl-[15vw]`, `pl-[5vw]`).
- **Serif Contrast / Emphasis**: Italicized Playfair Display in lowercase (`font-display italic lowercase`) used for rhetorical contrast phrases (e.g., *“& Execution”*, *“exceptional things.”*).
- **Micro-Labels & Section Headers**: `text-xs` or `text-[0.65rem]`, uppercase, wide tracking (`tracking-[0.2em]` or `tracking-[0.3em]`), muted color (`text-sc-text-muted`). Example format: `01. Background`, `02. Selected Works`, `03. Contact`.
- **Ghost Watermarks**: Oversized outlined background typography (`text-[26vw]`, `-webkit-text-stroke: 1px var(--color-sc-accent)` with transparent fill).
- **Body Copy**: Inter, `line-height: 1.6`, `max-width: 65ch` for optimal reading rhythm.

---

### 3. Layout & Structure System

- **Container**: `.sc-container` provides standard responsive padding:
  - Mobile: `1.5rem` (`px-6`)
  - Tablet (`sm`): `2rem` (`px-8`)
  - Desktop (`lg`): `4rem` (`px-16`)
  - Max Width: `80rem` (`max-w-7xl`) centered with `mx-auto`
- **12-Column Editorial Grid**:
  - Left Col (Span 4): Sticky section numbers and micro-labels (`01. Background`).
  - Right Col (Span 8): Lead statement + multi-column descriptive body copy.
- **Vertical Right Marquee**: `hidden md:flex` with `[writing-mode:vertical-rl]` for architectural margin details.

---

## ⚡ Motion & Interaction Specifications

### 1. Lenis + GSAP Scroll Synchronization
Located in [`src/App.tsx`](file:///c:/Users/awse/Desktop/WEB%20DESIGN/PORTFOLIO_MINIMALIST/src/App.tsx):
- Lenis runs smoothly with a custom cubic bezier ease (`duration: 1.2`).
- Integrated directly with GSAP ticker (`lenis.raf(time * 1000)`) with `gsap.ticker.lagSmoothing(0)` to prevent desynchronization during heavy scroll triggers.

### 2. Scramble / Text Decoding Animation
Located in [`src/components/Hero.tsx`](file:///c:/Users/awse/Desktop/WEB%20DESIGN/PORTFOLIO_MINIMALIST/src/components/Hero.tsx):
- Characters cycle through `!<>-_\\/[]{}—=+*^?#$%&` before resolving into real characters.
- Uses `data-text` attribute to protect against double-invocation glitches in React Strict Mode.

### 3. Horizontal Pinned Scroll
Located in [`src/components/Works.tsx`](file:///c:/Users/awse/Desktop/WEB%20DESIGN/PORTFOLIO_MINIMALIST/src/components/Works.tsx):
- Pinned viewport scrub translation: `xPercent: -100 * (panels.length - 1)` with `scrub: 1`.
- Project cards feature grayscale-to-color transitions with subtle scale expansion on hover (`transition-all duration-700 ease-[0.16,1,0.3,1] scale-105 group-hover:scale-100 group-hover:grayscale-0`).

---

## 📂 Project Architecture

```
PORTFOLIO_MINIMALIST/
├── index.html              # HTML entry point, Google Fonts, meta tags
├── src/
│   ├── main.tsx            # React root mount
│   ├── App.tsx             # Lenis scroll setup, GSAP ticker, global noise overlay
│   ├── index.css           # Tailwind v4 @theme, design tokens, noise SVG, scroll classes
│   └── components/
│       ├── Hero.tsx        # Dynamic canvas plasma, scramble decoder, pinned hero scroll
│       ├── About.tsx       # 12-column editorial grid, scroll-scrubbed headline transition
│       ├── Works.tsx       # Pinned horizontal work showcase with hover reveals
│       └── Contact.tsx     # Minimalist contact links & closing copyright
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies: GSAP, Lenis, Tailwind v4, React 19
```

---

## 🤖 AI Agent Guidelines for Making Changes

When adding new components, editing styles, or extending features:

1. **Maintain Color Restraint**:
   - Always use `bg-sc-bg` (`#0c0c0c`) or `bg-sc-surface` (`#161616`).
   - Do NOT introduce saturated bright blues, greens, or harsh pure white backgrounds.
   - Use `text-sc-accent` (`#c4a47c`) only for subtle highlights, indicators, or accent lines.

2. **Follow Typography Hierarchy**:
   - Display Titles: `font-display` (`Playfair Display`).
   - Section numbers: `0X. [Section Name]` in `text-xs uppercase tracking-[0.2em] text-sc-text-muted`.
   - Body copy: `text-sc-text-muted text-sm sm:text-base` using `Inter`.

3. **Follow GSAP & React 19 Best Practices**:
   - Always use `useGSAP` from `@gsap/react` with `{ scope: containerRef }` for automatic cleanup.
   - Respect `prefers-reduced-motion`: check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before executing heavy GSAP timelines.
   - For scroll triggers, ensure `ScrollTrigger.update` is bound to Lenis scroll events.

4. **Container Standard**:
   - Wrap section content in `<div className="sc-container">` to maintain uniform horizontal gutters across breakpoints.

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```
