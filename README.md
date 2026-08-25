# yorch.github.io — Jorge Barnaby

> **yorch {at} web [in]** — Principal Software Engineer @ SentinelOne · Miami, FL

Personal site + open source showcase. Built with **Astro 5 + Tailwind 4**, deployed to GitHub Pages.

**Live:** https://yorch.github.io

## What’s inside

- **Hero** — 17 years on GitHub, 110 repos, now-building highlights
- **Open Source showcase** — 49 public non-fork repos, auto-synced from [GitHub API](https://api.github.com/users/yorch/repos) via `src/data/projects.json`, sorted by ★ + recency, searchable + language filter — *minimal dev portfolio* style
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
  data/projects.json        # generated, 49 repos, sorted
  styles/global.css         # @tailwindcss/vite
scripts/generate-projects.ts
public/favicon.svg
_jekyll-legacy/             # archive of original Jekyll Bootstrap 0.3.0 site
```

Jekyll history is preserved in the [`jekyll-legacy` branch](https://github.com/yorch/yorch.github.io/tree/jekyll-legacy).

## Customizing

- **Curate featured order:** edit `featuredNames` in `src/pages/index.astro`
- **Language colors:** edit `langColors` in `src/components/ProjectCard.astro`
- **Add a project manually:** add to `src/data/projects.json` or pin via `featuredNames` + re-sort
- **Daily auto-update:** workflow `schedule: 0 6 * * *` handles it; force via *Run workflow* in Actions

## License

MIT — original Jekyll Bootstrap also MIT.
