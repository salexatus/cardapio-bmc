import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Share2, ZoomIn, Check } from 'lucide-react'
import { formatPrice } from '../data/menu'
import { useData } from '../context/DataContext'

export default function ProductModal({ item, onClose }) {
  const { config, waLink } = useData()
  const [zoom, setZoom] = useState(false)
  const [shared, setShared] = useState(false)

  useEffect(() => {
    setZoom(false)
    setShared(false)
    if (item) {
      document.body.style.overflow = 'hidden'
      const onKey = (e) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [item, onClose])

  const share = async () => {
    if (!item) return
    const data = {
      title: `${item.name} • ${config.name}`,
      text: `Olha esse prato do ${config.name}: ${item.name} — ${formatPrice(item.price)}`,
      url: config.url
    }
    try {
      if (navigator.share) await navigator.share(data)
      else {
        await navigator.clipboard.writeText(`${data.text} ${data.url}`)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch {
      /* cancelado pelo usuário */
    }
  }

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 flex max-h-[92svh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:bg-forest-900 sm:rounded-3xl"
          >
            <div className="relative">
              <div
                className={`relative overflow-hidden ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setZoom((z) => !z)}
              >
                <img
                  src={item.image.replace('w=800', 'w=1100')}
                  alt={item.name}
                  className={`h-64 w-full object-cover transition-transform duration-500 sm:h-72 ${
                    zoom ? 'scale-[1.7]' : 'scale-100'
                  }`}
                />
                {!zoom && (
                  <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                    <ZoomIn size={13} /> Toque para ampliar
                  </span>
                )}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
              </div>

              <button
                onClick={onClose}
                aria-label="Fechar"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-forest-900 shadow-md backdrop-blur transition hover:scale-105"
              >
                <X size={18} />
              </button>
              {item.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-gold-shine px-3 py-1 text-xs font-bold text-forest-900 shadow">
                  {item.badge}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto p-5">
              <h3 className="font-display text-2xl font-bold text-forest-900 dark:text-sand-100">
                {item.name}
              </h3>
              {item.serves && (
                <span className="mt-2 w-fit rounded-full bg-forest-600/10 px-3 py-1 text-xs font-medium text-forest-700 dark:bg-white/10 dark:text-sand-100/70">
                  {item.serves}
                </span>
              )}
              <p className="mt-3 text-[15px] leading-relaxed text-forest-700/80 dark:text-sand-100/70">
                {item.description}
              </p>

              {item.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-gold-400/30 px-2.5 py-0.5 text-[11px] font-medium text-gold-600 dark:text-gold-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <span className="block text-[11px] uppercase tracking-widest text-forest-500/70 dark:text-sand-100/50">
                    Valor
                  </span>
                  <span className="font-display text-3xl font-bold text-forest-800 dark:text-gold-300">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <button
                  onClick={share}
                  className="grid h-11 w-11 place-items-center rounded-full bg-forest-600/10 text-forest-700 transition hover:bg-forest-600/20 dark:bg-white/10 dark:text-sand-100"
                  aria-label="Compartilhar prato"
                >
                  {shared ? <Check size={18} className="text-emerald-500" /> : <Share2 size={18} />}
                </button>
              </div>

              <a
                href={waLink(
                  `Olá! Quero pedir *${item.name}* (${formatPrice(item.price)}) do cardápio do ${config.name}. 🌿`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-5 w-full bg-[#25D366] py-3.5 text-white shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle size={19} /> Pedir pelo WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
