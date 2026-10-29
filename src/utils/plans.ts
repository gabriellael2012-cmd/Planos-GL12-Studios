import { Plan, PlanId, ComparisonRow, CommercialConfig } from '../types';

export const COMMERCIAL_CONFIG: CommercialConfig = {
  agencyName: 'GL12 Studios',
  whatsappNumber: '5511999991212',
  whatsappNumberDisplay: '+55 (11) 99999-1212',
  email: 'comercial@gl12studios.com.br',
  city: 'São Paulo, SP',
  operatingHours: 'Segunda a Sexta, 09h às 18h',
};

export const PLANS: Plan[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    tagline: 'O necessário para começar com profissionalismo.',
    priceRef: 'R$ 850',
    priceFormatted: 'R$ 850',
    pricePeriod: 'investimento de referência',
    positioning: 'O necessário para começar com profissionalismo.',
    description:
      'Uma presença digital objetiva, organizada e funcional, com os recursos fundamentais para apresentar sua empresa na internet.',
    keyDifferentiators: [
      'Estrutura essencial e limpa',
      'Totalmente adaptado a celulares e tablets',
      'Integração direta com WhatsApp e formulário',
      'SEO semântico para indexação nos buscadores',
    ],
    features: [
      'Site com estrutura essencial',
      'Design limpo e responsivo',
      'Adaptação para celulares, tablets e computadores',
      'Seções fundamentais para apresentar o negócio',
      'Textos e botões organizados',
      'Links de contato',
      'Integração com WhatsApp quando aplicável',
      'Formulário de contato quando necessário',
      'SEO básico, incluindo títulos, descrições e estrutura semântica',
      'Otimização básica de carregamento',
      'Configuração de favicon e metadados essenciais',
      'Testes básicos de funcionamento',
      'Estrutura preparada para indexação pelos buscadores',
    ],
    ctaLabel: 'Explorar Essencial',
    demoSite: {
      name: 'Clínica Alvorada — Fisioterapia & Bem-Estar',
      segment: 'Saúde & Fisioterapia Integrada',
      description:
        'Demonstração funcional de um site Essencial: arquitetura direta ao ponto, horários, localização, serviços claros e contato ágil via WhatsApp.',
      heroImage: '/src/assets/images/demo_essencial_clinic_1793290223891.jpg',
      featuresSample: [
        'Apresentação institucional direta',
        'Grid de 3 tratamentos principais',
        'Botão flutuante e de cabeçalho para WhatsApp',
        'Formulário enxuto de agendamento rápido',
      ],
    },
  },
  {
    id: 'extra',
    name: 'Extra',
    badge: 'MAIS RECOMENDADO',
    tagline: 'Uma experiência mais profissional, visualmente refinada e estratégica.',
    priceRef: 'R$ 1.500',
    priceFormatted: 'R$ 1.500',
    pricePeriod: 'investimento de referência',
    positioning: 'Uma experiência mais profissional, visualmente refinada e estratégica.',
    description:
      'Tudo o que o Essencial oferece, elevado por um design mais sofisticado, uma apresentação comercial mais forte e uma experiência de navegação cuidadosamente planejada.',
    keyDifferentiators: [
      'Hero section impactante com direção de arte dedicada',
      'Microinterações suaves e componentes visuais personalizados',
      'SEO on-page mais completo e refinamento de performance',
      'Arquitetura de conversão com CTAs estrategicamente distribuídos',
    ],
    features: [
      'Todos os recursos do Plano Essencial',
      'Design visual mais elaborado e personalizado',
      'Direção de arte consistente com a identidade da marca',
      'Hero section mais impactante',
      'Hierarquia visual avançada',
      'Seções comerciais mais estratégicas',
      'Animações sutis e microinterações',
      'Transições refinadas entre elementos',
      'Melhor apresentação de serviços e produtos',
      'Componentes visuais personalizados',
      'Elementos de prova social quando houver dados reais',
      'Chamadas para ação estrategicamente posicionadas',
      'SEO on-page mais completo',
      'Estrutura semântica aprimorada',
      'Otimização adicional de imagens',
      'Melhorias de acessibilidade',
      'Refinamento de performance',
      'Testes de responsividade em diferentes resoluções',
      'Revisão de navegação e experiência do usuário',
    ],
    ctaLabel: 'Explorar Extra',
    demoSite: {
      name: 'Nexus Studio — Arquitetura & Interiores',
      segment: 'Arquitetura Comercial & Residencial',
      description:
        'Demonstração funcional de um site Extra: estética editorial requintada, galeria de projetos filtrável com tabs interativas, prova de processo e conversão calculada.',
      heroImage: '/src/assets/images/demo_extra_arch_1793290225566.jpg',
      featuresSample: [
        'Hero editorial com tipografia marcante e métricas chave',
        'Filtro dinâmico de projetos (Residencial, Corporativo, Iluminação)',
        'Cards interativos com expansão visual de conceitos',
        'Metodologia em 4 etapas detalhada para o cliente',
      ],
    },
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    badge: 'EXPERIÊNCIA EXCLUSIVA',
    tagline: 'Criação personalizada de alto padrão, com arquitetura visual e técnica adaptada ao projeto.',
    priceRef: 'R$ 2.000 a R$ 5.000',
    priceFormatted: 'R$ 2.000 a R$ 5.000',
    pricePeriod: 'conforme escopo e especificações',
    positioning: 'Criação personalizada de alto padrão, com arquitetura visual e técnica adaptada ao projeto.',
    description:
      'Uma experiência digital desenvolvida em torno da identidade, dos objetivos e do posicionamento da sua empresa. Cada detalhe é pensado para entregar uma presença digital diferenciada.',
    keyDifferentiators: [
      'Direção de arte exclusiva e hero section sob medida',
      'Elementos 3D interativos e transições cinematográficas discretas',
      'SEO técnico aprofundado, Schema.org e Core Web Vitals no estado da arte',
      'Arquitetura escalável pronta para futuras integrações contratuais',
    ],
    features: [
      'Tudo dos planos anteriores elevado ao nível mais avançado',
      'Design totalmente personalizado para o projeto',
      'Direção de arte exclusiva',
      'Hero section desenvolvida sob medida',
      'Composições visuais sofisticadas',
      'Elementos 3D quando agregarem valor real',
      'Animações avançadas com propósito',
      'Interações personalizadas',
      'Transições cinematográficas quando fizerem sentido',
      'Componentes e layouts exclusivos',
      'Experiência de navegação cuidadosamente projetada',
      'SEO técnico e on-page avançado',
      'Metadados, canonical e sitemap quando aplicáveis',
      'Dados estruturados adequados ao negócio',
      'Estratégia de indexação e rastreabilidade',
      'Otimização avançada de imagens e recursos',
      'Otimização de Core Web Vitals',
      'Carregamento progressivo quando adequado',
      'Carregamento sob demanda para recursos pesados',
      'Otimização de fontes e scripts',
      'Acessibilidade e semântica avançadas',
      'Testes aprofundados de responsividade',
      'Verificação de erros e desempenho',
      'Arquitetura preparada para futuras expansões',
      'Integrações e funcionalidades personalizadas, conforme o escopo contratado',
    ],
    ctaLabel: 'Explorar Deluxe',
    demoSite: {
      name: 'Aura Private Estates & Signature Pavilions',
      segment: 'Empreendimentos de Luxo & Propriedades Singulares',
      description:
        'Demonstração funcional de um site Deluxe: visualizador 3D interativo em tempo real, direção de arte cinematográfica, alternância imersiva de iluminação e especificações técnicas sob medida.',
      heroImage: '/src/assets/images/demo_deluxe_luxury_1793290224788.jpg',
      featuresSample: [
        'Visualizador tridimensional interativo com rotação por mouse/toque',
        'Controles de iluminação da residência (Crepúsculo, Meio-dia, Noturno)',
        'Menu de especificações de materiais nobres com zoom de detalhe',
        'Formulário privativo de atendimento confidencial e concierge',
      ],
    },
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Design responsivo',
    essencial: 'Sim (celular, tablet e desktop)',
    extra: 'Sim (refinamento avançado por resolução)',
    deluxe: 'Sim (experiência adaptativa e sob medida)',
  },
  {
    feature: 'Estrutura profissional',
    essencial: 'Sim (seções fundamentais)',
    extra: 'Sim (seções comerciais estratégicas)',
    deluxe: 'Sim (arquitetura exclusiva e customizada)',
  },
  {
    feature: 'SEO básico',
    essencial: 'Sim (títulos, meta tags e semântica)',
    extra: 'Sim (otimização on-page aprofundada)',
    deluxe: 'Sim (SEO técnico completo e dados estruturados)',
  },
  {
    feature: 'Design refinado',
    essencial: 'Básico e organizado',
    extra: 'Avançado e personalizado',
    deluxe: 'Exclusivo de alto padrão',
  },
  {
    feature: 'Animações',
    essencial: 'Essenciais e discretas',
    extra: 'Microinterações e transições suaves',
    deluxe: 'Personalizadas e cinematográficas com propósito',
  },
  {
    feature: 'SEO técnico avançado',
    essencial: 'Não incluso por padrão',
    extra: 'Conforme escopo',
    deluxe: 'Incluído no escopo definido',
  },
  {
    feature: 'Elementos 3D',
    essencial: 'Não previstos',
    extra: 'Quando aplicável',
    deluxe: 'Quando apropriados ao projeto',
  },
  {
    feature: 'Hero section personalizada',
    essencial: 'Básica e objetiva',
    extra: 'Refinada e impactante',
    deluxe: 'Exclusiva e desenvolvida sob medida',
  },
  {
    feature: 'Performance',
    essencial: 'Otimização básica',
    extra: 'Otimização aprimorada',
    deluxe: 'Otimização avançada (Core Web Vitals)',
  },
  {
    feature: 'Personalização',
    essencial: 'Essencial e funcional',
    extra: 'Ampliada e estratégica',
    deluxe: 'Sob medida e exclusiva',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Qual plano é ideal para minha empresa?',
    answer:
      'Depende do estágio e do objetivo do seu negócio. Se você precisa colocar sua empresa na internet com rapidez, baixo investimento e apresentação limpa, o Essencial (R$ 850) é perfeito. Se você já tem concorrência ativa e quer se destacar com um design refinado, maior autoridade e estratégia de conversão, o Extra (R$ 1.500) é o mais recomendado. Se sua empresa busca uma presença exclusiva, de alto padrão, com elementos únicos ou interações sob medida, o Deluxe (R$ 2.000 a R$ 5.000) entrega essa exclusividade.',
  },
  {
    question: 'Qual é a diferença entre Essencial, Extra e Deluxe?',
    answer:
      'A diferença está na profundidade da direção de arte, no nível de personalização, no escopo técnico e no tempo de design dedicado. O Essencial é direto, funcional e limpo. O Extra acrescenta direção de arte elaborada, microinterações, SEO on-page completo e arquitetura de vendas superior. O Deluxe é construído sob medida em cada detalhe, podendo incluir elementos 3D, SEO técnico avançado, dados estruturados e otimizações de Core Web Vitals.',
  },
  {
    question: 'O valor inclui domínio e hospedagem?',
    answer:
      'Não. Os valores de referência apresentados cobrem o design, desenvolvimento, programação e otimizações técnicas do site. Os custos anuais de registro de domínio (ex: registro.br) e de serviço de hospedagem/servidor são contratados em nome do cliente para garantir que você seja sempre o único proprietário dos seus ativos digitais. A GL12 Studios presta todo o suporte na configuração.',
  },
  {
    question: 'Posso solicitar alterações durante o desenvolvimento?',
    answer:
      'Sim. Todo projeto conta com etapas de aprovação (briefing, apresentação visual e testes finais) com rodadas de alinhamento e ajustes previstos no escopo da proposta comercial, garantindo total transparência e concordância antes do lançamento.',
  },
  {
    question: 'O site funciona em celulares?',
    answer:
      'Absolutamente. Os três níveis são 100% responsivos e projetados para funcionar perfeitamente em smartphones, tablets, notebooks e grandes monitores. No Extra e Deluxe, o refinamento da experiência mobile recebe atenção visual e testes de ergonomia de toque ainda mais detalhados.',
  },
  {
    question: 'O que está incluído no SEO?',
    answer:
      'No plano Essencial, incluímos estrutura semântica HTML5, títulos, metatags de descrição, favicon e preparação básica para os buscadores. No Extra, há refinamento de palavras-chave on-page, otimização de imagens e semântica aprofundada. No Deluxe, implementamos dados estruturados (Schema.org), canonical, sitemap XML e práticas avançadas voltadas para Core Web Vitals e indexação otimizada.',
  },
  {
    question: 'O Deluxe sempre precisa ter elementos 3D?',
    answer:
      'Não necessariamente. No Plano Deluxe, elementos tridimensionais, shaders ou WebGL são empregados quando realmente agregam valor à marca e à mensagem da empresa, sem nunca comprometer a velocidade, a acessibilidade ou a usabilidade em dispositivos mais modestos.',
  },
  {
    question: 'Posso contratar funcionalidades personalizadas?',
    answer:
      'Sim. Recursos específicos como sistemas de agendamento integrado, painéis administrativos, CMS headless, catálogos extensos, múltiplos idiomas ou integrações com APIs e CRMs podem ser orçados sob medida no momento do briefing comercial.',
  },
  {
    question: 'Quanto tempo leva para desenvolver meu site?',
    answer:
      'O prazo de entrega varia conforme a complexidade do projeto, agilidade no envio dos conteúdos (textos, logos e fotos) e rodadas de revisão. Em média, projetos Essenciais demandam prazos mais curtos, enquanto Extra e Deluxe requerem cronogramas estruturados de design e testes. O prazo exato é sempre formalizado na proposta comercial.',
  },
  {
    question: 'Posso evoluir de um plano para outro no futuro?',
    answer:
      'Com certeza. Nossa arquitetura de código é limpa, moderna e modular. Uma empresa que inicia hoje no plano Essencial pode posteriormente contratar a evolução visual e técnica para o Extra ou Deluxe, aproveitando a base já estabelecida.',
  },
];

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((plan) => plan.id === id);
}

export function getNextPlan(currentId: PlanId): Plan {
  const currentIndex = PLANS.findIndex((p) => p.id === currentId);
  const nextIndex = (currentIndex + 1) % PLANS.length;
  return PLANS[nextIndex];
}

export function getPrevPlan(currentId: PlanId): Plan {
  const currentIndex = PLANS.findIndex((p) => p.id === currentId);
  const prevIndex = (currentIndex - 1 + PLANS.length) % PLANS.length;
  return PLANS[prevIndex];
}
