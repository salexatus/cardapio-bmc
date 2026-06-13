import { motion } from 'framer-motion'
import { Plus, Star } from 'lucide-react'
import SmartImage from './SmartImage'
import { formatPrice } from '../data/menu'

const BADGE_STYLES = {
  Chef: 'bg-forest-700 text-gold-200',
  Destaque: 'bg-gold-shine text-forest-900',
  Premium: 'bg-forest-900 text-gold-300 border border-gold-400/40',
  'Mais Pedido': 'bg-gold-shine text-forest-900',
  Assinatura: 'bg-forest-700 text-gold-200',
  Autoral: 'bg-forest-700 text-gold-200',
  Veg: 'bg-emerald-600 text-white'
}

export default function ProductCard({ item, onOpen, index = 0 }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      onClick={() => onOpen(item)}
      className="group card-hover relative flex flex-col overflow-hidden rounded-3xl bg-white text-left shadow-card/30 ring-1 ring-forest-900/5 dark:bg-forest-900/60 dark:ring-white/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <SmartImage
          src={item.image}
          alt={item.name}
          className="h-full w-full"
          imgClassName="group-hover:scale-110 transition-transform duration-700"
        />
        {item.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold shadow-md ${
              BADGE_STYLES[item.badge] || 'bg-gold-shine text-forest-900'
            }`}
          >
            {item.badge}
          </span>
        )}
        {item.bestSeller && (
          <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-gold-500 shadow-md backdrop-blur">
            <Star size={14} fill="currentColor" />
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-tight text-forest-900 dark:text-sand-100">
          {item.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-forest-700/70 dark:text-sand-100/60">
          {item.description}
        </p>
        {item.serves && (
          <span className="mt-2 w-fit rounded-full bg-forest-600/10 px-2.5 py-0.5 text-[11px] font-medium text-forest-700 dark:bg-white/10 dark:text-sand-100/70">
            {item.serves}
          </span>
        )}
        <div className="mt-3 flex items-center justify-between pt-1">
          <span className="font-display text-xl font-bold text-forest-800 dark:text-gold-300">
            {formatPrice(item.price)}
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-shine text-forest-900 shadow-gold transition-transform duration-300 group-hover:rotate-90">
            <Plus size={18} />
          </span>
        </div>
      </div>
    </motion.button>
  )
}
