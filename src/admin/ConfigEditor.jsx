import { useEffect, useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { api } from '../lib/apiClient'
import { configSchema } from './schemas'
import RecordForm from './RecordForm'

export default function ConfigEditor() {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api
      .getConfig()
      .then((data) => setConfig(data && Object.keys(data).length ? data : { id: 1 }))
      .catch(() => setConfig({ id: 1 }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (record) => {
    await api.saveConfig(record)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) {
    return (
      <div className="grid place-items-center py-16 text-sand-100/50">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-sand-100">Configurações do site</h2>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
            <CheckCircle2 size={16} /> Salvo!
          </span>
        )}
      </div>
      <RecordForm schema={configSchema} value={config} onSave={handleSave} onCancel={() => {}} />
    </div>
  )
}
