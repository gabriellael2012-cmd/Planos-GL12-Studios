import test from 'node:test';
import assert from 'node:assert/strict';
import { validateQuoteForm, sanitizePhoneNumber, formatWhatsAppMessage, buildWhatsAppLink } from './validation';
import { PLANS } from './plans';

test('validates incomplete quote form and catches missing fields', () => {
  const result = validateQuoteForm({
    name: '',
    company: '',
    whatsapp: '',
    planId: 'extra',
    businessType: '',
    projectDescription: '',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.company);
  assert.ok(result.errors.whatsapp);
  assert.ok(result.errors.businessType);
  assert.ok(result.errors.projectDescription);
});

test('validates correct quote form data successfully', () => {
  const result = validateQuoteForm({
    name: 'Carlos Mendes',
    company: 'Mendes Engenharia',
    whatsapp: '(11) 98765-4321',
    planId: 'extra',
    businessType: 'Construção Civil',
    projectDescription: 'Reformulação total do site institucional com portfólio de obras.',
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('sanitizes phone number and builds valid whatsapp URL', () => {
  const clean = sanitizePhoneNumber('+55 (11) 98765-4321');
  assert.equal(clean, '5511987654321');

  const extraPlan = PLANS.find((p) => p.id === 'extra');
  const message = formatWhatsAppMessage(
    {
      name: 'Carlos Mendes',
      company: 'Mendes Engenharia',
      whatsapp: '11987654321',
      planId: 'extra',
      businessType: 'Construção Civil',
      projectDescription: 'Site institucional moderno.',
    },
    extraPlan,
    'TEST1'
  );

  assert.ok(message.includes('Mendes Engenharia'));
  assert.ok(message.includes('Extra (R$ 1.500)'));
  assert.ok(message.includes('Ref: #TEST1'));

  const link = buildWhatsAppLink('5511999991212', message);
  assert.ok(link.startsWith('https://wa.me/5511999991212?text='));
});
