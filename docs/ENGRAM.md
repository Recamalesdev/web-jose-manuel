# ENGRAM.md — Memoria persistente del diseño

Registro de aprendizajes entre sesiones de agente. **Al finalizar cada sesión**, añadir una entrada con el formato:

```markdown
## YYYY-MM-DD — [Título breve]

| Campo | Contenido |
|-------|-----------|
| **Qué** | Qué se hizo o decidió |
| **Por qué** | Motivo de negocio o técnico |
| **Dónde** | Archivos, docs o componentes afectados |
| **Aprendizaje** | Insight reutilizable para futuras sesiones |
```

---

## 2026-05-23 — Framework de orquestación agéntica

| Campo | Contenido |
|-------|-----------|
| **Qué** | Se formalizó la metodología Spec-Driven + Plan + Tests + Security + Engram. Documentación movida/consolidada en `docs/`. |
| **Por qué** | El usuario definió un rol de Arquitecto de Orquestación; el repo tenía piezas sueltas (`AGENTS.md`, `spec.md` en raíz) sin trazabilidad ni memoria entre sesiones. |
| **Dónde** | `AGENTS.md`, `docs/spec.md`, `docs/PLAN.md`, `docs/SECURITY.md`, `.cursor/rules/orchestration.mdc` |
| **Aprendizaje** | v1 ya está implementada (TS, 6 tests pasando). El flujo spec-first aplica a **cambios futuros**; no bloquea el código existente. Pendientes: PR merge, branch protection, tests Footer/WhatsApp. |

---

## 2026-05-23 — Estado baseline v1

| Campo | Contenido |
|-------|-----------|
| **Qué** | Landing completa: Navbar, Hero, Features, Services, Contact (EmailJS), Footer, WhatsAppBtn. CI con lint/test/build/audit. |
| **Por qué** | Objetivo de conversión para Desatascos Manuel en Bornos. |
| **Dónde** | `desatascos-bornos/src/`, `.github/workflows/ci.yml` |
| **Aprendizaje** | EmailJS public key en cliente es aceptable; el riesgo principal es spam en formulario (T-022). Constantes de teléfono centralizadas en `constants.ts` evitan inconsistencias. |

---

## 2026-05-23 — Identidad desde tarjeta de visita

| Campo | Contenido |
|-------|-----------|
| **Qué** | Se aplicaron datos de la tarjeta (Desatoros Multiservicio 24h, Manuel López, email, 5 servicios) y paleta moderna navy/cyan en Tailwind `@theme`. |
| **Por qué** | Alinear la web con la identidad real del negocio y modernizar la estética respecto al diseño impreso. |
| **Dónde** | `constants.ts`, `index.css`, componentes UI, `index.html`, `docs/spec.md`, `constants.test.ts` |
| **Aprendizaje** | Centralizar marca + servicios en `constants.ts` permite actualizar copy y tests desde un solo punto. Tailwind 4 `@theme` expone tokens como `bg-primary`, `text-accent` sin config extra. |

## 2026-05-23 — Fase 4: favicon de marca

| Campo | Contenido |
|-------|-----------|
| **Qué** | Favicon DESATOROS (navy + badge 24H cyan), `theme-color`, `apple-touch-icon`; Fase 4 añadida en `PLAN.md` (SEO, testimonios, emojis). |
| **Por qué** | Pulir marca en pestaña móvil y planificar mejoras de visibilidad post-dominio `.com`. |
| **Dónde** | `public/favicon.svg`, `index.html`, `favicon.test.ts`, `docs/PLAN.md`, `docs/spec.md` |
| **Aprendizaje** | Test de asset estático con `readFileSync` valida colores de marca sin E2E. SEO avanzado queda bloqueado hasta dominio propio. |

## 2026-05-23 — T-031 iconos en Contact/Footer

| Campo | Contenido |
|-------|-----------|
| **Qué** | Emojis sustituidos por `react-icons/fa` (teléfono, email, ubicación, éxito formulario); `Footer.test.tsx` añadido. |
| **Por qué** | Unificar iconografía con Navbar/Features y pulir detalle de marca (Fase 4). |
| **Dónde** | `Contact.tsx`, `Footer.tsx`, `Contact.test.tsx`, `Footer.test.tsx`, `docs/PLAN.md` |
| **Aprendizaje** | Usar `react-icons/fa` (no fa6) para coincidir con el resto del proyecto; `aria-label` en enlaces tel/mailto mejora accesibilidad y tests. |
