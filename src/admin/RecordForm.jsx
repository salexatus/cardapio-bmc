import { useState } from 'react'
import { Loader2, Save, X } from 'lucide-react'
import ImageUpload from './ImageUpload'

const inputCls =
  'w-full rounded-lg bg-forest-800/60 px-3 py-2 text-sm text-sand-100 outline-none ring-1 ring-white/10 focus:ring-gold-400/60 placeholder:text-sand-100/40'

export default function RecordForm({ schema, value, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({ ...value }))
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState(null)

  const set = (key, v) => setForm((f) => ({ ...f, [key]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setErr(null)
    setSaving(true)
    try {
      const payload = { ...form }
      // normaliza números
      schema.forEach((field) => {
        if (field.type === 'number' && payload[field.key] !== undefined && payload[field.key] !== '') {
          payload[field.key] = Number(payload[field.key])
        }
      })
      await onSave(payload)
    } catch (e2) {
      setErr(e2.message || 'Erro ao salvar')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {schema.map((field) => (
        <div key={field.key}>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-100/70">
            {field.label}
            {field.required && <span className="text-gold-400"> *</span>}
          </label>

          {field.type === 'text' && (
            <input
              type="text"
              className={inputCls}
              placeholder={field.placeholder}
              value={form[field.key] ?? ''}
              required={field.required}
              onChange={(e) => set(field.key, e.target.value)}
            />
          )}

          {field.type === 'number' && (
            <input
              type="number"
              step={field.step || '1'}
              className={inputCls}
              placeholder={field.placeholder}
              value={form[field.key] ?? ''}
              required={field.required}
              onChange={(e) => set(field.key, e.target.value)}
            />
          )}

          {field.type === 'textarea' && (
            <textarea
              rows={3}
              className={inputCls}
              placeholder={field.placeholder}
              value={form[field.key] ?? ''}
              onChange={(e) => set(field.key, e.target.value)}
            />
          )}

          {field.type === 'select' && (
            <select
              className={inputCls}
              value={form[field.key] ?? ''}
              required={field.required}
              onChange={(e) => set(field.key, e.target.value)}
            >
              {(field.allowEmpty || !field.required) && <option value="">— nenhum —</option>}
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {field.type === 'checkbox' && (
            <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-sand-100/80">
              <input
                type="checkbox"
                className="h-4 w-4 accent-gold-400"
                checked={Boolean(form[field.key])}
                onChange={(e) => set(field.key, e.target.checked)}
              />
              {field.label}
            </label>
          )}

          {field.type === 'tags' && (
            <input
              type="text"
              className={inputCls}
              placeholder="peixe, regional, fogão a lenha"
              value={Array.isArray(form[field.key]) ? form[field.key].join(', ') : form[field.key] ?? ''}
              onChange={(e) =>
                set(
                  field.key,
                  e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean)
                )
              }
            />
          )}

          {field.type === 'image' && (
            <ImageUpload value={form[field.key]} onChange={(url) => set(field.key, url)} />
          )}
        </div>
      ))}

      {err && <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{err}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gold-shine px-4 py-2.5 text-sm font-bold text-forest-900 disabled:opacity-60"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-sand-100"
        >
          <X size={16} /> Cancelar
        </button>
      </div>
    </form>
  )
}
