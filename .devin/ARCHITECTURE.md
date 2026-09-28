# LyraDevs Kit Architecture

> Devin-Desktop-native agent capability toolkit — 2026.9.14

---

## 📋 Overview

LyraDevs is a modular system consisting of:

- **25 Specialist Agents** - Role-based subagent profiles (`.devin/agents/`)
- **81 Skills** - Domain knowledge modules + slash-command routers (`.devin/skills/`)

Runtime model set: SWE-2 (floor) · GLM-5.3 · DeepSeek-V4-Flash — all 1M-context agentic models.

---

## 🏗️ Directory Structure

```plaintext
.devin/
├── ARCHITECTURE.md          # This file
├── agents/                  # 25 Specialist Agents (custom subagent profiles)
├── skills/                  # 83 Skills (domain knowledge + /command routers)
├── rules/                   # Global Rules (always_on + glob-triggered)
├── memory/                  # Persistent Memory (index + topic files)
├── hooks.v1.json            # PreToolUse destructive-command guard
└── scripts/                 # Master Validation Scripts + kit validator + exec guard
```

---

## 🤖 Agents (25)

Specialist AI personas for different domains.

| Agent                               | Focus                      | Skills Used                                                                                                                    |
| ----------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `orchestrator`                      | Multi-agent coordination   | coordinator-mode, memory-system, verify-changes                                                                                |
| `project-planner`                   | Discovery, task planning   | brainstorming, plan-writing, architecture                                                                                      |
| `frontend-specialist`               | Web UI/UX                  | frontend-design, nextjs-react-expert, tailwind-patterns, composition-patterns, web-design-guidelines                           |
| `backend-specialist`                | API, business logic        | api-patterns, nodejs-best-practices, database-design, postgres-best-practices                                                  |
| `database-architect`                | Schema, SQL                | database-design, postgres-best-practices, prisma-expert                                                                        |
| `mobile-developer`                  | iOS, Android, RN           | mobile-design, react-native-skills                                                                                             |
| `game-developer`                    | Game logic, mechanics      | game-development, 2d-games, 3d-games, pc-games, web-games, mobile-games, vr-ar, game-design, multiplayer, game-art, game-audio |
| `devops-engineer`                   | CI/CD, Docker              | deployment-procedures, docker-expert                                                                                           |
| `security-auditor`                  | Security compliance        | vulnerability-scanner, red-team-tactics                                                                                        |
| `penetration-tester`                | Offensive security         | red-team-tactics                                                                                                               |
| `test-engineer`                     | Testing strategies         | testing-patterns, tdd-workflow, webapp-testing                                                                                 |
| `debugger`                          | Root cause analysis        | systematic-debugging                                                                                                           |
| `performance-optimizer`             | Speed, Web Vitals          | performance-profiling                                                                                                          |
| `seo-specialist`                    | Ranking, visibility        | seo-fundamentals, geo-fundamentals                                                                                             |
| `documentation-writer`              | Manuals, docs              | documentation-templates                                                                                                        |
| `product-manager`                   | Requirements, user stories, backlog, MVP | plan-writing, brainstorming                                                                                                    |
| `qa-automation-engineer`            | E2E testing, CI pipelines  | webapp-testing, testing-patterns                                                                                               |
| `code-archaeologist`                | Legacy code, refactoring   | clean-code, refactoring-patterns, code-review-checklist                                                                        |
| `ai-engineer`                       | LLM systems, RAG, evals    | llm-patterns, testing-patterns, python-patterns                                                                                |
| `autonomous-optimization-architect` | LLM cost routing           | llm-patterns, typescript-expert, python-patterns                                                                               |
| `compliance-auditor`                | SOC 2, GDPR, ISO 27001     | vulnerability-scanner, documentation-templates                                                                                 |
| `data-engineer`                     | ETL/ELT, streaming         | data-pipeline-patterns, database-design                                                                                        |
| `database-optimizer`                | Query perf, N+1, indexing  | database-design, postgres-best-practices, data-pipeline-patterns                                                               |
| `marketing-strategist`              | Growth and social strategy | growth-marketing, social-media-patterns, seo-fundamentals                                                                      |
| `sre-engineer`                      | SLOs, observability, toil  | deployment-procedures, server-management, systematic-debugging                                                                 |

