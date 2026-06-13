import { useRef, useState } from 'react'
import { Upload, Link2, Loader2, ImageOff } from 'lucide-react'
import { supabase, STORAGE_BUCKET } from '../lib/supabase'

export default function ImageUpload({ value, onChange }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setErr(null)
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, { cacheControl: '3600', upsert: false })
      if (error) throw error
      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
      onChange(data.publicUrl)
    } catch (e2) {
      setErr(e2.message || 'Falha no upload')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-forest-800/60 ring-1 ring-white/10">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageOff size={20} className="text-sand-100/40" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-lg bg-gold-shine px-3 py-2 text-sm font-semibold text-forest-900 disabled:opacity-60"
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? 'Enviando...' : 'Enviar foto'}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <div className="flex items-center gap-2 rounded-lg bg-forest-800/60 px-2.5 py-1.5 ring-1 ring-white/10">
            <Link2 size={15} className="shrink-0 text-sand-100/50" />
            <input
              type="url"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="ou cole a URL da imagem"
              className="w-full bg-transparent text-xs text-sand-100 outline-none placeholder:text-sand-100/40"
            />
          </div>
        </div>
      </div>
      {err && <p className="text-xs text-red-400">{err}</p>}
    </div>
  )
}
