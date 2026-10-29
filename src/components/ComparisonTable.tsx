import React, { useState } from 'react';
import { COMPARISON_ROWS, PLANS } from '../utils/plans';
import { PlanId } from '../types';
import { Check, ArrowRight, Star, Crown } from 'lucide-react';

interface ComparisonTableProps {
  onSelectPlan: (planId: PlanId) => void;
  onOpenQuote: (planId: PlanId) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onSelectPlan, onOpenQuote }) => {
  const [mobileSelectedTab, setMobileSelectedTab] = useState<PlanId>('extra');

  return (
    <section id="comparacao" className="py-20 lg:py-28 border-b border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">
            <span>Matriz Comparativa</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Transparência Total</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Qual nível faz sentido para sua empresa?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed text-balance">
            Compare com precisão os critérios técnicos, o nível de personalização e o escopo de entrega de cada projeto.
          </p>
        </div>

        {/* Desktop Comparison Table (Hidden on small screens) */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70">
                <th className="py-6 px-6 text-sm font-semibold text-slate-300 w-1/4">
                  Recurso / Critério
                </th>

                {/* Essencial Column Header */}
                <th className="py-6 px-6 text-left w-1/4">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Plano 01</div>
                  <div className="text-xl font-bold text-white mt-0.5">Essencial</div>
                  <div className="text-sm font-mono text-blue-400 font-semibold mt-1">R$ 850</div>
                  <button
                    type="button"
                    onClick={() => onSelectPlan('essencial')}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer w-full"
                  >
                    Ver Demonstração
                  </button>
                </th>

                {/* Extra Column Header (Highlighted) */}
                <th className="py-6 px-6 text-left w-1/4 bg-blue-950/30 border-x border-blue-500/30 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider shadow">
                    Mais Recomendado
                  </span>
                  <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Plano 02</div>
                  <div className="text-xl font-bold text-white mt-0.5">Extra</div>
                  <div className="text-sm font-mono text-blue-400 font-semibold mt-1">R$ 1.500</div>
                  <button
                    type="button"
                    onClick={() => onSelectPlan('extra')}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer w-full shadow-md shadow-blue-600/30"
                  >
                    Ver Demonstração
                  </button>
                </th>

                {/* Deluxe Column Header */}
                <th className="py-6 px-6 text-left w-1/4">
                  <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">Plano 03</div>
                  <div className="text-xl font-bold text-white mt-0.5">Deluxe</div>
                  <div className="text-sm font-mono text-indigo-300 font-semibold mt-1">R$ 2.000 a R$ 5.000</div>
                  <button
                    type="button"
                    onClick={() => onSelectPlan('deluxe')}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer w-full"
                  >
                    Ver Demonstração
                  </button>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80 text-xs text-slate-300">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-900/70'}>
                  <td className="py-4 px-6 font-medium text-white">{row.feature}</td>
                  <td className="py-4 px-6">{row.essencial}</td>
                  <td className="py-4 px-6 bg-blue-950/20 border-x border-blue-500/20 font-medium text-slate-100">
                    {row.extra}
                  </td>
                  <td className="py-4 px-6 text-slate-200">{row.deluxe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Segmented interactive cards */}
        <div className="lg:hidden space-y-6">
          <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            {(['essencial', 'extra', 'deluxe'] as PlanId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setMobileSelectedTab(id)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all capitalize ${
                  mobileSelectedTab === id
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase text-blue-400 font-semibold tracking-wider">
                  Plano {mobileSelectedTab.toUpperCase()}
                </span>
                <div className="text-2xl font-bold text-white mt-0.5">
                  {PLANS.find((p) => p.id === mobileSelectedTab)?.name}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Investimento ref.</div>
                <div className="text-lg font-mono font-bold text-blue-400">
                  {PLANS.find((p) => p.id === mobileSelectedTab)?.priceRef}
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-800 text-xs">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="py-3 flex items-start justify-between gap-4">
                  <span className="text-slate-400 font-medium">{row.feature}:</span>
                  <span className="text-right font-medium text-slate-200">
                    {mobileSelectedTab === 'essencial'
                      ? row.essencial
                      : mobileSelectedTab === 'extra'
                      ? row.extra
                      : row.deluxe}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                type="button"
                onClick={() => onSelectPlan(mobileSelectedTab)}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-medium text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Ver Demonstração do {mobileSelectedTab}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenQuote(mobileSelectedTab)}
                className="w-full py-2 px-4 rounded-xl text-slate-300 hover:text-white text-xs font-medium text-center"
              >
                Solicitar orçamento deste nível
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
