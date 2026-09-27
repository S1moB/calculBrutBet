# SXO Findings: monbrutnet.fr

**Category:** Search Experience (SXO)
**Audit date:** 2026-09-27
**Scope:** `/`, `/smic-brut-net/`, `/auto-entrepreneur-brut-en-net/`, `/tjm-freelance-brut-en-net/`, `/rupture-conventionnelle-net/` (plus a quick check of `/chomage-brut-en-net/` and `/heures-supplementaires-brut-net/`)
**Method:** Live render of `/` via `render_page.py --mode auto` (static HTML, `is_spa: false`, live content identical to the local repo), static read of the local source for all pages, WebSearch SERP samples for 7 query clusters (about 60 organic results classified).

---

## SXO Gap Score: 51 / 100 (site average)

> This SXO Gap Score is separate from the SEO Health Score. It measures how well each page matches what Google currently rewards for its query, not whether the page is technically sound.

| Page | Target query | Type | Depth | UX | Schema | Media | Authority | Freshness | **Total** |
|---|---|---|---|---|---|---|---|---|---|
| `/` | salaire brut en net / calcul brut net | 13 | 9 | 10 | 11 | 5 | 3 | 3 | **54** |
| `/smic-brut-net/` | SMIC brut net 2026 | 12 | 7 | 10 | 9 | 4 | 3 | 0 | **45** |
| `/auto-entrepreneur-brut-en-net/` | auto-entrepreneur brut en net | 13 | 10 | 11 | 10 | 4 | 3 | 3 | **54** |
| `/tjm-freelance-brut-en-net/` | TJM freelance brut net | 9 | 10 | 11 | 10 | 4 | 2 | 5 | **51** |
| `/rupture-conventionnelle-net/` | indemnité rupture conventionnelle net | 13 | 9 | 11 | 10 | 4 | 3 | 2 | **52** |

Max per column: Type 15, Depth 15, UX 15, Schema 15, Media 15, Authority 15, Freshness 10.

**Main finding:** page types mostly match what ranks (calculator plus guide hybrids). The pages will struggle for three other reasons, listed by impact:
1. **Out-of-date 2026 figures on a YMYL topic.** The SMIC, PASS, rupture-conventionnelle employer contribution, ACRE and micro thresholds all use 2025 or earlier values, while the SERP shows June 2026 figures.
2. **Anonymous publisher on a new domain** competing against URSSAF, info.gouv.fr, service-public.fr, law firms and fintech brands (Dougs, Indy, Qonto, L-Expert-Comptable).
3. **Brand collision:** a near-identical domain, `monbrutennet.fr`, already ranks for the head term.

---

## What works

- **Page type matches the SERP for 4 of 5 clusters.** The top 10 for "salaire brut en net", "auto-entrepreneur brut en net", "rupture conventionnelle simulateur" and "chômage ARE calcul" is 80-90% interactive calculators. Every monbrutnet page puts a working calculator above the fold, followed by explanatory content.
- **Calculators are prefilled** on AE (3 000 € CA), TJM (450 €/j, 250 € frais), rupture (2 800 €, 4 ans) and SMIC. Users see a result right away instead of an empty form (the homepage is the exception, see F-07).
- **Useful features:** PDF export, share-by-URL, history, PAS (prélèvement à la source) rate, 13e mois, part-time. These match the "calcul instantané / gratuit / sans inscription" promise that appears in almost every competitor title.
- **Good answer tables:** SMIC brut/net by period and part-time, rupture indemnity by seniority and salary, TJM-to-cadre-salary equivalence, and a TJM 500 € status comparison. These target snippets and help AI Overview extraction.
- **Consistent schema:** WebApplication + FAQPage + BreadcrumbList on every tool page, and Organization + WebSite on the homepage.
- **Clean tech base:** static HTML, no SPA risk, HSTS and security headers, fast Netlify edge. Nothing technical stops ranking.

---

## SERP-backwards analysis (what Google rewards today)

