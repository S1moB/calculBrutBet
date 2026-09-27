# Performance / Core Web Vitals — monbrutnet.fr

**Audit date:** 2026-09-27
**Method:** Independent lab measurement with Lighthouse 13.5.0 CLI (mobile, simulated throttling: RTT 150ms, ~1.6Mbps, 4x CPU slowdown — Lighthouse's standard "Slow 4G"/Moto G-class profile), run against the **live** site (not the local source tree). No Google API credentials are configured in this environment, so **no CrUX field data (real-user 28-day 75th-percentile) could be retrieved** — every number below is single-run lab data. `crux_history.py`/PSI API were not usable; this is disclosed as a limitation, not glossed over.
**Pages tested:** `/` (home), `/auto-entrepreneur-brut-en-net/`, `/smic-brut-net/`
**Prior claim under review:** `seo-audit/FULL-AUDIT-REPORT.md` claims "95/100, CLS 0". I did not take this on trust — I re-ran Lighthouse independently. Verdict: **directionally correct**. Unlike some other categories in this audit, the performance claim holds up under independent re-measurement (see evidence below), though the exact score, methodology and lack of field-data caveat were not documented in the original claim.

## Performance Score: 93 / 100

| Page | Lighthouse Perf Score | LCP | CLS | TBT (INP proxy) | FCP | Speed Index | Page weight | Requests |
|---|---|---|---|---|---|---|---|---|
| `/` (home) | 99 | 1.2s | 0 | 0ms | 1.1s | 3.7s | 63 KB | 7 |
| `/auto-entrepreneur-brut-en-net/` | 100 | 1.2s | 0 | 0ms | 1.2s | 1.5s | 11 KB | 2 |
| `/smic-brut-net/` | 100 | 1.0s | 0 | 0ms | 1.0s | 1.0s | 53 KB | 6 |

### Core Web Vitals verdict (lab-estimated, all 3 pages)

| Metric | Result | Threshold | Status |
|---|---|---|---|
| LCP | 1.0s – 1.2s | ≤2.5s good | **PASS** (comfortably) |
| INP | Not directly measurable without real interaction traces; TBT 0ms + trivial main-thread work (0.4s breakdown, 0ms bootup-time) strongly implies INP well under 200ms | ≤200ms good | **Likely PASS**, unconfirmed by field data |
| CLS | 0 (independently confirmed on all 3 pages, not just taken from the prior report) | ≤0.1 good | **PASS** |

The 93/100 score (vs. the prior "95/100" claim) reflects genuinely excellent metrics, discounted for: (1) no field-data confirmation is possible, (2) a real Speed Index weakness on the content-heavy homepage under throttling, and (3) an architectural scaling risk (see F1) that isn't visible yet at the site's current small page count but will erode these numbers as content grows.

---

## What works

- **Zero external render-blocking resources.** All CSS and JS are inlined in `<head>`/`<body>` of each static HTML file (confirmed in `index.html`, `auto-entrepreneur-brut-en-net/index.html`, `smic-brut-net/index.html`). No stylesheet `<link>`, no synchronous `<script src>` for first paint. `render-blocking-resources` audit returns empty on all three pages.
- **No web fonts.** `font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (index.html:156) — zero font-load LCP/CLS risk, zero FOIT/FOUT.
- **No `<img>` tags anywhere on any tested page.** The only graphic (a € badge) is inline SVG. `og-image.jpg` (106 KB) is referenced only in `<meta property="og:image">` for social-card previews — it is never fetched by the browser when loading the page, so it does not affect LCP/CLS despite its size.
- **CLS is genuinely 0, not just claimed.** The calculator result card, table (`#detailsBody`), and history list (`#historyList`) are all present in the initial server-rendered HTML with placeholder values ("0.00 €"), and JS updates them via `textContent`/`innerHTML` replacement of already-sized nodes rather than inserting/removing elements. Verified in `index.html:601-635` and confirmed by 0.000 CLS in all three independent Lighthouse runs.
- **html2pdf.js is genuinely deferred**, confirmed in source: it's only injected via `document.createElement('script')` inside an async function triggered by the PDF button's `onclick` (index.html:1096-1119), with a guard (`if (window.html2pdf) return resolve()`), so it never loads on initial page view and cannot affect LCP/TBT.
- **Lightweight calculator logic.** The `calculate()` function (index.html ~940-1040) is plain arithmetic plus a handful of targeted `innerHTML`/`textContent` writes — no loops over large collections, no layout thrashing, no third-party analytics/ad scripts found on any tested page. `mainthread-work-breakdown` = 0.4s total, `bootup-time` = 0.0s.
- **Small DOM.** ~350 elements on the homepage (heaviest page tested), far below the 1,500-element INP risk threshold.
- **Reasonable TTFB.** Netlify-hosted; `server-response-time` audit: 130ms (home), 130ms (smic), 380ms (auto-entrepreneur, one-off — repeat `curl` checks from this location ranged 250-800ms due to normal network/edge variance, not a page-specific issue).
- **Proper caching headers for static assets** (`_headers`): favicons/png/jpg/ico get `Cache-Control: public, max-age=31536000, immutable`; discovery files (robots.txt, sitemap.xml, llms.txt) get a 1-day cache. This part of the recent caching-headers commit is correctly configured.

---

## Findings

### F1 — MEDIUM — Fully inlined CSS/JS duplicated on every page will not scale; no cross-page caching of the shared UI code
**Evidence:**
- `index.html` (56.5 KB), `auto-entrepreneur-brut-en-net/index.html` (42.3 KB) and `smic-brut-net/index.html` (51.7 KB) each carry their own full copy of the same `<style>` block and the same calculator `<script>` logic (`STATUTS` object, `calculate()`, `updateHistoryUI()`, etc. — byte-identical logic block appears in all three files at grep inspection).
- Because none of this is in an external `.css`/`.js` file, the browser cannot cache it once and reuse it when the user navigates between the 16 site pages (speculation-rules prerender/prefetch mitigates this for the handful of pages it targets, see F3, but does not solve it generally — repeat visits and organic navigation to un-prefetched pages re-download the full inline payload every time).
- Today this is invisible because pages are small (11-63 KB) and the score is 99-100 regardless. It is a forward-looking risk: as the site adds pages/content (already 16+ tool pages, per the sitemap referenced in `geo.md`), every KB added to the shared CSS/JS is multiplied across every page, and there is no mechanism to cache it once.
**Why it matters:** Not a current CWV failure, but it caps how far this architecture can scale before LCP/FCP on individual pages start to regress, and it forfeits an easy win (shared-asset caching) that a static site is otherwise well positioned to exploit.
**Recommendation:** Extract the shared `<style>` and the calculator `<script>` into versioned, cacheable static files (e.g. `/assets/calc.css`, `/assets/calc.js` with a long `max-age, immutable` header, already have the `_headers` pattern in place) served with `<link rel="preload">`/`<script defer>`. Keep only page-specific critical CSS inline if desired. This turns 16 duplicated ~40-50KB payloads into 1 cached shared payload + tiny per-page HTML.
**Effort:** 3-4h (build-step extraction + verifying no page-specific style leaks)

### F2 — LOW — Homepage Speed Index (3.7s) is the one metric that isn't excellent
**Evidence:** Lighthouse mobile simulated run: homepage Speed Index = 3.7s (audit score 0.85, the only non-1.0 audit on the homepage report), vs. 1.5s (auto-entrepreneur) and 1.0s (smic). The homepage has visibly more above-the-fold content (calculator form + results card + history list + full nav) than the two sub-pages tested, which under simulated slow-4G/4x-CPU throttling extends the time to visually complete the page.
**Why it matters:** Speed Index isn't one of the three official Core Web Vitals, but it's a proxy for perceived load speed on slow connections, which is a segment of the real French mobile user base CrUX would capture at the 75th percentile.
**Recommendation:** Low priority given the excellent LCP; if pursued, consider trimming/lazy-rendering below-the-fold homepage sections (e.g. the internal-linking cards grid, footer) so the first visual pass completes faster, or accept this as an acceptable trade-off for a content-rich homepage.
**Effort:** 1-2h

### F3 — LOW — Speculation Rules (prerender/prefetch) implemented inconsistently across pages
**Evidence:** `grep -c "speculationrules"` returns 1 for `index.html` and `smic-brut-net/index.html`, but **0** for `auto-entrepreneur-brut-en-net/index.html`. The two pages that do have it prefetch/prerender different, seemingly ad hoc sets of 5 URLs each (home lists `/smic-brut-net/`, `/auto-entrepreneur-brut-en-net/`, `/cadre-brut-en-net/`, `/2000-brut-en-net/`, `/tjm-freelance-brut-en-net/`; smic lists a different 4-page set). This explains the request-count difference observed (home: 7 requests due to 5 prefetches; smic: 6 requests due to 4 prefetches; auto-entrepreneur: only 2 requests, document + favicon, because it has no speculation rules block at all).
**Why it matters:** Not a CWV failure (prefetch/prerender happen in idle time and don't block the current page's metrics), but the inconsistency means the "instant navigation" UX benefit only applies to some entry points, and pages lacking it forfeit a free perceived-navigation-speed win.
**Recommendation:** Either template the speculation-rules block identically across all 16 pages (pointing to that page's own top related links, as home/smic already do), or drop it if it's not intentional. Low priority.
**Effort:** 30min (templating fix)

### F4 — INFORMATIONAL — Confirms prior "CLS 0" claim; corrects/qualifies the "95/100" framing
**Evidence:** See "What works" — CLS was independently re-measured at 0.000 on all 3 pages via fresh Lighthouse runs (not copied from `seo-audit/FULL-AUDIT-REPORT.md`), and Lighthouse performance scores of 99-100 were obtained independently. Unlike the GEO and other findings in this audit (`monbrutnet.fr-audit/findings/geo.md`), the earlier performance claim is **not** contradicted by rigorous re-testing.
**Caveat that the prior report should have carried but apparently didn't:** the score is lab-only (no CrUX/field data was or is available — the domain is new per `geo.md`'s "domain registered 2026-04-06" note, likely below CrUX's minimum traffic threshold), and Lighthouse 13.x's performance score is metric-based, not identical in weighting to pre-13.0 versions. "95/100, CLS 0" without disclosing lab-only methodology and Lighthouse version overstates certainty even though the underlying numbers turn out to be accurate.
**Recommendation:** No code change needed. When this claim is cited externally, qualify it as lab data (Lighthouse mobile, simulated throttling) pending real CrUX confirmation once the site accumulates enough Chrome UX Report traffic (typically requires meaningful mobile Chrome traffic over a 28-day window).
**Effort:** 0 (documentation/framing only)

---

## Prioritized recommendations (by expected impact)

1. **(Do when scaling content, not urgent now)** Extract shared CSS/JS to cached static files instead of inlining on every page — F1. Prevents future LCP/FCP regression as the site grows past its current 16 pages.
2. **(Low effort, low impact)** Template speculation rules consistently across all pages — F3.
3. **(Optional/cosmetic)** Trim above-the-fold homepage weight to improve Speed Index — F2.
4. **(No action)** Re-validate against CrUX field data once the domain has enough traffic; PSI/CrUX API access was not available in this environment (`crux_history.py`/`pagespeed_check.py` require Google API credentials not configured here).

## Raw evidence artifacts

Full Lighthouse JSON reports for this session are stored in the session scratchpad (not part of the repo):
`C:\Users\Mohammed\AppData\Local\Temp\claude\C--Users-Mohammed-Documents-Ai-project-calculBrutBet\9f2a48e5-a221-4e2f-b341-cdb699b1489f\scratchpad\lh\home.json`, `auto.json`, `smic.json` (Lighthouse 13.5.0, mobile, simulated throttling, run 2026-09-27).
