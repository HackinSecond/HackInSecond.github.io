# Hack In Seconds website

Static cybersecurity-education site built with **Astro + TypeScript**. It builds to plain HTML/CSS/JS, so it runs on **GitHub Pages** with no server, database or paid service.

- Production URL: **https://hackinsecond.github.io** (base path `/`)
- Repository it must live in: **https://github.com/HackinSecond/hackinsecond.github.io**
- Forms: Formspree (you add the form ID). Chatbot: rule-based, no API key.

## 1. Run it locally

```bash
npm install
cp .env.example .env     # then edit PUBLIC_FORMSPREE_FORM_ID
npm run dev              # http://localhost:4321
npm run build            # output in dist/
npm test                 # checks dist/: links, canonicals, sitemap, JSON-LD, sample-content safety
```
Needs Node 20 or newer.

## 2. Publish to GitHub Pages (primary hosting)

1. **Create the repository.** On GitHub (logged in as HackinSecond) go to *New repository*. The name must be exactly `hackinsecond.github.io`, visibility **Public**. Do not add a README/licence (this project has them). When this was prepared, `github.com/HackinSecond/hackinsecond.github.io` returned 404, so it either does not exist yet or is private.
2. **Push the project** from this folder:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial Hack In Seconds site"
   git remote add origin https://github.com/HackinSecond/hackinsecond.github.io.git
   git push -u origin main
   ```
   Commit `package-lock.json` too (the workflow uses `npm ci`).
3. **Turn on Pages:** repository *Settings → Pages → Build and deployment → Source: **GitHub Actions***.
4. **Permissions:** the workflow already requests `contents: read`, `pages: write`, `id-token: write`. Only if your account/organisation restricts workflows, check *Settings → Actions → General → Workflow permissions* and allow Actions to run.
5. **Add the Formspree variable** (section 4) *before or after* the first run, then re-run the workflow.
6. Open the **Actions** tab. The "Deploy to GitHub Pages" run builds, tests and deploys. When it is green the site is live at https://hackinsecond.github.io (HTTPS is automatic; tick *Enforce HTTPS* in Settings → Pages if shown).

Every later `git push` to `main` redeploys.

### Hosting notes
- `hackinsecond.github.io` is a GitHub-controlled domain. It can only be served by GitHub Pages. **Do not** add it as a custom domain in Vercel.
- **Vercel is an optional alternative.** Import the repo in Vercel; it will use `vercel.json`, build with `npm run build` and give you a `*.vercel.app` URL. Set `SITE_URL` to that URL in Vercel's environment variables so canonicals and the sitemap match, and `PUBLIC_FORMSPREE_FORM_ID` too. You can only use `hackinsecond.github.io` on GitHub Pages.
- A project site such as `username.github.io/some-repo/` would need `BASE_PATH=/some-repo/`. You do not need this for your user site.

## 3. Configuration reference

| Setting | Where | Notes |
|---|---|---|
| Site URL / base path | `SITE_URL`, `BASE_PATH` env (defaults: `https://hackinsecond.github.io`, `/`) | read by `astro.config.mjs` |
| Formspree form ID | `PUBLIC_FORMSPREE_FORM_ID` | public by design |
| Analytics | `PUBLIC_ANALYTICS_PROVIDER` (`none`/`plausible`), `PUBLIC_PLAUSIBLE_DOMAIN` | off by default |
| Brand text, social links, popup timing, contact email, refund text | `src/config/site.ts` | one place |
| Navigation | `NAV` in `src/config/site.ts` | |

## 4. Formspree checklist

