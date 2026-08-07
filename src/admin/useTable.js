import { useCallback, useEffect, useState } from 'react'
import { api, TABLE_ENDPOINT } from '../lib/apiClient'

// Hook genérico de CRUD para uma coleção da API (menu_items, events, gallery).
export function useTable(table) {
  const endpoint = TABLE_ENDPOINT[table] || table
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRows = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.list(endpoint)
      setRows(Array.isArray(data) ? data : data?.results || [])
      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchRows()
  }, [fetchRows])

  const save = useCallback(
    async (record) => {
      const { id, created_at, ...rest } = record
      if (id) {
        await api.update(endpoint, id, rest)
      } else {
        await api.create(endpoint, rest)
      }
      await fetchRows()
    },
    [endpoint, fetchRows]
  )

  const remove = useCallback(
    async (id) => {
      await api.remove(endpoint, id)
      await fetchRows()
    },
    [endpoint, fetchRows]
  )

  return { rows, loading, error, save, remove, refetch: fetchRows }
}
