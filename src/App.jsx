import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SitePage from './pages/SitePage'

// O painel admin é carregado sob demanda (não pesa no site do visitante).
const Admin = lazy(() => import('./admin/Admin'))

function AdminFallback() {
  return <div className="grid min-h-screen place-items-center bg-forest-950 text-sand-100/50">Carregando painel…</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SitePage />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminFallback />}>
              <Admin />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
