# careergyan.co: static multi-page site

This is a pure static site with no build step. It deploys to Vercel with **Framework Preset: Other**.

Every page is a real HTML file with its own URL, title, description, canonical, Open Graph and JSON-LD. The design, text, CSS and JavaScript come from the 2026 HTML file, split into shared files. Nothing visual was changed. The live site was used only for SEO metadata (titles, descriptions, old URLs).

```
/                       index.html (home)
/about-us               about-us.html
/study-in-uk …          study-in-*.html  (18 countries)
/course/arts …          course/*.html    (7 courses)
/workshops, /contact, /eligibility, /student-loan, /all-countries
/workshops/workshop-registration   workshops/workshop-registration.html (uses <base href="../">)
/abroad-education-consultants-in-{bangalore,hyderabad,bahrain,pune,davanagere}, /study-abroad-consultants-in-germany
/privacy-policy, /terms-and-conditions, 404.html
assets/css/style.css     shared stylesheet (original CSS, verbatim)
assets/css/workshop.css  workshop registration page stylesheet (original rules, scoped to the page content)
assets/js/main.js        shared script (original JS, routing edits only; see CHANGES.md)
assets/images/           og-image.png, careergyan-logo.png
vercel.json  robots.txt  sitemap.xml  site.webmanifest  favicons
CHANGES.md  MIGRATION-NOTES.md  IMAGES-REQUIRED.txt  VERIFICATION.md
supabase/schema.sql      run once in Supabase to create the two form tables
```

With `cleanUrls`, `about-us.html` is served at `/about-us`. Requests for `/about-us.html` get a 308 redirect to the clean URL.

---

## ⚠️ Before you switch the domain: copy the `/images` folder

The pages load their pictures, logos and icons from `https://careergyan.co/images/...`, exactly like the original file. Those files live on the **current PHP site**. When careergyan.co points at Vercel, they must exist in this project too, or every logo and photo will break.

1. Download the whole `images/` folder from the current server (cPanel File Manager → `public_html/images` → Compress → Download).
2. Unzip it into the project root so you get `careergyan-site/images/logo.png`, `careergyan-site/images/home/...` and so on.
3. Deploy. `IMAGES-REQUIRED.txt` lists every `/images/...` path the pages use (78 files), so you can check none are missing.

Alternative: keep the old server running on a subdomain (e.g. `old.careergyan.co`). Then add this rewrite to `vercel.json` instead of copying:

```json
"rewrites": [{ "source": "/images/:path*", "destination": "https://old.careergyan.co/images/:path*" }]
```

---

## Preview on your computer

Don't open `index.html` by double-clicking it. Root paths like `/assets/css/style.css` and `/study-in-uk` then point at your C: drive, so the page loads without CSS or JS and links don't work.

