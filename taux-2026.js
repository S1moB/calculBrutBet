/*
 * Barèmes 2026 : source unique des taux utilisés par tous les simulateurs de monbrutnet.fr.
 * Sources : urssaf.fr, service-public.fr, legifrance.gouv.fr, unedic.org.
 */
const TAUX_2026 = {
    smic: { horaire: 12.31, mensuel: 1867.02, annuel: 22404.24, heuresMois: 151.67 }, // depuis le 01/06/2026
    pmss: 4005, // plafond mensuel de la Sécurité sociale 2026

    // Cotisations salariales légales du secteur privé (identiques cadre / non-cadre depuis la fusion Agirc-Arrco de 2019)
    salarie: {
        vieillessePlafonnee: 0.069,   // tranche 1
        vieillesseDeplafonnee: 0.004, // tout le salaire
        agircT1: 0.0315, cegT1: 0.0086,
        agircT2: 0.0864, cegT2: 0.0108,
        cet: 0.0014,                  // dû si le salaire dépasse le PMSS
        apecCadre: 0.00024,           // cadres, jusqu'à 4 PMSS
        csgCrds: 0.097,               // CSG 9,2 % + CRDS 0,5 %
        assietteCsg: 0.9825           // abattement de 1,75 % jusqu'à 4 PMSS
    },
    fonctionnaire: { secuRetraite: 0.10, csgCrds: 0.05 }, // estimation globale ~15 % (pension civile 11,1 %, RAFP, CSG/CRDS)
    apprenti: { seuilDepuis2025: 0.50, seuilAvant2025: 0.79 }, // part du SMIC exonérée selon la date du contrat
    employeur: { nonCadre: 1.42, cadre: 1.45, fonctionnaire: 1.30, alternant: 1.05 }, // coût total / brut, hors allègements

    heuresSup: { reductionSalariale: 0.1131, plafondDefiscalisation: 7500 },
    micro: {
        vente: { urssaf: 0.123, cfp: 0.001, vl: 0.01 },
        bic:   { urssaf: 0.212, cfp: 0.002, vl: 0.017 },
        bnc:   { urssaf: 0.256, cfp: 0.002, vl: 0.022 },
        cipav: { urssaf: 0.232, cfp: 0.002, vl: 0.022 }
    },
    rupture: { contributionPatronale: 0.40 },
    are: { partieFixe: 13.18, tauxFormule1: 0.404, tauxFormule2: 0.57, plafondSjr: 0.75, plancher: 32.13,
           retraiteComp: 0.03, seuilCsg: 61.00, csgCrds: 0.067 }
};

// Taux effectifs des cotisations salariales pour un brut mensuel : { secuRetraite, csgCrds, total }
function tauxSalarie(brutMensuel, statut) {
    if (statut === 'fonctionnaire') {
        const f = TAUX_2026.fonctionnaire;
        return { secuRetraite: f.secuRetraite, csgCrds: f.csgCrds, total: f.secuRetraite + f.csgCrds };
    }
    const b = brutMensuel, p = TAUX_2026.pmss, t = TAUX_2026.salarie;
    if (!(b > 0)) return { secuRetraite: 0, csgCrds: 0, total: 0 };
    const t1 = Math.min(b, p);
    const t2 = Math.min(Math.max(b - p, 0), 7 * p);
    let retraite = t1 * (t.vieillessePlafonnee + t.agircT1 + t.cegT1)
        + b * t.vieillesseDeplafonnee
        + t2 * (t.agircT2 + t.cegT2)
        + (b > p ? Math.min(b, 8 * p) * t.cet : 0);
    if (statut === 'cadre') retraite += Math.min(b, 4 * p) * t.apecCadre;
    const csg = (Math.min(b, 4 * p) * t.assietteCsg + Math.max(b - 4 * p, 0)) * t.csgCrds;
    return { secuRetraite: retraite / b, csgCrds: csg / b, total: (retraite + csg) / b };
}

function brutMensuelEquivalent(brut, periode) {
    return periode === 'annuel' ? brut / 12 : periode === 'horaire' ? brut * TAUX_2026.smic.heuresMois : brut;
}

// Cotisations salariales en euros, dans la même période que le brut saisi
function cotisationsSalariales(brut, periode, statut, contratApprenti) {
    const m = brutMensuelEquivalent(brut, periode);
    if (!(m > 0)) return { secuRetraite: 0, csgCrds: 0, total: 0 };
    const k = brut / m;
    if (statut === 'alternant') {
        const ancien = contratApprenti === 'avant2025';
        const seuil = TAUX_2026.smic.mensuel * (ancien ? TAUX_2026.apprenti.seuilAvant2025 : TAUX_2026.apprenti.seuilDepuis2025);
        const exces = Math.max(m - seuil, 0);
        const t = tauxSalarie(m, 'nonCadre');
        const sr = exces * t.secuRetraite;
        const csg = ancien ? 0 : exces * t.csgCrds; // contrats avant le 01/03/2025 : pas de CSG/CRDS
        return { secuRetraite: sr * k, csgCrds: csg * k, total: (sr + csg) * k };
    }
    const t = tauxSalarie(m, statut);
    return { secuRetraite: brut * t.secuRetraite, csgCrds: brut * t.csgCrds, total: brut * t.total };
}

if (typeof module !== 'undefined') module.exports = { TAUX_2026, tauxSalarie, cotisationsSalariales };
