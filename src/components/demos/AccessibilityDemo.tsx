/**
 * Accessibility Demo Section
 * Shows reduced motion and ARIA support
 *
 * v1.5.0 - Accessibility Features
 */

import { memo } from 'react';
import { useConfetti, confetti } from 'react-confetti-burst';
import { Section, DemoCard, Button, CodeBlock } from '../ui';
import { Accessibility } from 'lucide-react';
import { useReducedMotion } from '../../hooks';

const REDUCED_MOTION_CODE = `import { confetti } from 'react-confetti-burst';

// Respects user's reduced motion preference
confetti({
  disableForReducedMotion: true
});

// Hook-based approach
fire(origin, {
  accessibility: {
    disableForReducedMotion: true,
    ariaLabel: 'Celebration confetti',
    ariaHidden: true
  }
});`;

const DETECTION_CODE = `// Detect user preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// React hook approach
import { useReducedMotion } from './hooks';

function App() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    // Show static celebration instead
    return <StaticCelebration />;
  }

  return <ConfettiButton>Celebrate!</ConfettiButton>;
}`;

export const AccessibilityDemo = memo(function AccessibilityDemo() {
  const { fire } = useConfetti();
  const prefersReducedMotion = useReducedMotion();

  const handleWithCheck = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      disableForReducedMotion: true,
    });
  };

  const handleWithAccessibility = (e: React.MouseEvent) => {
    fire(
      { x: e.clientX, y: e.clientY },
      {
        particleCount: 50,
        accessibility: {
          disableForReducedMotion: true,
          ariaLabel: 'Celebration confetti animation',
          ariaHidden: true,
        },
      }
    );
  };

  const handleForced = (e: React.MouseEvent) => {
    fire(
      { x: e.clientX, y: e.clientY },
      {
        particleCount: 50,
      }
    );
  };

  return (
    <Section
      id="accessibility"
      title="Accessibility"
      description="Support for reduced motion preferences and screen readers"
      icon={<Accessibility size={20} />}
    >
      <DemoCard
        title="Your Preference"
        description="Current reduced motion setting on your device"
      >
        <div
          style={{
            padding: '1rem 1.5rem',
            background: prefersReducedMotion ? '#422006' : '#052e16',
            borderRadius: '0.5rem',
            border: `1px solid ${prefersReducedMotion ? '#854d0e' : '#166534'}`,
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: 600,
              color: prefersReducedMotion ? '#fcd34d' : '#4ade80',
            }}
          >
            {prefersReducedMotion
              ? '⚠️ Reduced motion is ENABLED'
              : '✅ Reduced motion is DISABLED'}
          </p>
          <p style={{ margin: '0.5rem 0 0', color: '#a1a1aa', fontSize: '0.875rem' }}>
            {prefersReducedMotion
              ? 'Confetti with disableForReducedMotion will be skipped'
              : 'All confetti animations will play normally'}
          </p>
        </div>
      </DemoCard>

      <DemoCard
        title="Reduced Motion Support"
        description="Automatically disabled when user prefers reduced motion"
      >
        <Button onClick={handleWithCheck}>
          🛡️ With disableForReducedMotion
        </Button>
        <Button onClick={handleWithAccessibility} variant="secondary">
          ♿ With Accessibility Config
        </Button>
        <Button onClick={handleForced} variant="ghost">
          ⚡ Force Animation
        </Button>
      </DemoCard>
      <CodeBlock code={REDUCED_MOTION_CODE} title="Reduced Motion Support" />

      <DemoCard
        title="Detection"
        description="Detect user preference and adapt your UI"
      >
        <p style={{ color: '#a1a1aa', margin: 0 }}>
          Use the <code style={{ color: '#818cf8' }}>useReducedMotion()</code> hook
          to detect preferences and provide alternative experiences
        </p>
      </DemoCard>
      <CodeBlock code={DETECTION_CODE} title="Preference Detection" />

      <DemoCard title="Best Practices" description="Tips for accessible confetti">
        <ul
          style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#a1a1aa',
            lineHeight: 1.8,
          }}
        >
          <li>
            Always set <code style={{ color: '#818cf8' }}>disableForReducedMotion: true</code>{' '}
            for non-essential animations
          </li>
          <li>
            Use <code style={{ color: '#818cf8' }}>ariaHidden: true</code> to hide
            confetti from screen readers
          </li>
          <li>Provide static alternatives when motion is reduced</li>
          <li>Keep animation durations short (under 5 seconds)</li>
          <li>Avoid flashing or strobing effects</li>
        </ul>
      </DemoCard>
    </Section>
  );
});
