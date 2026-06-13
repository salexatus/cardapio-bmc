import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { UtensilsCrossed, MessageCircle, MapPin, ChevronDown } from 'lucide-react'
import { useData } from '../context/DataContext'

// Opcional: hospede um .mp4 (Cloudinary/Vercel Blob) e cole a URL aqui.
const HERO_VIDEO = ''
const POSTER =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=70'

export default function Hero() {
  const { config, waLink, mapsLink } = useData()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      {/* Camada de fundo com parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        {HERO_VIDEO ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={POSTER}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        ) : (
          <img src={POSTER} alt="Rio Urupá ao entardecer" className="h-full w-full object-cover" />
        )}
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-950/70 via-forest-950/40 to-forest-950/90" />
      <div className="absolute inset-0 -z-10 bg-hero-radial" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-5 text-center text-white"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
          Música ao vivo • Fogão a lenha
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl"
        >
          {config.name.split(' ')[0]}{' '}
          <span className="gold-text">{config.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-5 max-w-xl text-pretty text-base text-sand-100/90 sm:text-lg"
        >
          {SITE.tagline}. {SITE.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
        >
          <a href="#cardapio" className="btn-gold w-full sm:w-auto">
            <UtensilsCrossed size={18} /> Ver Cardápio
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-full bg-[#25D366] text-white shadow-lg hover:-translate-y-0.5 sm:w-auto"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full !text-white sm:w-auto"
          >
            <MapPin size={18} /> Como Chegar
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#cardapio"
        style={{ opacity }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-fit flex-col items-center gap-1 text-white/70"
        aria-label="Rolar para o cardápio"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Explore</span>
        <ChevronDown className="animate-float" size={22} />
      </motion.a>
    </section>
  )
}