---

## 🧩 Skills (81)

Modular knowledge domains that load on-demand. Triggering is driven by `name` + `description` (trigger text lives in the description — Devin's documented behavior); bodies stay minimal. 15 slash-command routers (`plan`, `verify`, `test`, etc.) delegate to domain skills.

### Frontend & UI

| Skill                   | Description                                                            |
| ----------------------- | ---------------------------------------------------------------------- |
| `nextjs-react-expert` | React & Next.js performance optimization (Vercel - 98 rules) |
| `web-design-guidelines` | Web UI audit - 100+ rules for accessibility, UX, performance (Vercel) |
| `tailwind-patterns` | Tailwind CSS v4 utilities |
| `frontend-design` | UI/UX patterns, design systems |
| `frontend-architecture` | Frontend code organization — separation of concerns, state tiers, service files |
| `design-spec` | DESIGN.md format — machine-readable design tokens (hard gate before UI) |
| `ui-ux-pro-max` | 1 file — design system index (expandable) |
| `composition-patterns` | React component composition, compound components, React 19 ref changes |

### Backend & API

| Skill                   | Description                    |
| ----------------------- | ------------------------------ |
| `api-patterns` | REST, GraphQL, tRPC |
| `nodejs-best-practices` | Node.js async, modules |
| `python-patterns` | Python standards, FastAPI |

### Database

| Skill                     | Description                        |
| ------------------------- | ---------------------------------- |
| `database-design` | Schema design, general principles |
| `postgres-best-practices` | PostgreSQL query optimization, RLS |
| `prisma-expert` | Prisma ORM, migrations |
| `data-pipeline-patterns` | ETL/ELT, streaming, quality |

### TypeScript/JavaScript

| Skill               | Description                         |
| ------------------- | ----------------------------------- |
| `typescript-expert` | Type-level programming, performance |

### Cloud & Infrastructure

| Skill                   | Description               |
| ----------------------- | ------------------------- |
| `docker-expert` | Containerization, Compose |
| `deployment-procedures` | CI/CD, deploy workflows |
| `server-management` | Infrastructure management |

### Testing & Quality

| Skill                   | Description              |
| ----------------------- | ------------------------ |
| `testing-patterns` | Jest, Vitest, strategies |
| `webapp-testing` | E2E, Playwright |
| `tdd-workflow` | Test-driven development |
| `code-review-checklist` | Code review standards |
| `lint-and-validate` | Linting, validation |

### Security

| Skill                   | Description              |
| ----------------------- | ------------------------ |
| `vulnerability-scanner` | Security auditing, OWASP |
| `red-team-tactics` | Offensive security |

### Architecture & Planning

| Skill           | Description                |
| --------------- | -------------------------- |
| `app-builder` | Full-stack app scaffolding |
| `architecture` | System design patterns |
| `plan-writing` | Task planning, breakdown |
| `brainstorming` | Socratic questioning |

### Mobile

| Skill                 | Description                        |
| --------------------- | ---------------------------------- |
| `mobile-design` | Mobile UI/UX patterns |
| `react-native-skills` | React Native & Expo best practices |

### Framework Migrations

| Skill          | Description                                      |
| -------------- | ------------------------------------------------ |
| `next-upgrade` | Next.js major version migration guide & codemods |

### Game Development

| Skill              | Description                     |
| ------------------ | ------------------------------- |
| `game-development` | Game development orchestrator |
| `2d-games` | Sprites, tilemaps, physics |
| `3d-games` | Meshes, shaders, rendering |
| `pc-games` | Engine selection, optimization |
| `web-games` | Browser frameworks, WebGL |
| `mobile-games` | Touch input, app stores |
| `vr-ar` | Comfort, immersion, interaction |
| `game-design` | GDD, balancing, psychology |
| `multiplayer` | Networking, synchronization |
| `game-art` | Visual style, asset pipeline |
| `game-audio` | Sound design, adaptive audio |

### SEO & Growth

| Skill              | Description                   |
| ------------------ | ----------------------------- |
| `seo-fundamentals` | SEO, E-E-A-T, Core Web Vitals |
| `geo-fundamentals` | GenAI optimization |
| `growth-marketing` | Growth experiments, CAC/LTV |
| `social-media-patterns` | Cross-platform strategy |

### Shell/CLI

| Skill                | Description               |
| -------------------- | ------------------------- |
| `bash-linux` | Linux commands, scripting |

### Orchestration & Memory (2026.5.13)

| Skill                 | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `coordinator-mode` | Multi-agent orchestration with parallel workers & synthesis |
| `memory-system` | Persistent cross-session memory with MEMORY.md index |
| `verify-changes` | Prove code works by running it, not just inspecting |
| `batch-operations` | Multi-file pattern-based modifications |
| `simplify-code` | Reduce over-engineered complexity |
| `skillify` | Auto-create skills from repetitive workflows |
| `intelligent-routing` | Automatic agent selection and task routing |

### Other

| Skill                     | Description               |
| ------------------------- | ------------------------- |
| `clean-code` | Coding standards (Global) |
| `behavioral-modes` | Agent personas |
| `mcp-builder` | Model Context Protocol |
| `documentation-templates` | Doc formats |
| `i18n-localization` | Internationalization |
| `performance-profiling` | Web Vitals, optimization |
| `systematic-debugging` | Troubleshooting |
| `refactoring-patterns` | Legacy modernization |
| `llm-patterns` | LLM systems, RAG, evals |
| `rust-pro` | Rust systems programming |

---

## 🔄 Command Skills (15)

Slash commands are skills — invoke with `/name` or let the agent auto-trigger on matching intent.

| Command          | Description                               | Delegates to |
| ---------------- | ----------------------------------------- | ------------ |
| `/audit-ai`      | Audit AI and LLM systems                  | ai-engineer + llm-patterns |
| `/brainstorm`    | Socratic discovery                        | brainstorming |
| `/create`        | Create new application                    | app-builder + project-planner |
| `/debug`         | Systematic debugging                      | systematic-debugging |
| `/deploy`        | Deploy application                        | deployment-procedures |
| `/enhance`       | Improve existing code                     | domain agents |
| `/growth`        | Growth strategy and channel planning      | growth-marketing |
| `/orchestrate`   | Multi-agent coordination                  | coordinator-mode |
| `/plan`          | Task breakdown (plan file only)           | project-planner + plan-writing |
| `/preview`       | Preview server management                 | auto_preview.py |
| `/remember`      | Save to persistent memory                 | memory-system |
| `/review`        | Multi-domain code review                  | code-review-checklist |
| `/status`        | Check project status                      | session_manager.py |
| `/test`          | Run/generate tests                        | testing-patterns |
| `/verify`        | Prove code works by running it            | verify-changes |

---

## 🎯 Skill Loading

Devin lists every skill's `name` + `description` in context; the model invokes a skill when the description matches the request. Trigger text therefore lives in `description` — there is no separate `when_to_use` field.

### Skill Structure

```plaintext
skill-name/
├── SKILL.md           # (Required) frontmatter + instructions
├── scripts/           # (Optional) Python/Bash scripts
├── references/        # (Optional) Docs loaded on demand
└── assets/            # (Optional) Images, logos
```

### Frontmatter (Devin schema)

```yaml
---
name: skill-name
description: What it does AND when to use it (drives triggering)
argument-hint: "[optional arg hint]"
allowed-tools:        # optional; YAML list
  - read
  - grep
  - glob
permissions:          # optional skill-scoped permission overrides
  allow:
    - Exec(some command prefix)
---
```

Supported tool names: `read`, `edit`, `write`, `grep`, `glob`, `exec`, `mcp__*`

### Enhanced Skills (with scripts/references)

| Skill           | Files | Coverage                         |
| --------------- | ----- |
| `ui-ux-pro-max` | 3     | Design system index + data + scripts |
| `app-builder`   | 20    | Full-stack scaffolding           |

---

## 🛠️ Scripts (4)

Master validation scripts that orchestrate skill-level scripts.

### Master Scripts

| Script             | Purpose                                          | When to Use              |
| ------------------ | ------------------------------------------------ |
| `checklist.py`     | Priority-based validation (Core checks)          | Development, pre-commit  |
| `verify_all.py`    | Comprehensive verification (All checks)          | Pre-deployment, releases |
| `validate_kit.py`  | Kit self-validation (frontmatter, refs, memory)  | Kit changes, upgrades    |
| `guard_exec.py`    | Destructive-command blocker (PreToolUse hook)    | Invoked by hooks.v1.json |

### Safety Hook

`.devin/hooks.v1.json` registers a `PreToolUse` hook on `exec` that runs `guard_exec.py` — blocks `rm -rf /`, `mkfs`, `dd of=/dev/`, `format X:`, `Remove-Item -Recurse -Force` on drive roots. Fails open on malformed input.

### Usage

```bash
# Quick validation during development
python .devin/scripts/checklist.py .

# Full verification before deployment
python .devin/scripts/verify_all.py . --url http://localhost:3000
```

### What They Check

**checklist.py** (Core checks):

- Security (vulnerabilities, secrets)
- Code Quality (lint, types)
- Schema Validation
- Test Suite
- UX Audit
- SEO Check

**verify_all.py** (Full suite):

- Everything in checklist.py PLUS:
- Lighthouse (Core Web Vitals)
- Playwright E2E
- Bundle Analysis
- Mobile Audit
- i18n Check

For details, see [scripts/README.md](scripts/README.md)

---

## 📊 Statistics

| Metric               | Value                             |
| -------------------- | --------------------------------- |
| **Total Agents**     | 25                                |
| **Total Skills**     | 83                                |
| **Command skills**   | 15 (converted from workflows)     |
| **Total Scripts**    | 4 (master) + skill-level          |
| **Runtime models**   | SWE-2 · GLM-5.3 · DeepSeek-V4-Flash |

---

## 🔗 Quick Reference

| Need        | Agent                               | Skills                                          |
| ----------- | ----------------------------------- | ----------------------------------------------- |
| Web App     | `frontend-specialist`               | nextjs-react-expert, frontend-design            |
| API         | `backend-specialist`                | api-patterns, nodejs-best-practices             |
| Mobile      | `mobile-developer`                  | mobile-design                                   |
| Database    | `database-architect`                | database-design, prisma-expert                  |
| Security    | `security-auditor`                  | vulnerability-scanner                           |
| Testing     | `test-engineer`                     | testing-patterns, webapp-testing                |
| Debug       | `debugger`                          | systematic-debugging                            |
| Plan        | `project-planner`                   | brainstorming, plan-writing                     |
| AI/LLM      | `ai-engineer`                       | llm-patterns, testing-patterns, python-patterns |
| Data        | `data-engineer`                     | data-pipeline-patterns, database-design         |
| Growth      | `marketing-strategist`              | growth-marketing, social-media-patterns         |
| Reliability | `sre-engineer`                      | deployment-procedures, server-management        |
| DB Perf     | `database-optimizer`                | database-design, data-pipeline-patterns         |
| LLM Cost    | `autonomous-optimization-architect` | llm-patterns, typescript-expert                 |
| Compliance  | `compliance-auditor`                | vulnerability-scanner, documentation-templates  |
