/**
 * Basic Usage Demo Section
 * Demonstrates simple confetti bursts with components and hooks
 * 
 * v1.0.0 - Basic Usage Features
 */

import { memo } from 'react';
import {
  ConfettiButton,
  useConfetti,
  confetti,
} from 'react-confetti-burst';
import { Section, DemoCard, Button, CodeBlock } from '../ui';

const BASIC_BUTTON_CODE = `import { ConfettiButton } from 'react-confetti-burst';

function App() {
  return (
    <ConfettiButton>
      Click me! 🎉
    </ConfettiButton>
  );
}`;

const USE_CONFETTI_CODE = `import { useConfetti } from 'react-confetti-burst';

function App() {
  const { fire } = useConfetti();

  return (
    <button onClick={(e) => fire({ 
      x: e.clientX, 
      y: e.clientY 
    })}>
      Fire Confetti!
    </button>
  );
}`;

const CONFETTI_FUNCTION_CODE = `import { confetti } from 'react-confetti-burst';

// Fire confetti from center of screen
confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// Fire with custom colors
confetti({
  particleCount: 50,
  colors: ['#ff0000', '#00ff00', '#0000ff'],
});`;

const CUSTOMIZATION_CODE = `import { ConfettiButton } from 'react-confetti-burst';

function App() {
  return (
    <ConfettiButton
      confettiOptions={{
        particleCount: 50,
        direction: { spread: 60 },
        particle: { colors: ['#ff6b6b', '#4ecdc4', '#ffe66d'] },
      }}
    >
      Custom Burst 🚀
    </ConfettiButton>
  );
}`;

function UseConfettiDemo() {
  const { fire } = useConfetti();

  return (
    <Button
      onClick={(e) => fire({ x: e.clientX, y: e.clientY })}
    >
      Fire from Click Position
    </Button>
  );
}

function ConfettiFunctionDemo() {
  const handleFire = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  return (
    <Button onClick={handleFire} variant="secondary">
      Fire from Center
    </Button>
  );
}

export const BasicDemo = memo(function BasicDemo() {
  return (
    <Section
      id="basic"
      title="Basic Usage"
      description="Simple confetti bursts with components and hooks"
      icon="🎉"
    >
      <DemoCard
        title="ConfettiButton Component"
        description="The simplest way to add confetti - just wrap your button!"
      >
        <ConfettiButton
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Click me! 🎉
        </ConfettiButton>
      </DemoCard>
      <CodeBlock code={BASIC_BUTTON_CODE} title="ConfettiButton Example" />

      <DemoCard
        title="useConfetti Hook"
        description="Fire confetti from any point with full control"
      >
        <UseConfettiDemo />
      </DemoCard>
      <CodeBlock code={USE_CONFETTI_CODE} title="useConfetti Example" />

      <DemoCard
        title="confetti() Function"
        description="Imperative API - fire confetti from anywhere in your code"
      >
        <ConfettiFunctionDemo />
      </DemoCard>
      <CodeBlock code={CONFETTI_FUNCTION_CODE} title="confetti() Function Example" />

      <DemoCard
        title="Customization Options"
        description="Customize particle count, colors, spread, and direction"
      >
        <ConfettiButton
          confettiOptions={{
            particleCount: 50,
            direction: { spread: 60 },
            particle: { colors: ['#ff6b6b', '#4ecdc4', '#ffe66d'] },
          }}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Custom Burst 🚀
        </ConfettiButton>
      </DemoCard>
      <CodeBlock code={CUSTOMIZATION_CODE} title="Customization Example" />
    </Section>
  );
});
