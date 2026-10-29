import Link from "next/link";
import { about, contact, gifs, hero, rightNow, site, tools } from "../lib/content";
import type { Commit } from "../lib/github";
import { Credentials } from "./Credentials";
import { EmailButton } from "./EmailButton";
import { Shelf } from "./Shelf";
import { SiteFrame } from "./SiteFrame";

/** The whole home page. `commits` comes from the server (see app/page.tsx). */
export function HomeView({ commits }: { commits: Commit[] }) {
  return (
    <SiteFrame>
      <main id="main">
        <section className="hero rise">
          <div className="hero-main">
            <h1>{hero.headline}</h1>
            <p>{hero.sub}</p>
          </div>
          <div className="avail" aria-label="Availability">
            <div className="avail-title">
              <span className="dot" />
              {hero.availability}
            </div>
            <div className="mono avail-where">{hero.where}</div>
          </div>
        </section>

        <Shelf commits={commits} />

        <section id="tools" className="tools-sec">
          <div className="mono sec-label">[ 02 tools · right now · credentials ]</div>

          <div className="tools-grid">
            <div className="tools-col">
              <h3 className="h3d">Tools</h3>
              <div className="list">
                {tools.map((t) => (
                  <div className="kv" key={t.group}>
                    <span className="mono k">{t.group}</span>
                    <span className="v">{t.items}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tools-col">
              <h3 className="h3d">Right now</h3>
              <div className="list">
                {rightNow.map((r) => (
                  <div className="now-item" key={r.title}>
                    <span className="ring" />
                    <span>
                      {r.title}
                      <br />
                      <span className="sub">{r.note}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Credentials />
        </section>

        <section id="about" className="about-sec">
          <div className="mono sec-label">[ 03 about ]</div>
          <div className="about-grid">
            <div className="about">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="quiet">{about.quiet}</p>
            </div>
            <figure className="about-gif">
              {/* Plain <img>: an animated GIF, and it may be hosted outside the site. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gifs.about} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
            </figure>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="board sm" aria-hidden="true" />
        <div className="ruler" aria-hidden="true" />
        <div className="contact">
          <div className="mono sec-label">[ 04 contact ]</div>

          <div className="paths">
            <article className="path path-role" aria-labelledby="path-role">
              <div className="mono path-label">
                <span className="dot dot--blue" aria-hidden="true" />
                {contact.role.label}
              </div>
              <h2 id="path-role">
                {contact.role.heading} <em>{contact.role.headingAccent}</em>
              </h2>
              <p>{contact.role.text}</p>
              <EmailButton label={contact.role.button} />
            </article>

            <article className="path path-project" aria-labelledby="path-project">
              <div className="mono path-label">
                <span className="dot dot--sage" aria-hidden="true" />
                {contact.project.label}
              </div>
              <h2 id="path-project">
                {contact.project.heading} <em>{contact.project.headingAccent}</em>
              </h2>
              <p>{contact.project.text}</p>
              <Link className="mail-btn alt" href={contact.project.href}>
                {contact.project.button} <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>

          <aside className="elsewhere" aria-label="Elsewhere">
            <div className="elsewhere-head">
              <span className="mono mute">Card</span>
              <span className="mono acc">No. 003 · Elsewhere</span>
            </div>
            <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">
              <span className="mono">GitHub</span>
              <span>liviakiss ↗</span>
            </a>
            <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <span className="mono">LinkedIn</span>
              <span>Lívia Kiss ↗</span>
            </a>
          </aside>
        </div>
        <div className="foot-bottom">
          <span className="mono">
            © {new Date().getFullYear()} {site.name} · {contact.footnote}
          </span>
          <a className="ln mono" href="#top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </SiteFrame>
  );
}
