import React from 'react';
import { ArrowRight, Check, Eye, Sparkles, Star, Crown } from 'lucide-react';
import { Plan, PlanId } from '../types';
import { PLANS } from '../utils/plans';

interface PlansCatalogProps {
  onSelectPlan: (planId: PlanId) => void;
  onOpenQuote: (planId: PlanId) => void;
}

export const PlansCatalog: React.FC<PlansCatalogProps> = ({ onSelectPlan, onOpenQuote }) => {
  return (
    <section id="catalogo" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">
            <span>Catálogo Oficial</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Três Níveis de Criação</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Escolha o nível ideal para o momento da sua empresa
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed text-balance">
            Cada plano foi estruturado com propósito claro. Clique em <strong className="text-white font-medium">Explorar</strong> para navegar na demonstração interativa completa de cada nível.
          </p>
        </div>

        {/* 3 Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const isExtra = plan.id === 'extra';
            const isDeluxe = plan.id === 'deluxe';

            return (
              <div
                key={plan.id}
                className={`flex flex-col rounded-2xl p-6 sm:p-8 transition-all duration-300 relative ${
                  isExtra
                    ? 'bg-gradient-to-b from-blue-950/70 via-slate-900 to-slate-950 border-2 border-blue-500 shadow-2xl shadow-blue-900/30 ring-1 ring-blue-400/20'
                    : isDeluxe
                    ? 'bg-gradient-to-b from-indigo-950/50 via-slate-900 to-slate-950 border border-indigo-700/60 shadow-xl'
                    : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-lg'
                }`}
              >
                {/* Badge if present */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-md ${
                        isExtra
                          ? 'bg-blue-600 text-white shadow-blue-600/40'
                          : 'bg-indigo-600 text-white shadow-indigo-600/40'
                      }`}
                    >
                      {isExtra && <Star className="w-3 h-3 fill-current" />}
                      {isDeluxe && <Crown className="w-3 h-3 fill-current" />}
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div className="mb-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1">
                    Plano {plan.id === 'essencial' ? '01' : plan.id === 'extra' ? '02' : '03'}
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[36px]">{plan.positioning}</p>

                  {/* Price */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Preço de referência:</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono whitespace-nowrap">
                        {plan.priceRef}
                      </span>
                    </div>
                    {plan.pricePeriod && (
                      <div className="text-[11px] text-slate-400 mt-0.5">{plan.pricePeriod}</div>
                    )}
                  </div>
                </div>

                {/* Demo Preview Thumbnail */}
                <div className="mb-6 rounded-xl overflow-hidden border border-slate-800 relative group cursor-pointer"
                  onClick={() => onSelectPlan(plan.id)}
                >
                  <img
                    src={plan.demoSite.heroImage}
                    alt={`Prévia da demonstração do plano ${plan.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center p-3 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/90 text-white text-xs font-medium shadow-md backdrop-blur">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Demonstração Interativa</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2.5 mb-8 flex-1">
                  <div className="text-xs font-semibold text-white uppercase tracking-wider">
                    Principais recursos:
                  </div>
                  {plan.keyDifferentiators.map((diff, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{diff}</span>
                    </div>
                  ))}
                  <div className="text-[11px] text-slate-400 pt-1">
                    + {plan.features.length - plan.keyDifferentiators.length} recursos documentados no escopo
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isExtra
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                        : 'bg-white hover:bg-slate-100 text-slate-950'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenQuote(plan.id)}
                    className="w-full py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 text-xs font-medium transition-colors text-center cursor-pointer"
                  >
                    Solicitar proposta deste plano
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
