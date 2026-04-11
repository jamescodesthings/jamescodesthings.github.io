# Design Brief: codesthings.com Redesign 2026

## Overview

A complete visual redesign of codesthings.com for 2026. The site is a personal portfolio/CV for James Macmillan, a software engineer. The current design is functional but lacks character and punch — it reads like a generic royal-blue CV template. The 2026 redesign should feel **bold, clean, and friendly** while still communicating technical credibility.

The text content stays the same. The layout and visual language change dramatically.

---

## The Problem with the Current Design

The existing site uses:

- A warm off-white background (`#f5f5f0`) with white card surfaces
- Royal blue accent (`#3b82f6`) for links, badges, and the hero
- Dark navy hero/footer (`#1a1a2e`)
- System font stack (San Francisco, Segoe UI, etc.)
- A "paper page" metaphor with sidebar + main content
- Referenced paper textures that don't actually exist

It's clean but unremarkable. It looks like every other developer portfolio built between 2020-2024. The blue-on-white CV layout communicates "safe" rather than "skilled." There's no visual identity, no memorable quality, nothing that says _this person makes interesting things_.

---

## Design Direction: Editorial Confidence

The redesign draws from **editorial design** and **digital product catalogues** — the kind of design language seen in independent publications, creative tool documentation, and curated product pages. The reference point is the Lab Archive, Vol. I PDF (in this directory) and the campsnap microsite at codesthings.com/campsnap.

### Core Principles

1. **Dark-first**: Default to a dark background. Not "dark mode as an option" — dark as the primary identity. Light mode becomes the alternate.
2. **Typographic boldness**: Large, confident headings. Mix weights dramatically — heavy display type against light body copy.
3. **Structured whitespace**: Generous margins and padding. Let content breathe. Density communicates bureaucracy; space communicates confidence.
4. **Monospace accents**: Use monospace type for labels, metadata, and navigational elements. This nods to the technical nature of the work without being a "code editor" theme.
5. **Warm neutrals over cold blues**: Replace the royal blue palette with warmer, more distinctive colours. Think amber, warm white, soft greens — colours that feel approachable and human.

---

## Example Analysis: Lab Archive, Vol. I

The PDF in this directory (`00-lab-archive-vol-1-cspro.pdf`) is a catalogue of camera filter profiles. Its design is an excellent reference for the portfolio redesign.

### What it does well

**Colour**

- Pure black background (`#000000` or near-black) throughout
- White/cream text for primary content — high contrast, immediately legible
- No accent colour competing for attention; the photography provides all the colour
- The palette is: black, white, and whatever the content brings

**Typography**

- Bold, condensed, uppercase display headings for filter names (e.g., "GOLDEN '92", "STREET COOL")
- A smaller, lighter weight for introductory sentences — bold but not as heavy as the display
- Monospace for structural labels: `WHY IT MATTERS:`, `WHEN TO USE:`, `FINISHING:`, `TIP:`
- Regular serif or sans-serif for body paragraphs
- Clear hierarchy: display heading > bold intro > label > body

**Layout**

- Full-width photo strips as section openers — edge-to-edge imagery that fills the viewport
- Two-column content layout below: descriptive text (left, ~60%) and product image with caption (right, ~40%)
- Numbered sections with a consistent pattern: `01.` prefix in a lighter weight, name in heavy display
- Table of contents uses monospace with coloured first letters as a decorative element
- Footer labels are spaced monospace, right-aligned — minimal but functional

**Visual Rhythm**

- Every section follows the same structure: number + title > photo strip > two-column text
- The repetition creates a catalogue feel — professional, curated, considered
- Ample vertical space between sections; pages don't feel cramped

### What to borrow for the portfolio

| Lab Archive Feature         | Portfolio Application                               |
| --------------------------- | --------------------------------------------------- |
| Black background default    | Dark theme as primary, not afterthought             |
| Bold condensed headings     | Section titles for Experience, Skills, Projects     |
| Monospace labels            | Job dates, tech badges, metadata, section labels    |
| Full-width imagery strips   | Hero section, project showcase banners              |
| Two-column with sidebar     | Keep the cover-letter layout but invert the palette |
| Numbered/structured content | Experience entries with clear visual hierarchy      |
| Editorial tone              | Copy that reads as confident, not corporate         |

---

## Example Analysis: Campsnap Microsite (codesthings.com/campsnap)

The campsnap site is a microsite James already built. It shares DNA with the Lab Archive design but adapted for the web.

### What it does well

- Blue gradient banner with white text — bold, immediately attention-grabbing
- Clear call-to-action button with hover effects (lift + shadow)
- Zipline GIF adds personality and humour
- The banner is confident: it knows why you're here and gets you there fast
- Responsive: stacks to column on mobile

### What to carry forward

- The confidence: don't bury the lede. The portfolio should be equally direct about who James is and what he does
- Personality through media: the GIF works because it's unexpected on a professional page
- Strong CTAs: every section should have a clear next action

---

## 2026 Design Trends to Incorporate

