[🇪🇸 Leer en Español](#español) | [🇬🇧 Read in English](#english)

<a id="español"></a>
# 🚛 Desatascos Manuel - Web Corporativa

> **Solución web profesional para servicios de urgencias 24h y mantenimiento en la Sierra de Cádiz.**

![Estado del Proyecto](https://img.shields.io/badge/Estado-En_Producción-success?style=for-the-badge)
![Licencia](https://img.shields.io/badge/Licencia-Privada-red?style=for-the-badge)

## 📋 Sobre el Proyecto

Este proyecto es una **Single Page Application (SPA)** desarrollada para digitalizar un negocio local de desatascos y fontanería.

El objetivo principal era crear una presencia digital rápida, accesible y enfocada en la conversión (llamadas de urgencia), sustituyendo métodos tradicionales por una solución tecnológica moderna.

### 🚀 Despliegue (Demo)

Puedes ver el proyecto en funcionamiento aquí:

👉 **[Visitar la Web de Desatoros](https://desatorosmanuel.com/)**

---

## 🛠️ Stack Tecnológico

| Carpeta | Descripción | Stack |
|---------|-------------|-------|
| [`desatascos-bornos/`](desatascos-bornos/) | Landing page de conversión | React 19, TypeScript, Vite 7, Tailwind 4 |

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/EmailJS-FF9A00?style=for-the-badge&logo=email&logoColor=white" alt="EmailJS" />
</p>

---

## ✨ Características Principales

* **⚡ Rendimiento ultra-rápido:** Construido con **Vite**, ideal para servicios de urgencia.
* **📱 Diseño mobile-first:** Interfaz responsiva adaptada a móviles.
* **📧 Gestión de presupuestos:** Integración con **EmailJS** sin backend propio.
* **🎨 UI/UX moderna:** Tailwind CSS, feedback visual y fotos reales de servicios.
* **🧪 Calidad:** Tests con Vitest, ESLint y CI en GitHub Actions.

---

## 📸 Capturas de Pantalla

![Vista previa del proyecto](desatascos-bornos/webjosemanuel.PNG)

---

## 🔧 Instalación Local

```bash
git clone https://github.com/Recamalesdev/web-jose-manuel.git
cd web-jose-manuel/desatascos-bornos
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
| [`docs/BRANCH_PROTECTION.md`](docs/BRANCH_PROTECTION.md) | Runbook infra: secrets, Vercel, branch protection |

## CI/CD

GitHub Actions ejecuta lint, tests y build en cada PR y push a `main`. Vercel despliega automáticamente tras merge. Configuración operativa: [`docs/BRANCH_PROTECTION.md`](docs/BRANCH_PROTECTION.md).

---

👤 **Author:** Bernardo Recamales — Frontend Developer & Trail Runner 🏔️

---

<a id="english"></a>
## 🌍 English Version

# 🚛 Desatascos Manuel - Corporate Website

> **Professional web solution for 24/7 emergency services and maintenance in Sierra de Cádiz, Spain.**

![Project Status](https://img.shields.io/badge/Status-In_Production-success?style=for-the-badge)
![License](https://img.shields.io/badge/Private-License-red?style=for-the-badge)

## 📋 About the Project

This project is a **Single Page Application (SPA)** developed to digitize a local plumbing and drainage business, focused on fast load times and conversion (emergency calls).

### 🚀 Live Demo

👉 **[Visit Desatoros Website](https://desatorosmanuel.com/)**

---

## 🛠️ Tech Stack

React 19, TypeScript, Vite 7, Tailwind CSS 4, EmailJS, Vitest.

---

## ✨ Key Features

* **⚡ Ultra-fast performance** with Vite
* **📱 Mobile-first design**
* **📧 Lead generation** via EmailJS
* **🎨 Modern UI/UX** with real service photos
* **🧪 Automated quality checks** with CI

---

## 📸 Screenshots

![Project Preview](desatascos-bornos/webjosemanuel.PNG)

---

## 🔧 Local Installation

```bash
git clone https://github.com/Recamalesdev/web-jose-manuel.git
cd web-jose-manuel/desatascos-bornos
cp .env.example .env
npm install
npm run dev
```

👤 **Author:** Bernardo Recamales — Frontend Developer & Trail Runner 🏔️
