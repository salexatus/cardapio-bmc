import { useState } from 'react'
import { motion } from 'framer-motion'
import { QRCodeCanvas } from 'qrcode.react'
import { MapPin, Navigation, Clock, QrCode, Share2, Check } from 'lucide-react'
import { useData } from '../context/DataContext'

export default function Location() {
  const { config, mapsLink } = useData()
  const [copied, setCopied] = useState(false)

  const shareSite = async () => {
    const data = {
      title: config.name,
      text: `${config.name} — ${config.tagline}. Veja o cardápio:`,
      url: config.url
    }
    try {
      if (navigator.share) await navigator.share(data)
      else {
        await navigator.clipboard.writeText(config.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      /* cancelado */
    }
  }

  return (
    <section id="localizacao" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <span className="eyebrow">
          <MapPin size={14} /> Venha nos visitar
        </span>
        <h2 className="section-title mt-3 text-forest-900 dark:text-sand-100">
          Como <span className="gold-text">Chegar</span>
        </h2>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl shadow-card/30 ring-1 ring-forest-900/5 dark:ring-white/10 lg:col-span-3"
        >
          <iframe
            title="Mapa do Balneário Monte Castelo"
            src={config.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full border-0 grayscale-[0.15] sm:h-[420px]"
            allowFullScreen
          />
        </motion.div>

        {/* Info + QR */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4 lg:col-span-2"
        >
          <div className="rounded-3xl glass p-6">
            <h3 className="font-display text-xl font-semibold text-forest-900 dark:text-sand-100">
              {config.name}
            </h3>
            <p className="mt-2 flex items-start gap-2 text-sm text-forest-700/80 dark:text-sand-100/70">
              <MapPin size={17} className="mt-0.5 shrink-0 text-gold-500" /> {config.address}
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm text-forest-700/80 dark:text-sand-100/70">
              <Clock size={17} className="mt-0.5 shrink-0 text-gold-500" /> {config.hours}
            </p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-4 w-full"
            >
              <Navigation size={17} /> Abrir rota no mapa
            </a>
          </div>

          <div className="flex items-center gap-4 rounded-3xl glass p-5">
            <div className="rounded-2xl bg-white p-2.5 shadow-md">
              <QRCodeCanvas
                value={config.url}
                size={92}
                bgColor="#ffffff"
                fgColor="#1B4332"
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-500">
                <QrCode size={14} /> Cardápio digital
              </span>
              <p className="mt-1 text-sm text-forest-700/80 dark:text-sand-100/70">
                Aponte a câmera e compartilhe nosso cardápio com a galera.
              </p>
              <button
                onClick={shareSite}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 transition hover:text-gold-500 dark:text-sand-100"
              >
                {copied ? <Check size={15} className="text-emerald-500" /> : <Share2 size={15} />}
                {copied ? 'Link copiado!' : 'Compartilhar'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
