# Colour-Block Portfolio

A bold, colour-block personal portfolio built with **React 19**, **Vite**, **Tailwind CSS v4**, **GSAP (ScrollTrigger + useGSAP)** and **Lenis** smooth scroll.

Every section is a solid field of colour with oversized display type. Sections stack like cards as you scroll, and the floating navbar flips its colours to stay legible on whatever block sits beneath it.

> Content is placeholder: the name, links and email in `src/config/site.ts`, and the projects and Unsplash images in `src/data/projects.ts`. Replace them before publishing.

---

## Design system

### Colour

Defined once in `src/index.css` under `@theme`, so each becomes a Tailwind utility (`bg-cobalt`, `text-lime`, `border-ink/20`, …).

| Token    | Hex       | Use |
| :------- | :-------- | :-- |
| `cobalt` | `#2340ff` | Hero and About-page intro, the main "loud" field |
| `lime`   | `#d7ff3a` | Highlights, marquee bands, the Contact block |
| `ink`    | `#0a0a0a` | Works section, footer, primary text on light fields |
| `paper`  | `#f3f1ea` | Reading sections (About, Overview, Process) |
| `flame`  | `#ff5b2e` | Small hot accents: availability pill, bursts, focus rings |

Each project in `data/projects.ts` also has its own `color` (its block) and `ink` (the text colour that reads on it).

**Rules:** one dominant field per section, with hard edges between sections and no gradients. Text is always either `ink` or `paper`, whichever contrasts with the field. Use `flame` sparingly.

### Type

- **Display:** *Clash Display* (Fontshare), weight 600, uppercase, tight leading. Use the `.display` class plus a `text-[clamp(...)]` size.
- **Body / UI:** *Archivo* (Google Fonts).
- **Labels:** the `.label` class (12px, 600, uppercase, wide tracking), e.g. `(01) About` via `<Label index="01">`.

### Building blocks (`src/components`)

| Piece | What it is |
| :-- | :-- |
| `ui.tsx` → `Line`, `Label`, `Arrow`, `Burst` | Reveal-able display line, section label, arrow icon, 8-point burst graphic |
| `ProjectCard` | A project as a colour block linking to `/works/:id` |
| `Marquee` | Endless scrolling band, separated by bursts |
| `ContactCta` | Lime "Let's talk" closing block |
| `layout/SiteLayout` | Shared shell: Lenis, scroll-to-top on route change, Navbar, Footer |
| `layout/Navbar` | Floating pill; reads `data-theme` of the section beneath it |

CSS component classes (in `@layer components`, so utilities still override them): `.wrap` (page gutters), `.display`, `.label`, `.btn` (`--ink`, `--paper`, `--outline`), `.chip`, `.link-underline`.

### The `data-theme` contract

Every full-width section must set `data-theme="dark"` (cobalt / ink / dark project colour) or `data-theme="light"` (lime / paper / flame / light project colour). The navbar samples this attribute, so a missing one leaves the nav on the wrong colour.

---

## Motion

- `src/lib/motion.ts` registers GSAP, starts Lenis on the GSAP ticker, and exposes `prefersReducedMotion()`.
- `useReveal(ref)` animates `.reveal-line` (slides up from behind a mask; use `<Line>`) and `.reveal-up` (fade and rise) inside a section.
- Home hero: a sticky cobalt block that shrinks back as the next section slides over it.
- Home works: pinned sideways scroll on screens ≥ 768px. Phones get a vertical stack.
- **Reduced motion:** Lenis, reveals, pinning, marquees and spinning bursts are all switched off, and the works strip becomes a plain horizontal scroller.

---

## Structure

```
src/
├── App.tsx                 # Routes, all wrapped in SiteLayout
├── index.css               # Tokens, base, component classes, navbar, marquee
├── config/site.ts          # Name, email, socials, services (placeholders)
├── data/projects.ts        # Projects + per-project colours (placeholders)
├── lib/motion.ts           # GSAP + Lenis setup
├── hooks/useReveal.ts      # Shared entrance animations
├── components/
│   ├── layout/             # SiteLayout, Navbar, Footer
│   ├── home/               # Hero, AboutIntro, SelectedWorks
│   ├── ProjectCard.tsx, Marquee.tsx, ContactCta.tsx, ui.tsx
└── pages/                  # HomePage, WorksPage, WorkDetailPage, AboutPage, ContactPage
```

The contact form in `ContactPage.tsx` only simulates sending. Wire it to a form service or an API route before going live.

## Running

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint     # tsc --noEmit
```
