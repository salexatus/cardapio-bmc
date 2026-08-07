// Configuração padrão (semente). Quando o Supabase está configurado, estes
// valores são sobrescritos pelos dados salvos no painel admin (tabela site_config).
export const DEFAULT_CONFIG = {
  name: 'Balneário Monte Castelo',
  tagline: 'Às margens do Rio Urupá',
  description:
    'Comida no fogão a lenha, música ao vivo e o som das águas do Rio Urupá. Um refúgio para a família, com sabor de Rondônia.',
  // Telefone no formato internacional, somente dígitos (DDI + DDD + número).
  whatsapp: '5569999999999',
  whatsappMessage:
    'Olá! Vim pelo cardápio digital do Balneário Monte Castelo e gostaria de fazer um pedido. 🌿',
  instagram: 'https://instagram.com/balneariomontecastelo',
  instagramHandle: '@balneariomontecastelo',
  address: 'Rio Urupá, Ji-Paraná — Rondônia',
  mapsQuery: 'Rio Urupá, Ji-Paraná - RO',
  mapsEmbed:
    'https://www.google.com/maps?q=Rio%20Urup%C3%A1%20Ji-Paran%C3%A1%20RO&output=embed',
  url: 'https://balneariomontecastelo.com.br',
  hours: 'Terça a Domingo • 09h às 23h'
}

// Conteúdo editável do Hero e das dobras (seções). Cada título tem uma parte
// normal (`title`) e uma parte em dourado (`titleGold`). São os valores-padrão:
// enquanto o admin não editar, o site mostra exatamente estes textos.
export const DEFAULT_CONTENT = {
  hero: {
    badge: 'Música ao vivo • Fogão a lenha',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=70',
    ctaMenu: 'Ver Cardápio',
    ctaWhatsapp: 'WhatsApp',
    ctaMaps: 'Como Chegar'
  },
  menu: {
    eyebrow: 'Nosso Cardápio',
    title: 'Sabores à beira do',
    titleGold: 'Rio Urupá',
    subtitle:
      'Explore por categoria ou busque seu prato favorito. Toque em qualquer item para ver os detalhes e pedir.',
    image: ''
  },
  bestSellers: {
    eyebrow: 'Os favoritos da casa',
    title: 'Mais',
    titleGold: 'Vendidos',
    subtitle: 'Os pratos e drinks que conquistaram quem já sentou à nossa beira-rio.',
    image: ''
  },
  drinks: {
    eyebrow: 'Para brindar',
    title: 'Bebidas &',
    titleGold: 'Drinks',
    subtitle: 'Geladas, coloridas e irresistíveis — a companhia perfeita para o seu momento à beira-rio.'
  },
  gallery: {
    eyebrow: 'Momentos',
    title: 'Galeria',
    titleGold: 'Interativa',
    image: ''
  },
  events: {
    eyebrow: 'Programe-se',
    title: 'Agenda de',
    titleGold: 'Eventos',
    subtitle: 'Música ao vivo, gastronomia e noites especiais à beira do rio.',
    image: ''
  },
  location: {
    eyebrow: 'Venha nos visitar',
    title: 'Como',
    titleGold: 'Chegar',
    image: ''
  }
}

// Mescla o conteúdo salvo (JSON do banco) sobre os defaults, seção por seção,
// para que campos ausentes/vazios sempre tenham um valor exibível.
export function mergeContent(saved) {
  const out = {}
  for (const section of Object.keys(DEFAULT_CONTENT)) {
    out[section] = { ...DEFAULT_CONTENT[section], ...(saved?.[section] || {}) }
    // Trata string vazia como "usar o padrão".
    for (const k of Object.keys(out[section])) {
      if (out[section][k] === '' || out[section][k] == null) {
        out[section][k] = DEFAULT_CONTENT[section][k]
      }
    }
  }
  return out
}

// Helpers dependentes da config (recebem a config ativa).
export const buildWaLink = (config, msg) =>
  `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    msg ?? config.whatsappMessage
  )}`

export const buildMapsLink = (config) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    config.mapsQuery
  )}`
