# GEO / AI Search Readiness — monbrutnet.fr

**Audit date:** 2026-09-27
**Scope:** 16 URLs in sitemap.xml (live site checked; after normalizing CRLF line endings it is byte-identical to the local repo at commit 98e4ead)
**Category:** AI Search Readiness

## GEO Readiness Score: 53 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 50 | 12.5 |
| Structural Readability | 20% | 70 | 14.0 |
| Multi-Modal Content | 15% | 35 | 5.3 |
| Authority & Brand Signals | 20% | 20 | 4.0 |
| Technical Accessibility | 20% | 88 | 17.6 |
| **Total** | | | **53** |

**On the prior self-audit (seo-audit/FULL-AUDIT-REPORT.md: "Visibilité IA 94/100", V3 97/100):** our checks don't support it. That score rewarded llms.txt richness and schema presence. It did not check whether the numbers are correct or consistent. It also didn't check authorship, dates or entity presence. Those are the signals that decide whether an LLM trusts and cites a finance page. The main SMIC figure is out of date, and pages contradict each other on the same values.

### Platform-specific scores (estimated)

| Platform | Score | Main limiter |
|---|---|---|
| Google AI Overviews | 45 | Stale SMIC contradicts service-public.gouv.fr; no dates; no author (YMYL) |
| ChatGPT Search | 40 | No entity presence (no Wikipedia, Wikidata, sameAs); domain registered 2026-04-06 |
| Perplexity | 50 | Good static HTML and tables, but figures conflict with the official sources Perplexity also retrieves |
| Bing Copilot | 45 | No dateModified or visible date; no IndexNow ping evidence beyond the key file |

---

## What works

- **Full static HTML (SSR-equivalent).** All 16 pages are pre-rendered. The default calculator result (such as "1 405.40 € Net avant impôt") is in the raw HTML, so crawlers that don't run JavaScript still see content. No SPA shell.
- **Open crawler access.** robots.txt is `User-agent: * / Allow: /`. Live requests with these user agents all return HTTP 200: OAI-SearchBot, PerplexityBot, Claude-SearchBot, ClaudeBot, GPTBot, CCBot and Bytespider. No WAF or bot blocking at the Netlify edge.
- **llms.txt is present and structurally spec-compliant.** It is served as `text/plain; charset=UTF-8` with a 1-day cache. It has an H1, a `>` blockquote summary, and H2 sections of `- [name](url): notes` link lists. The spec-compliance claim in commit 54aacad holds for the format, but not for the content (see F4).
- **Question-based H2s** on every tool page, for example "Quel est le montant officiel du SMIC Brut en Net en 2026 ?" and "Combien rapporte un salaire de 2 000 euros brut en net en 2026 ?". Each is followed by a direct answer paragraph.
- **HTML data tables** (brut to net conversion grids, cotisation breakdowns) are highly extractable for Perplexity and AIO.
- **Meta descriptions carry the numeric answer.** Example: 2000 page, "touchez 1 560 € net par mois en non-cadre (~22%) et 1 500 € en cadre (~25%)".
- FAQPage and WebApplication JSON-LD on all 13 tool pages. Outbound links to urssaf.fr, legifrance and similar sources.

---

## Findings

### F1 — CRITICAL — The main SMIC figure is out of date across the site and in llms.txt
**Evidence:**
- The site states: SMIC 2026 = **11,88 €/h, 1 801,80 € brut, ~1 405,40 € net**. This is in smic-brut-net/index.html (title, meta, H2 answer, table, FAQ, JSON-LD), index.html:702, 2000-brut-en-net/index.html:584, heures-supplementaires-brut-net/index.html:465, and llms.txt ("Données Clés 2026").
- The official source is service-public.gouv.fr/particuliers/vosdroits/F2300, "Vérifié le 01 juin 2026". It gives **Smic horaire 12,31 € brut / 9,74 € net; mensuel 1 867,02 € brut / 1 477,93 € net; annuel 22 404,20 €**.
- 11,88 € is the 2025 value. The site is at least one revaluation behind. There was a 1 Jan 2026 revaluation and apparently a mid-2026 one.
- Dependent figures are also wrong. The alternance threshold "79% du SMIC (soit 1 423,42 €)" on a-propos is 79% of 1 801,80. The SMIC part-time table, the Prime d'activité maths, and "(à comparer au SMIC horaire de 11,88 €)" all depend on the old value.

