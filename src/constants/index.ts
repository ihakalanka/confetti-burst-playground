/**
 * Constants and configuration for the demo playground
 * 
 * ============================================================================
 * FEATURE RELEASE FLAGS - Sync with react-confetti-burst releases
 * ============================================================================
 * 
 * v1.0.0 - Basic Usage
 * v1.1.0 - React Hooks
 * v1.2.0 - Built-in Presets
 * v1.3.0 - canvas-confetti API
 * v1.4.0 - Custom Shapes
 * v1.5.0 - Advanced Effects + Accessibility
 * 
 * ============================================================================
 */

import type { DemoConfig } from '../types';

// ============================================================================
// v1.0.0 - BASIC USAGE (Currently Released)
// ============================================================================

export const DEMO_SECTIONS: readonly DemoConfig[] = [
  {
    id: 'basic',
    title: 'Basic Usage',
    description: 'Simple confetti bursts with components and hooks',
    icon: '🎉',
  },
  // ============================================================================
  // v1.1.0 - REACT HOOKS (Uncomment when releasing)
  // ============================================================================
  /*
  {
    id: 'hooks',
    title: 'React Hooks',
    description: 'useConfetti, useConfettiTrigger, and more',
    icon: '🪝',
  },
  */
  // ============================================================================
  // v1.2.0 - BUILT-IN PRESETS (Uncomment when releasing)
  // ============================================================================
  /*
  {
    id: 'presets',
    title: 'Built-in Presets',
    description: '16 ready-to-use confetti presets',
    icon: '🎨',
  },
  */
  // ============================================================================
  // v1.3.0 - CANVAS-CONFETTI API (Uncomment when releasing)
  // ============================================================================
  /*
  {
    id: 'canvas-api',
    title: 'canvas-confetti API',
    description: 'Drop-in replacement for canvas-confetti',
    icon: '🖼️',
  },
  */
  // ============================================================================
  // v1.4.0 - CUSTOM SHAPES (Uncomment when releasing)
  // ============================================================================
  /*
  {
    id: 'shapes',
    title: 'Custom Shapes',
    description: 'SVG paths, emoji, and text shapes',
    icon: '⭐',
  },
  */
  // ============================================================================
  // v1.5.0 - ADVANCED EFFECTS (Uncomment when releasing)
  // ============================================================================
  /*
  {
    id: 'effects',
    title: 'Advanced Effects',
    description: 'Trails, glow, fireworks, and more',
    icon: '✨',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description: 'Reduced motion and ARIA support',
    icon: '♿',
  },
  */
] as const;

export const PRESET_NAMES = [
  'default',
  'celebration',
  'firework',
  'snow',
  'rain',
  'sparkle',
  'confetti',
  'emoji',
  'hearts',
  'stars',
  'money',
  'pride',
  'christmas',
  'halloween',
  'newYear',
  'birthday',
] as const;

export const THEME_COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#ec4899',
  background: '#0f172a',
  surface: '#1e293b',
  surfaceLight: '#334155',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
} as const;
