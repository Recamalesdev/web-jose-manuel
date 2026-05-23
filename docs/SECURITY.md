# SECURITY.md — Análisis de vulnerabilidades

Revisión por componente. Actualizar al añadir o modificar código con datos de usuario, integraciones externas o renderizado dinámico.

**Última revisión:** 2026-05-23

---

## Resumen de riesgo (v1)

| Nivel | Cantidad | Notas |
|-------|----------|-------|
| Alto | 0 | — |
| Medio | 2 | Spam en formulario; claves expuestas en cliente (esperado EmailJS) |
| Bajo | 3 | Dependencias, XSS teórico, enlaces externos |

---

## Contact.tsx

**Superficie:** formulario público, envío EmailJS, feedback al usuario.

| Amenaza | Riesgo | Mitigación actual | Recomendación |
|---------|--------|-------------------|---------------|
| Credenciales EmailJS en código | Alto si hardcodeadas | Variables `VITE_*` vía env | ✅ Mantener; rotar en EmailJS si filtradas |
| Claves en bundle cliente | Medio | Public key de EmailJS es pública por diseño | Limitar plantilla en dashboard EmailJS |
| Spam / abuso del formulario | Medio | Ninguna en v1 | T-022: honeypot o rate limit en EmailJS |
| XSS vía inputs | Bajo | React escapa por defecto; datos van a EmailJS | Validar longitud máxima en inputs |
| Exfiltración de PII | Bajo | Datos enviados solo a EmailJS | Revisar política de privacidad (fase 2) |
| Error handling | Bajo | `catch` genérico + teléfono fallback | No exponer detalles técnicos al usuario ✅ |

---

## Navbar.tsx / Footer.tsx

**Superficie:** enlaces `tel:`, anclas internas, enlace Facebook.

| Amenaza | Riesgo | Mitigación actual | Recomendación |
|---------|--------|-------------------|---------------|
| Open redirect | Bajo | Solo anclas `#` internas | No añadir URLs dinámicas sin validar |
| Enlace externo Facebook | Bajo | URL fija hardcodeada | `rel="noopener noreferrer"` si se abre en nueva pestaña |

---

## WhatsAppBtn.tsx

**Superficie:** enlace `wa.me` con mensaje prefijado.

| Amenaza | Riesgo | Mitigación actual | Recomendación |
|---------|--------|-------------------|---------------|
| URL injection | Bajo | Número y mensaje desde `constants.ts` | Mantener constantes; encode URI en enlace |

---

## constants.ts

**Superficie:** datos públicos de negocio (teléfono, WhatsApp).

| Amenaza | Riesgo | Mitigación | Recomendación |
|---------|--------|------------|---------------|
| Exposición de teléfono | N/A (intencional) | Dato público de marketing | — |

---

## App.tsx + assets estáticos

| Amenaza | Riesgo | Mitigación actual | Recomendación |
|---------|--------|-------------------|---------------|
| Hotlinked images | Medio (privacidad/availability) | Imágenes locales en `public/images/` | ✅ No revertir a URLs externas |
| Dependencias (AOS, confetti) | Bajo | `npm audit` en CI | Mantener dependencias actualizadas |
| Supply chain | Bajo | `npm ci` + lockfile | Revisar advisories en PRs |

---

## CI/CD y secretos

| Amenaza | Riesgo | Mitigación actual | Recomendación |
|---------|--------|-------------------|---------------|
| `.env` en repo | Alto | `.gitignore` | Nunca commitear `.env` |
| Secrets en GitHub Actions | Medio | Repository secrets | Rotar si se sospecha filtración |
| Build con env vacío | Bajo | CI usa secrets | Build local funciona sin env (form falla en runtime) |

---

## Checklist para componentes nuevos

Al proponer un componente nuevo, documentar aquí:

1. **Entradas de usuario** — ¿Se validan y sanitizan?
2. **Salidas** — ¿Se renderiza HTML crudo (`dangerouslySetInnerHTML`)? Evitar.
3. **Secretos** — ¿Hay credenciales? Solo vía env del servidor o claves públicas documentadas.
4. **Integraciones** — ¿Qué datos salen del navegador? ¿HTTPS obligatorio?
5. **Dependencias** — ¿Paquete mantenido? ¿Alternativa más segura?
