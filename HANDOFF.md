# YCOTW — Project Handoff Document
### ycotw.com · "Yachting Capital of the World" · Yacht lifestyle lead-generation site

**Last updated:** June 2026
**Prepared for:** Jim
**Status:** 3 of 6 content clusters complete (all highest-value clusters done). Homepage complete. Ready for remaining clusters, homepage wiring, and deployment.

---

## 1. WHAT THIS PROJECT IS

A yacht-lifestyle content and lead-generation website built around Fort Lauderdale's identity as the "Yachting Capital of the World." The public-facing site is pure yacht content and lifestyle. The financial-services back end (mortgage, real estate, and eventual commercial lending) is **deliberately kept out of all public copy** — it surfaces only privately, in CRM conversations, once a lead exists.

**The funnel:** SEO content → email capture → AI chat → private financial-services outreach.

**Core strategic rule:** The brand makes **no public reference** to Blackburn, Stairway, or any financial-services name. Real estate surfaces only quietly, as "waterfront living" / dockominiums woven into content — never in hero copy or navigation.

---

## 2. THE CONTENT STANDARD (LOCKED — DO NOT DEVIATE)

Every content page is built to this firm standard. It was locked by explicit agreement and must not drift.

- **Pillars: minimum 2,500 words** (article body + FAQ combined)
- **Spokes: minimum 2,000 words** (article body + FAQ combined)
- **Exactly 20 FAQ questions per page** minimum (built for Google AI Overviews & "People Also Ask"). Some pages have 21-23; 20 is the floor.
- **Primary keyword** in the title, URL slug, H1, and naturally across headers — with rich semantic/related vocabulary. **NO keyword stuffing** (Google penalizes it).
- **A handful of quality external links** to authoritative sources — quality-led, NOT padded to a quota.
- **Internal cluster links** — up to the hub, across to siblings, and cross-cluster where relevant.
- **NO faking depth with links** — every page stands on its own substance.

**The floor doubles as a test:** if a topic can't honestly reach its floor without padding, it should be folded into a sibling page rather than stand alone. Expand only with real substance.

**Two explicit failure modes to avoid at all costs:**
1. Keyword stuffing
2. Faking depth with links (thin content propped up by cross-links)

---

## 3. THE ARCHITECTURE (HUB → PILLAR → SPOKE)

Three-tier topic-cluster model:

- **HUB** = an action landing page (Buy, Charter, Learn, etc.). Broadest level. Links down to its pillars. This is where the six site actions live.
- **PILLAR** = a broad topic overview (~2,500 words). Covers a subject at overview depth and links down to its spokes.
- **SPOKE** = a focused deep-dive (~2,000 words) on one sub-topic. Links up to its pillar and across to sibling spokes.

**Why this works:** Five interlinked ~2,500-word pages rank like one 12,500-word page while capturing far more long-tail search traffic. The pillar stays at overview depth on purpose — going deeper would cannibalize the spokes. Depth lives in the spokes.

**Navigation scales cleanly** (important as the library grows to 50-60+ pages):
- A pillar lists only ITS spokes (bounded).
- A hub lists only ITS cluster's pages (bounded).
- A future "Browse by Topic" index is the ONE page that holds everything (built to scale, like a library catalog).
- No single page ever has to list the entire site except that dedicated Browse index.
- The table-of-contents box at the top of each article lists only that page's own sections — it does NOT grow as the site grows.

---

## 4. CAPTURE STRATEGY

- **Homepage** = the full multi-step survey (the "front-door handshake"): "What brings you to the water?" → six action branches → email → optional name → optional phone.
- **Pillars & spokes** = lighter, **contextual** capture matched to each page's topic (e.g., the financing page offers a financing estimate; the maintenance page offers a maintenance checklist). Deeper/more-specific page = warmer lead = a slightly stronger ask is justified.
- **Email first** (lowest friction), then optional name, then optional phone.
- **Phone is always optional and benefit-framed**, with TCPA consent microcopy ("reply STOP"). Never a false "we'll never call" promise, never a required phone field (kills conversions with wealthy, private prospects).

