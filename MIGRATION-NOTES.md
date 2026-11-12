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

## Course pages (2026-11-12, requested)
All 7 course pages (`course-arts` … `course-technology`) now carry only the content of the live careergyan.co course pages, shown in this site's design:
- H1 = the course name.
- The same two-sentence intro ("Our study abroad programs let you experience world-class education…").
- The course banner image (`images/courses/course_img.png`).
- The "Countries" list in the live order: Australia, Canada, Estonia, France, Germany, India, Ireland, Italy, Latvia, Lithuania, Netherlands, Poland, Sweden, UK, USA.

The extra sections that weren't on the live pages were removed: "About the program", specialisations, roadmap, application help, FAQ, other courses and the closing banner. Because the FAQ is gone, the FAQ structured data was removed from these pages too.

The Countries list has a filter: a search box plus a chip for each country ("All countries" shows everything). Country cards link to that country's "Study in …" page; Estonia and India have no page, so their cards aren't links. On the live site the 15 countries are a plain list; the server returns no programme/university data behind them.

The page titles and descriptions now match this content ("Study Engineering Abroad | 15 Countries | Career Gyan").

### University lists (2026-11-12, from the page text the client supplied)
Six course pages now list every university from the live course pages, with the live fields: university name, website, programs, intake and country. Intakes marked "NA" are hidden. The data is in `assets/data/course-<course>.js` and loads only on that course's page.

| Course | Universities |
|---|---|
| Arts | 786 |
| Engineering | 725 |
| Management | 895 |
| Medicine | 253 |
| Pharmacy | 34 |
| Science | 1089 |
| Technology | 47 |

The filter has a "Search a university or program" box and a chip per country showing how many universities it has. Countries with none are greyed out (India has none in any course). The list shows 24 at a time, with a "Show more universities" button. Long program lists are cut to 4 lines, with "Show all programs".

**Technology:** two website links on the live page point to the wrong university and are kept as they are: LMU Munich → uni-heidelberg.de, and UCL → cam.ac.uk.

**Typos and data errors, kept as on the live site:**
- "Pharacy", "Pharmay", "diplmas", "Engineerig", "Sciencs", "Medicie", "Toxicoloy".
- One Science entry whose name is a web address (`https://www.th-wildau.de/`).
- "vvvvvvvv" at the start of the École Nationale Vétérinaire d'Alfort programs.
- West Virginia University's programs start with its own name.
- 11 entries have no website link.

## Country pages: details from the live site (2026-11-12, requested)
Done for all 18 country pages, from the page text the client supplied. The live text was added word for word, in our design. The hero stats, the "at a glance" box and the downloadable checklists were added in the 2026 file and are kept exactly as they were. What was added:
- **Why study:** the full paragraphs. Ours were shortened.
- **Prompt:** "Wondering if <country> is the right choice for you? Let our experts guide you…" with "Talk to an Expert".
- **Top courses:** the intro paragraph, plus the 6th card "Others" (it links to Contact).
- **Eligibility:** the intro paragraph, where the live page has one.
- **Application requirements:** the live list.
- **Cost:** the intro paragraph and the full cost table with the live columns (e.g. CAD + INR for Canada), plus the note under it (Netherlands).
- **Highest-Paying Jobs:** the intro paragraphs and the full table (e.g. 30 rows for the USA, the 4-column table for the UK).
- **Popular / most sought-after jobs:** the intro and the full table, including columns we didn't show before (e.g. "Number of Full-time Employees" for the UK). Spain has no such section on the live site.
- **Why Choose Career Gyan:** the 4 country-specific cards with their text.

The short "Good to know" summary cards were removed on these pages, because the full sections now cover them.

**Not changed:**
- The eligibility tab texts. The live page keeps them in collapsed accordions, so they aren't in the copied text.
- The "Why you should choose" point titles. These aren't in the copied text either.
- The page taglines and the stats band (6413+ / 2569+ / 97% / 11+ from the 2026 file, against 6320+ / 2500+ / 95% / 10+ on the live site, which also shows "#1 Trusted Consultancy").
- The "Our latest Blogs" section. The blog isn't part of the new site.
- The "Uplift your carreer by filling the form now!" form. Removed at the client's request.

**University logos:** several live pages show the placeholder "east_london" logo over and over, so our named lists stay on those pages. Names that were missing were added for Sweden (14), Latvia (12) and Finland (HELBUS). The live UK list has "ruskin" next to "anglia", and Spain has "catalonia"; it's unclear which universities these are, so they weren't added.

**Typos and data errors, kept as on the live site:**
- "carreer"
- "By why is UK…"
- "ethnical"
- UK salaries quoted in US$ ("…pays the highest salaries in the US")
- "slod track record"
- "posy-arrival"
- "Chief Marketing Officert"
- "SalesmSan"
- "100 rate of visa approvals"
- "et.,"
- "and and"
- "manly located"
- Canada's "Living costs" row appears twice
- Netherlands' jobs table has "Job Roles" twice in its header
- USA's popular-jobs table lists "Teaching Assistant" twice, with different salaries
- Australia "20.000 to 45,000 AUD"

**More data errors on the live pages, not copied or kept as they are:**
- Sweden's cost section starts with "Certainly! Here's a proper table … formatted for easy copying into a Word document". This is a leftover from an AI chat and was **not** copied.
- Ireland's top-university logos include 5 Australian universities (Macquarie, RMIT, Deakin, QUT, Wollongong). These were not added.
- Latvia's logos include "University of Barcelona", which was not added.
- Ireland's tuition shows "€10,00" and "€13,00", probably meaning €10,000 and €13,000. Kept as on the live site.
- Hungary's "Proven Expertise" card says "500+ success stories"; other pages say 5000+. Kept as on the live site.
- Hungary's popular-jobs table lists "Sales & Marketing Professionals 60,000" among monthly salaries of 1.4–2.4 million. Kept as on the live site.
- Sweden's highest-paying jobs table lists "Judge" twice. Kept as on the live site.
- Two cost tables (Ireland, Lithuania) came out of the copied text with merged cells in the wrong order. They were rebuilt with the same values.

