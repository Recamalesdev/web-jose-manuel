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

---

## 2026-05-23 — Ingeniería Determinística (contacto)

| Campo | Contenido |
|-------|-----------|
| **Qué** | Se formalizó Ingeniería Determinística en `AGENTS.md` y `spec.md`: Zod pre-EmailJS, fallback inline + WhatsApp, Error Boundary solo para render. Tareas T-023–T-025 en `PLAN.md`; `SECURITY.md` actualizado. |
| **Por qué** | El flujo v1 usa `required` HTML + `alert()`; la spec no garantizaba validación runtime ni Plan B de conversión ante fallo de EmailJS. |
| **Dónde** | `AGENTS.md`, `docs/spec.md`, `docs/PLAN.md`, `docs/SECURITY.md` |
| **Aprendizaje** | Error Boundary no sustituye manejo async de EmailJS; usar estado `submitError` + CTA WhatsApp. Implementación pendiente (HITL): T-023 → T-024 → T-025. |

---

## 2026-05-23 — Implementación Ingeniería Determinística (T-023–T-025)

| Campo | Contenido |
|-------|-----------|
| **Qué** | `contactSchema.ts` (Zod), validación en Contact, fallback inline + WhatsApp en `submitError`, `AppErrorBoundary` en App. 24 tests pasando. |
| **Por qué** | Cumplir spec §3.2 y AGENTS.md §6: datos validados antes de EmailJS; conversión preservada ante fallo de red/API. |
| **Dónde** | `contactSchema.ts`, `Contact.tsx`, `AppErrorBoundary.tsx`, tests, `package.json` (+zod) |
| **Aprendizaje** | Normalizar teléfono (quitar espacios) antes del regex ES. Guardar `validatedData` para construir URL WhatsApp con contexto del formulario tras fallo EmailJS. |

---

## 2026-05-23 — Runbook infra T-012

| Campo | Contenido |
|-------|-----------|
| **Qué** | `docs/BRANCH_PROTECTION.md` ampliado: checklist GitHub Secrets, Vercel env, branch protection `quality`. Enlaces directos al repo. |
| **Por qué** | T-012 es configuración manual; el runbook permite cerrar infra sin depender de memoria del agente. |
| **Dónde** | `docs/BRANCH_PROTECTION.md`, `docs/PLAN.md`, `README.md`, `docs/spec.md` |
| **Aprendizaje** | CI job name = `quality` debe coincidir con el status check de branch protection. Vercel requiere redeploy tras cambiar env vars. |

---

## 2026-05-23 — Cierre T-012 (Vercel verificado)

| Campo | Contenido |
|-------|-----------|
| **Qué** | Usuario confirmó Vercel con credenciales EmailJS correctas; formulario en producción funciona. T-012 marcado ✅ en PLAN. |
| **Por qué** | Lo crítico para el negocio es deploy + formulario; GitHub Secrets y branch protection son endurecimiento opcional. |
| **Dónde** | Vercel dashboard; `docs/PLAN.md` |
| **Aprendizaje** | `.env.example` = placeholders siempre. Valores reales solo en `.env` local (gitignored) y Vercel. No repetir secretos en chats ni en el repo. |

---

## 2026-05-23 — T-020 WhatsAppBtn tests

| Campo | Contenido |
|-------|-----------|
| **Qué** | `WhatsAppBtn.test.tsx`: enlace `wa.me` con mensaje encoded, `rel`/`target` seguros, hint "¡Escríbenos!". T-020 ✅. |
| **Por qué** | Cerrar cobertura de componentes de contacto; URL WhatsApp es canal crítico de conversión. |
| **Dónde** | `WhatsAppBtn.test.tsx`, `docs/PLAN.md` |
| **Aprendizaje** | Testear `href` completo con `encodeURIComponent` evita regresiones en el Plan B del formulario. |

---

## 2026-05-23 — T-032 Open Graph + Twitter Card

| Campo | Contenido |
|-------|-----------|
| **Qué** | Meta OG/Twitter en `index.html`; `SITE_URL`, `SEO_*`, `OG_IMAGE_URL` en `constants.ts`; `seo.test.ts`. T-032 ✅. |
| **Por qué** | Previews en WhatsApp, Facebook y X al compartir el enlace; imagen hero real de la furgoneta. |
| **Dónde** | `index.html`, `constants.ts`, `seo.test.ts`, `docs/PLAN.md` |
| **Aprendizaje** | Meta multilínea en HTML: tests deben buscar `property` y `content` por separado. Actualizar `SITE_URL` al migrar a dominio `.com`. |

---

## 2026-05-23 — T-033 Schema.org LocalBusiness

