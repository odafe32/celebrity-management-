export type Celebrity = {
  id: string;
  name: string;
  slug: string;
  category: string;
  subCategories: string[];
  nationality: string;
  profession: string;
  birthYear: number;
  wikiTitle: string;
  bio: string;
  wikiUrl: string;
  photoUrl: string;
  galleryImages?: string[];
  status: "published";
  featured: boolean;
  basePrice: number | null;
  currency: string;
  sortOrder: number;
};

import galleryData from "../data/celebrity-galleries.json" with { type: "json" };
import seedData from "../data/celebrities-seed-100.json" with { type: "json" };

export const CATEGORIES = [
  { name: "Actors", slug: "actors" },
  { name: "Actress", slug: "actress" },
  { name: "Musicians", slug: "musicians" },
  { name: "Athletes", slug: "athletes" },
  { name: "Comedians", slug: "comedians" },
  { name: "TV Personalities", slug: "tv-personality" },
  { name: "Directors", slug: "directors" },
  { name: "Producers", slug: "producers" },
  { name: "Models", slug: "models" },
  { name: "Influencers", slug: "influencers" },
  { name: "Entrepreneurs", slug: "entrepreneurs" },
  { name: "Authors", slug: "authors" },
  { name: "Chefs", slug: "chefs" },
  { name: "Dancers", slug: "dancers" },
  { name: "DJs", slug: "djs" },
  { name: "Journalists", slug: "journalists" },
] as const;

