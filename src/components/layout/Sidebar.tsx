/**
 * Sidebar navigation component
 */

import { memo } from 'react';
import { DEMO_SECTIONS } from '../../constants';
import type { DemoSection } from '../../types';
import styles from './Sidebar.module.css';

interface SidebarProps {
  readonly activeSection: DemoSection;
  readonly onSectionChange: (section: DemoSection) => void;
}

export const Sidebar = memo(function Sidebar({
  activeSection,
  onSectionChange,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <h2 className={styles.title}>Demos</h2>
        <ul className={styles.list}>
          {DEMO_SECTIONS.map((section) => (
            <li key={section.id}>
              <button
                className={`${styles.item} ${
                  activeSection === section.id ? styles.active : ''
                }`}
                onClick={() => onSectionChange(section.id)}
                aria-current={activeSection === section.id ? 'page' : undefined}
              >
                <span className={styles.icon} aria-hidden="true">
                  {section.icon}
                </span>
                <span className={styles.label}>{section.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
});
