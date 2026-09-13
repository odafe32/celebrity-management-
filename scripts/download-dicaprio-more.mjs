// Download additional freely-licensed Leonardo DiCaprio images from Wikimedia Commons
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const DEST_DIR = "public/images/celebrities";
const SLUG = "leonardo-dicaprio";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AshencrestBot/1.0 (educational prototype)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function searchImages(query) {
  const url = `${COMMONS_API}?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=50&prop=imageinfo&iiprop=url|extmetadata|mime|size|timestamp&iiurlwidth=800`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages) return [];
  return Object.values(pages);
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
  const queries = [
    "Leonardo DiCaprio",
    "Leonardo DiCaprio actor",
    "Leonardo DiCaprio 2016",
    "Leonardo DiCaprio 2019",
    "Leonardo DiCaprio film festival",
    "Leonardo DiCaprio UN",
  ];

  const allCandidates = new Map();

  for (const q of queries) {
    console.log(`\nSearching: "${q}"...`);
    try {
      const pages = await searchImages(q);
      console.log(`  Found ${pages.length} results`);
      for (const p of pages) {
        const info = p.imageinfo?.[0];
        if (!info) continue;
        if (info.mime !== "image/jpeg" && info.mime !== "image/png") continue;
        if (!info.thumburl || info.width < 400) continue;
        if (!allCandidates.has(p.title)) {
          allCandidates.set(p.title, { page: p, info });
        }
      }
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  console.log(`\nTotal unique candidates: ${allCandidates.size}`);

  // Sort by timestamp (newest upload first)
  const sorted = [...allCandidates.values()].sort((a, b) => {
    const ta = a.info.timestamp || "";
    const tb = b.info.timestamp || "";
    return tb.localeCompare(ta);
  });

  // Log top candidates
  console.log(`\nNewest candidates:`);
  for (let i = 0; i < Math.min(25, sorted.length); i++) {
    const c = sorted[i];
    console.log(`  [${c.info.timestamp}] ${c.page.title} (${c.info.width}x${c.info.height})`);
  }

  let downloaded = 0;
  let idx = 5; // continue from gallery-4

  for (const c of sorted) {
    if (downloaded >= 10) break;
    const info = c.info;
    const ext = info.mime === "image/png" ? ".png" : ".jpg";
    const destFile = path.join(DEST_DIR, `${SLUG}-gallery-${idx}${ext}`);

    try {
      await fs.access(destFile);
      idx++;
      continue;
    } catch {
      // doesn't exist
    }

    try {
      console.log(`Downloading: ${c.page.title} -> ${destFile}`);
      const bytes = await downloadFile(info.thumburl, destFile);
      console.log(`  Saved ${Math.round(bytes / 1024)} KB [${info.timestamp}]`);
      downloaded++;
      idx++;
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  console.log(`\nDone. Downloaded ${downloaded} new Leonardo DiCaprio images.`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
