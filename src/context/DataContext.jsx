import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadSiteData } from '../lib/api'
import { DEFAULT_CONFIG, buildWaLink, buildMapsLink } from '../config'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [state, setState] = useState({
    loading: true,
    source: 'seed',
    config: DEFAULT_CONFIG,
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
    const config = state.config || DEFAULT_CONFIG
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
