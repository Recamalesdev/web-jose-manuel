# spec.md — Desatascos Manuel (Bornos)

Documento de especificación (Spec-Driven Development). **El código es un artefacto derivado de este diseño.**

> Validación: v1 implementada. Cambios futuros deben actualizar este documento **antes** de escribir código de aplicación.

## 1. Contexto de negocio

| Campo | Valor |
|-------|-------|
| Marca | Desatoros Multiservicio 24h |
| Profesional | Manuel López |
| Ubicación | Bornos, Cádiz (Sierra de Cádiz) |
| Teléfono | 650 040 212 |
| WhatsApp | +34 650 040 212 |
| Email | jlopezmoreno1@icloud.com |
| Servicios | Fontanería, inspección con cámara, limpieza de fosas sépticas, pavimentos, tuberías en general |
| Mensaje comercial | No dudes en consultar cualquier duda. Pedir presupuesto sin compromiso. |
| Objetivo | Landing de conversión (llamada, WhatsApp, formulario de presupuesto) |

## 2. Objetivos

1. Generar leads vía formulario de contacto (EmailJS)
2. Facilitar contacto inmediato (teléfono visible, botón WhatsApp flotante)
3. Transmitir confianza local (copy en español, servicios claros)
4. Mantener la web rápida, accesible y desplegable de forma segura

## 3. Requerimientos funcionales

### 3.1 Secciones de la página

| Sección | ID / ancla | Contenido | Ref. tarea |
|---------|------------|-----------|------------|
| Navbar | — | Logo, nav (Inicio, Servicios, Contacto), CTA teléfono | T-002 |
| Hero | `#inicio` | Titular, subtítulo, CTA scroll a contacto | T-003 |
| Features | — | 4 ventajas competitivas | T-004 |
| Services | `#servicios` | 5 tarjetas de servicio con imagen | T-005 |
| Contact | `#contacto` | Formulario EmailJS + info directa | T-006 |
| Footer | — | Teléfono, Facebook, copyright, crédito dev | T-007 |
| WhatsApp | — | Botón flotante fijo | T-008 |

### 3.2 Formulario de contacto

- Campos: nombre (required), teléfono (required), servicio (select: fontanería, cámara, fosas, pavimentos, tuberías), mensaje (optional)
- Envío vía EmailJS con variables de entorno
- Feedback: confetti + mensaje de éxito; alert en error con teléfono de fallback
- Estados: idle, sending, submitted

### 3.3 Integraciones

| Integración | Detalle |
|-------------|---------|
| EmailJS | Envío de formulario (`VITE_EMAILJS_*`) |
| WhatsApp | `https://wa.me/34650040212` |
| Facebook | Perfil de Manuel López |
| Tel | `650040212` consistente vía `constants.ts` |

## 4. Diseño técnico

### 4.1 Arquitectura

```
index.html
    └── main.tsx
            └── App.tsx (composición, sin router)
                    ├── Navbar
                    ├── Hero / Features / Services / Contact
                    ├── Footer
                    └── WhatsAppBtn
```

- **Patrón:** SPA de una sola página con anclas (`#inicio`, `#servicios`, `#contacto`)
- **Estado:** local por componente (React hooks); sin store global en v1
- **Datos de negocio:** centralizados en `src/constants.ts` (marca, contacto, servicios, paleta vía Tailwind `@theme`)
- **Assets:** estáticos en `public/images/` (sin hotlinking en producción)

### 4.2 Stack

| Capa | Tecnología |
|------|------------|
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Build | Vite 7 |
| Contacto | EmailJS (`@emailjs/browser`) |
| Animaciones | AOS (scroll), canvas-confetti (éxito formulario) |
| Tests | Vitest, React Testing Library, jsdom |
| CI/CD | GitHub Actions → Vercel |

### 4.3 Contratos de entorno

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

- Prefijo `VITE_` expone variables al bundle del cliente (aceptable para EmailJS public key)
- Secretos nunca en código fuente ni en commits

### 4.4 Estrategia de tests

| Componente | Tests mínimos |
|------------|---------------|
| App | Smoke: renderiza secciones principales |
| Navbar | Teléfono visible; enlaces de navegación |
| Contact | Envío exitoso, error, estados del formulario |
| Otros | Añadir al modificar lógica o datos de negocio |

### 4.5 Identidad visual

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#1A2B48` | Navbar, footer, títulos, botones secundarios |
| `--color-accent` | `#0EA5E9` | CTAs, enlaces, acentos de marca |
| `--color-surface` | `#F4F7FA` | Fondos de sección |
| `--color-success` | `#059669` | WhatsApp |
| Tipografía | Plus Jakarta Sans | Google Fonts |

## 5. Requerimientos no funcionales

- TypeScript estricto en `desatascos-bornos/src/`
- ESLint sin errores
- `index.html`: `lang="es"`, meta description, favicon
- CI: lint + test + build en PR y push a `main`
- Deploy: Vercel con root directory `desatascos-bornos`
- Análisis de seguridad documentado en [`SECURITY.md`](SECURITY.md) por componente

## 6. Criterios de aceptación

- [x] `npm run build` exitoso
- [x] `npm run lint` sin errores
- [x] `npm run test:ci` todos los tests pasan
- [x] Teléfono `650 040 212` en Navbar, Contact, Footer
- [x] Formulario usa `import.meta.env.VITE_EMAILJS_*`
- [x] Imágenes servidas desde `public/images/`
- [x] `lang="es"` en HTML
- [ ] PR con CI verde antes de merge a `main`

## 7. Fuera de alcance (v1)

- CMS o panel de administración
- Multi-idioma
- Backend propio
- Analytics (Plausible/GA4 — fase 2 opcional)
- Routing multi-página

## 8. Trazabilidad

| Documento | Propósito |
|-----------|-----------|
| [`PLAN.md`](PLAN.md) | Desglose de tareas vinculadas a esta spec |
| [`SECURITY.md`](SECURITY.md) | Análisis de vulnerabilidades por componente |
| [`ENGRAM.md`](ENGRAM.md) | Memoria persistente entre sesiones |
| [`../AGENTS.md`](../AGENTS.md) | Reglas de orquestación para agentes |
