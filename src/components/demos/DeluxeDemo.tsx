import React, { useState, useEffect } from 'react';
import { Deluxe3DViewer, LightingMode } from './Deluxe3DViewer';
import { Crown, Sparkles, Compass, Shield, Eye, ArrowUpRight, Key, Layers, X, CheckCircle, Phone, Lock } from 'lucide-react';

interface DeluxeDemoProps {
  isMobile?: boolean;
  onOpenQuote?: () => void;
}

export const DeluxeDemo: React.FC<DeluxeDemoProps> = ({ isMobile = false, onOpenQuote }) => {
  const [lightingMode, setLightingMode] = useState<LightingMode>('twilight');
  const [activeMaterial, setActiveMaterial] = useState<'marble' | 'glass' | 'corten'>('marble');
  const [conciergeModalOpen, setConciergeModalOpen] = useState(false);
  const [conciergeSent, setConciergeSent] = useState(false);
  const [conciergeData, setConciergeData] = useState({ name: '', phone: '', timeSlot: 'Manhã (09h - 12h)' });

  // Escape key listener for concierge modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && conciergeModalOpen) {
        setConciergeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [conciergeModalOpen]);

  // Internal smooth scroll helper that doesn't change window.location.hash
  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const materials = {
    marble: {
      name: 'Mármore Travertino Romano Navona',
      origin: 'Tivoli, Itália',
      finish: 'Resinado fosco acetinado com corte a veios contínuos',
      specs: 'Placas maciças de 120x240cm com paginação simétrica e ancoragem oculta ventilada.',
    },
    glass: {
      name: 'Vidro Térmico de Controle Solar Low-E',
      origin: 'Saint-Gobain Saint-Just',
      finish: 'Triplo laminado acústico com transmissão luminosa de 70%',
      specs: 'Perfis de esquadrias embutidos no piso e teto com atenuação sonora de 44dB.',
    },
    corten: {
      name: 'Aço Patinável Corten Naval Tratado',
      origin: 'Usiminas Premium Grade',
      finish: 'Oxidação estabilizada com verniz cerâmico hidrofugante',
      specs: 'Brises móveis automatizados com rotação solar paramétrica de 180°.',
    },
  };

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (conciergeData.name && conciergeData.phone) {
      setConciergeSent(true);
      setTimeout(() => {
        setConciergeSent(false);
        setConciergeModalOpen(false);
      }, 3000);
    }
  };

  return (
    <div className={`bg-[#050811] text-slate-100 font-sans selection:bg-blue-500 selection:text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>
      {/* Top Banner Notice */}
      <div className="bg-blue-950/80 border-b border-blue-800/40 py-2 px-4 text-center text-xs text-blue-300 font-medium flex items-center justify-center gap-2">
        <Crown className="w-3.5 h-3.5 text-blue-400" />
        <span>Demonstração Interativa do Plano Deluxe — Aura Private Estates & Pavilions</span>
      </div>

      {/* Header Cinematográfico */}
      <header className="border-b border-slate-800/80 bg-[#050811]/90 backdrop-blur-md sticky top-0 z-20 px-4 md:px-10 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-800 flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg shadow-blue-900/40 shrink-0">
            A
          </div>
          <div>
            <div className="font-semibold tracking-[0.2em] text-slate-100 text-[11px] md:text-xs uppercase">AURA ESTATES</div>
            <div className="text-[9px] md:text-[10px] text-blue-400/80 tracking-widest uppercase">PRIVATE PAVILIONS & RESIDENCES</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-light text-slate-300 tracking-wider">
          <button
            type="button"
            onClick={() => scrollToSection('3d-pavilhao')}
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            Visualizador 3D
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('materiais')}
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            Materiais Nobres
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('residencia')}
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            Galeria Imersiva
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setConciergeModalOpen(true)}
          className="px-3.5 py-1.5 md:px-4 md:py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-[11px] md:text-xs tracking-wider uppercase transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
        >
          Concierge Privado
        </button>
      </header>

      {/* Hero Section Cinematográfica */}
      <section className="relative px-4 md:px-10 pt-8 pb-10 md:pt-10 md:pb-12 border-b border-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-700/40 text-xs text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Engenharia de Alto Padrão & Arquitetura Monumental</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                A expressão definitiva da <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-200 font-normal">privacidade e pureza volumétrica</span>.
              </h1>
              <p className="mt-4 text-slate-400 text-xs md:text-sm leading-relaxed max-w-2xl font-light">
                Pavilhões residenciais contemporâneos suspensos sobre a paisagem. Cada empreendimento é modelado sob medida com simulações paramétricas de luz natural, acústica de estúdio e sistemas inteligentes integrados.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2 text-xs text-slate-400 border-l border-slate-800/80 pl-4">
              <div><strong className="text-white">Localização:</strong> Península dos Corais, Litoral Norte</div>
              <div><strong className="text-white">Área Privativa:</strong> 1.280 m² com píer exclusivo</div>
              <div><strong className="text-white">Prazo Executivo:</strong> Obra com fiscalização integral</div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3D Interativa sob Medida */}
      <section id="3d-pavilhao" className="px-4 md:px-10 py-10 md:py-12 border-b border-slate-800/80 bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Tecnologia Tridimensional</span>
              <h2 className="text-xl md:text-2xl font-light text-white mt-1">Exploração Volumétrica do Pavilhão</h2>
              <p className="text-xs text-slate-400 mt-1">
                Interaja diretamente com o modelo espacial: alterne a incidência de luz e orbite a estrutura em 360°.
              </p>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Renderizado em tempo real · Simulação Dinâmica
            </div>
          </div>

          {/* Interactive 3D Canvas */}
          <Deluxe3DViewer lightingMode={lightingMode} onLightingChange={setLightingMode} />
        </div>
      </section>

      {/* Galeria Imersiva com Villa Renderizada */}
      <section id="residencia" className="px-4 md:px-10 py-10 md:py-12 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Fotografia de Arquitetura</span>
            <h2 className="text-xl md:text-3xl font-light text-white mt-1">Pavilhão Aura — Vista Poente</h2>
            <p className="text-xs text-slate-400 mt-2">
              Piscina de borda infinita com revestimento em pedra vulcânica e esquadrias panorâmicas motorizadas.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl">
            <img
              src="/src/assets/images/demo_deluxe_luxury_1793290224788.jpg"
              alt="Villa de luxo moderna com piscina infinita no crepúsculo"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60">
                <div className="font-semibold text-white">Pavilhão 01 — Escultura Habitável</div>
                <div className="text-slate-400 text-[11px]">Concreto protendido, balanço de 9 metros sem pilares visíveis</div>
              </div>
              <button
                type="button"
                onClick={() => setConciergeModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-lg shadow-blue-700/40 flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
              >
                <span>Solicitar Dossiê Privado</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Curadoria de Materiais Exclusivos */}
      <section id="materiais" className="px-4 md:px-10 py-10 md:py-12 border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Especificações Construtivas</span>
            <h2 className="text-xl md:text-2xl font-light text-white mt-1">Materiais Selecionados</h2>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => setActiveMaterial('marble')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeMaterial === 'marble' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Mármore Romano
            </button>
            <button
              type="button"
              onClick={() => setActiveMaterial('glass')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeMaterial === 'glass' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Vidros Low-E
            </button>
            <button
              type="button"
              onClick={() => setActiveMaterial('corten')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeMaterial === 'corten' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Aço Corten
            </button>
          </div>

          <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-blue-500/20 bg-slate-900/60 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-blue-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">{materials[activeMaterial].origin}</span>
              <span className="font-mono text-slate-400">Classificação A+</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{materials[activeMaterial].name}</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed font-light">{materials[activeMaterial].finish}</p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
              <strong className="text-slate-200">Especificação Técnica:</strong> {materials[activeMaterial].specs}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Deluxe */}
      <footer className="px-4 py-6 bg-[#03060d] border-t border-slate-900 text-slate-500 text-[11px] text-center">
        <div>AURA PRIVATE REAL ESTATE & DESIGN LAB — Licença Exclusiva GL12 Studios</div>
        <div className="mt-1 text-slate-600">Demonstração interativa desenvolvida com padrão Deluxe sob medida.</div>
      </footer>

      {/* Concierge Modal */}
      {conciergeModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="concierge-modal-title"
        >
          <div className="bg-slate-900 border border-blue-500/30 p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl relative text-left">
            <button
              type="button"
              onClick={() => setConciergeModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Fechar concierge"
            >
              <X className="w-5 h-5" />
            </button>

            {!conciergeSent ? (
              <form onSubmit={handleConciergeSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Protocolo Confidencial</span>
                </div>
                <h4 id="concierge-modal-title" className="text-xl font-bold text-white tracking-tight">
                  Concierge Privativo Aura
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Agende um alinhamento reservado com nosso consultor titular e receba o dossiê executivo com estudo preliminar de viabilidade.
                </p>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Seu Nome</label>
                  <input
                    type="text"
                    required
                    value={conciergeData.name}
                    onChange={(e) => setConciergeData({ ...conciergeData, name: e.target.value })}
                    placeholder="Ex: Roberto Albuquerque"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Telefone / WhatsApp Direto</label>
                  <input
                    type="tel"
                    required
                    value={conciergeData.phone}
                    onChange={(e) => setConciergeData({ ...conciergeData, phone: e.target.value })}
                    placeholder="(11) 99999-0000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Melhor Horário de Contato</label>
                  <select
                    value={conciergeData.timeSlot}
                    onChange={(e) => setConciergeData({ ...conciergeData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Manhã (09h - 12h)</option>
                    <option>Tarde (14h - 18h)</option>
                    <option>Horário Noturno Reservado</option>
                  </select>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition-colors cursor-pointer"
                  >
                    Confirmar Solicitação de Dossiê
                  </button>

                  {onOpenQuote && (
                    <button
                      type="button"
                      onClick={() => {
                        setConciergeModalOpen(false);
                        onOpenQuote();
                      }}
                      className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      Ir para Solicitação de Proposta Comercial Geral GL12
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h5 className="text-lg font-bold text-white">Solicitação Recebida com Sucesso</h5>
                <p className="text-xs text-slate-300">
                  Nosso concierge privativo entrará em contato no horário solicitado com o dossiê confidencial.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
