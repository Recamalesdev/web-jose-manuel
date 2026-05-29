# Infraestructura — GitHub, CI y Vercel (T-012)

Runbook para cerrar la configuración operativa del repositorio [`Recamalesdev/web-jose-manuel`](https://github.com/Recamalesdev/web-jose-manuel).

**Workflow CI:** `.github/workflows/ci.yml` — job `quality` (lint, test, build, audit).

**Deploy:** Vercel → root directory `desatascos-bornos` → producción [desatorosmanuel.com](https://desatorosmanuel.com/) (redirect 301 desde `web-jose-manuel-seven.vercel.app` vía `vercel.json`)

---

## Checklist T-012

Marca cada ítem al completarlo. T-012 queda ✅ solo cuando los tres bloques están hechos.

| # | Bloque | Estado |
|---|--------|--------|
| 1 | [Secrets GitHub Actions](#1-secrets-de-github-actions) | ☐ |
| 2 | [Variables Vercel](#2-variables-en-vercel) | ☐ |
| 3 | [Branch protection `main`](#3-branch-protection-en-main) | ☐ |

---

## 1. Secrets de GitHub Actions

**Ruta:** [Settings → Secrets and variables → Actions](https://github.com/Recamalesdev/web-jose-manuel/settings/secrets/actions)

Crear **Repository secrets** (no environment secrets):

| Secret | Descripción |
|--------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | Service ID del dashboard EmailJS |
| `VITE_EMAILJS_TEMPLATE_ID` | Template ID del formulario |
| `VITE_EMAILJS_PUBLIC_KEY` | Public Key de EmailJS |

> Los nombres deben coincidir **exactamente** con los del workflow CI (prefijo `VITE_`).

### Verificación

1. Abre [Actions → CI](https://github.com/Recamalesdev/web-jose-manuel/actions/workflows/ci.yml).
2. El último run en `main` debe estar en verde.
3. El paso **Run npm run build** no debe fallar por variables vacías.

Si el build falla por env: revisa que los tres secrets existen y vuelve a ejecutar el workflow (*Re-run all jobs*).

---

## 2. Variables en Vercel

**Ruta:** Vercel Dashboard → Project **web-jose-manuel** → Settings → Environment Variables

Añadir las **mismas tres variables** para:

- **Production**
- **Preview**

| Variable | Valor |
|----------|-------|
| `VITE_EMAILJS_SERVICE_ID` | (mismo que GitHub) |
| `VITE_EMAILJS_TEMPLATE_ID` | (mismo que GitHub) |
| `VITE_EMAILJS_PUBLIC_KEY` | (mismo que GitHub) |

### Configuración del proyecto

| Setting | Valor esperado |
|---------|----------------|
| Root Directory | `desatascos-bornos` |
| Framework Preset | Vite |
| Production Branch | `main` |

Tras añadir o cambiar variables: **Redeploy** el último deployment de Production.

### Verificación

1. Abre la [web en producción](https://desatorosmanuel.com/).
2. Envía el formulario de contacto con datos válidos.
3. Debe mostrarse éxito (confetti) o, si EmailJS falla, el fallback WhatsApp — **no** un error silencioso en consola por env vacío.

---

## 3. Branch protection en `main`

**Ruta:** [Settings → Branches → Add branch ruleset](https://github.com/Recamalesdev/web-jose-manuel/settings/rules)  
*(o “Add classic branch protection rule” si usas reglas clásicas)*

### Regla recomendada para `main`

| Opción | Valor |
|--------|-------|
| Branch / target | `main` |
| Require a pull request before merging | ✅ |
| Require approvals | 0 o 1 (según preferencia del equipo) |
| Require status checks to pass | ✅ |
| Status check required | **`quality`** |
| Require branches to be up to date | ✅ (recomendado) |
| Do not allow bypassing | ✅ (recomendado) |
| Restrict pushes that bypass PR | ✅ |

> El nombre del check es **`quality`** — coincide con el `jobs.quality` en `ci.yml`.  
> Si no aparece en el desplegable, abre un PR de prueba, espera a que CI termine en verde y vuelve a editar la regla.

### Verificación

1. Intenta push directo a `main` → debe rechazarse (o exigir PR).
2. Abre un PR de prueba → merge bloqueado hasta que `quality` esté verde.
3. Con CI verde → merge permitido.

---

## Flujo de trabajo seguro (post T-012)

```text
feat/mi-rama → PR → CI quality ✅ → merge main → Vercel deploy automático
```

- **No** push directo a `main` (prohibido en `AGENTS.md`).
- Credenciales EmailJS **solo** en GitHub Secrets y Vercel — nunca en commits.

---

## Referencia local

Copia de variables para desarrollo:

```bash
cd desatascos-bornos
cp .env.example .env
# Editar .env con los mismos valores (no commitear)
```

Plantilla: `desatascos-bornos/.env.example`

---

## Troubleshooting

| Síntoma | Causa probable | Acción |
|---------|----------------|--------|
| CI build falla en GitHub | Secrets no configurados | Añadir los 3 secrets y re-run |
| Formulario OK en local, falla en Vercel | Env vars faltan en Vercel | Añadir vars + redeploy |
| Check `quality` no aparece en branch protection | Nunca corrió CI en un PR | Abrir PR, esperar CI verde, reintentar |
| Push a `main` sigue funcionando | Branch protection no activa | Revisar regla en Settings → Branches |

---

## 4. Dominio `desatorosmanuel.com` (T-038)

El repositorio define la URL canónica en `SITE_URL` (`constants.ts`), meta OG/Twitter en `index.html`, JSON-LD y redirect 301 en `desatascos-bornos/vercel.json`.

### Checklist T-038

| # | Paso | Dónde | Estado |
|---|------|-------|--------|
| 1 | Merge a `main` con `SITE_URL` = `https://desatorosmanuel.com` | GitHub | ☐ |
| 2 | Añadir dominio en Vercel | Project → Settings → Domains | ☐ |
| 3 | Configurar DNS en el registrador | Ver registros que muestra Vercel | ☐ |
| 4 | Dominio primario = `desatorosmanuel.com`; `www` → redirect a apex (recomendado) | Vercel Domains | ☐ |
| 5 | Esperar certificado SSL (Let's Encrypt) | Vercel | ☐ |
| 6 | Verificar redirect desde `*.vercel.app` | Navegador / `curl -I` | ☐ |
| 7 | Google Search Console: propiedad URL `https://desatorosmanuel.com` | [Search Console](https://search.google.com/search-console) | ☐ |
| 8 | Verificar propiedad (registro TXT DNS o archivo HTML en `public/`) | DNS / `public/` | ☐ |
| 9 | Enviar sitemap (opcional v1: solo `/`) o URL de inspección | Search Console | ☐ |
| 10 | Cambio de dirección (opcional): URL antigua `web-jose-manuel-seven.vercel.app` si GSC la tenía indexada | Search Console | ☐ |

### Vercel — Dominios

**Ruta:** Vercel Dashboard → Project **web-jose-manuel** → Settings → **Domains**

1. **Add** `desatorosmanuel.com` y `www.desatorosmanuel.com`.
2. Copia los registros DNS (normalmente `A` → `76.76.21.21` y/o `CNAME` → `cname.vercel-dns.com`) en tu registrador.
3. Marca **`desatorosmanuel.com`** como dominio **Primary** de Production.
4. Redirige `www.desatorosmanuel.com` → `desatorosmanuel.com` (301).

### DNS típico (apex + www)

| Tipo | Nombre | Valor (ejemplo Vercel) |
|------|--------|-------------------------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

> Los valores exactos los muestra Vercel al añadir el dominio; no uses esta tabla si difieren.

### Verificación post-DNS

```bash
curl -sI https://desatorosmanuel.com/ | head -5
curl -sI https://web-jose-manuel-seven.vercel.app/ | head -5
```

- Producción debe responder **200** en `desatorosmanuel.com`.
- El host `*.vercel.app` debe devolver **301/308** hacia `https://desatorosmanuel.com/`.

### Google Search Console

1. **Añadir propiedad** → prefijo de URL: `https://desatorosmanuel.com/`
2. **Verificar** (método recomendado: registro TXT en DNS del dominio).
3. Tras el primer deploy con dominio activo: **Inspección de URL** → solicitar indexación de la home.
4. Si existía propiedad del subdominio Vercel: **Configuración → Cambios de dirección** hacia el dominio nuevo.

### Código ya alineado

| Archivo | Contenido |
|---------|-----------|
| `src/constants.ts` | `SITE_URL`, `OG_IMAGE_URL` |
| `index.html` | `canonical`, `og:url`, `og:image`, `twitter:image` |
| `vercel.json` | 301 `web-jose-manuel-seven.vercel.app` → `desatorosmanuel.com` |
| Tests | `constants.test.ts`, `seo.test.ts`, `localBusinessSchema.test.ts` |

---

## Historial

| Fecha | Nota |
|-------|------|
| 2026-05-29 | T-038: dominio `desatorosmanuel.com` en código + runbook DNS/Vercel/GSC. |
| 2026-05-23 | Runbook ampliado para cierre T-012. PR #1 (*modernización*) mergeado con CI verde. |
| 2026-05-23 | **Cierre operativo:** Vercel con `VITE_EMAILJS_*` correctas; formulario en producción OK. `.env.example` solo placeholders (correcto). GitHub Secrets y branch protection = opcionales. |
