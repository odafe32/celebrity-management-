# Celebrity Database — 500+ Celebrities

> Seed data for the celebrity booking platform.
> Use this file to populate the `Educator` (celebrity) table in the database.
> Full bios are fetched from Wikipedia via the included script (`scripts/fetch-celeb-bios.mjs`).

---

## VERIFIED — Celebrities Actually on the Reference Site (mycelebritybookings.com)

> These are the exact celebrities currently listed on the reference site.
> Source: homepage directory listing (page 1) + category list (individual names).
> Total verified: **~90 celebrities** on the reference site.
> Our database has 540 — the extra ~450 are NEW additions for our build.

### From the homepage directory (page 1 — 30 names, in order)

| # | Name on site | Our DB name | Status | Category on site | Notes |
|---|---|---|---|---|---|
| 1 | Colin Farrell | Colin Farrell | ✅ in our DB | actors | — |
| 2 | Bad Bunny | Bad Bunny | ✅ in our DB | Rapper, Singer | — |
| 3 | Elon Musk | Elon Musk | ✅ in our DB | Producer (entrepreneur) | — |
| 4 | Sheryl Suzanne Crow | Sheryl Crow | ⚠️ name mismatch | Singer, Songwriter | Our DB says "Sheryl Crow", site says "Sheryl Suzanne Crow" — **update to full name** |
| 5 | Stjepan Hauser | Stjepan Hauser | ✅ in our DB | Musician | — |
| 6 | Johannes Oerding | Johannes Oerding | ✅ in our DB | Singer | — |
| 7 | Kaitlan Collins | Kaitlan Collins | ✅ in our DB | Journalist | — |
| 8 | Henry Cavill | ❌ MISSING | actors | **ADD Henry Cavill** — not in our DB! |
| 9 | Susanna Hoffs | Susanna Hoffs | ✅ in our DB | Singer, Actress | — |
| 10 | Paul McCartney | Paul McCartney | ✅ in our DB | Singer, Songwriter | — |
| 11 | Adeline Rudolph | Adeline Rudolph | ✅ in our DB | actress | — |
| 12 | Method Man | Method Man | ✅ in our DB | Rapper | — |
| 13 | Martins Short | ❌ MISSING (typo on site) | Comedian | **ADD Martin Short** — site has typo "Martins Short" |
| 14 | Sveva Alviti | Sveva Alviti | ✅ in our DB | Model, Actress | — |
| 15 | Kenny Chesney | Kenny Chesney | ✅ in our DB | Singer, Songwriter | — |
| 16 | Heughan Sam | ❌ MISSING (name reversed on site) | actors | **ADD Sam Heughan** — site has "Heughan Sam" (reversed) |
| 17 | Alex Scott | ❌ MISSING | — | **ADD Alex Scott** — likely the footballer or broadcaster |
| 18 | George Strait | George Strait | ✅ in our DB | Singer | — |
| 19 | Chelsea Handler | Chelsea Handler | ✅ in our DB | Comedian, Actress | — |
| 20 | Charlie Hunnam | ❌ MISSING | actors | **ADD Charlie Hunnam** — not in our DB! |
| 21 | Jim Parsons | ❌ MISSING | actors | **ADD Jim Parsons** — not in our DB! |
| 22 | Richie Sambora | Richie Sambora | ✅ in our DB | Songwriter, Musician | — |
| 23 | Tyler Hynes | ❌ MISSING | actors | **ADD Tyler Hynes** — not in our DB! |
| 24 | Manuel Garcia-Rulfo | ❌ MISSING | actors | **ADD Manuel Garcia-Rulfo** — not in our DB! |
| 25 | Gal Gadot | Gal Gadot | ✅ in our DB | actress | — |
| 26 | Peter Gadiot | ❌ MISSING | actors | **ADD Peter Gadiot** — not in our DB! |
| 27 | Robert Pattinson | Robert Pattinson | ✅ in our DB | actors | — |
| 28 | Dylan McDermott | Dylan McDermott | ✅ in our DB | actors | — |
| 29 | Travis Fimmel | Travis Fimmel | ✅ in our DB | actors, Model | — |
| 30 | Brendan Fraser | Brendan Fraser | ✅ in our DB | actors | — |

### From the category list (individual celebrity names — ~60 more)

| # | Name on site (category) | Our DB name | Status | Notes |
|---|---|---|---|---|
| 1 | Aidan Turner | Aidan Turner | ✅ in our DB | — |
| 2 | Alexander Skarsgård | Alexander Skarsgård | ✅ in our DB | — |
| 3 | Angelina Jolie | Angelina Jolie | ✅ in our DB | — |
| 4 | Benedict Cumberbatch | Benedict Cumberbatch | ✅ in our DB | — |
| 5 | Blake Tollison Shelton | Blake Shelton | ⚠️ name mismatch | **Update to "Blake Tollison Shelton"** (full name on site) |
| 6 | Bob Odenkirk | ❌ MISSING | **ADD Bob Odenkirk** |
| 7 | Brad Paisley | Brad Paisley | ✅ in our DB | — |
| 8 | Brad Pitt | Brad Pitt | ✅ in our DB | — |
| 9 | Bradley Cooper | Bradley Cooper | ✅ in our DB | — |
| 10 | Brendan Fraser | Brendan Fraser | ✅ in our DB | (duplicate — also in directory) |
| 11 | Channing Tatum | Channing Tatum | ✅ in our DB | — |
| 12 | Charlize Theron | Charlize Theron | ✅ in our DB | — |
| 13 | Christopher Peter Meloni | ❌ MISSING | **ADD Christopher Meloni** (full name: Christopher Peter Meloni) |
| 14 | Christopher Walken | Christopher Walken | ✅ in our DB | — |
| 15 | Cillian Murphy | Cillian Murphy | ✅ in our DB | — |
| 16 | Daren Kagasoff | ❌ MISSING | **ADD Daren Kagasoff** |
| 17 | David Boreanaz | ❌ MISSING | **ADD David Boreanaz** |
| 18 | David Tennant | David Tennant | ✅ in our DB | — |
| 19 | Dylan McDermott | Dylan McDermott | ✅ in our DB | (duplicate — also in directory) |
| 20 | Gerard Butler | Gerard Butler | ✅ in our DB | — |
| 21 | Gustaf Skarsgård | Gustaf Skarsgård | ✅ in our DB | — |
| 22 | Hugo Weaving | ❌ MISSING | **ADD Hugo Weaving** |
| 23 | Hyun Bin | Hyun Bin | ✅ in our DB | — |
| 24 | Ian Murray McKellen | Ian McKellen | ⚠️ name mismatch | **Update to "Ian Murray McKellen"** (full name on site) |
| 25 | James McAvoy | James McAvoy | ✅ in our DB | — |
| 26 | James Spader | James Spader | ✅ in our DB | — |
| 27 | Jason Momoa | Jason Momoa | ✅ in our DB | — |
| 28 | Jason Statham | Jason Statham | ✅ in our DB | — |
| 29 | Jeffrey Leon Bridges | Jeff Bridges | ⚠️ name mismatch | **Update to "Jeffrey Leon Bridges"** (full name on site) |
| 30 | Jim Caviezel | Jim Caviezel | ✅ in our DB | — |
| 31 | Joseph Sikora | Joseph Sikora | ✅ in our DB | — |
| 32 | Julia Fiona Roberts | Julia Roberts | ⚠️ name mismatch | **Update to "Julia Fiona Roberts"** (full name on site) |
| 33 | Jussie Smollett | ❌ MISSING | **ADD Jussie Smollett** |
| 34 | Katheryn Winnick | Katheryn Winnick | ✅ in our DB | — |
| 35 | Keanu Charles Reeves | Keanu Reeves | ⚠️ name mismatch | **Update to "Keanu Charles Reeves"** (full name on site) |
| 36 | Luke Bryan | Luke Bryan | ✅ in our DB | — |
| 37 | Mark Harmon | Mark Harmon | ✅ in our DB | — |
| 38 | Martin Henderson | Martin Henderson | ✅ in our DB | — |
| 39 | Matt Czuchry | Matt Czuchry | ✅ in our DB | — |
| 40 | Matt Damon | Matt Damon | ✅ in our DB | — |
| 41 | Matthew Gray Gubler | Matthew Gray Gubler | ✅ in our DB | — |
| 42 | Megan Boone | Megan Boone | ✅ in our DB | — |
| 43 | Michael Bolotin | Michael Bolton | ⚠️ name mismatch | **Update to "Michael Bolotin"** (birth name on site) |
| 44 | Michael Sheen | Michael Sheen | ✅ in our DB | — |
| 45 | Michele Morrone | Michele Morrone | ✅ in our DB | — |
| 46 | Milo Ventimiglia | Milo Ventimiglia | ✅ in our DB | — |
| 47 | Nicolas Cage | Nicolas Cage | ✅ in our DB | — |
| 48 | Paul Anderson | ❌ MISSING | **ADD Paul Anderson** (actor, Peaky Blinders) |
| 49 | Philip Winchester | ❌ MISSING | **ADD Philip Winchester** |
| 50 | Piers Morgan | Piers Morgan | ✅ in our DB | — |
| 51 | Ryan Eggold | ❌ MISSING | **ADD Ryan Eggold** |
| 52 | Ryan Phillippe | Ryan Phillippe | ✅ in our DB | — |
| 53 | Stanley Weber | ❌ MISSING | **ADD Stanley Weber** |
| 54 | Sullivan Stapleton | ❌ MISSING | **ADD Sullivan Stapleton** |
| 55 | Taylor Jacks Kinney | ❌ MISSING | **ADD Taylor Kinney** (full name: Taylor Jacks Kinney) |
| 56 | Terrence Howard | Terrence Howard | ✅ in our DB | — |
| 57 | Tom Cruise | Tom Cruise | ✅ in our DB | — |
| 58 | Tom Ellis | Tom Ellis | ✅ in our DB | — |
| 59 | Tom Payne | ❌ MISSING | **ADD Tom Payne** (actor, The Walking Dead) |
| 60 | Trai Byers | ❌ MISSING | **ADD Trai Byers** |
| 61 | Travis Fimmel | Travis Fimmel | ✅ in our DB | (duplicate — also in directory) |
| 62 | Will Estes | ❌ MISSING | **ADD Will Estes** |

