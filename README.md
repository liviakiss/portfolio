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
| Home page text: hero, tools, right now, credentials, about, contact | `src/lib/content.ts` |
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
