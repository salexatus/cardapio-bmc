// Cardápio real do Balneário Monte Castelo (extraído dos PDFs oficiais).
// Itens com tamanhos diferentes usam `variations` (ex.: Meia/Inteira, Copo/Jarra).
// O campo `price` é sempre o menor valor (usado como "a partir de" no card).
const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

// Imagens por tipo (validadas visualmente).
const IMG = {
  buffet: img('1504674900247-0877df9cc836'),
  board: img('1452195100486-9cc805987862'),
  friedFish: img('1623653387945-2fd25214f8fc'),
  fishFillet: img('1580959375944-abd7e991f971'),
  friedChicken: img('1604908176997-125f25cc6f3d'),
  chickenWings: img('1562967914-608f82629710'),
  grilledMeat: img('1558030006-450675393462'),
  ribs: img('1544025162-d76694265947'),
  sausage: img('1632778149955-e80f8ceca2e8'),
  fries: img('1518013431117-eb1465fa5752'),
  salad: img('1512621776951-a57141f2eefd'),
  broth: img('1547592166-23ac45744acd'),
  pudim: img('1488477181946-6428a0291777'),
  beerBottle: img('1608270586620-248524c67de9'),
  beerMug: img('1555396273-367ea4eb4db5'),
  cocaCan: img('1554866585-cd94860890b7'),
  soda: img('1581636625402-29b2a704ef13'),
  water: img('1523362628745-0c100150b504'),
  energy: img('1622543925917-763c34d1a86e'),
  isotonic: img('1625708458528-802ec79b1ed8'),
  caipirinha: img('1551538827-9c037cb4f32a'),
  juiceJar: img('1622597467836-f3285f2131b8'),
  juiceCups: img('1424847651672-bf20a4b0982b')
}

export const CATEGORIES = [
  { id: 'refeicoes', label: 'Refeições', icon: '🍛' },
  { id: 'porcoes', label: 'Porções', icon: '🍟' },
  { id: 'bebidas', label: 'Bebidas', icon: '🍺' },
  { id: 'sucos', label: 'Sucos', icon: '🧃' },
  { id: 'sobremesas', label: 'Sobremesas', icon: '🍮' }
]

// Helper para itens Inteira/Meia (price = menor valor).
const whole = (meia, inteira) => ({
  price: meia,
  variations: [
    { label: 'Meia', price: meia },
    { label: 'Inteira', price: inteira }
  ]
})

