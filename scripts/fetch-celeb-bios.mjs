// Fetches bios and photo URLs from Wikipedia REST API for featured celebrities.
// Usage: node scripts/fetch-celeb-bios.mjs
// Wikipedia images are CC-BY-SA licensed — free to use with attribution.

import fs from "fs";
import path from "path";

const OUTPUT = path.join(process.cwd(), "data", "celebrity-photos.json");

// Featured celebrities to fetch — matches the CELEBRITIES array in lib/celebrities.ts
const CELEBS = [
  { name: "Tom Cruise", wikiTitle: "Tom_Cruise" },
  { name: "Beyoncé", wikiTitle: "Beyoncé" },
  { name: "LeBron James", wikiTitle: "LeBron_James" },
  { name: "Brad Pitt", wikiTitle: "Brad_Pitt" },
  { name: "Rihanna", wikiTitle: "Rihanna" },
  { name: "Dwayne Johnson", wikiTitle: "Dwayne_Johnson" },
  { name: "Taylor Swift", wikiTitle: "Taylor_Swift" },
  { name: "Kevin Hart", wikiTitle: "Kevin_Hart" },
  { name: "Keanu Reeves", wikiTitle: "Keanu_Reeves" },
  { name: "Drake", wikiTitle: "Drake_(musician)" },
  { name: "Scarlett Johansson", wikiTitle: "Scarlett_Johansson" },
  { name: "Chris Hemsworth", wikiTitle: "Chris_Hemsworth" },
];

async function fetchSummary(wikiTitle) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      name: data.title || wikiTitle.replace(/_/g, " "),
      bio: data.extract || "",
      wikiUrl: data.content_urls?.desktop?.page || "",
      photoUrl: data.thumbnail?.source || data.originalimage?.source || "",
      photoWidth: data.thumbnail?.width || data.originalimage?.width || 0,
      photoHeight: data.thumbnail?.height || data.originalimage?.height || 0,
    };
  } catch (err) {
    console.error(`  X Failed: ${wikiTitle} - ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(`Fetching photos for ${CELEBS.length} celebrities from Wikipedia...\n`);

  const results = {};
  for (let i = 0; i < CELEBS.length; i++) {
    const celeb = CELEBS[i];
    process.stdout.write(`[${i + 1}/${CELEBS.length}] ${celeb.name}... `);
    const info = await fetchSummary(celeb.wikiTitle);
    if (info && info.photoUrl) {
      results[celeb.name] = {
        photoUrl: info.photoUrl,
        bio: info.bio,
        wikiUrl: info.wikiUrl,
        photoWidth: info.photoWidth,
        photoHeight: info.photoHeight,
      };
      console.log("OK");
    } else {
      console.log("(no photo found)");
    }
    // Be nice to Wikipedia - 200ms delay
    await new Promise((r) => setTimeout(r, 200));
  }

  // Ensure data directory exists
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  fs.writeFileSync(OUTPUT, JSON.stringify(results, null, 2));
  console.log(`\nDone! ${Object.keys(results).length} celebrities with photos written to ${OUTPUT}`);
}

main().catch(console.error);
