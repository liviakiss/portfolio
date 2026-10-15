import type { Metadata } from "next";
import heroImage from "../../../assets/euro-hero.jpg";
import { CaseFooter, CaseHero, CaseLayout, CaseSection, Diagram, HeroFigure, Pull, Row, Rows } from "../../../components/case";
import { SiteFrame } from "../../../components/SiteFrame";

export const metadata: Metadata = {
  title: "Euro Car Service",
  description:
    "A bilingual website with its own content management for a Bosch partner car workshop in Tatabánya, Hungary. Designed, built and handed over so the team can edit it without a developer.",
};

/**
 * TO FILL IN LATER (the sections stay hidden until they have text):
 *  - lessons: what you learned on this project. Example:
 *      { title: "Someone else has to use it", text: "One or two sentences." }
 */
const lessons: { title: string; text: string }[] = [];

export default function EuroCarServiceCaseStudy() {
  const toc = [
    { id: "brief", label: "The brief" },
    { id: "built", label: "What I built" },
    { id: "cms", label: "Content management" },
    { id: "how", label: "How it works" },
    { id: "privacy", label: "Privacy and security" },
    { id: "handover", label: "Handover" },
    { id: "next", label: "What is next" },
    ...(lessons.length > 0 ? [{ id: "learned", label: "What I learned" }] : []),
  ];

  return (
    <SiteFrame wide>
      <CaseHero
        number="02"
        status="Delivered"
        title="Euro Car Service"
        intro="A bilingual website with its own content management for a Bosch partner car workshop in Tatabánya, Hungary. I designed and built it, and handed over a site the team can edit without a developer."
        links={[
          { label: "Live site ↗", href: "https://eurocarservice.hu" },
          { label: "Source code ↗", href: "https://github.com/eurocarservicekft/Bosch" },
        ]}
        meta={[
          { label: "Client", value: "EURO CAR SERVICE Kft., Tatabánya" },
          { label: "Role", value: "Design, development and handover" },
          { label: "Stack", value: "Next.js 16, TypeScript, Tailwind CSS, Sanity CMS" },
          { label: "Hosting", value: "Netlify" },
        ]}
        note="Delivered in July 2026. The site, the code and the accounts belong to the client."
      />

      <HeroFigure
        src={heroImage}
        alt="The Euro Car Service website: the home page on desktop, the services page, and the contact page on a phone"
        caption="Fig. 1 · The home page on desktop, the services page, and the contact page on a phone."
      />

      <CaseLayout toc={toc}>
        <CaseSection id="brief" n="01" title="The brief" first>
          <p>
            EURO CAR SERVICE is a Bosch partner car workshop in Tatabánya, Hungary. The team needed a new website that works well
            on a phone, speaks both Hungarian and English, and that they can update themselves without calling a developer.
          </p>
          <p>
            Most visitors of a local workshop arrive from a phone, usually to do one of three things: call, send a message or
            find the address. So the site had to make those three things the easiest actions on every page.
          </p>
        </CaseSection>

        <CaseSection id="built" n="02" title="What I built">
          <p>A completely new site, designed and built from scratch, with these pages:</p>
          <Rows>
            <Row k="Home">Introduction, an overview of the services and customer reviews</Row>
            <Row k="Services">The full price list and the hourly rate</Row>
            <Row k="About">The workshop and the team, key numbers and qualifications</Row>
            <Row k="Gallery">Photos of the work</Row>
            <Row k="Contact">Phone, e-mail, WhatsApp, address, map and a message form</Row>
            <Row k="Legal">Privacy policy and cookie policy (GDPR), and a custom 404 page</Row>
          </Rows>
          <p>Because the visitors are mostly on phones, the site is designed for phones first.</p>
          <ul>
            <li>The phone number can be called with one tap, on every page.</li>
            <li>A quick bar at the bottom of the screen on mobile: Call, Message, Map.</li>
            <li>Fast loading and a clean, modern look.</li>
            <li>A HU / EN switch in the header.</li>
          </ul>
        </CaseSection>

        <CaseSection id="cms" n="03" title="Content management">
          <p>
            The team edits the site in Sanity Studio. They sign in with the company&apos;s Google account, change the text and
            press Publish. The change is live within a few minutes. No programming knowledge is needed.
          </p>
          <p>They can edit:</p>
          <ul>
            <li>Company details: phone, e-mail, address, WhatsApp, opening hours and social links.</li>
            <li>The home page headline and introduction.</li>
            <li>Services: names, descriptions and prices. New services can be added.</li>
            <li>The hourly rate, the About page, reviews, gallery photos and background images.</li>
          </ul>
          <Pull>
            Every text field has a Hungarian and an English version. If the English one is left empty, the site shows the
            Hungarian text instead of a blank.
          </Pull>
        </CaseSection>

        <CaseSection id="how" n="04" title="How it works">
          <p>
            The site is a Next.js app hosted on Netlify. Its content lives in Sanity, which is why a published edit reaches the
            live site within minutes. The contact form posts to the site&apos;s own API endpoint, which sends the e-mail with
            Nodemailer. Analytics starts only after the visitor accepts cookies.
          </p>
          <Diagram
            label="Diagram of content, contact form and analytics"
            caption="Fig. 2 · Content, contact form and analytics. Dashed: only with the visitor's consent."
          >
            <svg
              viewBox="0 0 960 270"
              role="img"
              aria-label="Diagram: a visitor opens the Next.js site on Netlify. The site reads its content from Sanity, which the team edits in Sanity Studio. The contact form posts to the site's own API, which sends an e-mail to the company inbox. Google Analytics only runs after the visitor accepts cookies."
            >
              <defs>
                <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0L10 5L0 10z" style={{ fill: "var(--acc)" }} />
                </marker>
              </defs>
              <rect className="bx" x="20" y="100" width="150" height="76" rx="2" />
              <text className="sv" x="38" y="134">Visitor</text>
              <text className="ss" x="38" y="156">phone or desktop</text>
              <rect className="bx" x="250" y="100" width="210" height="76" rx="2" />
              <text className="sv" x="268" y="134">Netlify</text>
              <text className="ss" x="268" y="156">Next.js 16 site · HU / EN</text>
              <rect className="bx" x="540" y="20" width="190" height="76" rx="2" />
              <text className="sv" x="558" y="54">Sanity CMS</text>
              <text className="ss" x="558" y="76">texts, prices, photos</text>
              <rect className="bx" x="810" y="20" width="130" height="76" rx="2" />
              <text className="sv" x="828" y="54">The team</text>
              <text className="ss" x="828" y="76">Sanity Studio</text>
              <rect className="bx" x="540" y="176" width="190" height="76" rx="2" />
              <text className="sv" x="558" y="210">Contact API</text>
              <text className="ss" x="558" y="232">own endpoint · Nodemailer</text>
              <rect className="bx" x="810" y="176" width="130" height="76" rx="2" />
              <text className="sv" x="828" y="210">Inbox</text>
              <text className="ss" x="828" y="232">the company</text>
              <rect className="bx" x="250" y="206" width="210" height="46" rx="2" strokeDasharray="5 4" />
              <text className="ss" x="268" y="226">Google Analytics 4</text>
              <text className="ss" x="268" y="243">only after cookie consent</text>
              <path className="ar" d="M172 138H246" markerEnd="url(#ah)" />
              <path className="ar" d="M538 76L462 114" markerEnd="url(#ah)" />
              <path className="ar" d="M808 58H734" markerEnd="url(#ah)" />
              <path className="ar" d="M462 162L538 198" markerEnd="url(#ah)" />
              <path className="ar" d="M732 214H806" markerEnd="url(#ah)" />
              <path className="ar" d="M95 178V229H246" strokeDasharray="5 4" markerEnd="url(#ah)" />
            </svg>
          </Diagram>
          <Rows>
            <Row k="Framework">Next.js 16 (React 19, TypeScript)</Row>
            <Row k="Look">Tailwind CSS with a custom brand system, shadcn/ui (Radix) for the form elements</Row>
            <Row k="Motion">Framer Motion, kept subtle</Row>
            <Row k="Content">Sanity CMS</Row>
            <Row k="E-mail">Nodemailer, in the site&apos;s own API endpoint</Row>
            <Row k="Hosting and code">Netlify and GitHub, both under the company&apos;s own accounts</Row>
            <Row k="Statistics">Google Analytics 4, with consent</Row>
          </Rows>
        </CaseSection>

        <CaseSection id="privacy" n="05" title="Privacy and security">
          <p>A workshop&apos;s site collects very little, but what it does collect has to be handled properly. These were the decisions.</p>
          <ul>
            <li>
              <b>The contact form does not use an outside service.</b> It runs on the site&apos;s own endpoint, so visitors&apos;
              messages never pass through a third party. It has built-in protection against automatic spam, and its service list
              is read from the same content the team edits.
            </li>
            <li>
              <b>Analytics needs consent.</b> Google Analytics 4 measures page views, device type and a rough region, but only if
              the visitor accepts cookies. The cookie bar offers &ldquo;Accept&rdquo; and &ldquo;Only the necessary&rdquo;, and
              the choice can be changed at any time from the footer.
            </li>
            <li>
              <b>Real legal texts.</b> The privacy policy and cookie policy use the company&apos;s real details. I recommended
              that a legal expert reviews them before launch.
            </li>
            <li>
              <b>The client owns everything.</b> Source code, hosting and content management are all under the company&apos;s own
              accounts, and I advised changing the passwords once the project was closed.
            </li>
          </ul>
          <p>
            For search engines, every page has its own title and description in both languages, structured company information
            (auto repair business, address, phone, opening hours), a sitemap, a robots file, a share preview image for Facebook,
            Messenger and WhatsApp, and correct language markup.
          </p>
        </CaseSection>

        <CaseSection id="handover" n="06" title="Handover">
          <p>
            I wrote a handover document for the team, in Hungarian: what was built, how to edit each part of the site, how search
            and analytics work, how the contact form works, the technical background, the accounts, and a step-by-step guide to
            uploading photos to the gallery.
          </p>
          <p>
            I also wrote a Facebook marketing guide for them: how the algorithm works, how often and when to post, four content
            pillars, tone, links and hashtags, and a simple monthly plan.
          </p>
        </CaseSection>

        <CaseSection id="next" n="07" title="What is next" last={lessons.length === 0}>
          <p>
            At handover the site was finished. What was left was on the client&apos;s side: uploading real photos of the team and
            the workshop.
          </p>
          <ul>
            <li>
              <b>Real photos:</b> the team photo for the About page and gallery photos of the workshop and the work.
            </li>
            <li>
              <b>Google Business Profile:</b> fill it in and add the website, the most effective step for local search.
            </li>
            <li>
              <b>Legal review:</b> have an expert read the privacy texts.
            </li>
          </ul>
        </CaseSection>

        {lessons.length > 0 && (
          <CaseSection id="learned" n="08" title="What I learned" last>
            <Rows>
              {lessons.map((l) => (
                <Row key={l.title} k={l.title}>
                  {l.text}
                </Row>
              ))}
            </Rows>
          </CaseSection>
        )}
      </CaseLayout>

      <CaseFooter next={{ label: "Recipe Intolerance Helper", href: "/work/recipe-intolerance-helper" }} />
    </SiteFrame>
  );
}
