import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
  Monitor,
  Smartphone,
  Check,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DeviceMode, Plan, PlanId } from '../types';
import { PLANS, getNextPlan, getPrevPlan } from '../utils/plans';
import { EssencialDemo } from './demos/EssencialDemo';
import { ExtraDemo } from './demos/ExtraDemo';
import { DeluxeDemo } from './demos/DeluxeDemo';

interface PlanDetailViewProps {
  plan: Plan;
  onBackToCatalog: () => void;
  onSelectPlan: (planId: PlanId) => void;
  onOpenQuote: (planId: PlanId) => void;
}

export const PlanDetailView: React.FC<PlanDetailViewProps> = ({
  plan,
  onBackToCatalog,
  onSelectPlan,
  onOpenQuote,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const prevPlan = getPrevPlan(plan.id);
  const nextPlan = getNextPlan(plan.id);

  const renderActiveDemo = (isMobile: boolean) => {
    switch (plan.id) {
      case 'essencial':
        return <EssencialDemo isMobile={isMobile} />;
      case 'extra':
        return <ExtraDemo isMobile={isMobile} />;
      case 'deluxe':
        return <DeluxeDemo isMobile={isMobile} onOpenQuote={() => onOpenQuote(plan.id)} />;
      default:
        return null;
    }
  };

  return (
    <div className="py-8 lg:py-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl mb-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToCatalog}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Catálogo</span>
            </button>

            {/* Cyclical Plan Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => onSelectPlan(prevPlan.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title={`Ir para plano anterior: ${prevPlan.name}`}
                aria-label={`Ir para plano anterior: ${prevPlan.name}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectPlan(p.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      p.id === plan.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan(nextPlan.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title={`Ir para próximo plano: ${nextPlan.name}`}
                aria-label={`Ir para próximo plano: ${nextPlan.name}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Frame Controls: Device & Fullscreen */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Device Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  deviceMode === 'desktop'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-pressed={deviceMode === 'desktop'}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  deviceMode === 'mobile'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-pressed={deviceMode === 'mobile'}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Celular</span>
              </button>
            </div>

            {/* Expand / Fullscreen Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={isFullscreen ? 'Recolher tela' : 'Visualizar em tela ampliada'}
              aria-label={isFullscreen ? 'Recolher tela' : 'Visualizar em tela ampliada'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Direct Quote Button */}
            <button
              type="button"
              onClick={() => onOpenQuote(plan.id)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap"
            >
              Solicitar {plan.name}
            </button>
          </div>
        </div>

        {/* Plan Identity Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Demonstração Interativa
              </span>
              {plan.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {plan.badge}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{plan.name}</h1>
            <p className="text-sm text-slate-300 max-w-2xl">{plan.description}</p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 shrink-0">
            <div className="text-xs text-slate-400">Investimento de referência:</div>
            <div className="text-3xl font-extrabold text-white font-mono mt-0.5">{plan.priceRef}</div>
            <div className="text-[11px] text-slate-400 mt-1 max-w-[200px]">{plan.pricePeriod}</div>
          </div>
        </div>

        {/* Interactive Device Viewport Frame */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Simulação ativa: <strong>{plan.demoSite.name}</strong></span>
            </span>
            <span>Modo: {deviceMode === 'desktop' ? 'Navegação Desktop' : 'Layout Mobile Real'}</span>
          </div>

          {/* Browser / Device Shell */}
          <div className="flex justify-center">
            {deviceMode === 'desktop' ? (
              // Desktop Browser Mockup
              <div className="w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
                {/* Browser Top Bar */}
                <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>

                  {/* Simulated URL bar */}
                  <div className="flex-1 max-w-lg bg-slate-950 px-3 py-1 rounded-md border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2">
                    <span className="text-emerald-400">https://</span>
                    <span className="text-slate-300">
                      demo.{plan.id}.gl12studios.com.br
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 hidden sm:block">
                    Padrão {plan.name}
                  </div>
                </div>

                {/* Simulated Webpage Content */}
                <div className="h-[620px] overflow-y-auto scroll-smooth">
                  {renderActiveDemo(false)}
                </div>
              </div>
            ) : (
              // Mobile Smartphone Mockup
              <div className="w-[380px] max-w-full rounded-[40px] p-3 bg-slate-900 border-4 border-slate-700 shadow-2xl relative">
                {/* Speaker & Camera Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full z-30 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-950 inline-block" />
                </div>

                {/* Mobile Screen */}
                <div className="rounded-[30px] overflow-hidden bg-slate-950 border border-slate-800 pt-7 h-[640px] overflow-y-auto">
                  {renderActiveDemo(true)}
                </div>

                {/* Home indicator bar */}
                <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
              </div>
            )}
          </div>
        </div>

        {/* Detailed Plan Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-slate-800">
          {/* Included Features List */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                O que está incluído no Plano {plan.name}:
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Especificação completa de recursos, arquitetura e garantias técnicas deste nível.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plan.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300"
                >
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contextual Comparison & Next Tier Step */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Como este plano se posiciona?</h3>

              {plan.id === 'essencial' && (
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <p>
                    O <strong className="text-white">Essencial (R$ 850)</strong> é a solução ideal para quem precisa de uma presença online limpa, rápida e confiável, sem dispersão de recursos.
                  </p>
                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-blue-200">
                    <span className="font-semibold block mb-1">Quer dar um salto visual?</span>
                    O <strong>Plano Extra (R$ 1.500)</strong> acrescenta direção de arte elaborada, microinterações, SEO on-page completo e portfólio dinâmico.
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPlan('extra')}
                    className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Conhecer o Plano Extra</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {plan.id === 'extra' && (
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <p>
                    O <strong className="text-white">Extra (R$ 1.500)</strong> é o nosso plano mais recomendado: eleva a autoridade visual da sua marca e potencializa a taxa de conversão comercial.
                  </p>
                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-indigo-200">
                    <span className="font-semibold block mb-1">Busca exclusividade absoluta?</span>
                    O <strong>Plano Deluxe (R$ 2.000 a R$ 5.000)</strong> oferece direção de arte sob medida, elementos 3D, SEO técnico avançado e performance de ponta.
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPlan('deluxe')}
                    className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Conhecer o Plano Deluxe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {plan.id === 'deluxe' && (
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <p>
                    O <strong className="text-white">Deluxe (R$ 2.000 a R$ 5.000)</strong> é projetado sob medida para marcas que exigem uma experiência digital singular, sofisticada e tecnicamente irrepreensível.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                    <span className="font-semibold block mb-1">Precisa de escopo mais enxuto?</span>
                    O <strong>Plano Extra (R$ 1.500)</strong> oferece excelente refinamento visual para necessidades comerciais mais diretas.
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPlan('extra')}
                    className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Comparar com o Plano Extra</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Direct Order Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/60 to-slate-900 border border-blue-500/30 text-center space-y-3">
              <h4 className="text-base font-bold text-white">Gostou deste nível para sua empresa?</h4>
              <p className="text-xs text-slate-300">
                Inicie sua solicitação agora para receber uma proposta oficial detalhada.
              </p>
              <button
                type="button"
                onClick={() => onOpenQuote(plan.id)}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/40 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Solicitar Proposta do {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Fullscreen Preview Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
          {/* Header */}
          <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white text-sm">GL12 Studios — Tela Ampliada</span>
              <span className="text-xs text-slate-400">· Demonstração: {plan.demoSite.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDeviceMode(deviceMode === 'desktop' ? 'mobile' : 'desktop')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200 hover:text-white flex items-center gap-1"
              >
                {deviceMode === 'desktop' ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
                <span>Alternar para {deviceMode === 'desktop' ? 'Celular' : 'Desktop'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Fechar Tela Ampliada</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Body */}
          <div className="flex-1 overflow-y-auto p-4 flex justify-center bg-slate-950">
            {deviceMode === 'desktop' ? (
              <div className="w-full max-w-6xl rounded-xl overflow-hidden border border-slate-800 bg-white">
                {renderActiveDemo(false)}
              </div>
            ) : (
              <div className="w-[390px] rounded-[36px] overflow-hidden border-4 border-slate-700 bg-white h-[760px] overflow-y-auto shadow-2xl my-auto">
                {renderActiveDemo(true)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
