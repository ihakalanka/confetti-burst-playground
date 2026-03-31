/**
 * Canvas-Confetti API Demo Section
 * Demonstrates the canvas-confetti compatible functional API
 *
 * v1.3.0 - canvas-confetti API Features
 */

import { memo } from 'react';
import { confetti } from 'react-confetti-burst';
import { Section, DemoCard, Button, CodeBlock } from '../ui';
import { Layers } from 'lucide-react';

const BASIC_API_CODE = `import { confetti } from 'react-confetti-burst';

// Basic burst
confetti();

// Customized
confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 }
});

// Reset/stop all confetti
confetti.reset();`;

const PATTERNS_CODE = `import { confetti } from 'react-confetti-burst';

// Fire from both sides
confetti.fireworks();

// School pride pattern
confetti.schoolPride({ 
  colors: ['#ff0000', '#ffffff'] 
});

// Falling snow
confetti.snow({ duration: 5000 });

// Burst from center
confetti.burst({ x: 0.5, y: 0.3 });`;

const CUSTOM_CANVAS_CODE = `import { confetti } from 'react-confetti-burst';

// Custom canvas instance
const myCanvas = document.getElementById('my-canvas');
const myConfetti = confetti.create(myCanvas, {
  resize: true,
  disableForReducedMotion: true
});

// Use the custom instance
myConfetti({ particleCount: 100 });

// Reset custom instance
myConfetti.reset();`;

const DESTROY_CODE = `import { confetti } from 'react-confetti-burst';

// Get all registered shape names
const shapes = confetti.getShapes();
console.log(shapes); // ['circle', 'square', ...]

// Destroy all instances and canvases
confetti.destroyAll();`;

export const CanvasApiDemo = memo(function CanvasApiDemo() {
  const handleBasic = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  const handleFireworks = () => {
    confetti.fireworks();
  };

  const handleSchoolPride = () => {
    confetti.schoolPride({ colors: ['#6366f1', '#ffffff'] });
  };

  const handleSnow = () => {
    confetti.snow({ duration: 3000 });
  };

  const handleBurst = () => {
    confetti.burst({ x: 0.5, y: 0.3 });
  };

  const handleReset = () => {
    confetti.reset();
  };

  const handleDestroyAll = () => {
    confetti.destroyAll();
  };

  return (
    <Section
      id="canvas-api"
      title="canvas-confetti API"
      description="Drop-in replacement for canvas-confetti with identical API"
      icon={<Layers size={20} />}
    >
      <DemoCard
        title="Basic Functional API"
        description="Same API as canvas-confetti - just import and use!"
      >
        <Button onClick={handleBasic}>confetti()</Button>
        <Button onClick={handleReset} variant="secondary">
          confetti.reset()
        </Button>
        <Button onClick={handleDestroyAll} variant="ghost">
          confetti.destroyAll()
        </Button>
      </DemoCard>
      <CodeBlock code={BASIC_API_CODE} title="Basic API" />

      <DemoCard
        title="Built-in Patterns"
        description="Common confetti patterns with a single function call"
      >
        <Button onClick={handleFireworks} variant="secondary">
          🎆 Fireworks
        </Button>
        <Button onClick={handleSchoolPride} variant="secondary">
          🏫 School Pride
        </Button>
        <Button onClick={handleSnow} variant="secondary">
          ❄️ Snow
        </Button>
        <Button onClick={handleBurst} variant="secondary">
          💥 Burst
        </Button>
      </DemoCard>
      <CodeBlock code={PATTERNS_CODE} title="Built-in Patterns" />

      <DemoCard
        title="Custom Canvas Instance"
        description="Create confetti bound to a specific canvas element"
      >
        <p style={{ color: '#a1a1aa', margin: 0, textAlign: 'center' }}>
          Use <code style={{ color: '#818cf8' }}>confetti.create(canvas)</code> to
          render on a custom canvas
        </p>
      </DemoCard>
      <CodeBlock code={CUSTOM_CANVAS_CODE} title="Custom Canvas" />

      <DemoCard
        title="Utility Methods"
        description="Additional methods for managing confetti instances"
      >
        <p style={{ color: '#a1a1aa', margin: 0, textAlign: 'center' }}>
          Use <code style={{ color: '#818cf8' }}>confetti.getShapes()</code> to list shapes and{' '}
          <code style={{ color: '#818cf8' }}>confetti.destroyAll()</code> for full cleanup
        </p>
      </DemoCard>
      <CodeBlock code={DESTROY_CODE} title="Utility Methods" />
    </Section>
  );
});