**Why it matters for GEO:** AI engines cross-check numeric claims against authoritative sources. A page whose headline fact contradicts service-public.gouv.fr will be skipped as a citation. If it is cited, it spreads a wrong figure on a YMYL topic. This single issue cancels most of the other citability work.

**Recommendation:** Update every SMIC value to 12,31 € / 1 867,02 € / 1 477,93 € (net per service-public), plus all derived values. Put the SMIC constants in one source that the build and the calculator JS both read. Add "SMIC en vigueur depuis le [date] (décret n° …)" beside the figure.
**Effort:** 2-3 h

### F2 — HIGH — Pages contradict each other on the same values
**Evidence:**
- **Fonctionnaire rate:** the status dropdown on every page says "Fonctionnaire (~11%)" (e.g. 2000-brut-en-net/index.html:439). The same pages' related tables/links say "~15%" (line ~747), and a-propos and llms.txt say 15%.
  - Home table: 2 000 € brut gives **1 780 €** net fonctionnaire.
  - The 2000 page gives **1 700 €** for the same case.
- **Micro-entreprise BNC rate:** the auto-entrepreneur page says "BNC (25,6% - Taux 2026)", while llms.txt says "24.6% (BNC libéral)". Check against URSSAF: the scheduled 2026 SSI BNC rate is believed to be 26,1%.
- **ARE fixed part:** the chomage page says "40,4% du SJR + 13,18 €", while llms.txt says "40.4% + 13.11€".
- **Calculator widget on the SMIC page:** it shows "Cotisations Sociales (~22%) − 396.40 €" plus a separate "CSG et CRDS (2.9%) − 52.25 €". The 396.40 already includes CSG/CRDS (51.34 € in the detail table). The lines don't add up to the displayed net.
- Micro CA ceilings are shown as 188 700 € / 77 700 € (the 2023-2025 values). Check whether the triennial revaluation applies for 2026.

**Recommendation:** Make one constants file the single source of truth for rates. Regenerate pages and llms.txt from it. Show the same rate everywhere (the real fonctionnaire deduction is closer to 15-17% once CSG and RAFP are counted). Fix the widget so CSG/CRDS is either a sub-line or excluded from the 22% line.
**Effort:** 3-4 h

### F3 — HIGH — No authorship, no dates, anonymous publisher (YMYL trust)
**Evidence:**
- No page has `author`, `datePublished`, `dateModified`, `<time>` or a visible "Mis à jour le …" (0/16 pages).
- The only date signal is sitemap `lastmod` 2026-09-20.
- The a-propos page mentions an "équipe éditoriale" but names no one.
- mentions-legales: "Directeur de la publication : Responsable de la publication monbrutnet.fr". No natural person or company is named, which is also an LCEN art. 6-III compliance risk.
- The Organization schema has no `sameAs`, `founder` or `address`, and its `logo` is the OG image.

**Recommendation:**
- Add a visible "Mis à jour le JJ/MM/AAAA — barèmes vérifiés sur urssaf.fr / service-public.gouv.fr" line under each H1.
- Add `dateModified` and `datePublished` to the WebApplication or WebPage JSON-LD.
- Name a responsible author or reviewer (Person schema with credentials if any) on a-propos and link it from each page.
- Put a real publisher identity in mentions-legales.
- Add `sameAs` once external profiles exist.

**Effort:** 2 h

