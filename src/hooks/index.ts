/**
 * Custom hooks for the demo playground
 */

import { useState, useCallback, useEffect } from 'react';
import type { DemoSection } from '../types';

/**
 * Hook to manage the active demo section
 */
export function useActiveSection(defaultSection: DemoSection = 'basic') {
  const [activeSection, setActiveSection] = useState<DemoSection>(() => {
    // Check URL hash on initial load
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash) return hash as DemoSection;
    }
    return defaultSection;
  });

  const setSection = useCallback((section: DemoSection) => {
    setActiveSection(section);
    // Update URL hash for deep linking
    window.history.pushState(null, '', `#${section}`);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) setActiveSection(hash as DemoSection);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return [activeSection, setSection] as const;
}

/**
 * Hook to detect reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for clipboard functionality
 */
export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      console.error('Failed to copy to clipboard');
      return false;
    }
  }, []);

  return { copy, copied };
}
