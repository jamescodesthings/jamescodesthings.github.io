# Future Design Updates -- Parking Lot

Items identified during the frontend design review that are out of scope for this cycle. These require either design mockups, significant implementation effort, or further discussion before proceeding.

---

## Layout and Structure

### Navigation / Table of Contents

The site is a long single-page scroll with no navigation. As more sections are added (socials, CV download, blog growing), a lightweight navigation element could help. Options:

- **Sticky dot-nav** (vertical dots on the right edge, one per section) -- minimal, doesn't compete with content
- **Collapsible hamburger menu** -- more conventional, allows named section links
- **Scroll-spy section indicator** -- just shows which section you're in, no interaction

This needs mockups to evaluate which approach fits the editorial aesthetic. A dot-nav with section numbers (matching the existing 01, 02, 03 labels) could work well.

### Hero Section Evolution

The hero is currently just name + role + scroll hint. Future options:

- Add the full logo (once logo placement decisions are finalised)
- Add a one-line tagline or rotating statement
- Add subtle generative/procedural background art (canvas-based, not a GIF) -- fits the "slightly nerdy" vibe
- Parallax depth effect on scroll

These need design exploration and careful performance testing. The hero should stay fast-loading above all else.

### Two-Column Layout Refinement

The about section uses a sidebar + main grid. This pattern could extend to experience and projects sections for a more magazine-like layout:

- Dates/metadata in a narrow left column
- Content in a wider right column
- Creates a strong vertical rhythm

This would be a significant template restructure. Needs mockups.

---

## Typography

### Replace Inter with a More Distinctive Body Font

Inter is functional but generic. Candidates for a future swap:

- **IBM Plex Sans** -- similar x-height and legibility, more character, pairs well with mono
- **Source Sans 3** -- Adobe's open source workhorse, slightly warmer than Inter
- **Atkinson Hyperlegible** -- designed for accessibility, very distinctive letterforms
- **General Sans** (Fontshare) -- geometric like Space Grotesk but lighter, good for body

Any swap needs careful testing at all body text sizes across both themes.

### Variable Fonts

The current setup loads multiple static font weights from Google Fonts. Switching to variable fonts (Space Grotesk and Inter both support them) would:

- Reduce total font payload
- Allow finer weight control in CSS
- Enable smooth weight transitions on hover/focus

Implementation is straightforward but needs testing across browsers.

---

## Interactivity

### Skill Badge Interactivity

The bento grid skills badges have hover states but no other interaction. Future options:

- Click to filter experience/projects by that technology
- Tooltip showing years of experience or proficiency level
- Group/cluster animation on hover (related skills highlight together)

These need both design and data model changes (skills.json would need proficiency or grouping fields).

### Project Card Expansion

Project cards currently show all detail statically. An expand/collapse pattern could:

- Show title + leader text by default
- Expand to show full detail + tech badges on click
- Reduce initial visual density of the projects section

This needs UX testing -- on a CV site, hiring managers may prefer everything visible without interaction.

### Dark/Light Theme Transition

The current theme toggle does an instant swap (CSS transition on background-color and color at 0.3s). A more polished approach:

- Circular reveal animation originating from the toggle button
- Cross-fade between themes
- Respect `prefers-reduced-motion` for both options

These are purely cosmetic and complex to implement correctly. Low priority.

---

## Performance

### Self-Host Fonts

Currently fonts load from Google Fonts CDN and DevIcon from jsDelivr CDN. Self-hosting would:

- Eliminate third-party DNS lookups and connections
- Allow subsetting fonts to only needed characters
- Improve privacy (no Google tracking)
- Enable better caching control

Implementation: download font files, add `@font-face` declarations, remove Google Fonts `<link>` tags. Moderate effort.

### DevIcon Replacement

The DevIcon CSS library loads the entire icon font (~100+ icons) to display a handful of technology badges. Options:

- Self-host only the needed glyphs (font subsetting)
- Replace with individual SVG icons (like the image-based icons already used for some badges)
- Use a build-time SVG sprite sheet

The mixed approach (some DevIcon classes, some local images) should eventually converge to one strategy.

### Image Optimisation Pipeline

Currently images are copied as-is from `src/assets/` to `public/assets/`. A build-time optimisation step could:

- Convert PNGs to WebP with PNG fallback
- Resize images to maximum needed dimensions
- Generate responsive `srcset` variants
- Strip metadata

This would be a build pipeline enhancement in `src/index.js`.

---

## Visual Polish

### Subtle Texture/Grain Overlay

The design brief references texture and grain as tools for editorial depth. A very subtle noise overlay on the dark background could add warmth:

- CSS: `background-image: url('noise.svg')` with low opacity
- Or: CSS `filter` with `url(#grain)` SVG filter

Needs visual testing -- too much grain looks dated, too little is invisible. Best done with a designer reviewing live.

### Section Dividers

Currently sections are separated by whitespace and optional `border-bottom` on experience entries. More intentional dividers could add rhythm:

- Thin horizontal rules with accent colour fade
- Section number in the margin
- Alternating subtle background tones between sections

### Footer Enhancement

The footer is minimal (brand name + copyright). Future additions:

- Logo placement (after logo integration is complete)
- Quick links to key sections
- Social links (duplicated from contact card for convenience)
- "Built with" credit line -- fits the nerdy/transparent vibe

### Blog Post Page Design

The blog post template (`blog.ejs`) is functional but bare -- it lacks the font loading, theme toggle, and design system of the main page. Future improvements:

- Load the same Google Fonts
- Include theme toggle
- Add estimated reading time
- Add previous/next post navigation
- Add a "back to top" button for long posts
- Consider a table of contents for posts with multiple headings

### Print Stylesheet Expansion

The current print styles hide interactive elements and reset colours. More thorough print optimisation:

- Force light theme CSS variables in print (not just `background: white; color: black`)
- Ensure links show URLs inline `a[href]::after { content: " (" attr(href) ")"; }`
- Page break control per section
- Remove or replace accent colours with print-friendly alternatives
- Header/footer with name and page numbers

---

## Content-Driven Design

### Dynamic Section Ordering

Allow the JSON data to control section display order, so sections can be reordered without template changes. Would require a section registry in the build pipeline.

### Conditional Sections

Some sections may not always be relevant (e.g. the campsnap banner is specific to a side project). A `visible: true/false` flag in data files would let sections be toggled without template edits.

### Multi-Page Support

As the blog grows, the single-page approach may need to evolve:

- Blog index page with pagination
- Individual project pages with more detail
- A `/cv` route that shows just the CV sections (no blog, no campsnap)

This would require routing support in the static site generator.
