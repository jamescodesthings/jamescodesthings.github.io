# codesthings.com fixes

Findings from a review of the live site (https://codesthings.com) and this repo on 9 October 2026, done alongside the CV overhaul in `../cv`. Work through them in order. Line numbers are left out on purpose because the templates are being redesigned; find each item by the text quoted.

Delete this file when everything here is done.

## Context

- The CV at https://codesthings.com/cv is the reference for wording. It lives in `../cv`, with the content in `../cv/data/*.json`. Read `../cv/data/profile.json`, `../cv/data/sidebar.json` and `../cv/data/experience.json` before rewriting any copy here.
- Positioning to match everywhere:
  - Title: **Senior Software Engineer**. No other job titles.
  - Headline: **Senior Software Engineer · Full-stack, cloud & mobile · Node.js, .NET · GCP/AWS**. TypeScript and Swift are deliberately left out of the headline.
  - Location: **Birmingham, UK**.
  - Experience: 14 years across web, mobile and cloud. Recent employers are Songtradr, Engineius and Packt.
- Tone: results-first, plain, no filler ("friendly and passionate" and similar go). UK spelling.
- No phone number anywhere on the site, in data or in templates. Email (`james@codesthings.com`) is the only direct contact.
- The CV PDFs were renamed. The links are `https://codesthings.com/cv/assets/James%20Macmillan.pdf` (with cover letter) and `https://codesthings.com/cv/assets/James%20Macmillan-no-cover.pdf`. The old `cv/assets/cv.default.pdf` still works but shouldn't be used for new links.
- The CV header now has a "Back to codesthings.com" link in the same style as `.blog-nav` here. If the nav styling changes in the redesign, mirror it in `../cv` (`.back-nav` in `../cv/src/css/styles.css`, markup in `../cv/src/templates/sections/header.ejs`).

## 1. Urgent

- [x] **Remove the phone number from the privacy notice.** In `src/templates/privacy-notice.ejs`, delete the `Phone: +44 …` line (and the `<br />` before it) under "CodesThings.com is the personal website of James Macmillan". The email line is enough for a UK GDPR contact. Search the whole repo afterwards for `7736`, `wa.me` and `tel:` to make sure nothing else carries it. (Done: the redesigned privacy notice has no phone line, and `7736`, `wa.me` and `tel:` match nothing outside this file.)
- [ ] The number is also in this repo's git history. Rewriting history needs force-push, which the branch ruleset may block (it does on `jamescodesthings/cv`). Flag it to James rather than doing it unasked.
      Left open on purpose: history is not rewritten. Flagged for the owner.

## 2. Home page content

- [ ] **Hero role reads as a typo.** `src/templates/sections/hero.ejs` has `SoFtWaRe EnGiNeEr`. Replace it with "Senior Software Engineer", and add a second line with the rest of the headline ("Full-stack, cloud & mobile · Node.js, .NET · GCP/AWS") and "Birmingham, UK".
      Left open: the owner is deciding the hero role and headline wording (positioning).
- [x] **The home page has no professional content.** After the hero it goes straight to the CampSnap banner, blog cards and socials. Add a short About section after the hero: two or three results-first sentences based on `../cv/data/profile.json`, with a clear link to the CV. (Done by the redesign: the Work section opens with `careerSummary` from `data/site.json` and links to the full CV.)
- [x] **`data/profile.json` is dead and out of date.** `src/index.js` doesn't load it. It still says "friendly and passionate Full Stack Developer", "robust hybrid mobile and progressive web apps" and "serverless apis". Either delete it, or rewrite it to match the CV and use it for the About section above. (Done: deleted. Nothing read it.)
- [ ] **The CampSnap banner is the first thing after the hero.** Its title "I feel like you're just here for the campsnap filters" (`sections/campsnap-banner.ejs`) is repeated in the floating button (`sections/campsnap-fab.ejs`). Move the banner below the About section, retitle it (for example "CampSnap filters: a free photography side project"), and keep only one of the banner and the floating button.
      Left open: the owner is deciding whether to keep the banner/spotlight or the floating button. For the record, the banner is already below the hero, inside Photos.
- [x] Section labels "01 - BLOG" and "02 - CONNECT" number sections that aren't a sequence. Either drop the numbers or give the page a real order (About, CV, Writing, Connect). (obsolete: the labels are gone. Sections are numbered 01 to 06 in page order and match the section rail.)
- [x] Blog cards show only a title and a month. Add a one-line excerpt (front matter `summary` already exists for the meta description). (Done by the redesign: cards show the summary.)
- [x] The hero "View CV" link uses a download-arrow icon but opens the page. Change the icon to an arrow, or add a separate download button to the PDF. (Done by the redesign: it uses the document `cv` icon.)
- [x] Hero and footer CV links use the absolute `https://codesthings.com/cv`. Use `/cv/` so local and preview builds work. (Done: `data/links.json`, the footer and the 404 page use `/cv/`.)
- [x] The footer copyright year is hard-coded as 2026. Render it from the build date. (Done: rendered from the build date in `footer.ejs`.)

## 3. SEO and sharing

- [ ] `src/templates/index.ejs`:
  - Title: `James Macmillan | Senior Software Engineer, Birmingham UK`
  - Description: `Senior Software Engineer with 14 years across web, mobile and cloud (Node.js, .NET, GCP/AWS). CV, writing and side projects.`
  - Make `og:title` and `og:description` match.
  - Use a 1200x630 `og:image` instead of the logo, with `twitter:card` set to `summary_large_image`.
  - Pick one spelling of the site name: `codesthings.com` (lower case) is what the CV uses.
    Left open: the owner is deciding the home title, description and og wording (positioning). Already done: a 1200x630 per-page share card, `twitter:card` is `summary_large_image`, and the site name is `codesthings.com` everywhere.
- [x] `src/templates/blog.ejs` has no OG tags, canonical or published time, so a blog link shared on LinkedIn shows a bare preview. Add `og:type=article`, `og:title`, `og:description` (from `summary`), `og:url`, `og:image`, `article:published_time` and `<link rel="canonical">`. (Done by the redesign: head.ejs emits og:type=article, title, description, url, image and canonical for every page. `article:published_time` is added too.)
- [x] Add a JSON-LD `Person` block on the home page (name, jobTitle, address Birmingham, sameAs GitHub, LinkedIn, MakerWorld). (Done: `index.ejs` passes a Person object to `head.ejs`; `sameAs` is built from `data/links.json`.)
- [x] `robots.txt` and `sitemap.xml` both return 404. Generate both in the build. (Done by the redesign. Draft posts are left out of the sitemap.)
- [x] The privacy, cookies and 404 pages have no meta description. (Done: privacy and cookies had one from the redesign; 404 now has one too.)

## 4. Blog posts

- [x] **ZeroCalc: broken image.** `data/blog/2026-05-01-zerocalc.md` links `assets/blog-images/after-soldering.png` relatively, which resolves to `/blog/assets/...` and returns 404 on the live site. Use the same path style as the other images in that post. (Done by the redesign.)
- [x] **ZeroCalc: headings.** It has several `#` headings (one h1 per page is the rule). Make every section heading after the title `##`. "# 3 Building the hardware" has a stray "3". (Done by the redesign: one h1.)
- [x] **ZeroCalc: proofreading.** Fix these and read the rest for the same kind of slip:
  - "for this purposes; but it's overkill." becomes "for this purpose, but it's overkill."
  - "SD expansiona nd initial set up" becomes "SD card expansion and initial setup"
  - "easiest wat to find" becomes "easiest way to find"
  - "shudown" becomes "shutdown"
  - Pick one spelling each of "ZeroCalc", "uConsole", "Pico-8" (prose) and "pico8" (code), "Raspberry Pi", "Pi Zero 2 W", "microSD", "Wi-Fi", "32 GB", "SanDisk", and use it throughout.
  - "$1us each" and "$20us" become "about US$1 each" and "about US$20".
  - "_tldr;_" becomes "TL;DR:".
  - Plain nouns formatted as code (`external USB`, `gpio`, `a display`) lose the backticks.
  - Image alt text "Front", "Side", "Rear" should describe what each photo shows.
  - "Others have covered this topic better than I could" undersells the post; cut it. (Done: listed fixes applied and the spellings unified, and the rest read for the same kind of slip. `ZeroCalc 2W` is now `ZeroCalc`, the board stays `Pi Zero 2 W`.)
- [x] **How This Site Works is out of date.** `data/blog/2026-03-30-how-this-site-works.md`:
  - It lists `experience.json`, `skills.json`, `education.json`, `projects.json`, `sidebar.json` and `cover-letter.json` as living here. They are in `../cv` now.
  - It describes experience, skills and projects sections the home page no longer has.
  - It says the dark class goes on the body; it's on `<html>`.
  - "zero JavaScript (except a tiny dark mode toggle)" and "about 200 lines" need checking against what ships now.
  - Rewrite it as the two-repo setup (this site plus `../cv`, with the CV's HTML-to-PDF pipeline through Gotenberg), and add real before-and-after figures: runtime dependencies (2: `ejs` and `debug`), build time (the CV builds in under a second), page weight and a Lighthouse score. This post is the one James wants to turn into a LinkedIn post, so accuracy matters more than length. (Done: the redesign rewrote it for this repo, and it now has a section on the separate CV repo and its Gotenberg PDF step. The "2 runtime dependencies" figure is obsolete for this site, which now has nine; the before and after numbers are in the draft post "Making my site fast".)
- [x] Use one published-date format across posts (ZeroCalc uses `<span class="published">`, the other uses `_Published: ..._`). (Done: the date comes from the file name and is rendered by `blog.ejs`; no post has a hand-written published line.)

## 5. Socials copy

- [x] `data/socials.json`:
  - GitHub: "If you want to get an idea of my development style and experience, this is the place to go." becomes "Source for this site, the CV builder and side projects."
  - LinkedIn: "Reach out to me here for professional enquiries." becomes "Best place for professional enquiries."
  - MakerWorld: "3D models for nerd hobby projects" becomes "3D-printable parts for FPV drones, handheld builds and other projects." (obsolete: `socials.json` and the social cards were removed in the redesign. Links live in `data/links.json` with no descriptions.)
- [x] The MakerWorld and Instagram cards show a single letter ("M", "I") as their icon. Custom SVG icons are planned as a shared icon library in `../` (a separate session); leave the letters until that lands. (obsolete: social cards were removed; links use inline SVG icons.)
- [x] Social cards set an `aria-label` that replaces the card text, so the description is never announced. Drop the `aria-label` and let the card's text label the link. (obsolete: social cards were removed.)

## 6. Accessibility

- [x] The CampSnap banner and floating button autoplay video with no pause control and no `prefers-reduced-motion` handling (WCAG 2.2.2). Add a pause control, and don't autoplay under reduced motion. (Done by the redesign: pause button, no autoplay under reduced motion.)
- [x] `sections/campsnap-fab.ejs` contains an `<?xml ...?>` declaration inside HTML. Remove it. (Done by the redesign.)
- [x] The floating popover is `aria-hidden` while it contains focusable links. Use `hidden` or `inert` when it's closed. (Done by the redesign: it uses `hidden`.)
- [x] Add a skip link, and `aria-pressed` on the theme toggle. (Done: skip link exists. The theme toggle changes its accessible name with its state ("Switch to light theme"), which is the alternative to `aria-pressed`; using both would be wrong.)
- [x] Give external links in blog posts `rel="noopener"`. (Done: `markdown.js` adds `rel="noopener"` to external links, with a test.)
- [x] Check the light-theme accent (`#d97706` on `#faf8f4`) for small text. It's about 3:1, under the 4.5:1 AA minimum. The same issue exists in the CV; whatever fix the redesign picks should be applied to both. (Done in this repo: light accent is `#8a5300`, and `npm run contrast` checks 4.5:1. The CV copy is outside this task.)
- [x] Blog pages have no `class="dark"` on `<html>`, unlike `index.ejs`, so the theme can flash on load. Match `index.ejs`. (obsolete: the `dark` class is gone. Every page sets `data-theme` on `<html>` from an inline script in the head.)

## 7. Privacy and cookies pages

- [x] The ZeroCalc post embeds YouTube (`youtube-nocookie.com`). Add YouTube to the third parties listed in `privacy-notice.ejs` and `about-cookies.ejs`. (Done by the redesign.)
- [x] `about-cookies.ejs` says "We use them" while the privacy page uses "I". Use "I" throughout. (Done: now "I use them".)
- [x] `about-cookies.ejs` has an inline-styled `<small>` inside the `<h1>`; move the styling to CSS. (Done by the redesign: it is a class, `static-page__sub`. The last inline style in the templates, the logo accent, is now a CSS class too.)
- [x] The privacy page links the source as `jamescodesthings.github.io`. Check that it points at the right repo. (Checked: `jamescodesthings/jamescodesthings.github.io` is the `origin` remote, so it is correct.)
- [x] "Last reviewed: June 2026" will go stale; update it when this list is done. (obsolete: the date is rendered from the build month.)

## 8. Repo housekeeping

- [x] `.gstack/browse.json` is tracked. Remove it from the index and add `.gstack/` to `.gitignore`. (Done.)
- [x] `public/assets/icons/*` is tracked although `public/` is gitignored. Remove it from the index. (Done: nothing under `public/` is tracked.)
- [x] `src/assets/icons/` holds leftovers from the old CV (`capacitor-logo.png`, `cordova_256.png`, `nativescript-logo.png`, `stencil-logo.png`, `aws-dynamo.svg`, `aws-lambda.svg`, `sls.svg`, `vite.svg`). Nothing here references them; the CV removed its copies on 9 October 2026. Delete them. (Done: deleted, along with `svg/campsnap.svg`, `zipline.webm` and three unreferenced blog images.)
- [x] `src/assets/profile.png` is unused on the site. Delete it or use it in the About section. (Done: deleted.)
- [x] The README mentions `src/pages.js`, `docs/` and PDF generation in `make build`, none of which apply to this repo. Bring it up to date. (Done.)
- [x] The site loads Google Fonts and devicon from CDNs on every page. Consider self-hosting the fonts; `src/assets/fonts/` holds Karla, Oswald and Fira Mono, which differ from the Inter, JetBrains Mono and Space Grotesk the pages request. Pick one set. (Done by the redesign: Bricolage Grotesque, Figtree and Geist Mono are self-hosted; Karla, Oswald and Fira Mono are gone.)
