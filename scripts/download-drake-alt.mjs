// Search alternative sources for freely-licensed Drake photos
// 1. Wikimedia Commons under "Aubrey Graham" and other search terms
// 2. Openverse API (aggregates Flickr CC, Wikimedia, etc.)
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const DEST_DIR = "public/images/celebrities";
const SLUG = "drake";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";
const OPENVERSE_API = "https://api.openverse.org/v1/images";

async function fetchJson(url, headers = {}) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AshencrestBot/1.0 (educational prototype)", ...headers },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function searchCommons(query) {
  const url = `${COMMONS_API}?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=50&prop=imageinfo&iiprop=url|extmetadata|mime|size|timestamp&iiurlwidth=800`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages) return [];
  return Object.values(pages);
}

async function searchOpenverse(query, page = 1) {
  const url = `${OPENVERSE_API}?q=${encodeURIComponent(query)}&page_size=20&page=${page}&license=cc-by,cc-by-sa,cc0,pdm`;
  const data = await fetchJson(url);
  return data?.results ?? [];
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
  const allCandidates = new Map();

  // 1. Search Wikimedia Commons with alternative terms
  const commonsQueries = [
    "Aubrey Graham",
    "Drake entertainer",
    "Drake Toronto",
    "Drake rapper concert",
    "Drake It's All a Blur",
    "Drake Apollo",
  ];

  console.log("=== Wikimedia Commons (alternative searches) ===\n");
  for (const q of commonsQueries) {
    console.log(`Searching: "${q}"...`);
    try {
      const pages = await searchCommons(q);
      console.log(`  Found ${pages.length} results`);
      for (const p of pages) {
        const info = p.imageinfo?.[0];
        if (!info) continue;
        if (info.mime !== "image/jpeg" && info.mime !== "image/png") continue;
        if (!info.thumburl || info.width < 400) continue;
        if (!allCandidates.has(p.title)) {
          allCandidates.set(p.title, { source: "commons", page: p, info });
        }
      }
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  // 2. Search Openverse
  console.log("\n=== Openverse (CC-licensed) ===\n");
  const openverseQueries = ["Drake rapper", "Drake concert", "Drake musician", "Aubrey Drake Graham"];
  for (const q of openverseQueries) {
    console.log(`Searching: "${q}"...`);
    try {
      const results = await searchOpenverse(q);
      console.log(`  Found ${results.length} results`);
      for (const r of results) {
        const key = `openverse-${r.id}`;
        if (!allCandidates.has(key)) {
          allCandidates.set(key, { source: "openverse", result: r });
        }
      }
      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  console.log(`\nTotal unique candidates: ${allCandidates.size}`);

  // Sort Commons candidates by timestamp (newest first)
  const commonsCandidates = [...allCandidates.values()]
    .filter((c) => c.source === "commons")
    .sort((a, b) => {
      const ta = a.info.timestamp || "";
      const tb = b.info.timestamp || "";
      return tb.localeCompare(ta);
    });

  // Log newest Commons results
  console.log(`\nNewest Wikimedia Commons candidates:`);
  for (let i = 0; i < Math.min(20, commonsCandidates.length); i++) {
    const c = commonsCandidates[i];
    console.log(`  [${c.info.timestamp}] ${c.page.title} (${c.info.width}x${c.info.height})`);
  }

  // Log Openverse results
  const openverseCandidates = [...allCandidates.values()].filter((c) => c.source === "openverse");
  console.log(`\nOpenverse candidates:`);
  for (const c of openverseCandidates.slice(0, 20)) {
    console.log(`  [${c.result.license}] ${c.result.title} — ${c.result.url?.substring(0, 80)}`);
  }

  // Download from Commons (newest first), skip existing
  let downloaded = 0;
  let idx = 7; // continue from gallery-6

  for (const c of commonsCandidates) {
    if (downloaded >= 6) break;
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

  // If Commons didn't yield enough, try Openverse
  if (downloaded < 6) {
    for (const c of openverseCandidates) {
      if (downloaded >= 6) break;
      const r = c.result;
      const url = r.url;
      if (!url) continue;
      // Determine extension from URL
      const ext = url.match(/\.(png)$/i) ? ".png" : ".jpg";
      const destFile = path.join(DEST_DIR, `${SLUG}-gallery-${idx}${ext}`);

      try {
        await fs.access(destFile);
        idx++;
        continue;
      } catch {
        // doesn't exist
      }

      try {
        console.log(`Downloading (Openverse): ${r.title} -> ${destFile}`);
        const bytes = await downloadFile(url, destFile);
        console.log(`  Saved ${Math.round(bytes / 1024)} KB [${r.license}]`);
        downloaded++;
        idx++;
        await new Promise((r2) => setTimeout(r2, 2000));
      } catch (err) {
        console.error(`  ERROR: ${err.message}`);
      }
    }
  }

  console.log(`\nDone. Downloaded ${downloaded} new Drake images.`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
