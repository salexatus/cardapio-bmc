import { useEffect, useState } from 'react'
import { UtensilsCrossed, CalendarDays, Images, Settings, LogOut, ExternalLink } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { CATEGORIES as SEED_CATEGORIES } from '../data/menu'
import { menuSchema, eventSchema, gallerySchema } from './schemas'
import CollectionManager from './CollectionManager'
import ConfigEditor from './ConfigEditor'

const TABS = [
  { id: 'menu', label: 'Cardápio', icon: UtensilsCrossed },
  { id: 'events', label: 'Eventos', icon: CalendarDays },
  { id: 'gallery', label: 'Galeria', icon: Images },
  { id: 'config', label: 'Configurações', icon: Settings }
]

export default function Dashboard({ session }) {
  const [tab, setTab] = useState('menu')
  const [categories, setCategories] = useState(
    SEED_CATEGORIES.map((c) => ({ value: c.id, label: c.label }))
  )

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('sort', { ascending: true })
      .then(({ data }) => {
        if (data?.length) setCategories(data.map((c) => ({ value: c.id, label: c.label })))
      })
  }, [])

  return (
    <div className="min-h-screen bg-forest-950 text-sand-100">
      {/* Topo */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-forest-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-shine font-display text-lg font-bold text-forest-900">
              M
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">Painel Admin</p>
              <p className="text-[11px] text-sand-100/50">{session.user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20"
              aria-label="Ver site"
            >
              <ExternalLink size={16} />
            </a>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
            >
              <LogOut size={15} /> Sair
            </button>
          </div>
        </div>
      </header>

      {/* Abas */}
      <nav className="sticky top-[57px] z-30 border-b border-white/10 bg-forest-950/80 backdrop-blur-xl">
        <div className="no-scrollbar mx-auto flex max-w-3xl gap-1 overflow-x-auto px-3 py-2">
          {TABS.map((t) => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                  active ? 'bg-gold-shine text-forest-900' : 'text-sand-100/70 hover:bg-white/10'
                }`}
              >
                <Icon size={15} /> {t.label}
              </button>
            )
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {tab === 'menu' && (
          <CollectionManager
            table="menu_items"
            schema={menuSchema(categories)}
            title="Itens do cardápio"
            emptyDefaults={{ category: categories[0]?.value || '', price: 0 }}
          />
        )}
        {tab === 'events' && (
          <CollectionManager table="events" schema={eventSchema} title="Eventos" />
        )}
        {tab === 'gallery' && (
          <CollectionManager table="gallery" schema={gallerySchema} title="Fotos da galeria" />
        )}
        {tab === 'config' && <ConfigEditor />}
      </main>
    </div>
  )
}
