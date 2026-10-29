import { NextResponse } from "next/server";
import { formOptions } from "../../../lib/freelance";

/**
 * Receives the project enquiry form and emails it to Lívia through Resend
 * (https://resend.com). Needs two environment variables on Vercel:
 *   RESEND_API_KEY      the API key
 *   CONTACT_TO_EMAIL    where the enquiries should arrive
 * Optional:
 *   CONTACT_FROM_EMAIL  e.g. "Portfolio <hello@yourdomain.com>" (a domain verified in Resend).
 *                       Without it Resend's test sender is used.
 * Nothing is stored; the message goes straight to the inbox.
 */

const MAX_BODY = 20_000;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ");

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return NextResponse.json({ error: "too_large" }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Spam trap: a real person never fills the hidden field. Pretend it worked.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (tooMany(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const name = oneLine(text(body.name, 120));
  const email = oneLine(text(body.email, 254));
  const company = oneLine(text(body.company, 200));
  const need = text(body.need, 60);
  const budget = text(body.budget, 60);
  const timeline = text(body.timeline, 60);
  const message = text(body.message, 5000);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const needOk = (formOptions.needs as readonly string[]).includes(need);
  const budgetOk = budget === "" || (formOptions.budgets as readonly string[]).includes(budget);
  const timelineOk = timeline === "" || (formOptions.timelines as readonly string[]).includes(timeline);
  if (!name || !emailOk || !needOk || !budgetOk || !timelineOk || message.length < 10) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company / website: ${company || "-"}`,
    `Needs: ${need}`,
    `Budget: ${budget || "-"}`,
    `Timeline: ${timeline || "-"}`,
    "",
    message,
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New project enquiry: ${need} (${name})`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("Contact form: the email service answered", res.status);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch {
    console.error("Contact form: could not reach the email service.");
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
