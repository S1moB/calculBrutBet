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

## 📋 Phases Restantes (Code-light)

### Phase 3 : Profondeur contenu (Semaines 3-6)
**Non code-intensive** — modifications éditoriales / UI mineure.

À faire :
1. **Modes de calcul inversé** 
   - Homepage : ajouter Net → Brut
   - Auto-Entrepreneur : Net → CA nécessaire
   - TJM : Net → TJM nécessaire
   - *Effort* : 1-2 jours (JS + HTML)

2. **Enrichir TJM Freelance**
   - Modèle SASU/EURL réel (salaire/dividendes, IS 15%/25%, flat tax)
   - Exemple chiffré nommé
   - ~2000 mots de guide sous l'outil
   - *Effort* : 1 jour (contenu + JS)

3. **Enrichir Rupture Conventionnelle**
   - Sélecteur convention collective
   - Calcul différé ARE pour montants supra-légaux
   - Traitement fiscal supra-légal
   - *Effort* : 1 jour (formulaire + calcul)

4. **Geler pages "montant" (2000/2500/3000€)**
   - Ne pas ajouter 1500€, 3500€, etc. tant qu'elles manquent de valeur ajoutée
   - Fusionner les 3 existantes en un tableau s'il n'y a pas de contenu unique
   - *Effort* : architectural (0 code)

5. **Réparer maillage interne**
   - Liens contextuels depuis FAQ vers pages pertinentes
   - Unifier les 2 blocs de liens actuels
   - Retirer auto-liens
   - *Effort* : 3-4h (HTML)

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

| Phase | Indicateur | Baseline | Cible |
|---|---|---|---|
| 0 | Score contenu (audit) | 44/100 | >70/100 (une fois figures vérifiées) |
| 1 | CLS mobile | 0 (bon) | 0 (inchangé) |
| 2 | Schema score | 80/100 | 85/100 |
| 3 | Liens internes par page | 7-8 (tier) | >15 (tier) |
| 4 | Domaines référents | 0 | >5 (fin semaine 12) |

---

## 📌 Commits actuels

```
2a4ffbc  privacy: remove personal name from editor field
da1db46  phase1-2: mobile CSS fixes, schema corrections, dateModified
c4d9e3a  phase0: consolidate core regulatory fixes (SMIC, editor, constants file)
d83d7aa  phase0: update SMIC to 2026 values (12.31€/h, 1867.02€/month)
8c883d2  phase0: add regulatory constants file and name real editor
```

---

## 🚀 Prochaines étapes

Pour Phase 3 :
1. Créer un ticket feature pour chaque mode inversé
2. Tester sur desktop + mobile
3. Ajouter tests unitaires JS pour les calculs inversés

Pour Phase 4 :
1. Créer des comptes LinkedIn/X
2. Faire une liste des 15-20 blogs cibles
3. Écrire la première version du widget

**Consulter `monbrutnet.fr-audit/ACTION-PLAN.md` pour tous les détails.**
