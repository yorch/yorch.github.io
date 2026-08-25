# yorch.github.io — Jorge Barnaby

> **yorch {at} web [in]** — Principal Software Engineer @ SentinelOne · Miami, FL

Personal site + open source showcase. Built with **Astro 5 + Tailwind 4**, deployed to GitHub Pages.

**Live:** <https://yorch.github.io>

## What’s inside

- **Hero** — 17 years on GitHub, 110 repos, now-building highlights
- **Open Source showcase** — 49 public non-fork repos, auto-synced from [GitHub API](https://api.github.com/users/yorch/repos) via `src/data/projects.json`, **curated via `src/data/curation.json`** (featured/hidden/overrides), sorted by ★ + recency, searchable + language filter — *minimal dev portfolio* style
- **Deploy** — GitHub Actions (`.github/workflows/deploy.yml`) → `dist/` → `gh-pages` (daily cron at 06:00 UTC refreshes stars)

## Local dev

```bash
npm ci
npm run generate:projects   # fetches GitHub API → src/data/projects.json (needs GITHUB_TOKEN for higher rate limit)
npm run dev                 # http://localhost:4321
npm run build && npm run preview
```

## Structure

```
src/
  layouts/Base.astro
  components/ProjectCard.astro
  pages/index.astro         # hero + filterable grid (vanilla JS)
  data/projects.json        # generated, 49 repos, sorted (daily)
  data/curation.json        # curated: featured, hidden, visible, overrides
  styles/global.css         # @tailwindcss/vite
scripts/
  generate-projects.ts      # fetch GitHub API → projects.json
  list-curation.ts          # helper: npm run curate:list
public/favicon.svg
```

## Curating which repos show

Edit **`src/data/curation.json`** — commit & push, no code change needed:

```json
{
  "featured": ["ovh-availability-checker", "pi-statusbar", "cc-analyzer"],
  "hidden": ["test", "dotfiles", "Mvc3QuizQuestions"],
  "visible": null,
  "overrides": { "pi-statusbar": { "description": "Custom blurb" } }
}
```

- `featured` — ordered pinned names, appear first in exact order (rest sorted by ★)
- `hidden` — blocklist (ignored if `visible` is set)
- `visible` — allowlist: if non-null array, **only** those repos show (overrides `hidden`)
- `overrides` — per-repo `description` / `homepage` patches (keeps GitHub stars live)

Helpers:

```bash
npm run curate:list   # table: name ★ lang  v=visible ★=featured h=hidden
npm run generate:projects  # refresh stars/desc from GitHub then rebuild
```

Quick recipes:

- **Hide a repo:** add its name to `hidden`
- **Show only 10:** set `visible: ["repo-a", "repo-b", ...]`
- **Reorder:** reorder `featured` exactly as you want top row
- **Custom blurb:** add to `overrides.{repo}.description`

## Other customizing

- **Language colors:** edit `langColors` in `src/components/ProjectCard.astro`
- **Hero copy:** edit `src/pages/index.astro`
- **Daily auto-update:** workflow `schedule: 0 6 * * *` handles stars; force via *Run workflow* in Actions

## License

MIT — see [LICENSE](./LICENSE).
