import { useState } from 'react'
import { Loader2, Lock, LogIn } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErr('E-mail ou senha incorretos.')
      setLoading(false)
    }
    // onAuthStateChange no Admin cuida do redirecionamento.
  }

  const cls =
    'w-full rounded-xl bg-forest-800/70 px-4 py-3 text-sm text-sand-100 outline-none ring-1 ring-white/10 focus:ring-gold-400/60 placeholder:text-sand-100/40'

  return (
    <div className="grid min-h-screen place-items-center bg-forest-950 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-forest-900/70 p-7 ring-1 ring-white/10 backdrop-blur-xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-shine font-display text-2xl font-bold text-forest-900 shadow-gold">
            M
          </span>
          <h1 className="mt-4 font-display text-xl font-bold text-sand-100">Painel Admin</h1>
          <p className="mt-1 text-sm text-sand-100/60">Balneário Monte Castelo</p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cls}
            autoComplete="username"
          />
          <div className="relative">
            <Lock
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sand-100/40"
            />
            <input
              type="password"
              required
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${cls} pl-10`}
              autoComplete="current-password"
            />
          </div>

          {err && <p className="text-sm text-red-400">{err}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-shine px-4 py-3 text-sm font-bold text-forest-900 disabled:opacity-60"
          >
            {loading ? <Loader2 size={17} className="animate-spin" /> : <LogIn size={17} />}
            Entrar
          </button>
        </form>

        <a
          href="/"
          className="mt-5 block text-center text-xs text-sand-100/50 transition hover:text-gold-300"
        >
          ← Voltar ao site
        </a>
      </div>
    </div>
  )
}