| Cluster | Dominant page type in top 10 | Consensus | Notable competitors | Government presence | monbrutnet type | Mismatch |
|---|---|---|---|---|---|---|
| salaire brut en net / calcul brut net | Calculator plus amount grid | ~90% tool | salerya.fr, hellowork.com (programmatic `brut_mensuel-XXXX` pages), calcul-salaire-net.fr, **monbrutennet.fr**, fiche-paie.fr, bulletin-paie.com, financepeople.fr | mon-entreprise.urssaf.fr ("convertisseur Urssaf", RGDU 2026) | Tool plus guide | ALIGNED |
| SMIC brut net 2026 | News/reference article with the definitive figure, then tool hybrids | ~65% article, ~35% tool | toutsurmesfinances, legisocial, staffmatch, superindep, justijob, calcul-salaire-brut-en-net.fr | **info.gouv.fr** ("Le SMIC revalorisé le 1er juin 2026") | Tool plus guide | MEDIUM on type; content is **wrong** (see F-01) |
| auto-entrepreneur brut en net | Calculator | ~85% tool | leblogdudirigeant, l-expert-comptable.com, netenpoche, outilis, simulateur-autoentrepreneur.com | **mon-entreprise.urssaf.fr/simulateurs/auto-entrepreneur** | Tool plus guide | ALIGNED |
| TJM freelance brut net | Long-form guide with embedded simulator, from fintech/accounting/portage brands | ~70% guide, ~30% tool | dougs.fr, indy.fr, qonto.com, swapn.fr, regie-portage.fr, swim.legal, tjmetre.fr | None (brand authority instead) | Tool-first, guide second | **MEDIUM** |
| rupture conventionnelle net | Dedicated simulator (law-firm and exact-match domains) | ~90% tool | obbo-avocats.com, swapn.fr, indemnite-rupture.fr, simulons.fr, actav.fr, rupture-conv.fr | service-public.fr usually present | Tool plus guide | ALIGNED on type; content stale |
| chômage ARE calcul | Calculator | ~100% tool | moicombien, boncalcul, lescalculateurs, simulateurfinance, netsalaire | francetravail.fr | Tool plus guide | ALIGNED |

**SERP features seen:** AI-generated answer summaries on every query, which pull definitive numbers (for example "SMIC brut 1 867,02 € depuis le 1er juin 2026", "ACRE 25% à compter du 1er juillet 2026", "contribution patronale de 40% au 1er janvier 2026", "PASS 48 060 €"). Many results include "2026" plus "gratuit / instantané" in the title. Programmatic amount pages (Hellowork `brut_mensuel-2026.html`) rank for long-tail amount queries.

**What Google rewards here:** (a) the correct current-year figure stated in the first lines, (b) a calculator that updates live, (c) signs that someone accountable maintains the figures (government, accountant, lawyer, known brand), and (d) coverage of edge cases (convention collective, supra-légale, reverse calculation, status comparison).

---

## Findings

### F-01. Out-of-date core figures on every high-intent page (CRITICAL)
**Evidence:**
- `/smic-brut-net/`, `/`, `/alternance-…`, `/cadre-…`, `/2000-…`, `/2500-…`, `/3000-…`, `/heures-supplementaires-…` and `llms.txt` all say the SMIC is **11,88 €/h and 1 801,80 € brut "au 1er janvier 2026"**. The SERP (info.gouv.fr, legisocial, toutsurmesfinances) shows **1 823,03 € from 1 Jan 2026** and **12,31 €/h, 1 867,02 € brut (about 1 478 € net) from 1 June 2026**. The site shows the 2024-2025 SMIC and labels it "2026", 22 times across the site.
- `/rupture-conventionnelle-net/`: "PASS 2026 fixé à ~47 136 €" and "contribution patronale unique de 30%". The SERP (actav.fr) states **PASS 2026 = 48 060 €** and a **40% employer contribution from 1 Jan 2026**. The employer-cost output is therefore wrong.
- `/auto-entrepreneur-brut-en-net/`: "ACRE -50% la 1ère année" with no date condition. The SERP states **ACRE is 25% for businesses created from 1 July 2026**. The micro caps (188 700 / 77 700 €) and VAT franchise (36 800 / 91 900 €) look like pre-2025/2026 values (to verify against URSSAF and impots.gouv).
- Internal contradiction: `llms.txt` gives BNC at **24.6%**, the AE page at **25.6%**. On the homepage, the fonctionnaire rate is "~15%" in the selector and "~11%" in the comparison table.

**Why it blocks ranking:** salary, tax and severance are YMYL topics. Google's AI summaries and top results show the June 2026 SMIC, so a page that says "SMIC 2026 = 1 801,80 €" contradicts the consensus. That is a strong low-quality signal, and it also causes pogo-sticking because users see the right number elsewhere. The "SMIC brut net 2026" query is lost until this is fixed.

