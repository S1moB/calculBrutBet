# Audit SEO Indépendant — monbrutnet.fr

> **Date** : 27 septembre 2026
> **Méthode** : 8 audits spécialisés indépendants (technique, contenu/E-E-A-T, schema, performance, visuel/mobile, GEO/IA, SXO, backlinks), mesures live sur https://monbrutnet.fr/ + lecture directe du code source (16 pages).
> **Objectif de ce document** : remplacer l'auto-audit précédent (`seo-audit/FULL-AUDIT-REPORT.md`, score annoncé 97/100), qui n'a pas été vérifié de façon indépendante et surestime largement la qualité réelle du site.

---

## 1. Score de Santé SEO Global : **69 / 100**

```
Score annoncé par l'audit précédent (non vérifié) :  97/100  ██████████
Score réel, vérifié indépendamment              :  69/100  ███████░░░

Performance (Core Web Vitals)         93/100  █████████░   Excellent — confirmé indépendamment
SEO Technique (crawl/index/sécurité)  90/100  █████████░   Solide
Schema.org / Données structurées      80/100  ████████░░   Bon, corrections mineures
Expérience mobile / Visuel            64/100  ██████░░░░   Bug CSS réel + CTA sous la ligne de flottaison
SXO (adéquation à l'intention Google) 51/100  █████░░░░░   Bon format de page, mais confiance très faible
Visibilité IA (GEO/AEO)               53/100  █████░░░░░   Structure excellente, contenu non fiable
Qualité du Contenu & E-E-A-T          44/100  ████░░░░░░   CRITIQUE — chiffres 2026 faux et incohérents
Autorité / Backlinks                  ~0      ░░░░░░░░░░   Domaine neuf (avril 2026), non indexé par Common Crawl
```

**Le constat central de cet audit, qui ne figurait pas dans le précédent** : monbrutnet.fr est un site **techniquement excellent** (rapide, propre, bien structuré, schema valide) construit sur des **chiffres 2026 faux et incohérents entre eux**. Pour un site YMYL (argent, fiscalité, droit du travail), c'est le problème qui bloque tout le reste : aucune quantité de technique, de backlinks ou de contenu ne fera classer en première position une page qui donne un SMIC 2026 erroné sur un sujet où Google compare activement les chiffres à des sources officielles.

### Pondération utilisée (méthodologie standard de l'audit)

| Catégorie | Poids | Score | Contribution |
|---|---|---|---|
| SEO Technique | 22% | 82¹ | 18.0 |
| Qualité du Contenu | 23% | 44 | 10.1 |
| SEO On-Page | 20% | 68² | 13.6 |
| Schema / Données structurées | 10% | 80 | 8.0 |
| Performance (CWV) | 10% | 93 | 9.3 |
| Visibilité IA (GEO) | 10% | 53 | 5.3 |
| Images | 5% | 85³ | 4.25 |
| **Total** | 100% | | **≈69/100** |

¹ Moyenne pondérée technique pur (90) + UX mobile (64), le mobile faisant partie du périmètre technique.
² Balises title/meta uniques et propres, structure Hn correcte, mais maillage interne fragmenté et aucune date de mise à jour visible (voir §4).
³ Aucune image `<img>` sur le site (calculateur 100% HTML/CSS/JS) : aucun problème d'alt-text, mais aucune opportunité visuelle exploitée non plus.

---

## 2. Ce qui fonctionne réellement (vérifié, pas supposé)

