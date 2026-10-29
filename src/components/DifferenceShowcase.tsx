import React, { useState } from 'react';
import { Sparkles, Layers, ArrowRight, CheckCircle2, Shield, Eye } from 'lucide-react';
import { PlanId } from '../types';

interface DifferenceShowcaseProps {
  onSelectPlan: (planId: PlanId) => void;
}

export const DifferenceShowcase: React.FC<DifferenceShowcaseProps> = ({ onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<PlanId>('extra');

  const comparisons = {
    essencial: {
      name: 'Essencial',
      price: 'R$ 850',
      tagline: 'Simples, organizada e funcional',
      image: '/src/assets/images/demo_essencial_clinic_1793290223891.jpg',
      demoTitle: 'Clínica Alvorada — Fisioterapia & Bem-Estar',
      focus: 'Foco em clareza, contato ágil e objetividade para início seguro.',
      points: [
        'Arquitetura de conteúdo direta: apresentação, serviços e contato',
        'Carregamento instantâneo e layout 100% responsivo',
        'Botão direto para conversa no WhatsApp e formulário simples',
        'SEO essencial com títulos e estrutura semântica limpa',
      ],
      idealFor: 'Profissionais liberais, consultórios e prestadores de serviços locais.',
    },
    extra: {
      name: 'Extra',
      price: 'R$ 1.500',
      badge: 'MAIS RECOMENDADO',
      tagline: 'Refinada, elegante e comercialmente mais forte',
      image: '/src/assets/images/demo_extra_arch_1793290225566.jpg',
      demoTitle: 'Nexus Studio — Arquitetura Contemporânea',
      focus: 'Foco em autoridade visual, microinterações e conversão de clientes.',
      points: [
        'Hero section com direção de arte editorial de alto impacto',
        'Microinterações suaves e filtros dinâmicos de portfólio',
        'Métricas e provas de processo estruturadas em 4 etapas',
        'SEO on-page aprofundado e refinamento ergonômico mobile',
      ],
      idealFor: 'Empresas consolidadas, escritórios técnicos e marcas em expansão comercial.',
    },
    deluxe: {
      name: 'Deluxe',
      price: 'R$ 2.000 a R$ 5.000',
      badge: 'EXPERIÊNCIA EXCLUSIVA',
      tagline: 'Exclusiva, sofisticada e tecnicamente avançada',
      image: '/src/assets/images/demo_deluxe_luxury_1793290224788.jpg',
      demoTitle: 'Aura Private Estates & Signature Pavilions',
      focus: 'Foco em diferenciação radical, direção sob medida e tecnologia 3D.',
      points: [
        'Visualizador tridimensional interativo com rotação em 360° e controle de luz',
        'Direção de arte cinematográfica concebida sob medida',
        'SEO técnico completo com Schema.org e foco em Core Web Vitals',
        'Curadoria visual e sensorial projetada para público de altíssimo padrão',
      ],
      idealFor: 'Empreendimentos de luxo, marcas autorais e projetos de posicionamento premium.',
    },
  };

  const current = comparisons[activeTab];

  return (
    <section id="diferenca" className="py-20 lg:py-24 border-b border-slate-800/80 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">
            <span>Seção Visual</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Veja a Diferença</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Compare o nível de refinamento lado a lado
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 text-balance">
            A evolução entre os três níveis é perceptível no primeiro olhar: composição, tipografia, profundidade e acabamento técnico.
          </p>

          {/* Interactive Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
            {(['essencial', 'extra', 'deluxe'] as PlanId[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {comparisons[tab].name} ({comparisons[tab].price})
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Comparison Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Thumbnail */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-lg group">
                <img
                  src={current.image}
                  alt={`Demonstração visual do nível ${current.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-84 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <span className="font-semibold">{current.demoTitle}</span>
                  <span className="font-mono text-blue-400">{current.price}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Captura autêntica do ambiente demonstrativo</span>
                <button
                  type="button"
                  onClick={() => onSelectPlan(activeTab)}
                  className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Abrir demonstração ao vivo</span>
                </button>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Nível {current.name}
                  </span>
                  {current.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {current.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {current.tagline}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {current.focus}
                </p>
              </div>

              {/* Distinguishing Features */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold text-white uppercase tracking-wider">
                  Diferenciais deste nível:
                </div>
                {current.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Ideal For Box */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <span className="font-semibold text-white block mb-0.5">Indicado para:</span>
                <span className="text-slate-400">{current.idealFor}</span>
              </div>

              {/* CTA Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectPlan(activeTab)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-blue-600/30 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explorar demonstração do {current.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