**Recommendation:**
1. Move all regulatory constants (SMIC hourly and monthly, PASS/PMSS, micro rates, ACRE rate and date rule, VAT and micro caps, rupture contribution, ARE fixed part) into one shared JS/JSON config used by every page and `llms.txt`.
2. Update the SMIC to 12,31 € / 1 867,02 € (1 June 2026) and add a short history table (1 Jan 2026: 12,02 € / 1 823,03 €; 1 June 2026: 12,31 € / 1 867,02 €). That table is exactly what the SERP's article-type results rank with.
3. Rupture: 40% employer contribution, PASS 48 060 €, exemption cap 2 × PASS = 96 120 €.
4. ACRE: add a creation-date input (before or after 1 July 2026 gives 50% or 25%).
5. Show a visible "Barèmes vérifiés le JJ/MM/AAAA – source : [lien]" line under each calculator.

### F-02. Anonymous publisher: no accountable expert on YMYL pages (CRITICAL)
**Evidence:** `/mentions-legales/` names the publisher as "Équipe éditoriale monbrutnet.fr" and the Directeur de la publication as "Responsable de la publication monbrutnet.fr". No natural person or legal entity is named, which also falls short of the LCEN requirement for identifying the publisher. `/a-propos/` has no named author, credentials or reviewer. No page has `author`, `reviewedBy`, `dateModified` or `datePublished`, either in schema or visibly. The competitors on these SERPs are URSSAF, info.gouv.fr, service-public.fr, a law firm (OBBO Avocats), chartered accountants (L-Expert-Comptable), fintech brands (Dougs, Indy, Qonto) and HR media (LégiSocial, Hellowork).

**Why it blocks ranking:** with a technically clean page, trust is what decides the ranking. An anonymous one-month-old domain with no backlinks is outranked by near-identical calculators on established brands. The anonymous "Équipe éditoriale" signals low trust to quality raters.

**Recommendation:** name a real editor. Better still, get a reviewer with credentials, such as a payroll manager, expert-comptable or employment lawyer, and show a "Vérifié par X, [titre]" block with the review date on every calculator. Add `Person` schema for the author/reviewer, `dateModified` in WebApplication/WebPage, and a real legal entity in the mentions légales. Run `/seo content` for a full E-E-A-T review.

### F-03. Brand collision with `monbrutennet.fr` (HIGH)
**Evidence:** `https://www.monbrutennet.fr/` ("Mon Salaire Brut en Net — Calculateur France 2026") ranks in the top 10 for both "salaire brut en net calcul 2026" and "calcul brut net simulateur officiel". monbrutnet.fr and monbrutennet.fr differ by two letters.

**Why it matters:** brand and navigational searches, word-of-mouth visits and any future links may go to the competitor. Google may also struggle to tell the two entities apart, which weakens the brand signals a new site depends on.

**Recommendation:** use a distinctive brand name in titles, the logo and Organization schema (for example "MonBrutNet" as a single word plus a tagline). Buy obvious typo domains if available. Build brand mentions (press and community posts) that use the exact spelling.

### F-04. TJM page is tool-first, but the SERP rewards authoritative guides (MEDIUM)
**Evidence:** about 70% of the top results for "TJM freelance brut net" are long guides with an embedded simulator (dougs.fr, indy.fr, regie-portage.fr, swapn.fr, swim.legal) or brand tools (qonto.com). The SERP also covers the reverse intent ("calculer son TJM à partir du net visé", as in the swapn/indy examples). The monbrutnet page has about 1 220 words, only a forward calculation (TJM to net), and models SASU as a single "~45% charges" figure. It has no salary/dividend split and no IS (corporate tax) step, which the SERP content breaks down.

**Recommendation:**
1. Add a reverse mode, "Quel TJM pour X € net / mois ?".
2. Model SASU and EURL properly: salary vs dividends, IS at 15%/25%, flat tax.
3. Add a worked example for a named persona (for example "Développeur React, 550 €/j, 18 j/mois"), with results by status side by side.
4. Aim for about 2 000 words of guide content below the tool, with a named author who has freelance experience.

### F-05. SMIC page answer format does not match the "definitive figure" SERP (MEDIUM, dependent on F-01)
**Evidence:** about 65% of the SMIC SERP is news or reference articles. They open with the current figure, the revaluation date and the history (info.gouv.fr, legisocial, toutsurmesfinances). The monbrutnet page opens with a calculator and "Simulateur officiel du SMIC 2026". The word "officiel" is misleading for a non-government site and invites comparison with info.gouv.fr.

