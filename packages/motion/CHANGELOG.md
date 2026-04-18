# Changelog

Todos los cambios notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adherisce a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-04-18

### Añadido

- **`fade()`** - Nuevas propiedades
  - `scale` - Escala inicial del elemento (default: 1)
  - `blur` - Desenfoque inicial en píxeles (default: 0)
  - Opción "none" en dirección para fade sin movimiento

### Cambios

- Simplificación del PropertyInspector usando constantes dinámicas

## [1.0.0] - 2026-04-11

### Añadido

- **`fade()`** - Preset de animación principal
  - Animación de fade direccional (up, down, left, right, none)
  - Soporte para duración y easing personalizado
  - Soporte para física spring (stiffness, damping)
  - Opción `excludeDelay` para compatibilidad con stagger
  - Opción `disableTransition` para animaciones controladas
  - Distancia configurable (offset en píxeles)
