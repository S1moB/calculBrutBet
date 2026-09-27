# Backlink Profile & Domain Authority: monbrutnet.fr

**Audit date:** 2026-09-27
**Scope:** Domain-level authority/backlink signals for `monbrutnet.fr`, benchmarked against the near-identical competitor `monbrutennet.fr` and against the YMYL authorities and funded competitors this site targets (`service-public.fr`, `urssaf.fr`, plus two smaller niche competitors, `net-brut.fr` and `paie-facile.fr`).
**Category:** Backlink Profile / Off-page Authority
**Data tier:** **Tier 0** (`backlinks_auth.py --check`) — Common Crawl web graph + verification crawler only. No Moz, Bing Webmaster, or DataForSEO keys configured.

## Score

**Backlink Health Score: Not Assessed.**

At Tier 0 only Common Crawl domain-level presence/rank data is available. Common Crawl supplies rank and presence signals only — it carries none of the referring-domain-quality, anchor-text, or toxic-link data a health score requires (0 of 7 weighted scoring factors — referring domains, domain-quality distribution, anchor naturalness, toxic ratio, link velocity, follow/nofollow ratio, geographic relevance — have a data source at this tier). Producing a number here would be misleading, so this report states presence/rank facts and a qualitative severity assessment instead, per the seo-backlinks skill's "MUST NOT score what you did not measure" rule. This has been checked against `validate_backlink_report.py` (see JSON block, status PASS).

No known-backlinks list was supplied for this domain, so `verify_backlinks.py` was not run. There is nothing yet to verify — see BL-3.

---

## What works

