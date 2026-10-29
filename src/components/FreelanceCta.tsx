"use client";

import type { ReactNode } from "react";
import { NEED_EVENT } from "../lib/freelance";

/**
 * A button-looking link that jumps to the contact form.
 * When `need` is given, it also pre-selects that answer in "What do you need?".
 */
export function FreelanceCta({
  need,
  quiet = false,
  children,
}: {
  need?: string;
  quiet?: boolean;
  children: ReactNode;
}) {
  function pick() {
    if (need) window.dispatchEvent(new CustomEvent(NEED_EVENT, { detail: need }));
  }
  return (
    <a className={quiet ? "btn quiet" : "btn"} href="#contact-form" onClick={pick}>
      {children}
    </a>
  );
}