### F4 — MEDIUM — llms.txt: format passes, content doesn't
**Evidence:**
- The format passes the llmstxt.org checks: H1, blockquote, H2 link lists.
- The content has these problems:
  1. Stale and inconsistent data (F1, F2) in the "Données Clés 2026" section. This is the section an LLM is most likely to quote.
  2. It links `https://www.service-public.fr/...`, which now 301-redirects to service-public.gouv.fr.
  3. The "Fonctionnalités" and "Données Clés" H2 sections are plain bullets, not file lists. The spec expects H2 sections to be link lists; put free text before the first H2.
  4. There is no `## Optional` section for the legal pages.
  5. There is no `/llms-full.txt` (404), which would let engines get the formulas and tables in one fetch.
  6. Page annotations say "~1 405 € net". Approximate "~" figures are weaker citations than exact ones with a date.

**Recommendation:**
- Move the key data and features into the intro block (before the first H2) as a dated "Barèmes en vigueur au JJ/MM/2026" list.
- Move the legal pages under `## Optional`.
- Update the gouv.fr URLs.
- Generate `llms-full.txt` with each page's answer paragraph and table as markdown.

**Effort:** 1-2 h

### F5 — MEDIUM — The answer is not in the first 40-60 words after the H1, and passages are short
**Evidence:**
- The first `<p>` after the H1 on every tool page is a promotional lead with no number. Examples:
  - smic: "Simulateur officiel du SMIC 2026 en France : découvrez votre rémunération nette exacte…"
  - 2000: "Vous négociez un salaire de 2 000 € brut par mois ? Découvrez exactement…"
- The quotable answer ("…perçoit 1 560 € net avant impôt…") only appears in the H2 section after the whole calculator widget. That is about 400+ lines of form markup into the DOM.
- Passage-length scan of 16 pages: longest paragraph 45-75 words; **0 paragraphs in the 134-167-word range** and 0 in the 80-133 range. Answers are split across 2 short paragraphs (definition, then number), so neither is fully self-contained.
- "Simulateur officiel" wording (smic page, llms.txt) implies government status. This is an accuracy risk that may lower trust.

**Recommendation:**
- Rewrite the lead `<p>` under each H1 as a 40-60-word definitive answer. Example: "En 2026, 2 000 € brut par mois correspondent à 1 560 € net pour un non-cadre (22 % de cotisations) et 1 500 € net pour un cadre, soit 18 720 € net par an (barèmes URSSAF au JJ/MM/2026)."
- Merge each H2's two paragraphs into one self-contained 130-160-word block that restates the subject, figure, date and source.
- Replace "officiel" with "conforme aux barèmes officiels".

**Effort:** 3-4 h across 13 pages

### F6 — MEDIUM — Almost no entity or brand footprint
**Evidence:**
- Domain registered **2026-04-06** (RDAP, AFNIC).
- fr.wikipedia search "monbrutnet": 0 hits. Wikidata: no entity.
- Reddit search: blocked (not verifiable). A web search via DuckDuckGo HTML returned no third-party results.
- No `sameAs`, and no YouTube, LinkedIn or X profiles referenced anywhere.
- YouTube mentions (~0.74 correlation) and Reddit presence are the strongest predictors of AI citation. Currently none.

**Recommendation:**
- Create a LinkedIn page and a YouTube channel (short videos such as "SMIC 2026 brut en net en 30 s" embed well and feed the strongest signal).
- Answer real questions on r/france, r/vosfinances and r/AskFrance with the tool where relevant, not spam.
- Seek mentions from HR/freelance blogs.
- Add all profiles to Organization `sameAs`.
- Wikidata only once independent coverage exists.

**Effort:** ongoing; 4 h setup

### F7 — LOW — Multi-modal content is thin
**Evidence:** 0 `<img>` on any page (inline SVG icons only). No charts, video or VideoObject. Tables are the only non-text content.
**Recommendation:** Add one explanatory chart per salary page (brut to cotisations to net waterfall) as an SVG or PNG with descriptive alt text and a caption that repeats the figures. Embed the YouTube explainers from F6.
**Effort:** 3 h

