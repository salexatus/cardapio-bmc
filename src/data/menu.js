// Cardápio do Balneário Monte Castelo.
// Para trocar imagens, substitua a URL `image` (use fotos 4:3 ou 1:1 em boa resolução).
const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const CATEGORIES = [
  { id: 'refeicoes', label: 'Refeições', icon: '🍛' },
  { id: 'hamburgueres', label: 'Hambúrgueres', icon: '🍔' },
  { id: 'porcoes', label: 'Porções', icon: '🍟' },
  { id: 'bebidas', label: 'Bebidas', icon: '🥤' },
  { id: 'drinks', label: 'Drinks', icon: '🍹' }
]

export const MENU = [
  // ---------- REFEIÇÕES ----------
  {
    id: 'r1',
    category: 'refeicoes',
    name: 'Peixe na Telha do Urupá',
    description:
      'Filé de tambaqui assado no fogão a lenha, servido na telha com purê de banana, arroz, farofa crocante e vinagrete da casa.',
    price: 89.9,
    serves: 'Serve 2 pessoas',
    image: img('1485921325833-c519f76c4927'),
    badge: 'Chef',
    bestSeller: true,
    tags: ['fogão a lenha', 'peixe', 'regional']
  },
  {
    id: 'r2',
    category: 'refeicoes',
    name: 'Costela Fogo de Chão',
    description:
      'Costela bovina assada lentamente por 8 horas na lenha, desmanchando ao toque. Acompanha mandioca dourada e farofa de bacon.',
    price: 99.9,
    serves: 'Serve 2 a 3 pessoas',
    image: img('1544025162-d76694265947'),
    badge: 'Destaque',
    bestSeller: true,
    tags: ['fogão a lenha', 'carne']
  },
  {
    id: 'r3',
    category: 'refeicoes',
    name: 'Galinha Caipira na Panela',
    description:
      'Galinha caipira cozida no tacho de ferro com açafrão da terra, servida com arroz, quiabo e pirão cremoso.',
    price: 74.9,
    serves: 'Serve 2 pessoas',
    image: img('1604908176997-125f25cc6f3d'),
    tags: ['caseiro', 'regional']
  },
  {
    id: 'r4',
    category: 'refeicoes',
    name: 'Tilápia Frita Completa',
    description:
      'Tilápia inteira frita na hora, crocante por fora e macia por dentro. Acompanha arroz, batata frita e molho tártaro.',
    price: 69.9,
    serves: 'Serve 2 pessoas',
    image: img('1535399831218-d5bd36d1a6b3'),
    tags: ['peixe', 'frito']
  },
  {
    id: 'r5',
    category: 'refeicoes',
    name: 'Picanha na Brasa',
    description:
      'Picanha selada na brasa no ponto que você preferir, com arroz, vinagrete, farofa e fritas. Sabor de churrasco à beira-rio.',
    price: 109.9,
    serves: 'Serve 2 a 3 pessoas',
    image: img('1558030006-450675393462'),
    badge: 'Premium',
    tags: ['carne', 'brasa']
  },

  // ---------- HAMBÚRGUERES ----------
  {
    id: 'h1',
    category: 'hamburgueres',
    name: 'Monte Castelo Burger',
    description:
      'Blend artesanal 180g, cheddar maturado, bacon na lenha, cebola caramelizada e molho da casa no pão brioche.',
    price: 38.9,
    image: img('1568901346375-23c9450c58cd'),
    badge: 'Mais Pedido',
    bestSeller: true,
    tags: ['artesanal', 'bacon']
  },
  {
    id: 'h2',
    category: 'hamburgueres',
    name: 'Smash do Rio',
    description:
      'Dois smash burgers suculentos, queijo prato derretido, picles e maionese defumada. Crocância e sabor em cada mordida.',
    price: 34.9,
    image: img('1550547660-d9450f859349'),
    tags: ['smash', 'duplo']
  },
  {
    id: 'h3',
    category: 'hamburgueres',
    name: 'Burger Caipira',
    description:
      'Hambúrguer de costela, queijo coalho grelhado, ovo caipira, alface e tomate. Uma homenagem ao interior.',
    price: 36.9,
    image: img('1571091718767-18b5b1457add'),
    tags: ['costela', 'ovo']
  },
  {
    id: 'h4',
    category: 'hamburgueres',
    name: 'Veggie do Balneário',
    description:
      'Burger de grão-de-bico e legumes, queijo, rúcula, tomate seco e maionese de ervas no pão australiano.',
    price: 32.9,
    image: img('1520072959219-c595dc870360'),
    badge: 'Veg',
    tags: ['vegetariano']
  },

  // ---------- PORÇÕES ----------
  {
    id: 'p1',
    category: 'porcoes',
    name: 'Isca de Tilápia',
    description:
      'Iscas de tilápia empanadas e fritas na hora, douradinhas, com molho tártaro e limão. Perfeita para compartilhar.',
    price: 54.9,
    serves: 'Serve 3 a 4 pessoas',
    image: img('1606755962773-d324e0a13086'),
    badge: 'Destaque',
    bestSeller: true,
    tags: ['peixe', 'compartilhar']
  },
  {
    id: 'p2',
    category: 'porcoes',
    name: 'Mandioca com Costelinha',
    description:
      'Mandioca cozida e frita até dourar, servida com costelinha suína na lenha e geleia de pimenta artesanal.',
    price: 49.9,
    serves: 'Serve 3 a 4 pessoas',
    image: img('1623653387945-2fd25214f8fc'),
    tags: ['fogão a lenha', 'porco']
  },
  {
    id: 'p3',
    category: 'porcoes',
    name: 'Frango a Passarinho',
    description:
      'Frango temperado com alho dourado e cheiro-verde, frito crocante. Aquele petisco clássico de beira de rio.',
    price: 44.9,
    serves: 'Serve 3 pessoas',
    image: img('1562967914-608f82629710'),
    tags: ['frango', 'frito']
  },
  {
    id: 'p4',
    category: 'porcoes',
    name: 'Batata Rústica Trufada',
    description:
      'Batatas rústicas com alecrim, parmesão e um toque de azeite trufado. Crocância irresistível.',
    price: 36.9,
    serves: 'Serve 2 a 3 pessoas',
    image: img('1518013431117-eb1465fa5752'),
    tags: ['vegetariano']
  },
  {
    id: 'p5',
    category: 'porcoes',
    name: 'Tábua de Frios da Casa',
    description:
      'Seleção de queijos, embutidos artesanais, azeitonas, geleia e torradas. Ótima para acompanhar os drinks.',
    price: 64.9,
    serves: 'Serve 4 pessoas',
    image: img('1452195100486-9cc805987862'),
    badge: 'Premium',
    tags: ['compartilhar', 'queijos']
  },

  // ---------- BEBIDAS ----------
  {
    id: 'b1',
    category: 'bebidas',
    name: 'Suco Natural da Fruta',
    description:
      'Sucos naturais feitos na hora: maracujá, abacaxi com hortelã, acerola ou laranja. Pergunte os do dia.',
    price: 12.9,
    image: img('1622597467836-f3285f2131b8'),
    tags: ['natural', 'sem álcool']
  },
  {
    id: 'b2',
    category: 'bebidas',
    name: 'Água de Coco Gelada',
    description:
      'Água de coco natural, servida bem gelada. A bebida perfeita para os dias de sol à beira do rio.',
    price: 9.9,
    image: img('1536759808958-93c95f4a76a9'),
    tags: ['natural', 'sem álcool']
  },
  {
    id: 'b3',
    category: 'bebidas',
    name: 'Cerveja Long Neck',
    description:
      'Cervejas geladas em garrafa long neck. Pilsen, puro malte e opções sem glúten. Estupidamente gelada.',
    price: 11.9,
    image: img('1608270586620-248524c67de9'),
    tags: ['cerveja']
  },
  {
    id: 'b4',
    category: 'bebidas',
    name: 'Refrigerante Lata',
    description:
      'Linha completa de refrigerantes em lata, sempre gelados. Versões zero açúcar disponíveis.',
    price: 7.9,
    image: img('1581636625402-29b2a704ef13'),
    tags: ['sem álcool']
  },

  // ---------- DRINKS ----------
  {
    id: 'd1',
    category: 'drinks',
    name: 'Caipirinha do Urupá',
    description:
      'Cachaça artesanal, limão-taiti e açúcar mascavo, com um toque de capim-santo. O clássico repaginado.',
    price: 24.9,
    image: img('1551538827-9c037cb4f32a'),
    badge: 'Assinatura',
    bestSeller: true,
    tags: ['coquetel', 'cachaça']
  },
  {
    id: 'd2',
    category: 'drinks',
    name: 'Pôr do Sol Tropical',
    description:
      'Rum, maracujá, laranja e xarope de mel, em camadas que lembram o entardecer no rio. Drink autoral.',
    price: 29.9,
    image: img('1536935338788-846bb9981813'),
    badge: 'Autoral',
    tags: ['coquetel', 'tropical']
  },
  {
    id: 'd3',
    category: 'drinks',
    name: 'Gin Tônica de Frutas',
    description:
      'Gin premium, água tônica, frutas vermelhas e ervas frescas. Refrescante e aromático.',
    price: 32.9,
    image: img('1514362545857-3bc16c4c7d1b'),
    tags: ['coquetel', 'gin']
  },
  {
    id: 'd4',
    category: 'drinks',
    name: 'Mojito da Casa',
    description:
      'Rum branco, hortelã do quintal, limão e soda. Borbulhante, leve e perfeito para o calor.',
    price: 27.9,
    image: img('1551024709-8f23befc6f87'),
    tags: ['coquetel', 'refrescante']
  }
]

export const BEST_SELLERS = MENU.filter((item) => item.bestSeller)

export const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
