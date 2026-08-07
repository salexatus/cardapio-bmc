# 🌿 Balneário Monte Castelo — Cardápio Digital Premium

Aplicação web premium para o **Balneário Monte Castelo**, às margens do Rio Urupá.
Cardápio digital moderno, mobile-first, com busca, filtros, dark mode, animações suaves,
efeito parallax, glassmorphism, QR Code e botão flutuante de WhatsApp — com **painel admin**
para gerenciar todo o conteúdo.

## 🏗️ Arquitetura (atual)

```
Navegador
   │
   ├─ cardapio.limadesigner.com.br      → Frontend: Astro + ilhas React (Cloudflare Pages)
   │                                       HTML/SEO estático; cardápio carregado via API
   └─ apicardapiobmc.limadesigner.com.br → Backend: Django + DRF (VPS 31.97.28.229)
                                            Nginx → Gunicorn → Django · PostgreSQL 16
```

- **Frontend** — **Astro + ilhas React** + Tailwind CSS + Framer Motion, publicado no
  **Cloudflare Pages**. O HTML é estático (bom p/ SEO); o cardápio é carregado no navegador
  via `GET /api/v1/site` e o painel `/admin` é uma ilha React que fala REST (login por
  cookie httpOnly). A URL da API vem de `PUBLIC_API_URL` (`.env`).
- **Backend** — **Django 5 + DRF + SimpleJWT** (cookie httpOnly) + **PostgreSQL** +
  WhiteNoise + Gunicorn, em `backend/`. Leitura pública, escrita autenticada.

> ℹ️ **Histórico:** o projeto já foi React+Vite com **Supabase** (banco) e deploy na Vercel.
> Isso foi **abandonado** — hoje o banco/painel são Django+Postgres próprios e o frontend é
> Astro no Cloudflare Pages. Ver `deploy.md` para o guia de publicação completo.

## ✨ Recursos

- 🛠️ **Painel Admin** em `/admin`: CRUD de cardápio, eventos, galeria e configurações, com **upload de fotos** e login seguro (cookie JWT httpOnly)
- 🔄 **Conteúdo dinâmico** — alterações no painel aparecem no site na hora, sem novo deploy
- 📱 **Mobile First** e totalmente responsivo · **PWA** instalável (manifest)
- 🔎 **Busca** de produtos + **filtro por categoria** animado
- 🍽️ **Modal de detalhes** do prato com **zoom** · 🖼️ **Galeria** com lightbox · 📅 **Agenda de eventos**
- 📍 **Mapa** (Google Maps) + **QR Code** automático · 💬 **WhatsApp** flutuante · 🔗 **Web Share**
- 🌙 **Dark mode** com persistência · 🎬 Hero com parallax · 🪟 Glassmorphism
- 🚀 **SEO** otimizado (Open Graph, Twitter Card, JSON-LD)

## 🎨 Identidade visual

| Cor          | Hex       |
| ------------ | --------- |
| Verde escuro | `#1B4332` |
| Dourado      | `#D4A017` |
| Branco       | `#FFFFFF` |
| Bege claro   | `#F8F2E4` |

Tipografia: **Playfair Display** (títulos) + **Plus Jakarta Sans** (texto).

## 🚀 Rodando localmente

**Frontend (Astro):**
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera /dist (Cloudflare Pages)
npm run preview  # serve o build de produção
```
A URL da API usada no build vem de `PUBLIC_API_URL` (`.env`; default = produção).

**Backend (Django) — dev com SQLite:**
```bash
cd backend
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env                 # sem POSTGRES_DB → usa SQLite
python manage.py migrate
python manage.py seed_inicial        # popula o cardápio (idempotente)
python manage.py createsuperuser     # cria login do painel
python manage.py runserver 127.0.0.1:8050
```

## ☁️ Deploy

O guia completo (servidor, comandos, redeploy, operações) está em **[`deploy.md`](deploy.md)**
(versionado, sem segredos). As credenciais reais ficam em `credencias.md` (gitignored).

**Resumo:**
- **Frontend** → Cloudflare Pages (projeto `cardapio`), via `wrangler pages deploy dist`.
- **Backend** → VPS `31.97.28.229` (Ubuntu, Nginx + **systemd** + certbot). Serviço
  `apicardapiobmc.service` (Gunicorn `127.0.0.1:8050`); app em `/home/apicardapiobmc/app/backend`.
  Redeploy = enviar `backend/` + `migrate`/`collectstatic` + `systemctl restart apicardapiobmc`.

## 🛠️ Painel Admin

O painel em **`/admin`** gerencia todo o conteúdo sem mexer no código (login por cookie httpOnly
contra a API Django):

| Aba             | O que edita                                                        |
| --------------- | ------------------------------------------------------------------ |
| Cardápio        | Pratos, preços, fotos, categorias, selos, tags, "mais vendido", disponibilidade |
| Eventos         | Agenda completa (data, atração, foto, descrição)                   |
| Galeria         | Fotos do mosaico e o tamanho de cada uma                           |
| Configurações   | WhatsApp, Instagram, endereço, mapa, horário, domínio (QR Code)    |

## 🗂️ Estrutura

| Caminho | O que é |
| --- | --- |
| `src/pages/{index,admin}.astro` | Rotas do frontend (Astro) |
| `src/layouts/Base.astro` | Head / SEO / PWA |
| `src/apps/SiteApp.jsx` | Ilha React do site público |
| `src/admin/*` | Ilha React do painel admin |
| `src/lib/{env,api,apiClient}.js` | Dados / cliente REST |
| `backend/` | API Django (DRF), models em `apps.cardapio` |

## 🛠️ Personalização

Com o backend conectado, edite tudo pelo **painel `/admin`**. Para design/SEO:

| O que mudar              | Onde                                   |
| ------------------------ | -------------------------------------- |
| Cores / fontes           | [`tailwind.config.js`](tailwind.config.js) |
| Head / SEO / PWA         | [`src/layouts/Base.astro`](src/layouts/Base.astro) |
| Fotos placeholder        | Substituir pelas fotos reais do cliente (via painel ou sementes do backend) |

---

Feito com 🌿 à beira do Rio Urupá.
