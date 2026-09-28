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
