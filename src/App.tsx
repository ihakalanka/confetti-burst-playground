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

import { useMemo, useState, useCallback } from 'react';
import { useActiveSection } from './hooks';
import {
  Header,
  Sidebar,
  ErrorBoundary,
  // v1.0.0 - Basic Usage
  BasicDemo,
  // v1.1.0 - React Hooks
  HooksDemo,
  // v1.2.0 - Built-in Presets
  PresetsDemo,
  // v1.3.0 - canvas-confetti API
  CanvasApiDemo,
  // v1.4.0 - Custom Shapes
  ShapesDemo,
  // v1.5.0 - Advanced Effects
  EffectsDemo,
  AccessibilityDemo,
  // Feedback
  FeedbackForm,
} from './components';
import { DEMO_SECTIONS } from './constants';
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
  // v1.1.0 - React Hooks
  hooks: HooksDemo,
  // v1.2.0 - Built-in Presets
  presets: PresetsDemo,
  // v1.3.0 - canvas-confetti API
  'canvas-api': CanvasApiDemo,
  // v1.4.0 - Custom Shapes
  shapes: ShapesDemo,
  // v1.5.0 - Advanced Effects
  effects: EffectsDemo,
  accessibility: AccessibilityDemo,
  // Feedback
  feedback: FeedbackForm,
};

function App() {
  const [activeSection, setActiveSection] = useActiveSection('basic');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSectionChange = useCallback((section: DemoSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  }, [setActiveSection]);

  const handleFeedbackClick = useCallback(() => {
    setActiveSection('feedback');
    setMobileMenuOpen(false);
  }, [setActiveSection]);

  const ActiveDemo = useMemo(
    () => DEMO_COMPONENTS[activeSection] ?? DEMO_COMPONENTS['basic']!,
    [activeSection]
  );

  return (
    <div className="app">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Header
        onMenuToggle={() => setMobileMenuOpen(prev => !prev)}
        mobileMenuOpen={mobileMenuOpen}
        onFeedbackClick={handleFeedbackClick}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <dialog className="mobile-menu-overlay" open aria-label="Navigation menu">
          <button
            className="mobile-menu-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          />
          <nav className="mobile-menu">
            <h2 className="mobile-menu-title">Demos</h2>
            <ul className="mobile-menu-list">
              {DEMO_SECTIONS.map((section) => (
                <li key={section.id}>
                  <button
                    className={`mobile-menu-item ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => handleSectionChange(section.id)}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                  >
                    <span className="mobile-menu-icon" aria-hidden="true">{section.icon}</span>
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </dialog>
      )}

      <div className="app-container">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <main id="main-content" className="main-content">
          <div className="hero">
            <h1 className="hero-title">
              react-confetti-burst
              {' '}
              <span className="hero-badge">Playground</span>
            </h1>
            <p className="hero-description">
              A high-performance, zero-dependency React confetti component.
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
            <ErrorBoundary>
              <ActiveDemo />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
