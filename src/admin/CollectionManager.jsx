import { useState } from 'react'
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react'
import { useTable } from './useTable'
import RecordForm from './RecordForm'

const rowTitle = (row) => row.name || row.title || row.alt || 'Item'
const rowImage = (row) => row.image || row.src || null

export default function CollectionManager({ table, schema, title, emptyDefaults = {} }) {
  const { rows, loading, error, save, remove } = useTable(table)
  const [editing, setEditing] = useState(null) // record sendo editado/criado
  const [deletingId, setDeletingId] = useState(null)

  const startNew = () =>
    setEditing({ sort: rows.length, available: true, tags: [], span: '', ...emptyDefaults })

  const handleSave = async (record) => {
    await save(record)
    setEditing(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Excluir este item? Esta ação não pode ser desfeita.')) return
    setDeletingId(id)
    try {
      await remove(id)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-sand-100">
          {title} <span className="text-sand-100/40">({rows.length})</span>
        </h2>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-lg bg-gold-shine px-3.5 py-2 text-sm font-bold text-forest-900"
        >
          <Plus size={16} /> Adicionar
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{error}</p>
      )}

      {loading ? (
        <div className="grid place-items-center py-16 text-sand-100/50">
          <Loader2 className="animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-xl bg-forest-800/40 py-12 text-center text-sm text-sand-100/50">
          Nenhum item ainda. Clique em “Adicionar”.
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((row) => (
            <li
              key={row.id}
              className="flex items-center gap-3 rounded-xl bg-forest-800/40 p-2.5 ring-1 ring-white/5"
            >
              {rowImage(row) && (
                <img
                  src={rowImage(row)}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-lg object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-sand-100">{rowTitle(row)}</p>
                <p className="truncate text-xs text-sand-100/50">
                  {row.category && `${row.category} • `}
                  {row.price != null && `R$ ${Number(row.price).toFixed(2)} • `}
                  {row.weekday && `${row.weekday} • `}
                  {row.available === false && '⛔ oculto • '}
                  {row.best_seller && '⭐ mais vendido'}
                </p>
              </div>
              <button
                onClick={() => setEditing(row)}
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-sand-100 hover:bg-white/20"
                aria-label="Editar"
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => handleDelete(row.id)}
                disabled={deletingId === row.id}
                className="grid h-9 w-9 place-items-center rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
                aria-label="Excluir"
              >
                {deletingId === row.id ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Trash2 size={15} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-lg rounded-2xl bg-forest-900 p-5 ring-1 ring-white/10">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-sand-100">
                {editing.id ? 'Editar item' : 'Novo item'}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-sand-100"
              >
                <X size={16} />
              </button>
            </div>
            <RecordForm
              schema={schema}
              value={editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
