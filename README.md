# 🌿 Balneário Monte Castelo — Cardápio Digital Premium

Aplicação web premium (PWA) para o **Balneário Monte Castelo**, às margens do Rio Urupá.
Cardápio digital moderno, mobile-first, com busca, filtros, dark mode, animações suaves,
efeito parallax, glassmorphism, QR Code e botão flutuante de WhatsApp.

Construído com **React + Vite + Tailwind CSS + Framer Motion**, com **painel admin** e banco de
dados via **Supabase**. Pronto para deploy na **Vercel**.

> 💡 **Funciona sem configuração:** sem o Supabase, o site usa dados-semente embutidos. Ao conectar
> o Supabase, o conteúdo passa a vir do banco e você gerencia tudo pelo painel em `/admin`.

## ✨ Recursos

- 🛠️ **Painel Admin** em `/admin` (Supabase): CRUD de cardápio, eventos, galeria e configurações, com **upload de fotos** e login seguro
- 🔄 **Conteúdo dinâmico** — alterações no painel aparecem no site na hora, sem novo deploy
- 📱 **Mobile First** e totalmente responsivo
- ⚡ **PWA** instalável (offline, ícone na tela inicial) via `vite-plugin-pwa`
- 🔎 **Busca** de produtos + **filtro por categoria** animado
- 🍽️ **Modal de detalhes** do prato com **zoom** na imagem
- 🖼️ **Galeria interativa** estilo Instagram com lightbox
- 📅 **Agenda de eventos** em cartões modernos
- 📍 **Mapa integrado** (Google Maps) + **QR Code** automático do cardápio
- 💬 **Botão flutuante de WhatsApp** + pedido direto pelo prato
- 🔗 **Compartilhamento** nativo (Web Share API)
- 🌙 **Dark mode** elegante com persistência
- 🎬 Hero com **vídeo de fundo** (opcional) e **parallax**
- 🪟 **Glassmorphism** leve e animações com Framer Motion
- 🚀 **SEO** otimizado (Open Graph, Twitter Card, JSON-LD, sitemap, robots)
- 🖌️ Lazy loading de imagens com skeleton

## 🎨 Identidade visual

| Cor          | Hex       |
| ------------ | --------- |
| Verde escuro | `#1B4332` |
| Dourado      | `#D4A017` |
| Branco       | `#FFFFFF` |
| Bege claro   | `#F8F2E4` |

Tipografia: **Playfair Display** (títulos) + **Plus Jakarta Sans** (texto).

## 🚀 Rodando localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
npm run preview  # serve o build de produção
```

> Os ícones do PWA já vêm gerados em `/public`. Para recriá-los: `node scripts/generate-icons.mjs`.

## ☁️ Deploy na Vercel

1. Suba este projeto para um repositório Git (GitHub/GitLab).
2. Em [vercel.com](https://vercel.com) → **New Project** → importe o repositório.
3. A Vercel detecta o Vite automaticamente (config já incluída em `vercel.json`).
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**. Pronto. ✅

Ou via CLI:

```bash
npm i -g vercel
vercel --prod
```

## 🛠️ Painel Admin (Supabase)

O painel em **`/admin`** permite gerenciar todo o conteúdo sem mexer no código.
Configuração única (~10 min):

### 1. Crie o projeto no Supabase
1. Acesse [supabase.com](https://supabase.com) → **New Project** (anote a senha do banco).
2. Aguarde o projeto provisionar.

### 2. Crie as tabelas e os dados
1. No Supabase: **SQL Editor** → **New query**.
2. Cole **todo** o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) e clique em **Run**.
   - Isso cria as tabelas, a segurança (RLS), o bucket de imagens e já popula o cardápio inicial.

### 3. Crie seu usuário admin
1. No Supabase: **Authentication** → **Users** → **Add user**.
2. Informe **e-mail e senha** e marque **Auto Confirm User**. Esse será seu login no painel.

### 4. Conecte o site ao Supabase
1. No Supabase: **Project Settings** → **API**. Copie a **Project URL** e a **anon public key**.
2. Crie um arquivo **`.env`** na raiz (use o [`.env.example`](.env.example) como base):
   ```bash
   VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-anon-public-key
   ```
3. Reinicie o `npm run dev`. Pronto — acesse **`/admin`**, faça login e gerencie tudo. ✅

### Na Vercel
Adicione as mesmas variáveis em **Project → Settings → Environment Variables**
(`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`) e refaça o deploy.

> 🔒 **Segurança:** a *anon key* é pública (vai no front, tudo bem). A proteção real é a
> **RLS** do Supabase: qualquer pessoa **lê** o cardápio, mas só usuários **autenticados**
> conseguem criar/editar/excluir. Nunca exponha a *service_role key*.

### O que dá pra gerenciar no painel
| Aba             | O que edita                                                        |
| --------------- | ------------------------------------------------------------------ |
| Cardápio        | Pratos, preços, fotos, categorias, selos, tags, "mais vendido", disponibilidade |
| Eventos         | Agenda completa (data, atração, foto, descrição)                   |
| Galeria         | Fotos do mosaico e o tamanho de cada uma                           |
| Configurações   | WhatsApp, Instagram, endereço, mapa, horário, domínio (QR Code)    |

## 🛠️ Personalização rápida

> Com o Supabase conectado, edite tudo pelo **painel `/admin`**. A tabela abaixo vale para os
> **dados-semente** (usados antes de configurar o Supabase) e para ajustes de design/SEO.

| O que mudar              | Onde                                   |
| ------------------------ | -------------------------------------- |
| WhatsApp, Instagram, mapa, horário | [`src/config.js`](src/config.js) |
| Itens do cardápio e preços | [`src/data/menu.js`](src/data/menu.js) |
| Eventos                  | [`src/data/events.js`](src/data/events.js) |
| Fotos da galeria         | [`src/components/Gallery.jsx`](src/components/Gallery.jsx) |
| Vídeo do Hero            | constante `HERO_VIDEO` em [`src/components/Hero.jsx`](src/components/Hero.jsx) |
| Cores / fontes           | [`tailwind.config.js`](tailwind.config.js) |
| Domínio (SEO/QR)         | `SITE.url` em `src/config.js` e metatags em `index.html` |

### Adicionar o vídeo do Hero

Hospede um arquivo `.mp4` (ex.: Cloudinary, Vercel Blob, Mux) e cole a URL na
constante `HERO_VIDEO` em `src/components/Hero.jsx`. Sem vídeo, o Hero usa uma imagem
com parallax como fallback. Sugestão de cenas: Rio Urupá, comida no fogão a lenha,
música ao vivo e ambiente familiar.

### Imagens

As imagens usam o Unsplash como placeholder. Substitua pelas fotos reais do balneário
(de preferência otimizadas em WebP) editando as URLs em `src/data/*` e nos componentes.

---

Feito com 🌿 à beira do Rio Urupá.
