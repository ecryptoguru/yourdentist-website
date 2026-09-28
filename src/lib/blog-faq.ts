import GithubSlugger from 'github-slugger';

export interface FaqPair {
  question: string;
  answer: string;
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\(([^)]*)\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanAnswerLine(line: string): string {
  return stripInlineMarkdown(line.replace(/^\s*(?:[-*+]\s+|\d+[.)]\s+)/, ''));
}

/**
 * Extract Q&A pairs from a markdown blog body.
 * A pair is an h3 heading ending with "?" followed by answer paragraph(s)
 * until the next heading. Used for FAQPage JSON-LD and content tests.
 */
export function parseFaq(body: string, max = 10): FaqPair[] {
  const lines = body.split('\n');
  const pairs: FaqPair[] = [];
  let current: { question: string; answerLines: string[] } | null = null;

  const flush = () => {
    if (current) {
      const answer = current.answerLines
        .map(cleanAnswerLine)
        .filter(Boolean)
        .join(' ');
      if (answer) pairs.push({ question: current.question, answer });
    }
    current = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flush();
      const q = stripInlineMarkdown(h3[1]);
      if (q.endsWith('?')) current = { question: q, answerLines: [] };
      continue;
    }
    if (/^#{1,6}\s/.test(line)) {
      flush();
      continue;
    }
    if (!line) continue;
    if (current) current.answerLines.push(line);
  }
  flush();

  return pairs.slice(0, max).map((p) => {
    let answer = p.answer;
    if (answer.length > 600) {
      answer = answer.slice(0, 597).replace(/\s+\S*$/, '') + '...';
    }
    return { question: p.question, answer };
  });
}

export function countWords(body: string): number {
  return body
    .replace(/^---\n[\s\S]*?\n---/, '')
    .replace(/[#*`>|\-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

export interface TocItem {
  text: string;
  id: string;
}

/**
 * Extract `##` section headings for an in-article table of contents.
 * IDs match rehype-slug / github-slugger output so anchors line up with the
 * rendered markdown headings (astro.config enables rehype-slug).
 */
export function extractToc(body: string, max = 12): TocItem[] {
  const slugger = new GithubSlugger();
  return body
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('## ') && !line.startsWith('###'))
    .map((line) => {
      const text = stripInlineMarkdown(line.replace(/^##\s+/, ''));
      return { text, id: slugger.slug(text) };
    })
    .filter((item) => item.text.length > 0)
    .slice(0, max);
}
