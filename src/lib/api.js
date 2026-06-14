// Camada de dados: lê do Supabase quando configurado; caso contrário usa as sementes.
// Também normaliza nomes de colunas (snake_case → camelCase) usados pela UI.
import { isSupabaseConfigured } from './env'
import { DEFAULT_CONFIG } from '../config'
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
  hours: r.hours
})

export async function loadSiteData() {
  // Sem Supabase → site 100% funcional com as sementes.
  if (!isSupabaseConfigured) {
    return {
      source: 'seed',
      config: DEFAULT_CONFIG,
      categories: SEED_CATEGORIES,
      menu: SEED_MENU,
      events: SEED_EVENTS,
      gallery: SEED_GALLERY
    }
  }

  try {
    const { supabase } = await import('./supabase')
    const [cfg, cats, menu, events, gallery] = await Promise.all([
      supabase.from('site_config').select('*').limit(1).maybeSingle(),
      supabase.from('categories').select('*').order('sort', { ascending: true }),
      supabase.from('menu_items').select('*').order('sort', { ascending: true }),
      supabase.from('events').select('*').order('sort', { ascending: true }),
      supabase.from('gallery').select('*').order('sort', { ascending: true })
    ])

    return {
      source: 'supabase',
      config: cfg.data ? { ...DEFAULT_CONFIG, ...mapConfigRow(cfg.data) } : DEFAULT_CONFIG,
      categories: cats.data?.length ? cats.data : SEED_CATEGORIES,
      menu: menu.data?.length ? menu.data.map(mapMenuRow).filter((m) => m.available) : SEED_MENU,
      events: events.data?.length ? events.data.map(mapEventRow) : SEED_EVENTS,
      gallery: gallery.data?.length ? gallery.data.map(mapGalleryRow) : SEED_GALLERY
    }
  } catch (err) {
    console.warn('[BMC] Falha ao carregar do Supabase, usando sementes:', err?.message)
    return {
      source: 'seed-fallback',
      config: DEFAULT_CONFIG,
      categories: SEED_CATEGORIES,
      menu: SEED_MENU,
      events: SEED_EVENTS,
      gallery: SEED_GALLERY
    }
  }
}
