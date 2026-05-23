# PLAN.md — Task List (Spec-Driven)

Lista de tareas vinculada a [`spec.md`](spec.md). Cada tarea requiere **tests unitarios** y verificación (`npm run test:ci`) antes de marcarse como terminada.

## Flujo de trabajo del agente

1. Leer `docs/spec.md` y validar alcance con el usuario si hay cambios de negocio
2. Entrar en **Plan Mode** para desglosar trabajo nuevo en tareas aquí
3. Implementar tarea por tarea con tests obligatorios
4. Ejecutar análisis de seguridad (actualizar `SECURITY.md` si hay componente nuevo)
5. Al cerrar sesión, añadir entrada en `ENGRAM.md`

## Leyenda de estado

| Estado | Significado |
|--------|-------------|
| ✅ | Terminada (tests pasan) |
| 🔄 | En progreso |
| ⏳ | Pendiente |
| ➖ | Fuera de alcance v1 |

---

## Fase 0 — Fundamentos

| ID | Tarea | Spec | Tests | Estado |
|----|-------|------|-------|--------|
| T-000 | Scaffold: Vite + React + TS + Tailwind | §4.2 | — | ✅ |
| T-000a | `AGENTS.md` + reglas Cursor | §8 | — | ✅ |
| T-000b | CI GitHub Actions (lint, test, build, audit) | §5 | — | ✅ |
| T-000c | Variables de entorno EmailJS (`.env.example`) | §4.3 | — | ✅ |

## Fase 1 — Secciones de la landing

| ID | Tarea | Spec | Tests | Estado |
|----|-------|------|-------|--------|
| T-001 | `constants.ts` (teléfono, WhatsApp) | §3.3 | indirecto (Navbar, Contact) | ✅ |
| T-002 | Navbar: nav + CTA teléfono | §3.1 | `Navbar.test.tsx` (2) | ✅ |
| T-003 | Hero: titular + CTA | §3.1 | smoke en `App.test.tsx` | ✅ |
| T-004 | Features: 4 ventajas | §3.1 | smoke en `App.test.tsx` | ✅ |
| T-005 | Services: 3 tarjetas + imágenes locales | §3.1 | smoke en `App.test.tsx` | ✅ |
| T-006 | Contact: formulario EmailJS + estados | §3.2 | `Contact.test.tsx` (3) | ✅ |
| T-007 | Footer: teléfono + enlaces | §3.1 | ⏳ test dedicado opcional | ✅ |
| T-008 | WhatsAppBtn flotante | §3.1 | ⏳ test dedicado opcional | ✅ |
| T-009 | App: composición + AOS init | §4.1 | `App.test.tsx` (1) | ✅ |

## Fase 2 — Calidad y despliegue

| ID | Tarea | Spec | Tests | Estado |
|----|-------|------|-------|--------|
| T-010 | Assets SVG en `public/images/` | §4.1 | manual | ✅ |
| T-011 | `index.html` SEO básico (`lang`, meta) | §5 | manual | ✅ |
| T-012 | Branch protection + secrets GitHub/Vercel | §5 | — | ⏳ |
| T-013 | PR modernización → merge `main` | §6 | CI verde | ⏳ |

## Fase 3 — Mejoras futuras (post-v1)

| ID | Tarea | Spec | Tests | Estado |
|----|-------|------|-------|--------|
| T-020 | Tests dedicados Footer / WhatsAppBtn | §4.4 | nuevos | ⏳ |
| T-021 | Analytics (Plausible o GA4) | §7 | — | ➖ |
| T-022 | Rate limiting / honeypot en formulario | SECURITY | Contact | ⏳ |

---

## Checklist por tarea (obligatorio)

Antes de marcar ✅:

- [ ] Cambio alineado con sección correspondiente de `spec.md`
- [ ] Tests unitarios añadidos o actualizados
- [ ] `npm run test:ci` pasa localmente
- [ ] `npm run lint` sin errores
- [ ] Entrada de seguridad en `SECURITY.md` si es componente nuevo o modificado con lógica sensible
- [ ] Sin secretos hardcodeados
