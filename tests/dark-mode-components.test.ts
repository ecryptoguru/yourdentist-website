import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

function hasDarkVariant(content: string, lightClass: string): boolean {
  const pattern = new RegExp(
    `${lightClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*?dark:`
  );
  return pattern.test(content);
}

describe('Component dark: variant coverage', () => {
  describe('HeroSection.astro', () => {
    const content = readFile('components/sections/HeroSection.astro');

    it('should have dark:bg-warm-900 on section with bg-cream', () => {
      expect(content).toMatch(/bg-cream\s+dark:bg-warm-900/);
    });

    it('should have dark variant on bg-teal-50 stat icon containers', () => {
      expect(content).toMatch(/bg-teal-50\s+dark:bg-teal-900/);
    });

    it('should have dark variant on border-teal-100', () => {
      expect(content).toMatch(/border-teal-100\s+dark:border-teal-800/);
    });

    it('should have dark variant on text-teal-700', () => {
      expect(content).toMatch(/text-teal-700\s+dark:text-teal-400/);
    });

    it('should have dark variant on bg-amber-50', () => {
      expect(content).toMatch(/bg-amber-50\s+dark:bg-amber-900/);
    });

    it('should have dark variant on border-amber-100', () => {
      expect(content).toMatch(/border-amber-100\s+dark:border-amber-800/);
    });

    it('should have dark variant on text-amber-500', () => {
      expect(content).toMatch(/text-amber-500\s+dark:text-amber-400/);
    });

    it('should have dark variant on text-amber-700', () => {
      expect(content).toMatch(/text-amber-700\s+dark:text-amber-400/);
    });

    it('should have dark variant on glow orbs', () => {
      expect(content).toMatch(/bg-teal-200\/30\s+dark:bg-teal-800/);
      expect(content).toMatch(/bg-amber-200\/20\s+dark:bg-amber-800/);
    });
  });

  describe('AboutSection.astro', () => {
    const content = readFile('components/sections/AboutSection.astro');

    it('should have dark variant on glow-orb bg-teal-100/30', () => {
      expect(content).toMatch(/bg-teal-100\/30\s+dark:bg-teal-800/);
    });

    it('should have dark:bg-warm-800 on section', () => {
      expect(content).toMatch(/bg-white\s+dark:bg-warm-800/);
    });
  });

  describe('Section backgrounds with bg-cream', () => {
    const sections = [
      'components/sections/ReviewsSection.astro',
      'components/sections/BlogSection.astro',
      'components/sections/TestimonialsSection.astro',
      'components/sections/FAQSection.astro',
      'components/sections/ServicesSection.astro',
    ];

    sections.forEach((section) => {
      it(`${section} should have dark:bg-warm-900 on bg-cream`, () => {
        const content = readFile(section);
        expect(content).toMatch(/bg-cream\s+dark:bg-warm-900/);
      });
    });
  });

  describe('Footer.astro', () => {
    const content = readFile('components/Footer.astro');

    it('should have dark variant on text-slate-500 elements', () => {
      expect(content).toMatch(/text-slate-500\s+dark:text-slate-400/);
    });

    it('should have dark variant on text-slate-600 copyright', () => {
      expect(content).toMatch(/text-slate-600\s+dark:text-slate-500/);
    });
  });

  describe('ThemeToggle.astro', () => {
    const content = readFile('components/ThemeToggle.astro');

    it('should have aria-pressed attribute in script', () => {
      expect(content).toContain('aria-pressed');
    });

    it('should have title attribute on button', () => {
      expect(content).toMatch(/title="Switch theme"/);
    });

    it('should have focus-visible ring classes', () => {
      expect(content).toMatch(/focus-visible:ring/);
    });

    it('should have aria-hidden on SVGs', () => {
      expect(content).toMatch(/aria-hidden="true"/);
    });

    it('should update theme-color meta in updateToggleIcon', () => {
      expect(content).toMatch(/meta-theme-color/);
      expect(content).toMatch(/meta\.setAttribute\('content'/);
    });

    it('should sync dark class in storage event handler', () => {
      expect(content).toMatch(/addEventListener\('storage'/);
      expect(content).toMatch(/e\.newValue === 'dark'/);
      expect(content).toMatch(/classList\.add\('dark'\)/);
      expect(content).toMatch(/classList\.remove\('dark'\)/);
    });
  });

  describe('Header.astro', () => {
    const content = readFile('components/Header.astro');

    it('should have dark variant on mobile menu backdrop', () => {
      expect(content).toMatch(/bg-black\/10\s+dark:bg-black\/50/);
    });

    it('should have dark:bg-warm-800/80 in scroll-aware header', () => {
      expect(content).toMatch(/dark:bg-warm-800\/80/);
    });
  });

  describe('404.astro', () => {
    const content = readFile('pages/404.astro');

    it('should have dark:bg-warm-900 on bg-cream', () => {
      expect(content).toMatch(/bg-cream\s+dark:bg-warm-900/);
    });
  });

  describe('React components', () => {
    it('StickyMobileCTA should have dark:bg-warm-800', () => {
      const content = readFile('components/react/StickyMobileCTA.tsx');
      expect(content).toMatch(/dark:bg-warm-800/);
    });

    it('CookieConsent should have dark:bg-warm-800', () => {
      const content = readFile('components/react/CookieConsent.tsx');
      expect(content).toMatch(/dark:bg-warm-800/);
    });
  });

  describe('ScrollToTop.astro', () => {
    const content = readFile('components/ScrollToTop.astro');

    it('should have dark:bg-warm-800', () => {
      expect(content).toMatch(/dark:bg-warm-800/);
    });

    it('should have dark:text-warm-300 on icon', () => {
      expect(content).toMatch(/dark:text-warm-300/);
    });
  });
});
