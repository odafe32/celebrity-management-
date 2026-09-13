// Retry failed celebrity downloads with longer delays
import fs from "node:fs/promises";
import dns from "node:dns";
import { join } from "node:path";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const DEST_DIR = "public/images/celebrities";
const WIKI_REST = "https://en.wikipedia.org/api/rest_v1/page/summary";

// Celebrities that failed due to rate limiting (no image downloaded)
const RETRY = [
  "Ludwig Ahgren",
  "Giveon",
  "Brent Faiyaz",
  "Summer Walker",
  "Nicki Minaj",
  "Jack Harlow",
  "Jorja Smith",
  "Ella Mai",
  "Normani",
  "Ryan Castro",
  "Jacob Elordi",
  "Timothée Chalamet",
  "Tom Blyth",
  "Josh O'Connor",
  "Oscar Isaac",
  "Wagner Moura",
  "Caio Castro",
  "Jonathan Bailey",
  "Simone Ashley",
  "Da'Vine Joy Randolph",
  "Bukayo Saka",
  "Phil Foden",
  "Gavi",
  "Pedri",
  "Ja Morant",
  "Luka Doncic",
  "Max Verstappen",
  "Andrew Schulz",
  "Trevor Noah",
  "Hasan Minhaj",
  "John Mulaney",
  "Bo Burnham",
  "Mark Cuban",
  "Kevin O'Leary",
  "James Clear",
  "JoJo Siwa",
  "Emily Ratajkowski",
  "Shams Charania",
  "Greta Gerwig",
  "Denis Villeneuve",
  "Hasbulla",
  "Adrian Wojnarowski",
];

