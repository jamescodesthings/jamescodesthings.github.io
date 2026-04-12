# Design Updates -- This Cycle

Frontend design review findings for codesthings.com. Each item below is actionable this cycle.

---

## 1. zipline.gif (13MB) -- Critical Performance Problem

**Decision:** Convert to an HTML5 video element (`<video>`) using mp4 + webm sources.

The GIF is 13MB and accounts for 87% of the total page weight (15MB). Even with `loading="lazy"`, this is unacceptable on mobile connections and will hurt Core Web Vitals (LCP, page weight). The `loading="lazy"` attribute also does not prevent the browser from downloading the full file once the element scrolls into view -- there is no progressive loading for GIF.

**What to implement:**

1. Convert `src/assets/zipline.gif` to two formats:
   - `src/assets/zipline.mp4` (H.264, targeting ~500KB-1MB)
   - `src/assets/zipline.webm` (VP9, targeting ~300KB-800KB)
   - Use ffmpeg: `ffmpeg -i zipline.gif -movflags +faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" zipline.mp4`
   - Use ffmpeg: `ffmpeg -i zipline.gif -c:v libvpx-vp9 -b:v 0 -crf 30 zipline.webm`
2. Update `src/templates/sections/campsnap-banner.ejs`: replace the `<img>` tag with:
   ```html
   <video class="campsnap-gif" autoplay loop muted playsinline>
     <source src="assets/zipline.webm" type="video/webm">
     <source src="assets/zipline.mp4" type="video/mp4">
   </video>
   ```
