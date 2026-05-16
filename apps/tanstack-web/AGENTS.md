# AGENTS.md - Reglas para Agentes de IA

## Contexto del Proyecto

**blaze-motion** es una biblioteca de animaciones y motion para React. Incluye componentes como:
- `TextAnimate` - Animación de texto con efectos
- `Marquee` - Marquee horizontal/vertical
- Presets de animaciones (fade, slide, etc.)
- Variantes animadas para transiciones

Estructura:
- `packages/motion` - Paquete npm publicable
- `apps/tanstack-web` - Documentación y playground interactivo

## Gestor de Paquetes

- **SIEMPRE usar bun** en lugar de npm, pnpm o yarn
- Ejecutar scripts con `bun run` en lugar de `npm run`
- Instalar dependencias con `bun install` (no `npm install`)

## Comandos del Proyecto

```bash
# Instalar dependencias
bun install

# Desarrollo
bun run dev

# Build
bun run build:web
bun run build:motion
```

## Convenciones de Código

- TypeScript strict
- Biome para linting y formatting
- Componentes React con TypeScript
- Exports desde index.ts centralizados
- Componentes en `src/components/`
- Presets en `src/presets/`
- Schemas de validación en `schemas/` para tipos de animación

## Tecnologías del Proyecto

- **Framework**: React con TanStack Router
- **Estilos**: Tailwind CSS con @theme custom
- **Animaciones**: motion/react (Motion One)
- **Tipografías**: Syne Variable (sans), JetBrains Mono (mono)
- **Scroll**: Scroll snap con smooth behavior

## Estructura de Componentes

```
src/
├── components/
│   ├── home/
│   │   ├── sections/      # Hero, Features, TechStack
│   │   └── BentoCard.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── docs/
│   │   ├── DocPage.tsx
│   │   ├── PresetPlayground.tsx
│   │   └── preset-playground/
│   └── playground/
│       ├── display/       # PlaygroundElement, CodePreview
│       └── ui-controls/  # Slider, PropertySelector
├── routes/
│   ├── index.tsx          # Home page
│   ├── docs.tsx          # Docs layout
│   ├── playground.tsx    # Playground page
│   └── docs/
│       ├── introduction.tsx
│       └── installation.tsx
├── hooks/
├── constants/
└── styles.css
```