/**
 * Demo section configuration with Lucide icons
 */

import {
  Sparkles,
  Workflow,
  Palette,
  Layers,
  Shapes,
  Wand2,
  Accessibility,
} from 'lucide-react';
import type { DemoConfig } from '../types';

const ICON_SIZE = 18;

export const DEMO_SECTIONS: readonly DemoConfig[] = [
  {
    id: 'basic',
    title: 'Basic Usage',
    description: 'Simple confetti bursts with components and hooks',
    icon: <Sparkles size={ICON_SIZE} />,
  },
  {
    id: 'hooks',
    title: 'React Hooks',
    description: 'useConfetti, useConfettiTrigger, and more',
    icon: <Workflow size={ICON_SIZE} />,
  },
  {
    id: 'presets',
    title: 'Built-in Presets',
    description: '16 ready-to-use confetti presets',
    icon: <Palette size={ICON_SIZE} />,
  },
  {
    id: 'canvas-api',
    title: 'canvas-confetti API',
    description: 'Drop-in replacement for canvas-confetti',
    icon: <Layers size={ICON_SIZE} />,
  },
  {
    id: 'shapes',
    title: 'Custom Shapes',
    description: 'SVG paths, emoji, and text shapes',
    icon: <Shapes size={ICON_SIZE} />,
  },
  {
    id: 'effects',
    title: 'Advanced Effects',
    description: 'Trails, glow, fireworks, and more',
    icon: <Wand2 size={ICON_SIZE} />,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description: 'Reduced motion and ARIA support',
    icon: <Accessibility size={ICON_SIZE} />,
  },
];