export const MENU = [
  // ===================== REFEIÇÕES =====================
  {
    id: 'ref-kg-carne-peixe',
    category: 'refeicoes',
    name: 'Comida por Quilo — Carne e Peixe',
    description:
      'Self-service completo no capricho: arroz, feijão, saladas, acompanhamentos e carnes e peixes do dia. Preço por quilo.',
    serves: 'Por quilo',
    image: IMG.buffet,
    badge: 'Destaque',
    bestSeller: true,
    price: 69.5,
    tags: ['por quilo', 'self-service']
  },
  {
    id: 'ref-kg-proteinas',
    category: 'refeicoes',
    name: 'Comida por Quilo — Proteínas',
    description:
      'Buffet com seleção especial de proteínas nobres, carnes e peixes, além de todos os acompanhamentos. Preço por quilo.',
    serves: 'Por quilo',
    image: IMG.board,
    price: 98.7,
    tags: ['por quilo', 'self-service']
  },
  {
    id: 'ref-costelinha-tambaqui',
    category: 'refeicoes',
    name: 'Refeição de Costelinha de Tambaqui',
    description:
      'Costelinha de tambaqui frita e crocante, com arroz, farofa, vinagrete e acompanhamentos. Prato fartura para a família.',
    serves: 'Inteira serve 3 a 4 pessoas',
    image: IMG.friedFish,
    badge: 'Destaque',
    ...whole(111.5, 201.5),
    tags: ['peixe', 'regional', 'família']
  },
  {
    id: 'ref-file-tambaqui',
    category: 'refeicoes',
    name: 'Refeição de Filé de Tambaqui',
    description:
      'Filé de tambaqui preparado no ponto certo, acompanhado de arroz, farofa, vinagrete e guarnições. Um clássico da beira-rio.',
    serves: 'Inteira serve 3 a 4 pessoas',
    image: IMG.fishFillet,
    badge: 'Chef',
    ...whole(111.5, 213.0),
    tags: ['peixe', 'regional', 'família']
  },
  {
    id: 'ref-frango',
    category: 'refeicoes',
    name: 'Refeição de Frango',
    description:
      'Frango caipira saboroso com arroz, farofa, salada e acompanhamentos. Comida de casa, do jeito que a família gosta.',
    serves: 'Inteira serve 3 a 4 pessoas',
    image: IMG.friedChicken,
    ...whole(99.95, 193.5),
    tags: ['frango', 'caseiro', 'família']
  },
  {
    id: 'ref-carne-assada',
    category: 'refeicoes',
    name: 'Refeição de Carne Assada',
    description:
      'Carne assada macia e suculenta, com arroz, farofa, vinagrete e guarnições. Sabor de churrasco para compartilhar.',
    serves: 'Inteira serve 3 a 4 pessoas',
    image: IMG.grilledMeat,
    ...whole(111.5, 213.0),
    tags: ['carne', 'família']
  },
  {
    id: 'ref-pirao-costelinha-peixe',
    category: 'refeicoes',
    name: 'Pirão com Costelinha de Peixe',
    description:
      'Pirão cremoso da casa servido com costelinha de peixe. Tradição ribeirinha em prato fartura.',
    serves: 'Serve 3 a 4 pessoas',
    image: IMG.broth,
    price: 129.0,
    tags: ['peixe', 'regional']
  },
  {
    id: 'ref-pirao-file-peixe',
    category: 'refeicoes',
    name: 'Pirão com Filé de Peixe',
    description:
      'Pirão cremoso acompanhado de filé de peixe macio. Conforto e sabor de Rondônia.',
    serves: 'Serve 3 a 4 pessoas',
    image: IMG.broth,
    price: 122.0,
    tags: ['peixe', 'regional']
  },

  // ===================== PORÇÕES =====================
  {
    id: 'por-isca-peixe',
    category: 'porcoes',
    name: 'Isca de Peixe',
    description:
      'Iscas de peixe empanadas e fritas na hora, douradinhas e crocantes. Perfeitas para compartilhar.',
    image: IMG.friedFish,
    badge: 'Destaque',
    bestSeller: true,
    price: 28.5,
    tags: ['peixe', 'compartilhar']
  },
  {
    id: 'por-torresminho-peixe',
    category: 'porcoes',
    name: 'Torresminho de Peixe',
    description: 'Torresmo de peixe crocante, sequinho e irresistível. O petisco da casa.',
    image: IMG.friedFish,
    price: 25.0,
    tags: ['peixe', 'petisco']
  },
  {
    id: 'por-empanados',
    category: 'porcoes',
    name: 'Empanados',
    description: 'Porção de empanados crocantes, douradinhos e quentinhos.',
    image: IMG.friedFish,
    price: 24.0,
    tags: ['petisco']
  },
  {
    id: 'por-saladas',
    category: 'porcoes',
    name: 'Saladas',
    description: 'Salada fresca da casa, leve e colorida, para acompanhar.',
    image: IMG.salad,
    price: 16.0,
    tags: ['salada', 'leve']
  },
  {
    id: 'por-meio-asa-picante',
    category: 'porcoes',
    name: 'Meio da Asa Picante',
    description:
      'Meios da asa de frango no tempero picante da casa, suculentos e cheios de sabor.',
    image: IMG.chickenWings,
    ...whole(34.5, 54.0),
    tags: ['frango', 'picante']
  },
  {
    id: 'por-frango-passarinho',
    category: 'porcoes',
    name: 'Frango a Passarinho',
    description:
      'Frango a passarinho com alho dourado e cheiro-verde, frito crocante. Clássico de beira de rio.',
    image: IMG.friedChicken,
    bestSeller: true,
    ...whole(26.0, 40.5),
    tags: ['frango', 'frito']
  },
  {
    id: 'por-calabresa',
    category: 'porcoes',
    name: 'Calabresa Acebolada',
    description: 'Calabresa fatiada e grelhada com cebola. Acompanha bem aquela gelada.',
    image: IMG.sausage,
    ...whole(26.0, 40.5),
    tags: ['petisco']
  },
  {
    id: 'por-carne-assada',
    category: 'porcoes',
    name: 'Porção de Carne Assada',
    description: 'Carne assada macia e suculenta em porção generosa para a mesa.',
    image: IMG.grilledMeat,
    ...whole(42.0, 59.8),
    tags: ['carne', 'compartilhar']
  },
  {
    id: 'por-batata-frita',
    category: 'porcoes',
    name: 'Batata Frita',
    description: 'Batatas fritas crocantes por fora e macias por dentro. Sempre um sucesso.',
    image: IMG.fries,
    ...whole(20.0, 28.5),
    tags: ['compartilhar']
  },
  {
    id: 'por-acompanhamentos',
    category: 'porcoes',
    name: 'Acompanhamentos',
    description: 'Porção de acompanhamentos para completar seu pedido.',
    image: IMG.board,
    price: 17.5,
    tags: ['acompanhamento']
  },
  {
    id: 'por-costelinha-tambaqui',
    category: 'porcoes',
    name: 'Costelinha de Tambaqui',
    description:
      'Costelinha de tambaqui frita e crocante, com limão e molho da casa. Para dividir (ou não!).',
    image: IMG.friedFish,
    badge: 'Destaque',
    bestSeller: true,
    ...whole(33.8, 57.6),
    tags: ['peixe', 'regional']
  },
  {
    id: 'por-file-tambaqui',
    category: 'porcoes',
    name: 'Filé de Tambaqui',
    description: 'Filé de tambaqui crocante e macio, no ponto certo. A estrela do rio.',
    image: IMG.fishFillet,
    badge: 'Chef',
    ...whole(39.0, 67.5),
    tags: ['peixe', 'regional']
  },
  {
    id: 'por-lambari',
    category: 'porcoes',
    name: 'Lambari',
    description: 'Lambaris fritos crocantes, douradinhos, com limão. Petisco tradicional.',
    image: IMG.friedFish,
    price: 45.0,
    tags: ['peixe', 'petisco']
  },
  {
    id: 'por-bolinho-peixe',
    category: 'porcoes',
    name: 'Bolinho de Peixe',
    description: 'Bolinhos de peixe fritos, crocantes por fora e macios por dentro.',
    image: IMG.friedFish,
    price: 60.5,
    tags: ['peixe', 'petisco']
  },
  {
    id: 'por-pirao',
    category: 'porcoes',
    name: 'Pirão',
    description: 'Pirão cremoso da casa, no capricho.',
    image: IMG.broth,
    price: 30.5,
    tags: ['regional']
  },
  {
    id: 'por-caldo-feijao',
    category: 'porcoes',
    name: 'Caldo de Feijão',
    description: 'Caldo de feijão encorpado e quentinho, do jeito caseiro.',
    image: IMG.broth,
    price: 30.5,
    tags: ['caldo', 'caseiro']
  },

  // ===================== BEBIDAS =====================
  // Cervejas garrafa
  { id: 'beb-heineken-600', category: 'bebidas', name: 'Heineken 600 ml', description: 'Garrafa 600 ml, estupidamente gelada.', image: IMG.beerBottle, price: 19.0, tags: ['cerveja'] },
  { id: 'beb-antartica-600', category: 'bebidas', name: 'Original Antarctica 600 ml', description: 'Garrafa 600 ml, bem gelada.', image: IMG.beerBottle, price: 14.0, tags: ['cerveja'] },
  { id: 'beb-skol-600', category: 'bebidas', name: 'Skol 600 ml', description: 'Garrafa 600 ml, geladíssima.', image: IMG.beerBottle, price: 12.0, tags: ['cerveja'] },
  { id: 'beb-brahma-chopp-600', category: 'bebidas', name: 'Brahma Chopp 600 ml', description: 'Garrafa 600 ml, bem gelada.', image: IMG.beerMug, price: 12.0, tags: ['cerveja'] },
  { id: 'beb-amstel-600', category: 'bebidas', name: 'Amstel 600 ml', description: 'Garrafa 600 ml, gelada.', image: IMG.beerBottle, price: 15.0, tags: ['cerveja'] },
  { id: 'beb-spaten-600', category: 'bebidas', name: 'Spaten 600 ml', description: 'Garrafa 600 ml, gelada.', image: IMG.beerBottle, price: 15.0, tags: ['cerveja'] },
  { id: 'beb-corona', category: 'bebidas', name: 'Corona', description: 'Cerveja Corona gelada.', image: IMG.beerBottle, price: 10.0, tags: ['cerveja'] },
  { id: 'beb-zero-alcool', category: 'bebidas', name: 'Cerveja Zero Álcool', description: 'Opção sem álcool, bem gelada.', image: IMG.beerBottle, price: 11.0, tags: ['cerveja', 'sem álcool'] },
  // Cervejas lata
  { id: 'beb-skol-lata', category: 'bebidas', name: 'Skol Lata', description: 'Lata gelada.', image: IMG.beerBottle, price: 5.0, tags: ['cerveja', 'lata'] },
  { id: 'beb-brahma-lata', category: 'bebidas', name: 'Brahma Lata', description: 'Lata gelada.', image: IMG.beerBottle, price: 5.0, tags: ['cerveja', 'lata'] },
  { id: 'beb-original-amstel-lata', category: 'bebidas', name: 'Original / Amstel Lata', description: 'Lata gelada (Original ou Amstel).', image: IMG.beerBottle, price: 7.0, tags: ['cerveja', 'lata'] },
  // Long necks
  { id: 'beb-corona-ln', category: 'bebidas', name: 'Corona Long Neck', description: 'Long neck gelada.', image: IMG.beerBottle, price: 11.0, tags: ['cerveja', 'long neck'] },
  { id: 'beb-spaten-ln', category: 'bebidas', name: 'Spaten Long Neck', description: 'Long neck gelada.', image: IMG.beerBottle, price: 11.0, tags: ['cerveja', 'long neck'] },
  { id: 'beb-heineken-ln', category: 'bebidas', name: 'Heineken Long Neck', description: 'Long neck gelada.', image: IMG.beerBottle, price: 11.0, tags: ['cerveja', 'long neck'] },
  { id: 'beb-heineken-ln-zero', category: 'bebidas', name: 'Heineken Long Neck Zero', description: 'Long neck sem álcool, gelada.', image: IMG.beerBottle, price: 13.0, tags: ['cerveja', 'long neck', 'sem álcool'] },
  { id: 'beb-budweiser-ln', category: 'bebidas', name: 'Budweiser Long Neck', description: 'Long neck gelada.', image: IMG.beerBottle, price: 11.0, tags: ['cerveja', 'long neck'] },
  { id: 'beb-brahma-ln', category: 'bebidas', name: 'Brahma Long Neck', description: 'Long neck gelada.', image: IMG.beerBottle, price: 11.0, tags: ['cerveja', 'long neck'] },
  { id: 'beb-brahma-ln-zero', category: 'bebidas', name: 'Brahma Long Neck Zero', description: 'Long neck sem álcool, gelada.', image: IMG.beerBottle, price: 13.0, tags: ['cerveja', 'long neck', 'sem álcool'] },
  // Refrigerantes
  { id: 'beb-coca-2l', category: 'bebidas', name: 'Coca-Cola 2 L', description: 'Refrigerante 2 litros.', image: IMG.cocaCan, price: 19.0, tags: ['refrigerante'] },
  { id: 'beb-coca-litro', category: 'bebidas', name: 'Coca-Cola 1 L', description: 'Refrigerante 1 litro.', image: IMG.cocaCan, price: 12.0, tags: ['refrigerante'] },
  { id: 'beb-coca-15-zero', category: 'bebidas', name: 'Coca-Cola Zero 1,5 L', description: 'Refrigerante zero açúcar 1,5 litro.', image: IMG.cocaCan, price: 16.0, tags: ['refrigerante', 'zero'] },
  { id: 'beb-coca-zero-600', category: 'bebidas', name: 'Coca-Cola Zero 600 ml', description: 'Refrigerante zero açúcar 600 ml.', image: IMG.cocaCan, price: 12.0, tags: ['refrigerante', 'zero'] },
  { id: 'beb-coca-zero-2l', category: 'bebidas', name: 'Coca-Cola Zero 2 L', description: 'Refrigerante zero açúcar 2 litros.', image: IMG.cocaCan, price: 19.0, tags: ['refrigerante', 'zero'] },
  { id: 'beb-sukita-2l', category: 'bebidas', name: 'Sukita 2 L', description: 'Refrigerante de laranja 2 litros.', image: IMG.soda, price: 13.0, tags: ['refrigerante'] },
  { id: 'beb-tuchaua-2l', category: 'bebidas', name: 'Tuchaua 2 L', description: 'Refrigerante regional 2 litros.', image: IMG.soda, price: 15.0, tags: ['refrigerante', 'regional'] },
  { id: 'beb-refri-lata', category: 'bebidas', name: 'Refrigerante Lata', description: 'Lata 350 ml, gelada.', image: IMG.soda, price: 8.0, tags: ['refrigerante', 'lata'] },
  // Águas
  { id: 'beb-agua', category: 'bebidas', name: 'Água Mineral', description: 'Garrafa de água mineral gelada.', image: IMG.water, price: 4.0, tags: ['água', 'sem álcool'] },
  { id: 'beb-agua-gas', category: 'bebidas', name: 'Água Mineral com Gás', description: 'Água mineral com gás, gelada.', image: IMG.water, price: 5.0, tags: ['água', 'sem álcool'] },
  { id: 'beb-agua-tonica', category: 'bebidas', name: 'Água Tônica', description: 'Água tônica gelada.', image: IMG.water, price: 10.0, tags: ['água', 'sem álcool'] },
  { id: 'beb-h2o', category: 'bebidas', name: 'H2O', description: 'H2O saborizada, gelada.', image: IMG.water, price: 10.0, tags: ['sem álcool'] },
  // Energéticos / isotônicos
  { id: 'beb-red-bull', category: 'bebidas', name: 'Red Bull', description: 'Energético Red Bull gelado.', image: IMG.energy, price: 18.0, tags: ['energético'] },
  { id: 'beb-gatorade', category: 'bebidas', name: 'Gatorade', description: 'Isotônico Gatorade gelado.', image: IMG.isotonic, price: 10.0, tags: ['isotônico'] },
  // Caipirinhas
  { id: 'beb-caipirinha-pinga', category: 'bebidas', name: 'Caipirinha de Pinga', description: 'Caipirinha de cachaça com limão e açúcar. O clássico bem-feito.', image: IMG.caipirinha, badge: 'Assinatura', bestSeller: true, price: 15.0, tags: ['drink', 'cachaça'] },
  { id: 'beb-caipirinha-vodka', category: 'bebidas', name: 'Caipirinha de Vodka', description: 'Caipirinha de vodka com limão e açúcar. Refrescante e marcante.', image: IMG.caipirinha, price: 17.0, tags: ['drink', 'vodka'] },

  // ===================== SUCOS =====================
  {
    id: 'suc-laranja-maracuja',
    category: 'sucos',
    name: 'Suco de Laranja ou Maracujá',
    description:
      'Suco natural da fruta, feito na hora. Sabores: laranja ou maracujá. Escolha copo ou jarra.',
    image: IMG.juiceJar,
    badge: 'Destaque',
    price: 15.0,
    variations: [
      { label: 'Copo', price: 15.0 },
      { label: 'Jarra', price: 21.0 }
    ],
    tags: ['natural', 'sem álcool']
  },
  {
    id: 'suc-outros-sabores',
    category: 'sucos',
    name: 'Sucos Naturais — Outros Sabores',
    description:
      'Sucos naturais feitos na hora. Sabores: acerola, cupuaçu, goiaba, abacaxi, abacaxi com hortelã, cenoura com limão, beterraba e limão. Escolha copo ou jarra.',
    image: IMG.juiceCups,
    price: 13.5,
    variations: [
      { label: 'Copo', price: 13.5 },
      { label: 'Jarra', price: 17.0 }
    ],
    tags: ['natural', 'sem álcool']
  },

  // ===================== SOBREMESAS =====================
  {
    id: 'sob-pudim',
    category: 'sobremesas',
    name: 'Pudim',
    description: 'Pudim de leite cremoso, com aquela calda caramelizada. O doce final perfeito.',
    image: IMG.pudim,
    price: 10.0,
    tags: ['sobremesa', 'doce']
  }
]

export const BEST_SELLERS = MENU.filter((item) => item.bestSeller)

export const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Menor preço de um item (considera variações).
export const itemFromPrice = (item) =>
  item.variations?.length
    ? Math.min(...item.variations.map((v) => v.price))
    : item.price
