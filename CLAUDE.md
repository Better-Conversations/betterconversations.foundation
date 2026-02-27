# Claude Code — BCF Website

## Identity

Astro 5 static site for Better Conversations Foundation. Tailwind CSS, TypeScript (strict), Alpine.js.
Linear project: **BCTT** (BCF Tech Team). Branch convention: `username/BCTT-nnn-short-desc`.

## Core rules

- **UK English in content only** — organisation, colour, centre. NEVER change CSS/Tailwind/SVG syntax.
- **`define:vars` scripts** → MUST use `is:inline` + plain JavaScript. No TypeScript in inline scripts.
- **Check before committing**: `npx astro check` must pass.
- **Global classes first** — check `src/styles/global.css` for `.bcf-*` before creating custom styles.
- **External URLs** — always use `src/data/siteConfig.ts`, never hardcode.
- **Accessibility** — skip link first, `aria-label` on icon buttons, `aria-hidden="true"` on decorative SVGs, visible focus indicators (`#54C4B6`).

## Project conventions

- Brand colours: teal `#54C4B6`, green `#A8D381`, gradient `from-[#54C4B6] to-[#A8D381]`.
- Headings: sentence case. Buttons/CTAs: Title Case.
- Tone: warm, collaborative, partnership-focused. Not a sales site.
- Page metadata: every page needs an entry in `src/data/pageMetadata.ts`.

## Key paths

| Path | Purpose |
|------|---------|
| `src/pages/` | File-based routing |
| `src/components/` | Reusable Astro components |
| `src/styles/global.css` | `.bcf-*` component classes |
| `src/data/siteConfig.ts` | Centralised external URLs |
| `src/data/pageMetadata.ts` | SEO metadata for all pages |
| `docs/` | Comprehensive dev documentation |
| `AGENTS.md` | Full AI assistant guide (shared with other AI tools) |

## References (load on demand, not all at once)

- `docs/` — design, accessibility, TypeScript, content guides. See `docs/CLAUDE.md` for index.
- @AGENTS.md — full project rules and common tasks (shared with other AI tools).
- @PLAN.md — project roadmap and current status.

## Definition of done

Every change must meet these before it can be considered complete:
- `npx astro check` passes with no new errors
- UK English verified in any user-facing content
- Accessibility: aria-labels, heading hierarchy, keyboard nav
- Visual changes tested at mobile (375px) and desktop (1280px)
- If linked to a Linear issue, update it with a comment describing what changed and why

## Linear workflow

Use `/linear-issue BCTT-nnn` for the full automated workflow. It will:
1. Look up the issue, sync the repo, explore the codebase.
2. Present a plan and wait for your approval before writing any code.
3. Create a branch, implement, validate, commit, and update Linear.

**Important**: Always follow the command phases in order. Never skip asking the user before creating a branch or starting implementation.

Use `/linear-review BCTT-nnn` to create a PR when work is done.

## Dev commands

```bash
npm run dev          # localhost:4321
npm run build        # production build → ./dist/
npx astro check      # TypeScript check (must pass)
```
