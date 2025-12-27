/**
 * Demo card component for individual examples
 */

import { memo, type ReactNode } from 'react';
import styles from './DemoCard.module.css';

interface DemoCardProps {
  readonly title: string;
  readonly description?: string;
  readonly children: ReactNode;
  readonly actions?: ReactNode;
}

export const DemoCard = memo(function DemoCard({
  title,
  description,
  children,
  actions,
}: DemoCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.preview}>{children}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
});
