# Infraestructura — GitHub, CI y Vercel (T-012)

Runbook para cerrar la configuración operativa del repositorio [`Recamalesdev/web-jose-manuel`](https://github.com/Recamalesdev/web-jose-manuel).

**Workflow CI:** `.github/workflows/ci.yml` — job `quality` (lint, test, build, audit).

**Deploy:** Vercel → root directory `desatascos-bornos` → [web-jose-manuel-seven.vercel.app](https://web-jose-manuel-seven.vercel.app/)

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

1. Abre la [web en producción](https://web-jose-manuel-seven.vercel.app/).
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

## Historial

| Fecha | Nota |
|-------|------|
| 2026-05-23 | Runbook ampliado para cierre T-012. PR #1 (*modernización*) mergeado con CI verde. |
| 2026-05-23 | **Cierre operativo:** Vercel con `VITE_EMAILJS_*` correctas; formulario en producción OK. `.env.example` solo placeholders (correcto). GitHub Secrets y branch protection = opcionales. |
