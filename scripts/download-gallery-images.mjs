// Fix Will Smith photo + download 2-3 gallery images for all 76 new celebrities
// Uses Wikipedia REST API for reliable main photos and Commons search for galleries
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const GALLERY_FILE = "data/celebrity-galleries.json";
const DEST_DIR = "public/images/celebrities";
const WIKI_REST = "https://en.wikipedia.org/api/rest_v1/page/summary";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

const ORIGINAL_24 = new Set([
  "tom-cruise","beyonce","lebron-james","brad-pitt","rihanna","dwayne-johnson",
  "taylor-swift","kevin-hart","keanu-reeves","drake","scarlett-johansson",
  "chris-hemsworth","leonardo-dicaprio","jennifer-lawrence","morgan-freeman",
  "angelina-jolie","elon-musk","oprah-winfrey","lionel-messi","cristiano-ronaldo",
  "gordon-ramsay","dave-chappelle","margot-robbie","zendaya",
]);

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

// Get the main Wikipedia thumbnail (reliable — always the correct person)
async function getWikiThumbnail(wikiTitle) {
  const url = `${WIKI_REST}/${encodeURIComponent(wikiTitle)}`;
  const data = await fetchJson(url);
  return data.thumbnail?.source || data.originalimage?.source || null;
}

// Search Commons for gallery images, return multiple results
async function searchCommonsGallery(name, limit = 5) {
  const url = `${COMMONS_API}?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(name)}&gsrlimit=${limit * 2}&prop=imageinfo&iiprop=url|mime|size|timestamp&iiurlwidth=800`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages) return [];

  return Object.values(pages)
    .filter((p) => {
      const info = p.imageinfo?.[0];
      if (!info) return false;
      if (info.mime !== "image/jpeg" && info.mime !== "image/png") return false;
      if (!info.thumburl || info.width < 300) return false;
      return true;
    })
    .map((p) => ({
      url: p.imageinfo[0].thumburl,
      width: p.imageinfo[0].width,
      height: p.imageinfo[0].height,
      title: p.title,
    }))
    .slice(0, limit);
}

async function main() {
  const celebrities = JSON.parse(await fs.readFile(SEED_FILE, "utf-8"));
  const newCelebs = celebrities.filter((c) => !ORIGINAL_24.has(c.slug));
  console.log(`Processing ${newCelebs.length} new celebrities...\n`);

  // Load existing gallery data
  let galleryData = JSON.parse(await fs.readFile(GALLERY_FILE, "utf-8"));

  let fixedMain = 0;
  let galleriesAdded = 0;
  let totalGalleryImages = 0;
  let failed = 0;

  for (let i = 0; i < newCelebs.length; i++) {
    const celeb = newCelebs[i];
    const progress = `[${i + 1}/${newCelebs.length}]`;

    try {
      // 1. Fix main photo using Wikipedia REST API (reliable)
      if (celeb.slug === "will-smith" || !celeb.photoUrl) {
        process.stdout.write(`${progress} Fixing main photo: ${celeb.name}... `);
        const thumbUrl = await getWikiThumbnail(celeb.wikiTitle);
        if (thumbUrl) {
          const ext = thumbUrl.match(/\.(png)$/i) ? ".png" : ".jpg";
          const destFile = path.join(DEST_DIR, `${celeb.slug}${ext}`);
          await downloadFile(thumbUrl, destFile);
          celeb.photoUrl = `/images/celebrities/${celeb.slug}${ext}`;
          fixedMain++;
          console.log("OK");
        } else {
          console.log("no thumbnail found");
        }
        await new Promise((r) => setTimeout(r, 2000));
      }

      // 2. Download gallery images (target: 3 per celebrity)
      const existingGallery = galleryData[celeb.slug] || [];
      if (existingGallery.length >= 2) {
        continue; // Already has gallery images
      }

      process.stdout.write(`${progress} Gallery: ${celeb.name}... `);
      const candidates = await searchCommonsGallery(celeb.name, 5);

      if (candidates.length === 0) {
        console.log("no gallery images found");
        continue;
      }

      const galleryPaths = [];
      const maxGallery = Math.min(3, candidates.length);

      for (let g = 0; g < maxGallery; g++) {
        const candidate = candidates[g];
        const ext = candidate.url.match(/\.(png)$/i) ? ".png" : ".jpg";
        const galleryFile = `${celeb.slug}-gallery-${g + 1}${ext}`;
        const destPath = path.join(DEST_DIR, galleryFile);

        try {
          const bytes = await downloadFile(candidate.url, destPath);
          galleryPaths.push(`/images/celebrities/${galleryFile}`);
          totalGalleryImages++;
          await new Promise((r) => setTimeout(r, 1500));
        } catch (err) {
          // Skip this image, try next
        }
      }

      if (galleryPaths.length > 0) {
        galleryData[celeb.slug] = galleryPaths;
        galleriesAdded++;
        console.log(`${galleryPaths.length} images`);
      } else {
        console.log("all downloads failed");
      }

      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`${progress} FAIL: ${err.message}`);
      failed++;
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  // Save updated files
  await fs.writeFile(SEED_FILE, JSON.stringify(celebrities, null, 2));
  await fs.writeFile(GALLERY_FILE, JSON.stringify(galleryData, null, 2));

  console.log(`\n=== Summary ===`);
  console.log(`Main photos fixed: ${fixedMain}`);
  console.log(`Galleries added: ${galleriesAdded}`);
  console.log(`Total gallery images: ${totalGalleryImages}`);
  console.log(`Failed: ${failed}`);
  console.log(`Updated: ${SEED_FILE} + ${GALLERY_FILE}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
