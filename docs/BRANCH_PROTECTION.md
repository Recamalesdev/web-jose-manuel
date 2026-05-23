# Branch protection — configuración manual en GitHub

El workflow CI (`.github/workflows/ci.yml`) se activa en PRs y push a `main`. Para completar el flujo seguro del plan, configura en GitHub:

## 1. Secrets del repositorio

Settings → Secrets and variables → Actions → New repository secret:

| Secret | Valor |
|--------|-------|
| `VITE_EMAILJS_SERVICE_ID` | ID del servicio EmailJS |
| `VITE_EMAILJS_TEMPLATE_ID` | ID de la plantilla EmailJS |
| `VITE_EMAILJS_PUBLIC_KEY` | Public key de EmailJS |

## 2. Variables en Vercel

Vercel Dashboard → Project → Settings → Environment Variables:

Mismas tres variables para **Production** y **Preview**.

> Si Vercel ya tiene root directory = `desatascos-bornos`, no uses `vercel.json` en raíz o verifica que no entre en conflicto con la config del dashboard.

## 3. Branch protection en `main`

Settings → Branches → Add rule:

- Branch name pattern: `main`
- Require a pull request before merging
- Require status checks to pass: `quality`
- Do not allow bypassing the above settings (recomendado)

## 4. Abrir PR de modernización

```bash
git checkout -b feat/modernization
git add .
git commit -m "Modernize project: TypeScript, tests, CI/CD"
git push -u origin feat/modernization
gh pr create --title "Modernización: TypeScript, tests y CI/CD" --body "..."
```

Merge solo cuando el check `quality` esté en verde.
