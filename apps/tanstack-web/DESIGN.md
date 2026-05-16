# DESIGN.md - Guías de Estilo y Tipografía

## Sistema de Diseño

### Colores

**Paleta Principal:**

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-dark-50` | `#171314` | Fondo principal |
| `--color-dark-100` | `#110d0e` | Fondo secundarios |
| `--color-dark-200` | `#1a1617` | Fondo de tarjetas/inputs |

**Acento Primario (Radical Red):**

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-radical-red-500` | `#ff2462` | Acento principal |
| `--color-radical-red-600` | `#ff0055` | Scrollbar, hover |
| `--color-radical-red-700` | `#d7004d` | Botones gradient start |
| `--color-radical-red-800` | `#b40046` | Botones hover |

**Acento Secundario (Selective Yellow):**

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-selective-yellow-500` | `#ffb800` | Acentos secundarios |
| `--color-selective-yellow-400` | `#ffd51b` | Highlights |

**Acento Terciario (Blue Marguerite):**

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-blue-marguerite-500` | `#9279d9` | Links, acentos |
| `--color-blue-marguerite-600` | `#8563cd` | Hover states |

### Tipografía

**Font Family:**
- Headings/Body: `Syne Variable` (--font-sans)
- Code: `JetBrains Mono Variable` (--font-mono)

**Tamaños:**
| Elemento | Tamaño | Line-height |
|----------|--------|-------------|
| h1 | clamp(2.5rem, 5vw, 3.5rem) | 1.3 |
| h2 | clamp(1.5rem, 3vw, 2.25rem) | 1.2 |
| body | clamp(1rem, 1.2vw, 1.25rem) | 1.6 |
| code | 0.875rem (14px) | 1.6 |

### Heading Rules

- Usar encabezados jerárquicos (h1 → h2 → h3)
- Solo un h1 por página
- Títulos descriptivos y concisos
- Evitar títulos genéricos como "Introduction" como h1

### Párrafos

- Máximo 80 caracteres por línea
- Espaciado entre párrafos: `1.5em`
- Primera oración introduce el tema
- Evitar oraciones pasivas cuando sea posible

### Espaciado (Spacing)

| Token | Valor |
|-------|-------|
| xs | 0.25rem (4px) |
| sm | 0.5rem (8px) |
| md | 1rem (16px) |
| lg | 1.5rem (24px) |
| xl | 2rem (32px) |
| 2xl | 3rem (48px) |
| 3xl | 4rem (64px) |

### Componentes UI

- Border radius: `rounded-xl` (12px) para tarjetas, `rounded-lg` (8px) para botones/inputs
- Sombras hover: `hover:shadow-lg hover:-translate-y-2`
- Transiciones: `duration-300` (300ms)
- Bordes: `border-white/5` o `border-white/10`

### Efectos Especiales

**Card Shadow:**
```css
box-shadow:
  -20px 0px 40px -10px rgba(255, 0, 85, 0.3),
  20px 0px 40px -10px rgba(255, 136, 0, 0.3);
```

**Gradients:**
- Botones: `from-radical-red-700 to-radical-red-500`

### Scrollbar

- Color thumb: `var(--color-radical-red-600)`
- Color track: `var(--color-dark-50)`
- Ancho: 6px

### Accesibilidad

- Contraste mínimo 4.5:1 para texto
- Focus states visibles
- Labels siempre visibles para inputs