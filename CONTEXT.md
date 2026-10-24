# Project context

This file is the durable handoff for future work on this repository. Read it before making changes when the conversation history is unavailable. Update it when durable decisions, deployment behavior, or project curation changes.

## Purpose and ownership

- Repository: [`yorch/yorch.github.io`](https://github.com/yorch/yorch.github.io)
- Local checkout: clone this repository; the workspace path varies by machine.
- Production site: <https://yorch.github.io/>
- Owner: Jorge Barnaby (`yorch`), Principal Software Engineer at SentinelOne, Miami, FL.
- This is a portfolio and curated open-source showcase. The visual language is a terminal-inspired hybrid: static, crawlable project content with terminal styling and client-side command-palette interactions. It is not intended to be a shell-only application.
- The original Jekyll website/repository was kept separately at [`yorch/yorch.github.io-legacy`](https://github.com/yorch/yorch.github.io-legacy); do not confuse it with this Astro repository.

## Working agreements

- **Do not push changes directly to `master`.** Create a branch, implement and verify, push the branch, and open a PR for Jorge to review and approve. Do not merge without approval.
- Prefer focused commits and keep the branch/PR scoped to the requested work.
- Use Bun, Biome, and Node 26. Dependencies are pinned in `package.json`/`bun.lock`; GitHub Actions are pinned to full commit SHAs. Preserve those conventions.
- Do not hand-edit generated project metadata in `src/data/projects.json` unless fixing the generator output; normal updates come from the GitHub API generator.
- `src/data/curation.json` is the human-edited source of truth for what appears and what is highlighted.

## Current implementation

### Stack and important paths

- Astro + Tailwind CSS through Vite; current exact versions are recorded in `package.json`.
- `src/pages/index.astro` — landing page, terminal hero, highlighted section, filter/sort grid, and command palette.
- `src/layouts/Base.astro` — shared document shell and metadata.
- `src/components/HighlightedCard.astro` — elevated cards used for the three highlighted projects.
- `src/components/ProjectCard.astro` — regular project cards.
- `src/styles/global.css` — global styles.
- `src/data/curation.json` — featured order, highlighted picks, hidden/visible controls, and description/homepage overrides.
- `src/data/projects.json` — generated public, non-fork repository snapshot with descriptions, stars, forks, language, topics, homepage, push/update timestamp, and URL.
- `scripts/generate-projects.ts` — paginated GitHub API fetch; writes `projects.json`.
- `scripts/list-curation.ts` — inspect curation decisions from the command line.
- `.github/workflows/deploy.yml` — daily metadata refresh and GitHub Pages deployment.
- `public/` — favicon, Open Graph image, and robots directives.

### User-visible behavior and design decisions

- The terminal aesthetic is applied consistently across hero, highlighted cards, project grid, controls, and command palette.
- The landing page statically renders project content so it remains discoverable without JavaScript. Client-side controls add text filtering, language filtering, sorting, and a `⌘K` / `Ctrl+K` command palette (`filter`, `goto`, `clear`). `/` focuses the filter and `Esc` closes the palette.
- Three highlighted cards are visually elevated above the regular grid. Highlighted projects are excluded from the regular grid to prevent duplication.
- The highlights are separate from `featured`: `featured` controls pinned order in the normal project collection; `highlighted` controls the elevated showcase section.
- Homepage links in cards are only rendered for valid HTTP or HTTPS URLs. External links use safe target/rel attributes.
- Accessibility improvements include labeled filters and sort controls, dialog semantics, focus handling, pressed state for sorting, and a live empty-results status. Preserve these when adjusting UI behavior.
- SEO/discovery work includes sitemap generation, `robots.txt`, Open Graph image metadata, and pagination when retrieving GitHub repositories.

## Current curation

At the last project review, `src/data/curation.json` contains:

- **Highlighted:** `bilinear`, `ai-agents-observability`, `pi-harness-delegate`.
- **Featured order:** `ovh-availability-checker`, `operator-mono-otf`, `pi-statusbar`, `pi-claude-delegate`, `cc-analyzer`, `ccpod`, `colophon`, `ai-agents-observability`, `market-regime-analysis`, `photo-renamer`, `bilinear`, `road-trip-trivia-game`.
- Hidden repositories are listed in `hidden`; overrides currently provide custom descriptions for `colophon` and `pi-statusbar`; `visible` is `null` (so the hidden list is used, not an allowlist).

To change highlighted choices, edit only the `highlighted` array in `src/data/curation.json`. Check that each repository exists in generated `projects.json` and is not hidden. The page silently omits a curation name that cannot be found among visible repositories.

### Last highlight reassessment

At the latest review in this session (GitHub metadata inspected on **2026-10-24**), the recommendation was to keep the current three:

- `ai-agents-observability` had a recent push on 2026-10-24 and differentiates itself as a self-hosted, multi-agent telemetry and observability platform.
- `bilinear` had a recent push on 2026-10-14 and represents a substantial full-stack product (Linear-style issue tracker).
- `pi-harness-delegate` had a recent push on 2026-10-06 and represents practical pi ecosystem / developer tooling.
- `harness-evaluator` (latest push observed 2026-09-28) was considered as an alternative, but it overlaps with the developer/agent-tooling theme. No curation change was made during this reassessment.

Activity dates are only a point-in-time signal, not proof of quality or maintenance. Re-check GitHub before relying on them in a later review. The current visible project snapshot may be older than live GitHub data until the daily workflow runs or the generator is run locally.

## Curation and data refresh

`src/data/curation.json` supports:

- `featured`: ordered list of pinned project names.
- `highlighted`: ordered list of projects shown in elevated cards; omitted from the regular grid.
- `hidden`: projects excluded when `visible` is `null` or absent.
- `visible`: when a non-empty array, acts as an allowlist and takes precedence over `hidden`.
- `overrides`: per-repository `description` and/or `homepage` override.

Commands:

```bash
bun install
bun run curate:list
bun run generate:projects   # fetch latest repositories; optional GITHUB_TOKEN raises API limits
bun run build
bun run lint                # Biome lint
bun run lint:fix            # Biome check --write
bun run typecheck
```

`generate:projects` writes `src/data/projects.json`; it filters private repositories and forks and paginates the GitHub API response. The `deploy.yml` workflow runs daily at 06:00 UTC, regenerates metadata with `GITHUB_TOKEN`, builds, and deploys to GitHub Pages. A push to `master` also deploys. GitHub Actions, Bun, and Node setup actions must remain pinned as currently configured.

## Project history and deployment state

- The site was rebuilt as a fresh Astro project after the original Jekyll repository was renamed to `yorch.github.io-legacy`.
- The terminal hybrid, accessibility/security polish, sitemap/OG metadata, and GitHub API pagination were merged through PRs #2–#4.
- Highlighted projects were added through PR #5 and merged. It originally featured `ovh-availability-checker`, `pi-statusbar`, and `cc-analyzer`; before merge, the picks were changed to the current three above.
- PR #5: <https://github.com/yorch/yorch.github.io/pull/5>. It was merged; its feature branch was deleted locally and remotely. At cleanup, `master` was the only remaining branch and there were no open PRs.
- At the last repository check after PR #5, `master` was at `f7e8824` (`feat: highlighted projects — 3 elevated terminal picks (#5)`). Check GitHub before assuming the branch is still current.
- Production was previously verified at HTTP 200, and the live HTML contained all three current highlighted repository names. Re-check after deployment when validating new work.

## Before finishing future changes

1. Check `git status`, current branch, and recent history. Do not overwrite unrelated user files or artifacts.
2. Create a feature branch from the latest `master`; never work directly on `master` for a requested change.
3. Make the smallest clear implementation and update this file if durable context or decisions changed.
4. Run `bun run build`, `bun run lint`, and, for TypeScript/source changes, `bun run typecheck` (or document any project/environment limitation).
5. Review the diff and generated output; push the feature branch and open a PR. Wait for explicit approval before merge.
