/**
 * Interactive Control Panel for Confetti Playground
 * Modern, polished UI with inline styles for reliability
 */

import { memo, useState, useCallback, useMemo, useEffect, type CSSProperties } from 'react';
import { confetti, getPreset, getPresetNames } from 'react-confetti-burst';
import type { PresetName } from 'react-confetti-burst';

function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

// ============================================================================
// TYPES
// ============================================================================

interface ConfettiSettings {
  particleCount: number;
  spread: number;
  startVelocity: number;
  decay: number;
  gravity: number;
  drift: number;
  ticks: number;
  colors: string[];
  scalar: number;
  angle: number;
  originX: number;
  originY: number;
  flat: boolean;
}

interface ControlConfig {
  key: keyof ConfettiSettings;
  label: string;
  description: string;
  type: 'number' | 'boolean' | 'colors';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  defaultValue: number | boolean | string[];
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_SETTINGS: ConfettiSettings = {
  particleCount: 50,
  spread: 70,
  startVelocity: 30,
  decay: 0.94,
  gravity: 1,
  drift: 0,
  ticks: 200,
  colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#22c55e'],
  scalar: 1,
  angle: 90,
  originX: 0.5,
  originY: 0.5,
  flat: false,
};

const CONTROLS: ControlConfig[] = [
  { key: 'particleCount', label: 'particleCount', description: 'Number of confetti particles to launch', type: 'number', min: 1, max: 500, step: 1, defaultValue: 50 },
  { key: 'spread', label: 'spread', description: 'Angle spread in degrees for particle distribution', type: 'number', min: 0, max: 360, step: 1, unit: '°', defaultValue: 70 },
  { key: 'startVelocity', label: 'startVelocity', description: 'Initial velocity of particles', type: 'number', min: 1, max: 100, step: 1, defaultValue: 30 },
  { key: 'angle', label: 'angle', description: 'Launch angle in degrees (90 = up)', type: 'number', min: 0, max: 360, step: 1, unit: '°', defaultValue: 90 },
  { key: 'gravity', label: 'gravity', description: 'Gravity pull on particles', type: 'number', min: 0, max: 3, step: 0.1, defaultValue: 1 },
  { key: 'drift', label: 'drift', description: 'Horizontal drift of particles', type: 'number', min: -5, max: 5, step: 0.1, defaultValue: 0 },
  { key: 'decay', label: 'decay', description: 'Speed decay rate per frame', type: 'number', min: 0.8, max: 1, step: 0.01, defaultValue: 0.94 },
  { key: 'scalar', label: 'scalar', description: 'Size multiplier for particles', type: 'number', min: 0.5, max: 3, step: 0.1, unit: 'x', defaultValue: 1 },
  { key: 'ticks', label: 'ticks', description: 'Lifetime of particles in frames', type: 'number', min: 50, max: 500, step: 10, defaultValue: 200 },
  { key: 'originX', label: 'origin.x', description: 'Horizontal origin position', type: 'number', min: 0, max: 1, step: 0.05, defaultValue: 0.5 },
  { key: 'originY', label: 'origin.y', description: 'Vertical origin position', type: 'number', min: 0, max: 1, step: 0.05, defaultValue: 0.5 },
  { key: 'flat', label: 'flat', description: 'Disable particle rotation', type: 'boolean', defaultValue: false },
  { key: 'colors', label: 'colors', description: 'Particle colors array', type: 'colors', defaultValue: ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#22c55e'] },
];

const PRESET_EMOJIS: Record<string, string> = {
  default: '✨', celebration: '🎉', firework: '🎆', snow: '❄️', rain: '🌧️',
  sparkle: '💫', confetti: '🎊', emoji: '😀', hearts: '❤️', stars: '⭐',
  money: '💰', pride: '🏳️‍🌈', christmas: '🎄', halloween: '🎃', newYear: '🥂', birthday: '🎂',
};

const LIBRARY_PRESETS = getPresetNames().map((name) => {
  const preset = getPreset(name);
  return { id: name, emoji: PRESET_EMOJIS[name] || '🎉', label: name, description: preset.description };
});

// ============================================================================
// STYLES
// ============================================================================

const colors = {
  bg: '#09090b',
  bgCard: '#18181b',
  bgHover: '#27272a',
  bgInput: '#27272a',
  border: '#27272a',
  borderLight: '#3f3f46',
  text: '#fafafa',
  textMuted: '#a1a1aa',
  textDim: '#71717a',
  accent: '#818cf8',
  accentHover: '#a5b4fc',
  gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
  gradientSubtle: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(129,140,248,0.08) 100%)',
};

const s: Record<string, CSSProperties> = {
  // Container
  container: {
    background: colors.bgCard,
    borderRadius: '16px',
    border: `1px solid ${colors.border}`,
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
  },

  // Header
  header: {
    background: colors.bgCard,
    padding: '28px 32px',
    textAlign: 'center',
    position: 'relative',
    borderBottom: `1px solid ${colors.border}`,
  },
  headerGlow: {
    position: 'absolute',
    top: '-60%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '400px',
    height: '200px',
    background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  headerContent: {
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    color: colors.text,
    margin: '0 0 6px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '13px',
    color: colors.textMuted,
    margin: 0,
  },
  fireBtn: {
    marginTop: '20px',
    padding: '12px 28px',
    fontSize: '14px',
    fontWeight: 600,
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 0 20px rgba(129, 140, 248, 0.15)',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  },

  // Presets
  presetsBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 24px',
    background: colors.bg,
    borderBottom: `1px solid ${colors.border}`,
    overflowX: 'auto',
    flexWrap: 'wrap',
  },
  presetBtn: {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 500,
    background: colors.bgInput,
    color: colors.textMuted,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  presetBtnActive: {
    background: 'rgba(129, 140, 248, 0.15)',
    color: colors.accent,
    borderColor: colors.accent,
  },
  resetBtn: {
    marginLeft: 'auto',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 500,
    background: 'transparent',
    color: colors.textDim,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  // Controls
  controlsContainer: {
    padding: '8px',
  },
  controlRow: {
    display: 'grid',
    gridTemplateColumns: '180px 1fr 80px 280px',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    borderRadius: '12px',
    transition: 'background 0.2s',
  },
  controlRowAlt: {
    background: 'rgba(255,255,255,0.02)',
  },

  // Property
  propCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  propName: {
    fontFamily: '"SF Mono", "Fira Code", monospace',
    fontSize: '13px',
    fontWeight: 600,
    color: colors.text,
  },
  propType: {
    fontSize: '11px',
    color: colors.accent,
    fontWeight: 500,
  },

  // Description
  description: {
    fontSize: '13px',
    color: colors.textMuted,
    lineHeight: 1.5,
  },

  // Default
  defaultVal: {
    fontFamily: '"SF Mono", "Fira Code", monospace',
    fontSize: '12px',
    color: colors.textDim,
    textAlign: 'center',
  },

  // Slider
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sliderWrapper: {
    flex: 1,
    position: 'relative',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
  },
  sliderTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '6px',
    background: colors.bgInput,
    borderRadius: '3px',
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    background: colors.accent,
    borderRadius: '3px',
    transition: 'width 0.1s',
  },
  sliderInput: {
    position: 'absolute',
    width: '100%',
    height: '36px',
    opacity: 0,
    cursor: 'pointer',
    margin: 0,
  },
  sliderThumb: {
    position: 'absolute',
    width: '18px',
    height: '18px',
    background: '#fff',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    pointerEvents: 'none',
    transition: 'transform 0.1s',
    transform: 'translateX(-50%)',
  },
  sliderValue: {
    minWidth: '60px',
    padding: '6px 10px',
    background: colors.bgInput,
    borderRadius: '6px',
    fontFamily: '"SF Mono", "Fira Code", monospace',
    fontSize: '12px',
    fontWeight: 600,
    color: colors.accent,
    textAlign: 'center',
    border: `1px solid ${colors.border}`,
  },

  // Toggle
  toggleContainer: {
    display: 'flex',
    gap: '4px',
  },
  toggleBtn: {
    flex: 1,
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: 600,
    background: colors.bgInput,
    color: colors.textMuted,
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  toggleBtnActive: {
    background: '#6366f1',
    color: '#fff',
    borderColor: 'transparent',
  },

  // Colors
  colorsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  colorWrapper: {
    position: 'relative',
  },
  colorInput: {
    width: '36px',
    height: '36px',
    padding: 0,
    border: `2px solid ${colors.border}`,
    borderRadius: '8px',
    cursor: 'pointer',
    overflow: 'hidden',
    background: 'transparent',
  },
  colorRemove: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    width: '18px',
    height: '18px',
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    fontSize: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s',
  },
  colorAdd: {
    width: '36px',
    height: '36px',
    background: colors.bgInput,
    border: `2px dashed ${colors.border}`,
    borderRadius: '8px',
    color: colors.textMuted,
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },

  // Code
  codeSection: {
    borderTop: `1px solid ${colors.border}`,
  },
  codeHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    background: colors.bg,
  },
  codeTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: colors.textMuted,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  codeCopyBtn: {
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: 600,
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  codeBlock: {
    padding: '20px 24px',
    background: '#09090b',
    margin: 0,
    overflow: 'auto',
  },
  code: {
    fontFamily: '"SF Mono", "Fira Code", monospace',
    fontSize: '13px',
    lineHeight: 1.6,
    color: '#e4e4e7',
  },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  label?: string;
  onChange: (v: number) => void;
}

const Slider = memo(function Slider({ value, min, max, step, unit = '', label, onChange }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div style={s.sliderContainer}>
      <div style={s.sliderWrapper}>
        <div style={s.sliderTrack}>
          <div style={{ ...s.sliderFill, width: `${percentage}%` }} />
        </div>
        <div style={{ ...s.sliderThumb, left: `${percentage}%` }} />
        <input
          type="range"
          style={s.sliderInput}
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
      <div style={s.sliderValue}>{value}{unit}</div>
    </div>
  );
});

interface ToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
}

const Toggle = memo(function Toggle({ value, onChange }: ToggleProps) {
  return (
    <div style={s.toggleContainer}>
      <button
        style={{ ...s.toggleBtn, ...(!value ? s.toggleBtnActive : {}) }}
        onClick={() => onChange(false)}
      >
        False
      </button>
      <button
        style={{ ...s.toggleBtn, ...(value ? s.toggleBtnActive : {}) }}
        onClick={() => onChange(true)}
      >
        True
      </button>
    </div>
  );
});

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

const ColorPicker = memo(function ColorPicker({ colors: colorList, onChange }: ColorPickerProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const addColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const hex = hslToHex(hue, 70, 60);
    onChange([...colorList, hex]);
  };

  const removeColor = (index: number) => {
    if (colorList.length > 1) {
      onChange(colorList.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...colorList];
    newColors[index] = color;
    onChange(newColors);
  };

  return (
    <div style={s.colorsContainer}>
      {colorList.map((color, i) => (
        <div
          key={i}
          style={s.colorWrapper}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <input
            type="color"
            value={color}
            onChange={(e) => updateColor(i, e.target.value)}
            style={s.colorInput}
            aria-label={`Color ${i + 1}: ${color}`}
          />
          {colorList.length > 1 && (
            <button
              style={{ ...s.colorRemove, opacity: hoveredIndex === i ? 1 : 0 }}
              onClick={() => removeColor(i)}
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button style={s.colorAdd} onClick={addColor}>+</button>
    </div>
  );
});

// Helper to convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ControlPanel = memo(function ControlPanel() {
  const isMobile = useIsMobile();
  const [settings, setSettings] = useState<ConfettiSettings>(DEFAULT_SETTINGS);
  const [activePreset, setActivePreset] = useState('default');
  const [copied, setCopied] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const update = useCallback(<K extends keyof ConfettiSettings>(key: K, value: ConfettiSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setActivePreset('');
  }, []);

  const fire = useCallback(() => {
    confetti({
      particleCount: settings.particleCount,
      spread: settings.spread,
      startVelocity: settings.startVelocity,
      decay: settings.decay,
      gravity: settings.gravity,
      drift: settings.drift,
      ticks: settings.ticks,
      colors: settings.colors,
      scalar: settings.scalar,
      angle: settings.angle,
      origin: { x: settings.originX, y: settings.originY },
      flat: settings.flat,
    });
  }, [settings]);

  const applyPreset = useCallback((presetId: string) => {
    try {
      const preset = getPreset(presetId as PresetName);
      const opts = preset.options;
      setSettings(prev => ({
        ...prev,
        particleCount: opts.particleCount ?? prev.particleCount,
        spread: opts.direction?.spread ?? prev.spread,
        gravity: opts.physics?.gravity != null ? opts.physics.gravity * 4 : prev.gravity,
        drift: opts.drift ?? prev.drift,
        decay: opts.physics?.friction ?? prev.decay,
        ticks: opts.ticks ?? prev.ticks,
        scalar: opts.scalar ?? prev.scalar,
        colors: opts.particle?.colors ? [...opts.particle.colors] as string[] : prev.colors,
        flat: opts.flat ?? prev.flat,
      }));
      setActivePreset(presetId);
    } catch {
      setSettings(DEFAULT_SETTINGS);
      setActivePreset('default');
    }
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setActivePreset('default');
  }, []);

  const code = useMemo(() => {
    const lines = [
      "import { confetti } from 'react-confetti-burst';",
      '',
      'confetti({',
      `  particleCount: ${settings.particleCount},`,
      `  spread: ${settings.spread},`,
      `  startVelocity: ${settings.startVelocity},`,
      `  decay: ${settings.decay},`,
      `  gravity: ${settings.gravity},`,
    ];
    if (settings.drift !== 0) lines.push(`  drift: ${settings.drift},`);
    lines.push(
      `  ticks: ${settings.ticks},`,
      `  colors: [${settings.colors.map(c => `'${c}'`).join(', ')}],`,
      `  scalar: ${settings.scalar},`,
      `  angle: ${settings.angle},`,
      `  origin: { x: ${settings.originX}, y: ${settings.originY} },`,
    );
    if (settings.flat) lines.push('  flat: true,');
    lines.push('});');
    return lines.join('\n');
  }, [settings]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerGlow} />
        <div style={s.headerContent}>
          <h2 style={s.title}>
            <span>🎮</span>
            Confetti Playground
          </h2>
          <p style={s.subtitle}>Customize your confetti and see the magic!</p>
          <button
            style={s.fireBtn}
            onClick={fire}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(129, 140, 248, 0.25)'; e.currentTarget.style.background = '#818cf8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(129, 140, 248, 0.15)'; e.currentTarget.style.background = '#6366f1'; }}
          >
            <span style={{ fontSize: '20px' }}>🎉</span>
            Fire Confetti!
          </button>
        </div>
      </div>

      {/* Presets */}
      <div style={s.presetsBar}>
        {LIBRARY_PRESETS.map(preset => (
          <button
            key={preset.id}
            style={{
              ...s.presetBtn,
              ...(activePreset === preset.id ? s.presetBtnActive : {}),
            }}
            onClick={() => applyPreset(preset.id)}
            title={preset.description}
          >
            <span>{preset.emoji}</span>
            {preset.label}
          </button>
        ))}
        <button style={s.resetBtn} onClick={reset}>↺ Reset</button>
      </div>

      {/* Controls */}
      <div style={s.controlsContainer}>
        {CONTROLS.map((config, index) => (
          <div
            key={config.key}
            style={{
              ...s.controlRow,
              ...(isMobile ? { gridTemplateColumns: '1fr', gap: '8px', padding: '12px 16px' } : {}),
              ...(index % 2 === 1 ? s.controlRowAlt : {}),
              ...(hoveredRow === config.key ? { background: colors.bgHover } : {}),
            }}
            onMouseEnter={() => setHoveredRow(config.key)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Name */}
            <div style={{ ...s.propCell, ...(isMobile ? { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } : {}) }}>
              <span style={s.propName}>{config.label}</span>
              <span style={s.propType}>{config.type}</span>
            </div>

            {/* Description - hidden on mobile */}
            {!isMobile && <div style={s.description}>{config.description}</div>}

            {/* Default - hidden on mobile */}
            {!isMobile && (
              <div style={s.defaultVal}>
                {config.type === 'colors' ? '—' : String(config.defaultValue)}
              </div>
            )}

            {/* Control */}
            <div>
              {config.type === 'number' && (
                <Slider
                  value={settings[config.key] as number}
                  min={config.min!}
                  max={config.max!}
                  step={config.step!}
                  unit={config.unit}
                  label={config.label}
                  onChange={(v) => update(config.key, v as never)}
                />
              )}
              {config.type === 'boolean' && (
                <Toggle
                  value={settings[config.key] as boolean}
                  onChange={(v) => update(config.key, v as never)}
                />
              )}
              {config.type === 'colors' && (
                <ColorPicker
                  colors={settings[config.key] as string[]}
                  onChange={(v) => update(config.key, v as never)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Code */}
      <div style={s.codeSection}>
        <div style={s.codeHeader}>
          <span style={s.codeTitle}>
            <span>{'</>'}</span>
            Generated Code
          </span>
          <button style={s.codeCopyBtn} onClick={copyCode}>
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <pre style={s.codeBlock}>
          <code style={s.code}>{code}</code>
        </pre>
      </div>
    </div>
  );
});
