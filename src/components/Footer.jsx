import { Instagram, MessageCircle, MapPin, Heart } from 'lucide-react'
import { useData } from '../context/DataContext'

export default function Footer() {
  const { config, waLink, mapsLink } = useData()
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-sand-100">
      <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img
              src={`${import.meta.env.BASE_URL}logo-bmc.png`}
              alt={config.name}
              className="h-16 w-auto"
            />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
              {config.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm text-sand-100/65">{config.description}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ['#cardapio', 'Cardápio'],
                ['#mais-vendidos', 'Mais Vendidos'],
                ['#galeria', 'Galeria'],
                ['#eventos', 'Eventos'],
                ['#localizacao', 'Localização']
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-sand-100/70 transition hover:text-gold-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Contato
            </h4>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sand-100/75 transition hover:text-gold-300"
              >
                <MessageCircle size={17} /> WhatsApp
              </a>
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sand-100/75 transition hover:text-gold-300"
              >
                <Instagram size={17} /> {config.instagramHandle}
              </a>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sand-100/75 transition hover:text-gold-300"
              >
                <MapPin size={17} /> {config.address}
              </a>
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-gold-shine hover:text-forest-900"
              >
                <Instagram size={18} />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-[#25D366] hover:text-white"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-sand-100/50 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {config.name}. Todos os direitos reservados.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Feito com <Heart size={13} className="text-gold-400" fill="currentColor" /> à beira do
            Rio Urupá
          </p>
        </div>
      </div>
    </footer>
  )
}