- **Performance excellente et confirmée indépendamment** : LCP 1,0–1,2s, CLS 0, TBT 0ms sur les 3 pages testées (Lighthouse 13.5, mobile, throttling simulé). CSS/JS inlinés, zéro ressource bloquante, `html2pdf.js` chargé en lazy-load réel au clic.
- **Base technique saine** : sitemap.xml valide (16/16 URLs), robots.txt correct, canonicals uniques et auto-référents sur les 16 pages, HTTPS forcé sans chaîne de redirection, en-têtes de sécurité (HSTS, X-Frame-Options, etc.) présents et vérifiés en live, 404 réelle avec page utile, fichier IndexNow correctement hébergé.
- **Schema.org syntaxiquement valide à 100%** sur les 16 pages (parsing JSON programmatique, aucune erreur), `BreadcrumbList` correct sur 15/16 pages, et — point positif rare — le contenu des `FAQPage` correspond mot pour mot au texte visible sur les 13 pages qui l'utilisent (pas de schema caché/trompeur).
- **Structure éditoriale et format de page adaptés à l'intention de recherche** : pour 4 des 5 clusters de mots-clés testés (salaire brut en net, auto-entrepreneur, rupture conventionnelle, chômage ARE), 80–90% des résultats Google sont des calculateurs — exactement le format que propose monbrutnet.fr, avec calcul en direct, export PDF et partage par URL.
- **Aucun problème d'images** : pas de balises `<img>`, donc pas d'alt-text manquant ni de poids d'image à optimiser.
- **Le fichier `llms.txt` est correctement formaté** selon la spec llmstxt.org (titre, résumé, sections en liens) — le problème n'est pas le format, c'est le contenu qu'il diffuse (voir §3).

---

## 3. Le problème critique : des chiffres 2026 faux et contradictoires

C'est, de loin, la conclusion la plus importante de cet audit et celle qui doit être corrigée **avant** tout autre effort SEO (contenu additionnel, backlinks, PR). Cinq audits indépendants (Contenu, SXO, GEO, et croisements Technique/Schema) sont arrivés à la même conclusion sans se copier :

### Le SMIC affiché "2026" est en réalité la valeur 2024–2025
Le site affiche partout **11,88 €/h et 1 801,80 € brut/mois "au 1er janvier 2026"** (page SMIC, homepage, pages 2000/2500/3000, cadre, fonctionnaire, alternance, heures-sup, `a-propos`, `llms.txt` — 22 occurrences). Or :
- **1er janvier 2026** : SMIC porté à 12,02 €/h — 1 823,03 €/mois
- **1er juin 2026** : nouvelle revalorisation à **12,31 €/h — 1 867,02 € brut/mois (≈1 478 € net)** (source : info.gouv.fr, LégiSocial)

Le site donne donc la valeur d'il y a près de deux ans sur la requête "SMIC brut net 2026", qui est l'une des requêtes les plus recherchées du site.

### D'autres chiffres réglementaires sont également obsolètes ou faux
- **PASS 2026** : le site utilise ~47 136 € (page rupture conventionnelle, page cadre) — la vraie valeur 2026 est **48 060 €**.
- **Contribution patronale rupture conventionnelle** : le site affiche 30%, or elle est passée à **40% depuis le 1er janvier 2026** (LFSS 2026). L'estimation de coût employeur sur cette page est donc fausse.
- **ACRE auto-entrepreneur** : le site affiche une exonération de 50% sans condition, alors qu'elle est réduite à **25% pour les entreprises créées à partir du 1er juillet 2026**.
- **Taux BNC micro-entrepreneur** : 25,6% sur le site vs. 24,6% dans `llms.txt` vs. **26,1%** (barème réel 2026) — trois valeurs différentes pour le même taux.
- **Seuil d'exonération apprenti** : le site affirme "brut = net" jusqu'à 79% du SMIC, alors que ce seuil est passé à **50% du SMIC depuis le 1er mars 2025** (LFSS 2025) — l'affirmation centrale de la page `/alternance-brut-en-net/` n'est plus vraie pour la plupart des contrats.
- **Taux fonctionnaire** : ~11% dans le tableau de la homepage vs. ~15% dans le sélecteur et le moteur de calcul — incohérence interne, sans même parler de l'exactitude du chiffre.
- **Le net SMIC est artificiellement forcé** : une ligne de cotisation "prévoyance ~1,16%" est ajoutée sans base légale, uniquement pour faire correspondre le calcul au taux forfaitaire de 22% annoncé.
- Le moteur de calcul utilise des **taux forfaitaires** (22% / 25% / 15% du brut) présentés comme "taux officiels calculés cotisation par cotisation", alors qu'aucun calcul PASS/tranche n'est réellement effectué. Consequence concrète : l'écart cadre/non-cadre est **inventé** (depuis la fusion Agirc-Arrco de 2019, l'écart réel est d'environ 0,024%, pas 3 points).

