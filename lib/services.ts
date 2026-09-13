export type ServiceData = {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  longDescription: string;
  talentTypes: string[];
  eventTypes: string[];
  whatIncluded: string[];
  icon: string;
  startingPrice: string;
  duration: string;
  heroImage: string;
  galleryImages: string[];
  process: { step: string; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  pricingNotes: string;
};

export const SERVICE_DATA: ServiceData[] = [
  {
    slug: "autograph-signing",
    title: "Autograph Signing",
    shortDesc: "Book a celebrity for a signed memorabilia event or private signing session.",
    description:
      "Arrange a professional autograph signing session with a celebrity of your choice. Perfect for fan events, memorabilia companies, retail promotions, and collector conventions. We handle the logistics — from talent coordination and travel to on-site security and authentication. Every signed item comes with a certificate of authenticity.",
    longDescription:
      "Autograph signings are one of the most popular ways to engage fans and generate buzz around a brand or event. Whether you are a memorabilia company looking to produce authenticated collectibles, a retail store hosting a promotional event, or a convention organizer wanting to draw crowds, we coordinate the entire signing session from start to finish. Our team manages the celebrity&rsquo;s schedule, travel, accommodation, on-site security, crowd flow, and authentication logistics. We also coordinate with third-party authentication services (PSA, JSA, Beckett) to ensure every signed item carries a verifiable certificate of authenticity. Sessions can be public (fan-facing) or private (closed-set signing for memorabilia production).",
    talentTypes: ["Actors", "Athletes", "Musicians", "TV Personalities", "Authors", "Directors"],
    eventTypes: ["Fan conventions", "Retail store openings", "Memorabilia production", "Collector events", "Sports card shows", "Charity auctions"],
    whatIncluded: [
      "Celebrity talent coordination and negotiation",
      "Travel and accommodation arrangements",
      "On-site security and crowd management",
      "Authentication services (PSA, JSA, or Beckett)",
      "Certificate of authenticity for each signed item",
      "Dedicated event coordinator",
    ],
    icon: "PenTool",
    startingPrice: "$5,000+",
    duration: "2-4 hours typical",
    heroImage: "/images/services/autograph-signing-hero.jpg",
    galleryImages: [
      "/images/services/autograph-signing-gallery-1.jpg",
      "/images/services/autograph-signing-gallery-2.jpg",
      "/images/services/autograph-signing-gallery-3.jpg",
    ],
    process: [
      { step: "1", title: "Submit Inquiry", description: "Tell us which celebrity you want, the event date, location, and estimated number of items to be signed." },
      { step: "2", title: "Talent Confirmation", description: "We contact the celebrity or their management to confirm availability and negotiate the signing fee." },
      { step: "3", title: "Logistics Planning", description: "We coordinate travel, accommodation, venue setup, security, and authentication services." },
      { step: "4", title: "Signing Session", description: "The celebrity arrives on-site and signs items as agreed. Our coordinator supervises the entire session." },
      { step: "5", title: "Authentication & Delivery", description: "Signed items are authenticated by PSA, JSA, or Beckett and delivered with certificates of authenticity." },
    ],
    faq: [
      { question: "How many items can be signed in one session?", answer: "Typically 200-500 items per session, depending on the celebrity and the time booked. We can arrange multi-day sessions for larger quantities." },
      { question: "Can the signing be open to the public?", answer: "Yes. Signings can be public (fan-facing) or private (closed-set for memorabilia production). We handle crowd management for public events." },
      { question: "Which authentication services do you use?", answer: "We coordinate with PSA (Professional Sports Authenticator), JSA (James Spence Authentication), and Beckett Authentication Services." },
      { question: "Can we provide our own items to be signed?", answer: "Yes. You can supply memorabilia, or we can source items on your behalf including photos, jerseys, balls, and posters." },
    ],
    pricingNotes: "Pricing varies based on celebrity tier, number of items, session length, and travel requirements. Deposits are typically 50% to secure the date.",
  },
  {
    slug: "private-reservations",
    title: "Private Reservations",
    shortDesc: "Reserve a celebrity-hosted private dinner, VIP table, or exclusive gathering.",
    description:
      "Host an unforgettable private event with a celebrity guest of honor. Whether it&rsquo;s an intimate dinner, a VIP table at a premium venue, or an exclusive gathering, we coordinate the reservation, appearance, and all logistics. Your guests get a once-in-a-lifetime experience with a star in attendance.",
    longDescription:
      "Private reservations are for clients who want a celebrity presence at an intimate, exclusive event. This could be a private dinner at a fine dining restaurant, a VIP table at a nightclub or lounge, a luxury yacht charter, a resort getaway, or a closed-door corporate retreat. We handle the venue reservation, the celebrity&rsquo;s appearance fee and schedule, transportation, security, and any special requirements (dietary, privacy, etc.). The celebrity can act as host, guest of honor, or simply attend as a VIP presence. Discretion is paramount — NDAs are available for all private bookings, and we coordinate with venue staff to ensure privacy and exclusivity.",
    talentTypes: ["Actors", "Musicians", "Chefs", "TV Personalities", "Influencers", "Athletes", "Entrepreneurs"],
    eventTypes: ["Private dinners", "VIP nightclub tables", "Luxury yacht charters", "Resort events", "Corporate retreats", "Birthday and anniversary parties"],
    whatIncluded: [
      "Celebrity talent coordination and negotiation",
      "Venue reservation assistance",
      "Travel and ground transportation",
      "Private security coordination",
      "NDA and confidentiality agreements",
      "Dedicated event coordinator",
    ],
    icon: "Utensils",
    startingPrice: "$10,000+",
    duration: "3-6 hours typical",
    heroImage: "/images/services/private-reservations-hero.jpg",
    galleryImages: [
      "/images/services/private-reservations-gallery-1.jpg",
      "/images/services/private-reservations-gallery-2.jpg",
      "/images/services/private-reservations-gallery-3.jpg",
    ],
    process: [
      { step: "1", title: "Submit Inquiry", description: "Share your event vision, preferred celebrity, date, venue, and guest count." },
      { step: "2", title: "Talent Matching", description: "We identify celebrities who align with your event style and confirm their availability and appearance fee." },
      { step: "3", title: "Venue & Logistics", description: "We coordinate the venue reservation, transportation, security, and any special requirements." },
      { step: "4", title: "Private Event", description: "The celebrity attends your event as host, guest of honor, or VIP presence. Discretion is maintained throughout." },
      { step: "5", title: "Post-Event", description: "We handle post-event follow-up, feedback, and any additional coordination needed." },
    ],
    faq: [
      { question: "Are NDAs available for private events?", answer: "Yes. Non-disclosure agreements are available for all private bookings and can be customized to your requirements." },
      { question: "Can the celebrity host or just attend?", answer: "Both options are available. The celebrity can act as host, guest of honor, or simply attend as a VIP presence." },
      { question: "What types of venues work best?", answer: "Fine dining restaurants, private estates, luxury yachts, resorts, and exclusive venues all work well. We can help source the right venue." },
      { question: "Can we request specific dietary or privacy requirements?", answer: "Yes. We coordinate all dietary requirements, privacy protocols, and special requests with the venue and the celebrity's team." },
    ],
    pricingNotes: "Pricing depends on celebrity tier, event duration, location, and specific requirements. Premium venues and peak dates may incur additional costs.",
  },
  {
    slug: "celebrity-meet-and-greet",
    title: "Celebrity Meet and Greet",
    shortDesc: "Organize a structured meet & greet with photo ops and fan interaction.",
    description:
      "Bring fans face-to-face with their favorite celebrities through a professionally organized meet and greet. We manage the entire experience — venue setup, security, photo opportunities, autograph stations, and crowd flow. Ideal for conventions, store openings, brand activations, and charity events.",
    longDescription:
      "A meet and greet is a structured fan interaction event where attendees get to meet a celebrity, take photos, get autographs, and have a brief personal interaction. These events are high-energy and require careful logistics planning to ensure smooth crowd flow, reasonable wait times, and a positive experience for both fans and the celebrity. We handle venue setup (including photo backdrops, lighting, and autograph tables), ticketing coordination, security, VIP line management, time management (per-fan interaction limits), and post-event photo delivery. Meet and greets can be standalone events or integrated into larger conventions, store launches, or brand activations. We also coordinate with professional photographers for high-quality photo ops.",
    talentTypes: ["Actors", "Musicians", "Athletes", "Comedians", "TV Personalities", "Influencers", "Authors"],
    eventTypes: ["Fan conventions", "Store openings", "Brand activations", "Charity events", "Movie premieres", "Album releases"],
    whatIncluded: [
      "Celebrity talent coordination and negotiation",
      "Venue setup and layout planning",
      "Photo backdrop and lighting coordination",
      "Professional photographer coordination",
      "Security and crowd flow management",
      "Autograph station setup",
      "Dedicated event coordinator",
    ],
    icon: "Users",
    startingPrice: "$7,500+",
    duration: "2-4 hours typical",
    heroImage: "/images/services/celebrity-meet-and-greet-hero.jpg",
    galleryImages: [
      "/images/services/celebrity-meet-and-greet-gallery-1.jpg",
      "/images/services/celebrity-meet-and-greet-gallery-2.jpg",
      "/images/services/celebrity-meet-and-greet-gallery-3.jpg",
    ],
    process: [
      { step: "1", title: "Submit Inquiry", description: "Tell us the celebrity, event type, expected attendance, date, and venue." },
      { step: "2", title: "Talent Confirmation", description: "We confirm the celebrity's availability and negotiate appearance fees and requirements." },
      { step: "3", title: "Event Setup", description: "We coordinate venue layout, photo backdrops, lighting, autograph stations, and security." },
      { step: "4", title: "Meet & Greet", description: "Fans meet the celebrity, take photos, get autographs, and enjoy a structured interaction." },
      { step: "5", title: "Photo Delivery", description: "Professional photos are processed and delivered to attendees through your chosen platform." },
    ],
    faq: [
      { question: "How long does each fan interaction last?", answer: "Typically 30-60 seconds per fan for photo ops, and 10-15 seconds for autographs. We manage timing to keep lines moving." },
      { question: "Can we sell tickets for the meet and greet?", answer: "Yes. We can coordinate with ticketing platforms and help structure VIP packages and pricing." },
      { question: "Do you provide professional photographers?", answer: "Yes. We coordinate with professional photographers for high-quality photo ops, and can arrange printing on-site." },
      { question: "What if the celebrity cancels?", answer: "We work to find a replacement celebrity or reschedule. Our booking agreement includes cancellation and rescheduling terms." },
    ],
    pricingNotes: "Pricing varies based on celebrity tier, expected attendance, event duration, and venue requirements. VIP packages can be structured for additional revenue.",
  },
  {
    slug: "charity-foundation-events",
    title: "Charity Foundation/Events",
    shortDesc: "Engage celebrities for galas, fundraisers, and foundation-backed initiatives.",
    description:
      "Amplify your charitable cause with celebrity participation. We connect you with talent who are passionate about your mission for galas, fundraising auctions, awareness campaigns, and foundation events. Celebrity involvement dramatically increases attendance, donations, and media coverage for your cause.",
    longDescription:
      "Celebrity involvement in charity events is one of the most effective ways to increase donations, attract media coverage, and elevate the profile of your cause. We work with foundations, nonprofits, and private donors to identify celebrities who have a genuine connection to the cause — whether through personal experience, philanthropic history, or brand alignment. Celebrities can participate as hosts, keynote speakers, auction presenters, performers, or VIP guests. We handle the celebrity&rsquo;s fee (which is often reduced or waived for charitable causes), travel, accommodation, and on-site coordination. We also coordinate press and media opportunities to maximize exposure for your foundation. Many celebrities have their own foundations or causes they actively support, and we can help match you with the right talent for your mission.",
    talentTypes: ["Actors", "Musicians", "Athletes", "Entrepreneurs", "TV Personalities", "Authors", "Journalists"],
    eventTypes: ["Charity galas", "Fundraising auctions", "Awareness campaigns", "Foundation events", "Benefit concerts", "Silent auctions"],
    whatIncluded: [
      "Celebrity talent matching based on cause alignment",
      "Negotiation (reduced rates for charitable causes)",
      "Travel and accommodation arrangements",
      "Press and media coordination",
      "On-site event coordination",
      "Dedicated event coordinator",
    ],
    icon: "Heart",
    startingPrice: "$5,000+",
    duration: "3-5 hours typical",
    heroImage: "/images/services/charity-foundation-events-hero.jpg",
    galleryImages: [
      "/images/services/charity-foundation-events-gallery-1.jpg",
      "/images/services/charity-foundation-events-gallery-2.jpg",
      "/images/services/charity-foundation-events-gallery-3.jpg",
    ],
    process: [
      { step: "1", title: "Submit Inquiry", description: "Share your cause, event type, target celebrity, date, and fundraising goals." },
      { step: "2", title: "Cause Matching", description: "We identify celebrities with a genuine connection to your cause and negotiate reduced or waived fees." },
      { step: "3", title: "Event Coordination", description: "We handle travel, accommodation, press coordination, and on-site logistics for the celebrity." },
      { step: "4", title: "Charity Event", description: "The celebrity participates as host, speaker, auction presenter, or performer at your event." },
      { step: "5", title: "Media & Follow-Up", description: "We coordinate press coverage and post-event content to maximize exposure for your cause." },
    ],
    faq: [
      { question: "Do celebrities reduce their fees for charity events?", answer: "Many celebrities offer reduced or waived fees for charitable causes, especially those aligned with their personal philanthropic interests." },
      { question: "Can the celebrity participate remotely?", answer: "Yes. We can arrange virtual appearances, video messages, or live-streamed participation for celebrities who cannot attend in person." },
      { question: "Can you help with press and media coverage?", answer: "Yes. We coordinate with PR teams and media outlets to maximize coverage for your cause and the celebrity's involvement." },
      { question: "Do you work with specific types of charities?", answer: "We work with all types of charitable organizations including foundations, nonprofits, schools, and private donor initiatives." },
    ],
    pricingNotes: "Charity events often receive discounted rates. Pricing depends on celebrity, event scope, and cause alignment. Many celebrities waive fees for causes they personally support.",
  },
  {
    slug: "product-endorsements",
    title: "Product Endorsements",
    shortDesc: "Secure celebrity endorsements for products, brands, and marketing campaigns.",
    description:
      "Partner with the right celebrity to endorse your product or brand. We facilitate the match, negotiate terms, and coordinate the campaign — from social media posts and TV spots to print ads and in-person appearances. A well-chosen endorsement builds instant credibility and drives measurable sales.",
    longDescription:
      "Celebrity product endorsements are one of the most powerful marketing tools available. A well-matched celebrity endorsement can increase brand awareness by up to 20x, drive significant sales lifts, and create lasting brand associations in the consumer&rsquo;s mind. We work with brands to identify celebrities whose image, audience, and values align with the product. We then negotiate endorsement deals that may include social media posts (Instagram, TikTok, YouTube), TV commercials, print and digital ads, in-person appearances at product launches, and exclusive brand ambassador agreements. We handle contract negotiation, usage rights, exclusivity clauses, approval processes, and content coordination. We also work with the celebrity&rsquo;s management team to ensure the endorsement is authentic and aligns with their personal brand. Endorsement deals can range from single-post campaigns to multi-year brand ambassador partnerships.",
    talentTypes: ["Actors", "Athletes", "Musicians", "Influencers", "Models", "Entrepreneurs", "TV Personalities"],
    eventTypes: ["Social media campaigns", "TV commercials", "Print and digital ads", "Product launch events", "Brand ambassador programs", "Influencer partnerships"],
    whatIncluded: [
      "Celebrity talent matching and brand alignment analysis",
      "Contract negotiation (fees, usage rights, exclusivity)",
      "Campaign coordination (social, TV, print, digital)",
      "Content approval workflow",
      "Usage rights and licensing coordination",
      "Dedicated campaign coordinator",
    ],
    icon: "Megaphone",
    startingPrice: "$15,000+",
    duration: "Varies by campaign scope",
    heroImage: "/images/services/product-endorsements-hero.jpg",
    galleryImages: [
      "/images/services/product-endorsements-gallery-1.jpg",
      "/images/services/product-endorsements-gallery-2.jpg",
      "/images/services/product-endorsements-gallery-3.jpg",
    ],
    process: [
      { step: "1", title: "Brand Analysis", description: "We analyze your brand, target audience, and campaign goals to identify the right celebrity match." },
      { step: "2", title: "Talent Matching", description: "We present celebrities whose image, audience, and values align with your product or brand." },
      { step: "3", title: "Contract Negotiation", description: "We negotiate fees, usage rights, exclusivity clauses, and content approval processes." },
      { step: "4", title: "Content Production", description: "We coordinate the celebrity's content creation including social posts, commercials, and photo shoots." },
      { step: "5", title: "Campaign Launch", description: "Content goes live across agreed channels. We monitor performance and coordinate any additional content needs." },
    ],
    faq: [
      { question: "What types of endorsements are available?", answer: "Single social media posts, multi-post campaigns, TV commercials, print ads, digital campaigns, and multi-year brand ambassador partnerships." },
      { question: "Can we get exclusivity in our industry?", answer: "Yes. Exclusivity clauses can be negotiated to prevent the celebrity from endorsing competing brands during the contract term." },
      { question: "Who handles content approval?", answer: "We manage the full approval workflow between your brand and the celebrity's management team to ensure both parties are satisfied." },
      { question: "What are usage rights?", answer: "Usage rights define where and for how long the endorsement content can be used. We negotiate these terms as part of the contract." },
    ],
    pricingNotes: "Endorsement pricing varies widely based on celebrity tier, campaign scope, usage rights, exclusivity, and contract duration. Multi-year deals are typically more cost-effective per year.",
  },
  {
    slug: "nightclub-appearances",
    title: "Nightclub Appearances",
    shortDesc: "Book celebrities for hosted nightclub appearances and VIP events.",
    description:
      "Draw crowds and elevate your venue with a celebrity-hosted nightclub appearance. We book DJs, performers, athletes, and social media stars for hosted nights, bottle service events, and VIP parties. Our team coordinates the talent&rsquo;s arrival, security, and promotional materials to maximize your event&rsquo;s impact.",
    longDescription:
      "Nightclub appearances are a proven way to drive foot traffic, increase bottle service revenue, and create buzz around your venue. We book a wide range of talent for nightclub appearances — from A-list DJs and music performers to athletes, influencers, and reality TV stars. The celebrity can host the night, perform a set, walk the red carpet, or simply be present as a VIP guest. We handle the talent booking, fee negotiation, travel, rider requirements (dressing room, hospitality, technical), security coordination, and promotional support (social media announcements, flyer design, press outreach). We also coordinate arrival logistics — VIP entrance, paparazzi management, and timing to maximize the celebrity&rsquo;s impact on the crowd. Nightclub appearances are typically booked for 2-4 hour windows, with the celebrity arriving at a coordinated time for maximum visibility.",
    talentTypes: ["DJs", "Musicians", "Athletes", "Influencers", "Models", "TV Personalities"],
    eventTypes: ["Hosted nightclub nights", "Bottle service events", "VIP parties", "Red carpet events", "Album release parties", "Season opening events"],
    whatIncluded: [
      "Celebrity talent coordination and negotiation",
      "Rider and hospitality requirements coordination",
      "Security and VIP entrance coordination",
      "Promotional material support (social, flyers, press)",
      "Arrival timing and logistics management",
      "Dedicated event coordinator",
    ],
    icon: "Music",
    startingPrice: "$8,000+",
    duration: "2-4 hours typical",
    heroImage: "/images/services/nightclub-appearances-hero.jpg",
    galleryImages: [
      "/images/services/nightclub-appearances-gallery-1.jpg",
      "/images/services/nightclub-appearances-gallery-2.jpg",
      "/images/services/nightclub-appearances-gallery-3.jpg",
    ],
    process: [
      { step: "1", title: "Submit Inquiry", description: "Tell us your venue, target celebrity, event date, and expected crowd size." },
      { step: "2", title: "Talent Booking", description: "We book the celebrity and negotiate appearance fees, rider requirements, and arrival timing." },
      { step: "3", title: "Promotion", description: "We coordinate promotional materials including social media announcements, flyers, and press outreach." },
      { step: "4", title: "Event Night", description: "The celebrity arrives via VIP entrance, with security and paparazzi management for maximum impact." },
      { step: "5", title: "Post-Event", description: "We coordinate post-event content and any follow-up promotional activities." },
    ],
    faq: [
      { question: "What time does the celebrity arrive?", answer: "Arrival timing is coordinated to maximize the celebrity's impact on the crowd, typically during peak hours between 11 PM and 1 AM." },
      { question: "Can the celebrity perform a DJ set?", answer: "Yes. Many celebrities can perform DJ sets, live performances, or host the night depending on their talents and your event needs." },
      { question: "What are rider requirements?", answer: "Riders include dressing room, hospitality, technical, and beverage requirements. We handle all rider coordination with your venue." },
      { question: "Do you handle promotion for the event?", answer: "Yes. We coordinate social media announcements, flyer design, and press outreach to maximize event visibility." },
    ],
    pricingNotes: "Pricing varies based on celebrity tier, venue location, event duration, and rider requirements. Peak nights (holidays, weekends) may incur premium fees.",
  },
  {
    slug: "business-promotion-adverts",
    title: "Business Promotion & Adverts",
    shortDesc: "Use celebrity star power to promote your business through advertising campaigns.",
    description:
      "Leverage celebrity star power to promote your business. From TV commercials and digital ad campaigns to grand openings and product launches, we connect you with talent who align with your brand. Celebrity-driven promotions generate significantly higher engagement and conversion rates than traditional advertising.",
    longDescription:
      "Celebrity-driven business promotions combine the reach of advertising with the credibility of a trusted public figure. We help businesses of all sizes — from local companies to national brands — integrate celebrity talent into their marketing campaigns. This can include TV and radio commercials, digital ad campaigns (YouTube pre-roll, social media ads, streaming platforms), grand opening events, product launch appearances, and in-store promotional events. We work with you to identify the right celebrity for your target audience and budget, negotiate the deal, coordinate production logistics (studio booking, wardrobe, script approval), and manage the content approval process. Celebrity-driven promotions typically generate 3-5x higher engagement rates than non-celebrity campaigns, making them a high-ROI marketing investment.",
    talentTypes: ["Actors", "Entrepreneurs", "Athletes", "Musicians", "Influencers", "TV Personalities", "Chefs"],
    eventTypes: ["TV and radio commercials", "Digital ad campaigns", "Grand opening events", "Product launch appearances", "In-store promotional events", "Streaming platform ads"],
    whatIncluded: [
      "Celebrity talent matching for target audience",
      "Contract negotiation (fees, usage, exclusivity)",
      "Production logistics coordination (studio, wardrobe, script)",
      "Content approval workflow",
      "Usage rights and media buy coordination",
      "Dedicated campaign coordinator",
    ],
    icon: "Briefcase",
    startingPrice: "$12,000+",
    duration: "Varies by campaign scope",
    heroImage: "/images/services/business-promotion-adverts-hero.jpg",
    galleryImages: [
      "/images/services/business-promotion-adverts-gallery-1.jpg",
      "/images/services/business-promotion-adverts-gallery-2.jpg",
      "/images/services/business-promotion-adverts-gallery-3.jpg",
    ],
    process: [
      { step: "1", title: "Brand Discovery", description: "We learn about your business, target audience, and marketing objectives to identify the right celebrity." },
      { step: "2", title: "Talent Matching", description: "We present celebrities who align with your brand values and resonate with your target market." },
      { step: "3", title: "Production Planning", description: "We coordinate studio booking, wardrobe, script approval, and production logistics." },
      { step: "4", title: "Content Creation", description: "The celebrity films commercials, records ads, or appears at your promotional event as agreed." },
      { step: "5", title: "Campaign Management", description: "We manage the content approval workflow, media buy coordination, and campaign performance monitoring." },
    ],
    faq: [
      { question: "What types of promotions work best?", answer: "TV commercials, digital ad campaigns, grand openings, product launches, and in-store promotional events all work well with celebrity talent." },
      { question: "Can the celebrity appear at our grand opening?", answer: "Yes. We coordinate in-person appearances for grand openings, product launches, and promotional events." },
      { question: "Do you handle production logistics?", answer: "Yes. We coordinate studio booking, wardrobe, script approval, and all production logistics with your team." },
      { question: "What ROI can we expect?", answer: "Celebrity-driven promotions typically generate 3-5x higher engagement rates than non-celebrity campaigns, making them a high-ROI marketing investment." },
    ],
    pricingNotes: "Pricing depends on celebrity tier, campaign scope, production requirements, and media buy. Package deals combining appearances with content creation offer better value.",
  },
  {
    slug: "tradeshow-appearance",
    title: "Tradeshow Appearance",
    shortDesc: "Attract foot traffic with a celebrity appearance at your tradeshow booth.",
    description:
      "Stand out on the tradeshow floor with a celebrity appearance at your booth. We book talent who draw crowds, sign autographs, and engage with attendees — driving massive foot traffic to your brand. Full coordination includes travel, scheduling, on-site security, and promotional support.",
    longDescription:
      "Tradeshows are competitive environments where every booth is fighting for attendee attention. A celebrity appearance is one of the most effective ways to cut through the noise and draw massive foot traffic to your booth. We book celebrities who align with your industry and target audience — from business leaders and entrepreneurs for B2B tech conferences, to athletes and entertainers for consumer shows. The celebrity can sign autographs, take photos with attendees, give a short talk or presentation, host a product demo, or simply be present as a VIP attraction. We handle all logistics: travel, accommodation, booth scheduling, on-site security, crowd flow management, and promotional materials (booth signage, social media announcements, pre-show email campaigns). Tradeshow appearances are typically booked for 2-4 hour windows per day, with options for multi-day appearances.",
    talentTypes: ["Actors", "Athletes", "Entrepreneurs", "TV Personalities", "Influencers", "Authors", "Journalists"],
    eventTypes: ["Industry tradeshows", "Consumer expos", "Tech conferences", "Auto shows", "Comic conventions", "Health and wellness expos"],
    whatIncluded: [
      "Celebrity talent coordination and negotiation",
      "Travel and accommodation arrangements",
      "Booth scheduling and crowd flow management",
      "On-site security coordination",
      "Promotional material support (signage, social, email)",
      "Dedicated event coordinator",
    ],
    icon: "Building2",
    startingPrice: "$6,000+",
    duration: "2-4 hours per day",
    heroImage: "/images/services/tradeshow-appearance-hero.jpg",
    galleryImages: [
      "/images/services/celebrity-meet-and-greet-gallery-3.jpg",
      "/images/services/celebrity-meet-and-greet-gallery-2.jpg",
      "/images/services/tradeshow-appearance-gallery-3.jpg",
    ],
    process: [
      { step: "1", title: "Submit Inquiry", description: "Tell us the tradeshow, your booth location, target celebrity, and dates." },
      { step: "2", title: "Talent Booking", description: "We book the celebrity and coordinate their schedule for the appearance window." },
      { step: "3", title: "Booth Coordination", description: "We coordinate booth scheduling, crowd flow, security, and promotional materials." },
      { step: "4", title: "Tradeshow Appearance", description: "The celebrity signs autographs, takes photos, demos products, or gives talks at your booth." },
      { step: "5", title: "Lead Follow-Up", description: "We help coordinate post-show follow-up with leads generated during the appearance." },
    ],
    faq: [
      { question: "Can the celebrity appear for multiple days?", answer: "Yes. Multi-day appearances are available and typically offered at a discounted daily rate." },
      { question: "What can the celebrity do at our booth?", answer: "Sign autographs, take photos with attendees, give a short talk, host a product demo, or simply be present as a VIP attraction." },
      { question: "Do you handle promotional materials?", answer: "Yes. We coordinate booth signage, social media announcements, and pre-show email campaigns to drive traffic to your booth." },
      { question: "How do you manage crowd flow?", answer: "We coordinate with your team to manage lines, time per attendee, and crowd control to ensure a smooth experience." },
    ],
    pricingNotes: "Pricing varies based on celebrity tier, number of days, hours per day, and travel requirements. Multi-day packages offer better value per day.",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    shortDesc: "Book celebrity speakers, hosts, and entertainers for corporate functions.",
    description:
      "Elevate your corporate event with a celebrity speaker, host, or performer. Whether it&rsquo;s a conference keynote, an awards gala, a holiday party, or a product launch, we match you with the right talent for your audience and budget. We handle contracts, travel, technical requirements, and on-site coordination.",
    longDescription:
      "Corporate events benefit enormously from celebrity talent — whether as a keynote speaker, an awards host, a performer, or a VIP guest. A well-chosen celebrity can elevate the perceived value of your event, increase attendance, generate social media buzz, and create a memorable experience for attendees. We work with corporate event planners, HR teams, and marketing departments to identify the right celebrity for the event&rsquo;s goals and audience. Celebrities can deliver keynote speeches (business leaders, authors, journalists), host awards ceremonies (TV personalities, comedians), perform (musicians, DJs), or serve as brand ambassadors for product launches. We handle the full scope: contract negotiation, travel and accommodation, technical rider requirements (AV, staging, lighting), rehearsal coordination, and on-site management. We also coordinate with your event production team to ensure the celebrity&rsquo;s segment integrates seamlessly into the event program.",
    talentTypes: ["Actors", "Entrepreneurs", "Athletes", "Authors", "Journalists", "Musicians", "TV Personalities", "Comedians"],
    eventTypes: ["Corporate conferences", "Award galas", "Holiday parties", "Product launches", "Sales kickoffs", "Leadership summits"],
    whatIncluded: [
      "Celebrity talent matching for event goals and audience",
      "Contract negotiation and coordination",
      "Travel and accommodation arrangements",
      "Technical rider coordination (AV, staging, lighting)",
      "Rehearsal and program integration",
      "Dedicated event coordinator",
    ],
    icon: "Building",
    startingPrice: "$10,000+",
    duration: "1-4 hours typical",
    heroImage: "/images/services/corporate-events-hero.jpg",
    galleryImages: [
      "/images/services/celebrity-meet-and-greet-gallery-3.jpg",
      "/images/services/private-reservations-gallery-2.jpg",
      "/images/services/corporate-events-gallery-3.jpg",
    ],
    process: [
      { step: "1", title: "Event Discovery", description: "We learn about your corporate event, audience, goals, and budget to identify the right celebrity." },
      { step: "2", title: "Talent Matching", description: "We present celebrities suited to your event type — keynote speakers, hosts, performers, or VIP guests." },
      { step: "3", title: "Contract & Rider", description: "We handle contract negotiation, travel, technical rider requirements, and rehearsal coordination." },
      { step: "4", title: "Corporate Event", description: "The celebrity delivers their keynote, hosts the awards, performs, or attends as agreed." },
      { step: "5", title: "Post-Event", description: "We coordinate post-event content, feedback, and any follow-up activities." },
    ],
    faq: [
      { question: "What types of celebrities work best for corporate events?", answer: "Business leaders, authors, and journalists for keynotes. TV personalities and comedians for hosting. Musicians and DJs for entertainment." },
      { question: "Can the celebrity customize their keynote?", answer: "Yes. We coordinate with the celebrity's team to customize their presentation to your event theme and audience." },
      { question: "Do you handle technical requirements?", answer: "Yes. We coordinate AV, staging, lighting, and all technical rider requirements with your event production team." },
      { question: "Can the celebrity participate in rehearsals?", answer: "Yes. We coordinate rehearsal schedules to ensure the celebrity's segment integrates seamlessly into your event program." },
    ],
    pricingNotes: "Pricing depends on celebrity tier, event type, duration, and technical requirements. Keynote speakers and performers are priced differently based on preparation needs.",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICE_DATA.find((s) => s.slug === slug);
}
