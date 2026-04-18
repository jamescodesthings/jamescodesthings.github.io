# Cross-Platform Cohesion Report

Research date: 2026-04-12. Covers: GitHub, LinkedIn, Makerworld, Instagram, and the Campsnap sub-site.

---

## Per-Platform Analysis

### GitHub

**Handle:** `jamescodesthings` — https://github.com/jamescodesthings

**Current state:**

- Bio is NULL — no bio set on the profile at all.
- Profile README exists but is stale: dated 2024 and contains Lua/PICO-8 content that no longer reflects current work.
- The website/URL field is empty — codesthings.com is not linked from the profile.
- 2 pinned repos: `portfolio` (the codesthings site) and `zsh-config`. The portfolio pin does link back to codesthings indirectly, but only if a visitor clicks through to the repo.
- Fun repos present: `hopes-and-prayers`, `french-fry` — these are a good expression of the playful/nerdy vibe but aren't surfaced unless someone digs.

**Suggested bio wording:**

> Developer based in the Midlands, UK. Nerd hobby projects welcome. See codesthings.com.

Keep it short. The profile README can carry more personality — but right now it needs a refresh first.

**Suggested README update:**

Replace the stale 2024/Lua content with a brief intro that matches current work and vibe. Suggested structure:

```
# Hey, I'm James

Developer based in the Midlands, UK. I build things that are useful, fun, or both.

- Day job: full-stack development
- Hobby: 3D printing, FPV drones, photography
- Philosophy: enough tool for the job, ship then iterate

Find me at: https://codesthings.com
```

**Cross-linking:**

- Add codesthings.com to the GitHub profile website/URL field — this is a direct, high-visibility link.
- The portfolio repo pin is good; keep it. Consider whether `zsh-config` is the best second pin or whether another repo better represents current work.

---

### LinkedIn

**Handle:** `jamescodesthings` — https://www.linkedin.com/in/jamescodesthings

**Current state:**

- About snippet: "Hi! I'm James, a developer based in the Midlands, UK."
- codesthings.com is already listed as Personal Website — this is correctly configured.
- Full profile is partially gated by auth, so exact headline and full About text could not be confirmed.

**Suggested updates:**

The current About opening is functional but bland. Consider strengthening it:

> I'm James — a developer based in the Midlands, UK. I care about shipping things that work, keeping codebases clean, and picking the right tool rather than the fashionable one. Find my work at codesthings.com.

The headline (currently unconfirmed) should include "Developer" and ideally "codesthings.com" or a domain reference if LinkedIn's character limit allows.

**Cross-linking:**

Already done — codesthings.com is listed as Personal Website. No changes needed here. Verify the URL is displayed as a custom label (e.g. "Portfolio" or "codesthings.com") rather than the generic "Personal Website" label.

---

### Makerworld

**Handle:** `@jamescodesthing` (no trailing 's') — https://makerworld.com/en/@jamescodesthing

**HANDLE INCONSISTENCY — notable:**

Every other platform uses `jamescodesthings` (with a trailing 's'). Makerworld uses `jamescodesthing` (no 's'). This is a meaningful inconsistency — anyone searching for `jamescodesthings` on Makerworld will not find this profile. It appears Makerworld does not allow handle changes after account creation, so this likely cannot be fixed. It should be noted in any cross-platform bio or profile that links to Makerworld, and the codesthings.com `data/socials.json` URL already uses the correct (inconsistent) handle.

**Current state:**

- Bio: "Hey, I'm James, I make stuff!" — casual and fine, but generic.
- 9 models published: FPV drones, uConsole accessories, Amiibo-related prints — good variety, authentic nerd/maker vibe.
- No confirmed codesthings.com link on the profile.

**Suggested bio wording:**

> Developer and maker based in the Midlands, UK. I print FPV drone parts, computer accessories, and whatever else I'm tinkering with. More at codesthings.com.

**Cross-linking:**

The suggested bio wording above already includes `codesthings.com`. If Makerworld exposes a separate website field, add the URL there too — prefer the dedicated field over inline bio text, but keep it in both if possible.

**Handle note:**

The `data/socials.json` URL (`https://makerworld.com/en/@jamescodesthing`) is already correct for the actual handle. No code change needed. The inconsistency is a platform limitation — document it but do not attempt to "fix" the URL.

---

### Instagram

**Handle:** `jamescodesthings` — https://www.instagram.com/jamescodesthings/

**Current state:**

- Bio: "Photographer, Developer, Dad. Midlands, UK." — concise, personal, accurate.
- 5 posts, 14 followers — early stage / low-activity account.
- No link in bio — codesthings.com does not appear anywhere in the profile, only in one CampSnap post caption.
- Handle is consistent with all other platforms (except Makerworld).

**Suggested updates:**

The bio wording is good — it's personal and authentic. The main gap is the missing link.

Add codesthings.com as the profile link. Instagram allows one URL in the bio — this should be it. Suggested updated bio:

> Photographer, Developer, Dad. Midlands, UK. codesthings.com

Or with the URL in the link field:

