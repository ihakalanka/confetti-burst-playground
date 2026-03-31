/**
 * Custom Shapes Demo Section
 * Shows SVG paths, emoji, and text shapes
 *
 * v1.4.0 - Custom Shapes Features
 */

import { memo, useCallback, useMemo } from 'react';
import {
  useConfetti,
  shapeFromPath,
  shapeFromText,
  shapesFromEmoji,
} from 'react-confetti-burst';
import { Section, DemoCard, Button, CodeBlock } from '../ui';
import { Shapes } from 'lucide-react';

const PATH_SHAPES_CODE = `import { shapeFromPath } from 'react-confetti-burst';

// Create custom SVG path shapes
const star = shapeFromPath({
  path: 'M0,-1 L0.588,0.809 L-0.951,-0.309 L0.951,-0.309 L-0.588,0.809 Z'
});

const heart = shapeFromPath({
  path: 'M0,-0.6 C-0.5,-1.1 -1.1,-0.4 0,-0.1 C1.1,-0.4 0.5,-1.1 0,-0.6 Z'
});

const diamond = shapeFromPath({
  path: 'M0,-1 L0.6,0 L0,-1 L-0.6,0 Z'
});

fire(origin, {
  particle: {
    shapes: [star, heart, diamond, 'circle']
  }
});`;

const EMOJI_SHAPES_CODE = `import {
  shapeFromText,
  shapesFromEmoji,
} from 'react-confetti-burst';

// Single emoji shape
const heart = shapeFromText({ text: '❤️', scalar: 2 });

// Batch emoji shapes from an array
const party = shapesFromEmoji(['🎉', '🎊', '✨', '🥳']);

// Heart emoji set
const hearts = shapesFromEmoji(['❤️', '💖', '💕', '💗', '💝']);

// Star emoji set
const stars = shapesFromEmoji(['⭐', '🌟', '✨', '💫']);

fire(origin, {
  particle: { shapes: party }
});`;

const TEXT_SHAPES_CODE = `import { shapeFromText } from 'react-confetti-burst';

// Custom text shape with styling
const yay = shapeFromText({
  text: 'YAY',
  fontFamily: 'Impact',
  color: '#ff0000',
  scalar: 1.5
});

fire(origin, {
  particle: { shapes: [yay] }
});`;

// Pre-built SVG paths for the demo
const STAR_PATH = 'M0,-1 L0.588,0.809 L-0.951,-0.309 L0.951,-0.309 L-0.588,0.809 Z';
const HEART_PATH = 'M0,0.6 C-0.5,1.1 -1.1,0.4 0,0.1 C1.1,0.4 0.5,1.1 0,0.6 Z';
const DIAMOND_PATH = 'M0,-1 L0.6,0 L0,1 L-0.6,0 Z';

export const ShapesDemo = memo(function ShapesDemo() {
  const { fire } = useConfetti();

  // Create path shapes once via useMemo
  const pathShapes = useMemo(
    () => ({
      star: shapeFromPath({ path: STAR_PATH }),
      heart: shapeFromPath({ path: HEART_PATH }),
      diamond: shapeFromPath({ path: DIAMOND_PATH }),
    }),
    []
  );

  // Create emoji shape sets once via useMemo
  const emojiSets = useMemo(
    () => ({
      party: shapesFromEmoji(['🎉', '🎊', '✨', '🥳', '🎈']),
      hearts: shapesFromEmoji(['❤️', '💖', '💕', '💗', '💝']),
      stars: shapesFromEmoji(['⭐', '🌟', '✨', '💫']),
    }),
    []
  );

  const handlePathShapes = useCallback(
    (e: React.MouseEvent) => {
      fire(
        { x: e.clientX, y: e.clientY },
        {
          particleCount: 50,
          particle: {
            shapes: [
              pathShapes.star,
              pathShapes.heart,
              pathShapes.diamond,
              'circle',
            ],
          },
        }
      );
    },
    [fire, pathShapes]
  );

  const handleEmojiShapes = useCallback(
    (e: React.MouseEvent) => {
      fire(
        { x: e.clientX, y: e.clientY },
        {
          particleCount: 40,
          particle: {
            shapes: emojiSets.party,
          },
        }
      );
    },
    [fire, emojiSets]
  );

  const handleHearts = useCallback(
    (e: React.MouseEvent) => {
      fire(
        { x: e.clientX, y: e.clientY },
        {
          particleCount: 40,
          particle: {
            shapes: emojiSets.hearts,
            colors: ['#ff6b6b', '#ff8787', '#ffa8a8'],
          },
        }
      );
    },
    [fire, emojiSets]
  );

  const handleStars = useCallback(
    (e: React.MouseEvent) => {
      fire(
        { x: e.clientX, y: e.clientY },
        {
          particleCount: 50,
          particle: {
            shapes: emojiSets.stars,
            colors: ['#ffd700', '#ffed4a', '#fff9c4'],
          },
        }
      );
    },
    [fire, emojiSets]
  );

  const handleTextShape = useCallback(
    (e: React.MouseEvent) => {
      const yay = shapeFromText({
        text: 'YAY!',
        fontFamily: 'Arial Black',
        scalar: 1.5,
      });
      fire(
        { x: e.clientX, y: e.clientY },
        {
          particleCount: 20,
          particle: {
            shapes: [yay],
            colors: ['#ff6b6b', '#4ecdc4', '#ffe66d'],
          },
        }
      );
    },
    [fire]
  );

  return (
    <Section
      id="shapes"
      title="Custom Shapes"
      description="Create confetti from SVG paths, emoji, and text"
      icon={<Shapes size={20} />}
    >
      <DemoCard
        title="SVG Path Shapes"
        description="Use shapeFromPath() with custom SVG path strings"
      >
        <Button onClick={handlePathShapes}>
          ⭐ Path Shapes
        </Button>
      </DemoCard>
      <CodeBlock code={PATH_SHAPES_CODE} title="SVG Path Shapes" />

      <DemoCard
        title="Emoji Shapes"
        description="Turn any emoji into confetti particles with shapesFromEmoji()"
      >
        <Button onClick={handleEmojiShapes} variant="secondary">
          🎉 Party Emoji
        </Button>
        <Button onClick={handleHearts} variant="secondary">
          ❤️ Hearts
        </Button>
        <Button onClick={handleStars} variant="secondary">
          ⭐ Stars
        </Button>
      </DemoCard>
      <CodeBlock code={EMOJI_SHAPES_CODE} title="Emoji Shapes" />

      <DemoCard
        title="Text Shapes"
        description="Create confetti from custom text with shapeFromText()"
      >
        <Button onClick={handleTextShape}>
          📝 Text: "YAY!"
        </Button>
      </DemoCard>
      <CodeBlock code={TEXT_SHAPES_CODE} title="Text Shapes" />
    </Section>
  );
});
