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
  {
    key: 'image',
    label: 'Foto',
    type: 'image',
    hint: 'Tamanho ideal: 1080 × 1350 px (proporção 4:5, retrato).'
  },
  {
    key: 'video',
    label: 'Vídeo curto (opcional)',
    type: 'video',
    hint: 'MP4 vertical 4:5 (até ~64 MB). Toca sozinho, sem som, em loop. Se preenchido, substitui a foto.'
  },
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

export const categorySchema = [
  { key: 'label', label: 'Nome da categoria', type: 'text', required: true },
  { key: 'icon', label: 'Emoji (ícone)', type: 'text', placeholder: '🍰' },
  { key: 'sort', label: 'Ordem de exibição', type: 'number' }
]

export const drinkSchema = [
  { key: 'src', label: 'Foto do drink/bebida', type: 'image' },
  {
    key: 'caption',
    label: 'Nome (aparece sobre a foto)',
    type: 'text',
    placeholder: 'Ex.: Caipirinha de maracujá'
  },
  { key: 'alt', label: 'Descrição da foto (acessibilidade)', type: 'text' },
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
  {
    key: 'maps_query',
    label: 'Endereço para o mapa',
    type: 'text',
    hint: 'O mapa é montado a partir deste endereço automaticamente. Ex.: Alameda das Águas, 411 - Ji-Paraná - RO'
  },
  {
    key: 'maps_embed',
    label: 'URL de incorporação do mapa (opcional)',
    type: 'text',
    hint: 'Deixe vazio para usar o endereço acima. Só cole aqui se for o link "Incorporar mapa" do Google (contém output=embed). Link de compartilhamento (maps.app.goo.gl) NÃO funciona.'
  },
  { key: 'url', label: 'Domínio do site (para QR Code)', type: 'text' },
  { key: 'hours', label: 'Horário de funcionamento', type: 'text' }
]
