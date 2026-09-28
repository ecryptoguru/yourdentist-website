#!/usr/bin/env python3
"""
SEO Checker - Search Engine Optimization Audit
Checks HTML/JSX/TSX/Astro pages for SEO best practices.

PURPOSE:
    - Verify meta tags, titles, descriptions
    - Check Open Graph tags for social sharing
    - Validate heading hierarchy
    - Check image accessibility (alt attributes)

WHAT IT CHECKS:
    - HTML files (actual web pages)
    - JSX/TSX files (React page components, especially Next.js)
    - Astro files (Astro pages and layouts)
    - Only files that are likely PUBLIC pages

Usage:
    python seo_checker.py <project_path>
"""
import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


# Directories to skip
SKIP_DIRS = {
    'node_modules', '.next', 'dist', 'build', '.git', '.github',
    '__pycache__', '.vscode', '.idea', 'coverage', 'test', 'tests',
    '__tests__', 'spec', 'docs', 'documentation', 'examples',
    'artifacts', 'renders', 'compiled', 'posters', 'clips',
    '.worktrees'
}

# Files to skip (not pages)
SKIP_PATTERNS = [
    'config', 'setup', 'util', 'helper', 'hook', 'context', 'store',
    'service', 'api', 'lib', 'constant', 'type', 'interface', 'mock',
    '.test.', '.spec.', '_test.', '_spec.'
]


def is_public_page(file_path: Path) -> bool:
    """Check if this file is likely a public-facing page."""
    name = file_path.name.lower()
    stem = file_path.stem.lower()

    if any(skip in name for skip in SKIP_PATTERNS):
        return False

    parts = [p.lower() for p in file_path.parts]

    # Marketing motion is a video composition workspace, not public HTML.
    if 'marketing-motion' in parts and file_path.suffix.lower() in ['.html']:
        return False

    page_dirs = ['pages', 'app', 'routes', 'views', 'screens']
    if any(d in parts for d in page_dirs):
        return True

    page_names = ['page', 'index', 'home', 'about', 'contact', 'blog',
                  'post', 'article', 'product', 'landing', 'layout']

    if any(p in stem for p in page_names):
        return True

    if file_path.suffix.lower() in ['.html', '.htm']:
        return True

    return False


def is_in_skip_dir(file_path: Path) -> bool:
    return any(part in SKIP_DIRS for part in file_path.parts)


def find_pages(project_path: Path) -> list:
    """Find page files to check."""
    patterns = ['**/*.html', '**/*.htm', '**/*.jsx', '**/*.tsx', '**/*.astro']

    files = []
    for pattern in patterns:
        for f in project_path.glob(pattern):
            if is_in_skip_dir(f):
                continue

            if is_public_page(f):
                files.append(f)

    return files[:50]


def _has_nextjs_metadata(content: str) -> dict:
    """Detect Next.js metadata or generateMetadata export."""
    result = {"title": False, "description": False, "og": False, "images": False}

    has_metadata = bool(
        re.search(r"\bexport\s+(?:const\s+metadata|async\s+function\s+generateMetadata)\b", content)
    )
    if not has_metadata:
        return result

    # Heuristic: look for the relevant object keys anywhere in the file.
    # This intentionally catches title/description/openGraph in both
    # `export const metadata` and the `return { ... }` of `generateMetadata`.
    # It also tolerates shorthand object properties such as `description,`.
    if re.search(r"\btitle\s*[:,]", content):
        result["title"] = True
    if re.search(r"\bdescription\s*[:,]", content):
        result["description"] = True
    if re.search(r"\bopenGraph\s*[:,]", content) or re.search(r"\bogImage\b", content):
        result["og"] = True
        result["images"] = True
    if re.search(r"\btwitter\s*[:,]", content):
        result["og"] = True  # Twitter cards are also social graph metadata
    return result


def _find_nextjs_layout_metadata(file_path: Path, project_path: Path) -> dict:
    """
    Walk up the Next.js app directory looking for a layout.tsx with metadata.
    This reflects Next.js metadata inheritance.
    """
    if file_path.suffix not in (".tsx", ".jsx"):
        return {"title": False, "description": False, "og": False, "images": False}

    # Only walk within app/ directories.
    parts = list(file_path.parent.parts)
    if "app" not in [p.lower() for p in parts]:
        return {"title": False, "description": False, "og": False, "images": False}

    while parts:
        layout = Path(*parts) / "layout.tsx"
        if layout.exists() and layout != file_path:
            try:
                content = layout.read_text(encoding="utf-8", errors="ignore")
                meta = _has_nextjs_metadata(content)
                if meta["title"] or meta["description"] or meta["og"]:
                    return meta
            except Exception:
                pass
        if parts[-1].lower() == "app":
            break
        parts.pop()

    return {"title": False, "description": False, "og": False, "images": False}


def _has_html_title(content: str) -> bool:
    return bool(re.search(r"<title[\s>]", content, re.IGNORECASE))


