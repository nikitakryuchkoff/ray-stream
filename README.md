# RayStream International — Next.js Website

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # CSS variables, resets, utilities
│   ├── layout.tsx          # Root layout + font + LangProvider
│   └── page.tsx            # Home page (section composition)
│
├── components/
│   ├── ui/                 # Reusable UI primitives
│   │   ├── Reveal          # Scroll-triggered reveal animation (up/left/scale)
│   │   ├── ClipReveal      # Text clip-mask reveal animation
│   │   ├── ScrollProgress  # Fixed top scroll progress bar
│   │   ├── Separator       # Animated horizontal line
│   │   ├── Counter         # Animated number counter
│   │   └── LangSwitcher    # RU/EN toggle buttons
│   │
│   ├── Header/             # Fixed nav, burger menu, scroll-aware theme
│   ├── Hero/               # Full-screen hero with parallax, rays, video placeholder
│   ├── About/              # Company info grid + animated metrics
│   ├── Services/           # 2×2 card grid with SVG icons
│   ├── Advantages/         # 4-column advantages with hover accents
│   ├── Geography/          # D3 world map (TopoJSON) + city markers + routes
│   ├── Partners/           # Infinite marquee scroll
│   ├── Contact/            # Form with animated inputs
│   └── Footer/             # Site footer with nav links
│
├── hooks/                  # Custom React hooks
│   ├── useInView.ts        # IntersectionObserver wrapper
│   ├── useCounter.ts       # Animated count-up
│   └── useScrollProgress.ts # Scroll position tracking
│
├── context/
│   └── LangContext.tsx      # i18n context (RU/EN)
│
├── i18n/
│   ├── types.ts            # Translation key types
│   ├── translations.ts     # RU + EN dictionaries
│   └── index.ts
│
└── data/                   # Static data (cities, metrics, advantages, partners)
    ├── cities.ts
    ├── metrics.ts
    ├── advantages.ts
    └── partners.ts
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** (per-component scoped styles)
- **d3-geo + topojson-client** (real world map)
- **DM Sans** (Google Fonts via next/font)

## Key Design Decisions

- **CSS Modules** for style isolation — no global class collisions
- **Data layer** separated from components (cities, metrics, advantages, partners)
- **Custom hooks** encapsulate IntersectionObserver, scroll tracking, counter logic
- **Context-based i18n** — no external i18n library, simple RU/EN toggle
- **Reveal system** — single `<Reveal>` component handles 3 animation variants with configurable delays
- **WorldMap** renders real country borders from TopoJSON via d3-geo projection
