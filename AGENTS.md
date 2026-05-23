# AGENTS.md — web-jose-manuel

Fuente de verdad para agentes de IA que trabajen en este repositorio.

## Stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS 4
- **Testing:** Vitest, React Testing Library, jsdom
- **Linting:** ESLint 9 (flat config)
- **Contacto:** EmailJS (`@emailjs/browser`)
- **Deploy:** Vercel (root directory: `desatascos-bornos`)

## Estructura del repositorio

```
web-jose-manuel/
├── AGENTS.md              # Este archivo
├── spec.md                # Requerimientos de negocio y técnicos
├── README.md              # Índice del repo
├── .github/workflows/     # CI/CD
├── .cursor/rules/         # Reglas específicas de Cursor
└── desatascos-bornos/     # Aplicación (landing page)
    ├── src/
    ├── public/
    └── package.json
```

## Comandos

```bash
cd desatascos-bornos
npm install
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # ESLint
npm run test     # Vitest (watch)
npm run test:ci  # Vitest (CI, una pasada)
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

1. Leer `spec.md` antes de implementar cambios
2. Crear rama `feat/...` desde `main`
3. Implementar con tests
4. Abrir PR → CI debe pasar (lint, test, build)
5. Merge a `main` → Vercel despliega automáticamente

## MCP

No hay base de datos externa ni CMS en v1. EmailJS es la única integración con credenciales vía env. Reevaluar MCP si se añade Supabase, Notion u otro servicio con API.
