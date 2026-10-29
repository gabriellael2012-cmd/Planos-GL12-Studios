import React from 'react';
import { CheckCircle, FileText, Code2, Rocket, ArrowRight, ShieldAlert } from 'lucide-react';

interface HiringProcessProps {
  onOpenQuote: () => void;
}

export const HiringProcess: React.FC<HiringProcessProps> = ({ onOpenQuote }) => {
  const steps = [
    {
      step: '01',
      title: 'Escolha do Nível',
      description:
        'O cliente seleciona o plano mais adequado aos objetivos e ao momento da empresa (Essencial, Extra ou Deluxe) e inicia o contato comercial.',
      icon: CheckCircle,
    },
    {
      step: '02',
      title: 'Briefing Estratégico',
      description:
        'A GL12 Studios analisa seu modelo de negócio, público-alvo, referências visuais e requisitos técnicos para formalizar a proposta com escopo fechado.',
      icon: FileText,
    },
    {
      step: '03',
      title: 'Design & Desenvolvimento',
      description:
        'O site é projetado e implementado com código limpo, rigor tipográfico, adaptação responsiva e otimizações técnicas de acordo com o escopo contratado.',
      icon: Code2,
    },
    {
      step: '04',
      title: 'Revisão, Testes & Entrega',
      description:
        'Realizamos a homologação em diferentes resoluções, verificação de funcionamento e publicação do site nas condições formalizadas no contrato.',
      icon: Rocket,
    },
  ];

  return (
    <section id="processo" className="py-20 lg:py-28 border-b border-slate-800/80 bg-slate-900/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">
            <span>Metodologia Transparente</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Fluxo de Trabalho</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Do primeiro contato ao lançamento
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 text-balance leading-relaxed">
            Um processo estruturado em 4 etapas, conduzido com clareza contratual e alinhamentos objetivos em cada fase.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 relative flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-mono font-bold text-blue-400">{item.step}</span>
                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contractual Transparency Box */}
        <div className="mt-12 p-6 rounded-2xl border border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-slate-400">
          <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1 leading-relaxed">
            <strong className="text-slate-200">Definições Contratuais Claras:</strong> Prazos de execução, contratação de hospedagem e domínio, rotinas de manutenção preventiva, limites de rodadas de revisão e integrações especiais (banco de dados, CMS, ERP ou gateways de pagamento) são detalhados e formalizados individualmente na proposta comercial de cada projeto.
          </div>
          <button
            type="button"
            onClick={onOpenQuote}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs whitespace-nowrap transition-colors shrink-0 shadow-md shadow-blue-600/30 cursor-pointer"
          >
            Solicitar Proposta
          </button>
        </div>
      </div>
    </section>
  );
};