### Summary of changes needed

#### ❌ MISSING from our DB — ADD these 19 celebrities

| # | Name | Category | Profession | Wiki Title | Notes |
|---|---|---|---|---|---|
| 1 | Henry Cavill | actors | Actor | Henry Cavill | Superman, The Witcher |
| 2 | Martin Short | comedian | Comedian, Actor | Martin Short | Site has typo "Martins Short" |
| 3 | Sam Heughan | actors | Actor | Sam Heughan | Site has "Heughan Sam" (reversed) |
| 4 | Alex Scott | tv-personality | Broadcaster, Footballer | Alex Scott (footballer) | Former footballer, now BBC presenter |
| 5 | Charlie Hunnam | actors | Actor | Charlie Hunnam | Sons of Anarchy |
| 6 | Jim Parsons | actors | Actor | Jim Parsons | Big Bang Theory |
| 7 | Tyler Hynes | actors | Actor | Tyler Hynes | Hallmark movies |
| 8 | Manuel Garcia-Rulfo | actors | Actor | Manuel Garcia-Rulfo | The Lincoln Lawyer |
| 9 | Peter Gadiot | actors | Actor | Peter Gadiot | Yellowjackets, Once Upon a Time |
| 10 | Bob Odenkirk | actors | Actor, Comedian | Bob Odenkirk | Better Call Saul |
| 11 | Christopher Meloni | actors | Actor | Christopher Meloni | Law & Order: SVU (full name: Christopher Peter Meloni) |
| 12 | Daren Kagasoff | actors | Actor | Daren Kagasoff | The Secret Life of the American Teenager |
| 13 | David Boreanaz | actors | Actor | David Boreanaz | Bones, Angel |
| 14 | Hugo Weaving | actors | Actor | Hugo Weaving | Matrix, LOTR |
| 15 | Jussie Smollett | actors | Actor, Singer | Jussie Smollett | Empire |
| 16 | Paul Anderson | actors | Actor | Paul Anderson (actor) | Peaky Blinders |
| 17 | Philip Winchester | actors | Actor | Philip Winchester | Strike Back, The Player |
| 18 | Ryan Eggold | actors | Actor | Ryan Eggold | New Amsterdam, The Blacklist |
| 19 | Stanley Weber | actors | Actor | Stanley Weber (actor) | Versailles, Outlander |
| 20 | Sullivan Stapleton | actors | Actor | Sullivan Stapleton | Blindspot, 300: Rise of an Empire |
| 21 | Taylor Kinney | actors | Actor | Taylor Kinney | Chicago Fire (full name: Taylor Jacks Kinney) |
| 22 | Tom Payne | actors | Actor | Tom Payne (actor) | The Walking Dead, Prodigal Son |
| 23 | Trai Byers | actors | Actor | Trai Byers | Empire |
| 24 | Will Estes | actors | Actor | Will Estes | Blue Bloods |

#### ⚠️ NAME MISMATCHES — Update these 7 names to match the reference site

| # | Our DB name | Reference site name | Action |
|---|---|---|---|
| 1 | Sheryl Crow | Sheryl Suzanne Crow | Update to full name |
| 2 | Blake Shelton | Blake Tollison Shelton | Update to full name |
| 3 | Ian McKellen | Ian Murray McKellen | Update to full name |
| 4 | Jeff Bridges | Jeffrey Leon Bridges | Update to full name |
| 5 | Julia Roberts | Julia Fiona Roberts | Update to full name |
| 6 | Keanu Reeves | Keanu Charles Reeves | Update to full name |
| 7 | Michael Bolton | Michael Bolotin | Update to birth name (as on site) |

#### ✅ Already correct — these ~63 are in our DB and match

Aidan Turner, Alexander Skarsgård, Angelina Jolie, Bad Bunny, Benedict Cumberbatch, Brad Paisley, Brad Pitt, Bradley Cooper, Brendan Fraser, Channing Tatum, Charlize Theron, Chelsea Handler, Christopher Walken, Cillian Murphy, Colin Farrell, David Tennant, Dylan McDermott, Elon Musk, Gal Gadot, George Strait, Gerard Butler, Gustaf Skarsgård, Hyun Bin, James McAvoy, James Spader, Jason Momoa, Jason Statham, Jim Caviezel, Joseph Sikora, Johannes Oerding, Katheryn Winnick, Kaitlan Collins, Kenny Chesney, Luke Bryan, Mark Harmon, Martin Henderson, Matt Czuchry, Matt Damon, Matthew Gray Gubler, Megan Boone, Michael Sheen, Michele Morrone, Milo Ventimiglia, Method Man, Nicolas Cage, Paul McCartney, Piers Morgan, Richie Sambora, Robert Pattinson, Stjepan Hauser, Susanna Hoffs, Sveva Alviti, Terrence Howard, Tom Cruise, Tom Ellis, Travis Fimmel, Adeline Rudolph.

---

## Data Schema (per celebrity)

```typescript
interface Celebrity {
  id: string;              // unique slug, e.g. "tom-cruise"
  name: string;            // full name, e.g. "Tom Cruise"
  slug: string;            // URL slug, e.g. "tom-cruise"
  category: string;        // primary category, e.g. "actors"
  subCategories: string[]; // additional tags, e.g. ["Male Actors", "Producer"]
  nationality: string;     // e.g. "American"
  profession: string;      // e.g. "Actor, Producer"
  birthYear: number;        // e.g. 1962
  wikiTitle: string;        // Wikipedia article title for bio fetching
  bio: string;              // short bio (fetched from Wikipedia or manual)
  wikiUrl: string;          // link to Wikipedia article
  photoUrl: string;         // placeholder — upload to media library in admin
  status: "published";      // published | draft | archived
  featured: boolean;        // show on homepage featured row
  basePrice: number | null; // null = "contact for quote" (like reference site)
  currency: string;         // "USD"
  sortOrder: number;        // display order
}
```

---

## Categories Used

| Category | Count | Description |
|----------|-------|-------------|
| actors | 144 | Male film & TV actors (120 original + 24 from reference site) |
| actress | 80 | Female film & TV actresses |
| musician | 60 | Singers, songwriters, bands |
| athlete | 50 | Sports stars across all sports |
| comedian | 30 | Stand-up, TV, film comedians |
| tv-personality | 30 | Hosts, presenters, reality stars |
| director | 25 | Film & TV directors |
| producer | 20 | Film, TV, music producers |
| model | 20 | Fashion & commercial models |
| influencer | 20 | Social media personalities |
| entrepreneur | 15 | Business personalities |
| author | 15 | Writers, novelists |
| chef | 10 | Celebrity chefs |
| dancer | 10 | Professional dancers |
| dj | 10 | DJs & electronic artists |
| journalist | 10 | News anchors, journalists |
| other | 15 | Misc public figures |
| **TOTAL** | **564** | |

---

## How to Use This Data

### Option A: Import JSON directly (Prisma seed)
```bash
# 1. Place celebrities-seed.json in prisma/
# 2. Run the seed script
npx prisma db seed
```

### Option B: Import via admin panel
1. Go to `/admin/educators` → "Bulk Import"
2. Upload `celebrities-seed.json`
3. Review and publish

### Option C: Fetch full bios from Wikipedia
```bash
# Fetches bios for all celebrities using Wikipedia API
node scripts/fetch-celeb-bios.mjs
# Outputs updated JSON with bio + wikiUrl fields filled
```

---

## Celebrity List (564 total — 540 original + 24 added from reference site)

