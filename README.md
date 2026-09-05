# Kool King LLC

Production-ready Next.js 14+ App Router project with TypeScript and Tailwind CSS.

## Stack

- **Next.js** (App Router, TypeScript, `src/` directory)
- **Tailwind CSS** with a custom luxury design token palette
- **three**, **@react-three/fiber**, **@react-three/drei**, **@react-three/postprocessing** for 3D scenes
- **framer-motion** for animation
- **zustand** for global state
- **lucide-react** for icons

## Design tokens

Defined in `tailwind.config.js` (`theme.extend.colors`):

| Token | Class | Hex |
| --- | --- | --- |
| Obsidian (background) | `bg-obsidian` / `text-obsidian` | `#030712` |
| Abyssal blue | `bg-abyssal-blue` / `text-abyssal-blue` | `#060B19` |
| Cryo cyan | `bg-cryo-cyan` / `text-cryo-cyan` | `#00F0FF` |
| Laser blue | `bg-laser-blue` / `text-laser-blue` | `#3B82F6` |
| Liquid chrome | `bg-liquid-chrome` / `text-liquid-chrome` | `#E2E8F0` |

## Global store

`src/store/useAppStore.ts` is a Zustand store that tracks:

- `isMobileDrawerOpen` (+ `openMobileDrawer` / `closeMobileDrawer` / `toggleMobileDrawer`)
- `isLeadModalOpen` (+ `openLeadModal` / `closeLeadModal` / `toggleLeadModal`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint
