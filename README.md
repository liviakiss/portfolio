# Lívia Kiss, portfolio

Next.js 16 (App Router) + TypeScript. Plain CSS, no UI library. Fonts are self-hosted from npm.
Design: "The shelf", dark by default.

## Run it

You need Node 20.9 or newer (you have 24, good).

```powershell
cd D:\Code\portfolio
npm install
npm run dev
```

Open http://localhost:3000. Check it builds the way Vercel will build it:

```powershell
npm run build
npm run start
```

## Where things are

| What | Where |
| --- | --- |
| Home page text: hero, tools, right now, credentials, about, the two contact cards | `src/lib/content.ts` |
| Freelance page text, prices, FAQ, form dropdowns | `src/lib/freelance.ts` |
| The three volumes on the shelf (title, line, links, spine size) | `src/lib/content.ts` > `projects` |
| Case study text | `src/app/work/<project>/page.tsx` |
| Colours, fonts, spacing, all styling | `src/app/globals.css` (colours are at the top, in `:root`) |
| Hero images of the case studies | `src/assets/*.jpg` |
| GitHub commit feed | `src/lib/github.ts` |
| Webhook for instant refresh | `src/app/api/revalidate/route.ts` |

## Things left for you

- **Euro Car Service, "What I learned":** in `src/app/work/euro-car-service/page.tsx`, fill the `lessons` list at the top. While it is empty, the section and its contents link stay hidden.
- **Screenshots of My World:** when you have real screens, replace the GIF figure on `src/app/work/my-world/page.tsx`.
- **Blur or keep:** the Euro Car Service screenshot shows the business's public contact details. You have the client's permission to show the project; blur the numbers in `src/assets/euro-hero.jpg` if you prefer.
- **Hosting the GIFs yourself:** the two GIFs load from Giphy right now. Save them into `public/img/` and change the two addresses in `src/lib/content.ts` > `gifs` to `/img/about.gif` and `/img/my-world.gif`. This is faster and sends no visitor data to Giphy.
- **Site address:** after deploying, set `NEXT_PUBLIC_SITE_URL` (for example `https://yourname.dev`) in Vercel so link previews use the right address.

## My World commit feed

The "Right now" block on the shelf and on the My World page reads the latest 3 commits of
`liviakiss/my-world` from GitHub. The repo is public, so no token is needed.

- It refreshes at most once an hour by itself.
- It hides itself when the newest commit is older than 14 days (`STALE_DAYS` in `src/lib/github.ts`) or when GitHub does not answer.
- It shows only the first line of each commit message and its date.
- If GitHub's rate limit ever becomes a problem, add a `GITHUB_TOKEN` (see `.env.example`).

**Instant refresh when you push** (optional, after deploying):

1. On Vercel, add the environment variable `GITHUB_WEBHOOK_SECRET` with any long random text.
2. In the `my-world` repo on GitHub: Settings > Webhooks > Add webhook.
3. Payload URL `https://YOUR-SITE/api/revalidate`, content type `application/json`, the same secret, event "Just the push event".

## Freelance page and contact form

The page lives at `/freelance` and is linked from the "Want to work together?" card in the contact section.
All its text, prices, FAQ and dropdown options are in `src/lib/freelance.ts`.
Three numbers there are yours to confirm: "2 working days" (proposal and reply), "1–2 weeks" and "3–5 weeks".

The form sends its message to `src/app/api/contact/route.ts`, which emails you through [Resend](https://resend.com).
Nothing is stored. It has a hidden spam trap, checks every field again on the server, and allows 5 messages per hour per visitor.

**Set it up (about 10 minutes):**

1. Create a free account on resend.com and make an API key (Resend > API Keys).
2. On Vercel: Project > Settings > Environment Variables, add `RESEND_API_KEY` (the key) and `CONTACT_TO_EMAIL` (the address where enquiries should arrive).
3. Redeploy (Deployments > the three dots > Redeploy).
4. Open `/freelance`, send yourself a test message.

Until step 2 is done the form shows "something went wrong" with a "Write me an email" button, so nobody loses a message.
Without your own domain, Resend sends from its test address, and only to the email address of your Resend account.
When you want the mail to come from your own domain, add it in Resend (Domains), add the DNS records it shows in Cloudflare (DNS only, grey cloud), then set `CONTACT_FROM_EMAIL` on Vercel, for example `Portfolio <hello@liviabuilds.com>`.
Replying to the enquiry in your mail app answers the visitor directly.

## Email address

The address is not written in the page. `src/components/EmailButton.tsx` joins it from the two parts in
`src/lib/content.ts` (`emailParts`) only when someone clicks the button.

## Put it on GitHub, then deploy

```powershell
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/liviakiss/portfolio.git
git push -u origin main
```

Then on vercel.com: Add New > Project > import the repo. No settings need changing. Add the environment variables
from `.env.example` if you want the instant refresh.
