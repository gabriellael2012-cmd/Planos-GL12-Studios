import test from 'node:test';
import assert from 'node:assert/strict';
import { PLANS, getPlanById, getNextPlan, getPrevPlan, COMPARISON_ROWS, FAQ_ITEMS } from './plans';

test('PLANS catalog contains exactly Essencial, Extra and Deluxe with correct prices', () => {
  assert.equal(PLANS.length, 3);

  const essencial = getPlanById('essencial');
  assert.ok(essencial);
  assert.equal(essencial?.priceRef, 'R$ 850');
  assert.ok(essencial?.features.length >= 10);

  const extra = getPlanById('extra');
  assert.ok(extra);
  assert.equal(extra?.priceRef, 'R$ 1.500');
  assert.equal(extra?.badge, 'MAIS RECOMENDADO');

  const deluxe = getPlanById('deluxe');
  assert.ok(deluxe);
  assert.equal(deluxe?.priceRef, 'R$ 2.000 a R$ 5.000');
  assert.equal(deluxe?.badge, 'EXPERIÊNCIA EXCLUSIVA');
});

test('Plan cycle navigation moves between tiers correctly', () => {
  const nextFromEssencial = getNextPlan('essencial');
  assert.equal(nextFromEssencial.id, 'extra');

  const nextFromExtra = getNextPlan('extra');
  assert.equal(nextFromExtra.id, 'deluxe');

  const nextFromDeluxe = getNextPlan('deluxe');
  assert.equal(nextFromDeluxe.id, 'essencial');

  const prevFromEssencial = getPrevPlan('essencial');
  assert.equal(prevFromEssencial.id, 'deluxe');
});

test('Comparison rows and FAQ have required entries', () => {
  assert.ok(COMPARISON_ROWS.length >= 10);
  assert.ok(FAQ_ITEMS.length >= 10);
});
