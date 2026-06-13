// Schemas dos formulários do admin. Usam os nomes de coluna do banco (snake_case).

export const menuSchema = (categoryOptions) => [
  { key: 'name', label: 'Nome do prato', type: 'text', required: true },
  { key: 'category', label: 'Categoria', type: 'select', options: categoryOptions, required: true },
  { key: 'price', label: 'Preço (R$)', type: 'number', step: '0.01', required: true },
  { key: 'description', label: 'Descrição', type: 'textarea' },
  { key: 'serves', label: 'Rende / serve', type: 'text', placeholder: 'Ex.: Serve 2 pessoas' },
  { key: 'image', label: 'Foto', type: 'image' },
  {
    key: 'badge',
    label: 'Selo de destaque',
    type: 'select',
    allowEmpty: true,
    options: [
      { value: 'Chef', label: 'Chef' },
      { value: 'Destaque', label: 'Destaque' },
      { value: 'Premium', label: 'Premium' },
      { value: 'Mais Pedido', label: 'Mais Pedido' },
      { value: 'Assinatura', label: 'Assinatura' },
      { value: 'Autoral', label: 'Autoral' },
      { value: 'Veg', label: 'Veg' }
    ]
  },
  { key: 'tags', label: 'Tags (separadas por vírgula)', type: 'tags' },
  { key: 'best_seller', label: 'Mostrar em "Mais Vendidos"', type: 'checkbox' },
  { key: 'available', label: 'Disponível (visível no site)', type: 'checkbox', default: true },
  { key: 'sort', label: 'Ordem', type: 'number' }
]

export const eventSchema = [
  { key: 'title', label: 'Título do evento', type: 'text', required: true },
  { key: 'day', label: 'Dia', type: 'text', placeholder: 'Ex.: 20' },
  { key: 'month', label: 'Mês', type: 'text', placeholder: 'Ex.: JUN' },
  { key: 'weekday', label: 'Dia da semana', type: 'text', placeholder: 'Ex.: Sexta-feira' },
  { key: 'time', label: 'Horário', type: 'text', placeholder: 'Ex.: 20h' },
  { key: 'artist', label: 'Atração / artista', type: 'text' },
  { key: 'tag', label: 'Etiqueta', type: 'text', placeholder: 'Ex.: Música ao vivo' },
  { key: 'description', label: 'Descrição', type: 'textarea' },
  { key: 'image', label: 'Foto', type: 'image' },
  { key: 'sort', label: 'Ordem', type: 'number' }
]

export const gallerySchema = [
  { key: 'src', label: 'Foto', type: 'image' },
  { key: 'alt', label: 'Descrição da foto (acessibilidade)', type: 'text' },
  {
    key: 'span',
    label: 'Tamanho no mosaico',
    type: 'select',
    allowEmpty: true,
    options: [
      { value: '', label: 'Padrão (1x1)' },
      { value: 'col-span-2', label: 'Largo (2x1)' },
      { value: 'row-span-2', label: 'Alto (1x2)' }
    ]
  },
  { key: 'sort', label: 'Ordem', type: 'number' }
]

export const configSchema = [
  { key: 'name', label: 'Nome do estabelecimento', type: 'text' },
  { key: 'tagline', label: 'Slogan', type: 'text' },
  { key: 'description', label: 'Descrição', type: 'textarea' },
  { key: 'whatsapp', label: 'WhatsApp (só números, com DDI+DDD)', type: 'text', placeholder: '5569999999999' },
  { key: 'whatsapp_message', label: 'Mensagem padrão do WhatsApp', type: 'textarea' },
  { key: 'instagram', label: 'URL do Instagram', type: 'text' },
  { key: 'instagram_handle', label: 'Usuário do Instagram', type: 'text', placeholder: '@balneario' },
  { key: 'address', label: 'Endereço', type: 'text' },
  { key: 'maps_query', label: 'Busca no Google Maps', type: 'text' },
  { key: 'maps_embed', label: 'URL do mapa (embed)', type: 'text' },
  { key: 'url', label: 'Domínio do site (para QR Code)', type: 'text' },
  { key: 'hours', label: 'Horário de funcionamento', type: 'text' }
]
