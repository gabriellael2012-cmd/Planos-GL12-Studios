import React from 'react';
import { COMMERCIAL_CONFIG } from '../utils/plans';
import { PlanId } from '../types';
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onSelectPlan: (planId: PlanId) => void;
  onOpenQuote: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectPlan,
  onOpenQuote,
  onNavigateHome,
}) => {
  const scrollTo = (href: string) => {
    onNavigateHome();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-sm tracking-tighter shadow-md">
                GL
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                GL12 <span className="text-blue-400 font-normal">Studios</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Catálogo interativo premium de criação de sites para empresas que buscam autoridade, design refinado e resultados comerciais estratégicos.
            </p>
            <div className="text-[11px] text-slate-500 pt-2">
              São Paulo, SP · Atendimento Nacional & Internacional
            </div>
          </div>

          {/* Plan Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Planos</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPlan('essencial')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Plano Essencial (R$ 850)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPlan('extra')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Plano Extra (R$ 1.500)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPlan('deluxe')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Plano Deluxe (2k a 5k)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#comparacao')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Tabela Comparativa
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#catalogo')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Catálogo dos Planos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#diferenca')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Veja a Diferença
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#processo')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#faq')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Perguntas Frequentes
                </button>
              </li>
            </ul>
          </div>

          {/* Commercial Channel & Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Canal Comercial</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{COMMERCIAL_CONFIG.whatsappNumberDisplay}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{COMMERCIAL_CONFIG.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{COMMERCIAL_CONFIG.operatingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenQuote}
                className="w-full py-2 px-3 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Solicitar Proposta</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} GL12 Studios. Todos os direitos reservados.
          </div>
          <div>
            Prazos, hospedagem, domínio, manutenção e integrações definidos formalmente em proposta comercial.
          </div>
        </div>
      </div>
    </footer>
  );
};
