import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// Site estático (Cloudflare Pages). Os dados do cardápio são carregados no
// navegador via API REST (Django) — ver src/lib/api.js. O HTML/SEO é estático.
export default defineConfig({
  site: 'https://cardapio.limadesigner.com.br',
  integrations: [
    react(),
    // applyBaseStyles:false → as diretivas @tailwind vêm do nosso src/index.css
    tailwind({ applyBaseStyles: false }),
  ],
})
