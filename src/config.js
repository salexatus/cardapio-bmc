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

// Helpers dependentes da config (recebem a config ativa).
export const buildWaLink = (config, msg) =>
  `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    msg ?? config.whatsappMessage
  )}`

export const buildMapsLink = (config) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    config.mapsQuery
  )}`
