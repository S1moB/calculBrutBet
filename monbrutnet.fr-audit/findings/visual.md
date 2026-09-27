# Visual / Mobile Rendering Audit — monbrutnet.fr

**Pages tested:** Homepage (`/`), `/auto-entrepreneur-brut-en-net/`, `/smic-brut-net/`
**Viewports tested:** Mobile 375x812 (DPR 2, touch-enabled), Desktop 1920x1080, Laptop 1366x768, Tablet 768x1024
**Method:** Fresh Playwright captures + live DOM measurement (`scrollWidth`/`clientWidth`, `getBoundingClientRect`, computed styles) — not visual guesswork. Screenshots and raw measurements below.

## Score: 64 / 100

This independently re-verifies (and partially overturns) the claim in `seo-audit/FULL-AUDIT-REPORT.md` that mobile tests passed perfectly (`horizontal_scroll: false`, `touch_targets_ok: true`, no overlapping elements). The "no page-level horizontal scrollbar" and "no overlapping elements" claims **hold up**. The "touch targets OK" and implied "mobile is fully polished" claims **do not hold up** — live measurement found undersized nav touch targets and, more importantly, a real CSS overflow/clipping bug on 2 of 3 pages that was not visible from a cursory look.

## What Works

- **No page-level horizontal scrollbar.** `document.documentElement.scrollWidth === clientWidth` (375px) on all 3 pages at mobile width — confirmed via live measurement, not just visual inspection. The old audit's claim on this specific point is accurate.
- **No overlapping elements detected** in the header/nav on any tested page (programmatic bounding-box collision check returned empty on all pages).
- **Desktop / laptop / tablet are excellent.** At 1920x1080, 1366x768, and 768x1024 the calculator form, live results panel, and primary CTA ("Calculer mon Net") are all visible without scrolling. All 6 nav items fit on one row with no crowding. No ads, no clutter — the calculator is the page.
- **Live/instant calculation.** Typing a value updates the result panel without a page reload or needing to click the button (confirmed: typing "3000" on the homepage updated the result to "2340.00 € Net" live; SMIC page ships pre-filled with the 2026 SMIC value and a live result already computed).
- **Primary action buttons are well-sized for touch** where they aren't clipped: "Calculer mon Net" / "Calculer en direct" (~350-463px x 53px), "Télécharger le PDF" and "Copier le lien" (x56px) all comfortably exceed the 48x48px touch-target guideline.
- Base font sizes are large and legible (headings 24-32px, body ~16-18px); no zoom-to-read issue.

## Findings

### 1. [HIGH] Primary CTA / result is below the fold on mobile on all 3 pages
The calculator's submit button ("Calculer mon Net" / "Calculer en direct") is **not visible in the initial 375x812 mobile viewport** on any of the 3 pages tested:

| Page | Button top (CSS px) | Viewport height | Visible? |
|---|---|---|---|
| Homepage | 830 | 812 | No — fully below fold |
| /auto-entrepreneur-brut-en-net/ | 776–829 | 812 | Partially — only top ~36px of button visible, most of it cut by the fold |
| /smic-brut-net/ | 932 | 812 | No — fully below fold (worst case: 2-line H1 + breadcrumb + longer subtitle push it further down) |

The first input field is visible above the fold on all 3 pages, so users can start typing without scrolling, and the results actually update live as you type — but the visible confirmation/result panel itself only appears after ~500px of additional scroll (result text measured at CSS top≈1313-1399px on a 812px-tall viewport), because on mobile the results column stacks *below* the entire form column (including an unused "Historique des calculs" block that sits between the button and the results).
**Evidence:** `screenshots/homepage/fresh_mobile.png`, `screenshots/smic-brut-net/fresh_mobile.png`, `screenshots/auto-entrepreneur-brut-en-net/fresh_mobile.png` (button/result positions measured programmatically, see raw data below).
**Recommendation:** On mobile, either move a compact live-result strip immediately under the salary input (so the number updates in view without scrolling), or move the "Historique des calculs" block to below the results so the CTA and result are reachable with less scrolling. Shortening the H1/subtitle wrapping on `/smic-brut-net/` (currently wraps to 2 lines) would also reclaim ~90px of vertical space.

