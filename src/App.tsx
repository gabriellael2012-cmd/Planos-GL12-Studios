import React, { useState, useEffect } from 'react';
import { PlanId } from './types';
import { getPlanById } from './utils/plans';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PlansCatalog } from './components/PlansCatalog';
import { PlanDetailView } from './components/PlanDetailView';
import { DifferenceShowcase } from './components/DifferenceShowcase';
import { ComparisonTable } from './components/ComparisonTable';
import { HiringProcess } from './components/HiringProcess';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [quoteTargetPlan, setQuoteTargetPlan] = useState<PlanId>('extra');

  // Handle URL hash changes for deep linking to plans
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'essencial' || hash === 'extra' || hash === 'deluxe') {
        setSelectedPlanId(hash as PlanId);
      } else if (!hash.startsWith('plano-') && hash !== '') {
        // Normal section anchor scroll
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectPlan = (planId: PlanId) => {
    setSelectedPlanId(planId);
    window.location.hash = planId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedPlanId(null);
    history.pushState('', document.title, window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (planId?: PlanId) => {
    if (planId) {
      setQuoteTargetPlan(planId);
    } else if (selectedPlanId) {
      setQuoteTargetPlan(selectedPlanId);
    } else {
      setQuoteTargetPlan('extra');
    }
    setIsQuoteOpen(true);
  };

  const selectedPlan = selectedPlanId ? getPlanById(selectedPlanId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Universal Top Bar */}
      <Header
        onOpenQuote={() => handleOpenQuote()}
        onNavigateHome={handleBackToCatalog}
      />

      <main className="flex-1">
        {selectedPlan ? (
          // Dedicated Immersive Plan Experience
          <PlanDetailView
            plan={selectedPlan}
            onBackToCatalog={handleBackToCatalog}
            onSelectPlan={handleSelectPlan}
            onOpenQuote={handleOpenQuote}
          />
        ) : (
          // Full Catalog Experience
          <>
            <Hero
              onExplorePlans={() => {
                const catalogEl = document.getElementById('catalogo');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onComparePlans={() => {
                const compEl = document.getElementById('comparacao');
                if (compEl) compEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectPlan={handleSelectPlan}
            />

            <PlansCatalog
              onSelectPlan={handleSelectPlan}
              onOpenQuote={handleOpenQuote}
            />

            <DifferenceShowcase onSelectPlan={handleSelectPlan} />

            <ComparisonTable
              onSelectPlan={handleSelectPlan}
              onOpenQuote={handleOpenQuote}
            />

            <HiringProcess onOpenQuote={() => handleOpenQuote()} />

            <FaqSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectPlan={handleSelectPlan}
        onOpenQuote={() => handleOpenQuote()}
        onNavigateHome={handleBackToCatalog}
      />

      {/* Quote Form Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialPlanId={quoteTargetPlan}
      />
    </div>
  );
}
