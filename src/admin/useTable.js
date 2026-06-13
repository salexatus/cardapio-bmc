import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// Hook genérico de CRUD para uma tabela do Supabase.
export function useTable(table) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRows = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('sort', { ascending: true })
    if (error) setError(error.message)
    else setRows(data || [])
    setLoading(false)
  }, [table])

  useEffect(() => {
    fetchRows()
  }, [fetchRows])

  const save = useCallback(
    async (record) => {
      const { id, created_at, ...rest } = record
      if (id) {
        const { error } = await supabase.from(table).update(rest).eq('id', id)
        if (error) throw error
      } else {
        const { error } = await supabase.from(table).insert(rest)
        if (error) throw error
      }
      await fetchRows()
    },
    [table, fetchRows]
  )

  const remove = useCallback(
    async (id) => {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) throw error
      await fetchRows()
    },
    [table, fetchRows]
  )

  return { rows, loading, error, save, remove, refetch: fetchRows }
}
