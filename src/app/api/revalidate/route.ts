import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * GitHub webhook receiver. When you push to the my-world repo, GitHub calls
 * this URL and the commit list on the site refreshes straight away instead of
 * waiting for the hourly refresh.
 *
 * Setup (after deploying), in the my-world repo on GitHub:
 *   Settings > Webhooks > Add webhook
 *   Payload URL:   https://YOUR-SITE/api/revalidate
 *   Content type:  application/json
 *   Secret:        the same value as GITHUB_WEBHOOK_SECRET on Vercel
 *   Events:        "Just the push event"
 */
export async function POST(request: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("Webhook is not configured", { status: 503 });
  }

  // GitHub signs the raw body with the shared secret. Check it before doing anything.
  const body = await request.text();
  const received = Buffer.from(request.headers.get("x-hub-signature-256") ?? "");
  const expected = Buffer.from("sha256=" + createHmac("sha256", secret).update(body).digest("hex"));
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = request.headers.get("x-github-event");
  if (event === "ping") return Response.json({ ok: true, pong: true });
  if (event !== "push") return Response.json({ ok: true, ignored: event });

  revalidateTag("commits", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/work/my-world");

  return Response.json({ ok: true, revalidated: true });
}
