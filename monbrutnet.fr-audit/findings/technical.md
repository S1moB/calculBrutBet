# Technical SEO Audit — monbrutnet.fr

**Scope:** All 16 live pages (homepage + 12 calculator/salary pages + `/a-propos/`, `/mentions-legales/`, `/politique-de-confidentialite/`). Verified against both the live site (`https://monbrutnet.fr/`, fetched directly and via `render_page.py` / `sitemap_discovery.py`) and the Netlify static source at `C:\Users\Mohammed\Documents\Ai+project\calculBrutBet` (`robots.txt`, `sitemap.xml`, `_headers`, `_redirects`, `404.html`, and every page's `index.html`). Live HTTP responses were captured with `curl -D -` for the homepage, the apex/`www` variants, a trailing-slash redirect, a 404 URL, `robots.txt`, `sitemap.xml`, and `llms.txt`.

## Independent Technical Score: 90/100

**The prior self-audit's 98/100 "SEO Technique & Crawlabilité" claim (`seo-audit/FULL-AUDIT-REPORT.md`, line 20) is directionally correct but overstated and stale.** That report is dated Sept 19, 2026 and references "Sitemap 13 URLs" — the site has since grown to 16 pages/16 sitemap URLs, so the number it graded no longer exists. It also never checked IndexNow submission evidence, SRI/CSP on the third-party PDF script, or HSTS-header consistency across redirect hops — three real (if minor) gaps found below. That said, on the checks that matter most (valid sitemap, correct canonicals, working security headers, real 404 status code, no JS-rendering dependency), the live site independently verifies as genuinely strong. This is the one specialist area of this audit where the prior report's optimism is largely earned, not the inflated no-real-issues picture painted for schema/content/performance elsewhere in the repo.

---

## What Works

1. **Sitemap is valid and complete.** `sitemap_discovery.py` confirms `https://monbrutnet.fr/sitemap.xml` is declared in `robots.txt`, returns HTTP 200, and parses as a valid `urlset`. It contains exactly 16 `<url>` entries, one for every page in the current site (verified 1:1 against the page list) — no orphaned pages, no phantom URLs for pages that don't exist.
2. **robots.txt is permissive and correct.** `User-agent: *` / `Allow: /` with no accidental `Disallow`, plus a `Sitemap:` directive. Live `curl` fetch matches the source file byte-for-byte.
3. **Canonical tags present, unique, and self-referencing on all 16 pages.** Every `index.html` (checked via `grep` across the whole tree) has exactly one `<link rel="canonical">` pointing to its own trailing-slash HTTPS URL. No cross-page canonical collisions, no missing canonicals.
4. **No accidental `noindex`.** Zero `<meta name="robots">` tags found on any of the 16 indexable pages. The only `noindex` tag in the entire codebase is the correct one on `404.html` (`noindex, follow`).
5. **404 handling returns a real HTTP 404, not a soft 404.** Live test on a nonexistent URL (`/this-page-does-not-exist-xyz`) returns `HTTP/1.1 404 Not Found` from Netlify with a full security-header set, and serves a useful `404.html` with working internal links back to all tools (not just the homepage).
6. **HTTPS is fully enforced with no redirect loops.** `http://monbrutnet.fr/` → 301 → `https://monbrutnet.fr/`. `https://www.monbrutnet.fr/` → 301 → `https://monbrutnet.fr/`. Both are single-hop (no chains), defined cleanly in `_redirects` with the `301!` force flag.
7. **Strong baseline security headers, live-verified (not just declared).** `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy: geolocation=(), microphone=(), camera=()` are all present on the actual live response headers for `/`, matching `_headers` exactly.
8. **Clean, static, descriptive URL structure.** All 16 URLs are lowercase, hyphenated, human-readable, trailing-slash-consistent, and free of query strings, session IDs, or file extensions (`/auto-entrepreneur-brut-en-net/`, `/rupture-conventionnelle-net/`, etc.). Non-trailing-slash requests (`/smic-brut-net`) correctly 301 to the canonical trailing-slash form in one hop.
9. **Mobile viewport configured correctly on every page.** `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present on all 16 pages plus `404.html` (verified with `grep -L`, zero pages missing it). Touch targets (buttons, inputs) use `padding: 0.85rem–1rem` (~48px+ tap height), consistent with mobile usability guidance.
10. **Content is fully present in raw static HTML — no JS-rendering dependency for SEO.** `render_page.py --mode auto` on the homepage returns `is_spa: false` and used a raw (non-Playwright) fetch, with 6,090 characters of extracted text. All headings, the comparison table, FAQ text, and internal links are static HTML; only the live calculator *output* (which updates on input) requires JS — the crawlable SEO content does not. This confirms the site is genuinely pre-rendered, not a client-side-rendered app pretending to be one.
11. **JSON-LD structured data is present on all 16 pages** (syntax/quality validated separately in `findings/schema.md` — not duplicated here).
12. **IndexNow key file is correctly hosted.** `https://monbrutnet.fr/24c94f00d8324e93bb8517e65fbe4bf0.txt` returns HTTP 200 with the key as its exact plaintext body, matching IndexNow's required key-file format.
13. **Compression and caching are correctly configured.** Live responses show `Content-Encoding: br` (Brotli) and appropriate `Cache-Control` immutability rules for static assets (`/favicon*`, `/*.png`, `/*.ico`) and shorter revalidation windows for `robots.txt`/`sitemap.xml`/`llms.txt`, matching the `_headers` file.
14. **No render-blocking CWV red flags from source inspection.** CSS is inlined in `<head>` (no blocking external stylesheet request), the calculator/PDF JavaScript sits at the end of `<body>`, and the only third-party script (`html2pdf.js`) is lazy-loaded on button click rather than on page load — reducing LCP/INP risk from third-party JS. `speculationrules` prerendering is configured for the top 5 internal destinations, which should help perceived navigation speed. (Full CWV field-data assessment is out of scope here — see `findings/performance.md`.)

---

## Findings

### Finding 1 — Severity: Medium
**IndexNow key file exists but there is no evidence of an active IndexNow *submission* mechanism.**
Hosting the key file at `/24c94f00d8324e93bb8517e65fbe4bf0.txt` only satisfies the *verification* half of the IndexNow protocol. A repo-wide search found no GitHub Actions workflow, Netlify build hook, or any script that actually calls the IndexNow API (`https://api.indexnow.org/indexnow` or the Bing/Yandex endpoints) when a page is published or updated — there is no `.github/workflows/`, no `netlify.toml` build-hook wiring, and no reference to the `indexnow_submit.py`-style call anywhere in the source. This matches the independent GEO audit's observation (`findings/geo.md`, row "Bing Copilot": *"no IndexNow ping evidence beyond the key file"*). Without active pings, Bing/Yandex/Naver only discover updates on their normal crawl schedule — the key file alone provides no indexing speed benefit.
**Recommendation:** Add a lightweight submission step to the deploy pipeline (a Netlify build plugin, a post-deploy GitHub Action, or a manual/scripted call to `"$HOME/.claude/skills/seo/scripts/claude-seo" run indexnow_submit.py`) that POSTs the 16 URLs to `api.indexnow.org` whenever content changes (e.g., the next SMIC-figure correction the content team ships). This is especially valuable given the site currently has stale 2026 figures that will need re-submission once corrected.

### Finding 2 — Severity: Medium
**No Content-Security-Policy header, and the PDF-export script is loaded from a third-party CDN with no Subresource Integrity (SRI) hash.**
`genPdf()` in `index.html` (and presumably every calculator page) dynamically injects `<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js">` with no `integrity` attribute and no `crossorigin` attribute. `_headers` sets HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`, but no `Content-Security-Policy` at all. Without a CSP `script-src` allowlist or SRI, if `cdnjs.cloudflare.com` or that specific file were ever compromised (supply-chain attack), the injected script would execute on `monbrutnet.fr` with no browser-side integrity check. This is triggered only on user click (not page load), which limits blast radius, but it's still a live gap on a finance-adjacent site handling salary figures.
**Recommendation:** Add an `integrity="sha384-..."` + `crossorigin="anonymous"` attribute to the dynamically created `<script>` tag (compute the hash for the pinned `0.10.1` version), and add a baseline CSP header in `_headers`, e.g. `Content-Security-Policy: default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'none'; base-uri 'self'`. Test carefully against the inline `<style>`/`<script>` blocks (currently unhashed) before enforcing.

### Finding 3 — Severity: Low
**HSTS header is inconsistent between the 200 response and the 301 redirect hops.**
The live `200` response for `/` returns the full `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` (matching `_headers`). But the `http://` → `https://` and the bare `/smic-brut-net` → `/smic-brut-net/` redirect responses return only a partial `Strict-Transport-Security: max-age=31536000` (missing `includeSubDomains; preload`) — this comes from Netlify's platform-level default HSTS injection on redirect responses, not from `_headers` (which only applies to terminal 200/404 responses). Low practical risk since the header is present either way and browsers only need to see it once per HSTS cache window, but it's a real inconsistency between declared and delivered security posture.
**Recommendation:** No urgent action; if strict header-parity auditing tools (e.g. Mozilla Observatory) flag this, it's a Netlify platform limitation rather than something fixable purely in `_headers`. Verify Netlify's current documentation on whether redirect-level HSTS injection is now configurable, and mention it isn't a blocker if not.

### Finding 4 — Severity: Low
**All 16 sitemap `<lastmod>` values are identical (`2026-09-20`), even for pages with clearly different real edit histories.**
`mentions-legales/`, `politique-de-confidentialite/`, and the SMIC/salary calculator pages are extremely unlikely to have been edited at the exact same instant, yet the sitemap reports a uniform date for every URL. This isn't invalid XML and doesn't break crawling, but a uniform `lastmod` across an entire sitemap is a weak/uninformative freshness signal to search engines (some crawlers deprioritize `lastmod` entirely when it looks templated like this) and will need care going forward — the content team's upcoming SMIC/PASS figure corrections should be reflected with distinct `lastmod` bumps only on the pages actually changed, not a blanket re-stamp of all 16.
**Recommendation:** Generate `lastmod` from actual file modification time (e.g., `git log -1 --format=%cI -- <page>`) in whatever script regenerates `sitemap.xml`, rather than a single build-time timestamp applied to every entry.

### Finding 5 — Severity: Info
**Duplicate-content risk from the templated amount-based pages is structurally contained, not a crawlability/indexability problem.**
`/2000-brut-en-net/`, `/2500-brut-en-net/`, `/3000-brut-en-net/` (and by extension the status-based pages `smic-brut-net/`, `cadre-brut-en-net/`, `fonctionnaire-brut-en-net/`, `alternance-brut-en-net/`) share near-identical structure and word counts (~1,260–1,275 words each, boilerplate nav/footer included) with only the numeric substitutions, unique `<title>`, and unique `<meta name="description">` differing meaningfully. From a pure technical-indexability standpoint this is **not a problem**: canonicals are unique and self-referencing (no canonical pointing to a "master" page), so Google will index each as its own URL rather than collapsing them — there is no canonicalization conflict. The deeper editorial thin-content/duplication risk (percentage of unique vs. boilerplate text, ranking cannibalization) is content strategy, not crawlability, and is already covered by `findings/content.md`. Flagging here only so the technical and content reviews aren't read as contradicting each other: technically indexable and non-conflicting; editorially thin — both true at once.
**Recommendation:** None required from a technical/indexability angle. Any action here (increasing unique-content ratio per amount page, merging some into the main calculator via anchors) belongs to the content workstream.

### Finding 6 — Severity: Info
**Query-string share links (`?brut=2500&statut=cadre`) are not addressed by `robots.txt`, but this is a non-issue because the canonical tag already neutralizes it.**
`copyShareLink()` and `window.history.replaceState()` produce shareable URLs like `/?brut=2500&statut=cadre&taux=5`. These are never disallowed in `robots.txt`, so a crawler that discovers one via an external backlink could technically crawl it. In practice this is already handled correctly: the `<link rel="canonical">` tag is static HTML (not JS-rewritten to reflect query params), so every parameterized variant of a page still canonicalizes to the clean base URL. No duplicate-content risk exists in practice.
**Recommendation:** No action needed. Optional hardening only: a `Disallow: /*?*` line in `robots.txt` would save marginal crawl budget on a site this size, but given canonicals already resolve the substantive risk, this is a nice-to-have, not a fix.

---

## Category Pass/Fail Summary

| Category | Status | Notes |
|---|---|---|
| Crawlability (robots.txt, sitemap, noindex) | Pass | robots.txt correct; sitemap valid, complete, 16/16 URLs; no accidental noindex |
| Indexability (canonicals, duplicates, thin content) | Pass | Unique self-referencing canonicals on all 16 pages; templated-page duplication risk is editorial (see content.md), not a canonicalization conflict |
| Security (HTTPS, headers) | Pass with gaps | HSTS/X-Frame-Options/X-Content-Type-Options/Referrer-Policy/Permissions-Policy all live-verified; missing CSP and SRI on third-party PDF script (Finding 2); minor HSTS inconsistency on redirects (Finding 3) |
| URL Structure | Pass | Clean, descriptive, hyphenated, trailing-slash consistent, single-hop redirects, no parameters in canonical structure |
| Mobile (viewport, touch targets) | Pass | Viewport meta on all 16 pages + 404; adequately sized touch targets |
| Core Web Vitals (source-level risk) | Pass (light check) | No render-blocking external CSS/JS on load; third-party script lazy-loaded on click; prerendering configured. Full field-data CWV assessment out of scope — see performance.md |
| Structured Data (detection only) | Pass | JSON-LD present on all 16 pages; syntax/quality validated separately in schema.md |
| JavaScript Rendering (CSR vs SSR) | Pass | Confirmed `is_spa: false`, raw-fetch mode sufficient; all SEO-relevant content is static HTML, only live calculator output needs JS |
| 404 Handling | Pass | Real HTTP 404 status, useful custom page, noindex,follow correctly set |
| IndexNow Protocol | Fail (partial) | Key file hosted correctly, but no active submission mechanism found (Finding 1) |

---

## Structured findings (audit-data.json, category "Technical SEO")

```json
{
  "category": "Technical SEO",
  "score": 90,
  "score_label": "Technical Score",
  "pages_covered": 16,
  "sitemap_urls_declared": 16,
  "sitemap_urls_valid": true,
  "findings": [
    {"id": "TECH-01", "severity": "medium", "title": "IndexNow key file hosted but no active submission/ping automation found (no CI, no build hook)", "pages": ["/24c94f00d8324e93bb8517e65fbe4bf0.txt", "site-wide"]},
    {"id": "TECH-02", "severity": "medium", "title": "No Content-Security-Policy header; html2pdf.js loaded from cdnjs.cloudflare.com with no SRI/integrity hash", "pages": ["all calculator pages using genPdf()"]},
    {"id": "TECH-03", "severity": "low", "title": "HSTS header on 301 redirect hops (http->https, non-slash->slash) omits includeSubDomains/preload present on 200 responses", "pages": ["site-wide (redirect layer)"]},
    {"id": "TECH-04", "severity": "low", "title": "sitemap.xml lastmod is identical (2026-09-20) across all 16 URLs regardless of actual edit history", "pages": ["sitemap.xml"]},
    {"id": "TECH-05", "severity": "info", "title": "Templated amount/status pages share ~1,260-1,275 words of largely boilerplate structure; not a canonicalization conflict (unique self-referencing canonicals confirmed) but an editorial thin-content pattern tracked in content.md", "pages": ["/2000-brut-en-net/", "/2500-brut-en-net/", "/3000-brut-en-net/", "/smic-brut-net/", "/cadre-brut-en-net/", "/fonctionnaire-brut-en-net/", "/alternance-brut-en-net/"]},
    {"id": "TECH-06", "severity": "info", "title": "Query-string share URLs (?brut=&statut=) not disallowed in robots.txt, but neutralized by static self-referencing canonical tags", "pages": ["/"]}
  ],
  "verified_passes": [
    "sitemap.xml valid urlset, 16/16 pages present, declared correctly in robots.txt",
    "robots.txt permissive with no accidental disallow",
    "unique self-referencing canonical on all 16 pages",
    "zero accidental noindex on indexable pages; correct noindex,follow on 404.html",
    "real HTTP 404 status code with useful custom 404 page",
    "HTTPS fully enforced, http-> https and www -> apex both single-hop 301s",
    "live security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) match _headers file",
    "clean hyphenated lowercase URL structure, no query params in canonical URLs",
    "viewport meta present on all 16 pages + 404.html",
    "confirmed is_spa:false and raw-fetch sufficiency via render_page.py; SEO content is static HTML, not JS-dependent",
    "JSON-LD structured data present on all 16 pages (quality graded separately in schema.md)",
    "IndexNow key file correctly hosted and returns 200 with matching plaintext body",
    "Brotli compression and correct immutable caching on static assets live-verified"
  ],
  "note_on_prior_audit": "seo-audit/FULL-AUDIT-REPORT.md claims 98/100 for 'SEO Technique & Crawlabilite' (line 20) based on a 13-URL sitemap that no longer matches the current 16-page/16-URL site. Re-verification confirms most of its underlying technical claims hold up (valid sitemap, working headers, real 404s, no JS-rendering dependency), but it did not check IndexNow submission evidence, CSP/SRI, or HSTS consistency on redirects, and its cited URL count is stale."
}
```
