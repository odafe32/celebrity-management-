// Retry only the failed slugs with longer delays
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const GALLERY_FILE = "data/celebrity-galleries.json";
const DEST_DIR = "public/images/celebrities";
const WIKI_API = "https://en.wikipedia.org/w/api.php";

const RETRY_SLUGS = [
  "lainey-wilson", "peso-pluma", "wizkid", "shakira", "rosalia",
  "sydney-sweeney", "glen-powell", "barry-keoghan", "paul-mescal", "hunter-schafer",
];

const EXCLUDE_PATTERNS = /flag|icon|logo|commons-logo|wikidata|wikisource|edit-icon|ambox|padlock|semi-protection|question_book|symbol|\.svg$/i;

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

async function getArticleImages(wikiTitle) {
  const url = `${WIKI_API}?action=query&format=json&titles=${encodeURIComponent(wikiTitle)}&prop=images&imlimit=50`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages) return [];
  const page = Object.values(pages)[0];
  const images = page?.images || [];
  return images
    .map((img) => img.title)
    .filter((title) => !EXCLUDE_PATTERNS.test(title))
    .filter((title) => /\.(jpe?g|png)$/i.test(title));
}

async function resolveImageUrls(titles) {
  if (titles.length === 0) return [];
  const url = `${WIKI_API}?action=query&format=json&titles=${encodeURIComponent(titles.join("|"))}&prop=imageinfo&iiprop=url|size&iiurlwidth=800`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages) return [];
  return Object.values(pages)
    .map((p) => p.imageinfo?.[0])
    .filter((info) => info && info.thumburl && info.width >= 300)
    .map((info) => info.thumburl);
}

async function main() {
  const celebrities = JSON.parse(await fs.readFile(SEED_FILE, "utf-8"));
  let galleryData = JSON.parse(await fs.readFile(GALLERY_FILE, "utf-8"));

  console.log(`Retrying ${RETRY_SLUGS.length} celebrities with longer delays...\n`);

  let fixed = 0;
  let failed = 0;

  for (let i = 0; i < RETRY_SLUGS.length; i++) {
    const slug = RETRY_SLUGS[i];
    const celeb = celebrities.find((c) => c.slug === slug);
    if (!celeb) continue;

    try {
      process.stdout.write(`[${i + 1}/${RETRY_SLUGS.length}] ${celeb.name}... `);

      const imageTitles = await getArticleImages(celeb.wikiTitle);
      await new Promise((r) => setTimeout(r, 4000));

      if (imageTitles.length === 0) {
        console.log("no article images found");
        continue;
      }

      const imageUrls = await resolveImageUrls(imageTitles.slice(0, 8));
      await new Promise((r) => setTimeout(r, 4000));

      if (imageUrls.length === 0) {
        console.log("no resolvable images");
        continue;
      }

      const oldFiles = galleryData[slug] || [];
      for (const oldPath of oldFiles) {
        const fileName = oldPath.replace("/images/celebrities/", "");
        try { await fs.unlink(path.join(DEST_DIR, fileName)); } catch {}
      }

      const galleryPaths = [];
      const maxGallery = Math.min(3, imageUrls.length);
      for (let g = 0; g < maxGallery; g++) {
        try {
          const ext = imageUrls[g].match(/\.(png)$/i) ? ".png" : ".jpg";
          const galleryFile = `${slug}-gallery-${g + 1}${ext}`;
          const destPath = path.join(DEST_DIR, galleryFile);
          await downloadFile(imageUrls[g], destPath);
          galleryPaths.push(`/images/celebrities/${galleryFile}`);
          await new Promise((r) => setTimeout(r, 4000));
        } catch {}
      }

      if (galleryPaths.length > 0) {
        galleryData[slug] = galleryPaths;
        fixed++;
        console.log(`fixed with ${galleryPaths.length} verified images`);
      } else {
        console.log("all downloads failed");
        failed++;
      }
    } catch (err) {
      console.error(`FAIL: ${err.message}`);
      failed++;
      await new Promise((r) => setTimeout(r, 8000));
    }
  }

  await fs.writeFile(GALLERY_FILE, JSON.stringify(galleryData, null, 2));
  console.log(`\n=== Summary ===`);
  console.log(`Fixed: ${fixed}, Failed: ${failed}`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
