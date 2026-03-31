/**
 * Type definitions for the demo playground
 */

import type { ReactNode } from 'react';

export type DemoSection = 
  | 'basic'
  | 'hooks'
  | 'presets'
  | 'canvas-api'
  | 'shapes'
  | 'effects'
  | 'accessibility'
  | 'feedback';

export interface DemoConfig {
  readonly id: DemoSection;
  readonly title: string;
  readonly description: string;
  readonly icon: ReactNode;
}

export interface CodeExample {
  readonly title: string;
  readonly code: string;
  readonly language: 'tsx' | 'ts';
}
