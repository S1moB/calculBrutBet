# Content Quality & E-E-A-T: monbrutnet.fr

**Audit date:** 2026-09-27
**Scope:** 16 URLs (13 calculator/guide pages + 3 legal/about pages). Checked against the local source (`*/index.html`) and spot-checked on the live site (`/smic-brut-net/` and `/alternance-brut-en-net/` serve the same figures).
**Category:** Content Quality (YMYL: pay, tax and social-security figures)

## Scores

| Dimension | Score |
|---|---|
| **Content Quality (overall)** | **44 / 100** |
| E-E-A-T (weighted composite) | 31 / 100 |
| - Experience (20%) | 25 |
| - Expertise (25%) | 35 |
| - Authoritativeness (25%) | 20 |
| - Trustworthiness (30%) | 40 |
| AI citation readiness (structure) | 78 / 100 |
| AI citation readiness (safe to cite, accuracy-adjusted) | 35 / 100 |
| Templated metadata (`metadata_template.py`, 16 pairs) | site_risk **low**, templated_ratio 0.0, no shared CTA phrases |

The E-E-A-T weights above are this audit's own scoring model. Google does not publish numeric weights.

### The prior audit's claims are not supported

`seo-audit/FULL-AUDIT-REPORT.md` gives "Qualité du Contenu & E-E-A-T : 96/100 (Densité 1.0, 0 filler, barèmes légaux 2026)". That score is **not supported** by what is on the site:

- **"barèmes légaux 2026" is false.** The headline figure (the SMIC) is the 2025 value relabelled as "au 1er janvier 2026". At least 8 other rules are pre-2026 or were wrong in every year (see findings C1 to C4 and H1 to H6).
- **"filler 0 / information density 1.0" was measured on the wrong thing.** Those are lexical metrics from a script. They measure wording, not whether the numbers are right. On a YMYL site, precise-looking but wrong numbers count against quality, not for it.
- **The prior report does not match the site.** It says BNC micro is 24.6% (the site says 25.6%) and fonctionnaire is ~11% (the engine uses 15%).
- Under the Sept 2025 QRG, pages with confident but inaccurate financial or legal information, from an anonymous publisher, sit at best at Lowest-to-Low for YMYL. That is nowhere near 96.

---

## What works

- **Clear structure.** Every calculator page has an H1, an intro H2 phrased as a question, a comparison table, a 4-question FAQ (mirrored in `FAQPage` JSON-LD) and a "Sources" block. This layout is easy for AI answer engines to extract.
- **Decent depth.** The editorial part of each page (excluding the calculator UI and link blocks) is about 700 to 980 words. The 16 pages are about 630 to 1,270 words of main content. None is thin by word count.
- **Many figures are correct.** Examples: 11.31% exemption on overtime contributions and the €7,500 income-tax cap; legal severance of 1/4 then 1/3 of a month per year (R.1234-2); 15 days' withdrawal period plus 15 working days for approval; ARE formulas 40.4% + fixed part vs 57%; ARE durations of 548/685/822 days; micro-enterprise allowances of 71/50/34%; CIPAV 23.2%; BIC 12.3%/21.2%; index point €4.92278; Agirc-Arrco T2 8.64%/12.95%; trial period for cadres of 4 months, renewable to 8; the 3x PASS death-capital penalty.
- **Good use of French and readable prose.** The register is plain, sentences are short to medium, currency is formatted the French way ("1 560 €"), and the vocabulary suits a general audience (net avant/après impôt, PAS, fiche de paie).
- **Legal pages exist.** Mentions légales, privacy policy, an About/methodology page, a contact email, and a clear "indicatif" disclaimer.
- **Metadata is unique on every URL.** The metadata-template check found no stock CTA and no title echo.
- **The tier pages are not word-for-word duplicates** (see M1 for the measured overlap).

---

## Findings

### CRITICAL

