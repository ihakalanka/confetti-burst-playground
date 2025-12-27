/**
 * Code display component with syntax highlighting placeholder
 */

import { memo } from 'react';
import { useClipboard } from '../../hooks';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  readonly code: string;
  readonly language?: string;
  readonly title?: string;
}

export const CodeBlock = memo(function CodeBlock({
  code,
  language = 'tsx',
  title,
}: CodeBlockProps) {
  const { copy, copied } = useClipboard();

  return (
    <div className={styles.container}>
      {title && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <span className={styles.language}>{language}</span>
        </div>
      )}
      <div className={styles.codeWrapper}>
        <pre className={styles.pre}>
          <code className={styles.code}>{code}</code>
        </pre>
        <button
          className={styles.copyButton}
          onClick={() => copy(code)}
          aria-label="Copy code to clipboard"
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
    </div>
  );
});
