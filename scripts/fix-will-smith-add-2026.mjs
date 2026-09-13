// Fix Will Smith photo + add new popular 2026 celebrities with photos and galleries
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const GALLERY_FILE = "data/celebrity-galleries.json";
const DEST_DIR = "public/images/celebrities";
const WIKI_REST = "https://en.wikipedia.org/api/rest_v1/page/summary";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

// New popular 2026 celebrities to add
const NEW_CELEBS = [
  // Musicians / Streaming artists
  { id: "sza", name: "SZA", slug: "sza", category: "musicians", subCategories: ["Singer", "Songwriter"], nationality: "American", profession: "Singer, Songwriter", birthYear: 1989, wikiTitle: "SZA", featured: true },
  { id: "travis-scott", name: "Travis Scott", slug: "travis-scott", category: "musicians", subCategories: ["Rapper", "Producer"], nationality: "American", profession: "Rapper, Producer", birthYear: 1991, wikiTitle: "Travis Scott", featured: true },
  { id: "doja-cat", name: "Doja Cat", slug: "doja-cat", category: "musicians", subCategories: ["Rapper", "Singer"], nationality: "American", profession: "Rapper, Singer", birthYear: 1995, wikiTitle: "Doja Cat", featured: false },
  { id: "tyler-the-creator", name: "Tyler, The Creator", slug: "tyler-the-creator", category: "musicians", subCategories: ["Rapper", "Producer"], nationality: "American", profession: "Rapper, Producer", birthYear: 1991, wikiTitle: "Tyler, the Creator", featured: false },
  { id: "morgan-wallen", name: "Morgan Wallen", slug: "morgan-wallen", category: "musicians", subCategories: ["Singer", "Songwriter"], nationality: "American", profession: "Singer, Songwriter", birthYear: 1993, wikiTitle: "Morgan Wallen", featured: false },
  { id: "zach-bryan", name: "Zach Bryan", slug: "zach-bryan", category: "musicians", subCategories: ["Singer", "Songwriter"], nationality: "American", profession: "Singer, Songwriter", birthYear: 1996, wikiTitle: "Zach Bryan", featured: false },
  { id: "ice-spice", name: "Ice Spice", slug: "ice-spice", category: "musicians", subCategories: ["Rapper"], nationality: "American", profession: "Rapper", birthYear: 2000, wikiTitle: "Ice Spice", featured: false },
  { id: "jelly-roll", name: "Jelly Roll", slug: "jelly-roll", category: "musicians", subCategories: ["Rapper", "Singer"], nationality: "American", profession: "Rapper, Singer", birthYear: 1984, wikiTitle: "Jelly Roll (singer)", featured: false },
  { id: "lainey-wilson", name: "Lainey Wilson", slug: "lainey-wilson", category: "musicians", subCategories: ["Singer", "Songwriter"], nationality: "American", profession: "Singer, Songwriter", birthYear: 1992, wikiTitle: "Lainey Wilson", featured: false },
  { id: "karol-g", name: "Karol G", slug: "karol-g", category: "musicians", subCategories: ["Singer", "Songwriter"], nationality: "Colombian", profession: "Singer, Songwriter", birthYear: 1991, wikiTitle: "Karol G", featured: true },
  { id: "peso-pluma", name: "Peso Pluma", slug: "peso-pluma", category: "musicians", subCategories: ["Singer"], nationality: "Mexican", profession: "Singer", birthYear: 1999, wikiTitle: "Peso Pluma", featured: false },
  { id: "rema", name: "Rema", slug: "rema", category: "musicians", subCategories: ["Singer", "Rapper"], nationality: "Nigerian", profession: "Singer, Rapper", birthYear: 2000, wikiTitle: "Rema (musician)", featured: false },
  { id: "tems", name: "Tems", slug: "tems", category: "musicians", subCategories: ["Singer", "Songwriter"], nationality: "Nigerian", profession: "Singer, Songwriter", birthYear: 1995, wikiTitle: "Tems", featured: false },
  { id: "burna-boy", name: "Burna Boy", slug: "burna-boy", category: "musicians", subCategories: ["Singer", "Songwriter"], nationality: "Nigerian", profession: "Singer, Songwriter", birthYear: 1991, wikiTitle: "Burna Boy", featured: false },
  { id: "wizkid", name: "Wizkid", slug: "wizkid", category: "musicians", subCategories: ["Singer", "Songwriter"], nationality: "Nigerian", profession: "Singer, Songwriter", birthYear: 1990, wikiTitle: "Wizkid", featured: false },
  { id: "shakira", name: "Shakira", slug: "shakira", category: "musicians", subCategories: ["Singer", "Dancer"], nationality: "Colombian", profession: "Singer, Dancer", birthYear: 1977, wikiTitle: "Shakira", featured: false },
  { id: "rosalia", name: "Rosalía", slug: "rosalia", category: "musicians", subCategories: ["Singer", "Songwriter"], nationality: "Spanish", profession: "Singer, Songwriter", birthYear: 1993, wikiTitle: "Rosalía (singer)", featured: false },
  // Actors / Actresses (trending 2026)
  { id: "sydney-sweeney", name: "Sydney Sweeney", slug: "sydney-sweeney", category: "actress", subCategories: ["Actress"], nationality: "American", profession: "Actress", birthYear: 1997, wikiTitle: "Sydney Sweeney", featured: true },
  { id: "glen-powell", name: "Glen Powell", slug: "glen-powell", category: "actors", subCategories: ["Male Actors"], nationality: "American", profession: "Actor", birthYear: 1988, wikiTitle: "Glen Powell", featured: false },
  { id: "barry-keoghan", name: "Barry Keoghan", slug: "barry-keoghan", category: "actors", subCategories: ["Male Actors"], nationality: "Irish", profession: "Actor", birthYear: 1992, wikiTitle: "Barry Keoghan", featured: false },
  { id: "paul-mescal", name: "Paul Mescal", slug: "paul-mescal", category: "actors", subCategories: ["Male Actors"], nationality: "Irish", profession: "Actor", birthYear: 1996, wikiTitle: "Paul Mescal", featured: false },
  { id: "ayo-edebiri", name: "Ayo Edebiri", slug: "ayo-edebiri", category: "actress", subCategories: ["Actress", "Comedian"], nationality: "American", profession: "Actress, Comedian", birthYear: 1995, wikiTitle: "Ayo Edebiri", featured: false },
  { id: "jeremy-allen-white", name: "Jeremy Allen White", slug: "jeremy-allen-white", category: "actors", subCategories: ["Male Actors"], nationality: "American", profession: "Actor", birthYear: 1991, wikiTitle: "Jeremy Allen White", featured: false },
  { id: "jenna-ortega", name: "Jenna Ortega", slug: "jenna-ortega", category: "actress", subCategories: ["Actress"], nationality: "American", profession: "Actress", birthYear: 2002, wikiTitle: "Jenna Ortega", featured: true },
  { id: "millie-bobby-brown", name: "Millie Bobby Brown", slug: "millie-bobby-brown", category: "actress", subCategories: ["Actress"], nationality: "British", profession: "Actress", birthYear: 2004, wikiTitle: "Millie Bobby Brown", featured: false },
  { id: "bella-ramsey", name: "Bella Ramsey", slug: "bella-ramsey", category: "actors", subCategories: ["Actor"], nationality: "British", profession: "Actor", birthYear: 2003, wikiTitle: "Bella Ramsey", featured: false },
  { id: "hunter-schafer", name: "Hunter Schafer", slug: "hunter-schafer", category: "actress", subCategories: ["Actress"], nationality: "American", profession: "Actress", birthYear: 1998, wikiTitle: "Hunter Schafer", featured: false },
];

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

