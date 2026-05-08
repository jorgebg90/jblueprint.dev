---
layout: post
title: "Cómo crear un blog con Spec Driven Design"
date: 2026-05-08 12:00:00 +0200
categories: jekyll speckit design
lang: es
translation_key: how-to-spec-driven-design
translated_url: /jekyll/speckit/2026/05/08/how-to-build-a-blog-with-spec-driven-design.html
permalink: /es/jekyll/speckit/2026/05/08/como-crear-un-blog-con-spec-driven-design.html
---

Crear un blog desde cero es una cosa. Crearlo *bien* con una metodología clara y trazable es otra.

En este post, te guiaré a través del viaje real de implementación de **jblueprint.dev** usando un flujo de trabajo de **Spec Driven Design** con [Speckit](https://github.com/speckit/speckit)—un framework que te ayuda a moverte desde ideas de features hasta código funcional y validado de forma estructurada.

## ¿Por qué Spec Driven Design?

Antes de tocar una sola línea de código, dedicamos tiempo a:
1. **Definir qué queríamos construir** (especificación).
2. **Aclarar ambigüedades** con decisiones de producto (clarificación).
3. **Planificar el enfoque técnico** (planificación de implementación).
4. **Dividir el trabajo en tareas ordenadas** (generación de tareas).
5. **Ejecutar con validación** (implementación).

Este enfoque reduce el retrabajo, asegura claridad y crea un **registro vivo de decisiones** que puedes explicar más tarde. Perfecto para un blog donde quieres documentar tu razonamiento.

## Contexto del Proyecto

- **Proyecto**: `jblueprint.dev`
- **Stack**: Jekyll
- **Objetivo**: Agregar soporte multilingüe (español e inglés)
- **Plugin i18n**: [jekyll-polyglot](https://polyglot.untra.io/es/)

### Reglas Fundamentales

1. **Implementación solo en inglés**: Todo el código y comentarios están en inglés para mantenibilidad.
2. **Cumplimiento Jekyll-first**: Sigue las convenciones oficiales de Jekyll y documentación.
3. **Validación de build**: Cada cambio que afecte el sitio requiere verificación local con `bundle exec jekyll build`.

## El Flujo de Trabajo en 5 Pasos

### Paso 0: Fundación

Detectamos que el repositorio ya tenía estructura Speckit (directorio `.specify/`) y creamos una **constitución de proyecto** que formalizó nuestros principios:
- Implementación solo en inglés
- Cumplimiento Jekyll-first en decisiones técnicas
- Validación de build para cambios que afecten la salida del sitio

Esta constitución guiaría cada decisión adelante.

### Paso 1: Especificación y Clarificación

Usando `speckit.specify`, creamos la primera especificación de feature: **"Add Multilingual Support (Spanish and English)"**.

La especificación definió:
- **Historias de usuario**: Leer en idioma preferido, cambiar idioma sin perder contexto, mantener contenido bilingüe confiablemente.
- **Requisitos funcionales**: Estrategia de URLs, cambio de idioma, comportamiento de fallback, SEO.
- **Criterios de éxito**: 100% de páginas principales accesibles en ambos idiomas, 95% cambios de idioma exitosos, cero enlaces rotos.

Luego, usando `speckit.clarify`, resolvimos las **5 decisiones de producto más críticas**:

1. **Estrategia de URLs**: Idioma por defecto sin prefijo (`/...`); español con prefijo (`/es/...`).
2. **Prefijos de locale no soportados**: Redirigir con HTTP `301` al equivalente de idioma por defecto.
3. **Traducciones faltantes**: Redirigir con HTTP `302` + mostrar mensaje de retroalimentación.
4. **Persistencia de preferencia de idioma**: Solo en sesión (se reinicia en nueva sesión del navegador).
5. **Discoverabilidad SEO**: Requerir etiquetas `hreflang` recíprocas y `x-default` en páginas bilingües.

**Resultado**: Una especificación completamente aclarada, lista para planificación técnica.

### Paso 2: Planificación de Implementación

Usando `speckit.plan`, generamos artefactos de diseño:
- `plan.md` — Estrategia general y fases
- `research.md` — Análisis técnico profundo y detalles del plugin Polyglot
- `data-model.md` — Estructuras de datos de localización
- `contracts/multilingual-routing-contract.md` — Reglas detalladas de URL y redirección
- `quickstart.md` — Checklist de validación para desarrolladores

Todos los artefactos reforzaron comentarios en inglés y pensamiento Jekyll-first.

**Resultado**: Un blueprint técnico completo, testeable e implementable.

### Paso 3: Generación de Tareas

Usando `speckit.tasks`, convertimos el plan en un **backlog ordenado de 33 tareas accionables**:

- **Fase 1 (Setup)**: Instalar `jekyll-polyglot`, configurar `Gemfile`, crear registro de locales.
- **Fase 2 (Fundacional)**: Configurar `_config.yml`, crear layouts e includes multilingües, conectar cambio de idioma y SEO.
- **Fase 3 (Historia de Usuario 1)**: Crear contenido bilingüe (`index`, `about`, posts) y validar rutas.
- **Fase 4 (Historia de Usuario 2)**: Implementar selector de idioma con fallback y retroalimentación.
- **Fase 5 (Historia de Usuario 3)**: Documentar flujo de autoría bilingüe.
- **Fase 6 (Polish)**: Validación final, procedimientos de rollback, verificaciones SEO.

Cada tarea tenía:
- Rutas de archivos claras (Jekyll-first)
- Dependencias marcadas
- Pistas de paralelización
- Criterios de prueba independientes

**Resultado**: Un plan de implementación ordenado y paralelizable.

### Paso 4: Implementación

Usando `speckit.implement`, ejecutamos las 33 tareas:

**Cambios clave**:
- Agregamos `jekyll-polyglot` a `Gemfile` y ejecutamos `bundle install`
- Configuramos enrutamiento de locale multilingüe en `_config.yml`
- Creamos includes compartidos para selector de idioma, etiquetas SEO y retroalimentación de traducción
- Escribimos script de preferencia basado en sesión en `assets/js/language-session.js`
- Creamos contenido bilingüe: `index.markdown`, `about.markdown` y bienvenida en inglés y español
- Documentamos reglas de redirección, flujo de contenido y procedimientos de rollback

**Validación**:
- `bundle exec jekyll build` ejecutado exitosamente
- Sitio generado incluye rutas bilingües: `/index.html`, `/es/index.html`, etc.
- Etiquetas `hreflang` validadas en páginas bilingües
- Sin enlaces internos rotos

**Resultado**: Un blog Jekyll multilingüe completamente funcional y validado.

### Paso 5: Rollout

Confirmamos todos los cambios con un commit limpio de rama de feature, listo para mergear.

## Decisiones Clave Tomadas

| Fecha | Decisión | Estado | Justificación |
|-------|----------|--------|---------------|
| 2026-05-08 | Usar framework Speckit | Aceptada | Specification-first reduce retrabajo |
| 2026-05-08 | Plugin Polyglot | Aceptada | Plugin nativo Jekyll, bien mantenido |
| 2026-05-08 | Idioma por defecto sin prefijo | Aceptada | URLs más limpias para idioma principal |
| 2026-05-08 | 301 para locales no soportadas | Aceptada | Preserva SEO, evita 404s |
| 2026-05-08 | 302 para traducciones faltantes | Aceptada | Redirección temporal permite traducción futura |
| 2026-05-08 | Preferencias solo en sesión | Aceptada | Respeta privacidad del usuario, más simple que cookies |
| 2026-05-08 | hreflang + x-default | Aceptada | SEO apropiado y discoverabilidad para contenido bilingüe |
| 2026-05-08 | Google Analytics | Diferida | Planificada para feature futura |

## Lo Que No Hicimos (Non-Goals)

- Agregar más de dos idiomas en este release
- Rediseñar el tema sin relación con soporte de idioma
- Reescribir todo el contenido histórico inmediatamente
- Usar sistemas de build o servicios de runtime fuera de Jekyll

Mantener el scope ajustado nos permitió entregar rápidamente y validar completamente.

## Artefactos Clave

Todo nuestro trabajo está documentado y trazable:
- **Especificación**: `specs/001-add-multilingual-support/spec.md`
- **Plan**: `specs/001-add-multilingual-support/plan.md`
- **Tareas**: `specs/001-add-multilingual-support/tasks.md`
- **Contratos**: `specs/001-add-multilingual-support/contracts/multilingual-routing-contract.md`
- **Guías Operacionales**: `docs/multilingual-*.md` (flujo, redirecciones, rollback)

## Lecciones Aprendidas

1. **Clarificar primero ahorra tiempo de implementación**: Al hacer cinco preguntas de alto impacto *antes* de codificar, evitamos retrabajo y decisiones conflictivas.

2. **El orden de dependencias importa**: Dividir trabajo en fases ordenadas (Setup → Fundacional → Historias de Usuario) hizo la paralelización segura y redujo bloqueadores.

3. **Los documentos de especificación son artefactos vivos**: Sirven doble propósito: guía de diseño *y* contenido de blog futuro.

4. **Las convenciones de Jekyll son tu aliada**: Mantenerse fiel a la estructura de Jekyll hizo la implementación directa y mantenible.

5. **La validación de build es no-negociable**: Ejecutar `bundle exec jekyll build` después de cada cambio mayor detectó issues temprano.

## Próximos Pasos

- **Monitorear en producción**: Observar problemas de enrutamiento o SEO.
- **Recopilar retroalimentación de usuarios**: Ver si la UX del selector de idioma funciona bien.
- **Planificar mejoras futuras**: Integración de Google Analytics, idiomas adicionales, herramientas de gestión de traducciones.

## Intenta Tú Mismo

Si estás construyendo un blog Jekyll y considerando soporte multilingüe, sigue este mismo flujo de trabajo:

1. Escribe una especificación clara (¿qué problemas estás resolviendo?).
2. Aclara decisiones clave con stakeholders.
3. Planifica el enfoque técnico (layouts, datos, configs).
4. Divide en tareas ordenadas con criterios de prueba.
5. Implementa y valida metódicamente.

¿El resultado? Una feature bien razonada, trazable y mantenible—más una narrativa que puedes compartir con tu audiencia.

---

**Este post es parte de una serie sobre construir y mantener jblueprint.dev usando prácticas modernas de especificación y diseño.**


