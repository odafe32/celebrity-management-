/**
 * Download failed service images with replacement URLs.
 * Run with: node scripts/download-failed-images.mjs
 */
import { writeFile } from "node:fs/promises";

const REPLACEMENTS = [
  // celebrity-meet-and-greet (fans, crowd, convention)
  { path: "public/images/services/celebrity-meet-and-greet-hero.jpg", url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80" },
  { path: "public/images/services/celebrity-meet-and-greet-gallery-1.jpg", url: "https://images.unsplash.com/photo-1492684223066-81307ee7845d?auto=format&fit=crop&w=800&q=80" },
  { path: "public/images/services/celebrity-meet-and-greet-gallery-3.jpg", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" },
  // charity-foundation-events (volunteers, giving)
  { path: "public/images/services/charity-foundation-events-hero.jpg", url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80" },
  // product-endorsements
  { path: "public/images/services/product-endorsements-gallery-2.jpg", url: "https://images.unsplash.com/photo-1557804145-764ec3961c8c?auto=format&fit=crop&w=800&q=80" },
  { path: "public/images/services/product-endorsements-gallery-3.jpg", url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80" },
  // nightclub-appearances
  { path: "public/images/services/nightclub-appearances-hero.jpg", url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80" },
  { path: "public/images/services/nightclub-appearances-gallery-1.jpg", url: "https://images.unsplash.com/photo-1511227575238-fb40284ae8a8?auto=format&fit=crop&w=800&q=80" },
  { path: "public/images/services/nightclub-appearances-gallery-2.jpg", url: "https://images.unsplash.com/photo-1571266028243-d220c8c3c1c4?auto=format&fit=crop&w=800&q=80" },
  // business-promotion-adverts
  { path: "public/images/services/business-promotion-adverts-gallery-2.jpg", url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80" },
  // tradeshow-appearance
  { path: "public/images/services/tradeshow-appearance-gallery-1.jpg", url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80" },
  { path: "public/images/services/tradeshow-appearance-gallery-3.jpg", url: "https://images.unsplash.com/photo-1581091226825-a6a2de8a9f55?auto=format&fit=crop&w=800&q=80" },
  // corporate-events
  { path: "public/images/services/corporate-events-gallery-1.jpg", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" },
];

async function downloadImage(url, filepath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(filepath, buf);
    console.log(`  OK  ${filepath}`);
    return true;
  } catch (err) {
    console.error(`  FAIL ${filepath} — ${err.message}`);
    return false;
  }
}

async function main() {
  let ok = 0;
  let fail = 0;
  console.log("\n=== Replacing failed images ===");
  for (const item of REPLACEMENTS) {
    const success = await downloadImage(item.url, item.path);
    if (success) { ok++; } else { fail++; }
  }
  console.log(`\n=== Done: ${ok} downloaded, ${fail} failed ===`);
}

main().catch(console.error);
