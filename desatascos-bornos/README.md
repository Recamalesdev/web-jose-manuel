# Desatascos Bornos — Landing Page

Web de conversión para Desatascos Manuel (Bornos, Cádiz).

## Setup local

```bash
npm install
cp .env.example .env
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | ID del servicio EmailJS |
| `VITE_EMAILJS_TEMPLATE_ID` | ID de la plantilla EmailJS |
| `VITE_EMAILJS_PUBLIC_KEY` | Public key de EmailJS |

Obtener credenciales en [emailjs.com](https://www.emailjs.com/).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (watch) |
| `npm run test:ci` | Vitest (una pasada, para CI) |

## Deploy

Vercel con **Root Directory** = `desatascos-bornos`. Configurar las mismas `VITE_EMAILJS_*` en el dashboard de Vercel.
