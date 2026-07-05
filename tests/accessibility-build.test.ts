import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

describe('BaseLayout.astro schema', () => {
  const content = readFile('layouts/BaseLayout.astro');

  it('should use correct email yourdentist27@gmail.com in JSON-LD', () => {
    expect(content).toMatch(/yourdentist27@gmail\.com/);
    expect(content).not.toMatch(/yourdentist\.clinic@gmail\.com/);
  });

  it('should have correct phone in schema', () => {
    expect(content).toMatch(/\+91 7064719630/);
  });

  it('should have Dentist type in schema', () => {
    expect(content).toMatch(/'Dentist'/);
  });

  it('should have correct clinic name in schema', () => {
    expect(content).toMatch(/YourDentist Laser Dental Clinic/);
  });
});

describe('New pages dark mode coverage', () => {
  describe('videos.astro', () => {
    const content = readFile('pages/videos.astro');

    it('should have dark:bg-warm-800 on cards', () => {
      expect(content).toMatch(/dark:bg-warm-800/);
    });

    it('should have dark:text-warm-100 on headings', () => {
      expect(content).toMatch(/dark:text-warm-100/);
    });

    it('should have dark:border-warm-600 on card borders', () => {
      expect(content).toMatch(/dark:border-warm-600/);
    });

    it('should have dark:text-warm-400 on descriptions', () => {
      expect(content).toMatch(/dark:text-warm-400/);
    });

    it('should have dark:bg-warm-700 on video containers', () => {
      expect(content).toMatch(/dark:bg-warm-700/);
    });

    it('should have dark mode on subscribe CTA section', () => {
      expect(content).toMatch(/dark:bg-teal-900\/20/);
      expect(content).toMatch(/dark:border-teal-800/);
    });
  });

  describe('achievements.astro', () => {
    const content = readFile('pages/achievements.astro');

    it('should have dark:bg-warm-700 on image containers', () => {
      expect(content).toMatch(/dark:bg-warm-700/);
    });

    it('should have dark:text-warm-100 on heading', () => {
      expect(content).toMatch(/dark:text-warm-100/);
    });

    it('should have dark:text-warm-300 on narrative text', () => {
      expect(content).toMatch(/dark:text-warm-300/);
    });

    it('should have dark:prose-invert on narrative container', () => {
      expect(content).toMatch(/dark:prose-invert/);
    });
  });

  describe('certificates.astro', () => {
    const content = readFile('pages/certificates.astro');

    it('should have dark:bg-warm-700 on image containers', () => {
      expect(content).toMatch(/dark:bg-warm-700/);
    });

    it('should have dark:text-warm-100 on heading', () => {
      expect(content).toMatch(/dark:text-warm-100/);
    });

    it('should have dark:text-warm-300 on certificate titles', () => {
      expect(content).toMatch(/dark:text-warm-300/);
    });
  });
});

describe('Accessibility checks', () => {
  describe('Videos page', () => {
    const content = readFile('pages/videos.astro');

    it('should have aria-label on video play buttons', () => {
      expect(content).toMatch(/aria-label=\{`Play video: \$\{video\.title\}`\}/);
    });

    it('should have aria-label on close button', () => {
      expect(content).toMatch(/aria-label="Close video player"/);
    });

    it('should have alt text on thumbnail images', () => {
      expect(content).toMatch(/alt=\{video\.title\}/);
    });

    it('should have title attribute on iframe', () => {
      expect(content).toMatch(/iframe\.title\s*=/);
    });
  });

  describe('Achievements page', () => {
    const content = readFile('pages/achievements.astro');

    it('should have aria-label on lightbox buttons', () => {
      expect(content).toMatch(/aria-label=\{`View achievement: \$\{photo\.category\}`\}/);
    });

    it('should have aria-label on close button', () => {
      expect(content).toMatch(/aria-label="Close image viewer"/);
    });

    it('should have alt text on images', () => {
      expect(content).toMatch(/alt=\{photo\.alt\}/);
    });
  });

  describe('Certificates page', () => {
    const content = readFile('pages/certificates.astro');

    it('should have aria-label on lightbox buttons', () => {
      expect(content).toMatch(/aria-label=\{`View certificate: \$\{photo\.title\}`\}/);
    });

    it('should have aria-label on close button', () => {
      expect(content).toMatch(/aria-label="Close certificate viewer"/);
    });

    it('should have alt text on images', () => {
      expect(content).toMatch(/alt=\{photo\.alt\}/);
    });
  });
});

describe('Build output integrity', () => {
  const distDir = join(process.cwd(), 'dist');

  function readDistFile(relativePath: string): string {
    return readFileSync(join(distDir, relativePath), 'utf-8');
  }

  it('should have videos page in build output', () => {
    expect(() => readDistFile('videos/index.html')).not.toThrow();
  });

  it('should have achievements page in build output', () => {
    expect(() => readDistFile('achievements/index.html')).not.toThrow();
  });

  it('should have certificates page in build output', () => {
    expect(() => readDistFile('certificates/index.html')).not.toThrow();
  });

  it('videos page should contain YouTube thumbnail URLs in built HTML', () => {
    const html = readDistFile('videos/index.html');
    expect(html).toMatch(/img\.youtube\.com\/vi/);
  });

  it('videos page should not contain direct iframe embeds in built HTML', () => {
    const html = readDistFile('videos/index.html');
    expect(html).not.toMatch(/<iframe[^>]+src="https:\/\/www\.youtube\.com\/embed\//);
  });

  it('videos page should have VideoObject schema in built HTML', () => {
    const html = readDistFile('videos/index.html');
    expect(html).toMatch(/VideoObject/);
  });

  it('achievements page should have category labels in built HTML', () => {
    const html = readDistFile('achievements/index.html');
    expect(html).toMatch(/Crowns and Bridges/);
  });

  it('certificates page should have certificate titles in built HTML', () => {
    const html = readDistFile('certificates/index.html');
    expect(html).toMatch(/Indian Dental Conference/);
  });

  it('homepage should have aboutUsContent in built HTML', () => {
    const html = readDistFile('index.html');
    expect(html).toMatch(/Redefining Your/);
    expect(html).toMatch(/Painless Treatments/);
  });

  it('homepage should have correct email in built HTML', () => {
    const html = readDistFile('index.html');
    expect(html).toMatch(/yourdentist27@gmail\.com/);
    expect(html).not.toMatch(/yourdentist\.clinic@gmail\.com/);
  });

  it('all pages should have footer social links', () => {
    const html = readDistFile('index.html');
    expect(html).toMatch(/facebook\.com\/yourdentistpro/);
    expect(html).toMatch(/instagram\.com\/yourdentistpro/);
    expect(html).toMatch(/youtube\.com\/@yourdentistclinic/);
    expect(html).toMatch(/twitter\.com\/yourdentistpro/);
  });
});
