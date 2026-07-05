import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

describe('Achievements page (achievements.astro)', () => {
  const content = readFile('pages/achievements.astro');

  it('should import achievementPhotos and achievementNarrative from data', () => {
    expect(content).toMatch(/import\s+\{[^}]*achievementPhotos[^}]*achievementNarrative[^}]*\}\s+from\s+['"]@\/lib\/data['"]/);
  });

  it('should display achievement narrative paragraph', () => {
    expect(content).toMatch(/achievementNarrative/);
  });

  it('should render category labels below each photo', () => {
    expect(content).toMatch(/photo\.category/);
  });

  it('should have lightbox data attributes on buttons', () => {
    expect(content).toMatch(/data-lightbox-src/);
    expect(content).toMatch(/data-lightbox-alt/);
    expect(content).toMatch(/data-lightbox-title/);
  });

  it('should have lightbox modal with id ach-lightbox', () => {
    expect(content).toMatch(/id="ach-lightbox"/);
  });

  it('should have close button with id ach-close', () => {
    expect(content).toMatch(/id="ach-close"/);
  });

  it('should have openAchievement function', () => {
    expect(content).toMatch(/function\s+openAchievement/);
  });

  it('should have closeAchievement function', () => {
    expect(content).toMatch(/function\s+closeAchievement/);
  });

  it('should have Escape key handler', () => {
    expect(content).toMatch(/Escape/);
  });

  it('should have lazy loading on images', () => {
    expect(content).toMatch(/loading="lazy"/);
  });

  it('should have hover zoom effect on images', () => {
    expect(content).toMatch(/group-hover:scale-105/);
  });

  it('should have aria-label on lightbox buttons', () => {
    expect(content).toMatch(/aria-label/);
  });

  it('should have focus-visible styles', () => {
    expect(content).toMatch(/focus-visible:ring/);
  });

  it('should have dark mode variants', () => {
    expect(content).toMatch(/dark:bg-warm-700/);
    expect(content).toMatch(/dark:text-warm-100/);
    expect(content).toMatch(/dark:border-warm-600/);
  });

  it('should have stagger animation', () => {
    expect(content).toMatch(/stagger-item/);
  });
});

describe('Certificates page (certificates.astro)', () => {
  const content = readFile('pages/certificates.astro');

  it('should import certificatePhotos from data', () => {
    expect(content).toMatch(/import\s+\{[^}]*certificatePhotos[^}]*\}\s+from\s+['"]@\/lib\/data['"]/);
  });

  it('should render certificate titles below each photo', () => {
    expect(content).toMatch(/photo\.title/);
  });

  it('should have lightbox data attributes on buttons', () => {
    expect(content).toMatch(/data-lightbox-src/);
    expect(content).toMatch(/data-lightbox-alt/);
    expect(content).toMatch(/data-lightbox-title/);
  });

  it('should have lightbox modal with id cert-lightbox', () => {
    expect(content).toMatch(/id="cert-lightbox"/);
  });

  it('should have close button with id cert-close', () => {
    expect(content).toMatch(/id="cert-close"/);
  });

  it('should have openCertificate function', () => {
    expect(content).toMatch(/function\s+openCertificate/);
  });

  it('should have closeCertificate function', () => {
    expect(content).toMatch(/function\s+closeCertificate/);
  });

  it('should have Escape key handler', () => {
    expect(content).toMatch(/Escape/);
  });

  it('should have lazy loading on images', () => {
    expect(content).toMatch(/loading="lazy"/);
  });

  it('should have hover zoom effect on images', () => {
    expect(content).toMatch(/group-hover:scale-105/);
  });

  it('should have aria-label on lightbox buttons', () => {
    expect(content).toMatch(/aria-label/);
  });

  it('should have focus-visible styles', () => {
    expect(content).toMatch(/focus-visible:ring/);
  });

  it('should have dark mode variants', () => {
    expect(content).toMatch(/dark:bg-warm-700/);
    expect(content).toMatch(/dark:text-warm-100/);
    expect(content).toMatch(/dark:border-warm-600/);
  });

  it('should have stagger animation', () => {
    expect(content).toMatch(/stagger-item/);
  });
});
