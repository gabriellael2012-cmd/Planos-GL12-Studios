import React from 'react';
import { ArrowRight, Layers, CheckCircle2, Sparkles, Monitor, Smartphone } from 'lucide-react';
import { PlanId } from '../types';

interface HeroProps {
  onExplorePlans: () => void;
  onComparePlans: () => void;
  onSelectPlan: (planId: PlanId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePlans, onComparePlans, onSelectPlan }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-18 lg:pt-16 lg:pb-24 border-b border-slate-800/80">
      {/* Subtle Atmospheric Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/10 via-blue-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Natural human kicker (no pills) */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-blue-400 mb-4 tracking-wide uppercase">
            <span>GL12 Studios</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Catálogo Interativo de Experiências Web</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
            Seu próximo site merece um{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200">
              nível acima
            </span>
            .
          </h1>

          {/* Complementary Text */}
          <p className="mt-5 text-base sm:text-lg text-slate-300 font-normal leading-relaxed text-balance max-w-2xl mx-auto">
            Três níveis de criação. Uma única missão: transformar sua presença digital em uma experiência profissional, estratégica e preparada para crescer.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={onExplorePlans}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-700/30 hover:shadow-blue-600/50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explorar os planos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onComparePlans}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/70 font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Comparar os planos</span>
              <Layers className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          {/* Value proof indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Demonstrações reais e funcionais</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Sem templates descartáveis</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Valores claros e transparentes</span>
            </span>
          </div>
        </div>

        {/* Visual Showcase: Real Displays Composition */}
        <div className="mt-12 lg:mt-16 relative">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl p-2 sm:p-4">
            <div className="relative rounded-xl overflow-hidden aspect-video max-h-[520px] w-full">
              <img
                src="/src/assets/images/hero_web_showcase_1793290223674.jpg"
                alt="Demonstração visual de interfaces web desenvolvidas pela GL12 Studios em telas desktop e smartphone"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Interactive Quick-Jump Strip Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-medium text-white">Navegue pelas demonstrações interativas:</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onSelectPlan('essencial')}
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors text-center font-medium cursor-pointer"
                  >
                    Essencial · R$ 850
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectPlan('extra')}
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white font-medium transition-colors text-center cursor-pointer shadow-sm shadow-blue-500/30"
                  >
                    Extra · R$ 1.500
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectPlan('deluxe')}
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors text-center font-medium cursor-pointer"
                  >
                    Deluxe · 2k–5k
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
