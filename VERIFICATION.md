# Verification results (2026-11-11)

Checked in Chrome via Playwright. Pages were opened **directly from disk (file://)** and through a local server that behaves like Vercel `cleanUrls`. External images and fonts were stubbed.

## Static checks
- Broken relative links or assets: **0**. Root-relative paths: **0** (404 page and workshop page use `<base>` on purpose).
- `#/` hash navigation links left: **0**. Every page has exactly one title, description, canonical and H1, with **0** duplicates. sitemap.xml has 41 URLs, exactly matching the canonicals.
- vercel.json is valid; 49 redirects, all targets exist. All JSON-LD parses. `node --check main.js` passes.
- The static HTML is re-captured from what the script renders, so search engines and no-JS visitors see the same content, alt text and image attributes as browsers.

## Runtime
- Opened from disk: 41 pages, 0 console errors, 0 failed file loads, every rendered link points to an existing file.
- Through the Vercel-like server: 42 pages (incl. 404), 0 console errors, 0 HTTP errors.

## Readability, images, mobile
- Contrast scan, every page at 1440 px and 390 px: no unreadable text. The Student Loan steps were fixed; the faint "SOP/LOR" watermark letters are decorative by design.
- Alt text:
  - Hero photos, country photos, carousel and slideshow photos now have keyword alt text, and partner logos are named properly.
  - Images still left with empty alt are decorative only: flags next to the country name, background photos behind CTA text, and icons next to headings.
- Below-the-fold images without lazy loading: about 77 → 21. Each page's hero is preloaded with high priority.
- Mobile at 360 / 390 / 414 px: nothing overflows. The menu country list is fixed, and the header and menu have Call / WhatsApp buttons.

## Flows tested (Supabase requests intercepted and inspected)
- Eligibility (Bachelor's path, 27 questions, 1280 and 390 px):
  - Options don't auto-advance; Previous and Next work.
  - Review, Edit and Back to review work.
  - Submit saves to `eligibility_submissions` and shows the budget result.
- The "No" path shows the original message.
- Home and contact forms save to `enquiries`. If Supabase returns an error, they fall back to the email app.

## Local images (2026-11-11)

- All 41 pages from disk (file://) and all 42 URLs through the local server: **0 broken images**. Every lazy image was forced to load and each page was scrolled to the bottom.
- About 590 image requests per run were served from the project's `images/` folder. **No requests went to careergyan.co/images.** The 6 eligibility pictures missing from the upload were replaced with local ones (see README), so **no image comes from eligibility.careergyan.co either**.
- Compression: 126 files, 22.1 MB → 8.9 MB, same names and formats. Quality check against the originals: PSNR ≥ 32.8 dB for every file (visually identical). Blog card images were resized to 1000 px wide; nothing else was resized beyond 1600 px.