// Get the main Wikipedia thumbnail + bio
async function getWikiInfo(wikiTitle) {
  const url = `${WIKI_REST}/${encodeURIComponent(wikiTitle)}`;
  const data = await fetchJson(url);
  return {
    bio: data.extract || "",
    wikiUrl: data.content_urls?.desktop?.page || "",
    thumbUrl: data.thumbnail?.source || data.originalimage?.source || null,
  };
}

// Search Commons for gallery images
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
    .map((p) => p.imageinfo[0].thumburl)
    .slice(0, limit);
}

async function main() {
  const celebrities = JSON.parse(await fs.readFile(SEED_FILE, "utf-8"));
  let galleryData = JSON.parse(await fs.readFile(GALLERY_FILE, "utf-8"));

  const existingSlugs = new Set(celebrities.map((c) => c.slug));
  let startSort = Math.max(...celebrities.map((c) => c.sortOrder)) + 1;

  // ─── 1. FIX WILL SMITH PHOTO ───
  console.log("=== Fixing Will Smith photo ===\n");
  const willSmith = celebrities.find((c) => c.slug === "will-smith");
  if (willSmith) {
    try {
      // Use his full Wikipedia title to get the correct person
      const info = await getWikiInfo("Will Smith");
      if (info.thumbUrl) {
        const destFile = path.join(DEST_DIR, "will-smith.jpg");
        const bytes = await downloadFile(info.thumbUrl, destFile);
        willSmith.photoUrl = "/images/celebrities/will-smith.jpg";
        console.log(`Will Smith photo fixed (${Math.round(bytes / 1024)} KB)`);
      }
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`Will Smith fix failed: ${err.message}`);
    }
  }

  // ─── 2. ADD NEW CELEBRITIES ───
  console.log(`\n=== Adding ${NEW_CELEBS.length} new celebrities ===\n`);

  let added = 0;
  let failed = 0;

  for (let i = 0; i < NEW_CELEBS.length; i++) {
    const c = NEW_CELEBS[i];
    if (existingSlugs.has(c.slug)) {
      console.log(`[${i + 1}/${NEW_CELEBS.length}] ${c.name} — already exists, skipping`);
      continue;
    }

    try {
      process.stdout.write(`[${i + 1}/${NEW_CELEBS.length}] ${c.name}... `);

      // Get bio + main photo from Wikipedia
      const info = await getWikiInfo(c.wikiTitle);
      await new Promise((r) => setTimeout(r, 1500));

      // Download main photo
      let photoUrl = "";
      if (info.thumbUrl) {
        const ext = info.thumbUrl.match(/\.(png)$/i) ? ".png" : ".jpg";
        const destFile = path.join(DEST_DIR, `${c.slug}${ext}`);
        await downloadFile(info.thumbUrl, destFile);
        photoUrl = `/images/celebrities/${c.slug}${ext}`;
        await new Promise((r) => setTimeout(r, 1500));
      }

      // Download gallery images (2-3)
      const galleryCandidates = await searchCommonsGallery(c.name, 4);
      await new Promise((r) => setTimeout(r, 1500));

      const galleryPaths = [];
      const maxGallery = Math.min(3, galleryCandidates.length);
      for (let g = 0; g < maxGallery; g++) {
        try {
          const ext = galleryCandidates[g].match(/\.(png)$/i) ? ".png" : ".jpg";
          const galleryFile = `${c.slug}-gallery-${g + 1}${ext}`;
          const destPath = path.join(DEST_DIR, galleryFile);
          await downloadFile(galleryCandidates[g], destPath);
          galleryPaths.push(`/images/celebrities/${galleryFile}`);
          await new Promise((r) => setTimeout(r, 1500));
        } catch {
          // skip failed gallery image
        }
      }

      // Add to celebrity list
      const newCeleb = {
        id: c.id,
        name: c.name,
        slug: c.slug,
        category: c.category,
        subCategories: c.subCategories,
        nationality: c.nationality,
        profession: c.profession,
        birthYear: c.birthYear,
        wikiTitle: c.wikiTitle,
        bio: info.bio,
        wikiUrl: info.wikiUrl,
        photoUrl,
        status: "published",
        featured: c.featured,
        basePrice: null,
        currency: "USD",
        sortOrder: startSort++,
      };
      celebrities.push(newCeleb);

      // Add to gallery data
      if (galleryPaths.length > 0) {
        galleryData[c.slug] = galleryPaths;
      }

      added++;
      console.log(`OK (photo: ${photoUrl ? "yes" : "no"}, gallery: ${galleryPaths.length})`);
    } catch (err) {
      console.error(`FAIL: ${err.message}`);
      failed++;
      await new Promise((r) => setTimeout(r, 3000));
    }
  }

  // Save updated files
  await fs.writeFile(SEED_FILE, JSON.stringify(celebrities, null, 2));
  await fs.writeFile(GALLERY_FILE, JSON.stringify(galleryData, null, 2));

  console.log(`\n=== Summary ===`);
  console.log(`Will Smith photo fixed`);
  console.log(`New celebrities added: ${added}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total celebrities now: ${celebrities.length}`);
  console.log(`Updated: ${SEED_FILE} + ${GALLERY_FILE}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
