import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../../components/ContactForm";
import { FreelanceCta } from "../../components/FreelanceCta";
import { SiteFrame } from "../../components/SiteFrame";
import { gifs, site } from "../../lib/content";
import { freelance as f, HEALTH_CHECK } from "../../lib/freelance";

export const metadata: Metadata = {
  title: "Freelance websites",
  description: f.sub,
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function FreelancePage() {
  return (
    <SiteFrame>
      <main id="main">
        <section className="fl-hero rise">
          <Link className="mono lk back" href="/">
            ← Home
          </Link>
          <div className="mono fl-eyebrow">
            <span className="dot dot--sage" />
            {f.eyebrow}
          </div>
          <h1 className="fl-title">{f.headline}</h1>
          <p className="fl-sub">{f.sub}</p>
          <div className="fl-actions">
            <FreelanceCta>{f.cta} →</FreelanceCta>
          </div>
          <div className="fl-facts">
            {f.facts.map((x) => (
              <div key={x.k}>
                <div className="mono">{x.k}</div>
                <div>{x.v}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="fl-sec" aria-labelledby="fl-get">
          <div className="mono sec-label">[ 01 what you get ]</div>
          <h2 className="fl-h2" id="fl-get">
            {f.getTitle}
          </h2>
          <div className="fl-cards">
            {f.get.map((g, i) => (
              <article className="fl-card" key={g.title}>
                <div className="mono">No. {pad(i + 1)}</div>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fl-sec" aria-labelledby="fl-process">
          <div className="mono sec-label">[ 02 process ]</div>
          <h2 className="fl-h2" id="fl-process">
            {f.processTitle}
          </h2>
          <ol className="fl-steps">
            {f.process.map((s, i) => (
              <li className="fl-step" key={s.title}>
                <span className="mono n">{pad(i + 1)}</span>
                <div>
                  <h3>
                    {s.title}
                    {s.tag && <span className="mono fl-tag">{s.tag}</span>}
                  </h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="fl-sec" aria-labelledby="fl-pricing">
          <div className="mono sec-label">[ 03 pricing ]</div>
          <h2 className="fl-h2" id="fl-pricing">
            {f.pricingTitle}
          </h2>
          <p className="fl-lead">{f.pricingIntro}</p>
          <table className="fl-price">
            <caption className="sr-only">Starting prices</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">What</th>
                <th scope="col">Starts from</th>
              </tr>
            </thead>
            <tbody>
              {f.pricing.map((p) => (
                <tr key={p.what}>
                  <th scope="row">
                    {p.what}
                    {"detail" in p && p.detail && <span className="fl-detail">{p.detail}</span>}
                  </th>
                  <td>
                    <span className="mono fl-from">from</span> {p.from}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fl-note">{f.pricingNote}</p>
        </section>

        <section className="fl-sec" aria-labelledby="fl-check">
          <div className="mono sec-label">[ 04 free ]</div>
          <div className="fl-check">
            <h2 className="fl-h2" id="fl-check">
              {f.checkTitle}
            </h2>
            <p className="fl-lead">{f.checkText}</p>
            <FreelanceCta need={HEALTH_CHECK}>{f.checkCta} →</FreelanceCta>
          </div>
        </section>

        <section className="fl-sec" aria-labelledby="fl-faq">
          <div className="mono sec-label">[ 05 faq ]</div>
          <h2 className="fl-h2" id="fl-faq">
            {f.faqTitle}
          </h2>
          <div className="fl-faq">
            {f.faq.map((x) => (
              <details key={x.q}>
                <summary>{x.q}</summary>
                <p>{x.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="fl-sec fl-contact" id="contact-form" aria-labelledby="fl-contact">
          <div className="mono sec-label">[ 06 start ]</div>
          <h2 className="fl-h2" id="fl-contact">
            {f.contactTitle}
          </h2>
          <p className="fl-lead">{f.contactIntro}</p>
          <div className="fl-contact-grid">
            <ContactForm />
            <figure className="fl-waiting">
              <div className="fl-waiting-frame">
                {/* Plain <img>: an animated GIF, and it may be hosted outside the site. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gifs.cat}
                  alt="A cat looking straight into the camera, waiting"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="mono">{f.waiting}</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer>
        <div className="foot-bottom">
          <span className="mono">
            © {new Date().getFullYear()} {site.name}
          </span>
          <Link className="ln mono" href="/">
            Back to home ↑
          </Link>
        </div>
      </footer>
    </SiteFrame>
  );
}
