import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { api } from '../lib/apiClient'
import Login from './Login'
import Dashboard from './Dashboard'

// undefined = carregando sessão · null = anônimo · objeto = usuário logado
export default function Admin() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    api
      .me()
      .then((d) => setSession(d.usuario))
      .catch(() => setSession(null))
  }, [])

  if (session === undefined) {
    return (
      <div className="grid min-h-screen place-items-center bg-forest-950 text-sand-100/60">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (!session) return <Login onLoggedIn={setSession} />

  return <Dashboard session={session} onLogout={() => setSession(null)} />
}
