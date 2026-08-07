// Camada de dados do site público: carrega tudo da API REST (endpoint /site)
// e normaliza nomes de colunas (snake_case → camelCase) usados pela UI.
// Em caso de falha de rede, cai nas sementes para o site nunca quebrar.
import { API_URL } from './env'
import { DEFAULT_CONFIG, mergeContent } from '../config'
import { MENU as SEED_MENU, CATEGORIES as SEED_CATEGORIES } from '../data/menu'
import { EVENTS as SEED_EVENTS } from '../data/events'
import { GALLERY as SEED_GALLERY } from '../data/gallery'

const mapMenuRow = (r) => ({
  id: r.id,
  category: r.category,
  name: r.name,
  description: r.description,
  price: Number(r.price),
  serves: r.serves || '',
  image: r.image,
  badge: r.badge || '',
  bestSeller: r.best_seller ?? r.bestSeller ?? false,
  tags: r.tags || [],
  variations: r.variations || undefined,
  available: r.available ?? true
})

const mapEventRow = (r) => ({
  id: r.id,
  title: r.title,
  day: r.day,
  month: r.month,
  weekday: r.weekday,
  time: r.time,
  artist: r.artist,
  description: r.description,
  image: r.image,
  tag: r.tag
})

const mapGalleryRow = (r) => ({ id: r.id, src: r.src, alt: r.alt || '', span: r.span || '' })

const mapConfigRow = (r) => ({
  name: r.name,
  tagline: r.tagline,
  description: r.description,
  whatsapp: r.whatsapp,
  whatsappMessage: r.whatsapp_message,
  instagram: r.instagram,
  instagramHandle: r.instagram_handle,
  address: r.address,
  mapsQuery: r.maps_query,
  mapsEmbed: r.maps_embed,
  url: r.url,
  hours: r.hours,
  content: mergeContent(r.content)
})

const seedPayload = (source) => ({
  source,
  config: { ...DEFAULT_CONFIG, content: mergeContent() },
  categories: SEED_CATEGORIES,
  menu: SEED_MENU,
  events: SEED_EVENTS,
  gallery: SEED_GALLERY
})

export async function loadSiteData() {
  try {
    const res = await fetch(`${API_URL}/api/v1/site`, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const d = await res.json()

    return {
      source: 'api',
      config: d.config
        ? { ...DEFAULT_CONFIG, ...mapConfigRow(d.config) }
        : { ...DEFAULT_CONFIG, content: mergeContent() },
      categories: d.categories?.length ? d.categories : SEED_CATEGORIES,
      menu: d.menu?.length ? d.menu.map(mapMenuRow).filter((m) => m.available) : SEED_MENU,
      events: d.events?.length ? d.events.map(mapEventRow) : SEED_EVENTS,
      gallery: d.gallery?.length ? d.gallery.map(mapGalleryRow) : SEED_GALLERY
    }
  } catch (err) {
    console.warn('[BMC] Falha ao carregar da API, usando sementes:', err?.message)
    return seedPayload('seed-fallback')
  }
}
