# AGENTS.md — web-jose-manuel

Fuente de verdad para agentes de IA. Rol: **Senior Software Architect / Arquitecto de Orquestación**.

## Metodología agéntica

### 1. Spec-Driven Development

1. Leer [`docs/spec.md`](docs/spec.md) antes de cualquier cambio de aplicación
2. Actualizar la spec **antes** de escribir código si cambian requerimientos
3. No implementar hasta que el usuario valide cambios de alcance significativos

### 2. Planificación (Plan Mode)

1. Entrar en **Plan Mode** para desglosar trabajo nuevo
2. Registrar tareas en [`docs/PLAN.md`](docs/PLAN.md) vinculadas a secciones de la spec
3. Una tarea = un entregable verificable

### 3. Calidad garantizada

Por cada tarea:

1. Escribir o actualizar **tests unitarios** (Vitest + RTL)
2. Ejecutar `npm run test:ci` y confirmar que pasan
3. Ejecutar `npm run lint` sin errores
4. Marcar la tarea ✅ en `PLAN.md` solo tras verificación

### 4. Seguridad

1. Analizar vulnerabilidades de cada componente nuevo o modificado
2. Documentar en [`docs/SECURITY.md`](docs/SECURITY.md)
3. Nunca commitear secretos; EmailJS solo vía `VITE_*` env

### 5. Memoria (Engram)

Al **finalizar cada sesión**, añadir entrada en [`docs/ENGRAM.md`](docs/ENGRAM.md):

- **Qué** — acción o decisión
- **Por qué** — motivo
- **Dónde** — archivos afectados
- **Aprendizaje** — insight reutilizable

### 6. Ingeniería Determinística

Principio: **ningún dato sale del cliente ni ningún fallo externo deja la UX rota** sin contrato explícito.

#### Flujo de contacto (EmailJS)

1. **Muros de contención (Zod)** — Esquema estricto en `src/` que valide tipado y formato *antes* de llamar a `emailjs.send`. Si falla, mostrar errores por campo; **no** disparar la petición.
2. **Patrones de fallback (resiliencia)** — Si EmailJS falla (red, cuota, 4xx/5xx), la app **no** puede colapsar ni depender de `alert()`. Mostrar estado `submitError` inline con copy claro y **Plan B inmediato**: CTA a WhatsApp (`wa.me`) con mensaje prefijado desde `constants.ts`.
3. **Error Boundary** — Red global opcional en `App` para crashes de render. **No** sustituye el manejo de errores async del formulario.

Tests obligatorios: esquema Zod (unit), envío bloqueado si inválido, UI de error + enlace WhatsApp en fallo EmailJS.

---

## Stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS 4
- **Testing:** Vitest, React Testing Library, jsdom
- **Linting:** ESLint 9 (flat config)
- **Validación:** Zod (formulario de contacto)
- **Contacto:** EmailJS (`@emailjs/browser`)
- **Deploy:** Vercel (root directory: `desatascos-bornos`)

## Estructura del repositorio

```
web-jose-manuel/
├── AGENTS.md                 # Este archivo (orquestación)
├── docs/
│   ├── spec.md               # Especificación (fuente de verdad)
│   ├── PLAN.md               # Task list vinculada a spec
│   ├── SECURITY.md           # Análisis de vulnerabilidades
│   ├── ENGRAM.md             # Memoria entre sesiones
│   └── BRANCH_PROTECTION.md  # Config manual GitHub/Vercel
├── README.md
├── .github/workflows/        # CI/CD
├── .cursor/rules/            # Reglas Cursor
└── desatascos-bornos/        # Aplicación (landing page)
    ├── src/
    ├── public/
    └── package.json
```

## Comandos

```bash
cd desatascos-bornos
npm install
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run lint         # ESLint
npm run test         # Vitest (watch)
npm run test:ci      # Vitest (CI, una pasada)
```

## Convenciones de código

- Componentes funcionales con TypeScript (`.tsx`)
- Identificadores de código en **inglés**; copy visible al usuario en **español**
- Tailwind utility-first; evitar CSS custom salvo animaciones globales
- Constantes de negocio (teléfono, WhatsApp) en `src/constants.ts`
- Sin routing: SPA con anclas `#inicio`, `#servicios`, `#contacto`

## Prohibiciones

- **No** commitear `.env` ni secretos reales
- **No** hardcodear claves EmailJS en el código
- **No** push directo a `main` — usar Pull Requests
- **No** imágenes hotlinked de terceros en producción — usar `public/images/`
- **No** añadir librerías obsoletas (jQuery, Create React App, etc.)
- **No** marcar tareas como terminadas sin tests que pasen
- **No** enviar el formulario de contacto sin pasar el esquema Zod
- **No** usar `alert()` como único fallback de error en EmailJS

## Variables de entorno

Copiar `.env.example` a `.env` en `desatascos-bornos/`:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Configurar las mismas variables en GitHub Secrets (CI) y Vercel (Production + Preview).

## Git Worktrees

Para cambios estructurales sin colisionar con la carpeta principal:

```bash
git worktree add ../web-jose-manuel-feat -b feat/nombre-rama
cd ../web-jose-manuel-feat/desatascos-bornos
npm install && npm run dev
```

Eliminar worktree al terminar:

```bash
git worktree remove ../web-jose-manuel-feat
```

## Flujo de trabajo

1. Leer `docs/spec.md` y `docs/PLAN.md`
2. Plan Mode → desglosar tareas si hay trabajo nuevo
3. Crear rama `feat/...` desde `main`
4. Implementar con tests + actualizar `SECURITY.md` si aplica
5. Abrir PR → CI debe pasar (lint, test, build)
6. Merge a `main` → Vercel despliega automáticamente
7. Entrada en `docs/ENGRAM.md` al cerrar sesión

## MCP

No hay base de datos externa ni CMS en v1. EmailJS es la única integración con credenciales vía env. Reevaluar MCP si se añade Supabase, Notion u otro servicio con API.
