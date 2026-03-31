/**
 * Feedback Form Demo Section
 * Allows users to submit feedback via Google Sheets (Apps Script)
 *
 * Submissions are sent to a Google Spreadsheet:
 *   Sheet: "Confetti-Feedback"
 *   ID: 1yaF6bwtPa5GuF0Z_oA6heawZ9J-0i8x2KH8ZSsynjq4
 */

import { memo, useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { confetti } from 'react-confetti-burst';
import { MessageSquare, Lightbulb, Bug, MessageCircle, PartyPopper } from 'lucide-react';
import { Section } from '../ui';
import styles from './FeedbackForm.module.css';

type FeedbackType = 'feature' | 'bug' | 'other';

interface FeedbackPayload {
  readonly type: FeedbackType;
  readonly title: string;
  readonly description: string;
  readonly email: string;
  readonly page: string;
  readonly userAgent: string;
  readonly timestamp: string;
  readonly _hp: string;
}

const FEEDBACK_URL = import.meta.env.VITE_FEEDBACK_URL as string | undefined;

const TYPE_OPTIONS: readonly { readonly value: FeedbackType; readonly label: string; readonly icon: ReactNode }[] = [
  { value: 'feature', label: 'Feature Request', icon: <Lightbulb size={18} /> },
  { value: 'bug', label: 'Bug Report', icon: <Bug size={18} /> },
  { value: 'other', label: 'Other', icon: <MessageCircle size={18} /> },
];

const MAX_DESCRIPTION = 2000;
const COOLDOWN_SECONDS = 30;

async function submitFeedback(payload: FeedbackPayload): Promise<boolean> {
  const url = FEEDBACK_URL;
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    return res.ok || res.type === 'opaque';
  } catch {
    // Fallback: Google Apps Script may trigger CORS on redirect
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      mode: 'no-cors',
    });
    return true;
  }
}

export const FeedbackForm = memo(function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('feature');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cooldown tick — counts down once per second after successful submit
  useEffect(() => {
    if (cooldownRemaining <= 0) {
      if (cooldownRef.current) {
        clearInterval(cooldownRef.current);
        cooldownRef.current = null;
      }
      return;
    }
    cooldownRef.current = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, [cooldownRemaining > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!FEEDBACK_URL) {
      setError('Feedback service not configured.');
      return;
    }

    // Honeypot check — bots fill this, humans don't see it
    if (honeypot) {
      // Silently pretend success to avoid tipping off bots
      setSuccess(true);
      return;
    }

    // Cooldown check
    if (cooldownRemaining > 0) {
      setError(`Please wait ${cooldownRemaining}s before submitting again.`);
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    if (trimmedTitle.length < 5) {
      setError('Title must be at least 5 characters.');
      return;
    }
    if (trimmedDesc.length < 10) {
      setError('Description must be at least 10 characters.');
      return;
    }

    setSubmitting(true);

    const payload: FeedbackPayload = {
      type: feedbackType,
      title: trimmedTitle,
      description: trimmedDesc,
      email: email.trim(),
      page: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      _hp: honeypot,
    };

    try {
      const ok = await submitFeedback(payload);
      if (!ok) throw new Error('Submission failed');

      setSuccess(true);
      setCooldownRemaining(COOLDOWN_SECONDS);
      // Celebrate with confetti on successful submission
      confetti({ particleCount: 120, spread: 80, origin: { x: 0.5, y: 0.6 } });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [feedbackType, title, description, email, honeypot, cooldownRemaining]);

  const handleReset = useCallback(() => {
    setFeedbackType('feature');
    setTitle('');
    setDescription('');
    setEmail('');
    setHoneypot('');
    setError('');
    setSuccess(false);
  }, []);

  if (success) {
    return (
      <Section
        id="feedback"
        title="Feedback"
        description="Help us improve react-confetti-burst"
        icon={<MessageSquare size={20} />}
      >
        <div className={styles.successCard}>
          <span className={styles.successIcon}><PartyPopper size={32} /></span>
          <h3 className={styles.successTitle}>Thanks for your feedback!</h3>
          <p className={styles.successText}>
            We've received your submission and will review it soon.
          </p>
          <button
            type="button"
            className={styles.submitAnother}
            onClick={handleReset}
          >
            Submit Another
          </button>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="feedback"
      title="Feedback"
      description="Got an idea or found a bug? Let us know — every submission goes straight to our team."
      icon={<MessageSquare size={20} />}
    >
      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
        {/* Type selector */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>What's this about?</legend>
          <div className={styles.typeGrid}>
            {TYPE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`${styles.typeOption} ${feedbackType === opt.value ? styles.typeActive : ''}`}
                data-type={opt.value}
              >
                <input
                  type="radio"
                  name="type"
                  value={opt.value}
                  checked={feedbackType === opt.value}
                  onChange={() => setFeedbackType(opt.value)}
                  className={styles.hiddenRadio}
                />
                <span className={styles.typeIcon}>{opt.icon}</span>
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Title */}
        <div className={styles.field}>
          <label htmlFor="fb-title" className={styles.label}>
            Title <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="fb-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={5}
            maxLength={120}
            placeholder="Short summary of your feedback"
            className={styles.input}
          />
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label htmlFor="fb-description" className={styles.label}>
            Description <span className={styles.required}>*</span>
          </label>
          <textarea
            id="fb-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
            maxLength={MAX_DESCRIPTION}
            rows={5}
            placeholder="Describe the feature you'd like or the bug you found..."
            className={`${styles.input} ${styles.textarea}`}
          />
          <p className={styles.charCount}>
            {description.length} / {MAX_DESCRIPTION}
          </p>
        </div>

        {/* Email (optional) */}
        <div className={styles.field}>
          <label htmlFor="fb-email" className={styles.label}>
            Email <span className={styles.optional}>(optional — if you'd like us to follow up)</span>
          </label>
          <input
            type="email"
            id="fb-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={100}
            placeholder="you@example.com"
            className={styles.input}
          />
        </div>

        {/* Honeypot — hidden from humans, caught by bots */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="fb-website">Website</label>
          <input
            type="text"
            id="fb-website"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Submit */}
        <div className={styles.submitRow}>
          <button
            type="submit"
            disabled={submitting || cooldownRemaining > 0}
            className={styles.submitBtn}
          >
            {submitting ? 'Submitting...' : cooldownRemaining > 0 ? `Wait ${cooldownRemaining}s` : 'Submit Feedback'}
          </button>
          {error && <span className={styles.error}>{error}</span>}
          {cooldownRemaining > 0 && !error && (
            <span className={styles.cooldown}>
              You can submit again in {cooldownRemaining}s
            </span>
          )}
        </div>
      </form>
    </Section>
  );
});
