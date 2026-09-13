import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = "public/images";
const MAX_WIDTH = 600;        // max width for celebrity photos
const GALLERY_MAX_WIDTH = 500; // smaller for gallery images
const QUALITY = 60;           // JPEG quality (0-100)

let total = 0;
let compressed = 0;
let skipped = 0;
let savedBytes = 0;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

async function compress(file) {
  const stat = fs.statSync(file);
  const originalSize = stat.size;
  total++;

  // Skip already-tiny files (< 15 KB)
  if (originalSize < 15 * 1024) {
    skipped++;
    return;
  }

  const basename = path.basename(file).toLowerCase();
  const isGallery = /gallery/.test(basename);
  const maxWidth = isGallery ? GALLERY_MAX_WIDTH : MAX_WIDTH;

  try {
    const buf = await sharp(file)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();

    // Only write if compressed size is smaller
    if (buf.length < originalSize) {
      const tmp = file + ".tmp";
      fs.writeFileSync(tmp, buf);
      fs.renameSync(tmp, file);
      savedBytes += (originalSize - buf.length);
      compressed++;
      console.log(`✓ ${path.relative("public", file)} (${(originalSize / 1024).toFixed(0)} KB → ${(buf.length / 1024).toFixed(0)} KB)`);
    } else {
      skipped++;
    }
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
    skipped++;
  }
}

const files = walk(IMAGES_DIR);
console.log(`Found ${files.length} images. Compressing...\n`);

for (const file of files) {
  await compress(file);
}

console.log(`\n=== Done ===`);
console.log(`Total: ${total}`);
console.log(`Compressed: ${compressed}`);
console.log(`Skipped: ${skipped}`);
console.log(`Saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
