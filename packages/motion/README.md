# @blaze-motion/motion

[![npm version](https://img.shields.io/npm/v/@blaze-motion/motion.svg)](https://www.npmjs.com/package/@blaze-motion/motion)
[![npm downloads](https://img.shields.io/npm/dm/@blaze-motion/motion.svg)](https://www.npmjs.com/package/@blaze-motion/motion)
[![license](https://img.shields.io/npm/l/@blaze-motion/motion.svg)](https://github.com/blaze-motion/blaze-motion/blob/main/LICENSE)

Presets de animaciones fluidas para [motion/react](https://motion.dev/).

## Instalación

```bash
# npm
npm install @blaze-motion/motion

# pnpm
pnpm add @blaze-motion/motion

# yarn
yarn add @blaze-motion/motion

# bun
bun add @blaze-motion/motion
```

## Requisitos

- React 18+ o 19
- motion/react 12+

## Uso Rápido

```tsx
import { motion } from "motion/react";
import { fade } from "@blaze-motion/motion";

export function MyComponent() {
  return (
    <motion.div
      variants={fade({ direction: "up" })}
      initial="initial"
      animate="animate"
    >
      Hola Mundo
    </motion.div>
  );
}
```

## API

### `fade(opciones?)`

Crea una animación de fade con movimiento direccional opcional.

```tsx
import { fade } from "@blaze-motion/motion";

const variants = fade({
  direction: "up", // "up" | "down" | "left" | "right" | "none" (por defecto: "up")
  distance: 40, // desplazamiento en píxeles para la dirección (por defecto: 40)
  duration: 0.5, // duración de la animación en segundos (por defecto: 0.5)
  delay: 0, // retraso antes de que inicie la animación (por defecto: 0)
  ease: "easeOut", // función de easing (por defecto: bezier personalizado [0.16, 1, 0.3, 1])
  excludeDelay: false, // excluir delay para compatibilidad con stagger (por defecto: false)
  disableTransition: false, // quitar transición para control manual (por defecto: false)
});
```

#### Con Física Spring

```tsx
const variants = fade({
  direction: "up",
  spring: {
    stiffness: 100,
    damping: 20,
  },
});
```

### `parentVariants(opciones?)`

Crea variantes para un contenedor padre que coordina animaciones de elementos hijos en secuencia (stagger).

```tsx
import { parentVariants, fade } from "@blaze-motion/motion";
import { motion } from "motion/react";

return (
  <motion.div
    variants={parentVariants({ delayChildren: 0.3 })}
    initial="initial"
    animate="animate"
  >
    {[1, 2, 3].map((i) => (
      <motion.div key={i} variants={fade({ excludeDelay: true })}>
        Item {i}
      </motion.div>
    ))}
  </motion.div>
);
```

### `<TextAnimate />`

Componente listo para usar que anima texto dinámicamente palabra por palabra o carácter por carácter, con opciones para resaltar texto específico.

```tsx
import { TextAnimate } from "@blaze-motion/motion";

export function Title() {
  return (
    <TextAnimate
      text="Animaciones fluidas"
      as="h1"
      type="slideUp"
      by="word"
      duration={0.4}
      startDelay={0.2}
      highlight={["fluidas"]}
      highlightClassName="text-pink-500 font-bold"
    />
  );
}
```

#### Propiedades de `<TextAnimate />`

| Prop                 | Tipo                                                                  | Por defecto   | Descripción                                                   |
| -------------------- | --------------------------------------------------------------------- | ------------- | ------------------------------------------------------------- |
| `text`               | `string`                                                              | **requerido** | Texto a animar                                                |
| `as`                 | `keyof JSX.IntrinsicElements`                                         | `"p"`         | Elemento HTML contenedor                                      |
| `type`               | `"blurIn" \| "slideUp" \| "slideDown" \| "slideLeft" \| "slideRight"` | `"slideUp"`   | Estilo visual de la animación                                 |
| `by`                 | `"word" \| "letter"`                                                  | `"word"`      | Divide la animación por palabra o por letra                   |
| `duration`           | `number`                                                              | `0.4`         | Duración individual de cada elemento animado                  |
| `startDelay`         | `number`                                                              | `0`           | Retraso antes de que comience el efecto completo              |
| `highlight`          | `string[]`                                                            | `[]`          | Lista de palabras a resaltar visualmente                      |
| `highlightClassName` | `string`                                                              | `""`          | Clases aplicadas a las palabras que coincidan con `highlight` |

## Opciones de `fade()`

| Opción              | Tipo                                            | Por defecto         | Descripción                                   |
| ------------------- | ----------------------------------------------- | ------------------- | --------------------------------------------- |
| `direction`         | `"up" \| "down" \| "left" \| "right" \| "none"` | `"up"`              | Dirección de la animación de fade             |
| `distance`          | `number`                                        | `40`                | Desplazamiento en píxeles para la dirección   |
| `duration`          | `number`                                        | `0.5`               | Duración de la animación en segundos          |
| `delay`             | `number`                                        | `0`                 | Retraso antes de que inicie la animación      |
| `ease`              | `Easing`                                        | `[0.16, 1, 0.3, 1]` | Función de easing                             |
| `spring`            | `SpringOptions`                                 | `undefined`         | Configuración de física spring                |
| `excludeDelay`      | `boolean`                                       | `false`             | Excluir delay para compatibilidad con stagger |
| `disableTransition` | `boolean`                                       | `false`             | Desactivar transición automática              |

## Licencia

MIT © [blaze-motion](https://github.com/OrlandoDev17/blaze-motion)
