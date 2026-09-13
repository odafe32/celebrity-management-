export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const SERVICES: NavItem[] = [
  { label: "Autograph Signing", href: "/services/autograph-signing" },
  { label: "Private Reservations", href: "/services/private-reservations" },
  { label: "Celebrity Meet and Greet", href: "/services/celebrity-meet-and-greet" },
  { label: "Charity Foundation/Events", href: "/services/charity-foundation-events" },
  { label: "Product Endorsements", href: "/services/product-endorsements" },
  { label: "Nightclub Appearances", href: "/services/nightclub-appearances" },
  { label: "Business Promotion & Adverts", href: "/services/business-promotion-adverts" },
  { label: "Tradeshow Appearance", href: "/services/tradeshow-appearance" },
  { label: "Corporate Events", href: "/services/corporate-events" },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Celebrities", href: "/celebrities" },
  { label: "About", href: "/about" },
  { label: "Celebrity Services", href: "/celebrity-services", children: SERVICES },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Promotion", href: "/promotion" },
  { label: "Book a Celebrity", href: "/book-a-celebrity" },
];

export const CATEGORIES: { name: string; slug: string; count: number }[] = [
  { name: "Actors", slug: "actors", count: 35 },
  { name: "Actress", slug: "actress", count: 23 },
  { name: "Musicians", slug: "musicians", count: 37 },
  { name: "Athletes", slug: "athletes", count: 16 },
  { name: "Comedians", slug: "comedians", count: 4 },
  { name: "TV Personalities", slug: "tv-personality", count: 2 },
  { name: "Directors", slug: "directors", count: 3 },
  { name: "Producers", slug: "producers", count: 0 },
  { name: "Models", slug: "models", count: 0 },
  { name: "Influencers", slug: "influencers", count: 1 },
  { name: "Entrepreneurs", slug: "entrepreneurs", count: 2 },
  { name: "Authors", slug: "authors", count: 2 },
  { name: "Chefs", slug: "chefs", count: 1 },
  { name: "Dancers", slug: "dancers", count: 0 },
  { name: "DJs", slug: "djs", count: 1 },
  { name: "Journalists", slug: "journalists", count: 0 },
];

export const TESTIMONIALS: { name: string; date: string; text: string; rating: number }[] = [
  {
    name: "Tracy Shades",
    date: "Nov 10, 2025",
    text: "I'm grateful to this agency — I had the opportunity to meet Keanu Reeves. The security during the meet was wonderful.",
    rating: 5,
  },
  {
    name: "James Carter",
    date: "Oct 28, 2025",
    text: "Booked a celebrity for our corporate event. Everything was handled professionally from start to finish.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    date: "Oct 15, 2025",
    text: "The meet and greet exceeded our expectations. Discreet, well-organized, and truly memorable.",
    rating: 5,
  },
];

export const SITE_NAME = "Ashencrest";

export const CONTACT = {
  email: "bookings@ashencrest.com",
  phone: " ",
  whatsapp: " ",
  address: "Los Angeles, CA, USA",
};

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Book a Celebrity", href: "/book-a-celebrity" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Promotion", href: "/promotion" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};
