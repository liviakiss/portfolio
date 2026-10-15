import type { Metadata } from "next";
import { CaseFooter, CaseHero, CaseLayout, CaseSection, Row, Rows, Pull } from "../../../components/case";
import { Commits } from "../../../components/Commits";
import { SiteFrame } from "../../../components/SiteFrame";
import { gifs } from "../../../lib/content";
import { getRecentCommits } from "../../../lib/github";

export const metadata: Metadata = {
  title: "My World",
  description:
    "A web app for keeping everything you read, watch and play on one shelf, with reminders for the next part of a series. Work in progress.",
};

const toc = [
  { id: "why", label: "Why I'm building it" },
  { id: "will", label: "What it will do" },
  { id: "focus", label: "Focus areas" },
  { id: "stack", label: "Stack" },
];

export default async function MyWorldCaseStudy() {
  const commits = await getRecentCommits();

  return (
    <SiteFrame wide>
      <CaseHero
        number="03"
        status="In progress"
        tone="amber"
        title="My World"
        tagline="Track & Finish"
        intro="A web app for keeping everything you read, watch and play on one shelf: books, manga, anime, TV series, movies and games. It reminds you when the next part of a series comes out."
        links={[{ label: "Source code ↗", href: "https://github.com/liviakiss/my-world" }]}
        meta={[
          { label: "Role", value: "Solo: product, design, development" },
          { label: "Stack", value: "Next.js, TypeScript, Tailwind, FastAPI, PostgreSQL" },
          { label: "Focus", value: "Security and data" },
        ]}
      />

      {commits.length > 0 && (
        <section aria-label="Right now" className="mw-now">
          <div className="inner">
            <div className="now-label">
              <div className="mono acc2">Right now</div>
            </div>
            <div className="now-body">
              <Commits commits={commits} onCard />
            </div>
          </div>
        </section>
      )}

      <figure className="fig">
        <div className="fig-gif">
          {/* Plain <img>: an animated GIF, and it may be hosted outside the site. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gifs.myWorld} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
        </div>
        <figcaption className="mono">Fig. 1 · Work in progress. Real screens will go here once there are some.</figcaption>
      </figure>

      <CaseLayout toc={toc}>
        <CaseSection id="why" n="01" title="Why I'm building it" first>
          <p>
            I kept losing track of unfinished series, and release dates I&apos;d seen online were gone by the time they mattered.
            Existing trackers each cover one type of media, or treat everything like a plain list.
          </p>
          <Pull>I wanted one place that feels like a real bookshelf and helps you actually finish what you start.</Pull>
        </CaseSection>

        <CaseSection id="will" n="02" title="What it will do">
          <ul>
            <li>Shelf, grid and list views with cover art pulled from public databases.</li>
            <li>Statuses, progress, ratings, tags and custom shelves.</li>
            <li>Automatic release checks for ongoing series, with email and push reminders.</li>
            <li>A spin wheel and a mood-based picker for choosing what&apos;s next.</li>
            <li>Installable on your phone as a web app (PWA).</li>
          </ul>
        </CaseSection>

        <CaseSection id="focus" n="03" title="Focus areas">
          <p>Besides the app itself, this project is where I practise the two areas I want to grow in.</p>
          <h3 className="h3" style={{ marginTop: 28 }}>
            Security
          </h3>
          <Rows>
            <Row k="Threat model" dot="ring">
              A written threat model for the app.
            </Row>
            <Row k="Authentication" dot="ring">
              Modern authentication: Argon2 password hashing and rotating refresh tokens in secure cookies.
            </Row>
            <Row k="Abuse protection" dot="ring">
              Rate limiting, and access-control tests.
            </Row>
            <Row k="Checks" dot="ring">
              Security scanning in CI, and an OWASP ZAP report.
            </Row>
          </Rows>
          <h3 className="h3" style={{ marginTop: 28 }}>
            Data
          </h3>
          <p>An event-tracking model behind three dashboards, plus a SQL and pandas case study.</p>
          <Rows>
            <Row k="Personal stats" dot="ring">
              Reading, watching and playing stats for the user.
            </Row>
            <Row k="Product analytics" dot="ring">
              How the app is used.
            </Row>
            <Row k="Security monitoring" dot="ring">
              What the app sees when someone tries something they should not.
            </Row>
          </Rows>
          <p className="muted">Hollow dots mean planned, not built yet.</p>
        </CaseSection>

        <CaseSection id="stack" n="04" title="Stack" last>
          <Rows>
            <Row k="Frontend">Next.js, TypeScript, Tailwind</Row>
            <Row k="Backend">FastAPI, SQLAlchemy, Alembic</Row>
            <Row k="Database">PostgreSQL (Neon)</Row>
          </Rows>
        </CaseSection>
      </CaseLayout>

      <CaseFooter next={{ label: "Euro Car Service", href: "/work/euro-car-service" }} />
    </SiteFrame>
  );
}