**Recommendation:** after fixing F-01, put a definitive-answer box above the calculator, for example "SMIC au 1er juin 2026 : 12,31 € brut/h – 1 867,02 € brut/mois – ≈1 478 € net". Add a revaluation timeline, cite the arrêté with a link, and remove "officiel". Add `dateModified` and a visible "Mis à jour le" date.

### F-06. Supporting depth is thinner than the SERP leaders on edge cases (MEDIUM)
**Evidence:**
- **Homepage:** net is computed with a flat rate (22% / 25% / 15%) instead of line-by-line contributions. The SERP data suggests cadre and non-cadre are very close in 2026 (about 22.0% vs 22.2%), so "cadre ~25%" risks losing trust. There is no net-to-brut mode, no RGDU mention (mon-entreprise highlights it) and no amount grid beyond 4 000 €. The SERP leaders offer 100 € to 6 000 € grids (salerya) or programmatic pages per amount (Hellowork).
- **Rupture:** no convention collective choice (Syntec, Métallurgie), no calculation of the différé d'indemnisation for supra-légale amounts, no tax treatment of supra-légale amounts. Competitors (simulons.fr, OBBO) cover these.
- **AE:** no revenu-net-to-CA reverse mode (the URSSAF tool and leblogdudirigeant offer both directions) and no income tax without the versement libératoire.

**Recommendation:** add reverse modes, line-by-line payroll breakdowns, a convention collective selector for rupture, and the différé calculation. Extend programmatic amount pages (1 500 to 5 000 € in 100 € or 250 € steps) only if each page has unique computed content. Run `/seo page` on each.

### F-07. Media, visual answers and empty homepage result (LOW-MEDIUM)
**Evidence:** no charts, diagrams or illustrative images on any of the 5 pages (the only image is the OG image). The homepage result panel shows "0.00 €" and "Veuillez saisir un salaire" until the user types, unlike the prefilled tool pages.

**Recommendation:** prefill the homepage with a typical salary (for example 2 500 €) so the answer shows immediately. Add a simple brut-to-net waterfall chart (brut, cotisations, CSG/CRDS, PAS, net) and a SMIC timeline graphic. These are cheap wins for engagement and for Discover and image surfaces.

### F-08. FAQPage schema will not produce rich results (LOW)
**Evidence:** every page relies on FAQPage for SERP enhancement. Since 2023, Google shows FAQ rich results almost only for authoritative government or health sites, so there is little visible gain.

**Recommendation:** keep FAQPage for AI and LLM extraction, but focus on `WebApplication` with `dateModified`, `author`/`reviewedBy`, `Dataset` or `Table` for the reference tables, and `HowTo`-style step markup (as visible content) for the formulas. Run `/seo schema`.

---

## User stories (derived from SERP signals)

**Cluster A: salaire brut en net (homepage)**
- *Awareness:* "As a job candidate who received an offer in brut annuel, I want the monthly net before and after tax instantly, so I can compare it with my current pay." Signal: "calcul gratuit et instantané" in 6 of 9 titles; the AI summary gives "brut × 0,78".
- *Consideration:* "As a cadre, I want to know the exact difference from non-cadre, so I don't overestimate deductions." Signal: the SERP summary gives 22.04% vs 22.21%.
- *Decision:* "As an employer, I want the total employer cost including the 2026 RGDU, so I can budget a hire." Signal: mon-entreprise.urssaf.fr "RGDU" and "coût total".
- **Current page fit:** story 1 partly met (empty default, flat rate). Story 2 not met (25% assumption). Story 3 partly met (the super-brut line exists, no RGDU).

**Cluster B: SMIC brut net 2026**
- *Awareness:* "As a minimum-wage worker, I want the current SMIC net after the June 2026 revaluation, so I can check my payslip." Signal: info.gouv.fr "revalorisé le 1er juin 2026", AI answer 1 867,02 €.
- *Consideration:* "As a part-time worker, I want the pro-rata SMIC for my hours." Signal: justijob and esperoo pages for hourly and daily SMIC.
- **Current page fit:** story 1 FAILED (wrong figure). Story 2 met structurally, but with wrong numbers.

