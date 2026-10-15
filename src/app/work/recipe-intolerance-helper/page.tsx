import type { Metadata } from "next";
import heroImage from "../../../assets/recipe-hero.jpg";
import { CaseFooter, CaseHero, CaseLayout, CaseSection, Diagram, HeroFigure, Pull, Row, Rows } from "../../../components/case";
import { SiteFrame } from "../../../components/SiteFrame";

export const metadata: Metadata = {
  title: "Recipe Intolerance Helper",
  description:
    "A web app that checks a recipe against your food intolerances and flags the ingredients that clash. Designed and built solo, from the interface to the database, the photo scanning, the tests and the hosting.",
};

const toc = [
  { id: "problem", label: "The problem" },
  { id: "goals", label: "Goals and constraints" },
  { id: "solution", label: "The solution" },
  { id: "how", label: "How it works" },
  { id: "challenges", label: "Challenges and decisions" },
  { id: "quality", label: "Quality and security" },
  { id: "limits", label: "Limitations and next steps" },
  { id: "learned", label: "What I learned" },
];

const tests: { name: string; n: number; width: number }[] = [
  { name: "Normalizer", n: 36, width: 100 },
  { name: "Seed data checks", n: 36, width: 100 },
  { name: "Parser", n: 31, width: 86 },
  { name: "Matcher", n: 21, width: 58 },
  { name: "Rate limiting", n: 15, width: 42 },
  { name: "Scan endpoint", n: 11, width: 31 },
  { name: "Other (seed, OCR, check endpoint)", n: 15, width: 42 },
];