### Actors — Male (144)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Tom Cruise | American | Actor, Producer | 1962 | Tom Cruise |
| 2 | Brad Pitt | American | Actor, Producer | 1963 | Brad Pitt |
| 3 | Leonardo DiCaprio | American | Actor, Producer | 1974 | Leonardo DiCaprio |
| 4 | Johnny Depp | American | Actor, Producer | 1963 | Johnny Depp |
| 5 | Will Smith | American | Actor, Rapper | 1968 | Will Smith |
| 6 | Denzel Washington | American | Actor, Director | 1954 | Denzel Washington |
| 7 | Keanu Charles Reeves | Canadian | Actor | 1964 | Keanu Reeves |
| 8 | Morgan Freeman | American | Actor, Narrator | 1937 | Morgan Freeman |
| 9 | Robert De Niro | American | Actor, Producer | 1943 | Robert De Niro |
| 10 | Samuel L. Jackson | American | Actor, Producer | 1948 | Samuel L. Jackson |
| 11 | Matt Damon | American | Actor, Producer | 1970 | Matt Damon |
| 12 | Christian Bale | British | Actor | 1974 | Christian Bale |
| 13 | Ryan Gosling | Canadian | Actor | 1980 | Ryan Gosling |
| 14 | Chris Hemsworth | Australian | Actor | 1983 | Chris Hemsworth |
| 15 | Chris Evans | American | Actor | 1981 | Chris Evans (actor) |
| 16 | Mark Wahlberg | American | Actor, Producer | 1971 | Mark Wahlberg |
| 17 | Matthew McConaughey | American | Actor, Producer | 1969 | Matthew McConaughey |
| 18 | Hugh Jackman | Australian | Actor | 1968 | Hugh Jackman |
| 19 | Ryan Reynolds | Canadian | Actor, Producer | 1976 | Ryan Reynolds |
| 20 | Dwayne Johnson | American | Actor, Wrestler | 1972 | Dwayne Johnson |
| 21 | Jason Statham | British | Actor | 1967 | Jason Statham |
| 22 | Vin Diesel | American | Actor, Producer | 1967 | Vin Diesel |
| 23 | Bradley Cooper | American | Actor, Director | 1975 | Bradley Cooper |
| 24 | Gerard Butler | Scottish | Actor, Producer | 1969 | Gerard Butler |
| 25 | Tom Hardy | British | Actor, Producer | 1977 | Tom Hardy |
| 26 | Idris Elba | British | Actor | 1972 | Idris Elba |
| 27 | Michael Fassbender | Irish-German | Actor | 1977 | Michael Fassbender |
| 28 | Javier Bardem | Spanish | Actor | 1969 | Javier Bardem |
| 29 | Colin Farrell | Irish | Actor | 1976 | Colin Farrell |
| 30 | Cillian Murphy | Irish | Actor | 1976 | Cillian Murphy |
| 31 | Tom Hanks | American | Actor, Producer | 1956 | Tom Hanks |
| 32 | George Clooney | American | Actor, Director | 1961 | George Clooney |
| 33 | Harrison Ford | American | Actor | 1942 | Harrison Ford |
| 34 | Anthony Hopkins | Welsh | Actor, Director | 1937 | Anthony Hopkins |
| 35 | Al Pacino | American | Actor | 1940 | Al Pacino |
| 36 | Robert Downey Jr. | American | Actor | 1965 | Robert Downey Jr. |
| 37 | Mark Ruffalo | American | Actor, Producer | 1967 | Mark Ruffalo |
| 38 | Jeremy Renner | American | Actor | 1971 | Jeremy Renner |
| 39 | Paul Rudd | American | Actor | 1969 | Paul Rudd |
| 40 | Benedict Cumberbatch | British | Actor | 1976 | Benedict Cumberbatch |
| 41 | Tom Hiddleston | British | Actor | 1981 | Tom Hiddleston |
| 42 | Eddie Redmayne | British | Actor | 1982 | Eddie Redmayne |
| 43 | Andrew Garfield | British-American | Actor | 1983 | Andrew Garfield |
| 44 | Tobey Maguire | American | Actor, Producer | 1975 | Tobey Maguire |
| 45 | Jake Gyllenhaal | American | Actor, Producer | 1980 | Jake Gyllenhaal |
| 46 | James Franco | American | Actor, Filmmaker | 1978 | James Franco |
| 47 | Shia LaBeouf | American | Actor, Performance Artist | 1986 | Shia LaBeouf |
| 48 | Zac Efron | American | Actor | 1987 | Zac Efron |
| 49 | Robert Pattinson | British | Actor | 1986 | Robert Pattinson |
| 50 | Daniel Radcliffe | British | Actor | 1989 | Daniel Radcliffe |
| 51 | Rupert Grint | British | Actor | 1988 | Rupert Grint |
| 52 | Matthew Gray Gubler | American | Actor, Filmmaker | 1980 | Matthew Gray Gubler |
| 53 | Cillian Murphy | Irish | Actor | 1976 | Cillian Murphy |
| 54 | Aidan Turner | Irish | Actor | 1983 | Aidan Turner |
| 55 | Alexander Skarsgård | Swedish | Actor | 1976 | Alexander Skarsgård |
| 56 | Gustaf Skarsgård | Swedish | Actor | 1980 | Gustaf Skarsgård |
| 57 | Hyun Bin | South Korean | Actor | 1982 | Hyun Bin |
| 58 | Jason Momoa | American | Actor | 1979 | Jason Momoa |
| 59 | Travis Fimmel | Australian | Actor, Model | 1979 | Travis Fimmel |
| 60 | Brendan Fraser | American | Actor | 1968 | Brendan Fraser |
| 61 | Dylan McDermott | American | Actor | 1961 | Dylan McDermott |
| 62 | Jim Caviezel | American | Actor | 1968 | Jim Caviezel |
| 63 | Joseph Sikora | American | Actor | 1976 | Joseph Sikora |
| 64 | Terrence Howard | American | Actor, Singer | 1969 | Terrence Howard |
| 65 | Nicolas Cage | American | Actor, Producer | 1964 | Nicolas Cage |
| 66 | John Travolta | American | Actor, Singer | 1954 | John Travolta |
| 67 | Bruce Willis | American | Actor, Producer | 1955 | Bruce Willis |
| 68 | Liam Neeson | Irish | Actor | 1952 | Liam Neeson |
| 69 | Mel Gibson | American-Australian | Actor, Director | 1956 | Mel Gibson |
| 70 | Kevin Costner | American | Actor, Director | 1955 | Kevin Costner |
| 71 | Kurt Russell | American | Actor | 1951 | Kurt Russell |
| 72 | Jeffrey Leon Bridges | American | Actor | 1949 | Jeff Bridges |
| 73 | Bill Murray | American | Actor, Comedian | 1950 | Bill Murray |
| 74 | Steve Carell | American | Actor, Comedian | 1962 | Steve Carell |
| 75 | Will Ferrell | American | Actor, Comedian | 1967 | Will Ferrell |
| 76 | Ben Stiller | American | Actor, Filmmaker | 1965 | Ben Stiller |
| 77 | Vince Vaughn | American | Actor, Producer | 1970 | Vince Vaughn |
| 78 | Owen Wilson | American | Actor | 1968 | Owen Wilson |
| 79 | Luke Wilson | American | Actor | 1971 | Luke Wilson |
| 80 | Jack Black | American | Actor, Comedian, Musician | 1969 | Jack Black |
| 81 | Seth Rogen | Canadian | Actor, Comedian | 1982 | Seth Rogen |
| 82 | Jonah Hill | American | Actor, Director | 1983 | Jonah Hill |
| 83 | Michael Cera | Canadian | Actor | 1988 | Michael Cera |
| 84 | James McAvoy | Scottish | Actor | 1979 | James McAvoy |
| 85 | James Spader | American | Actor | 1960 | James Spader |
| 86 | David Tennant | Scottish | Actor | 1971 | David Tennant |
| 87 | Ian Murray McKellen | British | Actor | 1939 | Ian McKellen |
| 88 | Patrick Stewart | British | Actor | 1940 | Patrick Stewart |
| 89 | Sean Bean | British | Actor | 1959 | Sean Bean |
| 90 | Orlando Bloom | British | Actor | 1977 | Orlando Bloom |
| 91 | Viggo Mortensen | American-Danish | Actor | 1958 | Viggo Mortensen |
| 92 | Sean Astin | American | Actor | 1971 | Sean Astin |
| 93 | Elijah Wood | American | Actor, Producer | 1981 | Elijah Wood |
| 94 | Martin Freeman | British | Actor | 1971 | Martin Freeman |
| 95 | Martin Henderson | New Zealander | Actor | 1974 | Martin Henderson |
| 96 | Mark Harmon | American | Actor | 1951 | Mark Harmon |
| 97 | Christopher Meloni | American | Actor | 1961 | Christopher Meloni |
| 98 | Christopher Walken | American | Actor | 1943 | Christopher Walken |
| 99 | Channing Tatum | American | Actor, Producer | 1980 | Channing Tatum |
| 100 | Ryan Phillippe | American | Actor | 1974 | Ryan Phillippe |
| 101 | Matt Czuchry | American | Actor | 1977 | Matt Czuchry |
| 102 | Milo Ventimiglia | American | Actor, Producer | 1977 | Milo Ventimiglia |
| 103 | Justin Hartley | American | Actor | 1977 | Justin Hartley |
| 104 | Sterling K. Brown | American | Actor | 1976 | Sterling K. Brown |
| 105 | Donald Glover | American | Actor, Musician, Writer | 1983 | Donald Glover |
| 106 | LaKeith Stanfield | American | Actor | 1991 | LaKeith Stanfield |
| 107 | John Boyega | British | Actor, Producer | 1992 | John Boyega |
| 108 | Daniel Kaluuya | British | Actor, Writer | 1989 | Daniel Kaluuya |
| 109 | Chadwick Boseman | American | Actor | 1976 | Chadwick Boseman |
| 110 | Michael B. Jordan | American | Actor, Producer | 1987 | Michael B. Jordan |
| 111 | Mahershala Ali | American | Actor | 1974 | Mahershala Ali |
| 112 | Jonathan Majors | American | Actor | 1989 | Jonathan Majors |
| 113 | Austin Butler | American | Actor | 1991 | Austin Butler |
| 114 | Timothée Chalamet | American | Actor | 1995 | Timothée Chalamet |
| 115 | Ansel Elgort | American | Actor, Singer | 1994 | Ansel Elgort |
| 116 | Taron Egerton | Welsh | Actor | 1989 | Taron Egerton |
| 117 | Richard Madden | Scottish | Actor | 1986 | Richard Madden |
| 118 | Kit Harington | British | Actor, Producer | 1986 | Kit Harington |
| 119 | Nikolaj Coster-Waldau | Danish | Actor, Producer | 1970 | Nikolaj Coster-Waldau |
| 120 | Pedro Pascal | Chilean-American | Actor | 1975 | Pedro Pascal |
| 121 | Henry Cavill | British | Actor | 1983 | Henry Cavill |
| 122 | Martin Short | Canadian | Comedian, Actor | 1950 | Martin Short |
| 123 | Sam Heughan | Scottish | Actor | 1980 | Sam Heughan |
| 124 | Charlie Hunnam | British | Actor | 1980 | Charlie Hunnam |
| 125 | Jim Parsons | American | Actor | 1973 | Jim Parsons |
| 126 | Tyler Hynes | Canadian | Actor, Director | 1986 | Tyler Hynes |
| 127 | Manuel Garcia-Rulfo | Mexican | Actor | 1981 | Manuel Garcia-Rulfo |
| 128 | Peter Gadiot | British | Actor | 1975 | Peter Gadiot |
| 129 | Bob Odenkirk | American | Actor, Comedian | 1962 | Bob Odenkirk |
| 130 | Christopher Peter Meloni | American | Actor | 1961 | Christopher Meloni |
| 131 | Daren Kagasoff | American | Actor | 1987 | Daren Kagasoff |
| 132 | David Boreanaz | American | Actor, Producer | 1969 | David Boreanaz |
| 133 | Hugo Weaving | British-Australian | Actor | 1960 | Hugo Weaving |
| 134 | Jussie Smollett | American | Actor, Singer | 1982 | Jussie Smollett |
| 135 | Paul Anderson | English | Actor | 1978 | Paul Anderson (actor) |
| 136 | Philip Winchester | American | Actor | 1981 | Philip Winchester |
| 137 | Ryan Eggold | American | Actor | 1984 | Ryan Eggold |
| 138 | Stanley Weber | French | Actor | 1986 | Stanley Weber (actor) |
| 139 | Sullivan Stapleton | Australian | Actor | 1977 | Sullivan Stapleton |
| 140 | Taylor Jacks Kinney | American | Actor | 1981 | Taylor Kinney |
| 141 | Tom Payne | British | Actor | 1982 | Tom Payne (actor) |
| 142 | Trai Byers | American | Actor | 1983 | Trai Byers |
| 143 | Will Estes | American | Actor | 1978 | Will Estes |
| 144 | Alex Scott | British | Broadcaster, Footballer | 1984 | Alex Scott (footballer) |

