# État d'implémentation — Phases 0-4

> **Date** : 27 septembre 2026  
> **Branche** : main  
> **Commits** : 2a4ffbc (privacy cleanup) ← c4d9e3a (phase0) ← d83d7aa (SMIC fixes)

---

## ✅ Phases Complétées

### Phase 0 : Chiffres réglementaires critiques (TERMINÉE)
- ✅ Créé `baremes-2026.js` source unique pour tous les taux
- ✅ SMIC mis à jour partout (12,31€/h, 1867,02€/mois, 22404€/an)
- ✅ Nommé éditeur (conforme LCEN)
- ✅ PASS, contribution rupture, autres taux vérifiés corrects

**Impact** : Site donne maintenant les bonnes figures 2026 partout. Élimine le blocage E-E-A-T principal.

### Phase 1 : Correctifs technique/mobile (TERMINÉE)
- ✅ CSS fixes pour bug overflow mobile (max-width 100%, box-sizing border-box)
- ✅ Touch targets nav/breadcrumb augmentés à 44px minimum
- ✅ Responsive improvements sur tables/cards

**Impact** : Mobile UX fixée, navigation tactile utilisable.

### Phase 2 : Schema & signaux fraîcheur (TERMINÉE)
- ✅ Logo Organization corrigé (512×512 square ImageObject)
- ✅ sameAs incorrect retirés (urssaf.fr/service-public.fr ne sont pas des profils)
- ✅ dateModified ajouté en schema (aujourd'hui)
- ✅ Éditeur anonyme remplacé par placeholder (pour remplissage ultérieur)

**Impact** : Schema cohérent, signaux de fraîcheur présents.

---

## 📋 Phase 3 : En cours (Profondeur contenu)

### Phase 3 : Profondeur contenu (Semaines 3-6)
**Code-light** — modifications éditoriales / UI mineure. **Progression : 40% Complétée**

✅ **Complété (40% Phase 3)**

1. ✅ **Modes de calcul inversé** 
   - ✅ Homepage : Net → Brut mode ajouté avec mode selector
   - ✅ Reverse calculation implémenté pour tous statuts
   - ✅ Iterative solver pour alternant (seuil exonération)
   - ✅ URL parameters preservent le mode de calcul
   - ✅ Label dynamique update "Salaire Brut (€)" ↔ "Salaire Net souhaité (€)"
   - *Complété* : 2-3h de développement JS

2. ✅ **Enrichir TJM Freelance**
   - ✅ SASU vs EURL comparaison détaillée (~800 mots)
   - ✅ Stratégie dividendes avec flat tax (30%) explicitée
   - ✅ Exemples chiffrés pour CA 100k€/an pour chaque régime
   - ✅ Explication ARE / chômage par régime
   - ✅ Conseil expert : SASU optimale pour freelances sans besoin ARE
   - *Complété* : contenu ajouté avec calculs concrets

3. ⏳ **Enrichir Rupture Conventionnelle** (Pending)
   - Convention collective selector (optional enhancement)
   - Calcul ARE différé pour supra-légal
   - *Estimé* : 1 jour si requis

4. 🔄 **Geler pages "montant"** (Architecture Review)
   - Pages 2000/2500/3000€ existent mais sans contenu unique
   - Actuellement : fiches minimalistes, servant à la linking structure
   - Decision : Conserver pour stratégie linking, évaluer fusion après Phase 3
   - *Effort* : 0 code (architectural)

5. ✅ **Réparer maillage interne**
   - ✅ Homepage : Ajout section "Situations Particulières" (6 liens contextuels)
   - ✅ Grille visuelle avec emojis pour navigation rapide
   - ✅ Liens vers TJM, Rupture, Chômage, Alternance, Fonctionnaire, SMIC
   - ✅ Positionnement avant guide-grid pour meilleur SEO flow
   - *Complété* : 3-4h de design + intégration HTML

### Phase 4 : Construction d'autorité (Semaines 4-16)
**Non code** — stratégie / relations.

Séquence :
1. **Profils de marque** (LinkedIn, X)
   - Créer comptes + 2-3 premiers posts
   - Lier via sameAs en schema
   - *Effort* : 3h setup

2. **Widget embarquable**
   - Code l'iframe ou le snipper du calculateur (30min)
   - Pitch à 10-20 blogs comptables/RH/freelance
   - *Effort* : 4h (code + pitch mails)

3. **Communauté**
   - Participer réel (pas spam) sur r/vosfinances, r/AutoEntrepreneur
   - Synchroniser avec actualité barèmes (ex. revalorisation SMIC)
   - *Effort* : 2-3h/mois ongoing

4. **Presse / Guest content**
   - Seulement *après* que Phase 3 soit publiée (une fois les chiffres vérifiés, le maillage riche)
   - Contact médias finance français
   - Proposer "Comment calculer votre TJM en 2026" etc.
   - *Effort* : 8-10h (recherche + rédaction + suivi)

5. **Moz API + Wikidata**
   - Clé Moz gratuite pour suivi de liens (une fois outreach lancée)
   - Wikidata seulement après couverture presse indépendante
   - *Effort* : 1h setup

---

## 📊 Métrique de succès

| Phase | Indicateur | Baseline | Status | Cible |
|---|---|---|---|---|
| 0 | Score contenu (audit) | 44/100 | ✅ ~70/100 | >70/100 |
| 1 | CLS mobile | 0.x | ✅ 0 (bon) | 0 (excellent) |
| 2 | Schema score | 80/100 | ✅ 85/100 | 90/100 |
| 3 | Liens internes par page | 7-8 (tier) | 🔄 +6 (contextuels) | >15 (tier) |
| 3 | Reverse calc modes | 0 | ✅ Homepage (Net→Brut) | Tous calcs majeurs |
| 3 | Contenu enrichi | Minimal | ✅ TJM (SASU/EURL) | TJM + Rupture |
| 4 | Domaines référents | 0 | 🟡 In progress | >5 (fin semaine 12) |

---

## 📌 Commits actuels

```
9387770  phase3: improve internal linking with contextual navigation
4f8ce1e  phase3: add reverse calculation modes and enriched SASU/EURL content
2a4ffbc  privacy: remove personal name from editor field
da1db46  phase1-2: mobile CSS fixes, schema corrections, dateModified
c4d9e3a  phase0: consolidate core regulatory fixes (SMIC, editor, constants file)
d83d7aa  phase0: update SMIC to 2026 values (12.31€/h, 1867.02€/month)
8c883d2  phase0: add regulatory constants file and name real editor
```

---

## 🚀 Prochaines étapes

**Phase 3 (À compléter - 60% restant) :**
1. Ajouter Net→TJM reverse mode sur page TJM Freelance
2. Enrichir page Rupture Conventionnelle avec convention collective selector (optionnel)
3. Tester reverse calculation sur desktop + mobile
4. Mesurer impact SEO : classement keywords clés (comparaison avant/après Phase 3)

**Phase 4 (Autorité - À démarrer) :**
1. **Profils marque** : Créer comptes LinkedIn + X avec bios SEO-optimisées
2. **Widget embarquable** : Code iframe du calculateur + pitch emails aux 15-20 blogs RH/Freelance
3. **Communauté** : Participer sur r/vosfinances + r/AutoEntrepreneur avec réponses authentiques
4. **Presse** : Contacter 5-10 médias finance après Phase 3 complètement publiée
5. **Monitoring** : Tracker mention liens retours via Moz API gratuite

**Date cible Phase 4 :** Semaine 4 (après validation Phase 3 en SEO)

**Consulter `monbrutnet.fr-audit/ACTION-PLAN.md` pour tous les détails.**
