import fs from "node:fs";

const SEED_FILE = "data/celebrities-seed-100.json";
const d = JSON.parse(fs.readFileSync(SEED_FILE, "utf8"));
let maxSort = Math.max(...d.map((c) => c.sortOrder || 0));

const newCelebs = [
  {
    id: "ben-fuller",
    name: "Ben Fuller",
    slug: "ben-fuller",
    category: "musicians",
    subCategories: ["Singer", "Songwriter"],
    nationality: "American",
    profession: "Singer, Songwriter",
    birthYear: 1990,
    wikiTitle: "Ben Fuller (singer)",
    bio: "Ben Fuller is an American contemporary Christian music singer and songwriter known for his powerful vocals and faith-inspired songs. He gained popularity through social media and has built a dedicated following with his heartfelt performances and authentic storytelling.",
    wikiUrl: "https://en.wikipedia.org/wiki/Ben_Fuller_(singer)",
    photoUrl: "/images/celebrities/ben-fuller.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: ++maxSort,
  },
  {
    id: "riley-green",
    name: "Riley Green",
    slug: "riley-green",
    category: "musicians",
    subCategories: ["Singer", "Songwriter"],
    nationality: "American",
    profession: "Singer, Songwriter",
    birthYear: 1988,
    wikiTitle: "Riley Green (singer)",
    bio: "Riley Green is an American country music singer and songwriter. He has released multiple chart-topping hits including 'There Was This Girl' and 'I Wish Grandpas Never Died.' Known for his traditional country sound and Southern charm, Green has become one of the most popular modern country artists.",
    wikiUrl: "https://en.wikipedia.org/wiki/Riley_Green_(singer)",
    photoUrl: "/images/celebrities/riley-green.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: ++maxSort,
  },
  {
    id: "steve-perry",
    name: "Steve Perry",
    slug: "steve-perry",
    category: "musicians",
    subCategories: ["Singer", "Songwriter"],
    nationality: "American",
    profession: "Singer, Songwriter",
    birthYear: 1949,
    wikiTitle: "Steve Perry (singer)",
    bio: "Stephen Ray Perry is an American singer and songwriter, best known as the lead vocalist of the rock band Journey during their most commercially successful period from 1977 to 1987, and again from 1995 to 1998. Perry possesses a distinctive tenor/countertenor vocal range and is widely regarded as one of the greatest rock singers of all time.",
    wikiUrl: "https://en.wikipedia.org/wiki/Steve_Perry_(singer)",
    photoUrl: "/images/celebrities/steve-perry.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: ++maxSort,
  },
];

d.push(...newCelebs);
fs.writeFileSync(SEED_FILE, JSON.stringify(d, null, 2));
console.log(`Added ${newCelebs.length} celebrities. Total: ${d.length}`);
