// Search for more RECENT freely-licensed Drake photos on Wikimedia Commons
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const DEST_DIR = "public/images/celebrities";
const SLUG = "drake";
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
  // Search multiple queries to find recent Drake photos
  const queries = [
    "Drake 2023",
    "Drake 2022",
    "Drake 2024",
    "Drake concert 2023",
    "Drake rapper 2022",
    "Drake OVO",
  ];

  const allCandidates = new Map();

  for (const q of queries) {
    console.log(`\nSearching: "${q}"...`);
    try {
      const pages = await searchImages(q);
      console.log(`  Found ${pages.length} results`);
      for (const p of pages) {
        if (!allCandidates.has(p.title)) {
          allCandidates.set(p.title, p);
        }
      }
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  console.log(`\nTotal unique candidates: ${allCandidates.size}`);

  // Filter for valid images, sort by timestamp (newest first)
  const valid = [...allCandidates.values()]
    .filter((p) => {
      const info = p.imageinfo?.[0];
      if (!info) return false;
      if (info.mime !== "image/jpeg" && info.mime !== "image/png") return false;
      if (!info.thumburl) return false;
      if (info.width < 400) return false;
      return true;
    })
    .sort((a, b) => {
      const ta = a.imageinfo[0].timestamp || "";
      const tb = b.imageinfo[0].timestamp || "";
      return tb.localeCompare(ta); // newest first
    });

  console.log(`${valid.length} valid candidates (sorted newest first)`);

  // Log the top candidates with dates
  for (let i = 0; i < Math.min(15, valid.length); i++) {
    const info = valid[i].imageinfo[0];
    console.log(`  [${info.timestamp}] ${valid[i].title} (${info.width}x${info.height})`);
  }

  let downloaded = 0;
  let idx = 7; // continue from gallery-6

  for (const page of valid) {
    if (downloaded >= 6) break;
    const info = page.imageinfo[0];
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
      console.log(`Downloading: ${page.title} -> ${destFile}`);
      const bytes = await downloadFile(info.thumburl, destFile);
      console.log(`  Saved ${Math.round(bytes / 1024)} KB [${info.timestamp}]`);
      downloaded++;
      idx++;
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  console.log(`\nDone. Downloaded ${downloaded} new recent Drake images.`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