3. Remove `src/assets/zipline.gif` from the repo (it's tracked in git history; 13MB is large for git objects but acceptable for history).
4. CSS: `.campsnap-gif` styles already work for `<video>` -- `max-width`, `border-radius`, and `border` apply the same way. No CSS changes needed.

**Expected result:** Page weight drops from ~15MB to ~3MB. The video autoplays silently like the GIF did, but with 10-20x smaller file size and better browser decode performance.

---

## 2. profile.png (2.1MB) -- Performance Problem

**Decision:** Compress and resize to a reasonable size.

The avatar is displayed at 120x120 CSS pixels (240x240 at 2x retina). The source is 1024x1024 PNG at 2.1MB. This is ~10x larger than needed.

**What to implement:**

1. Create an optimised version at 256x256 (covers up to 2x retina with slight margin):
   - Convert to WebP with PNG fallback, or just compress the PNG
   - Target: under 50KB
   - Use: `convert src/assets/profile.png -resize 256x256 -quality 85 src/assets/profile.webp` (or use sharp/squoosh)
2. Keep the original 1024x1024 in `raw/` for future use if not already there
3. Update the `<img>` tag in `cover-letter.ejs` to use the optimised version
4. Consider adding `width="120" height="120"` attributes to prevent layout shift (CLS)

---

## 3. Scroll Animations -- Keep, but Refine

**Decision:** Keep the `data-animate` / IntersectionObserver pattern, but reduce the number of animated elements and tighten the effect.

**Justification for keeping:** The fade-up-on-scroll effect is subtle (0.6s ease, 24px translateY) and fires once per element (observer unobserves after triggering). It adds a sense of progression as the user scrolls through a long single-page CV. This fits the "understated, polished" vibe. The implementation is lightweight -- no library, just a native IntersectionObserver.

**What to change:**

1. **Remove `data-animate` from individual child elements** inside already-animated sections. Currently these elements have `data-animate`:
   - Each `<section class="section">` (correct -- keep these)
   - `campsnap-banner` (correct -- keep)
   - Each `.experience-entry` inside the experience section (remove -- the parent section already animates)
   - Each `.project-card` inside the projects section (remove -- the parent section already animates)
   - `.education-section` inside the skills section (remove -- the parent section already animates)

   The child-level animations cause a "popcorn" effect where items appear one by one within a section that's already visible. This feels jittery rather than polished. Animating at the section level only gives a cleaner entrance.

2. **Reduce translateY from 24px to 16px** -- 24px is slightly too much vertical shift. At 16px the movement is perceptible but more refined.

3. **Keep the duration at 0.6s** -- this is appropriate.

**Files to change:**
- `src/templates/sections/experience.ejs` line 14: remove `data-animate` from `.experience-entry`
- `src/templates/sections/projects.ejs` line 8: remove `data-animate` from `.project-card`
- `src/templates/sections/skills.ejs` line 25: remove `data-animate` from `.education-section`
- `src/css/styles.css` line 120: change `translateY(24px)` to `translateY(16px)`

---

## 4. Blog Section -- Upgrade from Bare List to Card Links

**Decision:** Restyle the blog section as a set of card-style links consistent with the project cards and education cards elsewhere on the page.

The current implementation is a bare `<ul>` with plain anchor links. This looks like placeholder markup -- it has no visual weight and doesn't match the polish of the rest of the site.

**What to implement:**

1. Update `src/templates/index.ejs` blog section markup:
   ```html
   <section class="section" data-animate>
     <div class="section-inner">
       <span class="section-label">BLOG</span>
       <h2 class="section-title">Writing</h2>
       <div class="blog-cards">
         <% blogPosts.forEach(function(post) { %>
         <a href="blog/<%= post.slug %>.html" class="blog-card">
           <span class="blog-card-title"><%= post.title %></span>
           <span class="blog-card-date"><%= post.date %></span>
           <svg class="blog-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
         </a>
         <% }); %>
       </div>
     </div>
   </section>
   ```

2. Add CSS to `src/css/styles.css` (replace current `.blog-list` styles):
   ```css
   .blog-cards {
     display: flex;
     flex-direction: column;
     gap: var(--space-sm);
   }

   .blog-card {
     display: flex;
     align-items: center;
     gap: var(--space-md);
     padding: var(--space-lg) var(--space-xl);
     background: var(--color-surface);
     border: 1px solid var(--color-border);
     border-radius: var(--border-radius);
     transition: border-color 0.2s ease, transform 0.2s ease;
     text-decoration: none;
   }

   .blog-card:hover {
     border-color: var(--color-accent);
     transform: translateX(4px);
   }

   .blog-card-title {
     font-family: var(--font-heading);
     font-size: var(--text-body);
     font-weight: 600;
     color: var(--color-heading);
     flex: 1;
   }

   .blog-card-date {
     font-family: var(--font-mono);
     font-size: var(--text-xs);
     color: var(--color-text-muted);
     letter-spacing: 0.03em;
   }

   .blog-card-arrow {
     color: var(--color-text-muted);
     flex-shrink: 0;
     transition: color 0.2s ease, transform 0.2s ease;
   }

   .blog-card:hover .blog-card-arrow {
     color: var(--color-accent);
     transform: translateX(4px);
   }
   ```

3. The blog card design uses the same surface/border treatment as `.education-card` and `.project-card` for visual consistency. The horizontal layout with an arrow gives it a distinct "link row" feel that differentiates it from the content cards.

4. **Data requirement:** The blog post `date` field needs to be exposed in the template data. Check `src/index.js` to confirm the blog post metadata includes a formatted date string. If not, extract the date from the markdown frontmatter or filename and pass it through.

5. Remove the old `.blog-list` CSS (lines 885-896 in styles.css). Keep the `.blog-nav`, `.blog-post`, and blog page styles unchanged.

---

## 5. Theme Toggle -- Minor Refinements

**Decision:** Keep the current placement (top-right of hero, absolutely positioned). Refine the styling.

The placement is conventional and discoverable. Absolute positioning within the hero keeps it visible on first load without needing a fixed header/nav bar (which would add complexity and doesn't fit the "no navigation" single-page approach).

**What to change:**

1. **Add `position: fixed` instead of `position: absolute`** so the toggle remains accessible as the user scrolls past the hero. Currently it disappears once you scroll past the hero section. On a long CV page, users need the toggle available throughout.

   Update `.theme-toggle` in CSS:
   ```css
   .theme-toggle {
     position: fixed;
     top: var(--space-xl);
     right: var(--space-xl);
     z-index: 100;
     /* ... rest unchanged */
   }
   ```

   Remove the toggle from inside `.hero-inner` in `hero.ejs` and place it as a direct child of `<body>` in `index.ejs` (so it's not clipped by `.hero`'s `overflow: hidden`).

2. **Add a subtle backdrop blur** for readability over varied content backgrounds:
   ```css
   .theme-toggle {
     backdrop-filter: blur(8px);
     -webkit-backdrop-filter: blur(8px);
   }
   ```

3. **Print styles already hide the toggle** (line 1096-1099 in styles.css) -- no changes needed there.

---

## 6. Typography and Font Loading

**Decision:** Keep the current font stack but fix the loading strategy.

The font combination is strong: Space Grotesk (headings) provides geometric character, Inter (body) is highly legible, JetBrains Mono (code/labels) adds the nerdy/technical accent. This combination fits the "editorial confidence" direction from the design brief.

**Issue:** Inter is listed as an anti-pattern in the frontend-design skill guidance (generic AI-default font). However, for a body font in a CV/portfolio context, Inter's legibility at small sizes and its wide weight range make it a pragmatic choice. The display and accent fonts (Space Grotesk, JetBrains Mono) carry the visual identity. Replacing Inter with something more distinctive (e.g. IBM Plex Sans, Source Sans 3) would be a future consideration.

**What to change:**

1. **Add `font-display: swap`** to the Google Fonts URL to prevent FOIT (flash of invisible text):
   ```
   https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap
   ```
   This is already present (`&display=swap`). No change needed -- confirmed correct.

2. **Trim unused font weights.** The site loads Inter at 300/400/500/600/700 but only uses 400 (body), 500 (`.experience-summary`, `.project-leader`, `.badge-label`), and 600 (`.signature`). Reduce to:
   ```
   family=Inter:wght@400;500;600
   ```
   This cuts the font payload by ~40% for Inter (dropping 300 and 700).

3. Similarly for Space Grotesk, the CSS uses 600 and 700. Remove 400 and 500:
   ```
   family=Space+Grotesk:wght@600;700
   ```

   **Before trimming Space Grotesk to 600;700**, add explicit `font-weight: 600` to `.blog-post h1` and `.blog-post h2` in `src/css/styles.css`. Those rules currently use `font-family: var(--font-heading)` without an explicit `font-weight`, so they render in weight 400 by default. Dropping weight 400 from Space Grotesk would visibly change those blog headings. Alternatively, keep weight 400 in the Space Grotesk URL to avoid touching the CSS.

   Updated full URL (after fixing blog heading weights):
   ```
   https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@600;700&display=swap
   ```

---

## 7. Colour Consistency and Contrast

**Decision:** No major changes. The palette is well-implemented.

**Observations:**

- Dark theme: warm off-white text (`#f0ece4`) on near-black (`#0a0a0f`) -- excellent contrast ratio (~16:1).
- Amber accent (`#f59e0b`) on dark -- contrast ratio is ~8:1, passes WCAG AA for normal text and AAA for large text.
- Light theme: dark navy text (`#1a1a2e`) on warm off-white (`#faf8f4`) -- excellent contrast ratio (~15:1).
- Light theme accent (`#d97706`) on off-white -- contrast ratio ~4.6:1, passes WCAG AA for normal text.
- Secondary text (`#9ca3af` dark, `#4a4a5a` light) -- both pass WCAG AA at their body font sizes.

**One fix:** The `.availability-dot` uses a hardcoded green (`#22c55e`) that doesn't use CSS custom properties. This is fine because it represents a semantic status colour (green = available), but it should be documented in a comment in the CSS to explain why it's not a variable.

---

## 8. Campsnap Banner Positioning

**Decision:** Move the campsnap banner from its current position (second element, directly after the hero) to later in the page, after the projects section and before the blog section.

**Rationale:** The banner is a playful aside -- "I feel like you're just here for the campsnap filters." This joke lands better after the reader has seen the portfolio content, not as the very first thing after the hero. Placing it between hero and about creates a confusing reading order: name -> side project ad -> about me. The professional content should come first; the playful tangent should come later.

**What to implement:**

1. In `src/templates/index.ejs`, move the `campsnap-banner` include from line 23 to after the projects include (line 27) and before the blog section (line 28).

---

## 9. Section Numbering Consistency

**Decision:** Add a section label to the blog section for consistency.

Currently the sections are numbered: 01 ABOUT, 02 EXPERIENCE, 03 SKILLS, 04 EDUCATION, 05 PROJECTS. The blog section has the label "BLOG" but no number.

**What to implement:**

1. In the blog section markup in `index.ejs`, update the label to include a number. If the campsnap banner moves (see item 8), the blog section becomes 06:
   ```html
   <span class="section-label">06 — BLOG</span>
   ```

---

## 10. Hero Section -- Scroll Hint

**Decision:** Keep the scroll hint (animated vertical line at bottom of hero). It's a subtle, tasteful indicator that serves the "polished" vibe. The CSS animation (`scrollPulse`) is lightweight.

No changes needed.

---

## Implementation Priority

1. **zipline.gif conversion** (item 1) -- highest impact, biggest performance win
2. **profile.png optimisation** (item 2) -- second biggest performance win
3. **Theme toggle to fixed position** (item 5) -- usability improvement
4. **Scroll animation refinement** (item 3) -- remove child-level animations
5. **Blog section cards** (item 4) -- visual consistency
6. **Campsnap banner repositioning** (item 8) -- information architecture
7. **Section numbering** (item 9) -- polish
8. **Font weight trimming** (item 6) -- performance micro-optimisation
