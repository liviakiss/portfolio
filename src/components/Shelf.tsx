"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, type ProjectId } from "../lib/content";
import type { Commit } from "../lib/github";
import { Commits } from "./Commits";

/** The bookshelf: three spines, click one to open its details underneath. */
export function Shelf({ commits }: { commits: Commit[] }) {
  const [id, setId] = useState<ProjectId>("recipe");
  const sel = projects.find((p) => p.id === id) ?? projects[0];
  const inProgress = projects.filter((p) => p.spine.status === "Wip").length;

  return (
    <section id="work" className="shelf-sec">
      <div className="mono acc">[ 01 the shelf ] pick a volume</div>

      <div className="books">
        {projects.map((p, i) => (
          <div key={p.id} className="rise" style={{ animationDelay: `${0.35 + i * 0.15}s` }}>
            <button
              type="button"
              className={["spine", p.spine.variant, id === p.id ? "on" : ""].filter(Boolean).join(" ")}
              aria-pressed={id === p.id}
              aria-label={`${p.title}, ${p.statusLong}. Show details.`}
              onClick={() => setId(p.id)}
              style={{ width: p.spine.width, height: p.spine.height, backgroundColor: `var(${p.spine.color})` }}
            >
              <span className={p.spine.ivory ? "ttl ivory" : "ttl"}>{p.title}</span>
              <span className="stt">
                <span className="dot" style={{ background: p.spine.dot }} />
                <span className="mono">{p.spine.status}</span>
              </span>
            </button>
          </div>
        ))}

        <div className="rise ghost-1" aria-hidden="true" style={{ animationDelay: "0.8s" }}>
          <span className="mono">next project</span>
        </div>
        <div className="rise ghost-2" aria-hidden="true" style={{ animationDelay: "0.95s" }}>
          <div />
        </div>
        <div className="rise mono count" style={{ animationDelay: "1.1s" }}>
          {projects.length} volumes
          <br />
          {inProgress} in progress
        </div>
      </div>

      <div className="draw board" aria-hidden="true" />
      <div className="ruler" aria-hidden="true" />

      <div className="panel" aria-live="polite">
        <div className="panel-call">
          <div className="mono acc">{sel.call}</div>
          <div className="mono mute">{sel.statusLabel}</div>
        </div>
        <div className="panel-main">
          <h2>{sel.title}</h2>
          <p>{sel.line}</p>
          <div className="mono acc2">{sel.stack}</div>
        </div>
        <div className="panel-links">
          {sel.links.map((l) =>
            l.external ? (
              <a key={l.label} className={l.quiet ? "btn quiet" : "btn"} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ) : (
              <Link key={l.label} className={l.quiet ? "btn quiet" : "btn"} href={l.href}>
                {l.label}
              </Link>
            ),
          )}
        </div>

        {sel.showCommits && commits.length > 0 && (
          <div className="now">
            <div className="now-label">
              <div className="mono acc2">Right now</div>
            </div>
            <div className="now-body">
              <Commits commits={commits} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
