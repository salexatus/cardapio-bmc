import { motion } from 'framer-motion'
import { Flame, Star, Plus } from 'lucide-react'
import { formatPrice } from '../data/menu'
import { useData } from '../context/DataContext'
import SmartImage from './SmartImage'

export default function BestSellers({ onOpen }) {
  const { bestSellers } = useData()
  if (bestSellers.length === 0) return null
  return (
    <section
      id="mais-vendidos"
      className="relative scroll-mt-24 overflow-hidden bg-forest-900 py-20 text-sand-100"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-70" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow text-gold-300">
            <Flame size={14} /> Os favoritos da casa
          </span>
          <h2 className="section-title mt-3 text-white">
            Mais <span className="gold-text">Vendidos</span>
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-sand-100/70">
            Os pratos e drinks que conquistaram quem já sentou à nossa beira-rio.
          </p>
        </div>

        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {bestSellers.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => onOpen(item)}
              className="group relative w-[78vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-3xl text-left sm:w-auto sm:max-w-none"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl">
                <SmartImage
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full"
                  imgClassName="group-hover:scale-110 transition-transform duration-[900ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold-shine px-3 py-1 text-[11px] font-bold text-forest-900 shadow">
                  <Star size={12} fill="currentColor" /> Top {i + 1}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-sand-100/75">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-gold-300">
                      {formatPrice(item.price)}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-shine text-forest-900 shadow-gold transition-transform duration-300 group-hover:rotate-90">
                      <Plus size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
