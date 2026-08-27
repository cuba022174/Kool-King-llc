# Kool King LLC

Production-ready Next.js 14 App Router project with TypeScript and Tailwind CSS.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with custom luxury design tokens (see `tailwind.config.js`)
- **three** / **@react-three/fiber** / **@react-three/drei** / **@react-three/postprocessing** — 3D scenes
- **framer-motion** — animation
- **zustand** — global state (`src/store/useAppStore.ts`)
- **lucide-react** — icons

## Design tokens

| Token      | Hex       | Tailwind class            |
| ---------- | --------- | -------------------------- |
| Obsidian   | `#030712` | `bg-obsidian` / `text-obsidian` |
| Abyssal    | `#060B19` | `bg-abyssal` / `text-abyssal`   |
| Cryo Cyan  | `#00F0FF` | `bg-cryo` / `text-cryo`         |
| Laser Blue | `#3B82F6` | `bg-laser` / `text-laser`       |
| Liquid Chrome | `#E2E8F0` | `bg-chrome` / `text-chrome`  |

## Global store

`src/store/useAppStore.ts` exposes a Zustand store controlling:

- `isMobileDrawerOpen` — mobile navigation drawer visibility
- `isLeadModalOpen` — lead-capture modal visibility

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
