# Changelog

Todos los cambios notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adherisce a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2026-04-25

### Añadido

- **`<Marquee />`** - Nuevo componente para carruseles infinitos.
- **`<TextAnimate />`** - Nuevo estilo de animación `"typeWriter"` con cursor parpadeante integrado.

### Corregido

- **`<Marquee />`** - Corregida la animación inversa (`direction="right"`) para lograr un bucle infinito perfecto sin huecos en blanco y restaurado el `overflow-hidden`.
- **`<TextAnimate />`** - Corregido error de tipado estricto en el easing (`"steps(2)"`) del cursor reemplazándolo por tiempos explícitos.
- **`<TextAnimate />`** - Solucionado un problema donde la propiedad `highlight` no funcionaba correctamente al usar el modo `by="letter"`.

## [1.3.0] - 2026-04-25

### Añadido

- **`parentVariants()`** - Nuevas propiedades
  - `startDelay` - Retraso antes de que comience la animación (default: 0.1)
- **`<TextAnimate />`** - Nuevo componente de animación de texto
  - `text` - Texto a animar
  - `direction` - Dirección de la animación (up, down, left, right, none)
  - `duration` - Duración de la animación (default: 0.6)
  - `delay` - Retraso entre cada palabra (default: 0.1)
  - `stagger` - Retraso entre cada letra (default: 0.05)
  - `easing` - Easing de la animación (default: "easeOut")
  - `spring` - Configuración de física spring (default: none)
  - `as` - Elemento HTML a renderizar (default: "p")
  - `className` - Clases CSS adicionales

## [1.2.0] - 2026-04-24

### Añadido

- **`parentVariants()`** - Preset para padres con stagger
  - `delayChildren` - Retraso entre cada hijo (default: 0.1)

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
