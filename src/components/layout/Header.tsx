/**
 * Header component with navigation
 */

import { memo } from 'react';
import { confetti } from 'react-confetti-burst';
import styles from './Header.module.css';

export const Header = memo(function Header() {
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
        <button className={styles.logo} onClick={handleLogoClick}>
          <span className={styles.logoIcon}>🎉</span>
          <span className={styles.logoText}>react-confetti-burst</span>
        </button>

        <nav className={styles.nav}>
          <a
            href="https://github.com/your-username/react-confetti-burst"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/react-confetti-burst"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            npm
          </a>
          <a
            href="https://buymeacoffee.com/akalankaih4"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.supportLink}
          >
            ☕ Support
          </a>
        </nav>
      </div>
    </header>
  );
});
