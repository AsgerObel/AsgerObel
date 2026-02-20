# Asger Obel Portfolio

A modern, neo-brutalist portfolio website built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **React Three Fiber** - 3D graphics
- **Three.js** - 3D rendering

## Features

- 🎨 Neo-brutalist design aesthetic
- ✨ Smooth scroll animations
- 🌀 3D floating shapes
- 📱 Fully responsive
- ⚡ Lightning fast with Vite
- 🎯 Minimalist & purposeful

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx     # Navigation bar
│   ├── Hero.tsx       # Hero section with 3D scene
│   ├── Scene3D.tsx    # Three.js 3D scene
│   ├── Projects.tsx   # Projects showcase
│   ├── About.tsx      # About section
│   └── Contact.tsx    # Contact & footer
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles & Tailwind
```

## Customization

### Colors
Edit the CSS variables in `src/index.css`:

```css
:root {
  --color-bg: #F5F3EF;
  --color-accent: #D4503A;
  --color-text: #1A1A1A;
  /* ... */
}
```

### Content
- Update projects in `src/components/Projects.tsx`
- Edit about info in `src/components/About.tsx`
- Modify contact details in `src/components/Contact.tsx`

## License

MIT
