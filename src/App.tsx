/**
 * Main Application Component
 * 
 * Playground for react-confetti-burst package
 * Demonstrates all features with interactive examples
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

import { useMemo } from 'react';
import { useActiveSection } from './hooks';
import {
  Header,
  Sidebar,
  // v1.0.0 - Basic Usage
  BasicDemo,
  // v1.1.0 - React Hooks (Uncomment when releasing)
  // HooksDemo,
  // v1.2.0 - Built-in Presets (Uncomment when releasing)
  // PresetsDemo,
  // v1.3.0 - canvas-confetti API (Uncomment when releasing)
  // CanvasApiDemo,
  // v1.4.0 - Custom Shapes (Uncomment when releasing)
  // ShapesDemo,
  // v1.5.0 - Advanced Effects (Uncomment when releasing)
  // EffectsDemo,
  // AccessibilityDemo,
} from './components';
import type { DemoSection } from './types';
import './App.css';

/**
 * Map of section IDs to their corresponding demo components
 * 
 * Uncomment components as features are released
 */
const DEMO_COMPONENTS: Partial<Record<DemoSection, React.ComponentType>> = {
  // v1.0.0 - Basic Usage
  basic: BasicDemo,
  // v1.1.0 - React Hooks (Uncomment when releasing)
  // hooks: HooksDemo,
  // v1.2.0 - Built-in Presets (Uncomment when releasing)
  // presets: PresetsDemo,
  // v1.3.0 - canvas-confetti API (Uncomment when releasing)
  // 'canvas-api': CanvasApiDemo,
  // v1.4.0 - Custom Shapes (Uncomment when releasing)
  // shapes: ShapesDemo,
  // v1.5.0 - Advanced Effects (Uncomment when releasing)
  // effects: EffectsDemo,
  // accessibility: AccessibilityDemo,
};

function App() {
  const [activeSection, setActiveSection] = useActiveSection('basic');

  const ActiveDemo = useMemo(
    () => DEMO_COMPONENTS[activeSection] ?? DEMO_COMPONENTS['basic']!,
    [activeSection]
  ) as React.ComponentType;

  return (
    <div className="app">
      <Header />
      
      <div className="app-container">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="main-content">
          <div className="hero">
            <h1 className="hero-title">
              react-confetti-burst
              <span className="hero-badge">Playground</span>
            </h1>
            <p className="hero-description">
              A high-performance, zero-dependency React confetti component.
              <br />
              More features than both <code>react-confetti</code> AND{' '}
              <code>canvas-confetti</code> combined!
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">0</span>
                <span className="stat-label">Dependencies</span>
              </div>
              <div className="stat">
                <span className="stat-value">16</span>
                <span className="stat-label">Presets</span>
              </div>
              <div className="stat">
                <span className="stat-value">5</span>
                <span className="stat-label">Effect Modes</span>
              </div>
              <div className="stat">
                <span className="stat-value">∞</span>
                <span className="stat-label">Customization</span>
              </div>
            </div>
          </div>

          <div className="demo-content">
            <ActiveDemo />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
