import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Tests for the ThemeToggle dark mode logic.
 * The ThemeToggle.astro script is inline and not importable,
 * so we replicate the exact logic and test it against a real DOM.
 */

function setupDOM() {
  document.documentElement.className = '';
  document.body.innerHTML = `
    <button id="theme-toggle" aria-label="Switch to dark mode" title="Switch theme"></button>
    <meta name="theme-color" content="#0d9488" id="meta-theme-color" />
  `;
  const toggle = document.getElementById('theme-toggle') as HTMLButtonElement;
  const meta = document.getElementById('meta-theme-color') as HTMLMetaElement;

  function updateToggleIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    toggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle?.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    if (meta) meta.setAttribute('content', isDark ? '#1c1917' : '#0d9488');
  }

  return { toggle, meta, updateToggleIcon };
}

describe('ThemeToggle', () => {
  let toggle: HTMLButtonElement;
  let meta: HTMLMetaElement;
  let updateToggleIcon: () => void;

  beforeEach(() => {
    localStorage.clear();
    const setup = setupDOM();
    toggle = setup.toggle;
    meta = setup.meta;
    updateToggleIcon = setup.updateToggleIcon;
  });

  describe('updateToggleIcon', () => {
    it('should set aria-label to "Switch to dark mode" when in light mode', () => {
      updateToggleIcon();
      expect(toggle.getAttribute('aria-label')).toBe('Switch to dark mode');
    });

    it('should set aria-label to "Switch to light mode" when in dark mode', () => {
      document.documentElement.classList.add('dark');
      updateToggleIcon();
      expect(toggle.getAttribute('aria-label')).toBe('Switch to light mode');
    });

    it('should set aria-pressed to "false" when in light mode', () => {
      updateToggleIcon();
      expect(toggle.getAttribute('aria-pressed')).toBe('false');
    });

    it('should set aria-pressed to "true" when in dark mode', () => {
      document.documentElement.classList.add('dark');
      updateToggleIcon();
      expect(toggle.getAttribute('aria-pressed')).toBe('true');
    });

    it('should set theme-color meta to #0d9488 when in light mode', () => {
      updateToggleIcon();
      expect(meta.getAttribute('content')).toBe('#0d9488');
    });

    it('should set theme-color meta to #1c1917 when in dark mode', () => {
      document.documentElement.classList.add('dark');
      updateToggleIcon();
      expect(meta.getAttribute('content')).toBe('#1c1917');
    });
  });

  describe('click handler', () => {
    it('should add dark class when toggling from light to dark', () => {
      const clickHandler = () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
        updateToggleIcon();
      };
      toggle.addEventListener('click', clickHandler);
      toggle.click();
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should remove dark class when toggling from dark to light', () => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');

      const clickHandler = () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
        updateToggleIcon();
      };
      toggle.addEventListener('click', clickHandler);
      toggle.click();
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorage.getItem('theme')).toBe('light');
    });

    it('should update aria-pressed after toggle', () => {
      const clickHandler = () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
        updateToggleIcon();
      };
      toggle.addEventListener('click', clickHandler);
      toggle.click();
      expect(toggle.getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('storage event handler', () => {
    it('should add dark class when storage event fires with "dark"', () => {
      const storageHandler = (e: StorageEvent) => {
        if (e.key === 'theme') {
          const isDark = e.newValue === 'dark';
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          updateToggleIcon();
        }
      };
      window.addEventListener('storage', storageHandler);

      const event = new StorageEvent('storage', {
        key: 'theme',
        newValue: 'dark',
      });
      window.dispatchEvent(event);

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(toggle.getAttribute('aria-pressed')).toBe('true');
    });

    it('should remove dark class when storage event fires with "light"', () => {
      document.documentElement.classList.add('dark');

      const storageHandler = (e: StorageEvent) => {
        if (e.key === 'theme') {
          const isDark = e.newValue === 'dark';
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          updateToggleIcon();
        }
      };
      window.addEventListener('storage', storageHandler);

      const event = new StorageEvent('storage', {
        key: 'theme',
        newValue: 'light',
      });
      window.dispatchEvent(event);

      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(toggle.getAttribute('aria-pressed')).toBe('false');
    });

    it('should not react to storage events for other keys', () => {
      const storageHandler = (e: StorageEvent) => {
        if (e.key === 'theme') {
          const isDark = e.newValue === 'dark';
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          updateToggleIcon();
        }
      };
      window.addEventListener('storage', storageHandler);

      const event = new StorageEvent('storage', {
        key: 'other-key',
        newValue: 'dark',
      });
      window.dispatchEvent(event);

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });
});
