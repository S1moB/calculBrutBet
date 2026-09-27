# Schema.org / Structured Data Audit — monbrutnet.fr

**Scope:** All 16 pages (homepage + 12 calculator pages + a-propos, mentions-legales, politique-de-confidentialite). Source read directly from local repo (`C:\Users\Mohammed\Documents\Ai+project\calculBrutBet`), one `<script type="application/ld+json">` block per page, each parsed programmatically with Python's `json` module (not eyeballed) and cross-checked against visible HTML.

**Independent Score: 80/100**

The prior self-audit (`seo-audit/FULL-AUDIT-REPORT.md`, line 19) claims **99/100** for "Données Structurées." That number is **not trustworthy for two reasons**: (1) it was generated *before* the FAQPage rollout (commit `98e4ead`) — the audit text only credits "WebApplication + WebSite + Breadcrumbs," it never even evaluates the FAQ blocks that are now on 13/16 pages; (2) independent parsing found two genuine schema quality defects (logo aspect ratio, `sameAs` misuse) and one entity-consistency issue that a syntax-only skim would miss. No JSON syntax errors were found, which is the main thing the old report got right.

---

## What Works

1. **100% valid JSON syntax.** All 16 pages parsed cleanly with `json.loads()` — no trailing commas, unescaped quotes, or malformed brackets.
2. **`@context` is `https://schema.org`** (HTTPS, correct) on every page.
3. **No deprecated types used.** No `HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, or `LearningVideo` anywhere.
4. **JSON-LD only** — no legacy Microdata (`itemscope`/`itemprop`) or RDFa (`vocab=`) found anywhere in the 16 files, so there's no duplicate/conflicting markup format to worry about.
5. **All URLs absolute**, all `item`/`url` values use `https://monbrutnet.fr/...`.
6. **`BreadcrumbList` is correctly implemented on 15/16 pages** (all except the homepage, which correctly omits it since it has no parent). Positions are sequential (`1, 2`), `name` + `item` present on every `ListItem`, no gaps.
7. **FAQ schema content genuinely matches visible content on every one of the 13 pages that use `FAQPage`.** I programmatically stripped HTML tags from each page body and confirmed every `Question.name` and `Answer.text` string appears verbatim in the rendered page (the one apparent mismatch, on `chomage-brut-en-net`, was a false positive caused by an inline `<strong>7 jours</strong>` tag splitting the substring — the tag-stripped text matches exactly). **This means the FAQ schema is not the "hidden/mismatched FAQ" pattern Google penalizes.** Good hygiene here.
8. **`WebApplication.applicationCategory` = `FinanceApplication`** consistently — this is a value from Google's accepted enum for Software App structured data, correctly used everywhere.
9. **No placeholder text** (no `[Business Name]`-style stubs) in any block.

---

## Findings

