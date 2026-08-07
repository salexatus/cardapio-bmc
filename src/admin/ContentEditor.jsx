import { useEffect, useState } from 'react'
import { Loader2, CheckCircle2, Save } from 'lucide-react'
import { api } from '../lib/apiClient'
import { mergeContent } from '../config'
import ImageUpload from './ImageUpload'

const inputCls =
  'w-full rounded-lg bg-forest-800/60 px-3 py-2 text-sm text-sand-100 outline-none ring-1 ring-white/10 focus:ring-gold-400/60 placeholder:text-sand-100/40'

// Campos de título compartilhados pelas dobras (seções).
const TITLE_FIELDS = [
  { key: 'eyebrow', label: 'Rótulo (linha pequena acima do título)' },
  { key: 'title', label: 'Título' },
  { key: 'titleGold', label: 'Parte do título em dourado' },
  { key: 'subtitle', label: 'Subtítulo', type: 'textarea' }
]
const TITLE_NO_SUB = TITLE_FIELDS.filter((f) => f.key !== 'subtitle')

// Estrutura do formulário: um grupo por dobra do site.
const GROUPS = [
  {
    key: 'hero',
    label: 'Topo do site (Hero)',
    hint: 'A primeira dobra — imagem de fundo, selo e botões. O título grande usa o "Nome" e o "Slogan/Descrição" da aba Configurações.',
    fields: [
      { key: 'badge', label: 'Selo (linha pequena no topo)' },
      { key: 'image', label: 'Imagem de fundo', type: 'image' },
      { key: 'ctaMenu', label: 'Botão 1 — texto (Cardápio)' },
      { key: 'ctaWhatsapp', label: 'Botão 2 — texto (WhatsApp)' },
      { key: 'ctaMaps', label: 'Botão 3 — texto (Como chegar)' }
    ]
  },
  { key: 'menu', label: 'Seção “Cardápio”', fields: TITLE_FIELDS },
  { key: 'bestSellers', label: 'Seção “Mais Vendidos”', fields: TITLE_FIELDS },
  { key: 'gallery', label: 'Seção “Galeria”', fields: TITLE_NO_SUB },
  { key: 'events', label: 'Seção “Eventos”', fields: TITLE_FIELDS },
  { key: 'location', label: 'Seção “Localização”', fields: TITLE_NO_SUB }
]

export default function ContentEditor() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api
      .getConfig()
      .then((cfg) => setContent(mergeContent(cfg?.content)))
      .catch(() => setContent(mergeContent()))
      .finally(() => setLoading(false))
  }, [])

  const set = (group, key, value) =>
    setContent((prev) => ({ ...prev, [group]: { ...prev[group], [key]: value } }))

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.saveConfig({ content })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="grid place-items-center py-16 text-sand-100/50">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSave}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-sand-100">Conteúdo do site</h2>
          <p className="text-xs text-sand-100/50">
            Edite os textos e imagens de cada dobra. Deixe um campo vazio para voltar ao padrão.
          </p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
            <CheckCircle2 size={16} /> Salvo!
          </span>
        )}
      </div>

      <div className="space-y-4">
        {GROUPS.map((group) => (
          <fieldset
            key={group.key}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <legend className="px-1 text-sm font-bold text-gold-300">{group.label}</legend>
            {group.hint && <p className="mb-3 text-xs text-sand-100/50">{group.hint}</p>}
            <div className="space-y-3">
              {group.fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-xs font-medium text-sand-100/70">
                    {field.label}
                  </label>
                  {field.type === 'image' ? (
                    <ImageUpload
                      value={content[group.key][field.key]}
                      onChange={(url) => set(group.key, field.key, url)}
                    />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      rows={2}
                      className={inputCls}
                      value={content[group.key][field.key] ?? ''}
                      onChange={(e) => set(group.key, field.key, e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      className={inputCls}
                      value={content[group.key][field.key] ?? ''}
                      onChange={(e) => set(group.key, field.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="sticky bottom-3 mt-5">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-shine px-4 py-3 text-sm font-bold text-forest-900 shadow-lg disabled:opacity-60"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Salvando…' : 'Salvar conteúdo'}
        </button>
      </div>
    </form>
  )
}
