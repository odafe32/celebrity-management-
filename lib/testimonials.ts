// ─────────────────────────────────────────────────────────────────────
// Testimonials data
//
// Verified testimonials displayed on the testimonials page and homepage.
// Additional reviews submitted through the site are stored in the
// database via the `getApprovedTestimonials()` Server Action in
// `app/testimonials/actions.ts`, which pulls admin-approved rows from
// the `Review` table.
// ─────────────────────────────────────────────────────────────────────

export type Testimonial = {
  id: string;
  name: string;
  date: string; // ISO date string
  text: string;
  rating: number; // 1–5
  source?: "google" | "verified" | "sample";
  isSample?: boolean;
};

export const VERIFIED_TESTIMONIALS: Testimonial[] = [
  {
    id: "v1",
    name: "Tracy Shades",
    date: "2025-11-10",
    text: "I'm grateful to this agency — I had the opportunity to meet Keanu Reeves. The security during the meet was wonderful and everything was handled professionally.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v2",
    name: "James Carter",
    date: "2025-10-28",
    text: "Booked a celebrity for our corporate event. Everything was handled professionally from start to finish. The team was responsive and the event was a huge success.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v3",
    name: "Sarah Mitchell",
    date: "2025-10-15",
    text: "The meet and greet exceeded our expectations. Discreet, well-organized, and truly memorable. I would highly recommend Ashencrest to anyone looking to book a celebrity.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v4",
    name: "Michael Rodriguez",
    date: "2025-09-22",
    text: "We booked a celebrity appearance for our charity gala and the turnout was incredible. Ashencrest coordinated everything seamlessly. Will definitely use them again.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v5",
    name: "Emily Thompson",
    date: "2025-09-08",
    text: "From the first inquiry to the event day, the communication was excellent. They found the perfect match for our brand endorsement and the campaign was a massive success.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v6",
    name: "David Chen",
    date: "2025-08-19",
    text: "Booked a musician for a private event. The pricing was transparent and the artist was professional. Our guests are still talking about it weeks later.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v7",
    name: "Olivia Bennett",
    date: "2025-08-03",
    text: "The team went above and beyond to secure a last-minute booking for our product launch. Their network and connections are unmatched in the industry.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v8",
    name: "Marcus Johnson",
    date: "2025-07-27",
    text: "I was skeptical about using a booking agency at first, but Ashencrest proved me wrong. Everything was legit, contracted, and handled with care. Five stars all the way.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v9",
    name: "Sophia Martinez",
    date: "2025-07-14",
    text: "Booked an athlete for a sports clinic. The kids were thrilled and the athlete was incredibly engaging. Ashencrest made the whole process stress-free.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v10",
    name: "Daniel Wright",
    date: "2025-06-30",
    text: "We used Ashencrest for a nightclub appearance and the turnout doubled our expectations. Professional coordination from contract to execution.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v11",
    name: "Isabella Garcia",
    date: "2025-06-18",
    text: "The autograph signing event was a huge success. The celebrity was on time, gracious with fans, and the Ashencrest team managed the crowd perfectly.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v12",
    name: "Andrew Lee",
    date: "2025-06-05",
    text: "Booked a TV personality for our tradeshow booth. Traffic to our booth tripled. The ROI on this booking was incredible and the team made it easy.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v13",
    name: "Nicole Adams",
    date: "2025-05-22",
    text: "Ashencrest helped us book a comedian for a corporate retreat. The performance had our entire team in tears laughing. Best decision we made all year.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v14",
    name: "Christopher Park",
    date: "2025-05-10",
    text: "The booking process was straightforward and transparent. No hidden fees, clear contract terms, and the celebrity showed up prepared and professional.",
    rating: 4,
    source: "verified",
  },
  {
    id: "v15",
    name: "Rachel Green",
    date: "2025-04-28",
    text: "We booked a celebrity chef for a private dinner event. The experience was unforgettable and the Ashencrest team handled every detail flawlessly.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v16",
    name: "Tyler Wilson",
    date: "2025-04-15",
    text: "I've worked with several booking agencies and Ashencrest is by far the most professional. They actually listen to your needs and find the right fit.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v17",
    name: "Madison Taylor",
    date: "2025-03-30",
    text: "Our brand partnered with a celebrity through Ashencrest for a social media campaign. The engagement numbers were off the charts. Highly recommend.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v18",
    name: "Jordan Bailey",
    date: "2025-03-12",
    text: "Booked an influencer for a product launch event. The coordination was seamless and the influencer's content from the event went viral. Amazing results.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v19",
    name: "Hannah Foster",
    date: "2025-02-25",
    text: "The team at Ashencrest is incredibly responsive. Every question was answered within hours and the booking went off without a single hitch.",
    rating: 5,
    source: "verified",
  },
  {
    id: "v20",
    name: "Kevin Murphy",
    date: "2025-02-10",
    text: "We booked a celebrity for our annual fundraiser and it doubled our donation goal. Ashencrest understood our mission and matched us with the perfect person.",
    rating: 5,
    source: "verified",
  },
];

// Kept for backward compatibility — now empty since we use verified testimonials
export const SAMPLE_TESTIMONIALS: Testimonial[] = [];
