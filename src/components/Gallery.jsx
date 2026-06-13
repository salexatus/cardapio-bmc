import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { Camera, X, Instagram } from 'lucide-react'
import SmartImage from './SmartImage'
import { useData } from '../context/DataContext'

export default function Gallery() {
  const { gallery, config } = useData()
  const [lightbox, setLightbox] = useState(null)
  if (gallery.length === 0) return null

  return (
    <section id="galeria" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <span className="eyebrow">
          <Camera size={14} /> Momentos
        </span>
        <h2 className="section-title mt-3 text-forest-900 dark:text-sand-100">
          Galeria <span className="gold-text">Interativa</span>
        </h2>
        <a
          href={config.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-forest-700/80 transition hover:text-gold-500 dark:text-sand-100/70"
        >
          <Instagram size={16} /> {config.instagramHandle}
        </a>
      </div>

      <div className="mt-9 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4">
        {gallery.map((g, i) => (
          <motion.button
            key={g.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
            onClick={() => setLightbox(g)}
            className={`group relative overflow-hidden rounded-2xl ${g.span || ''}`}
          >
            <SmartImage
              src={g.src}
              alt={g.alt}
              className="h-full w-full"
              imgClassName="group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-forest-950/0 transition-colors duration-300 group-hover:bg-forest-950/30" />
          </motion.button>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 z-[90] flex items-center justify-center bg-forest-950/85 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
              <motion.img
                key={lightbox.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={lightbox.src.replace('w=700', 'w=1300')}
                alt={lightbox.alt}
                className="max-h-[85svh] max-w-full rounded-2xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
