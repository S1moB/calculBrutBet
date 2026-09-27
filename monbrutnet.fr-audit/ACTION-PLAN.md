# Plan d'Action SEO — monbrutnet.fr

> Objectif affiché : être en première position sur Google pour les requêtes cibles ("salaire brut en net", "SMIC brut net 2026", "auto-entrepreneur brut en net", etc.)
> **Réalisme à assumer dès le départ** : pour la requête générique "salaire brut en net", monbrutnet.fr affrontera des sites gouvernementaux (urssaf.fr, service-public.fr) et des marques financées (Qonto, Dougs, Indy) sur un domaine créé il y a 6 mois, sans backlinks. La 1ère position sur ces têtes de requête n'est pas un objectif de court terme réaliste. En revanche, la 1ère position sur des requêtes plus longues et moins disputées (ex. "TJM freelance brut net", "indemnité rupture conventionnelle net 2026", "chômage ARE calcul") est atteignable en 2-4 mois **si et seulement si** la Phase 0 ci-dessous est traitée en premier — car actuellement le site perd des points de confiance qu'aucun contenu ni aucun lien ne peut compenser.

---

## 🚨 Phase 0 : Bloquant absolu — à faire avant tout le reste (Semaine 1)

Tant que cette phase n'est pas terminée, ajouter du contenu, faire du link-building ou de la PR est contre-productif : cela amplifierait la diffusion de chiffres faux (y compris aux moteurs IA via `llms.txt` et le schema FAQ).

### 0.1 — Créer une source unique de vérité pour tous les taux réglementaires
**Impact : CRITIQUE | Effort : 3-4h**

Créer un seul fichier de constantes (JS/JSON) réutilisé par le moteur de calcul, le texte des pages et `llms.txt`, pour éliminer les incohérences internes (fonctionnaire 11% vs 15%, BNC 24,6% vs 25,6%, ARE 13,11€ vs 13,18€).

```js
// constants-2026.js — à référencer partout, page + moteur + llms.txt
const BAREMES_2026 = {
  smic: {
    au_01_01_2026: { horaire: 12.02, mensuel: 1823.03, annuel: 21876.36 },
    au_01_06_2026: { horaire: 12.31, mensuel: 1867.02, net_estime: 1477.93 } // à reconfirmer sur legifrance/service-public
  },
  pass_2026: 48060,      // PASS annuel — à reconfirmer URSSAF
  pmss_2026: 4005,       // PASS mensuel
  micro_entrepreneur: {
    bnc_taux: 0.261,      // 26,1% — à reconfirmer, PAS 25,6% ni 24,6%
    bic_taux: 0.212,
    vente_taux: 0.123,
    acre_avant_01_07_2026: 0.50,
    acre_apres_01_07_2026: 0.25
  },
  rupture_conventionnelle: {
    contribution_patronale_2026: 0.40 // PAS 30% — à reconfirmer LFSS 2026
  },
  apprenti: {
    seuil_exoneration_avant_01_03_2025: 0.79, // ancien régime, contrats signés avant cette date
    seuil_exoneration_depuis_01_03_2025: 0.50  // nouveau régime — la plupart des cas actuels
  }
};
```
**Avant de déployer** : reconfirmer chaque valeur sur Légifrance, urssaf.fr ou service-public.fr — les valeurs ci-dessus viennent de recherches web tierces et n'ont pas été vérifiées sur la source primaire par cet audit.

