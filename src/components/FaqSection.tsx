import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../utils/plans';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 border-b border-slate-800/80 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">
            <span>Esclarecimentos</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Dúvidas Frequentes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 text-balance leading-relaxed">
            Respostas diretas e transparentes sobre contratação, escopo técnico, prazos e entregáveis da GL12 Studios.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="text-sm font-semibold text-white leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-600/30 text-blue-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
