import React, { useState } from 'react';
import { Phone, Clock, MapPin, CheckCircle, Send, MessageCircle } from 'lucide-react';

interface EssencialDemoProps {
  isMobile?: boolean;
}

export const EssencialDemo: React.FC<EssencialDemoProps> = ({ isMobile = false }) => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'Fisioterapia Traumato-Ortopédica' });

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setFormSent(true);
      setTimeout(() => setFormSent(false), 4000);
    }
  };

  return (
    <div className={`bg-white text-slate-800 font-sans selection:bg-sky-500 selection:text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>
      {/* Top Banner Notice */}
      <div className="bg-sky-50 border-b border-sky-100 py-1.5 px-4 text-center text-xs text-sky-900 font-medium">
        <span>Demonstração Interativa do Plano Essencial — Clínica Alvorada Fisioterapia</span>
      </div>

      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0">
            CA
          </div>
          <div>
            <div className="font-bold text-slate-900 text-[11px] md:text-xs tracking-tight leading-none">Clínica Alvorada</div>
            <div className="text-[9px] md:text-[10px] text-slate-500">Fisioterapia & Saúde</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <button
            type="button"
            onClick={() => scrollToSection('essencial-sobre')}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Sobre
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('essencial-servicos')}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Tratamentos
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('essencial-contato')}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Contato
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToSection('essencial-contato')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="essencial-sobre" className="px-4 md:px-8 py-8 md:py-10 bg-gradient-to-b from-sky-50/60 to-white">
        <div className={`max-w-4xl mx-auto ${isMobile ? 'flex flex-col gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-8 items-center'}`}>
          <div>
            <span className="text-sky-700 font-semibold text-xs tracking-wider uppercase">Atendimento humanizado</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2 tracking-tight leading-tight">
              Reabilitação física com foco no seu retorno seguro às atividades.
            </h1>
            <p className="mt-3 text-slate-600 text-xs md:text-sm leading-relaxed">
              Planos terapêuticos individualizados para alívio de dores na coluna, lesões articulares e pós-operatório com profissionais especializados.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('essencial-contato')}
                className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs transition-colors shadow-sm cursor-pointer"
              >
                Agendar Consulta
              </button>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Atendemos particular e convênios
              </span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-md border border-slate-200">
            <img
              src="/src/assets/images/demo_essencial_clinic_1793290223891.jpg"
              alt="Recepção moderna e acolhedora da Clínica Alvorada"
              referrerPolicy="no-referrer"
              className="w-full h-48 md:h-60 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Serviços Essenciais */}
      <section id="essencial-servicos" className="px-4 md:px-8 py-8 border-t border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">Tratamentos Especializados</h2>
            <p className="text-xs text-slate-500 mt-1">Abordagens baseadas em evidências para sua recuperação completa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-sky-300 transition-colors">
              <h3 className="font-semibold text-slate-900 text-sm">Fisioterapia Traumato-Ortopédica</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-normal">
                Recuperação de fraturas, entorses, tendinites, bursites e cirurgias de joelho e ombro.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-sky-300 transition-colors">
              <h3 className="font-semibold text-slate-900 text-sm">RPG & Posturologia Clínica</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-normal">
                Correção postural global, tratamento de escoliose, hérnia de disco e dores crônicas.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-sky-300 transition-colors">
              <h3 className="font-semibold text-slate-900 text-sm">Reabilitação Desportiva</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-normal">
                Prevenção e tratamento de lesões em atletas com retorno assistido à prática esportiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Informações Práticas & Contato Rápido */}
      <section id="essencial-contato" className="px-4 md:px-8 py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-base font-bold text-slate-900">Horários & Localização</h3>
            <p className="text-xs text-slate-600 mt-1">Fácil acesso com estacionamento conveniado no local.</p>

            <div className="mt-4 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Av. Paulista, 1200 — Sala 604, Bela Vista, São Paulo - SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Segunda a Sexta: 07h às 20h | Sábados: 08h às 13h</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <span>(11) 3245-8800 | WhatsApp: (11) 98765-4321</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-900">Solicitar Agendamento</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Nossa recepção entrará em contato em minutos.</p>

            {formSent ? (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mensagem enviada com sucesso! Logo entraremos em contato.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-3 space-y-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700">Seu Nome</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Mariana Silva"
                    className="w-full mt-1 px-3 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-0000"
                    className="w-full mt-1 px-3 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700">Tratamento de Interesse</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-sky-500 bg-white"
                  >
                    <option>Fisioterapia Traumato-Ortopédica</option>
                    <option>RPG & Posturologia Clínica</option>
                    <option>Reabilitação Desportiva</option>
                    <option>Avaliação Geral</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Enviar Pedido de Horário
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="px-4 py-4 bg-slate-900 text-slate-400 text-[11px] text-center border-t border-slate-800">
        <div>Clínica Alvorada de Fisioterapia LTDA — CNPJ 00.000.000/0001-00 — Responsável Técnico: Dr. André F. CREFITO 14829-F</div>
        <div className="mt-1 text-slate-500">Desenvolvido com padrão Essencial por GL12 Studios</div>
      </footer>
    </div>
  );
};
