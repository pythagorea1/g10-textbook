// Verify quiz data integrity. Run from anywhere: node data/quiz/_verify.js
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const QUIZ_DIR = path.join(ROOT, 'data', 'quiz');
const COUNTRIES = ['us', 'eurozone', 'japan', 'uk', 'switzerland', 'australia', 'newzealand', 'canada', 'sweden', 'norway'];
const VALID_COUNTRY = new Set(COUNTRIES.concat('general'));

global.window = {};
const files = fs.readdirSync(QUIZ_DIR).filter((f) => /^q_.*\.js$/.test(f));
for (const f of files) require(path.join(QUIZ_DIR, f));

let total = 0;
let errors = 0;
const perCountry = {};
const ids = new Set();

for (const [g, arr] of Object.entries(global.window)) {
  for (const q of arr) {
    total++;
    if (ids.has(q.id)) { console.error(`DUP ID: ${q.id}`); errors++; }
    ids.add(q.id);
    if (!q.related) { console.error(`${q.id}: missing related`); errors++; continue; }
    if (!fs.existsSync(path.join(ROOT, q.related))) {
      console.error(`${q.id}: related target missing -> ${q.related}`); errors++;
    }
    if (!q.country || !VALID_COUNTRY.has(q.country)) {
      console.error(`${q.id}: invalid country -> ${q.country}`); errors++;
    }
    const seg = q.related.split('/')[0];
    const expect = COUNTRIES.includes(seg) ? seg : 'general';
    if (q.country !== expect) { console.error(`${q.id}: country ${q.country} != derived ${expect}`); errors++; }
    if (!Array.isArray(q.choices) || q.choices.length !== 5) { console.error(`${q.id}: choices != 5`); errors++; }
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 4) { console.error(`${q.id}: bad answer`); errors++; }
    perCountry[q.country] = (perCountry[q.country] || 0) + 1;
  }
}

console.log(`TOTAL=${total} (expect 240)`);
console.log('PER-COUNTRY:', JSON.stringify(perCountry, null, 0));
if (total !== 240) { console.error('TOTAL MISMATCH'); errors++; }
if (errors) { console.error(`ERRORS=${errors}`); process.exit(1); }
console.log('ALL CHECKS PASSED');