### 1. Dark Mode as Default

The industry has shifted. Dark backgrounds are no longer the "alternative" — they're the premium default. Apple, Linear, Vercel, Raycast, and most developer-facing tools now ship dark-first. A portfolio for a software engineer should follow suit.

**Application**: Near-black base (`#0a0a0f` or similar), warm off-white text (`#f0ece4`), with a light mode toggle for accessibility.

### 2. Variable Fonts and Typographic Range

2026 design uses font weight as a design tool. A single variable font family can create the entire hierarchy — from hairline labels to black display headings — without loading multiple font files.

**Recommended font options**:

- **Inter** (variable, free): Clean, neutral, excellent for body and UI. Widely available, loads fast.
- **Space Grotesk** (variable, free): Geometric, slightly technical feel. Good for headings.
- **JetBrains Mono** (monospace, free): For code/labels. Already trusted in the developer community.
- **Instrument Sans/Serif** (variable, free): Modern editorial quality with excellent weight range.

**Application**: One variable sans-serif for headings and body (different weights), one monospace for labels and metadata. Two font loads maximum.

### 3. Bento Grid Layouts

The bento box layout (pioneered by Apple's product pages, now everywhere) organises content into a grid of differently-sized cards. It's more visually interesting than stacked full-width sections while remaining clean and structured.

**Application**: Skills and projects sections could use a bento layout — a 2x3 or 3x2 grid where cards have different sizes based on importance. The cover letter / about section could be a large featured card.

### 4. Subtle Motion and Microinteractions

Static pages feel dated. 2026 sites use:

- Scroll-triggered fade-ins (not aggressive parallax — subtle opacity + translate)
- Hover states that feel tactile (scale, shadow, colour shift)
- Theme transitions that animate smoothly
- Skeleton states and progressive reveals

**Application**: Sections fade in as they enter the viewport. Tech badges have hover states. The dark/light toggle animates. Keep it subtle — no bounce, no overshoot.

### 5. Warm Colour Palettes

Cold blues are out. The trend is toward warmer, more natural palettes:

- Amber/gold accents instead of blue
- Warm whites and creams instead of pure white
- Soft greens, terracotta, or muted coral as secondary colours
- Gradients that feel like natural light, not neon

**Application**: Replace `#3b82f6` (blue) with a warm accent. Options:

- Amber: `#f59e0b` / `#d97706` — warm, energetic, friendly
- Warm green: `#22c55e` / `#16a34a` — growth, creativity, technical
- Coral/salmon: `#f87171` / `#ef4444` — bold, modern, memorable
- Gold: `#eab308` / `#ca8a04` — premium, confident, warm

### 6. Prominent Personal Branding

Modern portfolios lead with identity. Large name, clear role, maybe a brief statement. Not hidden behind a generic hero section.

**Application**: The hero should be the name, large and bold, with a one-line role descriptor. No background image needed — typography IS the design.

### 7. Print-Quality Web Design

The web is borrowing from print editorial: careful kerning, optical alignment, column grids, pull quotes, and considered whitespace. The Lab Archive PDF exemplifies this.

**Application**: Treat each section like a magazine spread. Consider the fold, the reading flow, the visual weight distribution.

---

## Proposed Colour Palette

### Dark Theme (Primary)

| Role           | Value     | Description                            |
| -------------- | --------- | -------------------------------------- |
| Background     | `#0a0a0f` | Near-black with a hint of blue-black   |
| Surface        | `#141419` | Slightly lighter for cards/sections    |
| Surface raised | `#1e1e26` | For hover states and elevated elements |
| Text primary   | `#f0ece4` | Warm off-white, not pure white         |
| Text secondary | `#9ca3af` | Muted grey for metadata/dates          |
| Accent         | `#f59e0b` | Amber — warm, energetic, distinctive   |
| Accent hover   | `#d97706` | Darker amber for interactive states    |
| Border         | `#2a2a35` | Subtle dividers                        |

### Light Theme (Alternate)

| Role           | Value     | Description                         |
| -------------- | --------- | ----------------------------------- |
| Background     | `#faf8f4` | Warm cream                          |
| Surface        | `#ffffff` | White for cards                     |
| Surface raised | `#f5f3ee` | Slightly warm for hover             |
| Text primary   | `#1a1a2e` | Dark navy (keep from current)       |
| Text secondary | `#6b7280` | Medium grey                         |
| Accent         | `#d97706` | Amber, slightly darker for light bg |
| Accent hover   | `#b45309` | Darker still                        |
| Border         | `#e5e2da` | Warm grey border                    |

---

## Proposed Typography

```
Headings:    Space Grotesk (variable), 700-800 weight, uppercase for section titles
Body:        Inter (variable), 400-500 weight, 1.6-1.7 line height
Monospace:   JetBrains Mono, 400 weight, for labels/dates/tech badges
```

### Scale

| Token   | Size                        | Usage                       |
| ------- | --------------------------- | --------------------------- |
| display | clamp(2.5rem, 5vw, 4rem)    | Hero name                   |
| h1      | clamp(1.75rem, 3vw, 2.5rem) | Section headings            |
| h2      | 1.25rem                     | Subsection / employer names |
| body    | 1rem (16px)                 | Body copy                   |
| small   | 0.875rem                    | Dates, labels, metadata     |
| xs      | 0.75rem                     | Badges, tags                |

---

## Proposed Layout

### Hero

- Full viewport height on first load (100svh)
- Name in display size, centred or left-aligned
- Role descriptor in monospace beneath
- Dark mode toggle in top right
- No background image — the typography and colour are the design
- Optional: subtle animated gradient or grain texture

### Content Sections

- Max width 1100px (keep current)
- Single column for most sections, with bento grid for skills/projects
- Each section: monospace label (e.g., `EXPERIENCE`) + bold heading + content
- Generous vertical spacing: 4-6rem between sections
- Subtle dividers or section numbers (01, 02, 03)

### Experience Entries

- Employer name in bold (h2 weight)
- Dates in monospace, right-aligned or on their own line
- Summary paragraph
- Tech badges in monospace pills (border, no fill — outline style)
- Expandable details (keep existing expand/collapse)

### Skills / Projects

- Bento grid: 2-3 columns, cards of varying height
- Each card: title + brief description + tech stack
- Hover state: subtle lift and border colour change
- Featured projects get larger cards

### Campsnap Banner

- Keep the personality (zipline gif, "just here for the campsnap filters")
- Restyle to match new palette — amber/gold gradient instead of blue
- Or: make it a full-width card with the dark surface treatment

### Footer

- Minimal: name, links, copyright
- Monospace treatment
- Match the Lab Archive footer style — right-aligned, spaced

---

## Responsive Strategy

- **Desktop (>1024px)**: Full layout, bento grids, generous spacing
- **Tablet (768-1024px)**: Reduce grid columns, stack sidebar
- **Mobile (<768px)**: Single column, reduced type scale, full-width cards
- Use `clamp()` for fluid typography throughout
- Touch targets minimum 44px

---

## What NOT to Do

- No parallax scrolling
- No animation libraries heavier than CSS transitions + IntersectionObserver
- No gradient mesh backgrounds (already dated)
- No glassmorphism or frosted glass effects
- No 3D elements or WebGL
- No hero images that take 2 seconds to load
- No "creative" navigation that hides content
- No chatbot widgets or AI assistants
- Keep it fast: target < 100KB total CSS + JS, < 1s LCP

---

## Reference Sites and Resources

### Developer Portfolios (design direction)

- **Linear.app** — Dark-first SaaS, exceptional typography, subtle motion. The gold standard for dark UI in 2026.
- **Vercel.com** — Clean, dark, typographic. Shows how developer tools present themselves with confidence.
- **Raycast.com** — Dark theme, warm accents, bento-style feature grid. Friendly but professional.
- **Paco Coursey (paco.me)** — Minimal developer portfolio. Dark, typographic, personal.
- **Lee Robinson (leerob.com)** — Developer portfolio that's clean, personal, and content-first.
- **Brittany Chiang (brittanychiang.com)** — Dark developer portfolio with green accent, well-structured sections.

### Editorial / Catalogue Design (visual language)

- **Lab Archive, Vol. I** (this directory) — Black background, condensed display type, monospace labels, full-width photography, two-column catalogue layout. The primary visual reference for this redesign.
- **Codesthings.com/campsnap** — Microsite built by James. Blue gradient banner, personality-driven copy, clear CTA. Shows the tone and confidence to carry forward.

### Typography Resources

- **Google Fonts: Space Grotesk** — Variable geometric sans with character. Free.
- **Google Fonts: Inter** — The workhorse variable sans. Free.
- **JetBrains Mono** — Monospace font designed for developers. Free.
- **Google Fonts: Instrument Sans** — Modern editorial variable font. Free.

### Design Trend References

- **Apple product pages (2025-2026)** — Bento grid layouts, dark backgrounds, large typography, scroll-triggered animation. The originator of many current trends.
- **Awwwards.com** — Curated collection of award-winning web design. Filter by "portfolio" and "dark" for relevant examples.
- **Godly.website** — Curated design inspiration focused on modern web aesthetics.
- **Minimal.gallery** — Minimal website designs, many dark-first portfolios.

---

## Summary

The redesign moves codesthings.com from a generic blue CV template to an editorial, dark-first portfolio with:

1. **Dark near-black background** as the primary theme
2. **Warm amber accent** replacing cold blue
3. **Bold condensed headings** + monospace labels for typographic hierarchy
4. **Generous whitespace** and structured sections
5. **Bento grid** for skills and projects
6. **Subtle scroll-triggered animations** via CSS + IntersectionObserver
7. **Print-editorial quality** borrowed from the Lab Archive design language
8. **Personality retained** — campsnap banner, humour, directness

The result should feel like opening a well-designed independent magazine, not filling out a job application.
