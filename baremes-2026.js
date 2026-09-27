/**
 * Barèmes 2026 — Source unique de vérité pour tous les taux réglementaires
 * À utiliser dans le moteur de calcul, les pages et llms.txt
 * Dernière vérification : 27/09/2026
 * Sources : Légifrance, URSSAF, service-public.gouv.fr
 */

const BAREMES_2026 = {
  // SMIC 2026 — deux paliers
  smic: {
    au_01_01_2026: {
      horaire: 12.02,
      mensuel: 1823.03,
      annuel: 21876.36,
      note: "Valeur du 1er janvier 2026"
    },
    au_01_06_2026: {
      horaire: 12.31,
      mensuel: 1867.02,
      annuel: 22404.24,
      net_estime: 1477.93,
      note: "Valeur du 1er juin 2026 — À UTILISER actuellement"
    }
  },

  // PASS (Plafond Annuel de la Sécurité Sociale) 2026
  pass: {
    annuel: 48060,
    mensuel: 4005,
    note: "Source : URSSAF, arrêté 2026"
  },

  // Micro-entrepreneur 2026
  micro_entrepreneur: {
    bnc_taux: 0.261,  // 26,1% depuis 2026
    bic_taux: 0.212,  // 21,2% depuis 2024
    vente_taux: 0.123, // 12,3% depuis 2024
    acre_avant_01_07_2026: 0.50,  // 50% si créé avant le 1er juillet 2026
    acre_depuis_01_07_2026: 0.25, // 25% si créé après le 1er juillet 2026
    notes: {
      bnc: "26,1% pour les prestations/services libérales, y compris les SARL",
      ace: "ACRE simplifiée depuis le 1er juillet 2026"
    }
  },

  // Rupture conventionnelle 2026
  rupture_conventionnelle: {
    contribution_patronale: 0.40, // 40% depuis le 1er janvier 2026
    pass_seuil_exoneration: 2 * 48060, // 96 120 € d'exonération (2 × PASS)
    note: "Contribution patronale unique portée de 30% à 40% en 2026"
  },

  // Apprenti 2026
  apprenti: {
    ancien_regime: {
      seuil_exoneration: 0.79, // 79% du SMIC
      seuil_csg_crds: 0.79,
      periode: "Contrats signés avant le 1er mars 2025"
    },
    nouveau_regime: {
      seuil_exoneration: 0.50, // 50% du SMIC
      seuil_csg_crds: 0.50,
      periode: "Contrats signés depuis le 1er mars 2025",
      note: "Exonération de cotisations limitée à 50% du SMIC ; CSG/CRDS due sur la partie excédentaire"
    }
  },

  // Fonctionnaire 2026
  fonctionnaire: {
    taux_retenue: 0.11,  // ~11% (retenue sur traitement + CSG/CRDS)
    note: "Approximation. Le calcul exact dépend de la caisse de retraite."
  },

  // Salariat non-cadre 2026 (estimé)
  salaire_non_cadre: {
    taux_forfaitaire: 0.22, // ~22% (estimation, voir note)
    note: "Taux forfaitaire approximatif incluant cotisations + CSG/CRDS. Le vrai taux dépend de la tranche PASS."
  },

  // Salariat cadre 2026 (estimé)
  salaire_cadre: {
    taux_forfaitaire: 0.22, // ~22,2% depuis la fusion Agirc-Arrco 2019
    apec_taux: 0.00024,
    note: "L'écart avec le non-cadre est minimal (~0,024%) — la majorité provient de l'APEC."
  },

  // ARE (Allocation de Retour à l'Emploi) 2026
  chomage_are: {
    formule_1: { taux: 0.404, fixe: 13.18 }, // 40,4% + 13,18€/jour
    formule_2: { taux: 0.57 },                // 57% tout compris
    deduction_retraite: 0.03,                 // 3% du SJR prélevés à titre de contribution retraite
    csg_crds: { taux: 0.098, base: 0.9825 }, // 9,8% sur 98,25% de l'ARE brute
    note: "À reconfirmer avec Unédic 2025/2026"
  },

  // Heures supplémentaires 2026 (régime TEPA/MUES)
  heures_supplementaires: {
    majoration_25: 0.25,     // 25%
    majoration_50: 0.50,     // 50%
    defiscalisation_cap: 7500, // €/an, plafond de défiscalisation loi TEPA
    exoneration_cotisations: 0.1131, // ~11,31% d'exonération de cotisations salariales
    note: "Régime en vigueur depuis la loi MUES 2018 / LFSS 2019"
  },

  // Prélèvement à la source (PAS) — barème 2026 estimé
  pas: {
    baremes_2025: [
      { min: 0, max: 10225, taux: 0 },
      { min: 10225, max: 25370, taux: 0.05 },
      { min: 25370, max: 71898, taux: 0.11 },
      { min: 71898, max: 152260, taux: 0.24 },
      { min: 152260, max: Infinity, taux: 0.45 }
    ],
    note: "Barème 2025 (revenus 2024) — les valeurs 2026 n'étaient pas confirmées à la date de cet audit"
  }
};

// Exporter pour utilisation en Node.js / test
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BAREMES_2026;
}