// ─── ORIGINAL 24 VERIFIED CELEBRITIES (hand-coded, photos verified) ───
const ORIGINAL_24: Celebrity[] = [
  {
    id: "tom-cruise",
    name: "Tom Cruise",
    slug: "tom-cruise",
    category: "actors",
    subCategories: ["Male Actors", "Producer"],
    nationality: "American",
    profession: "Actor, Producer",
    birthYear: 1962,
    wikiTitle: "Tom Cruise",
    bio: "Thomas Cruise Mapother IV is an American actor and producer. One of the world's highest-paid actors, he has received various accolades, including an Honorary Palme d'Or and three Golden Globe Awards, in addition to nominations for four Academy Awards.",
    wikiUrl: "https://en.wikipedia.org/wiki/Tom_Cruise",
    photoUrl: "/images/celebrities/tom-cruise.jpg",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 1,
  },
  {
    id: "beyonce",
    name: "Beyoncé",
    slug: "beyonce",
    category: "musicians",
    subCategories: ["Singer", "Songwriter", "Actress"],
    nationality: "American",
    profession: "Singer, Songwriter, Actress",
    birthYear: 1981,
    wikiTitle: "Beyoncé",
    bio: "Beyoncé Giselle Knowles-Carter is an American singer, songwriter, and actress. She rose to fame in the late 1990s as the lead singer of Destiny's Child, one of the best-selling girl groups of all time.",
    wikiUrl: "https://en.wikipedia.org/wiki/Beyoncé",
    photoUrl: "/images/celebrities/beyonce.jpg",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 2,
  },
  {
    id: "lebron-james",
    name: "LeBron James",
    slug: "lebron-james",
    category: "athletes",
    subCategories: ["Basketball", "Entrepreneur"],
    nationality: "American",
    profession: "Basketball Player, Entrepreneur",
    birthYear: 1984,
    wikiTitle: "LeBron James",
    bio: "LeBron Raymone James Sr. is an American professional basketball player for the Los Angeles Lakers. Nicknamed 'King James', he is widely regarded as one of the greatest players in NBA history.",
    wikiUrl: "https://en.wikipedia.org/wiki/LeBron_James",
    photoUrl: "/images/celebrities/lebron-james.jpg",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 3,
  },
  {
    id: "brad-pitt",
    name: "Brad Pitt",
    slug: "brad-pitt",
    category: "actors",
    subCategories: ["Male Actors", "Producer"],
    nationality: "American",
    profession: "Actor, Producer",
    birthYear: 1963,
    wikiTitle: "Brad Pitt",
    bio: "William Bradley Pitt is an American actor and film producer. He is the recipient of various accolades, including two Academy Awards, a British Academy Film Award, two Golden Globe Awards, and a Primetime Emmy Award.",
    wikiUrl: "https://en.wikipedia.org/wiki/Brad_Pitt",
    photoUrl: "/images/celebrities/brad-pitt.jpg",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 4,
  },
  {
    id: "rihanna",
    name: "Rihanna",
    slug: "rihanna",
    category: "musicians",
    subCategories: ["Singer", "Businesswoman"],
    nationality: "Barbadian",
    profession: "Singer, Businesswoman",
    birthYear: 1988,
    wikiTitle: "Rihanna",
    bio: "Robyn Rihanna Fenty is a Barbadian singer, actress, and businesswoman. She has sold over 250 million records worldwide, making her one of the best-selling music artists of all time.",
    wikiUrl: "https://en.wikipedia.org/wiki/Rihanna",
    photoUrl: "/images/celebrities/rihanna.png",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 5,
  },
  {
    id: "dwayne-johnson",
    name: "Dwayne Johnson",
    slug: "dwayne-johnson",
    category: "actors",
    subCategories: ["Male Actors", "Wrestler"],
    nationality: "American",
    profession: "Actor, Wrestler",
    birthYear: 1972,
    wikiTitle: "Dwayne Johnson",
    bio: "Dwayne Douglas Johnson, also known by his ring name The Rock, is an American actor and former professional wrestler. He is one of the world's highest-grossing actors.",
    wikiUrl: "https://en.wikipedia.org/wiki/Dwayne_Johnson",
    photoUrl: "/images/celebrities/dwayne-johnson.jpg",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 6,
  },
  {
    id: "taylor-swift",
    name: "Taylor Swift",
    slug: "taylor-swift",
    category: "musicians",
    subCategories: ["Singer", "Songwriter"],
    nationality: "American",
    profession: "Singer, Songwriter",
    birthYear: 1989,
    wikiTitle: "Taylor Swift",
    bio: "Taylor Alison Swift is an American singer-songwriter. Recognized for her songwriting, musical versatility, and artistic reinventions, she is a prominent cultural figure of the 21st century.",
    wikiUrl: "https://en.wikipedia.org/wiki/Taylor_Swift",
    photoUrl: "/images/celebrities/taylor-swift.png",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 7,
  },
  {
    id: "kevin-hart",
    name: "Kevin Hart",
    slug: "kevin-hart",
    category: "comedians",
    subCategories: ["Comedian", "Actor"],
    nationality: "American",
    profession: "Comedian, Actor",
    birthYear: 1979,
    wikiTitle: "Kevin Hart",
    bio: "Kevin Darnell Hart is an American comedian and actor. Originally known as a stand-up comedian, he has since starred in Hollywood films and television series.",
    wikiUrl: "https://en.wikipedia.org/wiki/Kevin_Hart",
    photoUrl: "/images/celebrities/kevin-hart.jpg",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 8,
  },
  {
    id: "keanu-reeves",
    name: "Keanu Charles Reeves",
    slug: "keanu-reeves",
    category: "actors",
    subCategories: ["Male Actors"],
    nationality: "Canadian",
    profession: "Actor",
    birthYear: 1964,
    wikiTitle: "Keanu Reeves",
    bio: "Keanu Charles Reeves is a Canadian actor and musician. Known for his leading roles in action films, he has received multiple accolades in a career spanning four decades.",
    wikiUrl: "https://en.wikipedia.org/wiki/Keanu_Reeves",
    photoUrl: "/images/celebrities/keanu-reeves.jpg",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 9,
  },
  {
    id: "drake",
    name: "Drake",
    slug: "drake",
    category: "musicians",
    subCategories: ["Rapper", "Singer"],
    nationality: "Canadian",
    profession: "Rapper, Singer",
    birthYear: 1986,
    wikiTitle: "Drake (musician)",
    bio: "Aubrey Drake Graham is a Canadian rapper and singer. An influential figure in contemporary popular music, he has been credited with popularizing singing and R&B sensibilities in hip-hop.",
    wikiUrl: "https://en.wikipedia.org/wiki/Drake_(musician)",
    photoUrl: "/images/celebrities/drake.jpg",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 10,
  },
  {
    id: "scarlett-johansson",
    name: "Scarlett Johansson",
    slug: "scarlett-johansson",
    category: "actress",
    subCategories: ["Actress", "Singer"],
    nationality: "American",
    profession: "Actress, Singer",
    birthYear: 1984,
    wikiTitle: "Scarlett Johansson",
    bio: "Scarlett Ingrid Johansson is an American actress and singer. She was the world's highest-paid actress in 2018 and 2019, and has appeared multiple times on the Forbes Celebrity 100 list.",
    wikiUrl: "https://en.wikipedia.org/wiki/Scarlett_Johansson",
    photoUrl: "/images/celebrities/scarlett-johansson.jpg",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 11,
  },
  {
    id: "chris-hemsworth",
    name: "Chris Hemsworth",
    slug: "chris-hemsworth",
    category: "actors",
    subCategories: ["Male Actors"],
    nationality: "Australian",
    profession: "Actor",
    birthYear: 1983,
    wikiTitle: "Chris Hemsworth",
    bio: "Christopher Hemsworth AM is an Australian actor. He rose to prominence playing Kim Hyde in the Australian television series Home and Away before beginning a film career in Hollywood.",
    wikiUrl: "https://en.wikipedia.org/wiki/Chris_Hemsworth",
    photoUrl: "/images/celebrities/chris-hemsworth.jpg",
    status: "published",
    featured: true,
    basePrice: null,
    currency: "USD",
    sortOrder: 12,
  },
  {
    id: "leonardo-dicaprio",
    name: "Leonardo DiCaprio",
    slug: "leonardo-dicaprio",
    category: "actors",
    subCategories: ["Male Actors", "Producer"],
    nationality: "American",
    profession: "Actor, Producer",
    birthYear: 1974,
    wikiTitle: "Leonardo DiCaprio",
    bio: "Leonardo Wilhelm DiCaprio is an American actor and film producer. Known for his work in biopics and period films, he is the recipient of numerous accolades, including an Academy Award.",
    wikiUrl: "https://en.wikipedia.org/wiki/Leonardo_DiCaprio",
    photoUrl: "/images/celebrities/leonardo-dicaprio.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 13,
  },
  {
    id: "jennifer-lawrence",
    name: "Jennifer Lawrence",
    slug: "jennifer-lawrence",
    category: "actress",
    subCategories: ["Actress"],
    nationality: "American",
    profession: "Actress",
    birthYear: 1990,
    wikiTitle: "Jennifer Lawrence",
    bio: "Jennifer Shrader Lawrence is an American actress. She was the world's highest-paid actress in 2015 and 2016, and her films have grossed over $6 billion worldwide.",
    wikiUrl: "https://en.wikipedia.org/wiki/Jennifer_Lawrence",
    photoUrl: "/images/celebrities/jennifer-lawrence.png",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 14,
  },
  {
    id: "morgan-freeman",
    name: "Morgan Freeman",
    slug: "morgan-freeman",
    category: "actors",
    subCategories: ["Male Actors", "Narrator"],
    nationality: "American",
    profession: "Actor, Narrator",
    birthYear: 1937,
    wikiTitle: "Morgan Freeman",
    bio: "Morgan Freeman is an American actor, producer, and narrator. He is known for his distinctive deep voice and has appeared in a wide variety of film genres.",
    wikiUrl: "https://en.wikipedia.org/wiki/Morgan_Freeman",
    photoUrl: "/images/celebrities/morgan-freeman.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 15,
  },
  {
    id: "angelina-jolie",
    name: "Angelina Jolie",
    slug: "angelina-jolie",
    category: "actress",
    subCategories: ["Actress", "Filmmaker"],
    nationality: "American",
    profession: "Actress, Filmmaker",
    birthYear: 1975,
    wikiTitle: "Angelina Jolie",
    bio: "Angelina Jolie is an American actress, filmmaker, and humanitarian. She has received an Academy Award, two Screen Actors Guild Awards, and three Golden Globe Awards.",
    wikiUrl: "https://en.wikipedia.org/wiki/Angelina_Jolie",
    photoUrl: "/images/celebrities/angelina-jolie.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 16,
  },
  {
    id: "elon-musk",
    name: "Elon Musk",
    slug: "elon-musk",
    category: "entrepreneurs",
    subCategories: ["Entrepreneur", "CEO"],
    nationality: "South African-American",
    profession: "Entrepreneur, CEO",
    birthYear: 1971,
    wikiTitle: "Elon Musk",
    bio: "Elon Reeve Musk is a businessman and investor. He is the founder, chairman, CEO, and CTO of SpaceX; CEO of Tesla; and owner of X (formerly Twitter).",
    wikiUrl: "https://en.wikipedia.org/wiki/Elon_Musk",
    photoUrl: "/images/celebrities/elon-musk.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 17,
  },
  {
    id: "oprah-winfrey",
    name: "Oprah Winfrey",
    slug: "oprah-winfrey",
    category: "tv-personality",
    subCategories: ["TV Host", "Producer"],
    nationality: "American",
    profession: "TV Host, Producer",
    birthYear: 1954,
    wikiTitle: "Oprah Winfrey",
    bio: "Oprah Gail Winfrey is an American talk show host, television producer, actress, and author. She is best known for her talk show, The Oprah Winfrey Show.",
    wikiUrl: "https://en.wikipedia.org/wiki/Oprah_Winfrey",
    photoUrl: "/images/celebrities/oprah-winfrey.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 18,
  },
  {
    id: "lionel-messi",
    name: "Lionel Messi",
    slug: "lionel-messi",
    category: "athletes",
    subCategories: ["Footballer"],
    nationality: "Argentine",
    profession: "Footballer",
    birthYear: 1987,
    wikiTitle: "Lionel Messi",
    bio: "Lionel Andrés Messi is an Argentine professional footballer who plays as a forward for and captains both Major League Soccer club Inter Miami and the Argentina national team.",
    wikiUrl: "https://en.wikipedia.org/wiki/Lionel_Messi",
    photoUrl: "/images/celebrities/lionel-messi.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 19,
  },
  {
    id: "cristiano-ronaldo",
    name: "Cristiano Ronaldo",
    slug: "cristiano-ronaldo",
    category: "athletes",
    subCategories: ["Footballer"],
    nationality: "Portuguese",
    profession: "Footballer",
    birthYear: 1985,
    wikiTitle: "Cristiano Ronaldo",
    bio: "Cristiano Ronaldo dos Santos Aveiro is a Portuguese professional footballer who plays as a forward for and captains both the Saudi Pro League club Al Nassr and the Portugal national team.",
    wikiUrl: "https://en.wikipedia.org/wiki/Cristiano_Ronaldo",
    photoUrl: "/images/celebrities/cristiano-ronaldo.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 20,
  },
  {
    id: "gordon-ramsay",
    name: "Gordon Ramsay",
    slug: "gordon-ramsay",
    category: "chefs",
    subCategories: ["Chef", "TV Host"],
    nationality: "British",
    profession: "Chef, TV Host",
    birthYear: 1966,
    wikiTitle: "Gordon Ramsay",
    bio: "Gordon James Ramsay OBE is a British celebrity chef, restaurateur, and television personality. His restaurants have been awarded 17 Michelin stars overall.",
    wikiUrl: "https://en.wikipedia.org/wiki/Gordon_Ramsay",
    photoUrl: "/images/celebrities/gordon-ramsay.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 21,
  },
  {
    id: "dave-chappelle",
    name: "Dave Chappelle",
    slug: "dave-chappelle",
    category: "comedians",
    subCategories: ["Comedian", "Actor"],
    nationality: "American",
    profession: "Comedian, Actor",
    birthYear: 1973,
    wikiTitle: "Dave Chappelle",
    bio: "David Khari Webber Chappelle is an American stand-up comedian and actor. He is known for his satirical comedy sketch series Chappelle's Show.",
    wikiUrl: "https://en.wikipedia.org/wiki/Dave_Chappelle",
    photoUrl: "/images/celebrities/dave-chappelle.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 22,
  },
  {
    id: "margot-robbie",
    name: "Margot Robbie",
    slug: "margot-robbie",
    category: "actress",
    subCategories: ["Actress", "Producer"],
    nationality: "Australian",
    profession: "Actress, Producer",
    birthYear: 1990,
    wikiTitle: "Margot Robbie",
    bio: "Margot Elise Robbie is an Australian actress and producer. Known for her work in both blockbuster and independent films, she has received various accolades.",
    wikiUrl: "https://en.wikipedia.org/wiki/Margot_Robbie",
    photoUrl: "/images/celebrities/margot-robbie.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 23,
  },
  {
    id: "zendaya",
    name: "Zendaya",
    slug: "zendaya",
    category: "actress",
    subCategories: ["Actress", "Singer"],
    nationality: "American",
    profession: "Actress, Singer",
    birthYear: 1996,
    wikiTitle: "Zendaya",
    bio: "Zendaya Maree Stoermer Coleman is an American actress and singer. She has received various accolades, including two Primetime Emmy Awards.",
    wikiUrl: "https://en.wikipedia.org/wiki/Zendaya",
    photoUrl: "/images/celebrities/zendaya.jpg",
    status: "published",
    featured: false,
    basePrice: null,
    currency: "USD",
    sortOrder: 24,
  },
];

