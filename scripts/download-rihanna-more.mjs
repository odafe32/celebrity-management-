// Download additional freely-licensed Rihanna images from Wikimedia Commons
import fs from "node:fs/promises";
import path from "node:path";

const DEST_DIR = "public/images/celebrities";
const SLUG = "rihanna";
const START_INDEX = 5; // we already have gallery-1..4, start at 5

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AshencrestBot/1.0 (educational prototype)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function searchImages() {
  // Search for Rihanna files on Commons
  const url = `${COMMONS_API}?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=Rihanna&gsrlimit=30&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=800`;
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
  console.log("Searching Wikimedia Commons for Rihanna images...");
  const pages = await searchImages();
  console.log(`Found ${pages.length} candidate files`);

  // Filter: JPG/PNG, reasonable size, has a valid image URL
  const valid = pages.filter((p) => {
    const info = p.imageinfo?.[0];
    if (!info) return false;
    const mime = info.mime;
    if (mime !== "image/jpeg" && mime !== "image/png") return false;
    if (!info.thumburl) return false;
    // Skip very small images
    if (info.width < 400) return false;
    return true;
  });

  console.log(`${valid.length} candidates passed filter`);

  let downloaded = 0;
  let idx = START_INDEX;

  for (const page of valid) {
    if (downloaded >= 6) break; // download up to 6 new images
    const info = page.imageinfo[0];
    const ext = info.mime === "image/png" ? ".png" : ".jpg";
    const destFile = path.join(DEST_DIR, `${SLUG}-gallery-${idx}${ext}`);

    // Skip if file already exists
    try {
      await fs.access(destFile);
      console.log(`Skip (exists): ${destFile}`);
      idx++;
      continue;
    } catch {
      // doesn't exist, proceed
    }

    try {
      console.log(`Downloading: ${page.title} -> ${destFile}`);
      const bytes = await downloadFile(info.thumburl, destFile);
      console.log(`  Saved ${Math.round(bytes / 1024)} KB`);
      downloaded++;
      idx++;
      // Be polite to the API
      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  console.log(`\nDone. Downloaded ${downloaded} new Rihanna images.`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
