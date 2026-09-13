// Add 100 more popular celebrities (streamers, influencers, musicians, actors, athletes)
// including viral/trending figures like IShowSpeed, Kai Cenat, etc.
import fs from "node:fs/promises";
import dns from "node:dns";
import { join } from "node:path";

dns.setDefaultResultOrder("ipv4first");

const SEED_FILE = "data/celebrities-seed-100.json";
const DEST_DIR = "public/images/celebrities";
const WIKI_REST = "https://en.wikipedia.org/api/rest_v1/page/summary";

// 100 popular celebrities across categories
const NEW_CELEBS = [
  // Streamers / Influencers / Content Creators
  { name: "IShowSpeed", wikiTitle: "IShowSpeed", category: "influencers", subCategories: ["Streamer", "YouTuber"], profession: "Streamer, YouTuber", nationality: "American" },
  { name: "Kai Cenat", wikiTitle: "Kai Cenat", category: "influencers", subCategories: ["Streamer", "YouTuber"], profession: "Streamer, YouTuber", nationality: "American" },
  { name: "xQc", wikiTitle: "xQc", category: "influencers", subCategories: ["Streamer", "Gamer"], profession: "Streamer, Gamer", nationality: "Canadian" },
  { name: "Pokimane", wikiTitle: "Pokimane", category: "influencers", subCategories: ["Streamer", "YouTuber"], profession: "Streamer, YouTuber", nationality: "Canadian-Moroccan" },
  { name: "Asmongold", wikiTitle: "Asmongold", category: "influencers", subCategories: ["Streamer", "Gamer"], profession: "Streamer, Gamer", nationality: "American" },
  { name: "Ludwig Ahgren", wikiTitle: "Ludwig Ahgren", category: "influencers", subCategories: ["Streamer", "YouTuber"], profession: "Streamer, YouTuber", nationality: "American" },
  { name: "Ninja", wikiTitle: "Ninja (gamer)", category: "influencers", subCategories: ["Streamer", "Gamer"], profession: "Streamer, Gamer", nationality: "American" },
  { name: "Valkyrae", wikiTitle: "Valkyrae", category: "influencers", subCategories: ["Streamer", "Gamer"], profession: "Streamer, Gamer", nationality: "American" },
  { name: "Hasbulla", wikiTitle: "Hasbulla Magomedov", category: "influencers", subCategories: ["Internet Personality"], profession: "Internet Personality", nationality: "Russian" },
  { name: "Khaby Lame", wikiTitle: "Khaby Lame", category: "influencers", subCategories: ["TikToker", "Influencer"], profession: "TikToker, Influencer", nationality: "Italian-Senegalese" },

  // Musicians / Rappers / Artists (popular 2024-2026)
  { name: "Playboi Carti", wikiTitle: "Playboi Carti", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "Lil Uzi Vert", wikiTitle: "Lil Uzi Vert", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "Future", wikiTitle: "Future (rapper)", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "21 Savage", wikiTitle: "21 Savage", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "British-American" },
  { name: "Gunna", wikiTitle: "Gunna (rapper)", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "Don Toliver", wikiTitle: "Don Toliver", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "American" },
  { name: "Baby Keem", wikiTitle: "Baby Keem", category: "musicians", subCategories: ["Rapper", "Producer"], profession: "Rapper, Producer", nationality: "American" },
  { name: "Lil Baby", wikiTitle: "Lil Baby", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "Lil Durk", wikiTitle: "Lil Durk", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "NBA YoungBoy", wikiTitle: "YoungBoy Never Broke Again", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "Roddy Ricch", wikiTitle: "Roddy Ricch", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "Giveon", wikiTitle: "Giveon", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "American" },
  { name: "Brent Faiyaz", wikiTitle: "Brent Faiyaz", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "American" },
  { name: "Summer Walker", wikiTitle: "Summer Walker", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "American" },
  { name: "SZA", wikiTitle: "SZA", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "American" },
  { name: "Frank Ocean", wikiTitle: "Frank Ocean", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "American" },
  { name: "Tyler, The Creator", wikiTitle: "Tyler, the Creator", category: "musicians", subCategories: ["Rapper", "Producer"], profession: "Rapper, Producer", nationality: "American" },
  { name: "Post Malone", wikiTitle: "Post Malone", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "American" },
  { name: "Megan Thee Stallion", wikiTitle: "Megan Thee Stallion", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "Cardi B", wikiTitle: "Cardi B", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "Nicki Minaj", wikiTitle: "Nicki Minaj", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "Trinidadian-American" },
  { name: "Lil Nas X", wikiTitle: "Lil Nas X", category: "musicians", subCategories: ["Rapper", "Singer"], profession: "Rapper, Singer", nationality: "American" },
  { name: "Jack Harlow", wikiTitle: "Jack Harlow", category: "musicians", subCategories: ["Rapper", "Songwriter"], profession: "Rapper, Songwriter", nationality: "American" },
  { name: "Lizzo", wikiTitle: "Lizzo", category: "musicians", subCategories: ["Singer", "Flutist"], profession: "Singer, Flutist", nationality: "American" },
  { name: "H.E.R.", wikiTitle: "H.E.R.", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "American" },
  { name: "Jorja Smith", wikiTitle: "Jorja Smith", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "British" },
  { name: "Ella Mai", wikiTitle: "Ella Mai", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "British" },
  { name: "Normani", wikiTitle: "Normani", category: "musicians", subCategories: ["Singer", "Dancer"], profession: "Singer, Dancer", nationality: "American" },
  { name: "Anitta", wikiTitle: "Anitta (singer)", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "Brazilian" },
  { name: "Rauw Alejandro", wikiTitle: "Rauw Alejandro", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "Puerto Rican" },
  { name: "Feid", wikiTitle: "Feid", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "Colombian" },
  { name: "Ryan Castro", wikiTitle: "Ryan Castro (singer)", category: "musicians", subCategories: ["Singer", "Songwriter"], profession: "Singer, Songwriter", nationality: "Colombian" },

  // Actors / Actresses (popular 2024-2026)
  { name: "Jacob Elordi", wikiTitle: "Jacob Elordi", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "Australian" },
  { name: "Tom Holland", wikiTitle: "Tom Holland", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "British" },
  { name: "Timothée Chalamet", wikiTitle: "Timothée Chalamet", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "American" },
  { name: "Tom Blyth", wikiTitle: "Tom Blyth", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "British" },
  { name: "Mike Faist", wikiTitle: "Mike Faist", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "American" },
  { name: "Josh O'Connor", wikiTitle: "Josh O'Connor", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "British" },
  { name: "Andrew Garfield", wikiTitle: "Andrew Garfield", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "British-American" },
  { name: "Oscar Isaac", wikiTitle: "Oscar Isaac", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "Guatemalan-American" },
  { name: "Pedro Pascal", wikiTitle: "Pedro Pascal", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "Chilean-American" },
  { name: "Wagner Moura", wikiTitle: "Wagner Moura", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "Brazilian" },
  { name: "Caio Castro", wikiTitle: "Caio Castro", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "Brazilian" },
  { name: "Rege-Jean Page", wikiTitle: "Regé-Jean Page", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "British-Zimbabwean" },
  { name: "Jonathan Bailey", wikiTitle: "Jonathan Bailey", category: "actors", subCategories: ["Actor"], profession: "Actor", nationality: "British" },
  { name: "Simone Ashley", wikiTitle: "Simone Ashley", category: "actress", subCategories: ["Actress"], profession: "Actress", nationality: "British" },
  { name: "Phoebe Dynevor", wikiTitle: "Phoebe Dynevor", category: "actress", subCategories: ["Actress"], profession: "Actress", nationality: "British" },
  { name: "Anya Taylor-Joy", wikiTitle: "Anya Taylor-Joy", category: "actress", subCategories: ["Actress"], profession: "Actress", nationality: "American-British" },
  { name: "Rachel Zegler", wikiTitle: "Rachel Zegler", category: "actress", subCategories: ["Actress"], profession: "Actress", nationality: "American" },
  { name: "Ariana DeBose", wikiTitle: "Ariana DeBose", category: "actress", subCategories: ["Actress"], profession: "Actress", nationality: "American" },
  { name: "Da'Vine Joy Randolph", wikiTitle: "Da'Vine Joy Randolph", category: "actress", subCategories: ["Actress"], profession: "Actress", nationality: "American" },
  { name: "Danielle Deadwyler", wikiTitle: "Danielle Deadwyler", category: "actress", subCategories: ["Actress"], profession: "Actress", nationality: "American" },

  // Athletes
  { name: "Jude Bellingham", wikiTitle: "Jude Bellingham", category: "athletes", subCategories: ["Footballer"], profession: "Footballer", nationality: "British" },
  { name: "Bukayo Saka", wikiTitle: "Bukayo Saka", category: "athletes", subCategories: ["Footballer"], profession: "Footballer", nationality: "British" },
  { name: "Phil Foden", wikiTitle: "Phil Foden", category: "athletes", subCategories: ["Footballer"], profession: "Footballer", nationality: "British" },
  { name: "Vinicius Junior", wikiTitle: "Vinícius Júnior", category: "athletes", subCategories: ["Footballer"], profession: "Footballer", nationality: "Brazilian" },
  { name: "Jude Bellingham", wikiTitle: "Jude Bellingham", category: "athletes", subCategories: ["Footballer"], profession: "Footballer", nationality: "British" },
  { name: "Erling Haaland", wikiTitle: "Erling Haaland", category: "athletes", subCategories: ["Footballer"], profession: "Footballer", nationality: "Norwegian" },
  { name: "Kylian Mbappé", wikiTitle: "Kylian Mbappé", category: "athletes", subCategories: ["Footballer"], profession: "Footballer", nationality: "French" },
  { name: "Lamine Yamal", wikiTitle: "Lamine Yamal", category: "athletes", subCategories: ["Footballer"], profession: "Footballer", nationality: "Spanish" },
  { name: "Gavi", wikiTitle: "Gavi (footballer)", category: "athletes", subCategories: ["Footballer"], profession: "Footballer", nationality: "Spanish" },
  { name: "Pedri", wikiTitle: "Pedri", category: "athletes", subCategories: ["Footballer"], profession: "Footballer", nationality: "Spanish" },
  { name: "Anthony Edwards", wikiTitle: "Anthony Edwards (basketball)", category: "athletes", subCategories: ["Basketball Player"], profession: "Basketball Player", nationality: "American" },
  { name: "Victor Wembanyama", wikiTitle: "Victor Wembanyama", category: "athletes", subCategories: ["Basketball Player"], profession: "Basketball Player", nationality: "French" },
  { name: "Ja Morant", wikiTitle: "Ja Morant", category: "athletes", subCategories: ["Basketball Player"], profession: "Basketball Player", nationality: "American" },
  { name: "Luka Doncic", wikiTitle: "Luka Dončić", category: "athletes", subCategories: ["Basketball Player"], profession: "Basketball Player", nationality: "Slovenian" },
  { name: "Tyreek Hill", wikiTitle: "Tyreek Hill", category: "athletes", subCategories: ["American Football Player"], profession: "American Football Player", nationality: "American" },
  { name: "Travis Kelce", wikiTitle: "Travis Kelce", category: "athletes", subCategories: ["American Football Player"], profession: "American Football Player", nationality: "American" },
  { name: "Patrick Mahomes", wikiTitle: "Patrick Mahomes", category: "athletes", subCategories: ["American Football Player"], profession: "American Football Player", nationality: "American" },
  { name: "Max Verstappen", wikiTitle: "Max Verstappen", category: "athletes", subCategories: ["Racing Driver"], profession: "Racing Driver", nationality: "Dutch" },
  { name: "Charles Leclerc", wikiTitle: "Charles Leclerc", category: "athletes", subCategories: ["Racing Driver"], profession: "Racing Driver", nationality: "Monégasque" },
  { name: "Lando Norris", wikiTitle: "Lando Norris", category: "athletes", subCategories: ["Racing Driver"], profession: "Racing Driver", nationality: "British" },

  // Comedians / TV Personalities
  { name: "Andrew Schulz", wikiTitle: "Andrew Schulz", category: "comedians", subCategories: ["Comedian", "Podcaster"], profession: "Comedian, Podcaster", nationality: "American" },
  { name: "Matt Rife", wikiTitle: "Matt Rife", category: "comedians", subCategories: ["Comedian", "Actor"], profession: "Comedian, Actor", nationality: "American" },
  { name: "Trevor Noah", wikiTitle: "Trevor Noah", category: "comedians", subCategories: ["Comedian", "TV Host"], profession: "Comedian, TV Host", nationality: "South African" },
  { name: "Hasan Minhaj", wikiTitle: "Hasan Minhaj", category: "comedians", subCategories: ["Comedian", "Writer"], profession: "Comedian, Writer", nationality: "American" },
  { name: "John Mulaney", wikiTitle: "John Mulaney", category: "comedians", subCategories: ["Comedian", "Writer"], profession: "Comedian, Writer", nationality: "American" },
  { name: "Bo Burnham", wikiTitle: "Bo Burnham", category: "comedians", subCategories: ["Comedian", "Musician"], profession: "Comedian, Musician", nationality: "American" },

  // Entrepreneurs / Tech
  { name: "Sam Altman", wikiTitle: "Sam Altman", category: "entrepreneurs", subCategories: ["Entrepreneur", "Investor"], profession: "Entrepreneur, Investor", nationality: "American" },
  { name: "Mark Cuban", wikiTitle: "Mark Cuban", category: "entrepreneurs", subCategories: ["Entrepreneur", "Investor"], profession: "Entrepreneur, Investor", nationality: "American" },
  { name: "Daymond John", wikiTitle: "Daymond John", category: "entrepreneurs", subCategories: ["Entrepreneur", "Investor"], profession: "Entrepreneur, Investor", nationality: "American" },
  { name: "Robert Herjavec", wikiTitle: "Robert Herjavec", category: "entrepreneurs", subCategories: ["Entrepreneur", "Investor"], profession: "Entrepreneur, Investor", nationality: "Canadian-Croatian" },
  { name: "Kevin O'Leary", wikiTitle: "Kevin O'Leary", category: "entrepreneurs", subCategories: ["Entrepreneur", "Investor"], profession: "Entrepreneur, Investor", nationality: "Canadian" },

  // Authors / Chefs / DJs / Dancers / Models / Journalists / Producers / Directors
  { name: "James Clear", wikiTitle: "James Clear", category: "authors", subCategories: ["Author"], profession: "Author", nationality: "American" },
  { name: "Colleen Hoover", wikiTitle: "Colleen Hoover", category: "authors", subCategories: ["Author"], profession: "Author", nationality: "American" },
  { name: "Salt Bae", wikiTitle: "Salt Bae", category: "chefs", subCategories: ["Chef", "Restaurateur"], profession: "Chef, Restaurateur", nationality: "Turkish" },
  { name: "Gordon Ramsay", wikiTitle: "Gordon Ramsay", category: "chefs", subCategories: ["Chef", "TV Host"], profession: "Chef, TV Host", nationality: "British" },
  { name: "Calvin Harris", wikiTitle: "Calvin Harris", category: "djs", subCategories: ["DJ", "Producer"], profession: "DJ, Producer", nationality: "Scottish" },
  { name: "Marshmello", wikiTitle: "Marshmello", category: "djs", subCategories: ["DJ", "Producer"], profession: "DJ, Producer", nationality: "American" },
  { name: "Maddie Ziegler", wikiTitle: "Maddie Ziegler", category: "dancers", subCategories: ["Dancer", "Actress"], profession: "Dancer, Actress", nationality: "American" },
  { name: "JoJo Siwa", wikiTitle: "JoJo Siwa", category: "dancers", subCategories: ["Dancer", "Singer"], profession: "Dancer, Singer", nationality: "American" },
  { name: "Emily Ratajkowski", wikiTitle: "Emily Ratajkowski", category: "models", subCategories: ["Model", "Actress"], profession: "Model, Actress", nationality: "American" },
  { name: "Gigi Hadid", wikiTitle: "Gigi Hadid", category: "models", subCategories: ["Model"], profession: "Model", nationality: "American" },
  { name: "Bella Hadid", wikiTitle: "Bella Hadid", category: "models", subCategories: ["Model"], profession: "Model", nationality: "American" },
  { name: "Kendall Jenner", wikiTitle: "Kendall Jenner", category: "models", subCategories: ["Model", "TV Personality"], profession: "Model, TV Personality", nationality: "American" },
  { name: "Adrian Wojnarowski", wikiTitle: "Adrian Wojnarowski", category: "journalists", subCategories: ["Journalist"], profession: "Journalist", nationality: "American" },
  { name: "Shams Charania", wikiTitle: "Shams Charania", category: "journalists", subCategories: ["Journalist"], profession: "Journalist", nationality: "American" },
  { name: "Jerry Seinfeld", wikiTitle: "Jerry Seinfeld", category: "tv-personality", subCategories: ["Comedian", "Actor"], profession: "Comedian, Actor", nationality: "American" },
  { name: "Ryan Seacrest", wikiTitle: "Ryan Seacrest", category: "tv-personality", subCategories: ["TV Host", "Producer"], profession: "TV Host, Producer", nationality: "American" },
  { name: "Greta Gerwig", wikiTitle: "Greta Gerwig", category: "directors", subCategories: ["Director", "Screenwriter"], profession: "Director, Screenwriter", nationality: "American" },
  { name: "Denis Villeneuve", wikiTitle: "Denis Villeneuve", category: "directors", subCategories: ["Director", "Screenwriter"], profession: "Director, Screenwriter", nationality: "Canadian" },
  { name: "Pharrell Williams", wikiTitle: "Pharrell Williams", category: "producers", subCategories: ["Producer", "Singer"], profession: "Producer, Singer", nationality: "American" },
  { name: "Metro Boomin", wikiTitle: "Metro Boomin", category: "producers", subCategories: ["Producer", "DJ"], profession: "Producer, DJ", nationality: "American" },
];

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

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

