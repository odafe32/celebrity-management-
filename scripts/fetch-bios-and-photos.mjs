// Fetch bios from Wikipedia REST API for all 100 celebrities
// and download freely-licensed photos from Wikimedia Commons
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const DEST_DIR = "public/images/celebrities";
const WIKI_REST = "https://en.wikipedia.org/api/rest_v1/page/summary";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

async function fetchJson(url, headers = {}) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AshencrestBot/1.0 (educational prototype)", ...headers },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchBio(wikiTitle) {
  const url = `${WIKI_REST}/${encodeURIComponent(wikiTitle)}`;
  const data = await fetchJson(url);
  return {
    bio: data.extract || "",
    wikiUrl: data.content_urls?.desktop?.page || "",
  };
}

async function searchCommonsPhoto(name) {
  // Search for the celebrity name on Commons, get image results
  const url = `${COMMONS_API}?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(name)}&gsrlimit=20&prop=imageinfo&iiprop=url|mime|size|timestamp&iiurlwidth=600`;
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
      // Prefer portrait orientation (taller than wide) for profile photos
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
  console.log(`Processing ${celebrities.length} celebrities...\n`);

  let biosFetched = 0;
  let photosDownloaded = 0;
  let photosSkipped = 0;
  let failed = 0;

  for (let i = 0; i < celebrities.length; i++) {
    const celeb = celebrities[i];
    const progress = `[${i + 1}/${celebrities.length}]`;

    // 1. Fetch bio from Wikipedia
    if (!celeb.bio) {
      try {
        process.stdout.write(`${progress} Bio: ${celeb.name}... `);
        const { bio, wikiUrl } = await fetchBio(celeb.wikiTitle);
        celeb.bio = bio;
        if (wikiUrl) celeb.wikiUrl = wikiUrl;
        biosFetched++;
        console.log(bio ? "OK" : "no bio");
      } catch (err) {
        console.error(`FAIL: ${err.message}`);
        failed++;
      }
      await new Promise((r) => setTimeout(r, 300));
    } else {
      photosSkipped++;
    }

    // 2. Download photo if missing
    if (!celeb.photoUrl) {
      try {
        process.stdout.write(`${progress} Photo: ${celeb.name}... `);
        const thumbUrl = await searchCommonsPhoto(celeb.name);
        if (!thumbUrl) {
          console.log("no photo found on Commons");
          continue;
        }
        const ext = thumbUrl.match(/\.(png)$/i) ? ".png" : ".jpg";
        const destFile = path.join(DEST_DIR, `${celeb.slug}${ext}`);
        const bytes = await downloadFile(thumbUrl, destFile);
        celeb.photoUrl = `/images/celebrities/${celeb.slug}${ext}`;
        photosDownloaded++;
        console.log(`OK (${Math.round(bytes / 1024)} KB)`);
        await new Promise((r) => setTimeout(r, 1500));
      } catch (err) {
        console.error(`FAIL: ${err.message}`);
      }
    }
  }

  // Save updated JSON
  await fs.writeFile(SEED_FILE, JSON.stringify(celebrities, null, 2));
  console.log(`\n=== Summary ===`);
  console.log(`Bios fetched: ${biosFetched}`);
  console.log(`Photos downloaded: ${photosDownloaded}`);
  console.log(`Already had photos: ${photosSkipped}`);
  console.log(`Failures: ${failed}`);
  console.log(`Updated: ${SEED_FILE}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