---

### Actresses — Female (80)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Angelina Jolie | American | Actress, Filmmaker | 1975 | Angelina Jolie |
| 2 | Scarlett Johansson | American | Actress, Singer | 1984 | Scarlett Johansson |
| 3 | Jennifer Lawrence | American | Actress | 1990 | Jennifer Lawrence |
| 4 | Meryl Streep | American | Actress | 1949 | Meryl Streep |
| 5 | Cate Blanchett | Australian | Actress, Producer | 1969 | Cate Blanchett |
| 6 | Sandra Bullock | American | Actress, Producer | 1964 | Sandra Bullock |
| 7 | Nicole Kidman | Australian-American | Actress, Producer | 1967 | Nicole Kidman |
| 8 | Charlize Theron | South African-American | Actress, Producer | 1975 | Charlize Theron |
| 9 | Julia Fiona Roberts | American | Actress | 1967 | Julia Roberts |
| 10 | Anne Hathaway | American | Actress | 1982 | Anne Hathaway |
| 11 | Natalie Portman | Israeli-American | Actress, Director | 1981 | Natalie Portman |
| 12 | Keira Knightley | British | Actress | 1985 | Keira Knightley |
| 13 | Emma Stone | American | Actress | 1988 | Emma Stone |
| 14 | Emma Watson | British | Actress, Activist | 1990 | Emma Watson |
| 15 | Kristen Stewart | American | Actress, Director | 1990 | Kristen Stewart |
| 16 | Brie Larson | American | Actress, Filmmaker | 1989 | Brie Larson |
| 17 | Margot Robbie | Australian | Actress, Producer | 1990 | Margot Robbie |
| 18 | Zendaya | American | Actress, Singer | 1996 | Zendaya |
| 19 | Florence Pugh | British | Actress | 1996 | Florence Pugh |
| 20 | Saoirse Ronan | Irish-American | Actress | 1994 | Saoirse Ronan |
| 21 | Anya Taylor-Joy | British-Argentine | Actress | 1996 | Anya Taylor-Joy |
| 22 | Gal Gadot | Israeli | Actress, Producer | 1985 | Gal Gadot |
| 23 | Charlize Theron | South African | Actress, Producer | 1975 | Charlize Theron |
| 24 | Halle Berry | American | Actress | 1966 | Halle Berry |
| 25 | Viola Davis | American | Actress, Producer | 1965 | Viola Davis |
| 26 | Octavia Spencer | American | Actress, Producer | 1970 | Octavia Spencer |
| 27 | Taraji P. Henson | American | Actress | 1970 | Taraji P. Henson |
| 28 | Regina King | American | Actress, Director | 1971 | Regina King |
| 29 | Lupita Nyong'o | Kenyan-Mexican | Actress | 1983 | Lupita Nyong'o |
| 30 | Danai Gurira | American-Zimbabwean | Actress, Playwright | 1978 | Danai Gurira |
| 31 | Letitia Wright | Guyanese-British | Actress | 1993 | Letitia Wright |
| 32 | Angela Bassett | American | Actress, Director | 1958 | Angela Bassett |
| 33 | Jennifer Hudson | American | Actress, Singer | 1981 | Jennifer Hudson |
| 34 | Queen Latifah | American | Actress, Rapper, Singer | 1970 | Queen Latifah |
| 35 | Megan Fox | American | Actress | 1986 | Megan Fox |
| 36 | Megan Boone | American | Actress | 1983 | Megan Boone |
| 37 | Katheryn Winnick | Canadian | Actress | 1977 | Katheryn Winnick |
| 38 | Katheryn Winnick | Canadian | Actress | 1977 | Katheryn Winnick |
| 39 | Susanna Hoffs | American | Singer, Actress | 1959 | Susanna Hoffs |
| 40 | Adeline Rudolph | Hong Konger | Actress | 1995 | Adeline Rudolph |
| 41 | Sveva Alviti | Italian | Actress, Model | 1984 | Sveva Alviti |
| 42 | Alexandra Daddario | American | Actress | 1986 | Alexandra Daddario |
| 43 | Alicia Vikander | Swedish | Actress | 1988 | Alicia Vikander |
| 44 | Alicia Silverstone | American | Actress | 1976 | Alicia Silverstone |
| 45 | Amanda Seyfried | American | Actress, Singer | 1985 | Amanda Seyfried |
| 46 | Amy Adams | American | Actress | 1974 | Amy Adams |
| 47 | Amy Poehler | American | Actress, Comedian | 1971 | Amy Poehler |
| 48 | Anna Kendrick | American | Actress, Singer | 1985 | Anna Kendrick |
| 49 | Anne Hathaway | American | Actress | 1982 | Anne Hathaway |
| 50 | Aubrey Plaza | American | Actress, Comedian | 1984 | Aubrey Plaza |
| 51 | Aubrey Plaza | American | Actress, Comedian | 1984 | Aubrey Plaza |
| 52 | Awkwafina | American | Actress, Rapper | 1988 | Awkwafina |
| 53 | Bella Heathcote | Australian | Actress | 1987 | Bella Heathcote |
| 54 | Bryce Dallas Howard | American | Actress, Director | 1981 | Bryce Dallas Howard |
| 55 | Carey Mulligan | British | Actress | 1985 | Carey Mulligan |
| 56 | Carrie Fisher | American | Actress, Writer | 1956 | Carrie Fisher |
| 57 | Catherine Zeta-Jones | Welsh | Actress | 1969 | Catherine Zeta-Jones |
| 58 | Chelsea Handler | American | Comedian, Actress | 1975 | Chelsea Handler |
| 59 | Chloe Grace Moretz | American | Actress | 1997 | Chloë Grace Moretz |
| 60 | Daisy Ridley | British | Actress | 1992 | Daisy Ridley |
| 61 | Diane Kruger | German | Actress | 1976 | Diane Kruger |
| 62 | Elizabeth Banks | American | Actress, Director | 1974 | Elizabeth Banks |
| 63 | Elizabeth Olsen | American | Actress | 1989 | Elizabeth Olsen |
| 64 | Elle Fanning | American | Actress | 1998 | Elle Fanning |
| 65 | Emily Blunt | British | Actress | 1983 | Emily Blunt |
| 66 | Emilia Clarke | British | Actress | 1986 | Emilia Clarke |
| 67 | Eva Green | French | Actress | 1980 | Eva Green |
| 68 | Felicity Jones | British | Actress | 1983 | Felicity Jones |
| 69 | Gwyneth Paltrow | American | Actress, Businesswoman | 1972 | Gwyneth Paltrow |
| 70 | Hailee Steinfeld | American | Actress, Singer | 1996 | Hailee Steinfeld |
| 71 | Helen Mirren | British | Actress | 1945 | Helen Mirren |
| 72 | Hilary Swank | American | Actress, Producer | 1974 | Hilary Swank |
| 73 | Jaimie Alexander | American | Actress | 1984 | Jaimie Alexander |
| 74 | Jennifer Aniston | American | Actress, Producer | 1969 | Jennifer Aniston |
| 75 | Jessica Chastain | American | Actress, Producer | 1977 | Jessica Chastain |
| 76 | Kate Winslet | British | Actress | 1975 | Kate Winslet |
| 77 | Michelle Williams | American | Actress | 1980 | Michelle Williams (actress) |
| 78 | Natalie Dormer | British | Actress | 1982 | Natalie Dormer |
| 79 | Rachel McAdams | Canadian | Actress | 1978 | Rachel McAdams |
| 80 | Rooney Mara | American | Actress | 1985 | Rooney Mara |

---