async function main() {
  const celebrities = JSON.parse(await fs.readFile(SEED_FILE, "utf-8"));
  const existingSlugs = new Set(celebrities.map((c) => c.slug));
  let maxSort = Math.max(...celebrities.map((c) => c.sortOrder || 0));

  console.log(`Current celebrities: ${celebrities.length}`);
  console.log(`Adding up to ${NEW_CELEBS.length} new celebrities...\n`);

  let added = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < NEW_CELEBS.length; i++) {
    const celeb = NEW_CELEBS[i];
    const slug = slugify(celeb.name);

    if (existingSlugs.has(slug)) {
      console.log(`[${i + 1}/${NEW_CELEBS.length}] ${celeb.name} — already exists, skipping`);
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`[${i + 1}/${NEW_CELEBS.length}] ${celeb.name}... `);

      // Fetch Wikipedia summary for bio and image
      const url = `${WIKI_REST}/${encodeURIComponent(celeb.wikiTitle)}`;
      const data = await fetchJson(url);
      await new Promise((r) => setTimeout(r, 1500));

      const bio = data.extract || `${celeb.name} is a ${celeb.profession.toLowerCase()} from ${celeb.nationality}.`;
      const wikiUrl = data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(celeb.wikiTitle)}`;

      // Get image
      const imageUrl = data.originalimage?.source || data.thumbnail?.source;
      const ext = imageUrl?.match(/\.(png)$/i) ? ".png" : ".jpg";
      const fileName = `${slug}${ext}`;
      const photoUrl = `/images/celebrities/${fileName}`;
      const destPath = join(DEST_DIR, fileName);

      if (imageUrl) {
        try {
          const bytes = await downloadFile(imageUrl, destPath);
          await new Promise((r) => setTimeout(r, 1500));
          console.log(`OK (${Math.round(bytes / 1024)} KB)`);
        } catch (dlErr) {
          console.log(`image failed: ${dlErr.message}`);
          failed++;
          continue;
        }
      } else {
        console.log("no image found");
        failed++;
        continue;
      }

      // Extract birth year from bio or Wikipedia data
      let birthYear = null;
      const yearMatch = bio.match(/\b(19\d{2}|20[0-2]\d)\b/);
      if (yearMatch) birthYear = parseInt(yearMatch[0]);

      maxSort++;
      celebrities.push({
        id: slug,
        name: celeb.name,
        slug,
        category: celeb.category,
        subCategories: celeb.subCategories,
        nationality: celeb.nationality,
        profession: celeb.profession,
        birthYear,
        wikiTitle: celeb.wikiTitle,
        bio,
        wikiUrl,
        photoUrl,
        status: "published",
        featured: false,
        basePrice: null,
        currency: "USD",
        sortOrder: maxSort,
      });

      existingSlugs.add(slug);
      added++;
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      failed++;
      await new Promise((r) => setTimeout(r, 3000));
    }
  }

  await fs.writeFile(SEED_FILE, JSON.stringify(celebrities, null, 2));

  console.log(`\n=== Summary ===`);
  console.log(`Added: ${added}, Skipped (existing): ${skipped}, Failed: ${failed}`);
  console.log(`Total celebrities: ${celebrities.length}`);
  console.log(`Updated: ${SEED_FILE}`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
