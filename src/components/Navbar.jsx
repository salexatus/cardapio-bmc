import { useEffect, useState } from 'react'
import { Menu as MenuIcon, X, Moon, Sun, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../context/DataContext'

const LINKS = [
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#mais-vendidos', label: 'Mais Vendidos' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#localizacao', label: 'Localização' }
]

export default function Navbar({ dark, toggleDark }) {
  const { config, mapsLink } = useData()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 sm:px-6 transition-all duration-500 ${
          scrolled ? 'glass py-2.5 shadow-glass mx-3 sm:mx-auto' : 'py-3 mx-3 sm:mx-auto'
        }`}
      >
        <a href="#top" className="flex items-center shrink-0" aria-label={config.name}>
          <img
            src={`${import.meta.env.BASE_URL}logo-bmc.png`}
            alt={config.name}
            className="h-10 w-auto drop-shadow-sm sm:h-11"
          />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-forest-700/90 transition-colors hover:bg-forest-600/10 hover:text-forest-900 dark:text-sand-100/80 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="grid h-9 w-9 place-items-center rounded-full text-forest-700 transition-colors hover:bg-forest-600/10 dark:text-gold-300 dark:hover:bg-white/10"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden btn-gold !px-4 !py-2 md:inline-flex"
          >
            <MapPin size={16} /> Como Chegar
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menu"
            className="grid h-9 w-9 place-items-center rounded-full text-forest-800 transition-colors hover:bg-forest-600/10 dark:text-sand-100 dark:hover:bg-white/10 md:hidden"
          >
            {open ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-3 mt-2 overflow-hidden rounded-3xl glass p-3 md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-forest-800 transition-colors hover:bg-forest-600/10 dark:text-sand-100 dark:hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-gold mt-2 w-full"
            >
              <MapPin size={16} /> Como Chegar
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
