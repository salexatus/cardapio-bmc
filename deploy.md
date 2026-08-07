# 🚀 BMC — Guia de Deploy

Guia técnico **versionado** (sem segredos) de como o cardápio digital do
**Balneário Monte Castelo** é publicado. As credenciais reais ficam em
`credencias.md` (na raiz, **gitignored** — nunca commitar).

> Padrão herdado do projeto `rical`: frontend **Astro + ilhas React** no Cloudflare
> Pages, backend Django+DRF numa VPS Ubuntu (Nginx + systemd + certbot),
> autenticação por cookie JWT httpOnly.

---

## Arquitetura

```
Navegador
   │
   ├─ cardapio.limadesigner.com.br      → Cloudflare Pages (Astro + ilhas React)
   │                                       carrega o cardápio de:
   └─ apicardapiobmc.limadesigner.com.br → VPS 31.97.28.229 (Nginx → Gunicorn → Django)
                                            └─ PostgreSQL 16 (localhost, na VPS)
```

| Papel | URL |
|---|---|
| Frontend (Cloudflare Pages) | https://cardapio.limadesigner.com.br |
| API (VPS Nginx+systemd) | https://apicardapiobmc.limadesigner.com.br |
| Healthcheck | https://apicardapiobmc.limadesigner.com.br/api/v1/health |
| Django admin (emergência) | https://apicardapiobmc.limadesigner.com.br/admin/ |

**Dados da VPS (servidor ATUAL, desde 2026-07-02):** IP `31.97.28.229` (Ubuntu 24.04,
Nginx + **systemd** + certbot, **sem CloudPanel**) · Python 3.12 · porta do app **8050** ·
usuário de sistema `apicardapiobmc` · app em `/home/apicardapiobmc/app/backend` ·
serviço `apicardapiobmc.service`. SSH: `ssh -i ~/.ssh/bmc_novo_servidor root@31.97.28.229`.
(senhas/detalhes em `credencias.md`)

> **Servidor antigo** (`5.78.40.61`, CloudPanel + Supervisor, site user
> `limadesigner-apicardapiobmc`) foi **aposentado** na migração de 2026-07-02.
> Mantido ligado alguns dias para rollback (reverter o DNS). **Todo este guia já
> reflete o servidor novo** (systemd); o antigo aparece só na seção *Histórico*, no fim.

---

## Backend (Django) — `backend/`

Stack: Django 5 + DRF + SimpleJWT (cookie httpOnly) + PostgreSQL + WhiteNoise + Gunicorn.

### Endpoints (`/api/v1/`)
- `GET  /health` — status do processo + banco (público).
- `GET  /site` — **payload agregado** que o site público consome (config, categories, menu, events, gallery).
- `POST /auth/login` — `{email, password}` → seta cookies `bmc_access`/`bmc_refresh`.
- `POST /auth/logout` · `POST /auth/refresh` · `GET /auth/me`.
- `GET/POST/PUT/PATCH/DELETE /categories`, `/menu-items`, `/events`, `/gallery` — leitura pública, escrita autenticada.
- `GET/PUT /config` — configuração única do site.
- `POST /upload` — upload de imagem (multipart `file`) → `{url}` (autenticado).

### Rodar localmente (dev, SQLite)
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

---

## Provisionar a VPS (Ubuntu + systemd) — uma vez, como root

Servidor: `31.97.28.229` (Ubuntu 24.04, host compartilhado com outros sites Nginx).
Acesso: `ssh -i ~/.ssh/bmc_novo_servidor root@31.97.28.229`. Já tem Python 3.12,
PostgreSQL 16, Nginx e certbot instalados.