| Campo | Contenido |
|-------|-----------|
| **Qué** | `localBusinessSchema.ts` genera JSON-LD (LocalBusiness, address Bornos, areaServed Sierra de Cádiz, servicios); inyección en `main.tsx`. T-033 ✅. |
| **Por qué** | SEO local para Google; datos centralizados en `constants.ts` (`COVERAGE_AREA` reutilizable en T-034). |
| **Dónde** | `localBusinessSchema.ts`, `main.tsx`, `constants.ts`, tests |
| **Aprendizaje** | No importar `src/` desde `vite.config.ts` (tsconfig.node). Inyectar JSON-LD en runtime con guard anti-duplicado. |

---

## 2026-05-23 — T-034 Zona de cobertura

| Campo | Contenido |
|-------|-----------|
| **Qué** | Sección `CoverageArea` (#cobertura) con 8 localidades en `COVERAGE_TOWNS`; JSON-LD `areaServed` ampliado con ciudades. T-034 ✅. |
| **Por qué** | SEO local + confianza (“atendemos tu zona”); coherente con decisión de no enlazar mapa en Contact. |
| **Dónde** | `CoverageArea.tsx`, `constants.ts`, `App.tsx`, `localBusinessSchema.ts`, tests |
| **Aprendizaje** | Centralizar pueblos en `constants.ts` sincroniza UI y Schema.org. Copy de fallback para puebles no listados. |

---

## 2026-05-23 — T-022 Anti-spam formulario

| Campo | Contenido |
|-------|-----------|
| **Qué** | `contactAntiSpam.ts`: honeypot `empresa_web` oculto + retardo mínimo 2s. Bloqueos → éxito silencioso sin EmailJS/confetti. T-022 ✅. |
| **Por qué** | Mitigar spam en formulario público sin backend; no alertar al bot de que fue detectado. |
| **Dónde** | `contactAntiSpam.ts`, `Contact.tsx`, tests, `SECURITY.md`, `spec.md` |
| **Aprendizaje** | Honeypot off-screen (no `display:none`). Tests de integración con spy; lógica de tiempo en unit tests. |

---

## 2026-05-23 — T-036 WebP + hero preload

| Campo | Contenido |
|-------|-----------|
| **Qué** | `generate-webp.mjs` (sharp), variantes `.webp`, Hero con `image-set`, `<picture>` en Services, preload en `index.html`. T-036 ✅. |
| **Por qué** | Reducir peso de imágenes (LCP hero) manteniendo fallback PNG/JPG y OG en PNG para redes sociales. |
| **Dónde** | `scripts/`, `public/images/*.webp`, `Hero.tsx`, `Services.tsx`, `constants.ts`, `assets.test.ts` |
| **Aprendizaje** | `prebuild` + `test:ci` regeneran WebP; OG/social sigue en PNG. Tests importan `.webp` vía Vite en lugar de `node:fs`. |

---

## 2026-05-23 — T-035 Prueba social (trabajos reales)

| Campo | Contenido |
|-------|-----------|
| **Qué** | Sección `Testimonials` (#trabajos): 3 fotos reales (`WORK_HIGHLIGHTS`), CTA Facebook, `TESTIMONIALS[]` vacío para reseñas futuras. T-035 ✅. |
| **Por qué** | Prueba social honesta sin inventar opiniones; galería + enlace al perfil con trabajos publicados. |
| **Dónde** | `Testimonials.tsx`, `constants.ts`, `App.tsx`, tests, `spec.md` |
| **Aprendizaje** | Separar galería verificable (fotos propias) de `TESTIMONIALS` opcional; activar blockquotes solo cuando haya datos reales del cliente. |

---

## 2026-05-23 — T-035 revertida (sección trabajos)

| Campo | Contenido |
|-------|-----------|
| **Qué** | Eliminada sección `#trabajos` / `Testimonials`. Solo fosa y furgoneta son fotos reales de Manuel; galería retirada por honestidad de marca. |
| **Por qué** | Evitar portfolio engañoso; prueba social vía enlace Facebook en Footer. |
| **Dónde** | Eliminados `Testimonials.tsx`, tests; `App.tsx`, `constants.ts`, `PLAN.md`, `spec.md` |
| **Aprendizaje** | No montar sección “trabajos reales” hasta tener ≥3 fotos verificadas del cliente. T-035 ➖. |

---

## 2026-05-24 — Merge a main (feat/deterministic-seo-performance)

| Campo | Contenido |
|-------|-----------|
| **Qué** | Fast-forward `main` con `407cc4b`: Zod, anti-spam, Error Boundary, SEO (OG, JSON-LD, cobertura), WebP. T-014 ✅. |
| **Por qué** | Cerrar Fase 3–5 de código; único pendiente operativo = dominio `.com` (T-038). |
| **Dónde** | `main` ← `feat/deterministic-seo-performance`; CI local 42 tests + lint + build OK |
| **Aprendizaje** | PR no se abrió vía `gh` (sin auth); merge directo a `main` aceptado por el cliente. Vercel despliega al push. |
