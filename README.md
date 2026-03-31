# react-confetti-burst Playground

Interactive playground for the [react-confetti-burst](https://github.com/ihakalanka/react-confetti-burst) library — a high-performance, zero-dependency React confetti animation component.

## Live Demo

Visit the playground: [https://ihakalanka.github.io/confetti-burst-playground/](https://ihakalanka.github.io/confetti-burst-playground/)

## Features

- **Interactive Control Panel** — Customize particle count, spread, velocity, gravity, colors, and 10+ other parameters with real-time sliders and toggles
- **Live Code Generation** — See the exact code for your configuration, copy with one click
- **Built-in Presets** — Quick-start with Default, Party, Snow, Fireworks, and Gentle presets
- **Multiple API Demos** — Examples for ConfettiButton component, useConfetti hook, and confetti() function
- **Responsive Design** — Works on desktop and mobile with dark theme

## Demo Sections

| Section | Status | Description |
|---------|--------|-------------|
| Basic Usage | Active | ConfettiButton, useConfetti, confetti() |
| React Hooks | Planned | All hook variants |
| Built-in Presets | Planned | 16 preset configurations |
| canvas-confetti API | Planned | Drop-in replacement demos |
| Custom Shapes | Planned | SVG, emoji, text, image shapes |
| Advanced Effects | Planned | Trails, glow, fireworks |

## Local Development

### Prerequisites

- Node.js >= 18.0.0
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/ihakalanka/confetti-burst-playground.git
cd confetti-burst-playground

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173/confetti-burst-playground/](http://localhost:5173/confetti-burst-playground/) in your browser.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build and deploy to GitHub Pages |

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Vite 5** for fast dev/build
- **CSS Modules** + CSS custom properties (dark theme)
- **GitHub Pages** deployment via gh-pages

## Related

- [react-confetti-burst](https://github.com/ihakalanka/react-confetti-burst) — The main library
- [npm package](https://www.npmjs.com/package/react-confetti-burst)

## License

MIT
