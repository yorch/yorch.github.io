// @ts-nocheck
import { writeFile } from 'node:fs/promises';

const USER = 'yorch';
const OUT = 'src/data/projects.json';

async function fetchAll() {
  const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} ${await res.text()}`);
  // biome-ignore lint/suspicious/noExplicitAny: GitHub API shape is dynamic
  const repos = (await res.json()) as any[];
  const filtered = repos
    .filter((r) => !r.private && !r.fork)
    .map((r) => ({
      description: r.description,
      forks: r.forks_count,
      homepage: r.homepage,
      language: r.language,
      name: r.name,
      stars: r.stargazers_count,
      topics: r.topics as string[],
      updated: r.pushed_at,
      url: r.html_url,
    }))
    .sort(
      (a, b) => b.stars - a.stars || new Date(b.updated).getTime() - new Date(a.updated).getTime()
    );

  await writeFile(OUT, `${JSON.stringify(filtered, null, 2)}\n`, 'utf-8');
  console.log(`Wrote ${filtered.length} repos to ${OUT}`);
}

fetchAll().catch((e) => {
  console.error(e);
  process.exit(1);
});