```bash
SSH="ssh -i ~/.ssh/bmc_novo_servidor root@31.97.28.229"

# 1) usuário de sistema que roda o app + diretórios
$SSH "adduser --disabled-password --gecos '' apicardapiobmc && \
  mkdir -p /home/apicardapiobmc/app /home/apicardapiobmc/logs/nginx && \
  chown -R apicardapiobmc:apicardapiobmc /home/apicardapiobmc"

# 2) banco PostgreSQL (role + database dedicados; senha em credencias.md)
$SSH "sudo -u postgres psql -c \"CREATE ROLE bmc LOGIN PASSWORD '<SENHA>';\" && \
  sudo -u postgres createdb -O bmc bmc"
```

Depois: server_block Nginx em `/etc/nginx/sites-enabled/apicardapiobmc.limadesigner.com.br.conf`
(proxy `127.0.0.1:8050`, aliases `/static/` e `/media/`, `/.well-known` liberado p/ ACME) →
`nginx -t && systemctl reload nginx`; e o cert com
`certbot --nginx -d apicardapiobmc.limadesigner.com.br --redirect`.

---

## Primeiro deploy do backend

Raiz do app no servidor: `/home/apicardapiobmc/app/backend` (código Django em `.../backend`).

```bash
APP=/home/apicardapiobmc/app/backend
SSH="ssh -i ~/.ssh/bmc_novo_servidor root@31.97.28.229"

# 1) enviar o código (exclui venv/env/estáticos)
cd /home/lima/projetos/BMC
tar czf - --exclude='backend/.venv' --exclude='**/__pycache__' \
  --exclude='backend/.env' --exclude='backend/staticfiles' \
  --exclude='backend/db.sqlite3' --exclude='**/.pytest_cache' \
  backend | $SSH "mkdir -p /home/apicardapiobmc/app && tar xzf - -C /home/apicardapiobmc/app && \
  chown -R apicardapiobmc:apicardapiobmc $APP"

# 2) criar venv + instalar deps (no servidor, como o site user)
$SSH "sudo -u apicardapiobmc bash -lc 'cd $APP && python3 -m venv .venv && . .venv/bin/activate && \
  pip install -U pip && pip install -r requirements.txt'"

# 3) criar o backend/.env de produção no servidor (ver credencias.md)
#    Modelo: backend/.env.production.example. chmod 640, owner apicardapiobmc.

# 4) migrate + estáticos + seed + admin
$SSH "sudo -u apicardapiobmc bash -lc 'cd $APP && . .venv/bin/activate && \
  python manage.py migrate && \
  python manage.py collectstatic --noinput && \
  python manage.py seed_inicial && \
  python manage.py createsuperuser'"

# 5) serviço systemd (PRECISA DE ROOT) — unit em /etc/systemd/system/apicardapiobmc.service
#    Gunicorn config.wsgi:application --bind 127.0.0.1:8050 --workers 2 --timeout 60
#    User=apicardapiobmc, WorkingDirectory=$APP, Restart=always
$SSH "systemctl daemon-reload && systemctl enable --now apicardapiobmc && systemctl is-active apicardapiobmc"
```

> ⚠️ **Permissão do `.env`:** `chmod 640 $APP/.env` e owner `apicardapiobmc` (senão o
> Gunicorn, rodando como `apicardapiobmc`, pode não ler → 502).
>
> ℹ️ Como `SECURE_SSL_REDIRECT=True`, testar direto na `127.0.0.1:8050` via HTTP dá **301**.
> Para validar local: `curl -H 'X-Forwarded-Proto: https' -H 'Host: apicardapiobmc.limadesigner.com.br' http://127.0.0.1:8050/api/v1/health`.

### Verificar
```bash
curl -s https://apicardapiobmc.limadesigner.com.br/api/v1/health   # {"banco":"ok"}
```

---

## Redeploy do backend (após mudanças no código) — servidor novo (systemd)