---

## 5. WHAT'S BUILT (in /site/ and /homepage/)

### Homepage — COMPLETE
`homepage/Final Home Page 6.19.26.html` — the master homepage. Immersive 30-frame day-night slideshow hero (15 drawn SVG atmosphere frames + 15 real photos), minimal top bar (logo + sound toggle only), the "What brings you to the water?" survey, six-action band (Buy · Charter · Sell · Learn · Maintain · Connect), six content hub-sections, community capture, full footer.
- Two locked milestone versions saved with DO_NOT_OVERWRITE in the filename — do not overwrite these.

### BUY cluster — COMPLETE (7 pages)
- `buy-hub.html` — hub
- `how-much-does-a-yacht-cost.html` — **PILLAR** (2,546 w) — the gold-standard template. Targets "yacht cost."
- `yacht-maintenance-cost.html` — spoke (2,149 w)
- `yacht-dockage-cost.html` — spoke (2,108 w) — carries the real-estate / dockominium wedge
- `yacht-crew-cost.html` — spoke (2,226 w) — carries the community angle
- `yacht-fuel-cost.html` — spoke (2,089 w)
- `how-to-finance-a-yacht.html` + `new-vs-used-yacht.html` — earlier lighter pages (~480 w each). **These two still need upgrading to the locked standard** (see §7).

### CHARTER cluster — COMPLETE (6 pages) — highest-value cluster
- `charter-hub.html` — hub
- `luxury-yacht-charter.html` — **PILLAR** (2,605 w) — targets "luxury yacht charter" (50K searches, LOW competition — gold)
- `mega-yacht-charter.html` — **PILLAR** (2,554 w) — targets "mega yacht charter" (50K, LOW — gold)
- `yacht-charter-cost.html` — spoke (2,041 w)
- `rent-a-yacht.html` — spoke (2,074 w) — tuned for day-rental / event leads (fast referral revenue)
- `crewed-vs-bareboat.html` — spoke (2,119 w)

### LEARN cluster — COMPLETE (7 pages) — top-of-funnel feeder
- `learn-hub.html` — hub
- `what-is-a-yacht.html` — **PILLAR** (2,550 w) — targets "what is a yacht"
- `types-of-yachts.html` — **PILLAR** (2,505 w) — targets "types of yachts"
- `what-is-a-superyacht.html` — spoke (2,031 w) — targets "superyacht" (50K, LOW — gold)
- `catamarans-explained.html` — spoke (2,018 w) — targets "catamaran" (50K)
- `sailing-vs-motor-yacht.html` — spoke (2,032 w)
- `first-time-yacht-buyer-guide.html` — spoke (2,044 w)
- Learn is architected as top-of-funnel: it links onward into Buy and Charter (e.g., superyacht → mega-yacht-charter; first-time-buyer → buy-hub).

**Every completed page includes:** 20+ question FAQ, contextual email capture, "Ask Anything" AI-chat placeholder, TOC, internal cluster links, quality external sources, and full hub/pillar/spoke interlinking.

**Milestone:** All 50,000-volume, low-competition keywords in the entire keyword dataset are now targeted across these three clusters (luxury yacht charter, mega yacht charter, superyacht, catamaran).

---

## 6. WHAT'S NOT BUILT YET (the remaining work)

### Three remaining clusters (lighter — lower search demand, per the content map weighting):
- **SELL (5 pages):** sell-hub, how-to-sell-a-yacht (pillar), what-is-my-yacht-worth (pillar), sell-without-broker (spoke — owner-to-owner marketplace angle), prep-yacht-to-sell (spoke)
- **MAINTAIN (4 pages):** maintain-hub, yacht-maintenance (pillar), yacht-maintenance-schedule (spoke), yacht-services (spoke)
- **CONNECT (5 pages):** connect-hub, yacht-clubs (pillar — "online yacht club" community idea), yachting-capital / Fort Lauderdale (pillar — real-estate + brand), where-billionaires-dock (spoke), yacht-events (spoke)