### 2. [HIGH] Mobile CSS overflow bug clips buttons/cards on 2 of 3 pages (contradicts "no layout issues" claim)
On `/smic-brut-net/` and `/auto-entrepreneur-brut-en-net/`, the form/result card is rendered **wider than the 375px mobile viewport**, and the excess is silently clipped by `overflow-x: hidden` on `<html>`/`<body>` — so there's no visible scrollbar, but the visual result is buttons and result cards missing their right-side padding and rounded corners:
- `/auto-entrepreneur-brut-en-net/`: "Calculer en direct" button measured at `left:32, right:495` in a 375px viewport (120px overflow). Screenshot crop confirms the button's right edge and rounded corner are cut off flush with the screen edge.
- `/smic-brut-net/`: "Calculer mon Net" button measured at `x:0, width:387.5` (right edge at 387.5 vs 375px viewport, ~12.5px overflow) — button and the green results border-box both render with **zero left/right margin**, unlike the homepage where the same button correctly renders with side padding and rounded corners (`x:25, width:349.5`, right edge ≈374.5, i.e. correctly fits).
- Homepage does not exhibit this bug (button fits within 0.5px of the viewport edge).
- Root cause signature: `document.body.scrollWidth` exceeds `clientWidth` by 31px (homepage), 144px (auto-entrepreneur), 69px (SMIC) — the underlying content is wider than the viewport on all 3 pages, but it only becomes *visually* obvious on the two pages where a full-width card/button happens to sit at that overflowing edge.

This is a genuine, page-specific responsive CSS regression — not a rendering artifact — and it directly contradicts the prior self-generated audit's claim of zero mobile layout issues.
**Evidence:** `screenshots/auto-entrepreneur-brut-en-net/crop_button.png` (button visibly cut off flush with the right edge), `screenshots/smic-brut-net/button_scrolled_into_view.png` (button and result card render edge-to-edge, no rounded corners/margin, unlike homepage).
**Recommendation:** Audit the container CSS on the SMIC and Auto-Entrepreneur simulator templates for a fixed/min-width element (likely the results table or an inline dropdown option string like "Prestations de services Libérales BNC (25,6% - Taux 2026)" forcing its parent wider than `100%`) and constrain it with `max-width: 100%` / `box-sizing: border-box` consistent with the homepage template.

### 3. [MEDIUM] Mobile nav touch targets below recommended 44-48px minimum
Measured nav tab links (`Salaire Brut Net`, `Auto-Entrepreneur`, `TJM Freelance`, etc.) are **34-36px tall** on mobile across all 3 pages — below both Apple's 44px and Google's 48px minimum touch-target guidance. The breadcrumb "Accueil" link is even smaller at **18-20px tall**, a genuine tap-precision risk on a phone. This directly contradicts the old audit's `touch_targets_ok: true` claim.
**Evidence:** raw `getBoundingClientRect` measurements, e.g. homepage nav links: `height: 34-36`, breadcrumb "Accueil": `height: 18-20` (auto-entrepreneur/smic pages).
**Recommendation:** Increase vertical padding on `.nav-link` to reach ≥44px effective tap height; wrap the breadcrumb link in a larger tap area (padding) even if the visible text stays small.

### 4. [MEDIUM] Mobile nav hides 3 of 6 menu items behind an undiscoverable horizontal swipe
The mobile nav (`nav.nav-links`) uses `overflow-x: auto` as a horizontally-scrollable tab strip — this is a legitimate pattern and it **does work** (confirmed by scripting `scrollLeft` and confirming "Heures Sup" becomes reachable). However:
- No hamburger/menu-toggle button exists as an alternative.
- There is no scrollbar, gradient fade, or arrow icon signaling more items exist — the only affordance is a partially clipped word at the right edge (e.g. "TJM Fre…"), which is a weak, easy-to-miss discoverability cue.
- On the homepage, only 2 of 6 tabs are fully visible in the initial 375px width before the 3rd starts getting clipped; "Rupture Conv.", "Chômage ARE", and "Heures Sup" are entirely off-screen until the user swipes.

This is not "broken" (the footer duplicates all 10 tool links as a fallback, confirmed present), but it is a real mobile navigation/discoverability weakness that a cursory "nav renders fine" check would miss.
**Evidence:** `screenshots/homepage/nav_scroll_state0.png` (default view, only ~2.7 tabs visible) vs `screenshots/homepage/nav_scroll_state1.png` (after programmatic scroll, "Rupture Conv.", "Chômage ARE", "Heures Sup" become visible).
**Recommendation:** Add a subtle right-edge gradient/fade mask (`mask-image: linear-gradient(...)`) or a small chevron affordance to signal scrollability, and/or reduce to the 3-4 highest-traffic tools on mobile with a "Plus ▾" overflow menu for the rest.

### 5. [LOW] No above-the-fold layout shift observed
No cumulative layout shift was observed between initial paint and settled state in repeated captures (form fields, header, and hero render at stable positions run-to-run). Not a concern at this time, but not exhaustively verified via CDP performance traces — treat as a soft pass.

## Raw Measurement Summary (mobile 375x812)

| Page | body scrollWidth vs 375 | CTA button top/bottom vs 812 fold | Button right-edge overflow |
|---|---|---|---|
| Homepage | 406 (31px hidden overflow) | 830 / 883 → below fold | ~0px (fits) |
| Auto-Entrepreneur | 519 (144px hidden overflow) | 776 / 829 → straddles fold, mostly cut | ~120px (visibly clipped) |
| SMIC Brut-Net | 444 (69px hidden overflow) | 932 / 985 → below fold | ~12.5px (visibly clipped, no side margin) |