**Cluster C: auto-entrepreneur brut en net**
- *Consideration:* "As a new micro-entrepreneur, I want my net income from my CA with ACRE based on my creation date." Signal: the SERP states "ACRE 25% à compter du 1er juillet 2026".
- *Decision:* "As a service freelancer, I want to know the CA I must invoice to earn X € net." Signal: mon-entreprise "revenu net à partir du CA **et vice-versa**".
- **Current page fit:** story 1 partly met (ACRE assumes 50%). Story 2 not met (no reverse mode).

**Cluster D: TJM freelance brut net**
- *Consideration:* "As a developer leaving a CDI, I want to compare net income by status (micro/SASU/EURL/portage) for my TJM." Signal: indy, dougs and regie-portage status comparisons.
- *Decision:* "As a freelancer negotiating with an ESN, I want the minimum TJM needed to match my current salary." Signal: swapn/indy "définir le revenu net souhaité puis diviser par les jours".
- **Current page fit:** story 1 partly met (simplified SASU). Story 2 met in FAQ text only, with no calculator.

**Cluster E: rupture conventionnelle net**
- *Consideration:* "As an employee in negotiation, I want the legal minimum and my convention collective minimum." Signal: OBBO "selon votre convention collective".
- *Decision:* "As an employee offered a supra-légale amount, I want to know the net and how long my ARE is delayed." Signal: simulons.fr "différé ARE supra-légal", actav "contribution patronale 40%".
- **Current page fit:** story 1 partly met (legal minimum only). Story 2 partly met (supra-légale input exists, no différé calculation, wrong employer rate).

---

## Persona scoring (Relevance / Clarity / Trust / Action, 25 each)

Sorted by weakest first.

| Persona | R | C | T | A | Total | Top fix |
|---|---|---|---|---|---|---|
| Minimum-wage employee checking payslip (SMIC) | 12 | 18 | 4 | 16 | **50** | Correct the June 2026 SMIC figures, show the "Mis à jour le" date and the source arrêté (F-01, F-05) |
| Employee negotiating a rupture conventionnelle | 15 | 18 | 8 | 14 | **55** | Convention collective selector, différé ARE output, 40% contribution, lawyer/RH reviewer badge |
| Freelance dev/consultant choosing a status (TJM) | 16 | 17 | 9 | 14 | **56** | Reverse TJM mode, real SASU salary/dividend split, named freelance author |
| New micro-entrepreneur (AE) | 17 | 19 | 9 | 15 | **60** | ACRE creation-date logic, reverse CA mode, 2026 caps with URSSAF link |
| Job candidate comparing offers (homepage) | 18 | 18 | 10 | 16 | **62** | Prefill, line-by-line breakdown, net-to-brut mode, fix the cadre rate |
| Small employer / HR estimating hire cost | 12 | 15 | 9 | 12 | **48** | Secondary persona: add RGDU-aware employer-cost mode or a link to mon-entreprise |

Trust is the weakest dimension for every persona (4-10 / 25), driven by F-01 and F-02.

---

## Prioritized recommendations

1. **This week (CRITICAL):** put all regulatory constants in one config and update them (SMIC June 2026, PASS 48 060 €, 40% rupture contribution, ACRE 25% after 1 July 2026, micro and VAT caps). Add a visible "Barèmes à jour au …" line with a source link on every tool.
2. **This week (CRITICAL):** name a real publisher and director of publication, add a credentialed reviewer block and `Person` schema, and add `dateModified` to schema.
3. **2-4 weeks (HIGH):** differentiate the brand from monbrutennet.fr and start brand-mention and link acquisition (forums, Reddit r/vosfinances, freelance communities, press). A new domain needs referring domains to compete with fintech and government sites.
4. **2-6 weeks (MEDIUM):** add reverse modes (net to brut, net to CA, net to TJM), a real SASU/EURL model, rupture convention collective and différé, and a definitive-answer box on the SMIC page.
5. **Ongoing (LOW):** waterfall charts, homepage prefill, schema beyond FAQ.

Related skills: `/seo content` (E-E-A-T), `/seo schema` (Person, dateModified, reviewedBy), `/seo page` (per-page depth). A PDF report can be generated with `/seo google report`.

---

## Limitations

