// ZAH's own workshop deck: the reference content, and the fidelity fixture the
// test renders. The live copy lives in the brand site (content/workshop.ts);
// this is a snapshot of it. Asset paths are the brand site's /workshop/assets.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const html = (f) => readFileSync(join(here, f), "utf8");
const A = "/workshop/assets";

export default {
  id: "zah-workshop",
  title: "The Workshop — ZAH Brand Solutions",
  brand: {
    name: "ZAH Brand Solutions",
    logo: `${A}/zah-logo.png`,
    logoOnDark: `${A}/zah-logo-alt.png`,
    site: "zahbrandsolutions.com",
  },
  qr: { image: `${A}/qr-workshop-promotions.svg`, alt: "Scan to open the giveaways", label: "Scan me" },
  scenes: [
    {
      type: "cover",
      headline: ["We launch and scale", "businesses."],
      tagline: "Strategic marketing.  Paid social.  AI-built systems.",
      chips: ["Paid Social", "Google & Meta Ads", "CRM", "Websites", "Brand & Design", "AI Systems", "Video & Content"],
      ticker: ["Meta Ads", "Google Ads", "CRM Systems", "Websites", "AI Systems", "Paid Social", "Brand & Design", "Video & Content", "Conversion", "Automation", "Landing Pages", "SMS & Email"],
    },
    {
      type: "receipts",
      eyebrow: "The receipts",
      headline: "We don't talk marketing.",
      headlineAccent: "We run it.",
      intro: "We specialize in launching and scaling businesses through paid advertising on Google and Meta. Every day. At scale.",
      items: [
        { pre: "$", value: 1.8, decimals: 1, post: "M", context: "Grew from $48K, per year", label: "One e-commerce brand, scaled in three years." },
        { value: 10, post: "x", context: "7x to 10x ROAS", label: "Sustained across $200K+ in managed ad spend." },
        { value: 7000, post: "+", context: "Qualified applicants", label: "Intake in under 30 days for a real-estate client." },
        { value: 549, post: "K", context: "Grew from 349K followers", label: "Public-figure growth, multi-million-view campaigns." },
      ],
      outro: "This is the engine. Google and Meta ads, generating millions for the businesses we run them for.",
    },
    {
      type: "meet",
      label: "Meet Zah",
      photo: `${A}/zah-headshot.png`,
      photoAlt: "Zah",
      eyebrow: "Operator first. Educator now.",
      headline: "I'm Zah.",
      paragraphs: [
        "Nearly twenty years building marketing systems that move real revenue. I run the paid media, build the CRM, design the brand, and write the software.",
        "AI is the through-line. I've used it since it went public, building apps, systems, and content at the production level, not the casual-chat level.",
      ],
      credential: { icon: `${A}/claude-mark.svg`, label: "Anthropic Claude Certificate" },
    },
    {
      type: "learn",
      eyebrow: "The next 45 minutes",
      headline: ["Here's what you're", "walking away with."],
      items: [
        { title: "How real businesses get launched and scaled", body: "With paid social and smart systems, the same engine I run every day." },
        { title: "The tools that keep you in front of your audience", body: "Stay top of mind, stay consistent, without burning out." },
        { title: "What AI can actually build for your business", body: "Live, in front of you. Not theory. Working software." },
        { title: "Exclusive Surprise Giveaways", body: "Everything you need to take the first step today." },
      ],
    },
    {
      type: "products",
      eyebrow: "Built with AI",
      headline: ["I don't just advise on", "systems. I build them."],
      intro: "Real products. Built with AI. Shipped and in use.",
      items: [
        { name: "ZAH CRM", blurb: "The CRM built for entrepreneurs.", icon: `${A}/crm/app-logo.png`, screen: { image: `${A}/crm/mkt-large.png`, alt: "ZAH CRM" }, button: { label: "Open ZAH CRM", href: "https://zahcrm.com" } },
        { name: "JobScout AI", blurb: "Autonomous job search. AI finds, tailors, and applies.", icon: `${A}/jobscout-icon.png`, screen: { icon: `${A}/jobscout-icon.png`, alt: "JobScout AI", background: "linear-gradient(150deg,#0d1f3a,#1A2B4C)", size: 78, shadow: true }, button: { label: "Preview", modal: "jobscout" } },
        { name: "UENITE", blurb: "Tokenized loyalty and rewards. One portal, merchants and hubs.", icon: `${A}/uenity-coin.png`, screen: { icon: `${A}/uenity-coin.png`, alt: "UENITE", background: "linear-gradient(150deg,#0a3a2c,#14543c)", size: 96 }, button: { label: "Preview", href: "https://uenite.com" } },
        { name: "Tally AI", blurb: "Smart household finances. Budgets, bank sync, and an AI money advisor.", icon: `${A}/tally-icon.png`, screen: { icon: `${A}/tally-icon.png`, alt: "Tally AI", background: "linear-gradient(150deg,#0d0d14,#1b1630)", size: 88, glow: "rgba(124,110,248,.4)" }, button: { label: "Preview", modal: "tally" } },
      ],
    },
    {
      type: "spotlight",
      label: "ZAH CRM",
      logo: `${A}/crm/app-logo.png`,
      name: "ZAH CRM",
      intro: "Stay in front of your audience. Capture every lead. Let AI do the follow-up.",
      features: [
        { title: "Capture", body: "Leads, contacts, and conversations in one place." },
        { title: "Automate", body: "AI-powered follow-up so nothing slips." },
        { title: "Convert", body: "Turn steady communication into steady revenue." },
      ],
      screen: {
        kind: "dashboard",
        logo: `${A}/crm/app-logo.png`,
        title: "ZAH CRM",
        subtitle: "Dashboard",
        live: "Live",
        avatar: "Z",
        metrics: [
          { label: "New leads", value: 248 },
          { label: "Reply rate", value: 63, post: "%", accent: true },
          { label: "Pipeline", pre: "$", value: 92, post: "K" },
          { label: "Booked", value: 31 },
        ],
        chart: { title: "Leads this week", delta: "▲ 18%", bars: [46, 62, 54, 78, 88, 100] },
        list: {
          title: "Recent leads",
          rows: [
            { initial: "D", name: "Dejah W.", status: "Replied", tone: "green" },
            { initial: "M", name: "Marcus D.", status: "Follow-up", tone: "amber" },
            { initial: "M", name: "Marcus T.", status: "Booked", tone: "blue" },
          ],
        },
      },
      button: { label: "Open ZAH CRM", href: "https://zahcrm.com" },
    },
    {
      type: "person",
      label: "Operator",
      watermark: "DW",
      eyebrow: "Operator spotlight",
      headline: ["This is who it", "was built for."],
      photo: `${A}/david-washington.jpg`,
      name: "David Washington",
      titles: ["Founding Director, PlanNet Marketing", "Leader, DW Focus"],
      paragraphs: [
        "He keeps steady communication with an audience most businesses can only dream of.",
        "ZAH CRM was built around his line of communication with his audience, ready to integrate into his business and his team.",
      ],
    },
    {
      type: "pairing",
      label: "David & CRM",
      left: { image: `${A}/david-washington.jpg`, name: "David Washington" },
      right: { image: `${A}/crm/app-logo.png`, name: "ZAH CRM" },
      tagline: "Built around steady communication at scale.",
      taglineAccent: "Ready to integrate into his team.",
    },
    {
      type: "statement",
      label: "Diagnosis",
      eyebrow: "Sit down. Let's look.",
      headline: ["Live Business", "Diagnosis"],
      sub: "One business. Diagnosed on the spot.",
    },
    {
      type: "build",
      eyebrow: "Claude Code + ZAH CRM",
      headline: "Now we build it.",
      headlineAccent: "Live.",
      items: [
        { title: "Website", body: "Built live with Claude Code." },
        { title: "ZAH CRM", body: "Integrated on the spot to capture every lead." },
        { title: "Social assets", body: "Created with AI, ready to post." },
        { title: "Paid ads", body: "The engine that drives real revenue into the building." },
        { title: "Search presence", body: "So the community finds what she actually does." },
      ],
      outro: "Items check off as we go. Then we leave this screen and build it for real.",
    },
    {
      type: "offer",
      hero: { image: `${A}/workshop-hero.png`, alt: "Zah at the Leadership Workshop" },
      eyebrow: "The big giveaway",
      headline: ["If you found value today,", "wait until you see what's next."],
      sub: "Everything here is waiting in your free wallet.",
      rows: [
        {
          kind: "feature",
          image: `${A}/uenity-coin.png`, alt: "Universal Exchange Note",
          badge: "The love note",
          title: "Show some love",
          body: "Enjoyed what you learned today? Show some love. Tip Zah starting at $10 and get love back in return in the form of a LOVE NOTE, a Universal Exchange Note you carry in your wallet to use with participating merchants, including Zah!",
          button: { label: "Support Zah's Work", href: "/love?wallet=1" },
        },
        {
          kind: "book",
          title: "The book", badge: "Coming soon", badgeTone: "ink",
          name: "MINE Your Own Business",
          body: "A founder's guide to running the business you actually built. Preview inside.",
          image: `${A}/mine-your-business-book.png`, alt: "MINE Your Own Business book", imageBackground: "#1a0b07", imageSide: "right",
          imageAction: { label: "Click to enlarge", href: "/book/preview" },
        },
        [
          {
            kind: "brand",
            header: { image: `${A}/claude-mark.svg`, alt: "Claude", name: "Claude", sub: "by Anthropic", background: "#1a1a17", nameFont: "Georgia,'Times New Roman',serif", nameColor: "#F0EEE6", subColor: "#D97757" },
            title: "One free week of Claude", badge: "First 3 only", badgeColor: "#D97757",
            body: "A full week of Claude on my personal link. The link is waiting in your wallet. First come, first served.",
            button: { label: "Open your wallet", href: "/love?wallet=1" },
          },
          {
            kind: "brand",
            header: { image: `${A}/crm/app-logo.png`, alt: "ZAH CRM", name: "ZAH CRM", sub: "Built for entrepreneurs", imageRadius: "15px", imageShadow: true },
            title: "Free for 14 days", badge: "No card",
            body: "Redeem anytime. Waiting in your wallet.", bodyGap: 16,
            button: { label: "Open ZAH CRM", href: "https://zahcrm.com" },
          },
        ],
        {
          kind: "book",
          title: "Free workbook", badge: "$20 value", badgeTone: "accent",
          name: "Build Your Own",
          body: "Build your own CRM and website with Claude Code. Yours free in the wallet.",
          image: `${A}/build-your-own-book.png`, alt: "Build Your Own book", imageBackground: "#0e0e0e", imageSide: "left",
          imageAction: { label: "Click to enlarge", href: "/book/preview" },
          button: { label: "Open your wallet", href: "/love?wallet=1" },
        },
        {
          kind: "simple",
          icon: "calendar",
          title: "Book a consultation", badge: "Book me",
          body: "Want what you saw today, for your business? Book me at zahbrandsolutions.com.",
          button: { label: "See services", href: "/services" },
        },
      ],
      panel: {
        headline: ["Scan to open your", "free wallet"],
        qr: { image: `${A}/qr-workshop-promotions.svg`, alt: "Scan to open the giveaways" },
        lines: ["Free giveaways", "Book me for consultations"],
        button: { label: "Open your wallet", href: "/love?wallet=1" },
      },
    },
  ],
  modals: {
    tally: { html: html("modal-tally.html") },
    jobscout: { html: html("modal-jobscout.html") },
    book: { image: `${A}/build-your-own-book.png`, alt: "Build Your Own book" },
    book2: { image: `${A}/mine-your-business-book.png`, alt: "MINE Your Own Business book" },
  },
};