### Other open items:
- **Upgrade** `how-to-finance-a-yacht.html` and `new-vs-used-yacht.html` to the locked 2,000-word standard.
- **Build the "Browse by Topic" master index** page (the scalable directory of all pages).
- **Wire the homepage** — its six action cards and footer still point to "#" placeholders. Connect them to the real hub pages (buy-hub, charter-hub, learn-hub, and the future sell/maintain/connect hubs).

---

## 7. PHASE 2 / PRE-LAUNCH TECHNICAL TASKS

- **AI chat ("Ask Anything"):** Currently a designed placeholder on every page. It fires a JS alert. Phase 2 wires it to the live Claude API (backend — cannot live in static HTML). This is the "content → chat → lead" bridge.
- **Homepage photos:** The homepage hero's "Act 2" real photos are currently hotlinked from Unsplash (demo only). **Download and self-host all 15 before launch**, or commission originals.
- **Audio:** Homepage music toggle exists but the audio source is empty. Add a royalty-free track for Phase 2.
- **Email capture backend:** All capture forms are front-end only. Wire to the CRM/email system for real lead capture.
- **CRM integration:** Build the lead handoff from email capture → private financial-services outreach.
- **Trademark:** Register the YCOTW acronym (the registrable mark; "Yachting Capital of the World" is a free descriptive theme).

---

## 8. ABOUT ASTRO / FRAMEWORK MIGRATION

**Note:** No Astro (or other framework) versions exist yet — everything in this package is **standalone static HTML** (self-contained files with inline CSS and minimal vanilla JS, using Google Fonts via CDN). This was deliberate: static HTML is the fastest way to build, review, and validate content, and it deploys anywhere.

**If/when you migrate to Astro** (a good choice for this kind of content site), the mapping is clean:
- Each cluster's shared `<style>` block → a single Astro layout component (`Layout.astro`). All pages currently duplicate the same CSS; in Astro this becomes one shared layout.
- Each article → an Astro page or a Markdown/MDX content collection entry. The hub/pillar/spoke structure maps directly to Astro's content collections.
- The FAQ accordion, TOC, and capture forms → reusable Astro/React components.
- The `builders/` Python scripts (see §9) already separate content from template — that same separation is exactly what Astro wants, so the migration is straightforward.
- The current URL slugs (e.g. `how-much-does-a-yacht-cost.html`) become clean Astro routes (`/how-much-does-a-yacht-cost`).

The static HTML here is production-usable as-is, and also serves as the design/content reference for any framework migration.

---

## 9. THE BUILDERS (reusable — in /builders/)

Python scripts that generate standard-compliant pages from content + a shared template. They separate CONTENT (body HTML + FAQ text files) from TEMPLATE (the shared style, nav, footer, capture, chat, FAQ accordion). Use these to build the remaining clusters fast and consistently.

- `cluster_builder.py` — the main, most current builder. Defines:
  - `page(...)` — builds a full article page (pillar or spoke) with nav, hero, TOC, body, FAQ, chat, related cards, footer.
  - `hub_page(...)` — builds a hub landing page.
  - `parse_faqs(raw)` — parses FAQ text files (format: `Question||Answer` separated by `\n@@\n`).
  - `make_nav(active)` — builds the 6-item top nav with the active cluster highlighted.
  - `wc(html)` — word-counter (body + FAQ) to verify against the floor.
  - `STYLE` — the shared article-page CSS, extracted from the cost pillar.