def _has_html_meta_description(content: str) -> bool:
    return bool(re.search(r'<meta\s+[^>]*name=["\']description["\']', content, re.IGNORECASE))


def _has_html_og(content: str) -> bool:
    return bool(re.search(r'<meta\s+[^>]*property=["\']og:', content, re.IGNORECASE))


def _has_astro_seo(content: str) -> dict:
    """Heuristic for Astro SeoHead component or head/frontmatter SEO."""
    result = {"title": False, "description": False, "og": False, "images": False}

    if re.search(r"<SeoHead[^>]*title=", content, re.S | re.I):
        result["title"] = True
    if re.search(r"<SeoHead[^>]*description=", content, re.S | re.I):
        result["description"] = True
    if re.search(r"<SeoHead[^>]*ogImage=", content, re.S | re.I):
        result["og"] = True
        result["images"] = True

    if _has_html_title(content):
        result["title"] = True
    if _has_html_meta_description(content):
        result["description"] = True
    if _has_html_og(content):
        result["og"] = True
        result["images"] = True
    return result


def check_page(file_path: Path, project_path: Path) -> dict:
    """Check a single page for SEO issues."""
    issues = []

    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        return {"file": str(file_path.name), "issues": [f"Error: {e}"]}

    suffix = file_path.suffix.lower()
    is_html = suffix in ['.html', '.htm']
    is_astro = suffix == '.astro'
    is_next = suffix in ['.jsx', '.tsx']

    has_title = False
    has_description = False
    has_og = False

    if is_html:
        has_title = _has_html_title(content)
        has_description = _has_html_meta_description(content)
        has_og = _has_html_og(content)
    elif is_astro:
        astro = _has_astro_seo(content)
        has_title = astro["title"]
        has_description = astro["description"]
        has_og = astro["og"]
    elif is_next:
        next_meta = _has_nextjs_metadata(content)
        # If the page itself lacks metadata, inherit from a parent layout.
        if not next_meta["title"]:
            layout_meta = _find_nextjs_layout_metadata(file_path, project_path)
            next_meta = {**next_meta, **{k: next_meta[k] or layout_meta[k] for k in next_meta}}
        has_title = next_meta["title"]
        has_description = next_meta["description"]
        has_og = next_meta["og"]

    if not has_title:
        issues.append("Missing <title> tag")
    if not has_description:
        issues.append("Missing meta description")
    if not has_og:
        issues.append("Missing Open Graph tags")

    # Heading hierarchy - multiple H1s
    h1_matches = re.findall(r'<h1[^>]*>', content, re.I)
    if len(h1_matches) > 1:
        issues.append(f"Multiple H1 tags ({len(h1_matches)})")

    # Images without alt
    img_pattern = r'<img[^>]+>'
    imgs = re.findall(img_pattern, content, re.I)
    for img in imgs:
        lower = img.lower()
        if 'alt=' not in lower:
            issues.append("Image missing alt attribute")
            break
        # Allow intentionally decorative images (empty alt with aria-hidden/presentation).
        if ('alt=""' in img or "alt=''" in img) and not (
            'aria-hidden' in lower or 'role="presentation"' in lower
        ):
            issues.append("Image has empty alt attribute")
            break

    return {
        "file": str(file_path.name),
        "issues": issues
    }


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()

    print(f"\n{'='*60}")
    print(f"  SEO CHECKER - Search Engine Optimization Audit")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-"*60)

    pages = find_pages(project_path)

    if not pages:
        print("\n[!] No page files found.")
        print("    Looking for: HTML, JSX, TSX, Astro in pages/app/routes directories")
        output = {"script": "seo_checker", "files_checked": 0, "passed": True}
        print("\n" + json.dumps(output, indent=2))
        sys.exit(0)

    print(f"Found {len(pages)} page files to analyze\n")

    all_issues = []
    for f in pages:
        result = check_page(f, project_path)
        if result["issues"]:
            all_issues.append(result)

    print("=" * 60)
    print("SEO ANALYSIS RESULTS")
    print("=" * 60)

    if all_issues:
        issue_counts = {}
        for item in all_issues:
            for issue in item["issues"]:
                issue_counts[issue] = issue_counts.get(issue, 0) + 1

        print("\nIssue Summary:")
        for issue, count in sorted(issue_counts.items(), key=lambda x: -x[1]):
            print(f"  [{count}] {issue}")

        print(f"\nAffected files ({len(all_issues)}):")
        for item in all_issues[:5]:
            print(f"  - {item['file']}")
        if len(all_issues) > 5:
            print(f"  ... and {len(all_issues) - 5} more")
    else:
        print("\n[OK] No SEO issues found!")

    total_issues = sum(len(item["issues"]) for item in all_issues)
    passed = total_issues == 0

    output = {
        "script": "seo_checker",
        "project": str(project_path),
        "files_checked": len(pages),
        "files_with_issues": len(all_issues),
        "issues_found": total_issues,
        "passed": passed
    }

    print("\n" + json.dumps(output, indent=2))

    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