**Pourquoi c'est bloquant pour le référencement** : sur une thématique YMYL (argent, fiscalité), Google et les IA génératives comparent activement le chiffre donné à des sources faisant autorité (service-public.fr, urssaf.fr, info.gouv.fr). Une page qui affiche un chiffre différent de celui du consensus est un signal de faible qualité qui limite le positionnement, indépendamment de tous les autres facteurs techniques.

---

## 4. Le problème n°2 : aucun éditeur identifiable (E-E-A-T)

Les mentions légales indiquent "Éditeur : Équipe éditoriale monbrutnet.fr" et "Directeur de la publication : Responsable de la publication monbrutnet.fr" — ce sont des textes génériques, pas des identités réelles. Cela pose un double problème :

1. **Conformité légale** : l'article 6-III de la LCEN impose l'identification d'une personne physique ou morale responsable de la publication. Le manque de nom réel et de numéro de téléphone de l'hébergeur est un vrai risque de non-conformité, pas seulement un problème SEO.
2. **Confiance E-E-A-T** : aucune page ne mentionne d'auteur, de relecteur, ni de date de mise à jour (`dateModified`). Sur des sujets fiscaux/sociaux, Google et les utilisateurs valorisent une source identifiable (expert-comptable, gestionnaire de paie, juriste). Face à des concurrents comme URSSAF, service-public.fr, Dougs, Indy ou Qonto — tous identifiés — un "Équipe éditoriale" anonyme sur un domaine vieux de 6 mois est un signal de confiance très faible, confirmé indépendamment par 3 audits distincts (score de confiance mesuré entre 4 et 10 sur 25 selon les personas testés).

---

## 5. Autres constats significatifs

### SEO Technique (90/100) — solide, corrections mineures
- Aucun blocage de crawl ou d'indexation. Sitemap, robots.txt, canonicals et HTTPS sont propres.
- **Moyen** : le fichier-clé IndexNow existe mais rien n'indique un mécanisme d'envoi automatique (pas de hook CI/build) — Bing/Yandex n'en tirent donc pas le bénéfice d'indexation instantanée.
- **Moyen** : pas de Content-Security-Policy, et `html2pdf.js` chargé depuis cdnjs.cloudflare.com sans hash `integrity` (SRI) — risque de supply-chain mineur.
- **Info** : les 16 `<lastmod>` du sitemap sont tous identiques (2026-09-20), un signal de fraîcheur peu crédible qui deviendra important une fois les chiffres corrigés.

