/**
 * Constants and configuration for the demo playground
 */

export { DEMO_SECTIONS } from './sections';

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
  primary: '#818cf8',
  primaryDim: '#6366f1',
  accent: '#22d3ee',
  background: '#09090b',
  surface: '#18181b',
  surfaceLight: '#27272a',
  border: '#27272a',
  text: '#fafafa',
  textMuted: '#a1a1aa',
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171',
} as const;
