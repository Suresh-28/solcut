import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export type SiteContent = {
  hero: {
    eyebrow: string;
    headlineLines: string[];
    intro: string;
  };
  marquee: string;
  work: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    projects: { n: string; title: string; tag: string; year: string; img: string; url: string }[];
  };
  about: {
    eyebrow: string;
    body: string;
    bodyItalic: string;
    stats: { k: string; l: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    items: { k: string; t: string; d: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    items: { q: string; a: string; r: string }[];
  };
  contact: {
    eyebrow: string;
    headlineLines: string[];
    note: string;
    email: string;
  };
  footer: {
    tagline: string;
    note: string;
  };
  social: { platform: string; url: string }[];

};

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: "[ Independent web studio — est. 2026 ]",
    headlineLines: ["We build", "websites that", "win contracts."],
    intro:
      "Solcut is a small team designing and shipping fast, minimal websites for founders and studios who treat their landing page like a sales engineer.",
  },
  marquee:
    "Landing pages,✦,Brand sites,✦,E-commerce,✦,Web apps,✦,SEO,✦,Performance,✦,Animation,✦,CMS,✦",
  work: {
    eyebrow: "[ Selected work ]",
    title: "Brands we've",
    titleItalic: "put online",
    projects: [
      { n: "01", title: "Northwind Capital", tag: "Financial advisory", year: "2025", img: work1, url: "" },
      { n: "02", title: "Field & Foundry", tag: "Furniture studio", year: "2025", img: work2, url: "" },
      { n: "03", title: "Tertia Labs", tag: "Developer tooling", year: "2024", img: work3, url: "" },
      { n: "04", title: "Marin & Co.", tag: "Brand / Web", year: "2024", img: work4, url: "" },
    ],
  },
  about: {
    eyebrow: "[ Studio note ]",
    body: "A website is the only employee that works while you sleep —",
    bodyItalic:
      "ours show up rested. Most agencies disappear for two months. We commit to a fixed timeline and ship something you can put in front of a customer by Friday week two.",
    stats: [
      { k: "02", l: "Weeks to ship, end to end" },
      { k: "95", l: "Lighthouse score, baseline" },
      { k: "24", l: "Hour reply window" },
    ],
  },
  services: {
    eyebrow: "[ Process ]",
    title: "Four steps,",
    titleItalic: "two weeks",
    items: [
      { k: "01", t: "Discovery", d: "We map your customer, your offer, and the proof points that already convert in conversation." },
      { k: "02", t: "Design", d: "Minimal layouts, opinionated typography, no template tells. Every section earns its place." },
      { k: "03", t: "Build", d: "Hand-coded with modern stacks. 95+ Lighthouse, accessible by default, edited without us." },
      { k: "04", t: "Iterate", d: "We ship in two weeks then watch the data. Headlines, sections, and flows tuned in public." },
    ],
  },
  testimonials: {
    eyebrow: "[ Testimonials ]",
    title: "What clients",
    titleItalic: "say",
    items: [
      { q: "Solcut turned a two-month redesign into a two-week one — and the inbound finally matches the room.", a: "Hema Rao", r: "Partner, Northwind Capital" },
      { q: "Our customers said the site felt like the studio. That's the highest compliment.", a: "Marin Idris", r: "Founder, Field & Foundry" },
      { q: "Fast, opinionated, and the only studio I've worked with that ships on the date they quote.", a: "Jordan Lee", r: "CEO, Tertia Labs" },
    ],
  },
  contact: {
    eyebrow: "[ Let's talk ]",
    headlineLines: ["Let's build something", "worth visiting."],
    note: "Replies within 24h. Tell us about the project, or email us directly.",
    email: "connect.solcut@gmail.com",
  },
  footer: {
    tagline: "Independent web studio · Est. 2026",
    note: "Replies within 24h",
  },
  social: [
    { platform: "twitter", url: "https://twitter.com/" },
    { platform: "instagram", url: "https://instagram.com/" },
    { platform: "linkedin", url: "https://linkedin.com/" },
    { platform: "github", url: "https://github.com/" },
  ],

};