### Finding 1 — Severity: Info (not Critical/High)
**FAQPage schema on 13/16 pages delivers zero Google SERP benefit as of today.**
Google retired FAQ rich results for all sites on **May 7, 2026** (today is Sept 27, 2026 — this is settled, not speculative). The recent commit `98e4ead` ("add FAQPage schema") and the stale 99/100 audit score both implicitly treat this as an SEO win; it isn't one for classic SERP rich results. The markup itself is technically valid and matches on-page content (see Finding "What Works" #7), so there's no penalty risk — just no upside from the effort as a rich-result play. Any AI Overviews/LLM-citation benefit from `FAQPage` markup is unconfirmed.
**Recommendation:** No removal necessary (it's harmless and well-matched to content), but stop counting it as a rich-result/CTR feature in future audits and roadmaps. If genuine user Q&A ever gets added (not FAQ copy authored by the site), use `QAPage` instead.

### Finding 2 — Severity: Medium
**`Organization.logo` points to a non-square banner image, not a proper logo.**
Both places the Organization node is declared (homepage `index.html`, and `a-propos/index.html`'s `mainEntity`) use:
```json
"logo": "https://monbrutnet.fr/og-image.jpg"
```
`og-image.jpg` is **1193×630px** (a 1.89:1 landscape Open Graph share image) — verified directly by opening the file. Google's Logo structured-data guidance (used for Knowledge Panel / Search Console's Logo report) expects a **near-square image, minimum 112×112px**. A wide banner used as `logo` will typically be flagged or ignored by Google's automatic logo detection even though the JSON-LD itself is syntactically valid.

**Fix — create a dedicated square logo asset (e.g. 512×512px PNG at `/logo.png`) and update both declarations:**
```json
{
  "@type": "Organization",
  "@id": "https://monbrutnet.fr/#organization",
  "name": "monbrutnet.fr",
  "url": "https://monbrutnet.fr/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://monbrutnet.fr/logo.png",
    "width": 512,
    "height": 512
  },
  "description": "Portail indépendant de simulateurs de salaires brut en net et cotisations sociales en France en 2026.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@monbrutnet.fr",
    "contactType": "customer service"
  }
}
```

### Finding 3 — Severity: Medium
**Misuse of `sameAs` on `a-propos/index.html`.**
```json
"sameAs": [
  "https://www.urssaf.fr",
  "https://www.service-public.fr"
]
```
`sameAs` must point to pages that represent **the same entity** (monbrutnet.fr's own official profiles — Wikipedia, LinkedIn, X/Twitter, Facebook, Crunchbase, etc.), not to third-party government reference sites the content merely cites as sources. URSSAF and Service-Public.fr are unrelated organizations; linking them via `sameAs` is a semantic misuse that can confuse entity disambiguation in Google's Knowledge Graph, even though it's not a JSON syntax error.
**Recommendation:** Remove these two URLs from `sameAs`. Only populate `sameAs` once monbrutnet.fr has real owned profiles to reference (e.g., an official LinkedIn/X account). If none exist yet, omit the property entirely rather than filling it with unrelated citations — do not fabricate profiles that don't exist.

### Finding 4 — Severity: Low
**`Organization` entity (`@id: https://monbrutnet.fr/#organization`) is redeclared with inconsistent properties on two different pages.**
- `index.html` (homepage): `name, url, logo, description, contactPoint` — no `sameAs`.
- `a-propos/index.html`: `name, url, logo, sameAs` — no `description`, no `contactPoint`.

This is **not** a "duplicate @id causing a parser conflict" in the way the task description worried about — Google parses each page's JSON-LD independently and does not merge `@graph` nodes across separate page fetches by matching `@id` strings, so nothing breaks. But it is a real data-quality inconsistency: the "same" entity is described differently depending on which page Google happens to crawl, which undermines the reason to use a stable `@id` in the first place (consistent entity reconciliation).
**Recommendation:** Maintain one canonical, complete Organization block (name, url, logo as ImageObject, description, contactPoint, and — once real profiles exist — sameAs) and reuse the **identical** object everywhere the entity is declared, rather than a different subset per page.

### Finding 5 — Severity: Low
**Inconsistent `WebApplication` property depth between homepage and the 12 calculator pages.**
Homepage's `WebApplication` node includes `@id`, `description`, `browserRequirements`, `inLanguage`, and a `publisher` reference to the Organization `@id`. Every other calculator page's `WebApplication` node (`2000-brut-en-net`, `2500-brut-en-net`, `3000-brut-en-net`, `alternance-brut-en-net`, `auto-entrepreneur-brut-en-net`, `cadre-brut-en-net`, `chomage-brut-en-net`, `fonctionnaire-brut-en-net`, `heures-supplementaires-brut-net`, `rupture-conventionnelle-net`, `smic-brut-net`, `tjm-freelance-brut-en-net`) only has `name, url, applicationCategory, operatingSystem, offers` — no `description`, `inLanguage`, or `publisher` link back to the Organization. Not an error, but a missed opportunity for richer, more consistent entity data, and it means only the homepage's WebApplication node currently links back to `#organization`.
**Recommendation (example for one calculator page):**
```json
{
  "@type": "WebApplication",
  "name": "Calculateur 2 000 € Brut 2026",
  "url": "https://monbrutnet.fr/2000-brut-en-net/",
  "description": "Simulateur gratuit pour convertir 2 000 € brut en net en 2026 (cadre, non-cadre, primes, chômage).",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "inLanguage": "fr-FR",
  "publisher": { "@id": "https://monbrutnet.fr/#organization" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
}
```

### Finding 6 — Severity: Info
**No `aggregateRating` on any `WebApplication` node — correctly not fabricated.**
Google's Software App rich-result guidelines require `aggregateRating` for actual star-rating rich results; without it, the WebApplication markup remains valid but non-rich-result-eligible. No fake ratings were found anywhere in the markup, which is the correct call — fabricating `aggregateRating` values would violate Google's structured-data spam policies. **No action needed** unless/until genuine user ratings exist to report.

### Finding 7 — Severity: Info (confirms a non-issue, included for completeness per audit scope)
**No same-`@id` reuse conflict between different entity types was found.** The `#app` (`WebApplication`), `#organization` (`Organization`), and `#website` (`WebSite`) `@id`s are each used consistently with a matching `@type` everywhere they appear; `#webpage`/`#about` ids on the legal/about pages are page-scoped and unique per URL. The only cross-page inconsistency is the *property set* under the reused `#organization` id (Finding 4), not a type/identity conflict.

---

## Missing Opportunities (not added, no fabrication)

- **`Person`/author schema for EEAT:** `a-propos/index.html` (the About/methodology page, part of the recent EEAT push per commit `b854e5b`) does not name any real individual author, founder, or editor — it's written as an anonymous collective ("monbrutnet.fr est un service web..."). Per the "no placeholder text" rule, **do not** add a fabricated `Person`/`author` node. If a real named editor or subject-matter reviewer exists, add `author`/`reviewedBy` referencing them with genuine credentials; otherwise this is correctly left out.
- **`WebSite.potentialAction` (SearchAction / sitelinks search box):** not applicable — the site has no internal search feature to point a `SearchAction` at.

---

## Per-Page Detection Summary

| Page | Types Present | BreadcrumbList | FAQPage | FAQ content match |
|---|---|---|---|---|
| `/` | Organization, WebApplication, WebSite, FAQPage | — (correct, root) | Yes | Yes |
| `/2000-brut-en-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/2500-brut-en-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/3000-brut-en-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/alternance-brut-en-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/auto-entrepreneur-brut-en-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/cadre-brut-en-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/chomage-brut-en-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes (tag-stripped) |
| `/fonctionnaire-brut-en-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/heures-supplementaires-brut-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/rupture-conventionnelle-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/smic-brut-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/tjm-freelance-brut-en-net/` | BreadcrumbList, WebApplication, FAQPage | Yes | Yes | Yes |
| `/a-propos/` | BreadcrumbList, AboutPage (Organization as mainEntity) | Yes | No | n/a |
| `/mentions-legales/` | BreadcrumbList, WebPage (isPartOf WebSite) | Yes | No | n/a |
| `/politique-de-confidentialite/` | BreadcrumbList, WebPage | Yes | No | n/a |

---

## Score Breakdown

| Category | Score | Rationale |
|---|---|---|
| Syntax validity | 20/20 | 16/16 pages parse cleanly, no malformed JSON |
| Type/property correctness | 16/20 | Valid types throughout, but logo aspect ratio + `sameAs` misuse (Findings 2–3) |
| No deprecated/no-benefit types misrepresented | 14/20 | No deprecated types used, but FAQPage rollout provides no actual SERP benefit and was miscounted as a win in prior reporting (Finding 1) |
| Cross-page consistency | 12/20 | Entity (`#organization`) redeclared with different property sets; WebApplication depth inconsistent (Findings 4–5) |
| FAQ/content alignment | 18/20 | Verified match on all 13 pages — strong result |
| **Total** | **80/100** | |

This supersedes the `99/100` figure in `seo-audit/FULL-AUDIT-REPORT.md`, which predates the FAQPage rollout and did not independently parse/validate the JSON-LD.
