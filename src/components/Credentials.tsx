"use client";

import { useState } from "react";
import { credentials } from "../lib/content";

/**
 * The card file. Eight index cards stacked with their tabs staggered;
 * click a tab and that card slides open with its details and verify link.
 * Every tab stays visible, whichever card is open.
 */
export function Credentials() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      <div className="cred-head">
        <h3 className="h3d" style={{ margin: 0 }}>
          Credentials
        </h3>
        <span className="mono mute">The card file · {credentials.length} cards · finished only</span>
      </div>
      <div>
        {credentials.map((c, i) => {
          const on = open === i;
          const number = String(i + 1).padStart(2, "0");
          return (
            <div key={c.tab} className={`cd k${(i % 4) + 1}${on ? " on" : ""}`}>
              <button
                type="button"
                className={`ctab p${i % 3}`}
                aria-pressed={on}
                aria-label={`Credential ${i + 1}: ${c.tab}. Show details.`}
                onClick={() => setOpen(i)}
              >
                {c.year && <span className="y">{c.year}</span>}
                <span className="t">{c.tab}</span>
              </button>
              <div className="sheet">
                <div className="det-wrap">
                  <div className="det" aria-hidden={!on}>
                    <span className="mono no">
                      No. {number}
                      {c.date ? ` · ${c.date}` : ""}
                    </span>
                    <span className="main">
                      <span className="name">{c.title}</span>
                      <span className="mono issuer">{c.issuer}</span>
                    </span>
                    {c.verify && (
                      <a className="ln mono verify" href={c.verify} target="_blank" rel="noopener noreferrer">
                        Verify ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
