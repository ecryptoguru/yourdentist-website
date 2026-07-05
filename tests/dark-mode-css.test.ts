import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const cssPath = join(process.cwd(), 'src/styles/global.css');
const cssContent = readFileSync(cssPath, 'utf-8');

describe('global.css dark mode', () => {
  describe('CSS variables', () => {
    it('should define --background in :root', () => {
      expect(cssContent).toMatch(/--background:\s*#f8fafc/);
    });

    it('should override --background in .dark', () => {
      expect(cssContent).toMatch(/\.dark\s*\{[^}]*--background:\s*#1c1917/);
    });

    it('should override --cream in .dark', () => {
      expect(cssContent).toMatch(/\.dark\s*\{[^}]*--cream:\s*#1c1917/);
    });

    it('should override --foreground in .dark', () => {
      expect(cssContent).toMatch(/\.dark\s*\{[^}]*--foreground:\s*#fafaf9/);
    });
  });

  describe('Dead teal/amber overrides removed', () => {
    it('should NOT have --color-teal-50 in .dark block', () => {
      const darkBlockMatch = cssContent.match(/\.dark\s*\{([\s\S]*?)\}/);
      expect(darkBlockMatch).toBeTruthy();
      const darkBlock = darkBlockMatch![1];
      expect(darkBlock).not.toContain('--color-teal-50');
    });

    it('should NOT have --color-teal-100 in .dark block', () => {
      const darkBlockMatch = cssContent.match(/\.dark\s*\{([\s\S]*?)\}/);
      const darkBlock = darkBlockMatch![1];
      expect(darkBlock).not.toContain('--color-teal-100');
    });

    it('should NOT have --color-teal-700 in .dark block', () => {
      const darkBlockMatch = cssContent.match(/\.dark\s*\{([\s\S]*?)\}/);
      const darkBlock = darkBlockMatch![1];
      expect(darkBlock).not.toContain('--color-teal-700');
    });

    it('should NOT have --color-amber-50 in .dark block', () => {
      const darkBlockMatch = cssContent.match(/\.dark\s*\{([\s\S]*?)\}/);
      const darkBlock = darkBlockMatch![1];
      expect(darkBlock).not.toContain('--color-amber-50');
    });

    it('should NOT have --color-amber-100 in .dark block', () => {
      const darkBlockMatch = cssContent.match(/\.dark\s*\{([\s\S]*?)\}/);
      const darkBlock = darkBlockMatch![1];
      expect(darkBlock).not.toContain('--color-amber-100');
    });

    it('should NOT have --color-amber-700 in .dark block', () => {
      const darkBlockMatch = cssContent.match(/\.dark\s*\{([\s\S]*?)\}/);
      const darkBlock = darkBlockMatch![1];
      expect(darkBlock).not.toContain('--color-amber-700');
    });
  });

  describe('details[open] summary dark variant', () => {
    it('should have light mode color for details[open] > summary', () => {
      expect(cssContent).toMatch(/details\[open\]\s*>\s*summary\s*\{\s*color:\s*#0f766e/);
    });

    it('should have dark mode override for details[open] > summary', () => {
      expect(cssContent).toMatch(/\.dark\s+details\[open\]\s*>\s*summary\s*\{\s*color:\s*#2dd4bf/);
    });
  });

  describe('color-scheme', () => {
    it('should set color-scheme: light on html', () => {
      expect(cssContent).toMatch(/html\s*\{[^}]*color-scheme:\s*light/);
    });

    it('should set color-scheme: dark for .dark', () => {
      expect(cssContent).toMatch(/\.dark\s+html|html\.dark/);
      expect(cssContent).toMatch(/color-scheme:\s*dark/);
    });
  });

  describe('prose dark mode', () => {
    it('should have .dark .prose color override', () => {
      expect(cssContent).toMatch(/\.dark\s+\.prose\s*\{\s*color:\s*#d6d3d1/);
    });

    it('should have .dark .prose heading color override', () => {
      expect(cssContent).toMatch(/\.dark\s+\.prose\s+h1/);
    });

    it('should have .dark .prose a (link) color override', () => {
      expect(cssContent).toMatch(/\.dark\s+\.prose\s+a\s*\{\s*color:\s*#2dd4bf/);
    });

    it('should have .dark .prose blockquote color override', () => {
      expect(cssContent).toMatch(/\.dark\s+\.prose\s+blockquote/);
    });

    it('should have .dark .prose code background override', () => {
      expect(cssContent).toMatch(/\.dark\s+\.prose\s+code\s*\{\s*background:\s*#44403c/);
    });
  });

  describe('input-premium dark mode', () => {
    it('should have .dark .input-premium:focus override', () => {
      expect(cssContent).toMatch(/\.dark\s+\.input-premium:focus/);
    });
  });
});
