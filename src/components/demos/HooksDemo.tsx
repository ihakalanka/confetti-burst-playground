/**
 * React Hooks Demo Section
 * Demonstrates useConfetti hook with various patterns
 *
 * v1.1.0 - React Hooks Features
 */

import { memo, useState, useCallback, useRef } from 'react';
import { useConfetti, confetti } from 'react-confetti-burst';
import { Section, DemoCard, Button, CodeBlock } from '../ui';
import { Workflow } from 'lucide-react';

const USE_CONFETTI_BASIC_CODE = `import { useConfetti } from 'react-confetti-burst';

function App() {
  const { fire } = useConfetti();

  return (
    <button onClick={(e) => fire({
      x: e.clientX,
      y: e.clientY
    })}>
      Fire at Click Position
    </button>
  );
}`;

const USE_CONFETTI_OPTIONS_CODE = `import { useConfetti } from 'react-confetti-burst';

function App() {
  const { fire } = useConfetti();

  return (
    <button onClick={(e) => fire(
      { x: e.clientX, y: e.clientY },
      {
        particleCount: 80,
        particle: { colors: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf'] },
      }
    )}>
      Custom Confetti
    </button>
  );
}`;

const SEQUENTIAL_FIRE_CODE = `import { confetti } from 'react-confetti-burst';

// Fire multiple bursts in sequence
async function celebrationSequence() {
  confetti({ origin: { x: 0.2, y: 0.5 }, angle: 60, spread: 55 });

  await new Promise(r => setTimeout(r, 200));
  confetti({ origin: { x: 0.5, y: 0.5 }, angle: 90, spread: 70 });

  await new Promise(r => setTimeout(r, 200));
  confetti({ origin: { x: 0.8, y: 0.5 }, angle: 120, spread: 55 });
}`;

const FIRE_FROM_REF_CODE = `import { useConfetti } from 'react-confetti-burst';
import { useRef } from 'react';

function App() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { fire } = useConfetti();

  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      fire({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  };

  return (
    <button ref={buttonRef} onClick={handleClick}>
      Fire from Button Top
    </button>
  );
}`;

function BasicHookDemo() {
  const { fire } = useConfetti();
  return (
    <Button onClick={(e) => fire({ x: e.clientX, y: e.clientY })}>
      Fire at Click Position
    </Button>
  );
}

function CustomHookDemo() {
  const { fire } = useConfetti();
  return (
    <Button
      variant="secondary"
      onClick={(e) => fire(
        { x: e.clientX, y: e.clientY },
        {
          particleCount: 80,
          particle: { colors: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf'] },
        }
      )}
    >
      Custom Colors & Spread
    </Button>
  );
}

function SequentialFireDemo() {
  const [firing, setFiring] = useState(false);

  const handleSequence = useCallback(async () => {
    if (firing) return;
    setFiring(true);
    confetti({ origin: { x: 0.2, y: 0.5 }, angle: 60, spread: 55, particleCount: 40 });
    await new Promise(r => setTimeout(r, 200));
    confetti({ origin: { x: 0.5, y: 0.5 }, angle: 90, spread: 70, particleCount: 60 });
    await new Promise(r => setTimeout(r, 200));
    confetti({ origin: { x: 0.8, y: 0.5 }, angle: 120, spread: 55, particleCount: 40 });
    setFiring(false);
  }, [firing]);

  return (
    <Button onClick={handleSequence} disabled={firing}>
      {firing ? 'Firing...' : 'Fire Sequence (L-C-R)'}
    </Button>
  );
}

function FireFromRefDemo() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { fire } = useConfetti();

  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      fire(
        { x: rect.left + rect.width / 2, y: rect.top },
        { particleCount: 60 }
      );
    }
  };

  return (
    <Button ref={buttonRef} variant="secondary" onClick={handleClick}>
      Fire from Button Top
    </Button>
  );
}

export const HooksDemo = memo(function HooksDemo() {
  return (
    <Section
      id="hooks"
      title="React Hooks"
      description="Programmatic confetti control with React hooks"
      icon={<Workflow size={20} />}
    >
      <DemoCard
        title="useConfetti — Basic"
        description="Fire confetti at the exact click position"
      >
        <BasicHookDemo />
      </DemoCard>
      <CodeBlock code={USE_CONFETTI_BASIC_CODE} title="useConfetti Basic Example" />

      <DemoCard
        title="useConfetti — Custom Options"
        description="Pass default options to customize every burst"
      >
        <CustomHookDemo />
      </DemoCard>
      <CodeBlock code={USE_CONFETTI_OPTIONS_CODE} title="useConfetti with Options" />

      <DemoCard
        title="Sequential Bursts"
        description="Fire multiple bursts in sequence for celebration effects"
      >
        <SequentialFireDemo />
      </DemoCard>
      <CodeBlock code={SEQUENTIAL_FIRE_CODE} title="Sequential Fire Pattern" />

      <DemoCard
        title="Fire from Element Position"
        description="Use a ref to fire confetti from a specific element"
      >
        <FireFromRefDemo />
      </DemoCard>
      <CodeBlock code={FIRE_FROM_REF_CODE} title="Fire from Element Ref" />
    </Section>
  );
});