- **Nothing negative to undo.** A brand-new domain (registered 2026-04-06, per other specialists' findings) with no backlink history has no toxic links, no penalty risk, and no disavow work — the authority build starts from a clean slate.
- **The site already has the raw material link-builders want**: 16 free, ungated calculator pages (per `findings/content.md`) is enough surface area to support a tool-embed and directory-listing strategy without building anything new, once the accuracy issues in `findings/content.md` (C1–C4, H1–H7) are fixed.
- **No reciprocal-link or link-scheme risk detected** (nothing to detect — the domain has no measurable link graph yet).

---

## Findings

### CRITICAL

#### BL-1. Near-zero backlink authority compounds directly with the anonymous-publisher problem, against an entrenched YMYL competitive set
- **Evidence:**
  - Common Crawl (confidence: 0.50, domain-level, quarterly, source: https://commoncrawl.org/web-graphs, release `cc-main-2026-jan-feb-mar`, covering pages crawled roughly Jan–Mar 2026): `monbrutnet.fr` is **not present** — `in_crawl: false`, `in_rankings: false`, no PageRank, no harmonic centrality. This is consistent with a domain registered 2026-04-06 (after this graph's crawl window) and having attracted no measurable inbound links yet. Per validator guidance, absence from Common Crawl is *not itself* proof of zero authority — it means "not crawled/not present in this release" — but combined with the April 2026 registration date and zero known backlinks, it corroborates a near-zero authority starting position, it does not independently establish it.
  - For contrast, the two YMYL authorities this site competes against for "salaire brut en net," "SMIC brut net 2026," and "auto-entrepreneur brut en net" are both strongly present in the same graph release: `service-public.fr` — PageRank rank **1,357**, harmonic-centrality rank **2,285**, 61 hosts; `urssaf.fr` — PageRank rank **12,554**, harmonic-centrality rank **8,990**, 192 hosts (Common Crawl, confidence: 0.50). Being ranked in the low thousands out of the entire crawled web is an authority tier that takes years of institutional link accumulation (government mandate, .gouv.fr and press citations, Wikipedia references) to reach — it is not closable with a short link-building sprint.
  - Funded fintech/accounting competitors named by other specialists (Dougs, Indy, Qonto, L-Expert-Comptable) were not queried here (out of scope for a French-domain web-graph check without their exact root domains confirmed), but as VC-backed, multi-year-old SaaS brands with paid PR, affiliate networks, and comparison-site placements, they sit structurally in the same "large, aged, multi-hundred-referring-domain" tier as the .gouv.fr sites, not in monbrutnet.fr's tier.
  - `findings/content.md` (H6) independently found no named author, reviewer, or publisher on monbrutnet.fr — only LCEN placeholder text ("Équipe éditoriale," "Responsable de la publication").
  - **Why this compounds rather than adds:** Google's YMYL quality guidance and any AI-answer-engine sourcing heuristic both use authorship/expertise signals *and* external validation (backlinks, citations, mentions) as independent trust checks. A YMYL finance page with neither a named human behind it nor any third-party site vouching for it (link, citation, or mention) fails both checks simultaneously. Fixing only one (e.g., adding an author bio) without the other (external validation) leaves the page in the same low-trust tier for algorithmic ranking and for LLM-answer-engine sourcing, because engines have no independent signal that anyone outside the site itself considers it credible.
- **Recommendation:** Treat authority-building and the H6 anonymous-publisher fix as one workstream, not two. A named, credentialed author/reviewer (content.md H6) makes every outreach pitch below (guest posts, PR, directory listings, embeds) dramatically more likely to succeed, because "who is behind this" is the first question any editor, directory reviewer, or embedding site will ask of an unknown .fr domain. Sequence: fix the publisher identity first (or in parallel with) Phase 0 below.

### HIGH

#### BL-2. The site has no citable brand entity anywhere — no LinkedIn company page, no Wikidata item, no consistent sameAs targets — which is both a trust gap and a link-building blocker
- **Evidence:** No brand-entity presence was found or reported by any prior specialist pass, and none of the standard `sameAs` targets (LinkedIn company page, X/Twitter, Wikidata, Crunchbase-equivalent) exist for this domain as of this audit. This was not independently re-verified by a live search in this pass (no web-search tool was used for this backlinks audit) — treat as **unconfirmed absence, inferred from the audit brief and the lack of any such link anywhere in the site's own schema/footer** (per `findings/content.md`, which found no `Person`/author schema and only placeholder publisher data). Flag for direct confirmation before acting.
- **Why it matters for link building specifically:** Journalists, directory reviewers, and potential guest-post editors routinely check for a company's independent web footprint before linking to or covering it. A domain with zero social/professional presence outside its own site reads as low-trust and can cause outreach to be ignored or directories to reject submission, independent of the .fr web-graph question in BL-1.
- **Recommendation:** Build the citable-entity layer in this order (cheapest/fastest to hardest, and roughly matching what is *earnable now* vs. later — see BL-4 for why Wikidata specifically should wait):
  1. LinkedIn company page (name a real operator/founder per BL-1's H6 link) — free, immediate, and the single highest-value `sameAs` target for a French B2C site.
  2. X/Twitter or a similar public account for update announcements (SMIC changes, RGDU changes) — gives journalists and directories something to check and gives the site a place to post citable, dated "changelog" content that also fixes content.md M2 (no visible update dates).
  3. Add `Organization` schema with `sameAs` linking to whatever of the above exist, once they exist — do not add `sameAs` entries pointing to profiles that don't exist yet or are empty shells; an empty/abandoned social profile is worse than none for trust review.

#### BL-3. No backlink monitoring baseline exists — the site cannot tell whether outreach is working
- **Evidence:** No known-backlinks file was supplied for `verify_backlinks.py`, and Common Crawl shows no inbound edges (BL-1). There is currently no mechanism in place to detect a new backlink when one appears, apart from re-running `commoncrawl_graph.py` (quarterly cadence) or manually checking.
- **Recommendation:**
  1. Sign up for a free Moz API key (moz.com/products/api, 2,500 rows/month, no cost) to move this analysis to Tier 1. Moz's Link Explorer index will surface new referring domains within roughly 3 days of Moz recrawling them — far faster than Common Crawl's quarterly cadence — and is the single highest-leverage, zero-cost upgrade available for future audits.
  2. Once any outreach placement goes live (a directory listing, guest post, or embed), record its URL and re-run `verify_backlinks.py --target https://monbrutnet.fr/ --links <file>` to confirm the link is live, dofollow, and pointing where expected, rather than assuming a "yes, we're listed" email means the link exists and resolves correctly.
  3. Re-run `commoncrawl_graph.py monbrutnet.fr` each quarter (new release) to track when/whether the domain enters the graph at all — first appearance in Common Crawl's `in_crawl: true` is itself a useful, free milestone signal.

### MEDIUM

#### BL-4. Wikidata is the wrong first move for a brand-new, uncovered domain
- **Evidence:** The audit brief lists Wikidata as a candidate citable-entity target. Wikidata's notability policy requires the subject to already have coverage in independent, reliable secondary sources (press, established directories) — it is not a self-service brand-listing tool, and a Wikidata item created for a domain with no press coverage is likely to be flagged, disputed, or deleted (WD:N).
- **Recommendation:** Sequence Wikidata *after* Phase 3 (PR/press) below, once at least one or two independent media or directory mentions exist to cite as sources on the Wikidata item. Attempting it now would waste effort and risks a deletion that looks bad if referenced from other profiles later.

#### BL-5. Generic/mass directory submission is a net-negative move for a domain this early
- **Evidence:** The seo skill's backlink-quality reference (`references/backlink-quality.md`) flags "generic directories (not industry-specific)" as a "potentially problematic" pattern (#25) and "links from sites with no real traffic (parked domains)" (#15) as likely-spam. Mass-submitting to low-quality "annuaire gratuit" style French directories is a common but low-value first instinct for new French sites.
- **Recommendation:** Limit directory submissions to a short, curated list of reputable, high-traffic, topically relevant listings (see Phase 1 plan below). Do not run automated or bulk directory-submission tools. Quality over quantity matters more for a domain with zero existing profile, since a handful of spammy first links are more visible (proportionally) in a near-empty link graph than they would be for an established site.

### INFO

#### BL-6. Methodology and tier limitations
- Tier 0 only: Common Crawl (confidence 0.50) + verification crawler (confidence 0.95, not used — no known links supplied). No Moz (0.85), Bing (0.70), or DataForSEO (1.00) data.
- Common Crawl web graphs are quarterly; this analysis used release `cc-main-2026-jan-feb-mar` (source: https://commoncrawl.org/web-graphs). Absence from this release does not prove zero links exist on the live web today — only that none were captured in that crawl window.
- The near-identical competitor `monbrutennet.fr` and two smaller niche competitors (`net-brut.fr`, `paie-facile.fr`) are **also absent** from this same Common Crawl release. This is a useful, low-confidence signal that the entire small-scale French brut/net-calculator niche is currently under Common Crawl's visibility floor — the competitive gap that matters is against the .gouv.fr sites and the funded fintech brands, not against `monbrutennet.fr`, which does not appear to have a measurable authority lead in this dataset either (though it may still be ahead via Google's own index/backlink data, which this report cannot see).
- Named fintech/accounting competitors (Dougs, Indy, Qonto, L-Expert-Comptable) were not queried against Common Crawl in this pass; if a head-to-head comparison against them is wanted, provide their exact linking root domains for a follow-up `commoncrawl_graph.py` pass.

---

## Prioritized Authority-Building Plan

Realistic framing first: at true zero-to-near-zero authority, monbrutnet.fr cannot out-rank service-public.fr or urssaf.fr for head terms ("salaire brut en net," "SMIC brut net") within the next several months, and probably not within a year, on backlinks alone — those domains' authority took years and an institutional link base to build. The realistic near-term goal is (a) building enough of a citable, trustworthy footprint to compete for long-tail and tier-specific queries (e.g., "alternance brut en net," "TJM freelance brut en net," specific salary-amount pages) where the competitive set is thinner, and (b) laying groundwork so that once the accuracy fixes in `findings/content.md` land, the site has somewhere to point press and directories without embarrassment.

**Phase 0 (weeks 0–2, prerequisite — blocks everything else):**
- Fix the anonymous-publisher problem (content.md H6): name a real director of publication (and SIREN if operating as a business), add an author/reviewer with stated credentials to every calculator page. Outreach below will underperform or be rejected without this.
- Fix at least the Critical accuracy issues in content.md (C1–C4: SMIC, apprentice threshold, flat-rate engine framing) before any PR or press outreach — pitching journalists on a "free calculator" that is provably wrong on the SMIC headline number is a reputational risk, not a link-building win.

**Phase 1 (weeks 1–4, low-effort foundations):**
- Create a LinkedIn company page and one other public account (X/Twitter) naming the real operator (feeds BL-2).
- Submit to Product Hunt and IndieHackers ("Show IH") — both are reputable, high-traffic, tool-specific, and free; a French-market financial calculator is a plausible, low-competition niche submission on both.
- Submit to a short list (5–8, curated, not mass) of reputable French startup/tool directories — e.g., established French Tech community listings and product-discovery sites with real traffic — avoiding generic "annuaire gratuit" link farms (BL-5).

**Phase 2 (weeks 3–8, highest-leverage tactic for a calculator site):**
- Build an embeddable widget/iframe version of at least the flagship SMIC/salary calculator, with a required "Simulateur par monbrutnet.fr" attribution link back to the site.
- Pitch the embed to sites that plausibly want a free salary-conversion tool but are not direct SEO competitors: expert-comptable/gestion-de-paie blogs, HR/RH blogs, CSE (comité social et économique) sites, freelance-platform blogs, student/career-guidance sites. Each successful embed placement is a natural, contextually relevant, likely-dofollow link — this is the single highest-leverage link-building tactic available to a calculator site and should be prioritized over generic guest posting.

**Phase 3 (weeks 4–12, community + earned mentions):**
- Participate genuinely in r/vosfinances, r/france, and r/AutoEntrepreneur (and equivalent French finance/freelance forums) around natural moments — the January SMIC increase, the RGDU change, the apprentice-threshold change (all currently mis-stated on the site per content.md and must be fixed first). Answer questions on-topic; link only when directly relevant and disclose site affiliation, per subreddit self-promotion rules. Most of this traffic is nofollow but builds brand-recognition and indirect citation signal, and occasionally yields organic dofollow pickup from someone who saw the mention elsewhere.
- Time community posts and any changelog/blog content to coincide with real news pegs (barème changes) rather than posting the tool cold.

**Phase 4 (weeks 6–16, PR and guest content, only after Phase 0 accuracy fixes are live):**
- Pitch a narrow, factual news angle — "what the 2026 SMIC/RGDU/apprentice-threshold changes mean for take-home pay," with the now-corrected calculator as the supporting tool — to French personal-finance and career outlets (e.g., MoneyVox, Les Echos Start, Capital.fr-type outlets) and to niche freelance/comptabilité blogs for a guest post or expert-quote placement. Avoid pitching to the very fintech/accounting competitors named in the brief (Dougs, Indy, Qonto, L-Expert-Comptable) — they are unlikely to link to a direct competitor's calculator.
- Track every pitch and placement; verify links post-publication with `verify_backlinks.py` (BL-3).

**Phase 5 (weeks 12+, once independent coverage exists):**
- Only now pursue a Wikidata item (BL-4), citing whatever press/directory coverage Phase 4 produced.
- Re-run `commoncrawl_graph.py monbrutnet.fr` each new quarterly release and track first appearance (`in_crawl: true`) as a milestone.
- Consider a free Moz API key (BL-3) to get faster (Tier 1, ~3-day-lag) visibility into new referring domains than Common Crawl's quarterly cadence allows.

**Ongoing:** Do not pursue reciprocal-link swaps or mass directory submission — with a near-empty link graph, a handful of low-quality links are proportionally more visible and damaging than they would be for an established site (BL-5).

---

## Cross-references
- Author/publisher identity fix: see `findings/content.md` finding H6 (this is a shared blocker with BL-1 above).
- Update-date/freshness schema fix (`dateModified`): see `findings/content.md` finding M2 — also supports the Phase 1 "changelog as citable content" tactic above.
- For crawlability/technical prerequisites to outreach (e.g., can embed widgets be crawled/indexed correctly), recommend `/seo technical https://monbrutnet.fr/` — not duplicated here.
- For on-page E-E-A-T beyond authorship, recommend `/seo content` (already run — see `findings/content.md`).

---

```json
{
  "category": "Backlink Profile",
  "score": null,
  "score_status": "Not Assessed",
  "score_status_reason": "Tier 0 only (Common Crawl + verify). 0 of 7 weighted scoring factors (referring domains, domain-quality distribution, anchor naturalness, toxic ratio, link velocity, follow/nofollow ratio, geographic relevance) have a data source. A numeric score would be misleading; validated via validate_backlink_report.py (status: PASS).",
  "tier": 0,
  "sources_used": [
    {"source": "commoncrawl", "confidence": 0.50, "release": "cc-main-2026-jan-feb-mar", "domain_level_only": true},
    {"source": "verify_backlinks", "confidence": 0.95, "used": false, "reason": "no known-backlinks list supplied"}
  ],
  "sources_unavailable": ["moz", "bing_webmaster", "dataforseo"],
  "domain_metrics": {
    "monbrutnet.fr": {"in_crawl": false, "in_rankings": false, "pagerank": null, "pagerank_rank": null, "harmonic_centrality_rank": null, "n_hosts": null},
    "monbrutennet.fr": {"in_crawl": false, "in_rankings": false, "pagerank": null, "pagerank_rank": null, "harmonic_centrality_rank": null, "n_hosts": null},
    "net-brut.fr": {"in_crawl": false, "in_rankings": false},
    "paie-facile.fr": {"in_crawl": false, "in_rankings": false},
    "service-public.fr": {"in_crawl": true, "in_rankings": true, "pagerank_rank": 1357, "harmonic_centrality_rank": 2285, "n_hosts": 61},
    "urssaf.fr": {"in_crawl": true, "in_rankings": true, "pagerank_rank": 12554, "harmonic_centrality_rank": 8990, "n_hosts": 192}
  },
  "findings": [
    {"id": "BL-1", "severity": "Critical", "title": "Near-zero backlink authority compounds with anonymous-publisher problem against entrenched YMYL competitors", "source": "commoncrawl (0.50) + cross-ref content.md H6"},
    {"id": "BL-2", "severity": "High", "title": "No citable brand entity (LinkedIn, sameAs targets) found or reported anywhere", "source": "inferred, unconfirmed by live search — flagged for direct confirmation"},
    {"id": "BL-3", "severity": "High", "title": "No backlink monitoring baseline; no known links supplied to verify", "source": "not-assessed"},
    {"id": "BL-4", "severity": "Medium", "title": "Wikidata premature before independent press coverage exists (notability policy)", "source": "not-assessed"},
    {"id": "BL-5", "severity": "Medium", "title": "Mass/generic directory submission is net-negative this early", "source": "reference: backlink-quality.md pattern #25"},
    {"id": "BL-6", "severity": "Info", "title": "Tier 0 methodology limits; niche competitors also absent from this CC release", "source": "commoncrawl (0.50)"}
  ]
}
```