### Musicians / Singers (60)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Paul McCartney | British | Singer, Songwriter | 1942 | Paul McCartney |
| 2 | Bad Bunny | Puerto Rican | Rapper, Singer | 1994 | Bad Bunny |
| 3 | Beyoncé | American | Singer, Actress | 1981 | Beyoncé |
| 4 | Taylor Swift | American | Singer, Songwriter | 1989 | Taylor Swift |
| 5 | Adele | British | Singer, Songwriter | 1988 | Adele |
| 6 | Ed Sheeran | British | Singer, Songwriter | 1991 | Ed Sheeran |
| 7 | Drake | Canadian | Rapper, Singer | 1986 | Drake (musician) |
| 8 | Rihanna | Barbadian | Singer, Businesswoman | 1988 | Rihanna |
| 9 | Lady Gaga | American | Singer, Actress | 1986 | Lady Gaga |
| 10 | Ariana Grande | American | Singer, Actress | 1993 | Ariana Grande |
| 11 | Billie Eilish | American | Singer, Songwriter | 2001 | Billie Eilish |
| 12 | Bruno Mars | American | Singer, Songwriter | 1985 | Bruno Mars |
| 13 | The Weeknd | Canadian | Singer, Songwriter | 1990 | The Weeknd |
| 14 | Post Malone | American | Rapper, Singer | 1995 | Post Malone |
| 15 | Dua Lipa | British | Singer, Songwriter | 1995 | Dua Lipa |
| 16 | Harry Styles | British | Singer, Actor | 1994 | Harry Styles |
| 17 | Justin Bieber | Canadian | Singer | 1994 | Justin Bieber |
| 18 | Shawn Mendes | Canadian | Singer, Songwriter | 1998 | Shawn Mendes |
| 19 | Khalid | American | Singer, Songwriter | 1998 | Khalid (singer) |
| 20 | John Legend | American | Singer, Songwriter | 1978 | John Legend |
| 21 | Alicia Keys | American | Singer, Songwriter | 1981 | Alicia Keys |
| 22 | SZA | American | Singer, Songwriter | 1990 | SZA |
| 23 | Travis Scott | American | Rapper, Singer | 1991 | Travis Scott |
| 24 | Kendrick Lamar | American | Rapper, Songwriter | 1987 | Kendrick Lamar |
| 25 | J. Cole | American | Rapper, Producer | 1985 | J. Cole |
| 26 | Method Man | American | Rapper, Actor | 1971 | Method Man |
| 27 | Eminem | American | Rapper, Actor | 1972 | Eminem |
| 28 | Snoop Dogg | American | Rapper, Actor | 1971 | Snoop Dogg |
| 29 | Ice Cube | American | Rapper, Actor | 1969 | Ice Cube |
| 30 | 50 Cent | American | Rapper, Actor, Businessman | 1975 | 50 Cent |
| 31 | Jay-Z | American | Rapper, Businessman | 1969 | Jay-Z |
| 32 | Kanye West | American | Rapper, Producer | 1977 | Kanye West |
| 33 | Nicki Minaj | Trinidadian-American | Rapper, Actress | 1982 | Nicki Minaj |
| 34 | Cardi B | American | Rapper, Actress | 1992 | Cardi B |
| 35 | Megan Thee Stallion | American | Rapper | 1995 | Megan Thee Stallion |
| 36 | Luke Bryan | American | Singer, Songwriter | 1976 | Luke Bryan |
| 37 | Blake Tollison Shelton | American | Singer, Songwriter | 1976 | Blake Shelton |
| 38 | Brad Paisley | American | Singer, Songwriter | 1972 | Brad Paisley |
| 39 | Kenny Chesney | American | Singer, Songwriter | 1968 | Kenny Chesney |
| 40 | George Strait | American | Singer, Actor | 1952 | George Strait |
| 41 | Garth Brooks | American | Singer, Songwriter | 1962 | Garth Brooks |
| 42 | Tim McGraw | American | Singer, Actor | 1967 | Tim McGraw |
| 43 | Keith Urban | Australian-American | Singer, Songwriter | 1967 | Keith Urban |
| 44 | Jason Aldean | American | Singer | 1977 | Jason Aldean |
| 45 | Sheryl Suzanne Crow | American | Singer, Songwriter | 1962 | Sheryl Crow |
| 46 | Michael Bublé | Canadian | Singer, Songwriter | 1975 | Michael Bublé |
| 47 | Michael Bolotin | American | Singer, Songwriter | 1953 | Michael Bolton |
| 48 | Andrea Bocelli | Italian | Singer, Songwriter | 1958 | Andrea Bocelli |
| 49 | Elton John | British | Singer, Pianist | 1947 | Elton John |
| 50 | Billy Joel | American | Singer, Pianist | 1949 | Billy Joel |
| 51 | Bruce Springsteen | American | Singer, Songwriter | 1949 | Bruce Springsteen |
| 52 | Bob Dylan | American | Singer, Songwriter | 1941 | Bob Dylan |
| 53 | Paul Simon | American | Singer, Songwriter | 1941 | Paul Simon |
| 54 | John Mayer | American | Singer, Songwriter, Guitarist | 1977 | John Mayer |
| 55 | Stjepan Hauser | Croatian | Cellist | 1986 | Stjepan Hauser |
| 56 | Johannes Oerding | German | Singer, Songwriter | 1981 | Johannes Oerding |
| 57 | Richie Sambora | American | Guitarist, Songwriter | 1959 | Richie Sambora |
| 58 | Michele Morrone | Italian | Actor, Singer, Model | 1990 | Michele Morrone |
| 59 | Cher | American | Singer, Actress | 1946 | Cher |
| 60 | P!nk | American | Singer, Songwriter | 1979 | Pink (singer) |

---

### Athletes (50)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | LeBron James | American | Basketball Player | 1984 | LeBron James |
| 2 | Stephen Curry | American | Basketball Player | 1988 | Stephen Curry |
| 3 | Kevin Durant | American | Basketball Player | 1988 | Kevin Durant |
| 4 | Giannis Antetokounmpo | Greek | Basketball Player | 1994 | Giannis Antetokounmpo |
| 5 | Luka Dončić | Slovenian | Basketball Player | 1999 | Luka Dončić |
| 6 | Nikola Jokić | Serbian | Basketball Player | 1995 | Nikola Jokić |
| 7 | Damian Lillard | American | Basketball Player | 1990 | Damian Lillard |
| 8 | Chris Paul | American | Basketball Player | 1985 | Chris Paul |
| 9 | James Harden | American | Basketball Player | 1989 | James Harden |
| 10 | Russell Westbrook | American | Basketball Player | 1988 | Russell Westbrook |
| 11 | Anthony Davis | American | Basketball Player | 1993 | Anthony Davis |
| 12 | Kyrie Irving | American-Australian | Basketball Player | 1992 | Kyrie Irving |
| 13 | Jimmy Butler | American | Basketball Player | 1989 | Jimmy Butler |
| 14 | Kawhi Leonard | American | Basketball Player | 1991 | Kawhi Leonard |
| 15 | Paul George | American | Basketball Player | 1990 | Paul George |
| 16 | Lionel Messi | Argentine | Footballer | 1987 | Lionel Messi |
| 17 | Cristiano Ronaldo | Portuguese | Footballer | 1985 | Cristiano Ronaldo |
| 18 | Neymar Jr. | Brazilian | Footballer | 1992 | Neymar |
| 19 | Kylian Mbappé | French | Footballer | 1998 | Kylian Mbappé |
| 20 | Erling Haaland | Norwegian | Footballer | 2000 | Erling Haaland |
| 21 | Mohamed Salah | Egyptian | Footballer | 1992 | Mohamed Salah |
| 22 | Vinícius Júnior | Brazilian | Footballer | 2000 | Vinícius Júnior |
| 23 | Kevin De Bruyne | Belgian | Footballer | 1991 | Kevin De Bruyne |
| 24 | Robert Lewandowski | Polish | Footballer | 1988 | Robert Lewandowski |
| 25 | Harry Kane | English | Footballer | 1993 | Harry Kane |
| 26 | Serena Williams | American | Tennis Player | 1981 | Serena Williams |
| 27 | Venus Williams | American | Tennis Player | 1980 | Venus Williams |
| 28 | Rafael Nadal | Spanish | Tennis Player | 1986 | Rafael Nadal |
| 29 | Novak Djokovic | Serbian | Tennis Player | 1987 | Novak Djokovic |
| 30 | Roger Federer | Swiss | Tennis Player | 1981 | Roger Federer |
| 31 | Carlos Alcaraz | Spanish | Tennis Player | 2003 | Carlos Alcaraz |
| 32 | Naomi Osaka | Japanese | Tennis Player | 1997 | Naomi Osaka |
| 33 | Coco Gauff | American | Tennis Player | 2004 | Coco Gauff |
| 34 | Conor McGregor | Irish | MMA Fighter | 1988 | Conor McGregor |
| 35 | Khabib Nurmagomedov | Russian | MMA Fighter | 1988 | Khabib Nurmagomedov |
| 36 | Israel Adesanya | Nigerian | MMA Fighter | 1989 | Israel Adesanya |
| 37 | Jon Jones | American | MMA Fighter | 1987 | Jon Jones (fighter) |
| 38 | Canelo Álvarez | Mexican | Boxer | 1990 | Canelo Álvarez |
| 39 | Tyson Fury | British | Boxer | 1988 | Tyson Fury |
| 40 | Anthony Joshua | British | Boxer | 1989 | Anthony Joshua |
| 41 | Lewis Hamilton | British | Racing Driver | 1985 | Lewis Hamilton |
| 42 | Max Verstappen | Dutch | Racing Driver | 1997 | Max Verstappen |
| 43 | Charles Leclerc | Monégasque | Racing Driver | 1997 | Charles Leclerc |
| 44 | Lando Norris | British | Racing Driver | 1999 | Lando Norris |
| 45 | Tom Brady | American | Football Player | 1977 | Tom Brady |
| 46 | Patrick Mahomes | American | Football Player | 1995 | Patrick Mahomes |
| 47 | Aaron Rodgers | American | Football Player | 1983 | Aaron Rodgers |
| 48 | Shohei Ohtani | Japanese | Baseball Player | 1994 | Shohei Ohtani |
| 49 | Mike Trout | American | Baseball Player | 1991 | Mike Trout |
| 50 | Simone Biles | American | Gymnast | 1997 | Simone Biles |

---

