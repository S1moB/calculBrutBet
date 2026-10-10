// node tests/taux-2026.test.js
const assert = require('assert');
const { tauxSalarie, cotisationsSalariales } = require('../taux-2026.js');
const net = (b, s, c) => Math.round((b - cotisationsSalariales(b, 'mensuel', s, c).total) * 100) / 100;

assert.strictEqual(net(1867.02, 'nonCadre'), 1477.93);          // SMIC net officiel 2026
assert.ok(Math.abs(tauxSalarie(2000, 'nonCadre').total - 0.208403) < 1e-6);
assert.ok(tauxSalarie(2000, 'cadre').total > tauxSalarie(2000, 'nonCadre').total); // APEC
assert.ok(tauxSalarie(6000, 'cadre').total < tauxSalarie(3000, 'cadre').total);    // tranche 2 moins chargée que T1 + CSG
assert.strictEqual(net(900, 'alternant'), 900);                  // sous 50 % du SMIC : brut = net
assert.strictEqual(net(1474.95, 'alternant', 'avant2025'), 1474.95);
assert.ok(net(1867.02, 'alternant') < net(1867.02, 'alternant', 'avant2025'));
const h = cotisationsSalariales(12.31, 'horaire', 'nonCadre').total, m = cotisationsSalariales(1867.02, 'mensuel', 'nonCadre').total;
assert.ok(Math.abs(h * 151.67 - m) < 0.01);                      // horaire et mensuel cohérents
console.log('taux-2026: ok');
