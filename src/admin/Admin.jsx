import { useEffect, useState } from 'react'
import { Loader2, DatabaseZap } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import Login from './Login'
import Dashboard from './Dashboard'

function NotConfigured() {
  return (
    <div className="grid min-h-screen place-items-center bg-forest-950 px-5 text-sand-100">
      <div className="max-w-md rounded-3xl bg-forest-900/70 p-7 text-center ring-1 ring-white/10">
        <DatabaseZap className="mx-auto text-gold-300" size={36} />
        <h1 className="mt-4 font-display text-xl font-bold">Supabase não configurado</h1>
        <p className="mt-2 text-sm text-sand-100/70">
          O painel admin precisa das variáveis de ambiente do Supabase. Crie um arquivo{' '}
          <code className="rounded bg-black/30 px-1.5 py-0.5 text-gold-300">.env</code> com:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-black/40 p-3 text-left text-xs text-sand-100/80">
{`VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...`}
        </pre>
        <p className="mt-3 text-xs text-sand-100/50">
          Siga o passo a passo no <strong>README.md</strong> (seção “Painel Admin”) e rode o
          <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5 text-gold-300">supabase/schema.sql</code>
          no seu projeto Supabase.
        </p>
        <a href="/" className="mt-5 inline-block text-xs text-sand-100/50 hover:text-gold-300">
          ← Voltar ao site
        </a>
      </div>
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!isSupabaseConfigured) return <NotConfigured />

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-forest-950 text-sand-100/60">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return session ? <Dashboard session={session} /> : <Login />
}
