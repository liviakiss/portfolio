/**
 * All the text that lives on the home page, in one place.
 * Edit a sentence here and the site updates; no layout code to touch.
 * The three case-study pages keep their own text inside src/app/work/*.
 */

export const site = {
  name: "Lívia Kiss",
  title: "Lívia Kiss · Fullstack developer",
  description:
    "Portfolio of Lívia Kiss, a fullstack developer in the Netherlands, learning security and data. Open to work in the Netherlands, remote or Japan.",
  githubUrl: "https://github.com/liviakiss",
  linkedinUrl: "https://www.linkedin.com/in/l%C3%ADvia-kiss-design/",
  // The email address is NOT written out here on purpose. It is put together
  // in the browser only when someone clicks the button (see EmailButton.tsx),
  // so scrapers that read the page source do not find it.
  emailParts: ["kisslivi00", "gmail.com"] as const,
};

export const hero = {
  headline: "I'm a fullstack developer, learning security and data.",
  sub: "I design, build and deploy web apps on my own.",
  availability: "Open to work",
  where: "Netherlands · Remote · Japan",
};

/* ------------------------------------------------------------------ */
/* The shelf                                                            */
/* ------------------------------------------------------------------ */

export type ProjectId = "recipe" | "world" | "client";

export type ProjectLink = {
  label: string;
  href: string;
  /** Opens in a new tab (outside links). Internal links stay in the site. */
  external?: boolean;
  /** Outlined, less loud button. */
  quiet?: boolean;
};

export type Project = {
  id: ProjectId;
  slug: string;
  call: string;
  title: string;
  /** Shown under the title in the detail panel. */
  statusLabel: string;
  /** Read out for screen readers on the spine button. */
  statusLong: string;
  line: string;
  stack: string;
  spine: {
    width: number;
    height: number;
    /** CSS variable holding the cloth colour. */
    color: "--s1" | "--s2" | "--s3";
    variant: "" | "v2" | "v3";
    ivory: boolean;
    status: string;
    dot: string;
  };
  links: ProjectLink[];
  /** Show the latest GitHub commits in the panel (only My World). */
  showCommits?: boolean;
};

