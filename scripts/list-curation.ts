// @ts-nocheck
// Helper: list repos for curation.json editing
// Usage: tsx scripts/list-curation.ts [--hidden] [--visible]
import projects from "../src/data/projects.json" with { type: "json" };
import curation from "../src/data/curation.json" with { type: "json" };

const hidden = new Set((curation.hidden ?? []) as string[]);
const visible = curation.visible as string[] | null;
const featured = new Set((curation.featured ?? []) as string[]);

const rows = (projects as any[]).map((p) => ({
  name: p.name,
  stars: p.stars,
  lang: p.language ?? "-",
  hidden: hidden.has(p.name),
  featured: featured.has(p.name),
  visible: visible ? visible.includes(p.name) : !hidden.has(p.name),
}));

console.log(
  `\nTotal: ${projects.length}  |  Visible: ${rows.filter((r) => r.visible).length}  |  Hidden: ${rows.filter((r) => !r.visible).length}  |  Featured: ${featured.size}\n`,
);
console.log(
  "NAME".padEnd(32) + "★".padStart(3) + "  LANG".padEnd(10) + "  V F H",
);
console.log("-".repeat(60));
for (const r of rows.sort((a, b) => b.stars - a.stars)) {
  const v = r.visible ? "v" : " ";
  const f = r.featured ? "★" : " ";
  const h = r.hidden ? "h" : " ";
  console.log(
    `${r.name.padEnd(32)}${String(r.stars).padStart(3)}  ${r.lang.padEnd(10)}  ${v} ${f} ${h}`,
  );
}
console.log("\nEdit src/data/curation.json:");
console.log("  featured: ordered pinned names (must be visible)");
console.log("  hidden:   blocklist (ignored if visible array is set)");
console.log("  visible:  allowlist — if non-null array, ONLY those show");
console.log('  overrides: { repo: { description: "custom" } }');
if (
  (curation.featured as string[]).some(
    (n) => !projects.some((p) => p.name === n),
  )
) {
  console.log(
    "\n⚠ featured contains unknown names:",
    (curation.featured as string[]).filter(
      (n) => !projects.some((p) => p.name === n),
    ),
  );
}
if (hidden.size === 0)
  console.log(
    "\nTip: add low-value repos to hidden: test, dotfiles, Mvc3QuizQuestions, ...",
  );
