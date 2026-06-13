// Galeria (semente). Editável depois pelo painel admin.
const photo = (id, w = 700) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const GALLERY = [
  { id: 'g1', src: photo('1559339352-11d035aa65de'), alt: 'Ambiente do restaurante', span: 'row-span-2' },
  { id: 'g2', src: photo('1414235077428-338989a2e8c0'), alt: 'Mesa servida', span: '' },
  { id: 'g3', src: photo('1466978913421-dad2ebd01d17'), alt: 'Comida na brasa', span: '' },
  { id: 'g4', src: photo('1470337458703-46ad1756a187'), alt: 'Café e doces', span: 'col-span-2' },
  { id: 'g5', src: photo('1533777324565-a040eb52facd'), alt: 'Rio ao entardecer', span: 'row-span-2' },
  { id: 'g6', src: photo('1517248135467-4c7edcad34c4'), alt: 'Almoço em família', span: '' },
  { id: 'g7', src: photo('1424847651672-bf20a4b0982b'), alt: 'Drinks coloridos', span: '' },
  { id: 'g8', src: photo('1555396273-367ea4eb4db5'), alt: 'Chopp gelado', span: 'col-span-2' }
]
