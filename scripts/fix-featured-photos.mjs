// Re-download verified main photos from Wikipedia for Ariana Grande + all featured celebrities
import fs from "node:fs/promises";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const DEST_DIR = "public/images/celebrities";
const WIKI_REST = "https://en.wikipedia.org/api/rest_v1/page/summary";

// Featured celebrities + Ariana Grande
const TARGET_SLUGS = [
  "ariana-grande", // specifically requested
  "tom-cruise", "brad-pitt", "leonardo-dicaprio", "johnny-depp", "will-smith",
  "keanu-reeves", "dwayne-johnson", "pedro-pascal", "timothee-chalamet",
  "zendaya", "beyonce", "taylor-swift", "rihanna", "kendrick-lamar",
  "lebron-james", "lionel-messi", "cristiano-ronaldo", "kylian-mbappe",
  "shohei-ohtani", "elon-musk", "mrbeast", "sza", "travis-scott",
  "karol-g", "sydney-sweeney", "jenna-ortega",
];

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": "AshencrestBot/1.0 (educational prototype)" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, { headers: { "User-Agent": "AshencrestBot/1.0 (educational prototype)" } });
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(destPath, buf);
  return buf.length;
}

async function main() {
  const celebrities = JSON.parse(await fs.readFile(SEED_FILE, "utf-8"));
  const { join } = await import("node:path");

  console.log(`Re-downloading verified main photos for ${TARGET_SLUGS.length} celebrities...\n`);

  let fixed = 0;
  let failed = 0;
  const results = [];

  for (let i = 0; i < TARGET_SLUGS.length; i++) {
    const slug = TARGET_SLUGS[i];
    const celeb = celebrities.find((c) => c.slug === slug);
    if (!celeb) {
      console.log(`[${i + 1}/${TARGET_SLUGS.length}] ${slug} — not found`);
      continue;
    }

    // Skip will-smith (user provided custom photo)
    if (slug === "will-smith") {
      console.log(`[${i + 1}/${TARGET_SLUGS.length}] Will Smith — keeping user-provided photo`);
      continue;
    }

    try {
      process.stdout.write(`[${i + 1}/${TARGET_SLUGS.length}] ${celeb.name}... `);

      // Get the original (full-resolution) image from Wikipedia
      const url = `${WIKI_REST}/${encodeURIComponent(celeb.wikiTitle)}`;
      const data = await fetchJson(url);
      await new Promise((r) => setTimeout(r, 2000));

      // Prefer originalimage (full resolution), fall back to thumbnail
      const imageUrl = data.originalimage?.source || data.thumbnail?.source;
      if (!imageUrl) {
        console.log("no image found");
        failed++;
        continue;
      }

      // Determine file extension
      const ext = imageUrl.match(/\.(png)$/i) ? ".png" : ".jpg";
      const fileName = `${slug}${ext}`;
      const destPath = join(DEST_DIR, fileName);

      const bytes = await downloadFile(imageUrl, destPath);
      await new Promise((r) => setTimeout(r, 2000));

      // Update the photoUrl in the seed data
      celeb.photoUrl = `/images/celebrities/${fileName}`;

      fixed++;
      results.push({ name: celeb.name, slug, size: Math.round(bytes / 1024) + "KB" });
      console.log(`OK (${Math.round(bytes / 1024)} KB)`);
    } catch (err) {
      console.error(`FAIL: ${err.message}`);
      failed++;
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  await fs.writeFile(SEED_FILE, JSON.stringify(celebrities, null, 2));

  console.log(`\n=== Summary ===`);
  console.log(`Fixed: ${fixed}, Failed: ${failed}`);
  console.log(`Updated: ${SEED_FILE}`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
