import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =============================================================================
// Estado inicial
// =============================================================================

const initialState = {
  /**
   * Duración de la animación en segundos.
   * No se usa cuando easing = "custom" (spring).
   */
  duration: 0.6,

  /**
   * Distancia de desplazamiento inicial (en pixels).
   * Define cuánto se mueve el elemento antes de volver a su posición original.
   */
  distance: 40,

  /**
   * Delay fijo antes de iniciar la animación.
   * NOTA: Este valor se ignora cuando stagger está habilitado,
   * ya que el delay se calcula automáticamente via staggerChildren.
   */
  delay: 0,

  /**
   * Tipo de animación de fade.
   * Opciones: "fade", "fade-up", "fade-down", "fade-left", "fade-right"
   */
  type: "fade-up",

  /**
   * Función de easing para la transición.
   * Opciones: "linear", "easeIn", "easeOut", "easeInOut", "backIn", "backOut", "backInOut", "custom"
   */
  easing: "easeOut",

  /**
   * Rigidez del resorte (solo cuando easing = "custom").
   * Valores más altos = animación más rápida y "snappy".
   */
  stiffness: 100,

  /**
   * Amortiguación del resorte (solo cuando easing = "custom").
   * Valores más altos = menos rebote/overshoot.
   */
  damping: 14,

  /**
   * Configuración de stagger (animación escalonada de múltiples elementos).
   * - enabled: activa/desactiva el stagger
   * - count: número de elementos hijos a animar
   * - value: delay en segundos entre cada elemento
   */
  staggerDelay: {
    enabled: false,
    count: 3,
    value: 0.15,
  },
};

// =============================================================================
// Slice
// =============================================================================

const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    /**
     * Establece la duración de la animación.
     */
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },

    /**
     * Establece la distancia de desplazamiento.
     */
    setDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },

    /**
     * Establece el delay antes de iniciar.
     * Ignorado cuando stagger está habilitado.
     */
    setDelay: (state, action: PayloadAction<number>) => {
      state.delay = action.payload;
    },

    /**
     * Establece el tipo de animación de fade.
     */
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },

    /**
     * Establece el easing.
     * Si es "custom", activa los controles de spring (stiffness/damping).
     */
    setEasing: (state, action: PayloadAction<string>) => {
      state.easing = action.payload;
    },

    /**
     * Establece la rigidez del resorte (spring).
     */
    setStiffness: (state, action: PayloadAction<number>) => {
      state.stiffness = action.payload;
    },

    /**
     * Establece la amortiguación del resorte (spring).
     */
    setDamping: (state, action: PayloadAction<number>) => {
      state.damping = action.payload;
    },

    /**
     * Activa/desactiva el stagger.
     */
    setStaggerEnabled: (state, action: PayloadAction<boolean>) => {
      state.staggerDelay.enabled = action.payload;
    },

    /**
     * Establece el número de elementos a animar con stagger.
     */
    setStaggerCount: (state, action: PayloadAction<number>) => {
      state.staggerDelay.count = action.payload;
    },

    /**
     * Establece el delay entre cada elemento en stagger.
     */
    setStagger: (state, action: PayloadAction<number>) => {
      state.staggerDelay.value = action.payload;
    },
  },
});

// =============================================================================
// Exports
// =============================================================================

export const {
  setDuration,
  setDistance,
  setDelay,
  setType,
  setEasing,
  setStiffness,
  setDamping,
  setStaggerEnabled,
  setStaggerCount,
  setStagger,
} = animationSlice.actions;

export default animationSlice.reducer;
