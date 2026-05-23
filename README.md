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

| Documento | Propósito |
|-----------|-----------|
| [`AGENTS.md`](AGENTS.md) | Orquestación, stack, convenciones y flujo |
| [`docs/spec.md`](docs/spec.md) | Especificación (Spec-Driven Development) |
| [`docs/PLAN.md`](docs/PLAN.md) | Task list vinculada a la spec |
| [`docs/SECURITY.md`](docs/SECURITY.md) | Análisis de vulnerabilidades |
| [`docs/ENGRAM.md`](docs/ENGRAM.md) | Memoria persistente entre sesiones |

## CI/CD

GitHub Actions ejecuta lint, tests y build en cada PR y push a `main`. Vercel despliega automáticamente tras merge.

## Contribuir

1. Leer `docs/spec.md` y validar alcance
2. Crear rama `feat/...` desde `main`
3. Implementar con tests (`npm run test:ci`)
4. Abrir Pull Request
5. Esperar CI verde antes de merge
