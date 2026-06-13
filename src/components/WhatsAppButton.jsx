import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../context/DataContext'

// Ícone oficial do WhatsApp (SVG inline para fidelidade visual).
function WhatsAppIcon({ size = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16.04 4C9.95 4 5 8.94 5 15.02c0 2.4.77 4.62 2.07 6.44L5.6 27l5.7-1.5a11 11 0 0 0 4.73 1.07h.01c6.08 0 11.03-4.94 11.03-11.02C27.07 8.94 22.12 4 16.04 4Zm0 20.1a9.1 9.1 0 0 1-4.64-1.27l-.33-.2-3.38.89.9-3.3-.22-.34a9.06 9.06 0 0 1-1.39-4.86c0-5.04 4.1-9.14 9.16-9.14 2.45 0 4.74.95 6.47 2.68a9.07 9.07 0 0 1 2.68 6.46c0 5.05-4.1 9.15-9.15 9.15Zm5.02-6.85c-.27-.14-1.63-.8-1.88-.9-.25-.09-.43-.13-.62.14-.18.27-.71.9-.87 1.08-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.36-.82-.73-1.36-1.62-1.52-1.9-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.98 2.67 1.12 2.85.14.18 1.94 2.96 4.7 4.15.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.18-.52-.32Z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const { waLink } = useData()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', damping: 18, stiffness: 260 }}
          className="group fixed bottom-5 right-5 z-[70] flex items-center gap-2"
        >
          <span className="pointer-events-none hidden rounded-full bg-forest-900 px-3 py-2 text-sm font-semibold text-white shadow-lg sm:block sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
            Peça pelo WhatsApp
          </span>
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl animate-pulse-ring transition-transform hover:scale-105">
            <WhatsAppIcon />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
