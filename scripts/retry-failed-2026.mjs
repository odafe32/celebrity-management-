// Retry: Add the 8 celebrities that failed due to network issues
import fs from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const GALLERY_FILE = "data/celebrity-galleries.json";
const DEST_DIR = "public/images/celebrities";
const WIKI_REST = "https://en.wikipedia.org/api/rest_v1/page/summary";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

const RETRY_CELEBS = [
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

async function getWikiInfo(wikiTitle) {
  const url = `${WIKI_REST}/${encodeURIComponent(wikiTitle)}`;
  const data = await fetchJson(url);
  return {
    bio: data.extract || "",
    wikiUrl: data.content_urls?.desktop?.page || "",
    thumbUrl: data.thumbnail?.source || data.originalimage?.source || null,
  };
}

async function searchCommonsGallery(name, limit = 4) {
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

  console.log(`Retrying ${RETRY_CELEBS.length} failed celebrities...\n`);

  let added = 0;
  let failed = 0;

  for (let i = 0; i < RETRY_CELEBS.length; i++) {
    const c = RETRY_CELEBS[i];
    if (existingSlugs.has(c.slug)) {
      console.log(`[${i + 1}/${RETRY_CELEBS.length}] ${c.name} — already exists, skipping`);
      continue;
    }

    try {
      process.stdout.write(`[${i + 1}/${RETRY_CELEBS.length}] ${c.name}... `);
      const info = await getWikiInfo(c.wikiTitle);
      await new Promise((r) => setTimeout(r, 3000));

      let photoUrl = "";
      if (info.thumbUrl) {
        const ext = info.thumbUrl.match(/\.(png)$/i) ? ".png" : ".jpg";
        const destFile = path.join(DEST_DIR, `${c.slug}${ext}`);
        await downloadFile(info.thumbUrl, destFile);
        photoUrl = `/images/celebrities/${c.slug}${ext}`;
        await new Promise((r) => setTimeout(r, 3000));
      }

      const galleryCandidates = await searchCommonsGallery(c.name, 3);
      await new Promise((r) => setTimeout(r, 3000));

      const galleryPaths = [];
      const maxGallery = Math.min(3, galleryCandidates.length);
      for (let g = 0; g < maxGallery; g++) {
        try {
          const ext = galleryCandidates[g].match(/\.(png)$/i) ? ".png" : ".jpg";
          const galleryFile = `${c.slug}-gallery-${g + 1}${ext}`;
          const destPath = path.join(DEST_DIR, galleryFile);
          await downloadFile(galleryCandidates[g], destPath);
          galleryPaths.push(`/images/celebrities/${galleryFile}`);
          await new Promise((r) => setTimeout(r, 3000));
        } catch {
          // skip
        }
      }

      celebrities.push({
        id: c.id, name: c.name, slug: c.slug, category: c.category,
        subCategories: c.subCategories, nationality: c.nationality,
        profession: c.profession, birthYear: c.birthYear, wikiTitle: c.wikiTitle,
        bio: info.bio, wikiUrl: info.wikiUrl, photoUrl,
        status: "published", featured: c.featured, basePrice: null,
        currency: "USD", sortOrder: startSort++,
      });

      if (galleryPaths.length > 0) galleryData[c.slug] = galleryPaths;
      added++;
      console.log(`OK (photo: ${photoUrl ? "yes" : "no"}, gallery: ${galleryPaths.length})`);
    } catch (err) {
      console.error(`FAIL: ${err.message}`);
      failed++;
      await new Promise((r) => setTimeout(r, 8000));
    }
  }

  await fs.writeFile(SEED_FILE, JSON.stringify(celebrities, null, 2));
  await fs.writeFile(GALLERY_FILE, JSON.stringify(galleryData, null, 2));
  console.log(`\n=== Summary ===`);
  console.log(`Added: ${added}, Failed: ${failed}`);
  console.log(`Total celebrities now: ${celebrities.length}`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