> Photographer, Developer, Dad. Midlands, UK.
> [link: codesthings.com]

**Cross-linking:**

Add codesthings.com to the Instagram profile link field. This is the single highest-impact change for this platform.

---

### Campsnap Sub-Site

**URL:** https://codesthings.com/campsnap/

**Current state:**

The Campsnap sub-site lives at a subdirectory of codesthings.com but has no visual or navigational connection to the main site. It presents as a fully independent product with a completely different identity.

**Branding alignment — not aligned:**

| Property           | codesthings.com                             | campsnap sub-site            |
| ------------------ | ------------------------------------------- | ---------------------------- |
| Fonts              | Space Grotesk + Inter + JetBrains Mono      | Karla + Oswald               |
| Theme              | Light/dark toggle via CSS custom properties | Always dark, hardcoded black |
| Navigation         | Site header with logo                       | None / no link back to main  |
| Logo               | codesthings logo present                    | No codesthings branding      |
| Cross-link to main | N/A                                         | Absent                       |

**Suggested updates:**

There are two valid approaches depending on intent:

1. **Treat Campsnap as a standalone sub-product** (current approach, but do it deliberately): Add a small "by James @ codesthings.com" footer credit with a link back. No need to fully restyle — just add the attribution.

2. **Bring it into the codesthings design system** (more work): Adopt Space Grotesk/Inter, use CSS custom properties for theming, add a header/footer matching the main site. This makes it feel like a product of the codesthings brand rather than a separate thing.

Option 1 is lower effort and sufficient for cohesion. A one-line footer "Built by [James](https://codesthings.com)" achieves the cross-link without requiring a design overhaul.

The hardcoded `background: black` (rather than using a CSS custom property) is a maintainability issue regardless of which option is chosen — worth noting as technical debt.

---

## Cross-Platform Recommendations

### Profile photo consistency

Not researched directly. Ensure the same profile photo (or a consistent visual) is used across GitHub, LinkedIn, Instagram, and Makerworld. A developer-appropriate photo (professional but not stiff) reinforces the personal brand. If the current photos are inconsistent, pick one and apply it across all platforms.

### Bio wording alignment

There's a loose pattern across the platforms that should be tightened:

- **Core identity:** Developer, Midlands UK — present on LinkedIn and Instagram, absent on GitHub (no bio) and Makerworld (too vague).
- **Tone:** Should be consistent — understated, slightly playful, professional. Current bios range from professional (LinkedIn) to "I make stuff!" (Makerworld). Suggest converging on the tone of the Instagram bio as a baseline: short, personal, unpretentious.
- **Cross-link anchor:** Every profile bio should either include `codesthings.com` in the text or have it set as the profile URL/website field.

### Handle consistency

| Platform   | Handle           | Consistent? |
| ---------- | ---------------- | ----------- |
| GitHub     | jamescodesthings | Yes         |
| LinkedIn   | jamescodesthings | Yes         |
| Instagram  | jamescodesthings | Yes         |
| Makerworld | jamescodesthing  | **NO**      |

The Makerworld inconsistency (`jamescodesthing` vs `jamescodesthings`) cannot be fixed on the platform side. Mitigate by noting it in the Makerworld bio and ensuring the correct URL is used everywhere codesthings.com links to it (already done in `data/socials.json`).

### Cross-linking strategy

Priority actions, in order of impact:

1. **GitHub:** Add codesthings.com to the website/URL field — zero-effort, high visibility.
2. **Instagram:** Add codesthings.com as the bio link — currently the only platform with no link at all.
3. **Makerworld:** Add codesthings.com to bio text (if no website field).
4. **Campsnap sub-site:** Add a footer credit/link back to codesthings.com.
5. **LinkedIn:** Already linked — verify it's labelled clearly.

---

## Site-Side Updates

Changes to make on codesthings.com itself:

- **`data/socials.json` — no changes required.** The Makerworld URL already uses the correct handle (`@jamescodesthing`). All descriptions are accurate and appropriate. No updates needed.
- **Campsnap sub-site cross-link:** Add a "by James @ codesthings.com" footer to `jamescodesthings/campsnap` repo. This is a change to a separate repo, not this one, but it's a site-side concern.

---

## External Updates (Manual)

The following changes require manual action on external platforms — they cannot be made by editing this repo:

| Platform   | Action                                                                                      | Priority |
| ---------- | ------------------------------------------------------------------------------------------- | -------- |
| GitHub     | Add codesthings.com to website/URL field                                                    | High     |
| GitHub     | Update profile README — remove stale 2024/Lua content, add current intro + codesthings link | Medium   |
| GitHub     | Add bio (currently NULL) — suggested wording above                                          | High     |
| Instagram  | Add codesthings.com as bio link                                                             | High     |
| Makerworld | Update bio to include codesthings.com URL                                                   | Medium   |
| LinkedIn   | Verify Personal Website label is clear; consider strengthening About text                   | Low      |
| Campsnap   | Add footer credit/link back to codesthings.com (separate repo: `jamescodesthings/campsnap`) | Medium   |
