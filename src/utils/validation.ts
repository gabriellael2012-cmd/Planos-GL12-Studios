import { FormErrors, Plan, QuoteFormData } from '../types';

export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function validateQuoteForm(data: QuoteFormData): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = 'Por favor, informe seu nome completo (mínimo 3 caracteres).';
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.company = 'Informe o nome da sua empresa ou negócio.';
  }

  const rawDigits = sanitizePhoneNumber(data.whatsapp);
  if (!rawDigits || rawDigits.length < 10 || rawDigits.length > 13) {
    errors.whatsapp = 'Informe um número de WhatsApp válido com DDD (ex: 11 99999-8888).';
  }

  if (!data.businessType || data.businessType.trim().length < 3) {
    errors.businessType = 'Informe o ramo ou segmento de atuação.';
  }

  if (!data.projectDescription || data.projectDescription.trim().length < 10) {
    errors.projectDescription = 'Descreva brevemente o projeto (mínimo 10 caracteres).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateReferenceCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'GL12-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function formatWhatsAppMessage(data: QuoteFormData, plan?: Plan, refCode?: string): string {
  const code = refCode || generateReferenceCode();
  const planName = plan ? `${plan.name} (${plan.priceRef})` : data.planId.toUpperCase();

  const lines = [
    `*NOVA SOLICITAÇÃO DE PROJETO — GL12 STUDIOS*`,
    `Ref: #${code}`,
    `--------------------------------------`,
    `*Nome:* ${data.name.trim()}`,
    `*Empresa:* ${data.company.trim()}`,
    `*WhatsApp:* ${data.whatsapp.trim()}`,
    `*Segmento:* ${data.businessType.trim()}`,
    `*Plano Desejado:* ${planName}`,
    `--------------------------------------`,
    `*Resumo do Projeto:*`,
    `${data.projectDescription.trim()}`,
    `--------------------------------------`,
    `_Enviado pelo Catálogo Interativo GL12 Studios_`,
  ];

  return lines.join('\n');
}

export function buildWhatsAppLink(whatsappNumberDigits: string, text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${whatsappNumberDigits}?text=${encoded}`;
}
