---
layout: post
title: "Instalación de Minimal Mistakes en un blog Jekyll multilenguaje"
date: 2026-05-08
categories: jekyll theme minimal-mistakes
lang: es
permalink: /es/jekyll/theme/2026/05/08/instalacion-minimal-mistakes.html
---

Este post documenta la instalación del tema **Minimal Mistakes** sobre un blog Jekyll con soporte multilenguaje (`en` y `es`) basado en `jekyll-polyglot`.

## Objetivo

- Integrar Minimal Mistakes como tema principal.
- Mantener compatibilidad con el enrutado actual multilenguaje.
- Conservar el selector de idioma y el comportamiento de fallback existente.

## Estado actual

- La especificación de esta feature está en `specs/002-add-minimal-mistakes-theme/spec.md`.
- La fase de clarificación ya incluye requisitos para:
  - compatibilidad con rutas `default` y `/es/`,
  - documentación de la instalación,
  - organización temporal de `_posts` en carpetas por mes y día.

## Próximos pasos

1. Ejecutar `speckit.plan` para diseñar la migración de tema.
2. Generar tareas con `speckit.tasks`.
3. Implementar la migración validando build y rutas bilingües.

Iremos actualizando este post conforme avance la implementación.
