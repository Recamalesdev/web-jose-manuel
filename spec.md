# spec.md — Desatascos Manuel (Bornos)

Documento de especificación. El código es un artefacto derivado de este diseño.

## 1. Contexto de negocio

- **Cliente:** José Manuel — Desatascos Manuel
- **Ubicación:** Bornos, Cádiz (Sierra de Cádiz)
- **Teléfono:** 650 040 212
- **WhatsApp:** +34 650 040 212
- **Servicios:** desatascos urgentes 24h, limpieza de arquetas, limpieza de pavimentos
- **Objetivo:** landing de conversión (llamada, WhatsApp, formulario de presupuesto)

## 2. Objetivos

1. Generar leads vía formulario de contacto (EmailJS)
2. Facilitar contacto inmediato (teléfono visible, botón WhatsApp flotante)
3. Transmitir confianza local (copy en español, servicios claros)
4. Mantener la web rápida, accesible y desplegable de forma segura

## 3. Requerimientos funcionales

### Secciones de la página

| Sección | ID / ancla | Contenido |
|---------|------------|-----------|
| Navbar | — | Logo, nav (Inicio, Servicios, Contacto), CTA teléfono |
| Hero | `#inicio` | Titular, subtítulo, CTA scroll a contacto |
| Features | — | 4 ventajas competitivas |
| Services | `#servicios` | 3 tarjetas de servicio con imagen |
| Contact | `#contacto` | Formulario EmailJS + info directa |
| Footer | — | Teléfono, Facebook, copyright, crédito dev |
| WhatsApp | — | Botón flotante fijo |

### Formulario de contacto

- Campos: nombre (required), teléfono (required), servicio (select), mensaje (optional)
- Envío vía EmailJS con variables de entorno
- Feedback: confetti + mensaje de éxito; alert en error con teléfono de fallback
- Estados: idle, sending, submitted

### Integraciones

- **EmailJS:** envío de formulario (credenciales en `VITE_EMAILJS_*`)
- **WhatsApp:** `https://wa.me/34650040212`
- **Facebook:** perfil de José Manuel
- **Tel:** `650040212` consistente en toda la web

## 4. Requerimientos técnicos

- TypeScript estricto en toda la app (`desatascos-bornos/src/`)
- Vite 7 + React 19 + Tailwind 4
- Assets en `public/images/` (sin URLs externas en producción)
- `index.html`: `lang="es"`, meta description, favicon
- ESLint sin errores
- Vitest + RTL: tests de Contact, Navbar, App smoke test
- CI: GitHub Actions en PR y push a `main` (lint, test, build)
- Deploy: Vercel con root directory `desatascos-bornos`

## 5. Criterios de aceptación

- [ ] `npm run build` exitoso
- [ ] `npm run lint` sin errores
- [ ] `npm run test:ci` todos los tests pasan
- [ ] Teléfono `650 040 212` en Navbar (desktop y móvil), Contact, Footer
- [ ] Formulario usa `import.meta.env.VITE_EMAILJS_*` (no claves en código)
- [ ] Imágenes de servicios servidas desde `public/images/`
- [ ] `lang="es"` en HTML
- [ ] PR con CI verde antes de merge a `main`

## 6. Fuera de alcance (v1)

- CMS o panel de administración
- Multi-idioma
- Backend propio
- Analytics (Plausible/GA4 — fase 2 opcional)
- Routing multi-página