### 0.2 — Corriger le SMIC partout (site + llms.txt) et supprimer la ligne de cotisation inventée
**Impact : CRITIQUE | Effort : 2-3h**
- Remplacer 11,88€/1 801,80€ par 12,31€/1 867,02€ (valeur au 1er juin 2026) sur les 9 pages concernées + `llms.txt` + `a-propos`.
- Supprimer la ligne "Prévoyance et autres contributions conventionnelles ~1,16%" sur `/smic-brut-net/` — elle n'a aucune base légale et sert uniquement à forcer le résultat à 22%. Recalculer le net réel à partir des taux légaux.
- Ajouter une frise "1er janvier 2026 : 12,02€ → 1er juin 2026 : 12,31€" pour transformer une faiblesse en contenu à valeur ajoutée (c'est exactement ce que rankent les pages concurrentes de type "actualité").

### 0.3 — Corriger le moteur de calcul ou requalifier la promesse
**Impact : CRITIQUE | Effort : 4-8h (option i) ou 30min (option ii)**
Deux options, à choisir selon le temps disponible :
- **(i) Recommandé à moyen terme** : reconstruire le moteur sur la base PMSS réelle (tranches T1/T2, CSG à 98,25%, RGDU dégressif jusqu'à 3 SMIC) pour que le calcul soit réellement "cotisation par cotisation" comme l'annonce `a-propos`.
- **(ii) Solution immédiate si (i) prend trop de temps** : retirer toute mention "taux officiels", "audité trimestriellement", "rigoureux" tant que le moteur reste un estimateur forfaitaire, et le présenter clairement comme une "estimation simplifiée". Ne jamais publier une déclaration de précision qu'on ne peut pas tenir.

### 0.4 — Nommer un éditeur réel et un responsable de publication
**Impact : CRITIQUE (SEO + conformité légale) | Effort : 1-2h**
- Remplacer "Équipe éditoriale monbrutnet.fr" par une identité réelle (personne physique ou société avec SIREN) dans les mentions légales, conformément à l'article 6-III de la LCEN (numéro de téléphone de l'hébergeur également requis).
- Ajouter un bloc "Rédigé/vérifié par [Nom], [qualification]" sur chaque page calculateur, avec schema `Person` + `reviewedBy`.
- Remplacer "barèmes audités et vérifiés trimestriellement" (affirmation non vérifiable et actuellement fausse) par un changelog daté et vérifiable : "Mise à jour du 27/09/2026 : SMIC 12,31€, RGDU, BNC 26,1%…".

### 0.5 — Corriger les autres chiffres critiques identifiés
**Impact : ÉLEVÉ | Effort : 2-3h**
- Rupture conventionnelle : contribution patronale 40% (pas 30%), PASS 48 060€.
- ACRE auto-entrepreneur : ajouter une condition de date (création avant/après le 1er juillet 2026 → 50%/25%).
- Apprenti : réécrire `/alternance-brut-en-net/` autour du seuil de 50% du SMIC (contrats depuis le 1er mars 2025), en gardant les 79% uniquement pour les contrats antérieurs.
- Fiscalité (PAS) : recalculer avec le barème 2026 + décote — les taux actuels sont surestimés (ex. 11% affiché comme donnant 8% de taux moyen, ce qui est mathématiquement impossible).
- ARE chômage : le "net" affiché est en réalité le brut (oubli de la déduction de 3% + CSG/CRDS) — corriger le calcul.

**Livrable de fin de Phase 0** : republier toutes les pages + `llms.txt` en même temps, pour éviter une période où le site se contredit lui-même entre les figures corrigées et les anciennes encore en cache.

---

## ⚡ Phase 1 : Corrections techniques et mobiles (Semaine 2)

### 1.1 — Corriger le bug de dépassement CSS mobile (Impact : ÉLEVÉ | Effort : 2h)
Sur `/smic-brut-net/` et `/auto-entrepreneur-brut-en-net/`, un élément (probablement une option de menu déroulant longue comme "Prestations de services Libérales BNC (25,6% - Taux 2026)") force son conteneur parent au-delà de 100% de largeur, silencieusement rogné par `overflow-x: hidden`. Ajouter `max-width: 100%` et `box-sizing: border-box` sur les conteneurs de résultat/formulaire pour aligner ces deux pages sur le comportement correct de la page d'accueil.

### 1.2 — Remonter le bouton de calcul et le résultat au-dessus de la ligne de flottaison mobile (Impact : ÉLEVÉ | Effort : 2-3h)
Sur les 3 pages testées, le bouton et le résultat sont entièrement sous la ligne de flottaison (jusqu'à 932px sur un écran de 812px). Déplacer le bloc "Historique des calculs" après les résultats, et afficher un résultat compact directement sous le champ de saisie pour qu'il se mette à jour visible sans défilement.

### 1.3 — Agrandir les cibles tactiles de la navigation (Impact : MOYEN | Effort : 1h)
Liens de nav actuellement à 34-36px de hauteur, lien "Accueil" du fil d'Ariane à 18-20px. Porter à ≥44px de hauteur de zone cliquable (padding, pas nécessairement la taille visible du texte).

### 1.4 — Ajouter un indice de défilement sur la navigation mobile (Impact : FAIBLE | Effort : 1h)
3 des 6 onglets sont masqués par un défilement horizontal sans indice visuel clair. Ajouter un gradient de bord ou un chevron, ou réduire à 3-4 outils prioritaires + un menu "Plus".

### 1.5 — Automatiser la notification IndexNow (Impact : MOYEN | Effort : 1h)
Le fichier-clé IndexNow existe mais rien n'appelle l'API à chaque déploiement. Ajouter un hook de build (Netlify) qui notifie IndexNow à chaque mise à jour de page — bénéfice direct pour Bing/Copilot une fois les corrections de la Phase 0 déployées.

### 1.6 — Ajouter une Content-Security-Policy et un hash SRI sur html2pdf.js (Impact : FAIBLE | Effort : 30min)
Risque de supply-chain mineur mais facile à corriger.

---

## 📈 Phase 2 : Schema et signaux de fraîcheur (Semaine 2-3)

### 2.1 — Corriger le logo Organization (Impact : MOYEN | Effort : 30min)
Remplacer `og-image.jpg` (1193×630, format bannière) par un vrai logo carré (512×512px) dans le schema `Organization`, sur la homepage et `a-propos`.

### 2.2 — Retirer le `sameAs` incorrect (Impact : FAIBLE | Effort : 15min)
Retirer `urssaf.fr` et `service-public.fr` du champ `sameAs` (ce sont des sources citées, pas des profils appartenant au site). Laisser le champ vide jusqu'à l'existence de vrais profils (LinkedIn, etc.).

### 2.3 — Ajouter `dateModified` partout + dates visibles (Impact : ÉLEVÉ pour la confiance | Effort : 2h)
Une fois les chiffres corrigés (Phase 0), ajouter une date de mise à jour visible ("Barèmes vérifiés le 27/09/2026") + `dateModified` en schema sur chaque page. Remplacer les `<lastmod>` identiques du sitemap par des dates réelles de modification.

### 2.4 — Uniformiser le schema WebApplication entre les 12 pages calculateurs (Impact : FAIBLE | Effort : 1h)
Seule la homepage a `description`, `inLanguage` et `publisher` sur son nœud WebApplication — répliquer sur les 12 pages outils.

---

## 🎯 Phase 3 : Combler l'écart de profondeur face aux concurrents (Semaines 3-6)

D'après l'analyse SXO, voici ce que les pages qui rankent aujourd'hui proposent et que monbrutnet.fr n'a pas encore :

### 3.1 — Ajouter des modes de calcul inversé (Impact : ÉLEVÉ | Effort : 1-2 jours)
- Net → Brut sur la homepage
- Net visé → CA nécessaire sur la page Auto-Entrepreneur
- Net visé → TJM nécessaire sur la page TJM Freelance
C'est une fonctionnalité que proposent les concurrents directs (mon-entreprise.urssaf.fr, plusieurs guides freelance) et son absence est citée comme un manque dans 3 des 5 clusters de requêtes analysés.

### 3.2 — Enrichir la page TJM Freelance (Impact : MOYEN | Effort : 1 jour)
70% des résultats pour "TJM freelance brut net" sont des guides longs avec simulateur intégré, pas des outils seuls. Modéliser correctement SASU/EURL (répartition salaire/dividendes, IS à 15%/25%, flat tax), ajouter un exemple chiffré nommé, viser ~2000 mots de contenu sous l'outil.

### 3.3 — Enrichir la page Rupture Conventionnelle (Impact : MOYEN | Effort : 1 jour)
Ajouter un sélecteur de convention collective, le calcul du différé d'indemnisation ARE pour les montants supra-légaux, et le traitement fiscal de ces montants.

### 3.4 — Geler le programme de pages "montant" (2000/2500/3000€) tant qu'elles ne sont pas enrichies (Impact : MOYEN | Effort : décision, pas de code)
Ces 3 pages sont structurellement quasi-identiques (même template, chiffres dérivés du même calcul). Ne pas ajouter de nouvelles pages du même type (1500€, 3500€, 4000€…) avant que chacune apporte une vraie valeur ajoutée (comparaison au salaire médian INSEE, minimums de convention collective, détail ligne par ligne de la fiche de paie). À défaut, envisager de fusionner ces 3 pages en une seule page-tableau "salaires brut en net 2026".

### 3.5 — Réparer le maillage interne (Impact : MOYEN | Effort : 3-4h)
Les pages 2000/2500/3000€ ne reçoivent que 7-8 liens internes contre 38-39 pour les pages outils. Ajouter des liens contextuels depuis le texte des FAQ (ex. la FAQ "rupture" de la page 2500€ devrait lier vers `/rupture-conventionnelle-net/`), unifier les deux blocs de liens actuels, et supprimer les auto-liens (une page qui se lie elle-même).

### 3.6 — Différencier la marque de "monbrutennet.fr" (Impact : MOYEN | Effort : variable)
Un domaine à une lettre de différence rank déjà sur la requête principale. Utiliser un nom de marque distinctif dans les titres/logo (ex. "MonBrutNet" en un mot + tagline), envisager l'achat de domaines typo proches si disponibles.

---

## 🌍 Phase 4 : Construction d'autorité — uniquement après les Phases 0-2 (Semaines 4-16)

Le domaine n'a aucune autorité mesurable (absent de Common Crawl, créé en avril 2026). C'est normal pour un jeune site, mais **toute action de notoriété lancée avant la correction des chiffres et de l'éditeur anonyme est contre-productive** — un journaliste ou une communauté qui découvre un SMIC faux sur un site sans auteur identifié ne relaiera pas, ou pire, le signalera publiquement.

1. **Semaines 4-5** : profils de marque (LinkedIn, X) + soumission mesurée à quelques annuaires français pertinents et réputés (pas de soumission de masse — contre-productive sur un profil de liens encore vide).
2. **Semaines 5-7** : widget/iframe embarquable du calculateur avec lien d'attribution, proposé à des blogs de comptables, RH, CSE, plateformes freelance. C'est le levier identifié comme le plus efficace pour ce type d'outil.
3. **Semaines 6-10** : participation réelle (pas de spam) sur r/vosfinances, r/AutoEntrepreneur, r/france, idéalement synchronisée avec l'actualité des barèmes (ex. la revalorisation du SMIC).
4. **Semaines 8-16** : relations presse / contenu invité vers des médias finance français, uniquement une fois les corrections de contenu en ligne et vérifiables.
5. **Après acquisition des premiers signaux externes** : ajouter Wikidata (nécessite une couverture presse indépendante préalable, ne pas anticiper) et souscrire une clé Moz gratuite pour suivre l'évolution du profil de liens.

---

## 📊 Suivi et mesure

- **Google Search Console** : à configurer en priorité (absent actuellement) — c'est la seule source qui dira si les corrections de la Phase 0 améliorent réellement l'indexation et les positions.
- **Ré-auditer après la Phase 0** : relancer un audit contenu/GEO une fois les chiffres corrigés pour confirmer que les scores E-E-A-T (44) et GEO (53) remontent — ce sont les deux scores qui ont le plus de marge de progression rapide.
- **Ne pas viser la 1ère position sur "salaire brut en net" à court terme** : cet objectif dépend de l'autorité de domaine (Phase 4, plusieurs mois/années). Viser d'abord la 1ère position sur des requêtes de longue traîne moins disputées (ex. "TJM freelance brut net 2026", "indemnité rupture conventionnelle net convention collective") où l'écart d'autorité avec les leaders est plus faible.

---

## Résumé exécutif : par où commencer lundi matin

1. Corriger le SMIC (2 pages + llms.txt) — 2h, impact immédiat sur la requête la plus dangereuse actuellement.
2. Nommer un éditeur réel dans les mentions légales — 1h, obligation légale + confiance.
3. Corriger le bug CSS mobile sur les 2 pages concernées — 2h.
4. Puis dérouler la Phase 0 en entier avant toute nouvelle page ou tout lien externe.