Run a local server instead. It needs [Node.js](https://nodejs.org):

- **Windows:** double-click `preview-windows.bat`. It opens http://localhost:3000.
- **Mac/Linux:** run `./preview-mac-linux.sh`, then open http://localhost:3000.
- **Or by hand:** `npx serve -l 3000 .` inside this folder. `serve.json` turns on clean URLs, like Vercel.

`serve.json` and the preview scripts are only for local testing. Vercel ignores them.

## Forms → Supabase

All three forms save into the **same Supabase project** as the workshop registration (`veovdcqtyrbakyednkvr`):

| Form | Page(s) | Table |
|---|---|---|
| Workshop registration + payment | /workshops/workshop-registration | (unchanged: existing Edge Functions) |
| Book a free counselling session / Enquiry form | home, /contact | `enquiries` (`source` = home or contact) |
| Eligibility checker | /eligibility | `eligibility_submissions` (all answers in `answers`, plus budget and suggested countries) |

**One-time setup:** in Supabase Dashboard → SQL Editor, paste `supabase/schema.sql` and run it. Then submit each form once and check Table Editor.

Visitors can only *insert* rows. Reading the data needs a Supabase login. If saving ever fails (offline, table missing), the enquiry forms fall back to the original behaviour and open the visitor's email app, so no lead is lost.

## Eligibility checker

Every question has **← Previous** and **Next**. Choosing an option highlights it and doesn't jump ahead.

After the last question the student sees a **review screen**: every answer with an *Edit* button, then **Submit**. After submitting they see the **result**:
- **Studying abroad:** the countries that fit their budget, with their own picks highlighted.
- **Answered "No":** the original "We Are Also Specialized In Exploring New Opportunities…" message and the contact numbers.

## Speed: what's built in, and what you should do with the images

Built in:
- Each page's hero photo is preloaded and fetched first.
- Phones download smaller versions of the big Unsplash photos.
- Below-the-fold images lazy-load, and all images decode off the main thread.
- Decorative animations pause while off-screen.
- Scroll effects run once per frame instead of on every scroll event.

**Biggest remaining win:** the photos and logos in `/images/` (from the old site) are PNGs. When you copy that folder in, compress them first, for example with squoosh.app or TinyPNG. Keep the same file names and formats so no links change. Large PNGs like the gallery photos are usually what makes a page feel slow.

## Deploy to Vercel

**Drag and drop:** go to vercel.com → Add New → Project → drag the `careergyan-site` folder in. Set Framework Preset to **Other**, leave Build Command and Output Directory empty, and deploy.

**CLI:**
```bash
npm i -g vercel
cd careergyan-site
vercel          # preview deployment
vercel --prod   # production
```

Then go to Project → Settings → Domains → add `careergyan.co` and `www.careergyan.co`. Set `www` to redirect to the apex domain.

## Add a new page

1. Copy the page closest to what you need (for example `study-in-uk.html`) and name it after the URL you want. `study-in-japan.html` is served at `/study-in-japan`. For a nested URL use a folder: `course/law.html` → `/course/law`.
2. In the new file, update these in `<head>`: `<title>`, `<meta name="description">`, `<link rel="canonical">`, the `og:*`/`twitter:*` tags and the JSON-LD (breadcrumb name and URL).
3. On `<body>`, set `data-path` to the new clean URL. `data-route` tells the shared script which view to run. Pages built by the script need a route it knows (see `route()` in `assets/js/main.js`). For a hand-written page, copy `about-us.html`, give it a new `data-route`, and replace the `<section class="page active" …>` content.
4. Add the URL to `sitemap.xml` and add links to it from the menus. Menu links are generated in `assets/js/main.js` (`build()`). The same links are also pre-rendered into every HTML file for search engines, so update both.
5. If you change `style.css` or `main.js`, bump `?v=20261111` in every page. Assets are cached for a year.

## Change the domain

The domain appears only in canonical/OG/JSON-LD URLs, `sitemap.xml` and `robots.txt`. Change it everywhere with one command:

```bash
cd careergyan-site
grep -rl "https://careergyan.co" --include="*.html" --include="*.xml" --include="*.txt" . \
  | xargs sed -i 's#https://careergyan.co#https://www.newdomain.com#g'
```

On macOS use `sed -i ''`. Image URLs (`https://careergyan.co/images/...`) are replaced too. That's correct once the `/images` folder is copied in (see above).

## Things to finish (TODO)

- **WhatsApp channel link.** Set `WA_CHANNEL_URL` near the bottom of `assets/js/main.js` (currently `REPLACE_WITH_YOUR_CHANNEL_ID`).
- **X/Twitter handle.** Each page has a commented TODO where `twitter:site` belongs. The live site uses the placeholder `@yourtwitterhandle`, so it was removed.
- **Higher-resolution brand icons.** The favicons were made from the 282×82 px logo in the workshop page. If you have the logo as SVG or a large PNG, replace `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png` and the `android-chrome-*` files.
- **Mangalore phone number.** It's shown on the eligibility "No" result screen. Fill `EL_CONTACTS` in `assets/js/main.js`; empty entries are hidden.
- **Budget → countries list.** This is the eligibility result. I couldn't read the original checker's table, so `EL_BUDGET_TIERS` in `assets/js/main.js` holds a starting list. Edit it to match your counselling policy.

## Post-launch checklist

1. Test the redirects:
   ```bash
   for u in /index.php /about-us.php /study-in-uk.php "/course.php?course_name=Engineering" /events.php /contact.php /abroad-education-consultants-in-bangalore.php; do
     curl -s -o /dev/null -w "%{http_code} %{redirect_url}  <- $u\n" "https://careergyan.co$u"; done
   ```
   Each should print `308` and the new URL. Vercel uses 308 for "permanent", which Google treats like a 301.
2. Open a few pages with **View source** and confirm `<meta name="robots" content="index, follow …">`. The old live homepage ships `noindex, nofollow`.
3. In **Google Search Console**: Sitemaps → submit `https://careergyan.co/sitemap.xml`.
4. In Search Console, run **URL Inspection** on `/`, then **Request indexing**. Repeat for `/study-in-uk`, `/study-in-germany`, `/abroad-education-consultants-in-bangalore` and `/contact`.
5. Check the **Pages** report after 1–2 weeks. Old `.php` URLs should move to "Page with redirect".
6. Run the Rich Results Test (search.google.com/test/rich-results) on `/`, `/contact` and one country page.
7. Old URLs that have **no page in the new design** need a decision. See `MIGRATION-NOTES.md`.
