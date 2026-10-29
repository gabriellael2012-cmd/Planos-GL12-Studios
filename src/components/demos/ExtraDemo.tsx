import React, { useState } from 'react';
import { ArrowRight, Compass, Layers, ShieldCheck, Award, Calendar, Sparkles, Building2, Home, Landmark, CheckCircle, X } from 'lucide-react';

interface ExtraDemoProps {
  isMobile?: boolean;
  onOpenQuote?: () => void;
}

export const ExtraDemo: React.FC<ExtraDemoProps> = ({ isMobile = false, onOpenQuote }) => {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'residencial' | 'corporativo' | 'cultural'>('todos');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const projects = [
    {
      id: 1,
      title: 'Residência Terras Altas',
      category: 'residencial',
      categoryLabel: 'Residencial',
      location: 'Campinas, SP',
      area: '620 m²',
      year: '2025',
      summary: 'Integração total com a topografia natural, brises em madeira cumaru e iluminação zenital.',
      tag: 'Projeto Premiado AsBEA',
    },
    {
      id: 2,
      title: 'Sede Global FinTech Vértice',
      category: 'corporativo',
      categoryLabel: 'Corporativo',
      location: 'Faria Lima, SP',
      area: '1.450 m²',
      year: '2025',
      summary: 'Espaços colaborativos biofílicos com certificação LEED Gold e acústica customizada.',
      tag: 'Sustentabilidade LEED Gold',
    },
    {
      id: 3,
      title: 'Galeria & Pavilhão Monólito',
      category: 'cultural',
      categoryLabel: 'Cultural',
      location: 'Curitiba, PR',
      area: '890 m²',
      year: '2024',
      summary: 'Concreto aparente ripado, iluminação indireta controlada e vãos livres de 18 metros.',
      tag: 'Destaque Bienal de Design',
    },
    {
      id: 4,
      title: 'Apartamento Ibirapuera Penthouse',
      category: 'residencial',
      categoryLabel: 'Residencial',
      location: 'Vila Nova Conceição, SP',
      area: '480 m²',
      year: '2025',
      summary: 'Lâminas de nogueira natural, mármore travertino navona e mobiliário autoral brasileiro.',
      tag: 'Design de Interiores Autoral',
    },
  ];

  const filteredProjects =
    activeCategory === 'todos' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className={`bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-black ${isMobile ? 'text-xs' : 'text-sm'}`}>
      {/* Top Banner Notice */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-1.5 px-4 text-center text-xs text-amber-300 font-medium flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Demonstração Interativa do Plano Extra — Nexus Studio Arquitetura & Interiores</span>
      </div>

      {/* Header Editorial */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur sticky top-0 z-20 px-4 md:px-10 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-950 font-black text-xs flex items-center justify-center tracking-tighter shrink-0">
            NX
          </div>
          <div>
            <div className="font-semibold text-stone-100 text-[11px] md:text-xs tracking-wider uppercase">NEXUS STUDIO</div>
            <div className="text-[9px] md:text-[10px] text-stone-400 tracking-widest">ARQUITETURA & DESIGN</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-stone-300">
          <button
            type="button"
            onClick={() => scrollToSection('extra-projetos')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Portfólio
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('extra-metodo')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Metodologia
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('extra-contato')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Contato
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setScheduleModalOpen(true)}
          className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-stone-100 text-stone-950 hover:bg-amber-400 hover:text-stone-950 text-[11px] md:text-xs font-semibold tracking-wide transition-all cursor-pointer"
        >
          Iniciar Projeto
        </button>
      </header>

      {/* Hero Section Editorial */}
      <section className="px-4 md:px-10 py-8 md:py-14 border-b border-stone-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-700 text-xs text-amber-300 font-medium">
              <Award className="w-3.5 h-3.5" /> Escritório de Arquitetura Contemporânea
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-stone-100 tracking-tight leading-tight">
              Espaços que equilibram <span className="font-serif italic font-normal text-amber-300">precisão estrutural</span> e atmosfera sensorial.
            </h1>

            <p className="text-stone-400 text-xs md:text-sm leading-relaxed max-w-xl">
              Desenvolvemos residências de alto padrão e sedes corporativas com arquitetura atemporal, rigor técnico construtivo e sensibilidade climática.
            </p>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-800/80">
              <div>
                <div className="text-lg md:text-xl font-bold text-stone-100 font-mono">84+</div>
                <div className="text-[10px] md:text-[11px] text-stone-400 mt-0.5">Obras executadas</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-bold text-amber-400 font-mono">100%</div>
                <div className="text-[10px] md:text-[11px] text-stone-400 mt-0.5">Rigor orçamentário</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-bold text-stone-100 font-mono">12 anos</div>
                <div className="text-[10px] md:text-[11px] text-stone-400 mt-0.5">De experiência sólida</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-700/60 shadow-2xl">
              <img
                src="/src/assets/images/demo_extra_arch_1793290225566.jpg"
                alt="Ambiente arquitetônico sofisticado projetado por Nexus Studio"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-72 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 sm:p-3 bg-stone-950/80 backdrop-blur-md rounded-xl border border-stone-700/50 text-xs flex items-center justify-between">
                <div>
                  <div className="font-medium text-stone-200">Residência Vale dos Pinheiros</div>
                  <div className="text-[10px] text-stone-400">Arquitetura de interiores em concreto & vidro</div>
                </div>
                <span className="text-[11px] font-mono text-amber-400">2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projetos com Filtro Interativo */}
      <section id="extra-projetos" className="px-4 md:px-10 py-10 md:py-12 border-b border-stone-800 bg-stone-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Obras Selecionadas</span>
              <h2 className="text-xl md:text-2xl font-light text-stone-100 mt-1">Acervo Recente de Projetos</h2>
            </div>

            {/* Segmented Filter */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-900 border border-stone-800 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveCategory('todos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === 'todos' ? 'bg-amber-400 text-stone-950 shadow-sm' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Todos (4)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('residencial')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  activeCategory === 'residencial' ? 'bg-amber-400 text-stone-950 shadow-sm' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Home className="w-3 h-3" /> Residencial
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('corporativo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  activeCategory === 'corporativo' ? 'bg-amber-400 text-stone-950 shadow-sm' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Building2 className="w-3 h-3" /> Corporativo
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('cultural')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  activeCategory === 'cultural' ? 'bg-amber-400 text-stone-950 shadow-sm' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Landmark className="w-3 h-3" /> Cultural
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProject(selectedProject === p.id ? null : p.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedProject === p.id
                    ? 'border-amber-400 bg-stone-900 shadow-xl'
                    : 'border-stone-800 bg-stone-900/60 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span className="text-amber-400 font-medium">{p.tag}</span>
                  <span className="font-mono">{p.area} · {p.year}</span>
                </div>
                <h3 className="text-lg font-semibold text-stone-100">{p.title}</h3>
                <div className="text-xs text-stone-400 mt-1">{p.location}</div>
                <p className="mt-3 text-xs text-stone-300 leading-relaxed">{p.summary}</p>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-amber-400 font-medium">
                  <span>{selectedProject === p.id ? 'Recolher detalhes técnicos' : 'Ver ficha de especificação'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${selectedProject === p.id ? 'rotate-90' : ''}`} />
                </div>

                {selectedProject === p.id && (
                  <div className="mt-3 pt-3 border-t border-stone-800 text-[11px] text-stone-400 space-y-1">
                    <div>• Estrutura: Pilares esbeltos metálicos e lajes protendidas</div>
                    <div>• Sustentabilidade: Reúso pluvial e painéis fotovoltaicos integrados</div>
                    <div>• Consultoria: Acústica e conforto térmico computacional</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metodologia Estruturada em 4 Fases */}
      <section id="extra-metodo" className="px-4 md:px-10 py-10 md:py-12 border-b border-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Processo Criativo & Técnico</span>
            <h2 className="text-xl md:text-2xl font-light text-stone-100 mt-1">Como Desenvolvemos Seu Espaço</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-stone-800 bg-stone-900/30">
              <div className="text-amber-400 font-mono text-sm font-semibold mb-2">01 / Imersão</div>
              <h4 className="font-semibold text-stone-100 text-sm">Diagnóstico & Topografia</h4>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Estudo minucioso da insolação, ventos dominantes, plano diretor urbano e rotina dos usuários.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-stone-800 bg-stone-900/30">
              <div className="text-amber-400 font-mono text-sm font-semibold mb-2">02 / Conceituação</div>
              <h4 className="font-semibold text-stone-100 text-sm">Estudo Preliminar 3D</h4>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Maquetes volumétricas digitais, diagramas espaciais e curadoria inicial de materiais nobres.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-stone-800 bg-stone-900/30">
              <div className="text-amber-400 font-mono text-sm font-semibold mb-2">03 / Detalhamento</div>
              <h4 className="font-semibold text-stone-100 text-sm">Projeto Executivo BIM</h4>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Compatibilização milimétrica de instalações estruturais, hidráulicas, elétricas e iluminação.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-stone-800 bg-stone-900/30">
              <div className="text-amber-400 font-mono text-sm font-semibold mb-2">04 / Obra</div>
              <h4 className="font-semibold text-stone-100 text-sm">Acompanhamento Rigoroso</h4>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Visitas periódicas de fiscalização técnica para garantir fidelidade total ao projeto aprovado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA de Conversão Estratégica */}
      <section id="extra-contato" className="px-4 md:px-10 py-10 md:py-12 bg-gradient-to-b from-stone-900 to-stone-950 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-xl md:text-2xl font-light text-stone-100">Pronto para materializar seu próximo projeto?</h3>
          <p className="text-xs md:text-sm text-stone-400 leading-relaxed">
            Agende uma reunião inicial de alinhamento com nossos arquitetos titulares para avaliar o potencial do seu terreno ou imóvel.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setScheduleModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber-400 text-stone-950 font-semibold text-xs tracking-wide hover:bg-amber-300 transition-colors shadow-lg cursor-pointer"
            >
              Agendar Conversa de Viabilidade
            </button>
          </div>
        </div>
      </section>

      <footer className="px-4 py-4 bg-stone-950 border-t border-stone-900 text-stone-500 text-[11px] text-center">
        <div>NEXUS STUDIO ARQUITETURA LTDA — CAU/SP 04928-8 — Demonstração do Plano Extra por GL12 Studios</div>
      </footer>

      {/* Modal de Agendamento da Demonstração */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/30 p-6 rounded-2xl max-w-md w-full shadow-2xl relative text-left">
            <button
              type="button"
              onClick={() => setScheduleModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            {!scheduledSuccess ? (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-stone-100">Agendar Reunião com Nexus Studio</h4>
                <p className="text-xs text-stone-300">
                  Esta é uma demonstração de conversão do Plano Extra desenvolvida pela GL12 Studios.
                </p>
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs"
                  />
                  <input
                    type="tel"
                    placeholder="Seu WhatsApp"
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setScheduledSuccess(true)}
                  className="w-full py-2 bg-amber-400 text-stone-950 font-bold rounded-lg text-xs hover:bg-amber-300"
                >
                  Confirmar Agendamento Demonstrativo
                </button>
              </div>
            ) : (
              <div className="text-center py-4 space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h5 className="text-sm font-bold text-white">Horário Reservado na Demonstração</h5>
                <button
                  type="button"
                  onClick={() => {
                    setScheduledSuccess(false);
                    setScheduleModalOpen(false);
                  }}
                  className="mt-2 text-xs text-amber-400 hover:underline"
                >
                  Fechar Janela
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
