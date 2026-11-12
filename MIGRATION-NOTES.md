# Migration notes: decide these before launch

## 1. Live URLs with no page in the new design

These exist on careergyan.co today. They are **not** redirected, because no matching page exists and pointing them at an unrelated page is treated by Google as a "soft 404". After the domain moves to Vercel they will return the 404 page unless you act.

| Live URL | What it is | Suggested action |
|---|---|---|
| `/blogs` and `/blogs/<slug>` (e.g. `/blogs/how-careergyan-helps-students-get-admission-abroad`) | Blog index + articles. **Indexed content with search traffic.** | Keep the blog. Either host it on the old server under a subdomain and add a rewrite, or rebuild the posts as pages here. Don't redirect them all to `/`. |
| `/refund-policy.php` | Refund policy ("all sales are final"). Payment gateways like Razorpay usually require a visible refund policy. | Add a `/refund-policy` page. The Terms page only has a short "Cancellation and Refunds" clause, which is not the same policy. |
| `/pricing.php` | Pricing page | Recreate it, or redirect to `/contact` if pricing is no longer published. |
| `/ebook.php` | E-book download | Recreate, or redirect to the closest page. |
| `/overseas-education-consultants-in-delhi.php` (and possibly other city pages) | Local SEO landing page | Recreate it as `/overseas-education-consultants-in-delhi` using a location page as the template, or redirect to `/contact`. |
| Event detail pages on the live site | Past events | Redirect to `/events` once you have the list of URLs (Search Console → Pages). |

Ready-to-paste redirects if you decide to point them somewhere. Add them to `"redirects"` in `vercel.json`:

```json
{ "source": "/pricing.php", "destination": "/contact", "permanent": true },
{ "source": "/ebook.php", "destination": "/", "permanent": true },
{ "source": "/overseas-education-consultants-in-delhi.php", "destination": "/contact", "permanent": true }
```

Already redirected: `index.php`, `about-us.php`, all 18 `study-in-*.php`, `course.php?course_name=…` (7 courses, both cases), `events.php` and `/events` → `/workshops`, `contact.php`, the 5 location pages, `privacy-policy.php`, `terms-and-conditions.php`, `gallery.php` → `/about-us` (the About page has the gallery).

## 2. Subdomains

- **events.careergyan.co** hosts the workshop registration page today, with its canonical set to itself. The new copy at `/workshops/workshop-registration` has its canonical set to `https://careergyan.co/workshops/workshop-registration`. Keep only one live: redirect the subdomain to the new URL, or change the canonical back.
- **eligibility.careergyan.co**: the new `/eligibility` page replaces it. Redirect the subdomain to `https://careergyan.co/eligibility` so the two don't compete.

## 3. Images

See README → "Before you switch the domain". `IMAGES-REQUIRED.txt` lists every path the pages load from `/images/`.

## 4. After launch

Watch Search Console → Pages → "Not found (404)" for two weeks. Any old URL that shows up there with traffic should get a redirect.

## Footer credit (2026-11-12, requested)
"2025 © All rights reserved by Career Gyan" was replaced everywhere (site footer on all pages, the legal pages, the workshop page's legal view) with "© 2026 Powered and secured by I Don't Blabber", linking to https://idontblabber.com.

## Student stories (2026-11-12, requested)
The four "Student story" cards (home page and Bangalore page) were plain blue boxes with a faint play button. Each card now shows a real CareerGyan student photo (`images/careergallery/gallery-5/6/7/8.png`), an "Instagram Reel" tag, a dark fade so the caption stays readable, and a solid white play button. Clicking still opens the reel on Instagram. To use frames from the actual reels instead, replace those four files or change the file list in `assets/js/main.js` (search `gallery-7.png`).
Clicking a card now plays the original reel on this site, in a phone-sized popup that uses Instagram's official embed. The popup has a close button, closes with Esc or a tap outside, and has an "Open on Instagram" link. Ctrl/⌘-click still opens Instagram in a new tab. If a reel's owner turns off embedding, Instagram shows a "View on Instagram" card inside the popup instead.