Screenshots captured this session: `screenshots/homepage/fresh_{desktop,mobile}.png`, `.../fresh_mobile_fullpage.png`, `screenshots/auto-entrepreneur-brut-en-net/fresh_{desktop,mobile}.png`, `screenshots/smic-brut-net/fresh_{desktop,mobile}.png`, plus diagnostic crops (`crop_button.png`, `button_scrolled_into_view.png`, `nav_scroll_state0/1.png`).

## JSON (for audit-data.json)

```json
{
  "category": "Visual",
  "score": 64,
  "max_score": 100,
  "pages_tested": [
    "https://monbrutnet.fr/",
    "https://monbrutnet.fr/auto-entrepreneur-brut-en-net/",
    "https://monbrutnet.fr/smic-brut-net/"
  ],
  "viewports_tested": ["375x812 (mobile)", "1920x1080 (desktop)", "1366x768 (laptop)", "768x1024 (tablet)"],
  "prior_claim_verification": {
    "claim_source": "seo-audit/FULL-AUDIT-REPORT.md",
    "horizontal_scroll_false": "CONFIRMED (no page-level scrollbar on any page)",
    "touch_targets_ok_true": "REFUTED (nav links 34-36px tall, breadcrumb link 18-20px tall; below 44-48px guideline)",
    "no_overlapping_elements": "CONFIRMED for nav/header; NOTE: separate non-overlap CSS overflow-clipping bug found on 2 pages"
  },
  "findings": [
    {
      "id": "visual-01",
      "severity": "high",
      "title": "Primary CTA / result panel below the fold on mobile (all 3 pages)",
      "pages": ["homepage", "auto-entrepreneur-brut-en-net", "smic-brut-net"],
      "evidence": "Button top measured at 830px/776px/932px in a 812px-tall mobile viewport; live result text measured ~1313-1399px top",
      "recommendation": "Move compact live-result display closer to the salary input; reorder 'Historique des calculs' below results; shorten H1/subtitle wrap on SMIC page"
    },
    {
      "id": "visual-02",
      "severity": "high",
      "title": "Mobile CSS overflow bug clips button/result-card edges on 2 of 3 pages",
      "pages": ["auto-entrepreneur-brut-en-net", "smic-brut-net"],
      "evidence": "Auto-Entrepreneur button right edge at 495px in 375px viewport (120px overflow, visibly clipped); SMIC button/result card render with x:0, no side margin/rounded corners (~12.5px overflow); body.scrollWidth exceeds viewport by 144px and 69px respectively",
      "recommendation": "Constrain the results table/dropdown-option-driven container with max-width:100%/box-sizing:border-box to match the homepage template"
    },
    {
      "id": "visual-03",
      "severity": "medium",
      "title": "Mobile nav touch targets below 44-48px minimum",
      "pages": ["homepage", "auto-entrepreneur-brut-en-net", "smic-brut-net"],
      "evidence": "nav-link height 34-36px; breadcrumb 'Accueil' link height 18-20px",
      "recommendation": "Increase vertical padding on nav-link and breadcrumb links to reach >=44px tap height"
    },
    {
      "id": "visual-04",
      "severity": "medium",
      "title": "Mobile nav hides 3 of 6 tabs behind undiscoverable horizontal swipe, no hamburger fallback",
      "pages": ["homepage", "auto-entrepreneur-brut-en-net", "smic-brut-net"],
      "evidence": "nav.nav-links has overflow-x:auto, clientWidth 343px vs scrollWidth 742px on homepage; only partial word-clipping as scroll affordance; footer duplicates links as fallback",
      "recommendation": "Add scroll-affordance gradient/chevron or collapse to top tools + 'Plus' overflow menu on mobile"
    },
    {
      "id": "visual-05",
      "severity": "low",
      "title": "No cumulative layout shift observed (soft pass, not exhaustively profiled)",
      "pages": ["homepage", "auto-entrepreneur-brut-en-net", "smic-brut-net"],
      "evidence": "Stable element positions across repeated captures",
      "recommendation": "None required now; consider a CDP-based CLS trace for full confidence"
    }
  ],
  "what_works": [
    "No page-level horizontal scrollbar on any tested page/viewport",
    "No overlapping elements detected in header/nav",
    "Desktop/laptop/tablet: calculator, live results, and CTA all visible above the fold with no ads or clutter",
    "Live/instant calculation as user types, no page reload required",
    "Primary action buttons (Calculer, Télécharger PDF, Copier le lien) meet touch-target size guidelines where not clipped",
    "Legible base font sizes (16-18px body, 24-32px headings)"
  ]
}
```