// ─── NEW 76 CELEBRITIES FROM SEED (auto-fetched bios + photos) ───
// Filter out the original 24 (by slug) and renumber sortOrder starting at 25
const _originalSlugs = new Set(ORIGINAL_24.map((c) => c.slug));
const NEW_76: Celebrity[] = (seedData as Celebrity[])
  .filter((c) => !_originalSlugs.has(c.slug))
  .map((c, i) => ({ ...c, sortOrder: 25 + i }));

export const CELEBRITIES: Celebrity[] = [...ORIGINAL_24, ...NEW_76];

// Merge gallery images from downloaded JSON data
const _galleryMap = galleryData as Record<string, string[]>;
for (const celeb of CELEBRITIES) {
  celeb.galleryImages = _galleryMap[celeb.slug] ?? [];
}

export function getCelebrityBySlug(slug: string): Celebrity | undefined {
  return CELEBRITIES.find((c) => c.slug === slug);
}

export function getCategoryCount(slug: string): number {
  return CELEBRITIES.filter((c) => c.category === slug).length;
}

export function getCategoriesWithCounts(): { name: string; slug: string; count: number }[] {
  return CATEGORIES.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    count: CELEBRITIES.filter((c) => c.category === cat.slug).length,
  }));
}

export function getFeaturedCelebrities(): Celebrity[] {
  return CELEBRITIES.filter((c) => c.featured);
}

