import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseFaq } from '../src/lib/blog-faq';

const blogDir = join(process.cwd(), 'src', 'content', 'blog');
const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));

const KNOWN_CATEGORIES = [
  'Local Guide',
  'Dental Implants',
  'Root Canal',
  'Orthodontics',
  'Oral Hygiene',
  'General Dental Health',
  'Cosmetic Dentistry',
  'Paediatric Dentistry',
  'Laser Dentistry',
];

function parseFrontmatter(text: string): { fm: Record<string, string>; body: string } | null {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const fm: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^"|"$/g, '');
  }
  return { fm, body: text.slice(m[0].length) };
}

describe('blog content integrity', () => {
  it('should have 106 blog posts', () => {
    expect(files.length).toBe(106);
  });

  it('should have valid frontmatter with required fields in every post', () => {
    for (const file of files) {
      const parsed = parseFrontmatter(readFileSync(join(blogDir, file), 'utf8'));
      expect(parsed, `${file}: frontmatter missing or malformed`).not.toBeNull();
      for (const field of ['title', 'excerpt', 'category', 'date', 'readTime']) {
        expect(parsed!.fm[field], `${file}: missing ${field}`).toBeTruthy();
      }
    }
  });

  it('should have lastUpdated >= date in every post', () => {
    for (const file of files) {
      const parsed = parseFrontmatter(readFileSync(join(blogDir, file), 'utf8'))!;
      if (!parsed.fm.lastUpdated) continue;
      expect(
        new Date(parsed.fm.lastUpdated).getTime(),
        `${file}: lastUpdated is before date`
      ).toBeGreaterThanOrEqual(new Date(parsed.fm.date).getTime());
    }
  });

  it('should have no escaped frontmatter openers', () => {
    for (const file of files) {
      const content = readFileSync(join(blogDir, file), 'utf8');
      expect(content.startsWith('\\---'), `${file}: escaped \\--- opener`).toBe(false);
    }
  });

  it('should have no escaped characters in headings', () => {
    for (const file of files) {
      const content = readFileSync(join(blogDir, file), 'utf8');
      const bad = content.split('\n').filter((l) => /^#{1,6} /.test(l) && /\\[.)]/.test(l));
      expect(bad, `${file}: escaped chars in headings: ${bad.join(' | ')}`).toEqual([]);
    }
  });

  it('should have no 3+ consecutive blank lines', () => {
    for (const file of files) {
      const content = readFileSync(join(blogDir, file), 'utf8');
      expect(content, `${file}: 3+ consecutive blank lines`).not.toMatch(/\n{4,}/);
    }
  });

  it('should have an FAQ section with at least 3 h3 questions in every post', () => {
    for (const file of files) {
      const content = readFileSync(join(blogDir, file), 'utf8');
      expect(content, `${file}: missing FAQ section`).toMatch(/^## Frequently asked questions$/m);
      const faqSection = content.split(/^## Frequently asked questions$/m)[1] ?? '';
      const questions = faqSection.match(/^### .+\?$/gm) || [];
      expect(questions.length, `${file}: fewer than 3 FAQ questions`).toBeGreaterThanOrEqual(3);
    }
  });

  it('should have no exact-duplicate substantial paragraphs', () => {
    for (const file of files) {
      const content = readFileSync(join(blogDir, file), 'utf8');
      const body = content.split(/^---\n[\s\S]*?\n---\n/)[1] ?? content;
      const blocks = body.split('\n\n').map((b) => b.replace(/\s+/g, ' ').trim());
      const seen = new Set<string>();
      const dupes = blocks.filter(
        (b) => b && !/^#{1,6} /.test(b) && b.split(/\s+/).length >= 20 && (seen.has(b) || !seen.add(b))
      );
      expect(dupes, `${file}: duplicate paragraphs: ${dupes.join(' | ')}`).toEqual([]);
    }
  });

  it('should only use known categories', () => {
    for (const file of files) {
      const parsed = parseFrontmatter(readFileSync(join(blogDir, file), 'utf8'))!;
      expect(KNOWN_CATEGORIES, `${file}: unknown category "${parsed.fm.category}"`).toContain(parsed.fm.category);
    }
  });

  it('should link to at least one service page in every post', () => {
    for (const file of files) {
      const content = readFileSync(join(blogDir, file), 'utf8');
      expect(content, `${file}: no /services/ internal links`).toMatch(/\]\(\/services\//);
    }
  });

  describe('parseFaq extraction', () => {
    it('should extract at least 3 Q&A pairs with non-empty answers from every post', () => {
      for (const file of files) {
        const content = readFileSync(join(blogDir, file), 'utf8');
        const body = content.split(/^---\n[\s\S]*?\n---\n/)[1] ?? content;
        const faqs = parseFaq(body);
        expect(faqs.length, `${file}: parseFaq found ${faqs.length} pairs`).toBeGreaterThanOrEqual(3);
        for (const faq of faqs) {
          expect(faq.question.endsWith('?'), `${file}: question lacks "?": ${faq.question}`).toBe(true);
          expect(faq.answer.length, `${file}: empty answer for "${faq.question}"`).toBeGreaterThan(0);
        }
      }
    });
  });
});