### Comedians (30)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Kevin Hart | American | Comedian, Actor | 1979 | Kevin Hart |
| 2 | Dave Chappelle | American | Comedian, Actor | 1973 | Dave Chappelle |
| 3 | Chris Rock | American | Comedian, Actor | 1965 | Chris Rock |
| 4 | Jerry Seinfeld | American | Comedian, Actor | 1954 | Jerry Seinfeld |
| 5 | Ricky Gervais | British | Comedian, Actor, Writer | 1961 | Ricky Gervais |
| 6 | Bill Burr | American | Comedian, Actor | 1968 | Bill Burr |
| 7 | John Mulaney | American | Comedian, Actor | 1982 | John Mulaney |
| 8 | Ali Wong | American | Comedian, Actress | 1982 | Ali Wong |
| 9 | Trevor Noah | South African | Comedian, Host | 1984 | Trevor Noah |
| 10 | Hasan Minhaj | American | Comedian, Actor | 1985 | Hasan Minhaj |
| 11 | Jim Gaffigan | American | Comedian, Actor | 1966 | Jim Gaffigan |
| 12 | Gabriel Iglesias | American | Comedian, Actor | 1976 | Gabriel Iglesias |
| 13 | Amy Schumer | American | Comedian, Actress | 1981 | Amy Schumer |
| 14 | Sarah Silverman | American | Comedian, Actress | 1970 | Sarah Silverman |
| 15 | Wanda Sykes | American | Comedian, Actress | 1964 | Wanda Sykes |
| 16 | Tracy Morgan | American | Comedian, Actor | 1968 | Tracy Morgan |
| 17 | Cedric the Entertainer | American | Comedian, Actor | 1964 | Cedric the Entertainer |
| 18 | Steve Harvey | American | Comedian, Host | 1957 | Steve Harvey |
| 19 | Ellen DeGeneres | American | Comedian, Host | 1958 | Ellen DeGeneres |
| 20 | Conan O'Brien | American | Comedian, Host | 1963 | Conan O'Brien |
| 21 | Jimmy Fallon | American | Comedian, Host | 1974 | Jimmy Fallon |
| 22 | James Corden | British | Comedian, Host | 1978 | James Corden |
| 23 | Seth Meyers | American | Comedian, Host | 1973 | Seth Meyers |
| 24 | John Oliver | British-American | Comedian, Host | 1977 | John Oliver |
| 25 | Bo Burnham | American | Comedian, Musician | 1990 | Bo Burnham |
| 26 | Pete Davidson | American | Comedian, Actor | 1993 | Pete Davidson |
| 27 | Tom Segura | American | Comedian | 1979 | Tom Segura |
| 28 | Joe Rogan | American | Comedian, Podcaster | 1967 | Joe Rogan |
| 29 | Marc Maron | American | Comedian, Podcaster | 1963 | Marc Maron |
| 30 | Michelle Wolf | American | Comedian | 1985 | Michelle Wolf |

---

### TV Personalities (30)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Oprah Winfrey | American | TV Host, Producer | 1954 | Oprah Winfrey |
| 2 | Gordon Ramsay | British | Chef, TV Host | 1966 | Gordon Ramsay |
| 3 | Ryan Seacrest | American | TV Host, Producer | 1974 | Ryan Seacrest |
| 4 | Andy Cohen | American | TV Host, Producer | 1968 | Andy Cohen |
| 5 | Kelly Clarkson | American | Singer, TV Host | 1982 | Kelly Clarkson |
| 6 | Dr. Phil McGraw | American | TV Host, Author | 1950 | Phil McGraw |
| 7 | Maury Povich | American | TV Host | 1939 | Maury Povich |
| 8 | Jerry Springer | American | TV Host, Politician | 1944 | Jerry Springer |
| 9 | Judge Judy | American | TV Host, Judge | 1942 | Judy Sheindlin |
| 10 | Kaitlan Collins | American | Journalist, Broadcaster | 1992 | Kaitlan Collins |
| 11 | Piers Morgan | British | Journalist, Broadcaster | 1965 | Piers Morgan |
| 12 | Anderson Cooper | American | Journalist, Broadcaster | 1967 | Anderson Cooper |
| 13 | Rachel Maddow | American | Journalist, Broadcaster | 1973 | Rachel Maddow |
| 14 | Sean Hannity | American | Journalist, Broadcaster | 1961 | Sean Hannity |
| 15 | Tucker Carlson | American | Journalist, Broadcaster | 1969 | Tucker Carlson |
| 16 | Megyn Kelly | American | Journalist, Broadcaster | 1970 | Megyn Kelly |
| 17 | Savannah Guthrie | American | Journalist, Broadcaster | 1971 | Savannah Guthrie |
| 18 | Hoda Kotb | American | Journalist, Broadcaster | 1964 | Hoda Kotb |
| 19 | Robin Roberts | American | Journalist, Broadcaster | 1960 | Robin Roberts (newscaster) |
| 20 | Michael Strahan | American | TV Host, Football Player | 1971 | Michael Strahan |
| 21 | Lara Spencer | American | TV Host, Producer | 1969 | Lara Spencer |
| 22 | Gayle King | American | Journalist, Broadcaster | 1954 | Gayle King |
| 23 | Norah O'Donnell | American | Journalist, Broadcaster | 1974 | Norah O'Donnell |
| 24 | Katie Couric | American | Journalist, Broadcaster | 1957 | Katie Couric |
| 25 | Meredith Vieira | American | Journalist, TV Host | 1953 | Meredith Vieira |
| 26 | Kelly Ripa | American | Actress, TV Host | 1970 | Kelly Ripa |
| 27 | Mark Consuelos | American | Actor, TV Host | 1971 | Mark Consuelos |
| 28 | Nick Cannon | American | TV Host, Rapper | 1980 | Nick Cannon |
| 29 | Cat Deeley | British | TV Host, Model | 1976 | Cat Deeley |
| 30 | Tyra Banks | American | Model, TV Host | 1973 | Tyra Banks |

---

### Directors / Producers (25)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Steven Spielberg | American | Director, Producer | 1946 | Steven Spielberg |
| 2 | Martin Scorsese | American | Director, Producer | 1942 | Martin Scorsese |
| 3 | Christopher Nolan | British-American | Director, Producer | 1970 | Christopher Nolan |
| 4 | Quentin Tarantino | American | Director, Writer | 1963 | Quentin Tarantino |
| 5 | James Cameron | Canadian | Director, Producer | 1954 | James Cameron |
| 6 | Ridley Scott | British | Director, Producer | 1937 | Ridley Scott |
| 7 | Peter Jackson | New Zealander | Director, Producer | 1961 | Peter Jackson |
| 8 | Tim Burton | American | Director, Producer | 1958 | Tim Burton |
| 9 | Wes Anderson | American | Director, Producer | 1969 | Wes Anderson |
| 10 | Denis Villeneuve | Canadian | Director, Producer | 1967 | Denis Villeneuve |
| 11 | Greta Gerwig | American | Director, Actress | 1983 | Greta Gerwig |
| 12 | Bong Joon-ho | South Korean | Director, Producer | 1969 | Bong Joon-ho |
| 13 | Guillermo del Toro | Mexican | Director, Producer | 1964 | Guillermo del Toro |
| 14 | Alfonso Cuarón | Mexican | Director, Producer | 1961 | Alfonso Cuarón |
| 15 | Ava DuVernay | American | Director, Producer | 1972 | Ava DuVernay |
| 16 | Ryan Coogler | American | Director, Producer | 1986 | Ryan Coogler |
| 17 | Jordan Peele | American | Director, Comedian | 1979 | Jordan Peele |
| 18 | Taika Waititi | New Zealander | Director, Actor | 1975 | Taika Waititi |
| 19 | Sam Raimi | American | Director, Producer | 1959 | Sam Raimi |
| 20 | J.J. Abrams | American | Director, Producer | 1966 | J. J. Abrams |
| 21 | Jon Favreau | American | Director, Actor | 1966 | Jon Favreau |
| 22 | Ron Howard | American | Director, Producer | 1954 | Ron Howard |
| 23 | Clint Eastwood | American | Director, Actor | 1930 | Clint Eastwood |
| 24 | Spike Lee | American | Director, Producer | 1957 | Spike Lee |
| 25 | David Fincher | American | Director, Producer | 1962 | David Fincher |

---

### Producers — Film, TV, Music (20)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Jerry Bruckheimer | American | Film Producer | 1943 | Jerry Bruckheimer |
| 2 | Brian Grazer | American | Film Producer | 1951 | Brian Grazer |
| 3 | Kevin Feige | American | Film Producer | 1973 | Kevin Feige |
| 4 | Kathleen Kennedy | American | Film Producer | 1953 | Kathleen Kennedy (producer) |
| 5 | Shonda Rhimes | American | TV Producer | 1970 | Shonda Rhimes |
| 6 | Ryan Murphy | American | TV Producer | 1965 | Ryan Murphy (producer) |
| 7 | Greg Berlanti | American | TV Producer | 1972 | Greg Berlanti |
| 8 | Chuck Lorre | American | TV Producer | 1952 | Chuck Lorre |
| 9 | Mark Burnett | British-American | TV Producer | 1960 | Mark Burnett |
| 10 | Simon Cowell | British | TV Producer, Judge | 1959 | Simon Cowell |
| 11 | Pharrell Williams | American | Record Producer, Singer | 1973 | Pharrell Williams |
| 12 | Rick Rubin | American | Record Producer | 1963 | Rick Rubin |
| 13 | Max Martin | Swedish | Record Producer | 1970 | Max Martin |
| 14 | Dr. Dre | American | Record Producer, Rapper | 1965 | Dr. Dre |
| 15 | Timbaland | American | Record Producer | 1972 | Timbaland |
| 16 | Quincy Jones | American | Record Producer | 1933 | Quincy Jones |
| 17 | Brian Eno | British | Record Producer | 1948 | Brian Eno |
| 18 | Mark Ronson | British | Record Producer, DJ | 1975 | Mark Ronson |
| 19 | Jack Antonoff | American | Record Producer, Musician | 1984 | Jack Antonoff |
| 20 | Finneas O'Connell | American | Record Producer, Singer | 1997 | Finneas O'Connell |

---

