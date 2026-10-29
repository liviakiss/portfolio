/**
 * All the text of the freelance page (/freelance), in one place.
 * Change a sentence, a price or a number here and the page updates.
 */

export const freelance = {
  eyebrow: "Freelance · taking on projects",

  /**
   * Other headlines you can swap in:
   *  - "Good-looking is the start. Built right is the point."
   *  - "Your website, designed and built properly, from the first sketch to the last security header."
   */
  headline: "Websites designed, coded and secured by one person.",
  sub: "I design and hand-code websites for businesses and teams who want it done properly, and I build security in from day one instead of patching it on later.",
  cta: "Start a project",

  facts: [
    { k: "Price", v: "Fixed, agreed before we start" },
    { k: "Revisions", v: "Two rounds of design revisions included" },
    { k: "Ownership", v: "You own the code, the domain and the hosting" },
  ],

  getTitle: "What you get",
  get: [
    {
      title: "Design that is made for you",
      text: "No templates. I design every page around what your visitors need to do, whether that's booking, buying, signing up or getting in touch.",
    },
    {
      title: "Code you own",
      text: "Hand-written, fast and built to last. No builder subscriptions, no page-builder bloat, no lock-in.",
    },
    {
      title: "Security from the start",
      text: "HTTPS, security headers, protected forms, spam protection, minimal data collection and dependencies kept up to date. Before launch, I test the site myself.",
    },
  ],

  processTitle: "How a project runs",
  process: [
    { title: "Intro call", tag: "30 minutes, free", text: "We talk about your goals, your visitors and your timeline." },
    { title: "Proposal", text: "You get a fixed price and a clear scope within 2 working days. No surprise invoices." },
    { title: "Design", text: "I design the key pages and we refine them together. Two rounds of revisions are included." },
    { title: "Build", text: "I code the site and share a private preview link so you can follow along." },
    { title: "Security check and launch", text: "I test, fix and launch, then walk you through everything." },
    {
      title: "Care",
      tag: "optional",
      text: "I keep the site updated, backed up and monitored so you never have to think about it.",
    },
  ],

  pricingTitle: "Pricing",
  pricingIntro:
    "Every project is quoted individually, because every project is different. To give you an idea of where things start:",
  pricing: [
    { what: "Landing page", from: "€750" },
    { what: "Business website", from: "€1,700" },
    { what: "Custom build", detail: "CMS, booking, logins, integrations", from: "€3,000" },
    { what: "Care plan", from: "€50 / month" },
  ],
  pricingNote: "Prices exclude VAT. I work with clients worldwide and invoice in euros.",

  checkTitle: "Free website health check",
  checkText:
    "Already have a website? I'll review its security basics, speed and mobile experience, using public information only, and send you a short report with what I'd fix first. Free, no strings attached.",
  checkCta: "Get my free check",

  faqTitle: "Questions",
  faq: [
    {
      q: "Why not just build it with AI or a website builder?",
      a: "You can, and for some projects that's fine. The difference shows later: in how fast the site loads, how it ranks, how safe your visitors' data is, and whether anyone is looking after it. I build for those parts too.",
    },
    {
      q: "Can I edit the site myself?",
      a: "Yes, if you need to. I can add an easy content editor for things like news, team members or prices. If you'd rather not touch it at all, a care plan covers small changes.",
    },
    {
      q: "How long does it take?",
      a: "A landing page usually takes 1–2 weeks, a business website 3–5 weeks. Custom builds depend on the scope. You'll get a timeline in your proposal.",
    },
    {
      q: "How does payment work?",
      a: "Half up front, half at launch. Larger projects are split into three milestone payments.",
    },
    {
      q: "Do you work with clients outside the Netherlands?",
      a: "Yes. I work in English and Hungarian, with clients worldwide.",
    },
    {
      q: "What do you mean by “secure”?",
      a: "Concretely: encrypted connections, security headers, protected and validated forms, spam protection, minimal data collection, regular backups and updated dependencies. I test before launch. For sector-specific compliance, I'll tell you honestly what I can and can't cover.",
    },
    {
      q: "Who owns the website?",
      a: "You do. After the final payment, you own the code, the domain and the hosting accounts.",
    },
  ],

  contactTitle: "Tell me about your project",
  contactIntro: "Tell me a bit about your project. I reply within 2 working days.",
  sent: "Thanks, your message is in. I'll get back to you within 2 working days.",
  privacy: "I use what you send only to reply to you.",
  waiting: "Still here. Waiting for your message.",
};

/**
 * The dropdowns of the contact form. The API route checks answers against these lists.
 * The budget ranges follow the price list: under €500 covers "Fix & secure", €500-1,000 a landing page,
 * €1,000-2,000 a business website, and so on. Budget is required, "Not sure yet" is a valid answer.
 */
export const formOptions = {
  needs: [
    "Landing page",
    "Business website",
    "Redesign of my current site",
    "Custom build (CMS, booking, logins)",
    "Fix & secure my existing site",
    "Care plan for my site",
    "Free health check",
    "Not sure yet",
  ],
  budgets: ["Under €500", "€500–1,000", "€1,000–2,000", "€2,000–4,000", "€4,000+", "Not sure yet, I'd like advice"],
  timelines: ["As soon as possible", "1–3 months", "Flexible"],
} as const;

/** What the "Get my free check" button puts into the "What do you need?" dropdown. */
export const HEALTH_CHECK = "Free health check";

/** For these answers the visitor's current website is required, because there is nothing to check without it. */
export const SITE_NEEDS: readonly string[] = [HEALTH_CHECK, "Fix & secure my existing site"];

/** Name of the browser event the buttons use to talk to the form. */
export const NEED_EVENT = "freelance:need";
