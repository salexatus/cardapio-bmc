import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadSiteData } from '../lib/api'
import { DEFAULT_CONFIG, mergeContent, buildWaLink, buildMapsLink } from '../config'

// Config inicial com `content` já preenchido (defaults), para as seções nunca
// renderizarem antes de o conteúdo existir.
const INITIAL_CONFIG = { ...DEFAULT_CONFIG, content: mergeContent() }

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [state, setState] = useState({
    loading: true,
    source: 'seed',
    config: INITIAL_CONFIG,
    categories: [],
    menu: [],
    events: [],
    gallery: []
  })

  const reload = async () => {
    const data = await loadSiteData()
    setState({ loading: false, ...data })
  }

  useEffect(() => {
    let active = true
    loadSiteData().then((data) => {
      if (active) setState({ loading: false, ...data })
    })
    return () => {
      active = false
    }
  }, [])

  const value = useMemo(() => {
    const config = state.config || INITIAL_CONFIG
    return {
      ...state,
      config,
      bestSellers: state.menu.filter((m) => m.bestSeller),
      waLink: (msg) => buildWaLink(config, msg),
      mapsLink: buildMapsLink(config),
      reload
    }
  }, [state])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData precisa estar dentro de <DataProvider>')
  return ctx
}