export const projects: Project[] = [
  {
    id: "recipe",
    slug: "recipe-intolerance-helper",
    call: "WEB 01",
    title: "Recipe Intolerance Helper",
    statusLabel: "Live",
    statusLong: "live",
    line: "Paste a recipe, see which ingredients clash with your dietary restrictions, and get substitutes.",
    stack: "Next.js · FastAPI · PostgreSQL",
    spine: { width: 78, height: 410, color: "--s1", variant: "", ivory: false, status: "Live", dot: "#9FD0BD" },
    links: [
      { label: "Live site ↗", href: "https://recipe-intolerance-helper.vercel.app/", external: true },
      { label: "Repo ↗", href: "https://github.com/liviakiss/recipe-intolerance-helper", external: true, quiet: true },
      { label: "Case study →", href: "/work/recipe-intolerance-helper", quiet: true },
    ],
  },
  {
    id: "world",
    slug: "my-world",
    call: "WEB 02",
    title: "My World",
    statusLabel: "In progress",
    statusLong: "in progress",
    line: "One place for books, series, movies, games, anime and manga: what you finished, what is next, and when the next part comes out.",
    stack: "Web app · Security · Data dashboards",
    spine: { width: 66, height: 330, color: "--s2", variant: "v2", ivory: true, status: "Wip", dot: "var(--amber)" },
    links: [
      { label: "Repo ↗", href: "https://github.com/liviakiss/my-world", external: true },
      { label: "Case study so far →", href: "/work/my-world", quiet: true },
    ],
    showCommits: true,
  },
  {
    id: "client",
    slug: "euro-car-service",
    call: "WEB 03",
    title: "Euro Car Service",
    statusLabel: "Delivered",
    statusLong: "delivered",
    line: "A bilingual website with its own content management for a Bosch partner car workshop in Tatabánya, Hungary.",
    stack: "Next.js · Sanity CMS · Tailwind CSS",
    spine: { width: 72, height: 368, color: "--s3", variant: "v3", ivory: false, status: "Done", dot: "#9FD0BD" },
    links: [
      { label: "Live site ↗", href: "https://eurocarservice.hu", external: true },
      { label: "Repo ↗", href: "https://github.com/eurocarservicekft/Bosch", external: true, quiet: true },
      { label: "Case study →", href: "/work/euro-car-service", quiet: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Tools, right now, credentials                                        */
/* ------------------------------------------------------------------ */

/** Ordered by how strong I am, strongest first. Same order inside each row. */
export const tools: { group: string; items: string }[] = [
  { group: "Languages", items: "Python, JavaScript, TypeScript" },
  { group: "Frameworks", items: "FastAPI, Next.js, React" },
  { group: "Web basics", items: "HTML, CSS" },
  { group: "Databases", items: "SQL, PostgreSQL" },
  { group: "Tooling", items: "Git, GitHub, VS Code" },
  { group: "Hosting", items: "Vercel, Render, Neon" },
];

export const rightNow: { title: string; note: string }[] = [
  { title: "CS50W, Web Programming with Python and JavaScript", note: "Course, in progress" },
  { title: "Hack The Box", note: "Learning and practicing security" },
  { title: "Japanese", note: "Preparing for the JLPT N5 exam" },
];

export type Credential = {
  /** Short name on the tab. */
  tab: string;
  /** Year on the tab. Leave out when not known yet. */
  year?: string;
  /** Longer date inside the card, e.g. "Aug 2026". */
  date?: string;
  title: string;
  issuer: string;
  /** Verify link. Leave out when there is none. */
  verify?: string;
};

/** Newest first. Only finished things. */
export const credentials: Credential[] = [
  {
    tab: "Cambridge English 170",
    year: "2026",
    date: "Sep 2026",
    title: "Cambridge English exam, score 170",
    issuer: "Cambridge English Scale",
  },
  {
    tab: "CS50 Python",
    year: "2026",
    date: "Aug 2026",
    title: "CS50's Introduction to Programming with Python",
    issuer: "CS50",
    verify: "https://certificates.cs50.io/cf3ef36f-211f-46f9-9590-5697f96249b4.pdf?size=letter",
  },
  {
    tab: "Cognitive Psychology",
    year: "2026",
    date: "Jun 2026",
    title: "Introduction to Cognitive Psychology and Neuropsychology",
    issuer: "University of Cambridge",
    verify: "https://www.coursera.org/account/accomplishments/verify/Y39P5CGTLHH8",
  },
  {
    tab: "Responsive Web Design",
    year: "2026",
    date: "Mar 2026",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    verify: "https://www.freecodecamp.org/certification/klivi77/responsive-web-design-v9",
  },
  {
    tab: "Art and Design (MoMA)",
    year: "2025",
    date: "Dec 2025",
    title: "Modern and Contemporary Art and Design",
    issuer: "The Museum of Modern Art",
    verify: "https://www.coursera.org/account/accomplishments/specialization/certificate/9TNZCNXRSG7U",
  },
  {
    tab: "Google UX Design",
    year: "2025",
    date: "Nov 2025",
    title: "Google UX Design",
    issuer: "Google",
    verify: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/IEZPWS829BLG",
  },
  {
    tab: "Google Digital Marketing",
    year: "2025",
    date: "Sep 2025",
    title: "Google Digital Marketing & E-commerce",
    issuer: "Google",
    verify: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/4XZK0PYLX4WV",
  },
  {
    tab: "Logistics administrator",
    year: "2023",
    date: "2023",
    title: "Logistics and freight forwarding administrator",
    issuer: "TSZC Bláthy Ottó Technikum",
  },
];

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

export const about = {
  paragraphs: [
    "Hi, I'm Lívia. I started out in logistics, but I realised I wanted work that was more creative, so I moved into design. It wasn't enough: I wanted a bigger challenge, and I found it in code. I fell in love with it (except when it isn't working).",
    "What keeps me hooked is understanding the logic and seeing how the whole structure fits together. I also wanted a path where I can always keep growing, so I'm now moving toward cybersecurity and data.",
  ],
  quiet: "When I'm not learning or working, I'm reading, doing sports, spending time with the people I love, playing games or watching anime.",
};

/**
 * The GIFs are loaded straight from Giphy for now.
 * To host them yourself (faster, and no request to a third party):
 * save the files into /public/img/ and change these to "/img/about.gif", "/img/my-world.gif" and "/img/cat.gif".
 */
export const gifs = {
  about:
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c2I3ZzRtcW4zaWt1cGY4ZzVmcGlwbnpyam5tMm5kNmRrMjVhbXg1cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pOKrXLf9N5g76/giphy.gif",
  myWorld:
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MHFibDJlM2s4cXk3Yzk0eWFmYzVxNGl6NGlmN2VyNTJqZzhpY3k4bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QQQoLTqkm7v3y/giphy.gif",
  /** The cat that waits next to the freelance contact form. */
  cat:
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXc1OXdseDZ3dHUzMDdqandybmJncTR6bW1xcGVvMThiMzNkYzg4bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/A0Zt7yuDULiy4ofmVD/giphy.gif",
};

export const contact = {
  /** Path 1: a company hiring for a role. */
  role: {
    label: "For roles",
    heading: "Hiring?",
    headingAccent: "Let's talk.",
    text: "Tell me about the role and the team. I reply within a few hours, or a few days at most.",
    button: "Write me an email",
  },
  /** Path 2: someone who wants a website built. Leads to /freelance. */
  project: {
    label: "For projects",
    heading: "Want to work",
    headingAccent: "together?",
    text: "I also design and build websites for businesses and teams: made for you, hand-coded and secured from day one.",
    button: "See how I work",
    href: "/freelance",
  },
  footnote: "Open to work · open to projects",
};
