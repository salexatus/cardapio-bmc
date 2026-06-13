import { motion } from 'framer-motion'
import { CalendarDays, Clock, Music } from 'lucide-react'
import { useData } from '../context/DataContext'
import SmartImage from './SmartImage'

export default function Events() {
  const { events, waLink } = useData()
  if (events.length === 0) return null
  return (
    <section
      id="eventos"
      className="relative scroll-mt-24 overflow-hidden bg-sand-100 py-20 dark:bg-forest-900/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">
            <CalendarDays size={14} /> Programe-se
          </span>
          <h2 className="section-title mt-3 text-forest-900 dark:text-sand-100">
            Agenda de <span className="gold-text">Eventos</span>
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-forest-700/70 dark:text-sand-100/60">
            Música ao vivo, gastronomia e noites especiais à beira do rio.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {events.map((ev, i) => (
            <motion.article
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card/20 ring-1 ring-forest-900/5 dark:bg-forest-900/70 dark:ring-white/10"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <SmartImage
                  src={ev.image}
                  alt={ev.title}
                  className="h-full w-full"
                  imgClassName="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
                <div className="absolute left-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-white/95 text-forest-900 shadow-lg backdrop-blur dark:bg-forest-950/90 dark:text-sand-100">
                  <span className="font-display text-2xl font-bold leading-none">{ev.day}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500">
                    {ev.month}
                  </span>
                </div>
                <span className="absolute right-4 top-4 rounded-full bg-gold-shine px-3 py-1 text-[11px] font-bold text-forest-900 shadow">
                  {ev.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-semibold text-forest-900 dark:text-sand-100">
                  {ev.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-forest-600/80 dark:text-sand-100/60">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} /> {ev.weekday}, {ev.time}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Music size={14} /> {ev.artist}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm text-forest-700/70 dark:text-sand-100/60">
                  {ev.description}
                </p>
                <a
                  href={waLink(`Olá! Quero reservar uma mesa para o evento "${ev.title}" (${ev.day}/${ev.month}). 🌿`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost mt-4 w-full !py-2.5 text-sm"
                >
                  Reservar mesa
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
