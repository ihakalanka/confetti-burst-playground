/**
 * Header component with navigation
 */

import { memo } from 'react';
import { confetti } from 'react-confetti-burst';
import { PartyPopper, Code2, Package, MessageSquare, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  readonly onMenuToggle?: () => void;
  readonly mobileMenuOpen?: boolean;
  readonly onFeedbackClick?: () => void;
}

export const Header = memo(function Header({ onMenuToggle, mobileMenuOpen, onFeedbackClick }: HeaderProps) {
  const handleLogoClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.1 },
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          {onMenuToggle && (
            <button
              className={styles.menuButton}
              onClick={onMenuToggle}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}
          <button className={styles.logo} onClick={handleLogoClick}>
            <span className={styles.logoIcon}><PartyPopper size={20} /></span>
            <span className={styles.logoText}>react-confetti-burst</span>
          </button>
        </div>

        <nav className={styles.nav}>
          <a
            href="https://github.com/ihakalanka/react-confetti-burst"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <Code2 size={14} />
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/react-confetti-burst"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <Package size={14} />
            npm
          </a>
          <a
            href="https://buymeacoffee.com/akalankaih4"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.supportLink}
          >
            Support
          </a>
          {onFeedbackClick && (
            <button
              type="button"
              className={styles.feedbackLink}
              onClick={onFeedbackClick}
            >
              <MessageSquare size={14} />
              Feedback
            </button>
          )}
        </nav>
      </div>
    </header>
  );
});
