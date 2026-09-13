// Fetch remaining missing bios from Wikipedia REST API
import fs from "node:fs/promises";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const WIKI_REST = "https://en.wikipedia.org/api/rest_v1/page/summary";

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AshencrestBot/1.0 (educational prototype)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function main() {
  const celebrities = JSON.parse(await fs.readFile(SEED_FILE, "utf-8"));
  const missing = celebrities.filter((c) => !c.bio);
  console.log(`Bios still needed: ${missing.length}\n`);

  let fetched = 0;
  let failed = 0;

  for (let i = 0; i < missing.length; i++) {
    const celeb = missing[i];
    try {
      process.stdout.write(`[${i + 1}/${missing.length}] ${celeb.name}... `);
      const url = `${WIKI_REST}/${encodeURIComponent(celeb.wikiTitle)}`;
      const data = await fetchJson(url);
      celeb.bio = data.extract || "";
      if (data.content_urls?.desktop?.page) {
        celeb.wikiUrl = data.content_urls.desktop.page;
      }
      fetched++;
      console.log(celeb.bio ? "OK" : "no bio");
      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      console.error(`FAIL: ${err.message}`);
      failed++;
      await new Promise((r) => setTimeout(r, 3000));
    }
  }

  await fs.writeFile(SEED_FILE, JSON.stringify(celebrities, null, 2));
  console.log(`\n=== Summary ===`);
  console.log(`Bios fetched: ${fetched}`);
  console.log(`Failed: ${failed}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
