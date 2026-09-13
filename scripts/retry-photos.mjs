// Retry: Download photos only for celebrities still missing them
// Uses longer delays to avoid Wikimedia rate limiting
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const DEST_DIR = "public/images/celebrities";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AshencrestBot/1.0 (educational prototype)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function searchCommonsPhoto(name) {
  const url = `${COMMONS_API}?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(name)}&gsrlimit=15&prop=imageinfo&iiprop=url|mime|size|timestamp&iiurlwidth=600`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages) return null;

  const candidates = Object.values(pages)
    .filter((p) => {
      const info = p.imageinfo?.[0];
      if (!info) return false;
      if (info.mime !== "image/jpeg" && info.mime !== "image/png") return false;
      if (!info.thumburl || info.width < 300) return false;
      return true;
    })
    .sort((a, b) => {
      const aInfo = a.imageinfo[0];
      const bInfo = b.imageinfo[0];
      const aPortrait = aInfo.height > aInfo.width ? 1 : 0;
      const bPortrait = bInfo.height > bInfo.width ? 1 : 0;
      return bPortrait - aPortrait;
    });

  return candidates[0]?.imageinfo?.[0]?.thumburl ?? null;
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
      const thumbUrl = await searchCommonsPhoto(celeb.name);
      if (!thumbUrl) {
        console.log("no photo found");
        continue;
      }
      const ext = thumbUrl.match(/\.(png)$/i) ? ".png" : ".jpg";
      const destFile = path.join(DEST_DIR, `${celeb.slug}${ext}`);
      const bytes = await downloadFile(thumbUrl, destFile);
      celeb.photoUrl = `/images/celebrities/${celeb.slug}${ext}`;
      downloaded++;
      console.log(`OK (${Math.round(bytes / 1024)} KB)`);
      // Long delay to avoid 429
      await new Promise((r) => setTimeout(r, 4000));
    } catch (err) {
      console.error(`FAIL: ${err.message}`);
      failed++;
      // Extra long delay after a failure
      await new Promise((r) => setTimeout(r, 8000));
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