1. Create a free account at formspree.io, then *New form*. Name it "Hack In Seconds".
2. Copy the ID from the endpoint `https://formspree.io/f/<ID>`.
3. **Local:** put it in `.env` as `PUBLIC_FORMSPREE_FORM_ID=<ID>`.
4. **GitHub:** repository *Settings → Secrets and variables → Actions → Variables tab → New repository variable*: name `PUBLIC_FORMSPREE_FORM_ID`, value `<ID>`. (A variable, not a secret, because the ID ends up in the public page.) Re-run the workflow.
5. In the Formspree dashboard set the **notification email**, enable **spam protection** (reCAPTCHA or Formspree's spam filtering) and, if you use domain restrictions, allow `hackinsecond.github.io`.
6. The forms send `name`, `email` or `phone`, `contactMethod`, `consent`, `source`, `page`, and an empty `_gotcha` honeypot field.
7. **Test with the real service:** submit the contact form and the popup on the live site, and confirm both arrive in Formspree. Until then, do not treat the forms as connected.

Behaviour without an ID: the popup is not rendered in production builds; the contact form shows "not connected" and sends nothing; `npm run dev` shows a developer warning.

Important: Formspree **collects** submissions. It does not send newsletters or handle unsubscribes by itself. To email subscribers you need a mailing tool (export or integrate from Formspree) and an unsubscribe process. Until then, the site tells people to use the contact form to unsubscribe.

## 5. Updating content (no component edits needed)

All content lives in `src/data/`. Edit, commit, push; the site rebuilds.

**Add a YouTube video** (`src/data/videos.ts`, add at the top of the array):
```ts
{
  id: 'my-video-slug',                       // unique, lowercase, no spaces
  title: 'Real title from YouTube',
  description: 'One or two honest sentences.',
  youtubeUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',  // watch, youtu.be, shorts all work
  category: 'Network security',              // one of VIDEO_CATEGORIES
  tags: ['wireshark', 'lab'],
  publishedAt: '2026-10-20',                 // real upload date
  relatedToolIds: ['wireshark'],             // optional
  relatedCourseIds: [],                      // optional
  channel: 'main',                           // or 'second'
  featured: true,                            // optional
}
```
The thumbnail is generated from the URL. Add `thumbnailUrl: 'https://...'` to override. It then appears in the library, latest videos, search and related sections automatically. Delete the three `sample: true` entries when you have real ones.

**Add a free tool** (`src/data/tools.ts`): copy an existing block; set a unique `id`/`slug`, an `officialUrl`, and a real `downloadUrl` (or leave it empty for "coming soon"). Fill `developer`, `version`, `sha256` only if you verified them. Set `authorizedUseWarning: true` for scanners and similar.

**Add a premium tool** (`src/data/products.ts`) and **a course** (`src/data/courses.ts`): copy the block, fill every field, remove `sample: true`, then set `price` (number), `currency` (e.g. `'USD'`) and `checkoutUrl` (a real https link from Gumroad, Lemon Squeezy, Stripe Payment Link, etc.).
- **Change pricing:** edit `price`/`currency`.
- **Update a purchase URL:** edit `checkoutUrl`.
- The buy button stays disabled ("Checkout not configured") while `checkoutUrl` is empty, `price` is `null`, or the entry is `sample`.

**Edit FAQs:** `src/data/faqs.ts`. **Edit chatbot answers/keywords:** `src/data/chatbot.ts`. **Add an article:** `src/data/articles.ts` (use real dates and add real `sources`).

**Brand description, social links, popup delay, contact email, refund wording:** `src/config/site.ts`.

**Change the production domain:** set `SITE_URL` (workflow `deploy.yml` and/or `.env`) and, for a custom domain on GitHub Pages, add a `public/CNAME` file containing the domain.

**Logo:** the mark is the SVG in `src/components/Logo.astro` and `public/favicon.svg`. To use your own logo image, save it in `public/` (e.g. `public/logo.png`) and replace the `<svg>` in `Logo.astro` with `<img src={href('/logo.png')} width="32" height="32" alt="Hack In Seconds logo">`. Your uploaded `favicon.jpg` was not available to the build environment, so it is not included.

**Sample content:** anything with `sample: true` is labelled "Sample content", set to `noindex`, left out of the sitemap, has no structured data, and cannot be bought.

## 6. SEO and Search Console

Built in: unique titles/descriptions, canonicals from `SITE_URL`, Open Graph/Twitter cards (`public/og-default.png`), `sitemap.xml`, `robots.txt`, `llms.txt` (experimental, no ranking claims), breadcrumbs, and JSON-LD only where the page content supports it (WebSite, Organization, FAQPage, BreadcrumbList, BlogPosting, VideoObject for real YouTube entries, Course/Product only for genuine offers).

Search Console:
1. Open search.google.com/search-console, *Add property → URL prefix* → `https://hackinsecond.github.io/`.
2. Verify with the HTML-tag method (add the meta tag to `src/layouts/Base.astro` `<head>`) or an HTML file placed in `public/`.
3. *Sitemaps → Add* `sitemap.xml`.
4. Use *URL inspection* on the home page and a tutorial, then request indexing.
5. Re-check *Pages* and *Core Web Vitals* reports after a few weeks. No ranking or AI-citation outcome is promised.

If a URL changes, add a new page and keep the old URL alive with a short page that links to the new one (GitHub Pages has no server redirects), and keep canonicals pointing to the preferred URL.

## 7. Analytics and UTM tracking

Off by default. To enable the cookieless Plausible script, set `PUBLIC_ANALYTICS_PROVIDER=plausible` and `PUBLIC_PLAUSIBLE_DOMAIN`. Events sent: `video_click`, `tool_download`, `tool_open`, `checkout_click`, `signup_success`, `contact_success`, `search`. No names or contact details are ever sent. Check your local consent requirements before enabling.

Measure which video sends traffic by putting a tagged link in each YouTube description:
`https://hackinsecond.github.io/tools/nmap/?utm_source=youtube&utm_medium=video&utm_campaign=<video-id>`

## 8. Folder tree

```
.github/workflows/deploy.yml   GitHub Pages build + deploy
public/                        favicon.svg, og-default.png
scripts/verify-build.mjs       post-build checks (npm test)
scripts/e2e.py                 optional browser tests (Playwright, mocked Formspree)
src/config/site.ts             central settings + navigation
src/data/                      videos, tools, products, courses, articles, faqs, chatbot, types
src/components/                Header, Footer, cards, Filterable, SignupForm, NewsletterPopup, ContactForm, Chatbot...
src/layouts/Base.astro         SEO head, header/footer, popup, chatbot
src/pages/                     all routes (+ sitemap.xml, robots.txt, llms.txt endpoints)
src/scripts, src/utils         filtering, signup logic, Formspree client, schema, helpers
vercel.json                    optional Vercel settings
```

## 9. Placeholders you must replace

- [ ] `PUBLIC_FORMSPREE_FORM_ID` (Formspree) and a real test submission
- [ ] The 3 sample videos in `videos.ts` (add real YouTube URLs and dates)
- [ ] Sample tool, sample premium product and sample course (or delete them)
- [ ] `price` / `checkoutUrl` for anything you sell, and refund text in `site.ts`
- [ ] `contactEmail` in `site.ts` (optional) and an unsubscribe process
- [ ] Review Privacy Policy, Terms and Disclaimer (they are templates) with a qualified professional
- [ ] Logo (optional) and `public/og-default.png` if you want a different share image
- [ ] Review the third-party tool descriptions and links before relying on them

## 10. Launch checklist

- [ ] Workflow run is green; https://hackinsecond.github.io loads over HTTPS
- [ ] Refresh and open direct URLs: `/videos/`, `/tools/nmap/`, `/blog/safe-home-lab/`; a bad URL shows the 404 page
- [ ] Contact form and popup both deliver to Formspree; confirm the email notification
- [ ] Popup appears after ~10 s, closes with Escape and "No thanks", and stays away afterwards
- [ ] All header/footer links, YouTube links and tool links work
- [ ] Check on a phone: menu, popup, chatbot, no sideways scrolling
- [ ] View source: canonical = `https://hackinsecond.github.io/...`, no stray `noindex` on real pages
- [ ] `https://hackinsecond.github.io/sitemap.xml` and `/robots.txt` open; submit sitemap in Search Console
- [ ] Run Lighthouse and an accessibility checker yourself and fix what they report
- [ ] Remove or replace all "Sample content" before promoting the site

## 11. What cannot be built on static hosting

- **Protected/paid downloads and customer accounts** need a backend or your checkout provider's digital-delivery feature. The site never gates files with front-end code.
- **AI chatbot:** would need a server-side function (e.g. a serverless endpoint) holding the provider key, with rate limiting and spend caps. Never put an API key in this repo or browser code. Not included.
- **Sending newsletters** needs a mailing service (see section 4).
