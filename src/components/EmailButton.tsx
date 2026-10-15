"use client";

import { site } from "../lib/content";

/**
 * The address is never written into the page. It is joined together here,
 * in the browser, at the moment of the click.
 */
export function EmailButton({ label }: { label: string }) {
  function open() {
    window.location.href = "mailto:" + site.emailParts.join("@");
  }
  return (
    <button type="button" className="mail-btn" onClick={open} aria-label="Send Lívia an email">
      {label} <span>→</span>
    </button>
  );
}
