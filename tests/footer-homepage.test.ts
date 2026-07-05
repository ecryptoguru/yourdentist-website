import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

describe('Footer component (Footer.astro)', () => {
  const content = readFile('components/Footer.astro');

  it('should use clinicInfo.mapUrl for Google Maps link (not hardcoded)', () => {
    expect(content).toMatch(/href=\{clinicInfo\.mapUrl\}/);
    expect(content).not.toMatch(/google\.com\/maps\/place\/YourDentist/);
  });

  it('should have Facebook link pointing to yourdentistpro', () => {
    expect(content).toMatch(/facebook\.com\/yourdentistpro/);
  });

  it('should have Instagram link pointing to yourdentistpro', () => {
    expect(content).toMatch(/instagram\.com\/yourdentistpro/);
  });

  it('should have YouTube link pointing to @yourdentistclinic', () => {
    expect(content).toMatch(/youtube\.com\/@yourdentistclinic/);
  });

  it('should have Twitter/X link pointing to yourdentistpro', () => {
    expect(content).toMatch(/twitter\.com\/yourdentistpro/);
  });

  it('should have aria-labels on all social links', () => {
    expect(content).toMatch(/aria-label="Follow us on Facebook"/);
    expect(content).toMatch(/aria-label="Follow us on Instagram"/);
    expect(content).toMatch(/aria-label="Subscribe to our YouTube channel"/);
    expect(content).toMatch(/aria-label="Follow us on Twitter"/);
  });

  it('should have rel="noopener noreferrer" on all external links', () => {
    const externalLinks = content.match(/target="_blank"/g) || [];
    const noopenerLinks = content.match(/rel="noopener noreferrer"/g) || [];
    expect(externalLinks.length).toBeGreaterThan(0);
    expect(noopenerLinks.length).toBe(externalLinks.length);
  });

  it('should have email link with mailto:', () => {
    expect(content).toMatch(/mailto:\$\{clinicInfo\.email\}/);
  });

  it('should have phone link with clinicInfo.phoneLink', () => {
    expect(content).toMatch(/clinicInfo\.phoneLink/);
  });

  it('should have 5 social icons (Maps, Facebook, Instagram, YouTube, Twitter)', () => {
    const socialIconCount = (content.match(/aria-label="(Find us on Google Maps|Follow us on Facebook|Follow us on Instagram|Subscribe to our YouTube channel|Follow us on Twitter)"/g) || []).length;
    expect(socialIconCount).toBe(5);
  });
});

describe('Homepage (index.astro)', () => {
  const content = readFile('pages/index.astro');

  it('should import aboutUsContent from data', () => {
    expect(content).toMatch(/aboutUsContent/);
  });

  it('should have clinic-about section id', () => {
    expect(content).toMatch(/id="clinic-about"/);
  });

  it('should render aboutUsContent paragraphs', () => {
    expect(content).toMatch(/aboutUsContent\.paragraphs\.map/);
  });

  it('should have 3 highlight cards (Painless Treatments, Advanced Technology, Sterilisation Standards)', () => {
    expect(content).toMatch(/Painless Treatments/);
    expect(content).toMatch(/Advanced Technology/);
    expect(content).toMatch(/Sterilisation Standards/);
  });

  it('should have dark mode variants on About Us section', () => {
    expect(content).toMatch(/dark:bg-warm-900/);
    expect(content).toMatch(/dark:text-warm-100/);
    expect(content).toMatch(/dark:bg-warm-800/);
  });
});

describe('BeforeAfterSection.astro', () => {
  const content = readFile('components/sections/BeforeAfterSection.astro');

  it('should display photo.category instead of "View Result"', () => {
    expect(content).toMatch(/\{photo\.category\}/);
    expect(content).not.toMatch(/View Result/);
  });

  it('should have View All Achievements CTA button', () => {
    expect(content).toMatch(/View All Achievements/);
    expect(content).toMatch(/href="\/achievements\/"/);
  });
});

describe('TalksSection.astro', () => {
  const content = readFile('components/sections/TalksSection.astro');

  it('should have Watch All Videos CTA button', () => {
    expect(content).toMatch(/Watch All Videos/);
    expect(content).toMatch(/href="\/videos\/"/);
  });
});