export function getCelebritiesByCategory(category: string): Celebrity[] {
  return CELEBRITIES.filter((c) => c.category === category);
}

export function searchCelebrities(query: string): Celebrity[] {
  const q = query.toLowerCase();
  return CELEBRITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.profession.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  );
}

/**
 * Finds celebrities whose category or profession matches any of the given
 * talent type labels (e.g. ["Actors", "Musicians"]). Used to surface real
 * featured talent on service pages instead of generic stock imagery.
 */
export function getCelebritiesByTalentTypes(
  talentTypes: string[],
  limit = 6
): Celebrity[] {
  const normalized = talentTypes.map((t) => t.toLowerCase());

  const matches = CELEBRITIES.filter((c) => {
    const categoryLabel = CATEGORIES.find((cat) => cat.slug === c.category)?.name.toLowerCase() ?? "";
    const profession = c.profession.toLowerCase();
    return normalized.some(
      (t) =>
        categoryLabel.includes(t) ||
        t.includes(categoryLabel) ||
        profession.includes(t.replace(/s$/, ""))
    );
  });

  // Prioritize featured celebrities first, then fill with the rest
  const featured = matches.filter((c) => c.featured);
  const rest = matches.filter((c) => !c.featured);
  return [...featured, ...rest].slice(0, limit);
}