#### C1. The SMIC shown as "2026" is the 2025 value, and it drives the whole site
- **Evidence:** `/smic-brut-net/` says "au 1er janvier 2026, le SMIC horaire brut s'établit à 11,88 €… SMIC mensuel brut… 1 801,80 €". The same 11,88 / 1 801,80 values appear in 9 pages (home, SMIC, 2000/2500/3000, cadre, fonctionnaire, alternance, heures-sup), in `llms.txt` ("SMIC Brut Mensuel : 1 801,80 € (11,88 € / heure)") and in `a-propos` ("79% du SMIC (soit 1 423,42 € par mois en 2026)"). €11.88 / €1,801.80 has applied since **1 Nov 2024**. On **1 Jan 2026** the SMIC was raised to **€12.02/h, €1,823.03/month gross** (35h).
- **Knock-on effects:** the SMIC hourly comparison ("à comparer au SMIC horaire de 11,88 €"), the "1,6 SMIC ≈ 2 882 €" threshold, the apprentice grid (every row is computed on €1,801.80), the part-time SMIC table, the art. 81 bis cap "21 621,60 € en 2026", and the overtime table's SMIC row.
- **Recommendation:** Put SMIC and PASS in a single constants file that is injected into both the page copy and the JS engine. Update to €12.02 / €1,823.03 / €21,876.36 per year. Add a visible "Valeurs en vigueur au 1er janvier 2026, source : décret n° … JO du …" line with a link to Légifrance / service-public.

#### C2. The SMIC net figure is forced to fit the 22% rule by an invented contribution line
- **Evidence:** the `/smic-brut-net/` table lists the legal employee contributions (7.30% + 4.01% + 6.80% + 2.90% on 98.25%) and then adds "Prévoyance et autres contributions conventionnelles ~1,16 % − 20,90 €". Without that line the total is €375.50 and the net is **€1,426.30**, which is exactly the official 2025 SMIC net. The extra line is not a legal contribution. It exists to make the flat 22% reach €1,405.40. The site therefore publishes a SMIC net about €21/month too low (and about €38 too low against the 2026 net of roughly €1,443).
- **Why it is critical:** "SMIC brut net" is a main target query and the answer is a single number. AI engines and featured snippets will quote the wrong one.
- **Recommendation:** Calculate the SMIC net from the real rate components (no invented "prévoyance" line), and state it as a precise 2026 value with its source.

#### C3. The engine is a flat-percentage estimator, but the site presents it as an official, rate-by-rate calculation
- **Evidence:** the JS in `index.html` (repeated on every salary page) uses `tauxGlobal: 0.22 / 0.25 / 0.15`, `net = brut × (1 − tauxGlobal)` and `coutEmployeur = brut × 1.42`. There is no PMSS split, no réduction générale and no CSG base. Yet `a-propos` promises "taux officiels… au 1er janvier 2026", "barèmes audités et vérifiés trimestriellement" and "mise à jour immédiate du code source", and mentions-légales says the tools "intègrent rigoureusement les barèmes… PASS". The code does not use the PASS at all.
- **Consequences:**
  - (a) **The cadre vs non-cadre gap is invented at typical salaries.** Since the 2019 Agirc-Arrco merger, cadres and non-cadres below the PMSS pay the same employee contributions. The only difference is APEC at 0.024% (about €0.60/month at €2,500). The site shows cadres earning €60 to €90 less per month at €2,000, €2,500 and €3,000 gross, and gives that as the answer on the tier pages and the home page.
  - (b) **The employer cost from the calculator** (2,000 × 1.42 = €2,840) **contradicts the article text on the same page** ("coût employeur réel à environ 2 450 € à 2 520 €").
- **Recommendation:** Either (i) build a real payslip engine (PMSS-based T1/T2, CSG base at 98.25%, RGDU, apprentice threshold) or (ii) re-label everything as "estimation forfaitaire" and remove every "officiel/rigoureux/audité" claim. Option (i) is the only one that supports YMYL ranking for these queries.

