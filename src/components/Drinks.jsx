import { motion } from 'framer-motion'
import { Martini } from 'lucide-react'
import { useData } from '../context/DataContext'
import SmartImage from './SmartImage'

// Vitrine de bebidas & drinks — fotos grandes e apetitosas (estilo "food porn").
// Só renderiza se houver ao menos uma foto cadastrada (aba Bebidas & Drinks no admin).
export default function Drinks() {
  const { drinks, config } = useData()
  const c = config.content.drinks
  if (!drinks || drinks.length === 0) return null

  return (
    <section
      id="bebidas"
      className="relative scroll-mt-24 overflow-hidden bg-forest-950 py-20 text-sand-100"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-60" />
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow text-gold-300">
            <Martini size={14} /> {c.eyebrow}
          </span>
          <h2 className="section-title mt-3 text-white">
            {c.title} <span className="gold-text">{c.titleGold}</span>
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-sand-100/70">{c.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {drinks.map((d, i) => (
            <motion.figure
              key={d.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-white/10"
            >
              <SmartImage
                src={d.src}
                alt={d.alt || d.caption || 'Bebida'}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent" />
              {d.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-sm font-semibold text-white drop-shadow sm:text-base">
                    {d.caption}
                  </span>
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
