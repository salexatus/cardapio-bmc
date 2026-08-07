import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { useData } from '../context/DataContext'
import ProductCard from './ProductCard'

// Categorias de bebida que têm uma vitrine própria (seção "Bebidas & Drinks").
const BEVERAGE_CATS = ['bebidas', 'drinks']

export default function Menu({ onOpen }) {
  const { menu, categories, config, drinks } = useData()
  const c = config.content.menu
  const [active, setActive] = useState('todos')
  const [query, setQuery] = useState('')

  // Ao clicar num chip: se a categoria é de bebida e NÃO tem itens de cardápio,
  // mas há fotos na vitrine, leva o usuário até a seção "Bebidas & Drinks".
  const handleTab = (cat) => {
    const hasItems = menu.some((m) => m.category === cat.id)
    if (!hasItems && BEVERAGE_CATS.includes(cat.id) && drinks?.length > 0) {
      document.getElementById('bebidas')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    setActive(cat.id)
  }

  const isBeverageActive = BEVERAGE_CATS.includes(active)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return menu.filter((item) => {
      const matchCat = active === 'todos' || item.category === active
      const matchQ =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.toLowerCase().includes(q))
      return matchCat && matchQ
    })
  }, [active, query, menu])

  const tabs = [{ id: 'todos', label: 'Todos', icon: '✨' }, ...categories]

  return (
    <section id="cardapio" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="text-center">
        <span className="eyebrow">
          <SlidersHorizontal size={14} /> {c.eyebrow}
        </span>
        <h2 className="section-title mt-3 text-forest-900 dark:text-sand-100">
          {c.title} <span className="gold-text">{c.titleGold}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-forest-700/70 dark:text-sand-100/60">
          {c.subtitle}
        </p>
      </div>

      {c.image && (
        <img
          src={c.image}
          alt=""
          loading="lazy"
          className="mx-auto mt-8 aspect-[21/9] w-full max-w-4xl rounded-3xl object-cover shadow-md"
        />
      )}

      {/* Busca */}
      <div className="sticky top-[72px] z-30 mx-auto mt-8 max-w-xl">
        <div className="flex items-center gap-2 rounded-full glass px-4 py-2.5 shadow-glass">
          <Search size={18} className="shrink-0 text-forest-500 dark:text-sand-100/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar prato, bebida ou ingrediente..."
            className="w-full bg-transparent text-sm text-forest-900 outline-none placeholder:text-forest-500/60 dark:text-sand-100 dark:placeholder:text-sand-100/40"
            aria-label="Buscar no cardápio"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Limpar busca" className="shrink-0">
              <X size={17} className="text-forest-500 dark:text-sand-100/60" />
            </button>
          )}
        </div>
      </div>

      {/* Filtros de categoria */}
      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
        {tabs.map((cat) => {
          const isActive = active === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => handleTab(cat)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'text-forest-900'
                  : 'text-forest-700/70 hover:text-forest-900 dark:text-sand-100/70 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="cat-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gold-shine shadow-gold"
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                />
              )}
              <span className="mr-1">{cat.icon}</span>
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Grade */}
      <motion.div layout className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <ProductCard key={item.id} item={item} onOpen={onOpen} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center text-forest-700/70 dark:text-sand-100/60">
          {query ? (
            <>
              <p className="text-lg font-medium">Nada encontrado para “{query}”.</p>
              <button onClick={() => setQuery('')} className="btn-gold mt-4">
                Limpar busca
              </button>
            </>
          ) : isBeverageActive && drinks?.length > 0 ? (
            <>
              <p className="text-lg font-medium">Nossas bebidas e drinks estão logo abaixo. 🍹</p>
              <a href="#bebidas" className="btn-gold mt-4">
                Ver Bebidas &amp; Drinks
              </a>
            </>
          ) : (
            <p className="text-lg font-medium">Ainda não há itens nesta categoria.</p>
          )}
        </div>
      )}
    </section>
  )
}
