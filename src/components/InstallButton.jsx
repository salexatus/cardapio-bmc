import { useEffect, useState } from 'react'
import { Download, Share, X, Plus } from 'lucide-react'

// Botão "Instalar app" (PWA). No Android/desktop usa o evento beforeinstallprompt;
// no iOS (Safari não expõe o evento) mostra instruções de "Adicionar à Tela de Início".
export default function InstallButton({ className = '', onClick }) {
  const [deferred, setDeferred] = useState(null)
  const [installed, setInstalled] = useState(false)
  const [showIos, setShowIos] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone
    if (standalone) {
      setInstalled(true)
      return
    }
    const onPrompt = (e) => {
      e.preventDefault()
      setDeferred(e)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferred(null)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const isIos =
    typeof navigator !== 'undefined' &&
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !window.navigator.standalone

  if (installed) return null
  if (!deferred && !isIos) return null // browser não permite instalar → não mostra

  const handleClick = async () => {
    onClick?.()
    if (deferred) {
      deferred.prompt()
      await deferred.userChoice
      setDeferred(null)
    } else {
      setShowIos(true)
    }
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        <Download size={16} /> Instalar app
      </button>

      {showIos && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/60 p-6 backdrop-blur-sm"
          onClick={() => setShowIos(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-forest-900 p-5 text-sand-100 ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold">Instalar no iPhone</h3>
              <button onClick={() => setShowIos(false)} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>
            <ol className="space-y-2 text-sm text-sand-100/85">
              <li className="flex items-center gap-2">
                <Share size={16} className="shrink-0 text-gold-300" /> 1. Toque em{' '}
                <b>Compartilhar</b> na barra do Safari.
              </li>
              <li className="flex items-center gap-2">
                <Plus size={16} className="shrink-0 text-gold-300" /> 2. Escolha{' '}
                <b>Adicionar à Tela de Início</b>.
              </li>
            </ol>
          </div>
        </div>
      )}
    </>
  )
}