#### C4. The apprentice rules are obsolete, and the premise of `/alternance-brut-en-net/` ("brut = net") no longer holds
- **Evidence:** the page says "exonérée… (y compris de la CSG et de la CRDS) dans la limite… 79% du SMIC… Votre salaire brut est donc strictement égal à votre salaire net". The same claim appears in `a-propos`, `llms.txt` and the "Apprenti" rows of the 2000/2500/3000 tables ("au-delà 79% SMIC"). For contracts signed since **1 March 2025** (LFSS 2025), the employee-contribution exemption is limited to **50% of the SMIC**, and CSG/CRDS is due on the part above 50%. For most apprentice pay bands, gross is no longer equal to net.
- **Recommendation:** Rewrite the page around the 50% threshold, and keep the 79% rule only as the transitional case for contracts signed before 1 March 2025. Fix the apprentice rows on the tier pages. This page targets "alternance brut en net" and currently gives the wrong answer to the main question.

### HIGH

#### H1. The employer-cost sections describe a rule that ended on 31 Dec 2025
- **Evidence:** `/3000-brut-en-net/` has the H3 "Fin de la réduction Fillon" with "s'éteint rigoureusement à 1,6 fois le SMIC (soit ~2 882 € brut en 2026)", and `/2500-brut-en-net/` says "elle s'éteint complètement à 1,6 SMIC". Since **1 Jan 2026** the réduction générale was replaced by the **RGDU** (réduction générale dégressive unique), which phases out at **3 SMIC**. At €3,000 gross an employer still gets a reduction in 2026.
- **Recommendation:** Rewrite the employer-cost sections for the RGDU and recompute the figures, or remove the employer-cost claims until the engine models them.

#### H2. The income-tax (PAS) estimates are too high, and one is mathematically impossible
- **Evidence:**
  - `/3000-brut-en-net/` gives a single filer a marginal rate of 11% and an average PAS rate of about 8% (€180/month). With an 11% marginal rate, the average rate cannot go above about 6%: taxable income is about €26k, and only the part above roughly €11.6k is taxed at 11%, before the décote. The real figure is about 4.5 to 5% (about €120/month).
  - `/2000-brut-en-net/` says "~2 %, soit ~30 €/mois". After the décote, a single filer at €2,000 gross owes almost no tax (a few €/month), and the neutral-grid PAS rate is about 0 to 0.5%.
  - `/2500-brut-en-net/` gives 5% (€95 to €105). The real figure is about 3% (about €60).
- **Recommendation:** Calculate PAS with the 2026 barème (income 2025) and the décote, or use the official DGFiP neutral-rate grid, and show the working. Mark the results as "célibataire sans enfant, sans autres revenus".

#### H3. The chômage (ARE) net figures are actually the gross figures
- **Evidence:**
  - `/3000-brut-en-net/`: ARE of €56.22/day gross, then "chômage net d'environ 1 680 € à 1 740 €". Since 56.22 × 30 = €1,687, the "net" is the gross amount. After the 3% SJR retirement deduction and CSG/CRDS, the net is about €1,480 to €1,500.
  - `/2500-brut-en-net/` gives "net 1 425–1 470 €" against a real net of about €1,330.
- **Recommendation:** Subtract 3% of the SJR and CSG/CRDS (taking the exemption threshold into account) and label the results clearly as gross and net.

#### H4. Micro-entrepreneur BNC rate and ACRE are wrong for 2026
- **Evidence:**
  - `/auto-entrepreneur-brut-en-net/` and `/tjm-freelance-brut-en-net/` use **25.6%** for SSI BNC, in both the text and the JS (`0.256`). The legal schedule was 23.1% (Jul 2024), then 24.6% (2025), then **26.1% (1 Jan 2026)**. 25.6% was never a valid rate.
  - The ACRE is shown as "exonération de 50%" (in the UI checkbox and the FAQPage JSON-LD). For businesses created since 1 July 2025, the micro-entrepreneur ACRE is a 25% reduction, and eligibility is narrower.
- **Likely also out of date (verify before publishing):**
  - VAT franchise thresholds: the site shows €36,800/€39,100 and €91,900/€101,000. The current figures are €37,500/€41,250 and €85,000/€93,500.
  - Micro turnover caps: the site shows €77,700/€188,700. The 2026 triennial revaluation should give about €83,600/€203,100.
