/**
 * Presets Demo Section
 * Showcases all 16 built-in confetti presets
 *
 * v1.2.0 - Built-in Presets
 */

import { memo, useState, useCallback, type CSSProperties } from 'react';
import { confetti, getPreset, getPresetNames } from 'react-confetti-burst';
import type { PresetName } from 'react-confetti-burst';
import { Section, CodeBlock } from '../ui';
import { Palette } from 'lucide-react';

const PRESET_EMOJIS: Record<string, string> = {
  default: '✨',
  celebration: '🎉',
  firework: '🎆',
  snow: '❄️',
  rain: '🌧️',
  sparkle: '💫',
  confetti: '🎊',
  emoji: '😀',
  hearts: '❤️',
  stars: '⭐',
  money: '💰',
  pride: '🏳️‍🌈',
  christmas: '🎄',
  halloween: '🎃',
  newYear: '🥂',
  birthday: '🎂',
};

const colors = {
  bg: '#09090b',
  bgCard: '#18181b',
  bgHover: '#1f1f23',
  border: '#27272a',
  borderHover: '#3f3f46',
  text: '#fafafa',
  textMuted: '#a1a1aa',
  accent: '#818cf8',
  accentDim: '#6366f1',
};

const s: Record<string, CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
    padding: '4px',
  },
  card: {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '20px 16px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  },
  cardActive: {
    borderColor: colors.accent,
    background: 'rgba(129, 140, 248, 0.1)',
  },
  emoji: {
    fontSize: '32px',
    lineHeight: 1,
  },
  name: {
    fontSize: '14px',
    fontWeight: 600,
    color: colors.text,
    textTransform: 'capitalize' as const,
  },
  description: {
    fontSize: '11px',
    color: colors.textMuted,
    lineHeight: 1.4,
  },
  fireBtn: {
    marginTop: '4px',
    padding: '6px 16px',
    fontSize: '12px',
    fontWeight: 600,
    background: colors.accentDim,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  detailPanel: {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '20px',
    marginTop: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  },
  detailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  detailTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: colors.text,
    textTransform: 'capitalize' as const,
  },
  detailDesc: {
    fontSize: '14px',
    color: colors.textMuted,
    marginBottom: '16px',
  },
};

const PRESETS_USAGE_CODE = `import { confetti, getPreset } from 'react-confetti-burst';

// Fire a preset by getting its config
const preset = getPreset('celebration');
confetti(preset.options);

// Or use inline
confetti(getPreset('firework').options);
confetti(getPreset('snow').options);
confetti(getPreset('hearts').options);`;

export const PresetsDemo = memo(function PresetsDemo() {
  const [selectedPreset, setSelectedPreset] = useState<PresetName | null>(null);
  const presetNames = getPresetNames();

  const handlePresetClick = useCallback((name: PresetName) => {
    setSelectedPreset(name);
    const preset = getPreset(name);
    confetti({
      ...preset.options,
      origin: { x: 0.5, y: 0.5 },
    });
  }, []);

  const selectedConfig = selectedPreset ? getPreset(selectedPreset) : null;

  const selectedCode = selectedPreset ? `import { confetti, getPreset } from 'react-confetti-burst';

const preset = getPreset('${selectedPreset}');
// ${selectedConfig?.description}

confetti({
  ...preset.options,
  origin: { x: 0.5, y: 0.5 },
});

// Preset config:
// ${JSON.stringify(selectedConfig?.options, null, 2).split('\n').join('\n// ')}` : '';

  return (
    <Section
      id="presets"
      title="Built-in Presets"
      description="16 ready-to-use confetti presets — click any to fire!"
      icon={<Palette size={20} />}
    >
      <div style={s.grid}>
        {presetNames.map((name) => {
          const preset = getPreset(name);
          return (
            <div
              key={name}
              style={{
                ...s.card,
                ...(selectedPreset === name ? s.cardActive : {}),
              }}
              onClick={() => handlePresetClick(name)}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = colors.bgHover;
                el.style.transform = 'translateY(-1px)';
                el.style.borderColor = colors.borderHover;
                el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = selectedPreset === name ? 'rgba(129, 140, 248, 0.1)' : colors.bgCard;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = selectedPreset === name ? colors.accent : colors.border;
                el.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePresetClick(name); }}
              aria-label={`Fire ${name} preset`}
            >
              <span style={s.emoji}>{PRESET_EMOJIS[name] || '🎉'}</span>
              <span style={s.name}>{name}</span>
              <span style={s.description}>{preset.description}</span>
            </div>
          );
        })}
      </div>

      {selectedConfig && (
        <div style={s.detailPanel}>
          <div style={s.detailHeader}>
            <span style={{ fontSize: '28px' }}>{PRESET_EMOJIS[selectedPreset!] || '🎉'}</span>
            <div>
              <div style={s.detailTitle}>{selectedPreset}</div>
              <div style={s.detailDesc}>{selectedConfig.description}</div>
            </div>
            <button
              style={{ ...s.fireBtn, marginLeft: 'auto', padding: '10px 24px', fontSize: '14px' }}
              onClick={() => handlePresetClick(selectedPreset!)}
            >
              Fire Again!
            </button>
          </div>
          <CodeBlock code={selectedCode} title={`${selectedPreset} Preset Code`} />
        </div>
      )}

      <CodeBlock code={PRESETS_USAGE_CODE} title="Using Presets" />
    </Section>
  );
});
