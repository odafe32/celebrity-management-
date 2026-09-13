// Final retry: Use Wikipedia REST API thumbnails instead of Commons search
// The REST API returns a thumbnail URL for each article
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const DEST_DIR = "public/images/celebrities";
const WIKI_REST = "https://en.wikipedia.org/api/rest_v1/page/summary";

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AshencrestBot/1.0 (educational prototype)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AshencrestBot/1.0 (educational prototype)" },
  });
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(destPath, buf);
  return buf.length;
}

async function main() {
  const celebrities = JSON.parse(await fs.readFile(SEED_FILE, "utf-8"));
  const missing = celebrities.filter((c) => !c.photoUrl);
  console.log(`Photos still needed: ${missing.length}\n`);

  let downloaded = 0;
  let failed = 0;

  for (let i = 0; i < missing.length; i++) {
    const celeb = missing[i];
    const progress = `[${i + 1}/${missing.length}]`;

    try {
      process.stdout.write(`${progress} ${celeb.name}... `);
      // Use Wikipedia REST API to get the article summary which includes a thumbnail
      const url = `${WIKI_REST}/${encodeURIComponent(celeb.wikiTitle)}`;
      const data = await fetchJson(url);

      const thumbUrl = data.thumbnail?.source || data.originalimage?.source;
      if (!thumbUrl) {
        console.log("no thumbnail");
        continue;
      }

      const ext = thumbUrl.match(/\.(png)$/i) ? ".png" : ".jpg";
      const destFile = path.join(DEST_DIR, `${celeb.slug}${ext}`);
      const bytes = await downloadFile(thumbUrl, destFile);
      celeb.photoUrl = `/images/celebrities/${celeb.slug}${ext}`;
      downloaded++;
      console.log(`OK (${Math.round(bytes / 1024)} KB)`);
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`FAIL: ${err.message}`);
      failed++;
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  await fs.writeFile(SEED_FILE, JSON.stringify(celebrities, null, 2));
  console.log(`\n=== Summary ===`);
  console.log(`Photos downloaded: ${downloaded}`);
  console.log(`Failed: ${failed}`);
  console.log(`Updated: ${SEED_FILE}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
