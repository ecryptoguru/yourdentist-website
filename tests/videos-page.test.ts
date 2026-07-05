import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

describe('Videos page (videos.astro)', () => {
  const content = readFile('pages/videos.astro');

  it('should import youtubeVideos from data', () => {
    expect(content).toMatch(/import\s+\{[^}]*youtubeVideos[^}]*\}\s+from\s+['"]@\/lib\/data['"]/);
  });

  it('should not import clinicInfo (unused import removed)', () => {
    expect(content).not.toMatch(/clinicInfo/);
  });

  it('should use YouTube thumbnail facade pattern (img tags, not iframes)', () => {
    expect(content).toMatch(/img\.youtube\.com\/vi/);
    expect(content).not.toMatch(/<iframe\s+src=.*youtube\.com\/embed/);
  });

  it('should have data-youtube-id attributes for click-to-play', () => {
    expect(content).toMatch(/data-youtube-id/);
  });

  it('should have a YouTube modal with id yt-modal', () => {
    expect(content).toMatch(/id="yt-modal"/);
  });

  it('should have close button with id yt-close', () => {
    expect(content).toMatch(/id="yt-close"/);
  });

  it('should have openYouTube function in script', () => {
    expect(content).toMatch(/function\s+openYouTube/);
  });

  it('should have closeYouTube function in script', () => {
    expect(content).toMatch(/function\s+closeYouTube/);
  });

  it('should have Escape key handler for modal', () => {
    expect(content).toMatch(/Escape/);
  });

  it('should autoplay video on click', () => {
    expect(content).toMatch(/autoplay=1/);
  });

  it('should use rel=0 to limit related videos', () => {
    expect(content).toMatch(/rel=0/);
  });

  it('should have VideoObject schema for SEO', () => {
    expect(content).toMatch(/VideoObject/);
    expect(content).toMatch(/thumbnailUrl/);
    expect(content).toMatch(/embedUrl/);
  });

  it('should have CollectionPage schema', () => {
    expect(content).toMatch(/CollectionPage/);
  });

  it('should have Subscribe on YouTube CTA', () => {
    expect(content).toMatch(/Subscribe on YouTube/);
    expect(content).toMatch(/youtube\.com\/@yourdentistclinic/);
  });

  it('should have lazy loading on thumbnail images', () => {
    expect(content).toMatch(/loading="lazy"/);
  });

  it('should have aria-label on video buttons', () => {
    expect(content).toMatch(/aria-label/);
  });

  it('should have focus-visible styles for accessibility', () => {
    expect(content).toMatch(/focus-visible:ring/);
  });

  it('should have dark mode variants', () => {
    expect(content).toMatch(/dark:bg-warm-800/);
    expect(content).toMatch(/dark:text-warm-100/);
    expect(content).toMatch(/dark:border-warm-600/);
  });

  it('should have line-clamp for title and description', () => {
    expect(content).toMatch(/line-clamp-2/);
    expect(content).toMatch(/line-clamp-3/);
  });

  it('should have stagger animation with transition-delay', () => {
    expect(content).toMatch(/stagger-item/);
    expect(content).toMatch(/transition-delay/);
  });
});
