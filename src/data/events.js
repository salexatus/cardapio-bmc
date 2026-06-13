// Agenda de eventos. Atualize livremente.
const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const EVENTS = [
  {
    id: 'e1',
    title: 'Sexta do Sertanejo Raiz',
    day: '20',
    month: 'JUN',
    weekday: 'Sexta-feira',
    time: '20h',
    artist: 'Duo Viola & Sanfona',
    description:
      'Música ao vivo na beira do rio com o melhor do sertanejo raiz, fogueira e clima de viola.',
    image: img('1514525253161-7a46d19cd819'),
    tag: 'Música ao vivo'
  },
  {
    id: 'e2',
    title: 'Feijoada à Beira-Rio',
    day: '22',
    month: 'JUN',
    weekday: 'Domingo',
    time: '12h',
    artist: 'Samba de Roda',
    description:
      'Feijoada completa servida no capricho, acompanhada de roda de samba e caipirinha gelada.',
    image: img('1543007630-9710e4a00a20'),
    tag: 'Gastronomia'
  },
  {
    id: 'e3',
    title: 'Luau Monte Castelo',
    day: '28',
    month: 'JUN',
    weekday: 'Sábado',
    time: '19h',
    artist: 'Banda Maré Cheia',
    description:
      'Pôr do sol, voz e violão, drinks autorais e os pés na areia. Uma noite inesquecível à beira do Urupá.',
    image: img('1429962714451-bb934ecdc4ec'),
    tag: 'Especial'
  }
]
