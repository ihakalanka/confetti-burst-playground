/**
 * Reusable UI components
 */

import { memo, forwardRef, type ReactNode, type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: 'primary' | 'secondary' | 'ghost';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly children: ReactNode;
}

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      className,
    ].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classNames} {...props}>
        {children}
      </button>
    );
  }
));