- **Recommendation:** Update the rates in the page copy, the JS and the JSON-LD together. Add a "barème URSSAF au 1er janvier 2026" source link (autoentrepreneur.urssaf.fr).

#### H5. The cadre page justifies the extra 3 points with facts that are wrong
- **Evidence (`/cadre-brut-en-net/`):**
  - It says the cadre "participe au financement de sa prévoyance". The page itself also says the 1.50% is employer-paid, so it contradicts itself.
  - It cites the 1.5% prévoyance to "art. L. 911-7 du Code de la sécurité sociale". That article is the mandatory company health insurance (mutuelle) rule. The prévoyance obligation comes from the 1947 CCN, now the ANI of 17 Nov 2017.
  - It presents Tranche 2 and the CET as cadre-specific. Since 2019 they apply to every employee above the PMSS.
  - It uses PMSS "3 928 €/mois en 2026", which is neither the 2025 value (€3,925) nor the 2026 value (€4,005; PASS €48,060).
  - `/rupture-conventionnelle-net/` uses "PASS 2026 fixé à ~47 136 €".
- **Recommendation:** Rewrite the page around the real driver: the gap appears **above the PMSS** (T2 rates) and is about 0.024% below it. Replace the flat 25% table with a salary-dependent curve. Fix the PASS/PMSS values.

#### H6. There is no identifiable author or publisher on a YMYL finance site (the main E-E-A-T gap)
- **Evidence:**
  - Mentions légales: "Éditeur : Équipe éditoriale monbrutnet.fr", "Directeur de la publication : Responsable de la publication monbrutnet.fr". These are placeholders. LCEN art. 6-III requires a named natural person or a legal entity (with SIREN/RCS for a business), and the host's phone number is also missing.
  - There is no `Person`/`author` in any JSON-LD, no byline, no reviewer, and no credentials (payroll manager, expert-comptable, juriste).
  - `a-propos` claims "barèmes audités et vérifiés trimestriellement", which the errors above disprove.
- **Recommendation:** Name the publisher (and add SIREN if it is a business) and a named director of publication. Add an author/reviewer block with relevant credentials to every calculator page, and use `Person` + `reviewedBy` in the schema. Replace the unverifiable "audité trimestriellement" with a dated changelog ("Mise à jour 2026 : SMIC 12,02 €, RGDU, BNC 26,1 %…").

#### H7. Sourcing is generic, never points to a specific text, and some legal claims are wrong
- **Evidence:** every page ends with "Calculs conformes aux décrets de la Loi de Finances 2026… service-public.fr et urssaf.fr" and links to home pages only. No figure is tied to a specific decree, arrêté or service-public fiche. Other errors in the body text:
  - `/fonctionnaire-brut-en-net/` says fonctionnaires avoid "les 4,05% de cotisations chômage… secteur privé". Private-sector employees have paid **no** unemployment contribution since Oct 2018; the 4.05% is employer-only.
  - `/heures-supplementaires-brut-net/` credits the regime to "loi TEPA actualisée". TEPA was repealed in 2012. The current regime comes from the 2018 MUES law / LFSS 2019 and art. 81 quater CGI.
  - The home table's fonctionnaire column uses about 11%, while its dropdown and the engine use 15%. The tier-page dropdown label says "~11%" while its own table says "~15%".
- **Recommendation:** Give each key number a deep link (e.g. the service-public fiche F2300 for the SMIC, the URSSAF taux page, BOFiP). Fix the incorrect legal statements. Make the status percentages consistent across labels, tables and the engine.

### MEDIUM

#### M1. The salary-tier pages are programmatic: templated structure and formula-derived numbers
- **Measured overlap:**
  - All main text, including calculator UI and link blocks (5-word shingle Jaccard): 2000 vs 2500 = 0.198, 2000 vs 3000 = 0.172, 2500 vs 3000 = 0.172.
  - Editorial text only, with numbers normalised: Jaccard 0.12 to 0.17, containment 0.21 to 0.30.
  - Tier pages vs home page: 0.005 to 0.008.
  - So this is **not** a literal near-duplicate. The risk is structural.