### Models (20)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Gisele Bündchen | Brazilian | Model, Actress | 1980 | Gisele Bündchen |
| 2 | Kendall Jenner | American | Model, TV Personality | 1995 | Kendall Jenner |
| 3 | Gigi Hadid | American | Model | 1995 | Gigi Hadid |
| 4 | Bella Hadid | American | Model | 1996 | Bella Hadid |
| 5 | Cara Delevingne | British | Model, Actress | 1992 | Cara Delevingne |
| 6 | Kate Moss | British | Model | 1974 | Kate Moss |
| 7 | Naomi Campbell | British | Model, Actress | 1970 | Naomi Campbell |
| 8 | Heidi Klum | German | Model, TV Host | 1973 | Heidi Klum |
| 9 | Adriana Lima | Brazilian | Model, Actress | 1981 | Adriana Lima |
| 10 | Miranda Kerr | Australian | Model, Businesswoman | 1983 | Miranda Kerr |
| 11 | Rosie Huntington-Whiteley | British | Model, Actress | 1987 | Rosie Huntington-Whiteley |
| 12 | Emily Ratajkowski | American | Model, Actress | 1991 | Emily Ratajkowski |
| 13 | Ashley Graham | American | Model, TV Host | 1987 | Ashley Graham |
| 14 | Hailey Bieber | American | Model | 1996 | Hailey Bieber |
| 15 | Chrissy Teigen | American | Model, TV Host | 1985 | Chrissy Teigen |
| 16 | Karlie Kloss | American | Model, Businesswoman | 1992 | Karlie Kloss |
| 17 | Joan Smalls | Puerto Rican | Model | 1988 | Joan Smalls |
| 18 | Liu Wen | Chinese | Model | 1988 | Liu Wen |
| 19 | Candice Swanepoel | South African | Model | 1988 | Candice Swanepoel |
| 20 | Alessandra Ambrosio | Brazilian | Model, Actress | 1981 | Alessandra Ambrosio |

---

### Influencers / Social Media (20)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | MrBeast (Jimmy Donaldson) | American | YouTuber, Philanthropist | 1998 | MrBeast |
| 2 | PewDiePie (Felix Kjellberg) | Swedish | YouTuber | 1989 | PewDiePie |
| 3 | Charli D'Amelio | American | TikToker, Dancer | 2004 | Charli D'Amelio |
| 4 | Addison Rae | American | TikToker, Actress | 2000 | Addison Rae |
| 5 | Logan Paul | American | YouTuber, Boxer | 1995 | Logan Paul |
| 6 | Jake Paul | American | YouTuber, Boxer | 1997 | Jake Paul |
| 7 | KSI (Olajide Olatunji) | British | YouTuber, Rapper, Boxer | 1993 | KSI |
| 8 | Emma Chamberlain | American | YouTuber, Podcaster | 2001 | Emma Chamberlain |
| 9 | James Charles | American | YouTuber, Makeup Artist | 1999 | James Charles |
| 10 | Bretman Rock | Filipino-American | YouTuber, Influencer | 1998 | Bretman Rock |
| 11 | Khaby Lame | Senegalese-Italian | TikToker | 2000 | Khaby Lame |
| 12 | Zach King | American | TikToker, Filmmaker | 1990 | Zach King |
| 13 | Dixie D'Amelio | American | TikToker, Singer | 2001 | Dixie D'Amelio |
| 14 | Loren Gray | American | TikToker, Singer | 2002 | Loren Gray |
| 15 | Spencer X | American | TikToker, Beatboxer | 1992 | Spencer X |
| 16 | Bella Poarch | Filipino-American | TikToker, Singer | 1997 | Bella Poarch |
| 17 | Avani Gregg | American | TikToker, Makeup Artist | 2002 | Avani Gregg |
| 18 | Josh Richards | Canadian | TikToker, Entrepreneur | 2002 | Josh Richards |
| 19 | Noah Beck | American | TikToker, Model | 2001 | Noah Beck |
| 20 | Ryland Storms | American | TikToker, Influencer | 1999 | Ryland Storms |

---

### Entrepreneurs / Business (15)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Elon Musk | South African-American | Entrepreneur, CEO | 1971 | Elon Musk |
| 2 | Mark Zuckerberg | American | Entrepreneur, CEO | 1984 | Mark Zuckerberg |
| 3 | Jeff Bezos | American | Entrepreneur, Founder | 1964 | Jeff Bezos |
| 4 | Richard Branson | British | Entrepreneur, Founder | 1950 | Richard Branson |
| 5 | Bill Gates | American | Entrepreneur, Philanthropist | 1955 | Bill Gates |
| 6 | Warren Buffett | American | Investor, CEO | 1930 | Warren Buffett |
| 7 | Bernard Arnault | French | Entrepreneur, CEO | 1949 | Bernard Arnault |
| 8 | Tim Cook | American | CEO, Apple | 1960 | Tim Cook |
| 9 | Satya Nadella | Indian-American | CEO, Microsoft | 1967 | Satya Nadella |
| 10 | Sundar Pichai | Indian-American | CEO, Google | 1972 | Sundar Pichai |
| 11 | Jack Dorsey | American | Entrepreneur, Founder | 1976 | Jack Dorsey |
| 12 | Brian Chesky | American | Entrepreneur, Airbnb | 1981 | Brian Chesky |
| 13 | Whitney Wolfe Herd | American | Entrepreneur, Bumble | 1989 | Whitney Wolfe Herd |
| 14 | Sara Blakely | American | Entrepreneur, Spanx | 1971 | Sara Blakely |
| 15 | Daymond John | American | Entrepreneur, Investor | 1969 | Daymond John |

---

### Authors / Writers (15)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Stephen King | American | Author | 1947 | Stephen King |
| 2 | J.K. Rowling | British | Author, Philanthropist | 1965 | J. K. Rowling |
| 3 | George R.R. Martin | American | Author, Screenwriter | 1948 | George R. R. Martin |
| 4 | James Patterson | American | Author | 1947 | James Patterson |
| 5 | John Grisham | American | Author, Lawyer | 1955 | John Grisham |
| 6 | Neil Gaiman | British | Author | 1960 | Neil Gaiman |
| 7 | Malcolm Gladwell | Canadian | Author, Journalist | 1963 | Malcolm Gladwell |
| 8 | Brené Brown | American | Author, Researcher | 1965 | Brené Brown |
| 9 | Yuval Noah Harari | Israeli | Author, Historian | 1976 | Yuval Noah Harari |
| 10 | Tara Westover | American | Author, Memoirist | 1986 | Tara Westover |
| 11 | David Sedaris | American | Author, Humorist | 1956 | David Sedaris |
| 12 | Elizabeth Gilbert | American | Author | 1969 | Elizabeth Gilbert |
| 13 | Atul Gawande | American | Author, Surgeon | 1965 | Atul Gawande |
| 14 | Ta-Nehisi Coates | American | Author, Journalist | 1975 | Ta-Nehisi Coates |
| 15 | Rupi Kaur | Indian-Canadian | Author, Poet | 1992 | Rupi Kaur |

---

### Chefs (10)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Gordon Ramsay | British | Chef, TV Host | 1966 | Gordon Ramsay |
| 2 | Jamie Oliver | British | Chef, TV Host | 1975 | Jamie Oliver |
| 3 | Bobby Flay | American | Chef, TV Host | 1964 | Bobby Flay |
| 4 | Wolfgang Puck | Austrian-American | Chef, Restaurateur | 1949 | Wolfgang Puck |
| 5 | Emeril Lagasse | American | Chef, TV Host | 1959 | Emeril Lagasse |
| 6 | Rachael Ray | American | Chef, TV Host | 1968 | Rachael Ray |
| 7 | Guy Fieri | American | Chef, TV Host | 1968 | Guy Fieri |
| 8 | Marcus Samuelsson | Ethiopian-Swedish | Chef, Restaurateur | 1970 | Marcus Samuelsson |
| 9 | Nigella Lawson | British | Food Writer, TV Host | 1960 | Nigella Lawson |
| 10 | Thomas Keller | American | Chef, Restaurateur | 1955 | Thomas Keller |

---

### Dancers (10)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Misty Copeland | American | Ballet Dancer | 1982 | Misty Copeland |
| 2 | Derek Hough | American | Dancer, Choreographer | 1985 | Derek Hough |
| 3 | Julianne Hough | American | Dancer, Actress | 1988 | Julianne Hough |
| 4 | Val Chmerkovskiy | Ukrainian-American | Dancer, Choreographer | 1986 | Val Chmerkovskiy |
| 5 | Maksim Chmerkovskiy | Ukrainian-American | Dancer, Choreographer | 1980 | Maksim Chmerkovskiy |
| 6 | Witney Carson | American | Dancer, Choreographer | 1993 | Witney Carson |
| 7 | Allison Holker | American | Dancer, Choreographer | 1988 | Allison Holker |
| 8 | tWitch (Stephen Boss) | American | Dancer, TV Host | 1982 | Stephen Boss |
| 9 | Savion Glover | American | Dancer, Choreographer | 1973 | Savion Glover |
| 10 | Akram Khan | British | Choreographer, Dancer | 1974 | Akram Khan (choreographer) |

---

### DJs / Electronic Artists (10)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Calvin Harris | Scottish | DJ, Producer | 1984 | Calvin Harris |
| 2 | David Guetta | French | DJ, Producer | 1967 | David Guetta |
| 3 | Martin Garrix | Dutch | DJ, Producer | 1996 | Martin Garrix |
| 4 | Tiësto | Dutch | DJ, Producer | 1969 | Tiësto |
| 5 | Marshmello | American | DJ, Producer | 1992 | Marshmello |
| 6 | Skrillex | American | DJ, Producer | 1988 | Skrillex |
| 7 | Diplo | American | DJ, Producer | 1978 | Diplo |
| 8 | Zedd | Russian-German | DJ, Producer | 1989 | Zedd |
| 9 | Steve Aoki | American | DJ, Producer | 1977 | Steve Aoki |
| 10 | Deadmau5 | Canadian | DJ, Producer | 1981 | Deadmau5 |

---

