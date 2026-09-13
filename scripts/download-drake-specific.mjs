// Download specific freely-licensed Drake photos (2016-2017 era) from Wikimedia Commons
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const DEST_DIR = "public/images/celebrities";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

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

// Specific files we want (actual Drake the musician, 2016-2017 era)
const targetFiles = [
  "File:Drake Summer Sixteen Tour (cropped).jpg",
  "File:Drake, 2017 Toronto International Film Festival.jpg",
  "File:Drake July 2016.jpg",
  "File:Drake in 2017.jpg",
];

async function main() {
  console.log("Downloading specific Drake photos from Wikimedia Commons...\n");

  let downloaded = 0;
  let idx = 11; // continue numbering

  for (const fileTitle of targetFiles) {
    // Get image info for this specific file
    const url = `${COMMONS_API}?action=query&format=json&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url|mime|size|timestamp&iiurlwidth=800`;
    try {
      const data = await fetchJson(url);
      const pages = data?.query?.pages;
      if (!pages) {
        console.log(`No data for: ${fileTitle}`);
        continue;
      }

      for (const page of Object.values(pages)) {
        const info = page.imageinfo?.[0];
        if (!info || !info.thumburl) {
          console.log(`No image info for: ${fileTitle}`);
          continue;
        }

        const ext = info.mime === "image/png" ? ".png" : ".jpg";
        const destFile = path.join(DEST_DIR, `drake-gallery-${idx}${ext}`);

        try {
          await fs.access(destFile);
          console.log(`Skip (exists): ${destFile}`);
          idx++;
          continue;
        } catch {
          // doesn't exist
        }

        console.log(`Downloading: ${fileTitle} -> ${destFile}`);
        const bytes = await downloadFile(info.thumburl, destFile);
        console.log(`  Saved ${Math.round(bytes / 1024)} KB [${info.timestamp}]`);
        downloaded++;
        idx++;
        await new Promise((r) => setTimeout(r, 2000));
      }
    } catch (err) {
      console.error(`ERROR for ${fileTitle}: ${err.message}`);
    }
  }

  console.log(`\nDone. Downloaded ${downloaded} Drake photos.`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