### F8 — LOW — Crawler policy is implicit only
**Evidence:**
- robots.txt only has a wildcard, so there is no explicit statement per search or training bot. Current state for each bot:
  - OAI-SearchBot (ChatGPT Search): allowed
  - Claude-SearchBot (Claude search): allowed
  - PerplexityBot: allowed
  - Googlebot (Search and AI Overviews): allowed
  - Bingbot (Copilot): allowed
  - Training-only bots (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended, cohere-ai): allowed
- No RSL 1.0 license declared.

**Recommendation:** No blocking change is needed for visibility. Optionally list the search bots explicitly with `Allow: /` for clarity. Decide deliberately whether to allow the training-only bots. Blocking them does not affect ChatGPT Search, Claude search, AI Overviews or Siri visibility. Optionally add an RSL `License:` directive.
**Effort:** 15 min

---

## Crawler access summary

| Bot | Governs | robots.txt | Live HTTP |
|---|---|---|---|
| OAI-SearchBot | ChatGPT Search | Allowed (wildcard) | 200 |
| Claude-SearchBot | Claude search | Allowed | 200 |
| PerplexityBot | Perplexity | Allowed | 200 |
| Googlebot | Google Search and AI Overviews | Allowed | n/t |
| GPTBot | OpenAI training | Allowed | 200 |
| ClaudeBot | Anthropic training | Allowed | 200 |
| Google-Extended | Gemini training and grounding | Allowed | n/a (token) |
| Applebot-Extended | Apple Intelligence training | Allowed | n/a (token) |
| CCBot | Common Crawl | Allowed | 200 |

(n/t = not tested; n/a = robots.txt control token only, not a fetching crawler.)

- llms.txt: **present**. Format valid; content stale and inconsistent.
- llms-full.txt: missing.
- RSL: missing.

## Top 5 highest-impact changes

1. Fix the SMIC values (12,31 € / 1 867,02 € / 1 477,93 €) and all derived figures sitewide and in llms.txt (F1). **2-3 h**
2. Build one source of truth for rates and remove the contradictions: fonctionnaire 11 vs 15 %, BNC 24,6 vs 25,6 %, ARE 13,11 vs 13,18 €, and the widget double-count (F2). **3-4 h**
3. Add a visible update date and `dateModified`, a named author or reviewer, and a real publisher identity (F3). **2 h**
4. Rewrite the lead paragraph under each H1 as a 40-60-word dated numeric answer, and merge the H2 answers into self-contained 130-160-word blocks (F5). **3-4 h**
5. Start building the entity footprint: YouTube shorts, LinkedIn, and genuine Reddit participation, with `sameAs` in the Organization schema (F6). **4 h setup, ongoing**

## Structured findings (audit-data.json: AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "score": 53,
  "prior_claimed_score": 94,
  "dimensions": {"citability": 50, "structural_readability": 70, "multimodal": 35, "authority_brand": 20, "technical_accessibility": 88},
  "platforms": {"google_aio": 45, "chatgpt": 40, "perplexity": 50, "bing_copilot": 45},
  "llms_txt": "present_format_valid_content_stale",
  "findings": [
    {"id": "F1", "severity": "critical", "title": "SMIC figures out of date (11,88 EUR / 1 801,80 EUR vs official 12,31 EUR / 1 867,02 EUR)", "effort_h": 3},
    {"id": "F2", "severity": "high", "title": "Contradictory rates across pages and llms.txt", "effort_h": 4},
    {"id": "F3", "severity": "high", "title": "No author, no dates, anonymous publisher", "effort_h": 2},
    {"id": "F4", "severity": "medium", "title": "llms.txt content stale, redirecting links, no llms-full.txt", "effort_h": 2},
    {"id": "F5", "severity": "medium", "title": "Answer not in lead paragraph; 0 passages in 134-167 words", "effort_h": 4},
    {"id": "F6", "severity": "medium", "title": "No Wikipedia/Wikidata/sameAs/YouTube/Reddit footprint; domain 6 months old", "effort_h": 4},
    {"id": "F7", "severity": "low", "title": "No images, charts or video", "effort_h": 3},
    {"id": "F8", "severity": "low", "title": "Implicit wildcard crawler policy; no RSL", "effort_h": 0.25}
  ]
}
```