### Journalists / News (10)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Anderson Cooper | American | Journalist, Broadcaster | 1967 | Anderson Cooper |
| 2 | Christiane Amanpour | British-Iranian | Journalist, Broadcaster | 1958 | Christiane Amanpour |
| 3 | Lester Holt | American | Journalist, Broadcaster | 1959 | Lester Holt |
| 4 | David Muir | American | Journalist, Broadcaster | 1973 | David Muir |
| 5 | Wolf Blitzer | American | Journalist, Broadcaster | 1948 | Wolf Blitzer |
| 6 | Jake Tapper | American | Journalist, Broadcaster | 1969 | Jake Tapper |
| 7 | Chuck Todd | American | Journalist, Broadcaster | 1972 | Chuck Todd |
| 8 | Martha Raddatz | American | Journalist, Broadcaster | 1953 | Martha Raddatz |
| 9 | Yamiche Alcindor | American | Journalist, Broadcaster | 1986 | Yamiche Alcindor |
| 10 | Eugene Daniels | American | Journalist, Broadcaster | 1989 | Eugene Daniels |

---

### Other Public Figures (15)

| # | Name | Nationality | Profession | Birth Year | Wiki Title |
|---|------|-------------|------------|------------|------------|
| 1 | Elon Musk | American | Entrepreneur | 1971 | Elon Musk |
| 2 | Neil deGrasse Tyson | American | Astrophysicist, Author | 1958 | Neil deGrasse Tyson |
| 3 | Bill Nye | American | Science Educator, TV Host | 1955 | Bill Nye |
| 4 | David Attenborough | British | Broadcaster, Naturalist | 1926 | David Attenborough |
| 5 | Bear Grylls | British | Adventurer, TV Host | 1974 | Bear Grylls |
| 6 | Tony Robbins | American | Motivational Speaker | 1960 | Tony Robbins |
| 7 | Deepak Chopra | Indian-American | Author, Speaker | 1946 | Deepak Chopra |
| 8 | Jay Shetty | British | Podcast Host, Speaker | 1987 | Jay Shetty |
| 9 | Mel Robbins | American | Author, Speaker | 1968 | Mel Robbins |
| 10 | Simon Sinek | British-American | Author, Speaker | 1973 | Simon Sinek |
| 11 | Brené Brown | American | Author, Researcher | 1965 | Brené Brown |
| 12 | Esther Perel | Belgian | Psychotherapist, Speaker | 1958 | Esther Perel |
| 13 | Phil McGraw | American | TV Host, Psychologist | 1950 | Phil McGraw |
| 14 | RuPaul | American | Drag Queen, TV Host | 1960 | RuPaul |
| 15 | Marie Kondo | Japanese | Author, Consultant | 1984 | Marie Kondo |

---

## Sample Full Entries (with bios)

### Example 1 — Tom Cruise
```json
{
  "id": "tom-cruise",
  "name": "Tom Cruise",
  "slug": "tom-cruise",
  "category": "actors",
  "subCategories": ["Male Actors", "Producer"],
  "nationality": "American",
  "profession": "Actor, Producer",
  "birthYear": 1962,
  "wikiTitle": "Tom Cruise",
  "bio": "Thomas Cruise Mapother IV is an American actor and producer. One of the world's highest-paid actors, he has received various accolades, including an Honorary Palme d'Or and three Golden Globe Awards, in addition to nominations for four Academy Awards. His films have grossed over $4 billion in North America and over $11.5 billion worldwide, making him one of the highest-grossing box-office stars of all time.",
  "wikiUrl": "https://en.wikipedia.org/wiki/Tom_Cruise",
  "photoUrl": "",
  "status": "published",
  "featured": true,
  "basePrice": null,
  "currency": "USD",
  "sortOrder": 1
}
```

### Example 2 — Beyoncé
```json
{
  "id": "beyonce",
  "name": "Beyoncé",
  "slug": "beyonce",
  "category": "musician",
  "subCategories": ["Singer", "Songwriter", "Actress"],
  "nationality": "American",
  "profession": "Singer, Songwriter, Actress",
  "birthYear": 1981,
  "wikiTitle": "Beyoncé",
  "bio": "Beyoncé Giselle Knowles-Carter is an American singer, songwriter, and actress. Born and raised in Houston, Texas, Beyoncé performed in various singing and dancing competitions as a child. She rose to fame in the late 1990s as the lead singer of Destiny's Child, one of the best-selling girl groups of all time. Beyoncé is often cited as one of the greatest entertainers of her generation.",
  "wikiUrl": "https://en.wikipedia.org/wiki/Beyoncé",
  "photoUrl": "",
  "status": "published",
  "featured": true,
  "basePrice": null,
  "currency": "USD",
  "sortOrder": 2
}
```

### Example 3 — LeBron James
```json
{
  "id": "lebron-james",
  "name": "LeBron James",
  "slug": "lebron-james",
  "category": "athlete",
  "subCategories": ["Basketball", "Entrepreneur"],
  "nationality": "American",
  "profession": "Basketball Player, Entrepreneur",
  "birthYear": 1984,
  "wikiTitle": "LeBron James",
  "bio": "LeBron Raymone James Sr. is an American professional basketball player for the Los Angeles Lakers of the National Basketball Association (NBA). Nicknamed 'King James', he is widely regarded as one of the greatest players in NBA history and is often compared to Michael Jordan in debates over the greatest basketball player of all time. James has won four NBA championships, four MVP awards, and two Olympic gold medals.",
  "wikiUrl": "https://en.wikipedia.org/wiki/LeBron_James",
  "photoUrl": "",
  "status": "published",
  "featured": true,
  "basePrice": null,
  "currency": "USD",
  "sortOrder": 3
}
```

---

## Wikipedia Bio Fetch Script

Save as `scripts/fetch-celeb-bios.mjs` and run with `node scripts/fetch-celeb-bios.mjs`:

```javascript
// Fetches bios from Wikipedia REST API for all celebrities in the seed file.
// Usage: node scripts/fetch-celeb-bios.mjs
// Input:  data/celebrities-seed.json
// Output: data/celebrities-with-bios.json

import fs from 'fs';
import path from 'path';

const INPUT = path.join(process.cwd(), 'data', 'celebrities-seed.json');
const OUTPUT = path.join(process.cwd(), 'data', 'celebrities-with-bios.json');

async function fetchSummary(wikiTitle) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      bio: data.extract || '',
      wikiUrl: data.content_urls?.desktop?.page || '',
      photoUrl: data.thumbnail?.source || data.originalimage?.source || '',
    };
  } catch (err) {
    console.error(`  ❌ Failed: ${wikiTitle} — ${err.message}`);
    return null;
  }
}

async function main() {
  const celebrities = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));
  console.log(`Fetching bios for ${celebrities.length} celebrities...\n`);

  const enriched = [];
  for (let i = 0; i < celebrities.length; i++) {
    const celeb = celebrities[i];
    process.stdout.write(`[${i + 1}/${celebrities.length}] ${celeb.name}... `);
    const info = await fetchSummary(celeb.wikiTitle);
    if (info) {
      celeb.bio = info.bio;
      celeb.wikiUrl = info.wikiUrl;
      celeb.photoUrl = info.photoUrl;
      console.log('✅');
    } else {
      console.log('⚠️ (no bio found)');
    }
    enriched.push(celeb);
    // Be nice to Wikipedia — 200ms delay
    await new Promise((r) => setTimeout(r, 200));
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(enriched, null, 2));
  console.log(`\nDone! ${enriched.length} celebrities written to ${OUTPUT}`);
  const withBios = enriched.filter((c) => c.bio).length;
  console.log(`${withBios} have bios, ${enriched.length - withBios} need manual entry.`);
}

main().catch(console.error);
```

---

## How to Generate the JSON Seed File

The table data above can be converted to JSON with this script:

```javascript
// scripts/generate-celeb-json.mjs
// Converts the markdown table data into celebrities-seed.json
import fs from 'fs';
import path from 'path';

// Paste the table rows here as an array of objects, or parse from the markdown.
// Each row: { name, nationality, profession, birthYear, wikiTitle, category }
// This script generates the slug and fills defaults.

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const celebrities = [
  // Add all rows from the tables above as objects
  { name: 'Tom Cruise', nationality: 'American', profession: 'Actor, Producer', birthYear: 1962, wikiTitle: 'Tom Cruise', category: 'actors' },
  { name: 'Brad Pitt', nationality: 'American', profession: 'Actor, Producer', birthYear: 1963, wikiTitle: 'Brad Pitt', category: 'actors' },
  // ... (continue for all 540)
];

const seed = celebrities.map((c, i) => ({
  id: slugify(c.name),
  name: c.name,
  slug: slugify(c.name),
  category: c.category,
  subCategories: [],
  nationality: c.nationality,
  profession: c.profession,
  birthYear: c.birthYear,
  wikiTitle: c.wikiTitle,
  bio: '',
  wikiUrl: '',
  photoUrl: '',
  status: 'published',
  featured: i < 10, // first 10 featured
  basePrice: null,
  currency: 'USD',
  sortOrder: i + 1,
}));

const out = path.join(process.cwd(), 'data', 'celebrities-seed.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(seed, null, 2));
console.log(`Wrote ${seed.length} celebrities to ${out}`);
```

---

## Summary

| What | Count | Status |
|------|-------|--------|
| Total celebrities listed | 564 | ✅ in this file |
| Categories | 17 | ✅ |
| Full bios | 3 samples | ⚠️ run fetch script for the rest |
| JSON seed file | Template provided | ⚠️ generate from script |
| Wikipedia fetch script | Provided | ✅ ready to run |
| Data schema | TypeScript interface | ✅ |

### Next steps
1. Run `scripts/generate-celeb-json.mjs` to create `data/celebrities-seed.json`
2. Run `scripts/fetch-celeb-bios.mjs` to fetch all 540 bios from Wikipedia
3. Review bios for accuracy (Wikipedia extracts are auto-generated)
4. Upload photos via admin panel (Phase 9d in PHASES.md)
5. Import into database via Prisma seed or admin bulk import
