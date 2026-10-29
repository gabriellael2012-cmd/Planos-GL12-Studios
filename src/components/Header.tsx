import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { PlanId } from '../types';

interface HeaderProps {
  onOpenQuote: (planId?: PlanId) => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onNavigateHome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavigateHome();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element with clean mark) */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          aria-label="GL12 Studios — Página inicial"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-sm tracking-tighter shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
            GL
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            GL12 <span className="text-blue-400 font-normal">Studios</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (single-line, clean text) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Início
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('#catalogo')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Planos
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('#diferenca')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Veja a Diferença
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('#comparacao')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Comparação
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('#processo')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Como Funciona
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('#faq')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Perguntas Frequentes
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenQuote()}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs tracking-wide transition-all shadow-md shadow-blue-700/30 hover:shadow-blue-600/50 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Solicitar meu site</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm text-slate-300">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white"
            >
              Início
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#catalogo')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white"
            >
              Planos (Essencial, Extra, Deluxe)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#diferenca')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white"
            >
              Veja a Diferença
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#comparacao')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white"
            >
              Comparação Completa
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#processo')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white"
            >
              Como Funciona
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#faq')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white"
            >
              Perguntas Frequentes
            </button>
          </nav>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Solicitar meu site</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
