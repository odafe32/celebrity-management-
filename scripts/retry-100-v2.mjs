// Retry failed celebrities using Wikipedia API (imageinfo) with longer delays
import fs from "node:fs/promises";
import dns from "node:dns";
import { join } from "node:path";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const DEST_DIR = "public/images/celebrities";
const WIKI_API = "https://en.wikipedia.org/w/api.php";

const RETRY = [
  { name: "Ludwig Ahgren", wiki: "Ludwig Ahgren", cat: "influencers" },
  { name: "Giveon", wiki: "Giveon", cat: "musicians" },
  { name: "Brent Faiyaz", wiki: "Brent Faiyaz", cat: "musicians" },
  { name: "Summer Walker", wiki: "Summer Walker", cat: "musicians" },
  { name: "Nicki Minaj", wiki: "Nicki Minaj", cat: "musicians" },
  { name: "Jack Harlow", wiki: "Jack Harlow", cat: "musicians" },
  { name: "Jorja Smith", wiki: "Jorja Smith", cat: "musicians" },
  { name: "Ella Mai", wiki: "Ella Mai", cat: "musicians" },
  { name: "Normani", wiki: "Normani", cat: "musicians" },
  { name: "Jacob Elordi", wiki: "Jacob Elordi", cat: "actors" },
  { name: "Timothée Chalamet", wiki: "Timothée Chalamet", cat: "actors" },
  { name: "Tom Blyth", wiki: "Tom Blyth", cat: "actors" },
  { name: "Josh O'Connor", wiki: "Josh O'Connor", cat: "actors" },
  { name: "Oscar Isaac", wiki: "Oscar Isaac", cat: "actors" },
  { name: "Wagner Moura", wiki: "Wagner Moura", cat: "actors" },
  { name: "Caio Castro", wiki: "Caio Castro", cat: "actors" },
  { name: "Jonathan Bailey", wiki: "Jonathan Bailey", cat: "actors" },
  { name: "Simone Ashley", wiki: "Simone Ashley", cat: "actress" },
  { name: "Da'Vine Joy Randolph", wiki: "Da'Vine Joy Randolph", cat: "actress" },
  { name: "Bukayo Saka", wiki: "Bukayo Saka", cat: "athletes" },
  { name: "Phil Foden", wiki: "Phil Foden", cat: "athletes" },
  { name: "Gavi", wiki: "Gavi (footballer)", cat: "athletes" },
  { name: "Pedri", wiki: "Pedri", cat: "athletes" },
  { name: "Ja Morant", wiki: "Ja Morant", cat: "athletes" },
  { name: "Luka Doncic", wiki: "Luka Dončić", cat: "athletes" },
  { name: "Max Verstappen", wiki: "Max Verstappen", cat: "athletes" },
  { name: "Andrew Schulz", wiki: "Andrew Schulz", cat: "comedians" },
  { name: "Trevor Noah", wiki: "Trevor Noah", cat: "comedians" },
  { name: "Hasan Minhaj", wiki: "Hasan Minhaj", cat: "comedians" },
  { name: "John Mulaney", wiki: "John Mulaney", cat: "comedians" },
  { name: "Bo Burnham", wiki: "Bo Burnham", cat: "comedians" },
  { name: "Mark Cuban", wiki: "Mark Cuban", cat: "entrepreneurs" },
  { name: "Kevin O'Leary", wiki: "Kevin O'Leary", cat: "entrepreneurs" },
  { name: "James Clear", wiki: "James Clear (author)", cat: "authors" },
  { name: "JoJo Siwa", wiki: "JoJo Siwa", cat: "dancers" },
  { name: "Emily Ratajkowski", wiki: "Emily Ratajkowski", cat: "models" },
  { name: "Shams Charania", wiki: "Shams Charania", cat: "journalists" },
  { name: "Greta Gerwig", wiki: "Greta Gerwig", cat: "directors" },
  { name: "Denis Villeneuve", wiki: "Denis Villeneuve", cat: "directors" },
  { name: "Hasbulla", wiki: "Hasbulla Magomedov", cat: "influencers" },
  { name: "Adrian Wojnarowski", wiki: "Adrian Wojnarowski", cat: "journalists" },
];

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

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

async function main() {
  const celebrities = JSON.parse(await fs.readFile(SEED_FILE, "utf-8"));
  const existingSlugs = new Set(celebrities.map((c) => c.slug));
  let maxSort = Math.max(...celebrities.map((c) => c.sortOrder || 0));

  console.log(`Retrying ${RETRY.length} failed celebrities with 10s delays...\n`);

  let added = 0;
  let failed = 0;

  for (let i = 0; i < RETRY.length; i++) {
    const { name, wiki, cat } = RETRY[i];
    const slug = slugify(name);

    if (existingSlugs.has(slug)) {
      console.log(`[${i + 1}/${RETRY.length}] ${name} — already added`);
      continue;
    }

    try {
      process.stdout.write(`[${i + 1}/${RETRY.length}] ${name}... `);
      await new Promise((r) => setTimeout(r, 10000));

      // Use Wikipedia API to get page image
      const apiUrl = `${WIKI_API}?action=query&format=json&titles=${encodeURIComponent(wiki)}&prop=pageimages|extracts&exintro=1&explaintext=1&piprop=original&exsentences=3`;
      const data = await fetchJson(apiUrl);
      await new Promise((r) => setTimeout(r, 10000));

      const page = Object.values(data.query.pages)[0];
      if (!page || page.missing !== undefined) {
        console.log("page not found");
        failed++;
        continue;
      }

      const bio = page.extract || `${name} is a celebrity.`;
      const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(wiki)}`;
      const imageUrl = page.original?.source;

      if (!imageUrl) {
        console.log("no image found");
        failed++;
        continue;
      }

      const ext = imageUrl.match(/\.(png)$/i) ? ".png" : ".jpg";
      const fileName = `${slug}${ext}`;
      const destPath = join(DEST_DIR, fileName);

      const bytes = await downloadFile(imageUrl, destPath);
      await new Promise((r) => setTimeout(r, 10000));

      const profession = cat === "actors" ? "Actor" : cat === "actress" ? "Actress" : cat === "musicians" ? "Musician" : cat === "athletes" ? "Athlete" : cat === "comedians" ? "Comedian" : cat === "models" ? "Model" : cat === "entrepreneurs" ? "Entrepreneur" : cat === "authors" ? "Author" : cat === "directors" ? "Director" : cat === "journalists" ? "Journalist" : cat === "dancers" ? "Dancer" : cat === "influencers" ? "Influencer" : "Celebrity";

      let birthYear = null;
      const yearMatch = bio.match(/\b(19\d{2}|20[0-2]\d)\b/);
      if (yearMatch) birthYear = parseInt(yearMatch[0]);

      maxSort++;
      celebrities.push({
        id: slug,
        name,
        slug,
        category: cat,
        subCategories: [profession],
        nationality: "—",
        profession,
        birthYear,
        wikiTitle: wiki,
        bio,
        wikiUrl,
        photoUrl: `/images/celebrities/${fileName}`,
        status: "published",
        featured: false,
        basePrice: null,
        currency: "USD",
        sortOrder: maxSort,
      });

      existingSlugs.add(slug);
      added++;
      console.log(`OK (${Math.round(bytes / 1024)} KB)`);
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      failed++;
      await new Promise((r) => setTimeout(r, 15000));
    }
  }

  await fs.writeFile(SEED_FILE, JSON.stringify(celebrities, null, 2));
  console.log(`\n=== Summary ===`);
  console.log(`Added: ${added}, Failed: ${failed}`);
  console.log(`Total celebrities: ${celebrities.length}`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
