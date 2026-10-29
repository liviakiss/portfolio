"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { formOptions, freelance, NEED_EVENT, SITE_NEEDS } from "../lib/freelance";
import { EmailButton } from "./EmailButton";

type Status = "idle" | "sending" | "sent" | "error";

/** The project enquiry form. It posts to /api/contact, which emails Lívia. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [need, setNeed] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);
  // For a health check or a fix-up there has to be a website to look at.
  const needsSite = SITE_NEEDS.includes(need);

  // The "Get my free check" button asks us to pre-select an answer.
  useEffect(() => {
    function onNeed(e: Event) {
      const value = (e as CustomEvent<string>).detail;
      if (formOptions.needs.includes(value as (typeof formOptions.needs)[number])) setNeed(value);
    }
    window.addEventListener(NEED_EVENT, onNeed);
    return () => window.removeEventListener(NEED_EVENT, onNeed);
  }, []);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="fl-sent" ref={doneRef} tabIndex={-1} role="status">
        <span className="dot dot--done" aria-hidden="true" />
        <p>{freelance.sent}</p>
      </div>
    );
  }

  return (
    <form className="fl-form" onSubmit={onSubmit} noValidate={false}>
      <div className="fl-field">
        <label className="mono" htmlFor="f-name">
          Name
        </label>
        <input id="f-name" name="name" type="text" required maxLength={120} autoComplete="name" />
      </div>

      <div className="fl-field">
        <label className="mono" htmlFor="f-email">
          Email
        </label>
        <input id="f-email" name="email" type="email" required maxLength={254} autoComplete="email" />
      </div>

      <div className="fl-field full">
        <label className="mono" htmlFor="f-company">
          Company and current website <span className="fl-opt">{needsSite ? "required for this" : "optional"}</span>
        </label>
        <input
          id="f-company"
          name="company"
          type="text"
          required={needsSite}
          maxLength={200}
          autoComplete="organization"
          placeholder={needsSite ? "https://yourwebsite.com" : undefined}
        />
      </div>

      <div className="fl-field full">
        <label className="mono" htmlFor="f-need">
          What do you need?
        </label>
        <select id="f-need" name="need" required value={need} onChange={(e) => setNeed(e.target.value)}>
          <option value="" disabled>
            Choose one
          </option>
          {formOptions.needs.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="fl-field">
        <label className="mono" htmlFor="f-budget">
          Budget <span className="fl-opt">excl. VAT</span>
        </label>
        <select id="f-budget" name="budget" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {formOptions.budgets.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="fl-field">
        <label className="mono" htmlFor="f-timeline">
          Timeline <span className="fl-opt">optional</span>
        </label>
        <select id="f-timeline" name="timeline" defaultValue="">
          <option value="">Choose one</option>
          {formOptions.timelines.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="fl-field full">
        <label className="mono" htmlFor="f-message">
          Tell me about your project
        </label>
        <textarea id="f-message" name="message" required minLength={10} maxLength={5000} rows={6} />
      </div>

      {/* Spam trap: people never see or fill this, simple bots do. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="fl-actions-row full">
        <button type="submit" className="fl-send" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send"} <span aria-hidden="true">→</span>
        </button>
        <span className="mono mute fl-privacy">{freelance.privacy}</span>
      </div>

      <div className="fl-status full" aria-live="polite">
        {status === "error" && (
          <div className="fl-error">
            <p>Something went wrong and your message was not sent. Please try again, or write to me directly.</p>
            <EmailButton label="Write me an email" />
          </div>
        )}
      </div>
    </form>
  );
}