- `charter_builder.py` — the charter-cluster-specific builder (earlier version; `cluster_builder.py` supersedes it but it's included for reference).

**How pages were built (the workflow to repeat for Sell/Maintain/Connect):**
1. Write the body HTML and a FAQ text file (20 Q&A) per page.
2. Run the builder to assemble the page.
3. Check word count against the floor (`wc()`).
4. If under floor, expand the body with REAL sections (never padding/stuffing) and/or add genuine FAQ questions.
5. Rebuild, re-verify, and confirm ≥ floor.
6. Build the hub by cloning an existing hub (buy-hub.html) with safe, unique string replacements — NOT slice-based edits (a slice bug once produced a corrupt 17MB file; always replace unique strings).

**Design note:** Hub pages have their own CSS (hub-hero, art-grid, articles section) that lives in buy-hub.html. The article-page STYLE does not include those classes. The reliable way to make a new hub is to clone buy-hub.html and do unique-string replacements.

---

## 10. KEYWORD STRATEGY (quick reference)

Demand is ~90% concentrated in BUY (~2.3M of ~2.5M total monthly searches). Best winnable targets (high volume + LOW competition) — all now captured:
- luxury yacht charter (50K, Low) ✓ Charter pillar
- mega yacht charter (50K, Low) ✓ Charter pillar
- superyacht (50K, Low) ✓ Learn spoke
- catamaran (50K) ✓ Learn spoke
- yacht broker (50K) — not yet targeted (candidate for a future Sell/Connect page)

**Avoid as primary targets** (too competitive): "yachts for sale," "used yachts for sale" (both High). Use only as supporting phrases.

Full keyword build plan: `planning/Yacht_Keyword_Build_Plan.xlsx`
Full 38-page content map (6 clusters): `planning/YCOTW_Content_Map.xlsx`

---

## 11. PACKAGE CONTENTS

```
ycotw_package/
├── HANDOFF.md                  ← this document
├── homepage/
│   ├── Final Home Page 6.19.26.html      ← the master homepage
│   ├── SAVED_20frame_daynight_DO_NOT_OVERWRITE.html
│   └── SAVED_7slide_version_DO_NOT_OVERWRITE.html
├── site/                       ← all 21 content pages (Buy, Charter, Learn clusters)
│   ├── buy-hub.html, charter-hub.html, learn-hub.html
│   ├── how-much-does-a-yacht-cost.html (+ 4 cost spokes)
│   ├── luxury-yacht-charter.html, mega-yacht-charter.html (+ 3 charter spokes)
│   ├── what-is-a-yacht.html, types-of-yachts.html (+ 4 learn spokes)
│   └── how-to-finance-a-yacht.html, new-vs-used-yacht.html (need upgrade)
├── planning/
│   ├── YCOTW_Content_Map.xlsx            ← the 38-page blueprint (6 clusters)
│   ├── Yacht_Keyword_Build_Plan.xlsx     ← full keyword research
│   └── Yacht_Site_Content_Blueprint.docx
└── builders/
    ├── cluster_builder.py                ← main reusable page builder
    └── charter_builder.py                ← earlier charter builder (reference)
```

---

## 12. HOW TO VIEW THE SITE

All pages are self-contained HTML. To browse locally:
- Put the `site/` and `homepage/` folders together, or adjust the relative links.
- The pages link to the homepage via `../Final Home Page 6.19.26.html`, so keep `homepage/` one level up from `site/`, OR update those links to match your structure when deploying.
- Open any `.html` file in a browser. Internal cluster links work between pages in `site/`.
- Note: the homepage hero's Act-2 photos require an internet connection (currently hotlinked — self-host before launch).

---

## 13. THE ONE-PARAGRAPH SUMMARY

YCOTW is a yacht-lifestyle SEO site whose hidden purpose is financial-services lead generation. It's built on a hub→pillar→spoke content-cluster architecture, with a locked quality standard (pillars 2,500+ words, spokes 2,000+, 20-question FAQ each, no stuffing, no fake depth). Three of six clusters are complete — Buy, Charter, and Learn — which together capture every high-value keyword in the research. The homepage is complete but its action cards need wiring to the real hubs. Remaining: the Sell, Maintain, and Connect clusters; upgrading two early Buy pages; a Browse-by-Topic index; and Phase 2 backend work (live AI chat, self-hosted media, CRM/email capture). Reusable Python builders make the remaining clusters fast to produce at the same standard.