const WIKI_TITLES = {
  "Ludwig Ahgren": "Ludwig Ahgren",
  "Giveon": "Giveon",
  "Brent Faiyaz": "Brent Faiyaz",
  "Summer Walker": "Summer Walker",
  "Nicki Minaj": "Nicki Minaj",
  "Jack Harlow": "Jack Harlow",
  "Jorja Smith": "Jorja Smith",
  "Ella Mai": "Ella Mai",
  "Normani": "Normani",
  "Ryan Castro": "Ryan Castro (singer)",
  "Jacob Elordi": "Jacob Elordi",
  "Timothée Chalamet": "Timothée Chalamet",
  "Tom Blyth": "Tom Blyth",
  "Josh O'Connor": "Josh O'Connor",
  "Oscar Isaac": "Oscar Isaac",
  "Wagner Moura": "Wagner Moura",
  "Caio Castro": "Caio Castro",
  "Jonathan Bailey": "Jonathan Bailey",
  "Simone Ashley": "Simone Ashley",
  "Da'Vine Joy Randolph": "Da'Vine Joy Randolph",
  "Bukayo Saka": "Bukayo Saka",
  "Phil Foden": "Phil Foden",
  "Gavi": "Gavi (footballer)",
  "Pedri": "Pedri",
  "Ja Morant": "Ja Morant",
  "Luka Doncic": "Luka Dončić",
  "Max Verstappen": "Max Verstappen",
  "Andrew Schulz": "Andrew Schulz",
  "Trevor Noah": "Trevor Noah",
  "Hasan Minhaj": "Hasan Minhaj",
  "John Mulaney": "John Mulaney",
  "Bo Burnham": "Bo Burnham",
  "Mark Cuban": "Mark Cuban",
  "Kevin O'Leary": "Kevin O'Leary",
  "James Clear": "James Clear (author)",
  "JoJo Siwa": "JoJo Siwa",
  "Emily Ratajkowski": "Emily Ratajkowski",
  "Shams Charania": "Shams Charania",
  "Greta Gerwig": "Greta Gerwig",
  "Denis Villeneuve": "Denis Villeneuve",
  "Hasbulla": "Hasbulla Magomedov",
  "Adrian Wojnarowski": "Adrian Wojnarowski",
};

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

  console.log(`Retrying ${RETRY.length} failed celebrities with 5s delays...\n`);

  let added = 0;
  let failed = 0;

  for (let i = 0; i < RETRY.length; i++) {
    const name = RETRY[i];
    const slug = slugify(name);

    if (existingSlugs.has(slug)) {
      console.log(`[${i + 1}/${RETRY.length}] ${name} — already added, skipping`);
      continue;
    }

    const wikiTitle = WIKI_TITLES[name] || name;

    try {
      process.stdout.write(`[${i + 1}/${RETRY.length}] ${name}... `);
      await new Promise((r) => setTimeout(r, 5000));

      const url = `${WIKI_REST}/${encodeURIComponent(wikiTitle)}`;
      const data = await fetchJson(url);
      await new Promise((r) => setTimeout(r, 5000));

      const bio = data.extract || `${name} is a celebrity.`;
      const wikiUrl = data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiTitle)}`;
      const imageUrl = data.originalimage?.source || data.thumbnail?.source;

      if (!imageUrl) {
        console.log("no image found");
        failed++;
        continue;
      }

      const ext = imageUrl.match(/\.(png)$/i) ? ".png" : ".jpg";
      const fileName = `${slug}${ext}`;
      const destPath = join(DEST_DIR, fileName);

      const bytes = await downloadFile(imageUrl, destPath);
      await new Promise((r) => setTimeout(r, 5000));

      // Determine category from existing data or infer
      const category = data.description?.toLowerCase().includes("actor") ? "actors"
        : data.description?.toLowerCase().includes("actress") ? "actress"
        : data.description?.toLowerCase().includes("footballer") ? "athletes"
        : data.description?.toLowerCase().includes("basketball") ? "athletes"
        : data.description?.toLowerCase().includes("driver") ? "athletes"
        : data.description?.toLowerCase().includes("comedian") ? "comedians"
        : data.description?.toLowerCase().includes("model") ? "models"
        : data.description?.toLowerCase().includes("singer") || data.description?.toLowerCase().includes("rapper") || data.description?.toLowerCase().includes("musician") ? "musicians"
        : data.description?.toLowerCase().includes("chef") ? "chefs"
        : data.description?.toLowerCase().includes("director") ? "directors"
        : data.description?.toLowerCase().includes("author") || data.description?.toLowerCase().includes("writer") ? "authors"
        : data.description?.toLowerCase().includes("journalist") ? "journalists"
        : data.description?.toLowerCase().includes("dancer") ? "dancers"
        : data.description?.toLowerCase().includes("dj") || data.description?.toLowerCase().includes("producer") ? "producers"
        : data.description?.toLowerCase().includes("television") || data.description?.toLowerCase().includes("presenter") ? "tv-personality"
        : data.description?.toLowerCase().includes("entrepreneur") || data.description?.toLowerCase().includes("business") ? "entrepreneurs"
        : data.description?.toLowerCase().includes("streamer") || data.description?.toLowerCase().includes("youtuber") || data.description?.toLowerCase().includes("internet") ? "influencers"
        : "actors";

      const profession = data.description || name;
      let birthYear = null;
      const yearMatch = bio.match(/\b(19\d{2}|20[0-2]\d)\b/);
      if (yearMatch) birthYear = parseInt(yearMatch[0]);

      maxSort++;
      celebrities.push({
        id: slug,
        name,
        slug,
        category,
        subCategories: [profession.split(",")[0].trim()],
        nationality: "—",
        profession,
        birthYear,
        wikiTitle,
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
      await new Promise((r) => setTimeout(r, 10000));
    }
  }

  await fs.writeFile(SEED_FILE, JSON.stringify(celebrities, null, 2));
  console.log(`\n=== Summary ===`);
  console.log(`Added: ${added}, Failed: ${failed}`);
  console.log(`Total celebrities: ${celebrities.length}`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