### Expérience mobile (64/100) — un vrai bug, pas seulement une opinion
- **Bug CSS confirmé par mesure DOM** : sur `/smic-brut-net/` et `/auto-entrepreneur-brut-en-net/`, une carte/bouton dépasse la largeur de l'écran mobile (jusqu'à 120px de dépassement sur la page Auto-Entrepreneur) et est silencieusement rogné par un `overflow-x: hidden` global — invisible à l'œil sans mesure, mais réel : coins arrondis et marges du bouton "coupés" à l'écran.
- **Le bouton de calcul et le résultat sont sous la ligne de flottaison mobile sur les 3 pages testées** (jusqu'à 932px de haut sur un écran de 812px). L'utilisateur doit faire défiler avant de voir la confirmation, alors que le calcul se fait bien en direct.
- **Cibles tactiles de la navigation trop petites** : liens de nav mesurés à 34-36px de hauteur (recommandation Apple/Google : 44-48px minimum), lien "Accueil" du fil d'Ariane à seulement 18-20px.
- La navigation mobile masque 3 des 6 onglets derrière un défilement horizontal peu visible, sans menu hamburger de secours (le footer duplique heureusement tous les liens).

### Schema.org (80/100) — bon, deux corrections utiles
- Le `logo` de l'Organisation pointe vers l'image Open Graph (1193×630, format bannière) au lieu d'un logo carré — Google ignorera probablement cette valeur pour le Knowledge Panel.
- Usage incorrect de `sameAs` : le site y met des liens vers urssaf.fr et service-public.fr (des sources citées, pas des profils appartenant à monbrutnet.fr). `sameAs` doit pointer vers les propres profils de l'entité (LinkedIn, Wikipedia…) une fois qu'ils existeront.
- Le schema `FAQPage`, déployé récemment sur 13 pages, ne produit plus de rich results Google depuis leur suppression le 7 mai 2026 — ce n'est pas nuisible (le contenu correspond bien au texte visible), mais ce n'est plus un gain SERP, seulement un signal structurel pour les IA.

### SXO — pourquoi les pages ne se classeront pas malgré un bon format
- Le format de page (calculateur) correspond à ce que Google récompense pour 4 des 5 requêtes cibles testées — ce n'est donc pas un problème de type de page.
- **Un domaine quasi-identique, `monbrutennet.fr`, se classe déjà** dans le top 10 pour la requête principale "salaire brut en net" — un risque de confusion de marque à traiter (nom distinctif, éventuellement domaines typo à sécuriser).
- La page TJM Freelance est "outil d'abord" alors que 70% des résultats sont des guides longs avec simulateur intégré (Dougs, Indy, Qonto) — un mismatch de profondeur, pas de type.
- Aucune page ne propose de calcul inversé (net → brut, net → CA, net → TJM), fonctionnalité que proposent plusieurs concurrents directs (mon-entreprise.urssaf.fr notamment).

### Autorité / Backlinks — le vrai point de départ
Le domaine (créé le 6 avril 2026) n'apparaît dans aucune donnée Common Crawl — ni lui, ni son concurrent quasi-homonyme, ni deux autres petits sites du même créneau. À titre de comparaison, service-public.fr et urssaf.fr sont très fortement présents dans ce même graphe. **Le vrai écart n'est pas contre monbrutennet.fr, mais contre les autorités institutionnelles** — un écart qu'aucun sprint de link-building de quelques semaines ne comblera. La construction d'autorité doit être séquencée *après* la correction des chiffres et de l'éditeur (une campagne de relations presse sur un site qui affiche encore un SMIC faux se retournerait contre le site).

### Visibilité IA / GEO (53/100)
- Tous les grands robots IA (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended…) sont autorisés et reçoivent un HTTP 200 — aucun blocage technique.
- Le problème est le même qu'ailleurs : `llms.txt` et le schema FAQ diffusent activement les chiffres faux directement aux moteurs IA — c'est la queue actuelle la plus citée du site, mais elle propage l'erreur plutôt que d'aider.
- Aucune page ne place la réponse chiffrée dans les 40-60 premiers mots sous le H1 (format que les IA génératives citent le plus facilement) — actuellement, chaque page ouvre par une phrase promotionnelle avant le chiffre.

---

## 6. Limites de cet audit

- Aucune donnée Google Search Console, GA4, PageSpeed/CrUX ou Moz n'était configurée dans cet environnement — les scores Performance et Backlinks sont donc basés sur des mesures de laboratoire (Lighthouse) et sur Common Crawl uniquement, pas sur des données réelles issues du trafic ou des classements Google.
- Les données de SERP utilisées par l'audit SXO/GEO proviennent d'échantillons de recherche web, pas d'une page de résultats Google.fr en direct (pas de positions, d'annonces ou de "Autres questions posées" observées directement).
- Les valeurs réglementaires 2026 citées dans ce rapport (SMIC, PASS, taux ACRE/BNC, contribution rupture conventionnelle) proviennent de sources tierces retrouvées lors de la recherche — **elles doivent être reconfirmées sur Légifrance, urssaf.fr ou service-public.fr avant toute mise à jour du site**, cet audit ne remplaçant pas cette vérification finale.

---

*Rapport détaillé par catégorie disponible dans `findings/` : `technical.md`, `content.md`, `schema.md`, `performance.md`, `visual.md`, `sxo.md`, `geo.md`, `backlinks.md`.*
