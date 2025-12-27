/**
 * Section wrapper component for demo sections
 */

import { memo, type ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly children: ReactNode;
}

export const Section = memo(function Section({
  id,
  title,
  description,
  icon,
  children,
}: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <header className={styles.header}>
        <span className={styles.icon} role="img" aria-hidden="true">
          {icon}
        </span>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
});