- SERP data comes from WebSearch result samples (US-based endpoint, French queries), not a live google.fr SERP. Positions, ads, PAA boxes and AI Overview presence could not be observed directly. The search quota ran out before separate SERPs for "heures supplémentaires net" and the micro/VAT threshold check could be pulled.
- The 40% rupture contribution, PASS 48 060 €, and the 2026 micro and VAT caps come from third-party SERP snippets. Confirm them on legifrance, urssaf.fr or service-public.fr before publishing.
- No access to Search Console, analytics, backlink data or real rankings, so the authority scores are inferred (new domain, anonymous publisher).
- Only `/` was rendered live. The other pages were read from the local source, which matched the live homepage byte-for-byte in content.
- Calculator JS logic was not re-audited here beyond the hard-coded constants.

---

## Structured findings (audit-data.json, category "Search Experience")

```json
{
  "category": "Search Experience",
  "score": 51,
  "score_label": "SXO Gap Score",
  "pages": {
    "/": 54, "/smic-brut-net/": 45, "/auto-entrepreneur-brut-en-net/": 54,
    "/tjm-freelance-brut-en-net/": 51, "/rupture-conventionnelle-net/": 52
  },
  "findings": [
    {"id": "SXO-01", "severity": "critical", "title": "Stale 2026 regulatory figures (SMIC 1801.80 vs 1867.02 since 2026-06-01; PASS 47136 vs 48060; rupture 30% vs 40%; ACRE 50% vs 25% post 2026-07-01)", "pages": ["/", "/smic-brut-net/", "/rupture-conventionnelle-net/", "/auto-entrepreneur-brut-en-net/", "llms.txt"]},
    {"id": "SXO-02", "severity": "critical", "title": "Anonymous publisher / no named expert or reviewer on YMYL pages; no dateModified", "pages": ["/mentions-legales/", "/a-propos/", "all tools"]},
    {"id": "SXO-03", "severity": "high", "title": "Brand collision with ranking competitor monbrutennet.fr", "pages": ["/"]},
    {"id": "SXO-04", "severity": "medium", "title": "TJM page tool-first while SERP rewards long-form authority guides; no reverse TJM mode", "pages": ["/tjm-freelance-brut-en-net/"]},
    {"id": "SXO-05", "severity": "medium", "title": "SMIC page lacks definitive-answer box and revaluation history; misleading 'officiel' claim", "pages": ["/smic-brut-net/"]},
    {"id": "SXO-06", "severity": "medium", "title": "Edge-case depth gaps: flat-rate net, no reverse modes, no convention collective/differe ARE", "pages": ["/", "/auto-entrepreneur-brut-en-net/", "/rupture-conventionnelle-net/"]},
    {"id": "SXO-07", "severity": "low", "title": "No visual/media answers; homepage result empty by default", "pages": ["/"]},
    {"id": "SXO-08", "severity": "low", "title": "Reliance on FAQPage schema that no longer yields rich results", "pages": ["all tools"]}
  ],
  "page_type_mismatch": {"/tjm-freelance-brut-en-net/": "MEDIUM", "/smic-brut-net/": "MEDIUM", "others": "ALIGNED"}
}
```

## Sources (SERP samples)

- https://salerya.fr/outils/simulateur-brut-net/
- https://www.hellowork.com/fr-fr/outil/salaire-brut-net/brut_mensuel-2026.html
- https://www.monbrutennet.fr/
- https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net
- https://mon-entreprise.urssaf.fr/simulateurs/auto-entrepreneur
- https://www.info.gouv.fr/actualite/le-smic-revalorise-le-1er-juin-2026
- https://www.legisocial.fr/reperes-sociaux/montant-smic-2026-taux-horaire-net-brut.html
- https://www.toutsurmesfinances.com/argent/a/smic-brut-net-montants-taux-et-revalorisation
- https://www.leblogdudirigeant.com/chiffre-affaire-net-auto-entrepreneur/
- https://www.l-expert-comptable.com/calculateurs/simulateur-de-revenus-en-auto-entrepreneur.html
- https://www.dougs.fr/blog/freelance-salaire/
- https://www.indy.fr/guide/freelance/salaire/simulateur-tjm-salaire-net/
- https://qonto.com/fr/tools/net-income-calculator
- https://www.swapn.fr/blog/tjm-en-freelance
- https://obbo-avocats.com/simulateurs/rupture-conventionnelle
- https://www.simulons.fr/simulateur/droit-du-travail/rupture-conventionnelle/
- https://www.actav.fr/simulateur-en-ligne/simulateur-rupture-conventionnelle/
- https://www.boncalcul.fr/outils/simulateur-chomage-are
