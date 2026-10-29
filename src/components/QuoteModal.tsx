import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, Copy, Check, ShieldCheck, ArrowRight, Building, User, Phone, Briefcase, FileText } from 'lucide-react';
import { FormErrors, PlanId, QuoteFormData } from '../types';
import { COMMERCIAL_CONFIG, PLANS, getPlanById } from '../utils/plans';
import {
  validateQuoteForm,
  formatWhatsAppMessage,
  buildWhatsAppLink,
  generateReferenceCode,
} from '../utils/validation';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: PlanId;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialPlanId = 'extra',
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    company: '',
    whatsapp: '',
    planId: initialPlanId,
    businessType: '',
    projectDescription: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceCode, setReferenceCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialPlanId) {
      setFormData((prev) => ({ ...prev, planId: initialPlanId }));
    }
  }, [initialPlanId]);

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateQuoteForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const ref = generateReferenceCode();
    setReferenceCode(ref);
    setIsSubmitted(true);
  };

  const selectedPlan = getPlanById(formData.planId);
  const formattedMessage = isSubmitted
    ? formatWhatsAppMessage(formData, selectedPlan, referenceCode)
    : '';

  const whatsappUrl = buildWhatsAppLink(COMMERCIAL_CONFIG.whatsappNumber, formattedMessage);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Fechar formulário de solicitação"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
                Proposta Comercial Oficial
              </span>
              <h3 id="modal-title" className="text-2xl font-extrabold text-white tracking-tight mt-1">
                Solicitar Meu Site — GL12 Studios
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                Preencha os dados do seu projeto para gerarmos sua solicitação com prioridade comercial.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>Seu Nome *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="Ex: Carlos Eduardo"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.name ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-blue-400" />
                    <span>Nome da Empresa *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleFieldChange('company', e.target.value)}
                    placeholder="Ex: Studio Vértice"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.company ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.company && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.company}</p>
                  )}
                </div>
              </div>

              {/* WhatsApp & Business Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    <span>WhatsApp para Contato *</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                    placeholder="Ex: (11) 99999-8888"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.whatsapp ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.whatsapp}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    <span>Ramo / Segmento *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.businessType}
                    onChange={(e) => handleFieldChange('businessType', e.target.value)}
                    placeholder="Ex: Arquitetura, Saúde, Consultoria..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.businessType ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.businessType && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.businessType}</p>
                  )}
                </div>
              </div>

              {/* Plan Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Plano Desejado *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => handleFieldChange('planId', plan.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        formData.planId === plan.id
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold text-xs text-white">{plan.name}</div>
                      <div className="text-[11px] font-mono text-blue-400 mt-0.5">{plan.priceRef}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Descrição Breve do Projeto *</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.projectDescription}
                  onChange={(e) => handleFieldChange('projectDescription', e.target.value)}
                  placeholder="Conte em poucas linhas sobre o site que você precisa, páginas desejadas ou objetivos principais..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                    errors.projectDescription ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.projectDescription && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.projectDescription}</p>
                )}
              </div>

              {/* Official Channel Note */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  Canal Oficial GL12 Studios: atendimento direto via WhatsApp ({COMMERCIAL_CONFIG.whatsappNumberDisplay}) ou e-mail.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Solicitação de Orçamento</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State with Actionable WhatsApp Routing */
          <div className="text-center py-2 space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center shadow-lg">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Protocolo: #{referenceCode}
              </span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                Solicitação Preparada com Sucesso!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                Sua proposta para o plano <strong className="text-white">{selectedPlan?.name}</strong> foi estruturada com as informações da sua empresa.
              </p>
            </div>

            {/* Generated Message Preview Box */}
            <div className="text-left bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-300 max-h-44 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {formattedMessage}
            </div>

            {/* Direct Commercial Actions */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-emerald-700/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir WhatsApp com a Proposta Formatada</span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado para a área de transferência!' : 'Copiar texto da solicitação'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="text-xs text-slate-400 hover:text-white pt-2 inline-block transition-colors cursor-pointer"
              >
                Concluir e voltar ao catálogo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
