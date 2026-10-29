export type PlanId = 'essencial' | 'extra' | 'deluxe';

export type DeviceMode = 'desktop' | 'mobile';

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  badge?: string;
  priceRef: string;
  priceFormatted: string;
  pricePeriod?: string;
  positioning: string;
  description: string;
  features: string[];
  keyDifferentiators: string[];
  ctaLabel: string;
  demoSite: {
    name: string;
    segment: string;
    description: string;
    heroImage: string;
    featuresSample: string[];
  };
}

export interface ComparisonRow {
  feature: string;
  essencial: string;
  extra: string;
  deluxe: string;
  category?: string;
}

export interface QuoteFormData {
  name: string;
  company: string;
  whatsapp: string;
  planId: PlanId;
  businessType: string;
  projectDescription: string;
}

export interface FormErrors {
  name?: string;
  company?: string;
  whatsapp?: string;
  businessType?: string;
  projectDescription?: string;
}

export interface CommercialConfig {
  agencyName: string;
  whatsappNumber: string;
  whatsappNumberDisplay: string;
  email: string;
  city: string;
  operatingHours: string;
}
