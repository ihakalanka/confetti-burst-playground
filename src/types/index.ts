/**
 * Type definitions for the demo playground
 */

export type DemoSection = 
  | 'basic'
  | 'hooks'
  | 'presets'
  | 'canvas-api'
  | 'shapes'
  | 'effects'
  | 'accessibility';

export interface DemoConfig {
  readonly id: DemoSection;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export interface CodeExample {
  readonly title: string;
  readonly code: string;
  readonly language: 'tsx' | 'ts';
}