- **Structural evidence:** the three pages share the same H1 pattern, the same "Tableau de conversion complet", "Taux horaire", "Coût global employeur", "13 mois", "chômage" and "Sources" sections, and the same 6-card link block. Every figure is `brut × 0.78 / 0.75 / 0.85`, which is exactly what the calculator above already outputs. Hand-written unique sections are few (2000: prime d'activité and payslip deductions; 2500: rupture example; 3000: "avantages"), and 2500 and 3000 share the "capacité d'emprunt / loyer" section.
- **Risk:** at 3 pages the risk is modest. If the pattern is extended to 1,500/1,800/3,500/4,000… (the usual next step), it becomes a textbook scaled-content case: the same template, a variable swap, and no information beyond the calculator.
- **Recommendation:** Do not add more tier pages until each has real added value: correct PAS, ARE and net figures computed from real rates; a comparison with the median salary for the band (INSEE/DARES); typical jobs or convention-collective minimums at that level; and a breakdown of the payslip. If that is not possible, consider merging the tiers into one "salaires brut en net 2026" table page. See the `seo-programmatic` skill for scaled-page guidance.

#### M2. Freshness signals are only labels
- **Evidence:** "2026" appears in every title and H1, but there is no visible "mis à jour le …", no `dateModified`/`datePublished` in the JSON-LD, and the sitemap `lastmod` is 2026-09-20 on all 16 URLs (a blanket timestamp). The underlying figures are 2025 or older (C1, C4, H1, H4). A "2026" label on 2025 data can hurt more than having no date at all.
- **Recommendation:** After fixing the figures, add a visible dated "Barèmes vérifiés le JJ/MM/2026" line and `dateModified` in the schema. Change sitemap `lastmod` only when a page's content actually changes.

#### M3. The prime d'activité statements are probably wrong
- **Evidence:** `/2000-brut-en-net/` says that for a single person with no child, €1,560 net "dépasse légèrement le plafond d'attribution". For a single person, the prime continues well above that level (roughly up to 1.5x SMIC net, about €1,900 to €2,000). At €1,560 net a single person is typically still eligible for about €100 to €150/month. The SMIC page's range of €160 to €230 for a single person at the SMIC also looks high. Verify with the CAF simulator.
- **Recommendation:** Check against caf.fr and link to its simulator instead of giving firm figures.

#### M4. Other 2026 values to check (medium confidence)
- **Evidence:**
  - `/rupture-conventionnelle-net/`: "contribution patronale unique de 30%". LFSS 2026 raised the employer contribution on ruptures conventionnelles (to 40% from 1 Jan 2026, per the adopted text).
  - `/chomage-brut-en-net/`: the age brackets 53/55 are from before the 2025 Unédic convention, which raised the senior brackets to 55 and 57.
  - `/tjm-freelance-brut-en-net/`: "flat tax de 30%". The PFU rose to about 31.4% after the 2026 CSG increase on capital income.
- **Recommendation:** Verify each against service-public/Unédic before editing, and date-stamp each figure.

#### M5. Internal linking: two separate clusters and a self-link
- **Evidence:**
  - Inbound `href` counts across the site: 2000 = 8, 2500 = 8, 3000 = 7, compared with 38 to 39 for the tool pages. Fonctionnaire and alternance get 20, almost all from the nav.
  - The "Autres simulateurs" block on the 6 tool pages (AE, TJM, RC, chômage, HS) links only to home, SMIC and the other tool pages, never to the tier or status pages.
  - The tier pages' "Autres simulations" block links to the page itself (e.g. `/2000-brut-en-net/` → "2 000 € Brut en Net").
  - There are few links from inside the article text (e.g. the 2500 page's rupture FAQ does not link to `/rupture-conventionnelle-net/`, and the chômage FAQs on the tier pages do not link to `/chomage-brut-en-net/`).
- **Recommendation:** Add contextual links from inside the FAQ answers. Unify the two link blocks. Remove self-links. Link cadre ↔ 3000, alternance ↔ SMIC, and heures-sup ↔ the tier pages.

### LOW

#### L1. Marketing-style overstatement, a typical sign of AI-written copy
- **Evidence:** "rigoureusement documentés", "exactement", "strictement égal", "s'éteint rigoureusement", "une règle d'or s'impose", "avantage social et fiscal exceptionnel". These absolute words are placed on figures that are wrong. The same headings and emoji cards repeat across pages. There is no first-hand signal anywhere (no worked payslip, screenshot, reader case or author opinion).
- **Recommendation:** Tone down the absolutes. Add one real example per page (an anonymised payslip reproduced line by line) to show experience.

#### L2. Readability
- **Evidence:** the prose is at a lycée level and easy to scan. The long tables are hard to read on mobile, and some paragraphs have more than 5 numbers in one sentence (the employer-cost and ARE blocks).
- **Recommendation:** One number per sentence in key answers, and a bold "Réponse courte" line under each H2.

### INFO

#### I1. AI citation readiness
- The structure is excellent: question-form H2s, a definitive number in the first 60 words, tables, FAQPage schema and `llms.txt`.
- This is currently a liability. `llms.txt` and the FAQ JSON-LD spread the wrong SMIC, the 79% apprentice rule, the TEPA framing and the cadre gap directly to AI engines.
- Fix `llms.txt` and the JSON-LD at the same time as the page copy. They are the most-quoted surface.

#### I2. Metadata
- `metadata_template.py` on 16 pairs: site_risk low, templated_ratio 0.0, no shared CTA.
- Titles all follow "X Brut en Net 2026 : … | monbrutnet.fr". This is acceptable, but refresh the "2026" only when the data is truly 2026.

---

## Priority fix list
1. Put one source of truth for the constants in both the copy and the engine: SMIC 2026 (€12.02 / €1,823.03), PASS/PMSS 2026 (€48,060 / €4,005), BNC 26.1%, ACRE 25%, apprentice 50% threshold, RGDU up to 3 SMIC. Regenerate every table, the FAQ JSON-LD and `llms.txt` from it.
2. Remove the invented "~1.16% prévoyance" line and the flat cadre gap. Calculate net pay from components based on the PMSS.
3. Fix the PAS (barème + décote) and the ARE net (−3% SJR and CSG/CRDS).
4. Name the publisher and director of publication (LCEN), add an author/reviewer with credentials, and replace "audité trimestriellement" with a dated changelog.
5. Link each figure to its specific official source, and add visible "mis à jour le" dates and `dateModified`.
6. Freeze the tier-page programme until each page has real unique value, and fix the internal-link clusters.

---

```json
{
  "category": "Content Quality",
  "score": 44,
  "eeat": {"experience": 25, "expertise": 35, "authoritativeness": 20, "trustworthiness": 40, "composite": 31},
  "ai_citation_readiness": {"structure": 78, "accuracy_adjusted": 35},
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}},
  "prior_audit_claim": {"claimed": 96, "verified": false, "note": "2025 SMIC labelled 2026; multiple outdated/incorrect YMYL figures; lexical metrics do not measure accuracy"},
  "findings": [
    {"id": "C1", "severity": "Critical", "title": "SMIC labelled 2026 is the 2025 value (11,88 / 1 801,80 vs 12,02 / 1 823,03)", "pages": ["/", "/smic-brut-net/", "/2000-brut-en-net/", "/2500-brut-en-net/", "/3000-brut-en-net/", "/cadre-brut-en-net/", "/fonctionnaire-brut-en-net/", "/alternance-brut-en-net/", "/heures-supplementaires-brut-net/", "/a-propos/", "/llms.txt"]},
    {"id": "C2", "severity": "Critical", "title": "SMIC net forced to 22% via invented ~1.16% prevoyance line (1 405,40 vs real 1 426,30 for 2025)", "pages": ["/smic-brut-net/"]},
    {"id": "C3", "severity": "Critical", "title": "Flat-rate engine (22/25/15%, x1.42) presented as official rate-by-rate calculation; fictitious cadre/non-cadre gap below PMSS; engine contradicts copy on employer cost", "pages": ["all salary calculators", "/a-propos/", "/mentions-legales/"]},
    {"id": "C4", "severity": "Critical", "title": "Apprentice exemption shown at 79% SMIC / brut=net; 50% SMIC + CSG/CRDS since 1 March 2025", "pages": ["/alternance-brut-en-net/", "/a-propos/", "/2000-brut-en-net/", "/2500-brut-en-net/", "/3000-brut-en-net/", "/llms.txt"]},
    {"id": "H1", "severity": "High", "title": "Reduction generale 'ends at 1.6 SMIC' in 2026; replaced by RGDU up to 3 SMIC", "pages": ["/2500-brut-en-net/", "/3000-brut-en-net/"]},
    {"id": "H2", "severity": "High", "title": "PAS estimates overstated; 8% average at 11% TMI is impossible", "pages": ["/2000-brut-en-net/", "/2500-brut-en-net/", "/3000-brut-en-net/"]},
    {"id": "H3", "severity": "High", "title": "ARE 'net' equals gross x30", "pages": ["/2500-brut-en-net/", "/3000-brut-en-net/"]},
    {"id": "H4", "severity": "High", "title": "BNC micro rate 25.6% (2026: 26.1%); ACRE 50% (25% since Jul 2025); VAT/CA thresholds likely stale", "pages": ["/auto-entrepreneur-brut-en-net/", "/tjm-freelance-brut-en-net/"]},
    {"id": "H5", "severity": "High", "title": "Cadre page: prevoyance mis-attributed to employee, wrong legal article, T2/CET not cadre-specific, PMSS 3 928 wrong", "pages": ["/cadre-brut-en-net/", "/rupture-conventionnelle-net/"]},
    {"id": "H6", "severity": "High", "title": "Anonymous publisher (LCEN placeholders), no author/reviewer, unverifiable 'audited quarterly' claim", "pages": ["/mentions-legales/", "/a-propos/", "all"]},
    {"id": "H7", "severity": "High", "title": "Generic homepage-only sourcing; false claims (employee 4.05% chomage, loi TEPA); inconsistent fonctionnaire 11% vs 15%", "pages": ["all", "/fonctionnaire-brut-en-net/", "/heures-supplementaires-brut-net/", "/"]},
    {"id": "M1", "severity": "Medium", "title": "Salary-tier pages templated and formula-derived (Jaccard 0.17-0.20 full, 0.12-0.17 editorial); scaled-content risk if extended", "pages": ["/2000-brut-en-net/", "/2500-brut-en-net/", "/3000-brut-en-net/"]},
    {"id": "M2", "severity": "Medium", "title": "No visible update date or dateModified; blanket sitemap lastmod; '2026' labels on older data", "pages": ["all"]},
    {"id": "M3", "severity": "Medium", "title": "Prime d'activite eligibility/amounts likely incorrect", "pages": ["/2000-brut-en-net/", "/smic-brut-net/"]},
    {"id": "M4", "severity": "Medium", "title": "Verify: RC employer contribution (40% in 2026), Unedic 2025 senior brackets, PFU 31.4%", "pages": ["/rupture-conventionnelle-net/", "/chomage-brut-en-net/", "/tjm-freelance-brut-en-net/"]},
    {"id": "M5", "severity": "Medium", "title": "Two separate link clusters; tier pages 7-8 inbound links; self-links; few in-text links", "pages": ["all"]},
    {"id": "L1", "severity": "Low", "title": "Overstated absolutes and no first-hand experience signals", "pages": ["all"]},
    {"id": "L2", "severity": "Low", "title": "Number-dense sentences and wide tables on mobile", "pages": ["tier pages", "/chomage-brut-en-net/"]},
    {"id": "I1", "severity": "Info", "title": "Strong AI-extractable structure currently spreads incorrect figures via llms.txt and FAQ JSON-LD", "pages": ["/llms.txt", "all FAQPage"]},
    {"id": "I2", "severity": "Info", "title": "Metadata unique, no templating detected", "pages": ["all"]}
  ]
}
```
