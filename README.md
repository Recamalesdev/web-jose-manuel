# web-jose-manuel

Repositorio de la web de **Desatascos Manuel** (Bornos, Cádiz).

## Proyectos

| Carpeta | Descripción | Stack |
|---------|-------------|-------|
| [`desatascos-bornos/`](desatascos-bornos/) | Landing page de conversión | React 19, TypeScript, Vite 7, Tailwind 4 |

## Inicio rápido

```bash
cd desatascos-bornos
cp .env.example .env   # Rellenar credenciales EmailJS
npm install
npm run dev
```

## Documentación para agentes

- [`AGENTS.md`](AGENTS.md) — reglas, stack, convenciones y flujo de trabajo
- [`spec.md`](spec.md) — requerimientos de negocio y técnicos

## CI/CD

GitHub Actions ejecuta lint, tests y build en cada PR y push a `main`. Vercel despliega automáticamente tras merge.

## Contribuir

1. Crear rama `feat/...` desde `main`
2. Implementar cambios siguiendo `spec.md`
3. Abrir Pull Request
4. Esperar CI verde antes de merge
