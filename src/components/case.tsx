import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/* Building blocks shared by the three case-study pages. */

export type CaseLink = { label: string; href: string };

export function CaseHero({
  number,
  status,
  tone = "done",
  title,
  tagline,
  intro,
  links,
  meta,
  note,
}: {
  number: string;
  status: string;
  /** "done" = green dot, "amber" = in progress */
  tone?: "done" | "amber";
  title: string;
  tagline?: string;
  intro: string;
  links: CaseLink[];
  meta: { label: string; value: string }[];
  note?: string;
}) {
  return (
    <section className="case-hero rise">
      <Link className="mono lk back" href="/#work">
        ← The shelf
      </Link>
      <div className={tone === "amber" ? "mono case-status amber" : "mono case-status"}>
        <span className={tone === "amber" ? "dot dot--amber" : "dot dot--done"} />
        Case study {number} · {status}
      </div>
      <h1 className={tagline ? "case-title tight" : "case-title"}>{title}</h1>
      {tagline && <div className="mono case-tag">{tagline}</div>}
      <p className="case-intro">{intro}</p>
      <div className="case-links">
        {links.map((l, i) => (
          <a
            key={l.href}
            className={i === 0 ? "btn" : "btn quiet"}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {l.label}
          </a>
        ))}
      </div>
      <div className="meta">
        {meta.map((m) => (
          <div key={m.label}>
            <div className="mono">{m.label}</div>
            <div>{m.value}</div>
          </div>
        ))}
      </div>
      {note && <p className="case-note">{note}</p>}
    </section>
  );
}

/** The big picture under the title. One combined image per project. */
export function HeroFigure({ src, alt, caption }: { src: StaticImageData; alt: string; caption: string }) {
  return (
    <figure className="fig">
      <Image src={src} alt={alt} sizes="(min-width: 1180px) 1100px, 100vw" priority placeholder="empty" />
      <figcaption className="mono">{caption}</figcaption>
    </figure>
  );
}

/** Sticky contents on the left (hidden on small screens), the text on the right. */
export function CaseLayout({ toc, children }: { toc: { id: string; label: string }[]; children: ReactNode }) {
  return (
    <div className="case-grid">
      <aside className="toc" aria-label="Contents">
        <div className="mono toc-head">Contents</div>
        {toc.map((t, i) => (
          <a key={t.id} href={`#${t.id}`}>
            <span className="mono n">{String(i + 1).padStart(2, "0")}</span>
            {t.label}
          </a>
        ))}
      </aside>
      <main id="main" className="body case-main">
        {children}
      </main>
    </div>
  );
}

export function CaseSection({
  id,
  n,
  title,
  first = false,
  last = false,
  children,
}: {
  id: string;
  n: string;
  title: string;
  first?: boolean;
  last?: boolean;
  children: ReactNode;
}) {
  const cls = ["sec", first ? "first" : "", last ? "last" : ""].filter(Boolean).join(" ");
  return (
    <section id={id} className={cls}>
      <div className="mono sec-n">[ {n} ]</div>
      <h2 className="h2">{title}</h2>
      {children}
    </section>
  );
}

export function Rows({ children }: { children: ReactNode }) {
  return <div className="rows">{children}</div>;
}

type DotKind = "done" | "amber" | "sage" | "mauve" | "ring" | "ring-amber";

export function Dot({ kind }: { kind: DotKind }) {
  return <span className={`dot dot--${kind}`} />;
}

/** A row with a left label and a right text. `dot` adds a coloured dot before the label. */
export function Row({ k, dot, num, children }: { k?: ReactNode; dot?: DotKind; num?: string; children: ReactNode }) {
  return (
    <div className={dot ? "row lead" : "row"}>
      {num && <span className="mono num">{num}</span>}
      {k !== undefined && (
        <span className={dot ? "k dotted" : "k"}>
          {dot && <Dot kind={dot} />}
          {k}
        </span>
      )}
      <span className="v">{children}</span>
    </div>
  );
}

export function Pull({ children }: { children: ReactNode }) {
  return <p className="pull">{children}</p>;
}

/** A framed diagram. On narrow screens it scrolls sideways instead of shrinking to unreadable text. */
export function Diagram({ label, caption, children }: { label: string; caption: string; children: ReactNode }) {
  return (
    <figure className="diagram">
      <div className="scroll" role="region" aria-label={`${label} (scrolls sideways on small screens)`} tabIndex={0}>
        {children}
      </div>
      <figcaption className="mono">{caption}</figcaption>
    </figure>
  );
}

export function CaseFooter({ next }: { next: { label: string; href: string } }) {
  return (
    <footer className="case-foot">
      <Link className="ln mono" href="/#work">
        ← Back to the shelf
      </Link>
      <Link className="ln mono" href={next.href}>
        Next: {next.label} →
      </Link>
    </footer>
  );
}