export default function RecipeCaseStudy() {
  return (
    <SiteFrame wide>
      <CaseHero
        number="01"
        status="Live"
        title="Recipe Intolerance Helper"
        intro="A web app that checks a recipe against your food intolerances and flags the ingredients that clash. I designed and built it on my own, from the interface to the database, the photo scanning, the tests and the hosting."
        links={[
          { label: "Live app ↗", href: "https://recipe-intolerance-helper.vercel.app/" },
          { label: "Source code ↗", href: "https://github.com/liviakiss/recipe-intolerance-helper" },
        ]}
        meta={[
          { label: "Role", value: "Solo: product, design, development, deployment" },
          { label: "Stack", value: "Next.js 16, FastAPI, PostgreSQL, Tesseract OCR" },
          { label: "Hosting", value: "Vercel, Render and Neon, all on free tiers" },
        ]}
        note="The app runs on free hosting, so the first visit after a quiet period can take up to a minute while the server wakes up."
      />

      <HeroFigure
        src={heroImage}
        alt="Recipe Intolerance Helper: the start screen, a results screen with flagged and safe ingredients, and a photographed recipe card that the scan feature can read"
        caption="Fig. 1 · The start screen, a result for a carbonara recipe, and the kind of printed recipe card the scan feature reads."
      />

      <CaseLayout toc={toc}>
        <CaseSection id="problem" n="01" title="The problem" first>
          <p>
            Anyone who avoids gluten, dairy, eggs or similar ingredients does the same chore for every recipe: read each
            ingredient line and decide whether it is a problem.
          </p>
          <p>
            Two things make that slow. Ingredient names can hide the allergen, so you need to know what a word means before you
            can judge it. And recipes arrive in different forms: typed text, a web page, a screenshot, a printed card with two
            columns and decorative art. A simple keyword search handles none of that well.
          </p>
        </CaseSection>

        <CaseSection id="goals" n="02" title="Goals and constraints">
          <p>The goal was a checker that anyone can use in seconds and that is honest about what it does not know.</p>
          <ul>
            <li>Works without an account; logging in is only needed to save recipes and see history.</li>
            <li>Accepts messy input: pasted text, a recipe fetched by name, or a photo.</li>
            <li>Gives one of three clear answers per ingredient instead of guessing.</li>
          </ul>
          <p style={{ marginTop: 28 }}>The constraints shaped the design as much as the goals did.</p>
          <ul>
            <li>I was working alone with no budget, so the OCR engine and all hosting had to be free.</li>
            <li>The free backend has 512 MB of memory, goes to sleep after 15 minutes without traffic, and takes about a minute to wake.</li>
            <li>The scan feature is public, so it had to resist being overused.</li>
          </ul>
        </CaseSection>

        <CaseSection id="solution" n="03" title="The solution">
          <p>
            You pick your intolerances, from a preset such as gluten-free or lactose-free or from a custom list of 14 tags, then
            bring in a recipe in one of three ways.
          </p>
          <Rows>
            <Row num="01">
              <b>Paste it.</b> Type or paste the ingredient list.
            </Row>
            <Row num="02">
              <b>Look it up.</b> Enter a dish name and the app fetches a recipe from TheMealDB.
            </Row>
            <Row num="03">
              <b>Scan it.</b> Upload a photo of a printed recipe and OCR reads the ingredients.
            </Row>
          </Rows>
          <p>Every ingredient comes back as one of three outcomes:</p>
          <Rows>
            <Row k="Flagged" dot="mauve">
              It matches one of your intolerances, with the reason shown
            </Row>
            <Row k="Safe" dot="sage">
              It is known and does not conflict
            </Row>
            <Row k="Unrecognized" dot="ring-amber">
              The app does not know this ingredient, so it says so instead of guessing
            </Row>
          </Rows>
          <Pull>
            The third outcome is the one I care about most. A checker that quietly calls unknown ingredients &ldquo;safe&rdquo; is
            worse than no checker.
          </Pull>
          <p>Logged-in users can save a checked recipe and look at their history. Photos are processed and never stored.</p>
        </CaseSection>

        <CaseSection id="how" n="04" title="How it works">
          <p>The app is three hosted parts and a database, plus two outside services.</p>
          <Diagram
            label="Diagram of the request path"
            caption="Fig. 2 · The path of a request. Dashed box: an outside service."
          >
            <svg
              viewBox="0 0 960 250"
              role="img"
              aria-label="Diagram: the browser talks only to Vercel. Vercel forwards /api calls to the FastAPI server on Render. Render talks to the Neon PostgreSQL database and to TheMealDB."
            >
              <defs>
                <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0L10 5L0 10z" style={{ fill: "var(--acc)" }} />
                </marker>
              </defs>
              <rect className="bx" x="20" y="90" width="150" height="76" rx="2" />
              <text className="sv" x="40" y="124">Browser</text>
              <text className="ss" x="40" y="146">the visitor</text>
              <rect className="bx" x="250" y="90" width="190" height="76" rx="2" />
              <text className="sv" x="270" y="124">Vercel</text>
              <text className="ss" x="270" y="146">Next.js 16 · rewrites /api</text>
              <rect className="bx" x="520" y="52" width="220" height="152" rx="2" />
              <text className="sv" x="540" y="86">Render</text>
              <text className="ss" x="540" y="108">FastAPI · rate limiter</text>
              <text className="ss" x="540" y="128">Tesseract OCR</text>
              <text className="ss" x="540" y="172">512 MB · sleeps after 15 min</text>
              <rect className="bx" x="810" y="20" width="130" height="76" rx="2" />
              <text className="sv" x="828" y="54">Neon</text>
              <text className="ss" x="828" y="76">PostgreSQL</text>
              <rect className="bx" x="810" y="160" width="130" height="76" rx="2" strokeDasharray="5 4" />
              <text className="sv" x="828" y="194">TheMealDB</text>
              <text className="ss" x="828" y="216">recipe lookup</text>
              <path className="ar" d="M172 128H246" markerEnd="url(#ah)" />
              <path className="ar" d="M442 128H516" markerEnd="url(#ah)" />
              <text className="ss" x="460" y="118">/api</text>
              <path className="ar" d="M742 92L806 66" markerEnd="url(#ah)" />
              <path className="ar" d="M742 164L806 190" markerEnd="url(#ah)" />
            </svg>
          </Diagram>
          <p>
            The browser never talks to Render directly. Vercel forwards /api calls to it, which is what keeps the login cookie
            first-party.
          </p>
          <p>Every recipe, however it arrives, goes through the same four steps:</p>
          <Rows>
            <Row
              k={
                <>
                  <span className="mono num-inline">01</span>Parse
                </>
              }
            >
              Each line is split into quantity, unit and ingredient name.
            </Row>
            <Row
              k={
                <>
                  <span className="mono num-inline">02</span>Normalize
                </>
              }
            >
              Accents, hyphens and plurals are cleaned up word by word, so &ldquo;almonds&rdquo; and &ldquo;almond&rdquo; compare
              equal.
            </Row>
            <Row
              k={
                <>
                  <span className="mono num-inline">03</span>Match
                </>
              }
            >
              The name is compared with a dictionary of 619 ingredients: whole words only, longest match first, with a fixed
              tie-break so the result never changes between runs. Qualifiers such as &ldquo;gluten-free&rdquo; are understood.
            </Row>
            <Row
              k={
                <>
                  <span className="mono num-inline">04</span>Report
                </>
              }
            >
              Each line becomes flagged, safe or unrecognized.
            </Row>
          </Rows>
          <p>
            A photo adds a step in front: OCR turns the picture into lines of text, picks out the ingredient column, and hands
            those lines to the same pipeline.
          </p>
        </CaseSection>

        <CaseSection id="challenges" n="05" title="Challenges and decisions">
          <div className="block">
            <h3 className="h3">Login across two hosting domains</h3>
            <p>
              The frontend lives on Vercel and the API on Render, so the login cookie became a third-party cookie, which browsers
              increasingly block. Instead of loosening cookie settings, I made the browser talk to one origin only: a Next.js
              rewrite forwards every /api request to the backend, so the cookie is first-party.
            </p>
          </div>
          <div className="block">
            <h3 className="h3">Reading messy recipe photos</h3>
            <p>
              Real recipe cards have two columns, decorative art and odd spacing, and plain OCR returns them as one jumbled
              stream. I use Tesseract&apos;s word-level output with a layout mode suited to columns, find column breaks from the
              gaps between words, and score each column for how much it looks like an ingredient list.
            </p>
            <p>
              In the browser, large phone photos are shrunk first (over 2 MB, at most 5 million pixels, longest side 3000, JPEG
              at 0.85) with the camera&apos;s orientation respected, so uploads are fast and the server stays within its memory.
            </p>
          </div>
          <div className="block">
            <h3 className="h3">Free-tier cold starts</h3>
            <p>
              A sleeping server makes the first request fail or hang. The frontend retries up to 20 times, 4 seconds apart, and
              after 3 seconds shows a banner saying the server is waking up, so nobody thinks the app is broken. A scheduled ping
              every 10 minutes keeps the server awake in normal use.
            </p>
          </div>
          <div className="block">
            <h3 className="h3">Keeping a public scan endpoint fair</h3>
            <p>
              OCR is the heaviest thing the server does. I wrote a small sliding-window rate limiter: 10 scans per hour per
              visitor and 150 per hour across everyone, with tighter limits on login and registration. Refused requests get a 429
              with a Retry-After header. The limiter takes an injected clock, which made it possible to test without waiting.
            </p>
          </div>
          <div className="block">
            <h3 className="h3">A parser bug found while preparing for interviews</h3>
            <p>
              While reviewing the code I found that a line like 1/0 cup sugar crashed the parser with a division error, and one
              bad line failed the whole recipe. The fix treats a line that only looks like it starts with a quantity as plain
              text, and new regression tests check that the other lines in the recipe still parse.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="quality" n="06" title="Quality and security">
          <p>
            The backend has 165 automated pytest tests across 9 files, which run in CI on every push. Tests use an in-memory
            SQLite database, so they are fast and need no setup.
          </p>
          <div className="bars" role="table" aria-label="Tests by area">
            {tests.map((t) => (
              <div className="bar-row" role="row" key={t.name}>
                <span className="name" role="cell">
                  {t.name}
                </span>
                <span className="track" aria-hidden="true">
                  <div className="bar" style={{ width: `${t.width}%` }} />
                </span>
                <span className="mono count-n" role="cell">
                  {t.n}
                </span>
              </div>
            ))}
          </div>
          <p>
            On security, secrets come only from environment variables and the app refuses to start if one is missing. Cookies are
            marked Secure in production, cross-origin access is limited to the frontend&apos;s own address, the heavy endpoints
            are rate limited, and uploaded photos are never written to disk or the database.
          </p>
        </CaseSection>

        <CaseSection id="limits" n="07" title="Limitations and next steps">
          <p>The app is a portfolio project, not a medical tool, and it has known gaps that I would rather state than hide.</p>
          <ul>
            <li>
              <b>Free hosting:</b> the first visit after a quiet period is slow. A paid always-on host is on the roadmap.
            </li>
            <li>
              <b>Rate limiter:</b> it keeps its counts in memory, so they reset when the server restarts and would not be shared
              across several servers.
            </li>
            <li>
              <b>Dictionary coverage:</b> matching depends on my ingredient list, and some phrases are misread. For example,
              &ldquo;stock cube&rdquo; matches the &ldquo;stock&rdquo; entry and can be wrongly called safe.
            </li>
            <li>
              <b>Error handling:</b> the check, lookup, scan and save calls handle network errors, but the navigation bar and the
              login, register and history pages do not yet.
            </li>
            <li>
              <b>Cleanup:</b> the Pydantic config style is deprecated and one schema class is duplicated.
            </li>
          </ul>
        </CaseSection>

        <CaseSection id="learned" n="08" title="What I learned" last>
          <Rows>
            <Row k="The edge cases are the work">
              The happy path took a fraction of the time. Odd input, such as a bad fraction, a two-column photo or a sleeping
              server, is where the real design decisions were.
            </Row>
            <Row k="Say “I don't know”">
              Adding the Unrecognized outcome made the product more trustworthy than a confident wrong answer would have.
            </Row>
            <Row k="Constraints are design input">
              Free tiers forced me to shrink images in the browser, limit scans, and design the waiting experience, and the app is
              better for all three.
            </Row>
            <Row k="Make time testable">
              Injecting a clock into the rate limiter turned an hour-long behavior into a millisecond test.
            </Row>
          </Rows>
        </CaseSection>
      </CaseLayout>

      <CaseFooter next={{ label: "My World", href: "/work/my-world" }} />
    </SiteFrame>
  );
}
