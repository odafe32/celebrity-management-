// Download freely-licensed Drake (musician) images from Wikipedia/Wikimedia
// Forces IPv4 via dns.lookup to avoid IPv6 timeout issues
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

// Force IPv4 to avoid IPv6 connect timeout
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

async function searchImages() {
  const url = `${COMMONS_API}?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=Drake%20%28musician%29&gsrlimit=40&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=800`;
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
  console.log("Searching Wikimedia Commons for Drake images (IPv4)...");
  const pages = await searchImages();
  console.log(`Found ${pages.length} candidate files`);

  const valid = pages.filter((p) => {
    const info = p.imageinfo?.[0];
    if (!info) return false;
    const mime = info.mime;
    if (mime !== "image/jpeg" && mime !== "image/png") return false;
    if (!info.thumburl) return false;
    if (info.width < 400) return false;
    return true;
  });

  console.log(`${valid.length} candidates passed filter`);

  let downloaded = 0;
  let idx = 1;

  for (const page of valid) {
    if (downloaded >= 8) break;
    const info = page.imageinfo[0];
    const ext = info.mime === "image/png" ? ".png" : ".jpg";
    const destFile = path.join(DEST_DIR, `${SLUG}-gallery-${idx}${ext}`);

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
      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  console.log(`\nDone. Downloaded ${downloaded} new Drake images.`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
