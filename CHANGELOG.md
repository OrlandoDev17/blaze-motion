# Changelog - Mejoras en Animaciones y Playground

## Fecha: 07 Abril 2026

---

## Archivos Modificados

### 1. `apps/web/src/lib/constants.ts`

| Cambio | Descripción |
|--------|-------------|
| Eliminado | `SPRING_EASINGS` - ya no se usa |
| Actualizado | `EASING_OPTIONS` - removido `type`, ahora son solo valores simples |
| Añadido | Campo `example` a cada propiedad del slider con ejemplos prácticos |
| Mejorado | Descripciones más claras con ejemplos |

**Nuevos ejemplos:**
- `duration`: "0.5s = media segundo"
- `delay`: "0.2s = espera 200ms"
- `distance`: "40px = se mueve 40px"
- `stiffness`: "100 = suave, 300 = explosivo"
- `damping`: "5 = mucho rebote, 25 = sin rebote"
- `staggerCount`: "3 = 3 cards"
- `stagger`: "0.1s = 100ms entre cada uno"

---

### 2. `apps/web/src/components/playground/InfoTooltip.tsx`

| Cambio | Descripción |
|--------|-------------|
| Reescrito | Componente completamente nuevo con mejor diseño |
| Cambiado | Icono de `Info` a `HelpCircle` para mejor UX |
| Añadido | Sección de ejemplo con estilo distintivo |
| Mejorado | Delay en hover para evitar parpadeos |
| Mejorado | Border y colores con tema amarillo selectivo |

---

### 3. `apps/web/src/components/playground/Slider.tsx`

| Línea | Cambio |
|-------|--------|
| 16 | Añadido prop `example?: string` |
| 28 | Añadido `example` a la interfaz |
| 32 | Añadido `example` a los props |
| 121 | Pasa `example` al `InfoTooltip` |

---

### 4. `apps/web/src/components/playground/PropertyInspector.tsx`

| Cambio | Descripción |
|--------|-------------|
| Reescrito | Componente `EasingSettings` renombrado a `TimingSection` |
| Simplificado | Solo muestra stiffness/damping cuando easing === "custom" |
| Actualizado | Todos los Sliders ahora reciben el prop `example` |
| Eliminado | Import de `SPRING_EASINGS` que ya no se usa |

---

### 5. `apps/web/src/components/playground/PlaygroundElement.tsx`

| Cambio | Descripción |
|--------|-------------|
| Corregido | Stagger ahora funciona correctamente con `staggerChildren` |
| Corregido | `backIn`, `backOut`, `backInOut` ahora son easings normales de transición |
| Solo | `custom` usa spring physics (stiffness/damping) |
| Creado | Componente `CardContent` para reducir duplicación |
| Simplificado | Lógica de variantes con `useMemo` |

---

## Problemas Corregidos

### 1. Stagger no funcionaba
**Antes:** Todos los elementos se animaban simultáneamente
**Después:** Usando `staggerContainerVariants` con `staggerChildren` en el contenedor padre

```tsx
// Contenedor padre
variants={{
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: stagger.value } }
}}

// Hijos
variants={cardVariants}
initial="initial"
animate="animate"
```

### 2. backOut no tenía overshoot
**Antes:** `backOut` se trataba como spring physics
**Después:** `backOut` es un easing de transición nativo de motion/react que tiene el efecto de "pasarse y volver"

### 3. Tooltips mejorados
- Añadido campo `example` con ejemplos prácticos
- Mejor diseño visual con borde amarillo
- Mejorada la experiencia de hover

---

## Sistema de Easing Actual

| Easing | Tipo | Propiedades |
|--------|------|-------------|
| Linear, EaseIn, EaseOut, EaseInOut | Transición | Duration, Delay, Distance |
| Back In, Back Out, Back In Out | Transición (con overshoot) | Duration, Delay, Distance |
| Custom Spring | Spring Physics | Stiffness, Damping, Distance |

---

## Notas de Implementación

1. **backIn/backOut/backInOut** son easings de `motion/react` que simulan overshoot sin necesidad de spring physics
2. **Custom Spring** es el único que usa stiffness/damping reales
3. **Stagger** funciona con `staggerChildren` en el contenedor y variantes en los hijos
4. **Tooltips** incluyen ejemplos prácticos definidos en constants.ts para seguir DRY