```bash
APP=/home/apicardapiobmc/app/backend
SSH="ssh -i ~/.ssh/bmc_novo_servidor root@31.97.28.229"

cd /home/lima/projetos/BMC
tar czf - --exclude='backend/.venv' --exclude='**/__pycache__' \
  --exclude='backend/.env' --exclude='backend/staticfiles' \
  --exclude='backend/db.sqlite3' backend \
  | $SSH "tar xzf - -C /home/apicardapiobmc/app && chown -R apicardapiobmc:apicardapiobmc $APP"

$SSH "sudo -u apicardapiobmc bash -lc 'cd $APP && . .venv/bin/activate && \
  pip install -q -r requirements.txt && \
  python manage.py migrate && python manage.py collectstatic --noinput'"

# reiniciar (root, systemd):
$SSH "systemctl restart apicardapiobmc && systemctl is-active apicardapiobmc"
```

---

## Frontend (Astro → Cloudflare Pages)

Desde 2026-06-17 o frontend é **Astro + ilhas React** (era React+Vite puro).
O HTML/SEO é estático; o cardápio é carregado no navegador via `GET /api/v1/site`
e o painel `/admin` é uma ilha React que fala REST (login por cookie httpOnly).
A URL da API vem de `PUBLIC_API_URL` (`.env`, default = produção).

Estrutura: `src/pages/{index,admin}.astro` (rotas) · `src/layouts/Base.astro`
(head/SEO/PWA) · `src/apps/SiteApp.jsx` (ilha do site) · `src/admin/*` (ilha do
painel) · `src/lib/{env,api,apiClient}.js` (dados/REST).

Build + deploy:
```bash
cd /home/lima/projetos/BMC
npm install
PUBLIC_API_URL=https://apicardapiobmc.limadesigner.com.br npm run build   # gera dist/
npx wrangler@3 pages deploy dist --project-name=cardapio --branch=main --commit-dirty=true
```
(token Cloudflare e account ID em `credencias.md`)

> Dev local: `npm run dev` (porta 4321). Para autenticar o admin contra a API
> de produção em localhost, é preciso adicionar a origem do dev ao
> `CORS_ALLOWED_ORIGINS` do backend; ou rodar o backend local em :8050.

---

## Operações comuns

(SSH = `ssh -i ~/.ssh/bmc_novo_servidor root@31.97.28.229`; APP = `/home/apicardapiobmc/app/backend`)

| Tarefa | Comando |
|---|---|
| Logs do app | `$SSH "tail -n 100 /home/apicardapiobmc/logs/gunicorn-error.log"` |
| Status | `$SSH "systemctl status apicardapiobmc"` |
| Reiniciar | `$SSH "systemctl restart apicardapiobmc"` |
| Shell Django | `$SSH "sudo -u apicardapiobmc bash -lc 'cd $APP && . .venv/bin/activate && python manage.py shell'"` |
| Trocar senha admin | `python manage.py changepassword <user>` ou tela /admin |
| Backup Postgres | `$SSH "sudo -u postgres pg_dump bmc > backup-\$(date +%F).sql"` |

---

## Histórico

- **2026-07-02 — migração de servidor:** saiu da VPS CloudPanel `5.78.40.61` (Supervisor,
  site user `limadesigner-apicardapiobmc`) para `31.97.28.229` (Ubuntu 24.04, Nginx + systemd
  + certbot). Banco migrado via `pg_dump | psql` (dump limpo, sem PostGIS). DNS A `apicardapiobmc`
  reapontado; cert Let's Encrypt reemitido. Frontend não mudou (mesmo subdomínio). Servidor
  antigo mantido alguns dias para rollback (reverter o DNS), depois desligar.

## Pendências
- [ ] **Rotacionar credenciais** reusadas na migração: senha do Postgres `bmc`, `SECRET_KEY`,
      senha do admin Django (todas expostas no chat/`credencias.md`).
- [ ] Desligar/cancelar o servidor antigo `5.78.40.61` após período de rollback.
- [ ] Substituir as **fotos placeholder** (Unsplash) pelas fotos reais do cliente.
