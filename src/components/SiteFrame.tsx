import Link from "next/link";
import type { ReactNode } from "react";

/** The page width, the skip link and the top bar. Every page sits inside this. */
export function SiteFrame({ wide = false, children }: { wide?: boolean; children: ReactNode }) {
  return (
    <div className={wide ? "wrap wide" : "wrap"}>
      <a className="skip mono" href="#main">
        Skip to content
      </a>
      <header id="top" className="site-header">
        <Link className="mono brand" href="/">
          <span>[</span> lívia kiss <span>]</span>
        </Link>
        <nav aria-label="Main" className="nav mono">
          <Link href="/#work">Work</Link>
          <Link href="/#tools">Tools</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
