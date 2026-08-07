// Cliente REST do painel admin. Autenticação por cookie httpOnly (cross-site),
// por isso todas as chamadas usam credentials:'include'. Substitui o Supabase.
import { API_URL } from './env'

// O access token expira em ~30 min. Quando isso acontece, uma chamada volta 401.
// Aqui renovamos o token de forma transparente (POST /auth/refresh usa o cookie
// bmc_refresh, válido 7 dias) e repetimos a chamada original UMA vez. Sem isso, o
// painel "parava de editar" depois de 30 min até o usuário deslogar e logar de novo.
let refreshing = null

function refreshToken() {
  // Compartilha um único refresh entre chamadas concorrentes.
  if (!refreshing) {
    refreshing = fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((r) => r.ok)
      .catch(() => false)
      .finally(() => {
        refreshing = null
      })
  }
  return refreshing
}

async function req(path, { method = 'GET', body, isForm = false, _retry = false } = {}) {
  const opts = { method, credentials: 'include', headers: {} }
  if (body !== undefined) {
    if (isForm) {
      opts.body = body // FormData define o Content-Type sozinho
    } else {
      opts.headers['Content-Type'] = 'application/json'
      opts.body = JSON.stringify(body)
    }
  }

  const res = await fetch(`${API_URL}/api/v1${path}`, opts)

  // Token expirado → tenta renovar 1x e repete a chamada (nunca para login/refresh).
  if (
    res.status === 401 &&
    !_retry &&
    path !== '/auth/login' &&
    path !== '/auth/refresh'
  ) {
    const ok = await refreshToken()
    if (ok) {
      return req(path, { method, body, isForm, _retry: true })
    }
  }

  if (!res.ok) {
    let msg = `Erro ${res.status}`
    try {
      const j = await res.json()
      msg = j.erro || j.detail || (typeof j === 'object' ? JSON.stringify(j) : String(j))
    } catch {
      /* corpo não-JSON */
    }
    const e = new Error(msg)
    e.status = res.status
    throw e
  }
  if (res.status === 204) return null
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

// Mapeia o nome de "tabela" (legado Supabase) para o endpoint REST.
export const TABLE_ENDPOINT = {
  menu_items: 'menu-items',
  events: 'events',
  gallery: 'gallery',
  categories: 'categories'
}

export const api = {
  // Auth (cookies httpOnly)
  login: (email, password) => req('/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => req('/auth/logout', { method: 'POST' }),
  me: () => req('/auth/me'),

  // CRUD genérico das coleções
  list: (endpoint) => req(`/${endpoint}`),
  create: (endpoint, data) => req(`/${endpoint}`, { method: 'POST', body: data }),
  update: (endpoint, id, data) => req(`/${endpoint}/${id}`, { method: 'PATCH', body: data }),
  remove: (endpoint, id) => req(`/${endpoint}/${id}`, { method: 'DELETE' }),

  // Configuração única do site
  getConfig: () => req('/config'),
  saveConfig: (data) => req('/config', { method: 'PUT', body: data }),

  // Upload de imagem → { url }
  upload: (file) => {
    const fd = new FormData()
    fd.append('file', file)
    return req('/upload', { method: 'POST', body: fd, isForm: true })
  }
}
