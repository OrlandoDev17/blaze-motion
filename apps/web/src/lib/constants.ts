import type { NavLink } from "./types";

export const NAV_LINKS: NavLink[] = [
  {
    id: "playground",
    label: "Playground",
    href: "#playground",
  },
  {
    id: "catalog",
    label: "Animaciones",
    href: "#catalog",
  },
  {
    id: "docs",
    label: "Documentación",
    href: "#docs",
  },
];

export const EASING_OPTIONS = [
  {
    label: "Linear",
    value: "linear",
  },
  {
    label: "Ease In",
    value: "easeIn",
  },
  {
    label: "Ease Out",
    value: "easeOut",
  },
  {
    label: "Ease In Out",
    value: "easeInOut",
  },
  {
    label: "Back In",
    value: "backIn",
  },
  {
    label: "Back Out",
    value: "backOut",
  },
  {
    label: "Back In Out",
    value: "backInOut",
  },
  {
    label: "Custom Spring",
    value: "custom",
  },
];

export const SELECTABLE_PROPERTIES = [
  {
    id: "type",
    label: "Type",
    properties: [
      {
        label: "Fade Up",
        value: "fade-up",
      },
      {
        label: "Fade Down",
        value: "fade-down",
      },
      {
        label: "Fade Left",
        value: "fade-left",
      },
      {
        label: "Fade Right",
        value: "fade-right",
      },
    ],
  },
  {
    id: "easing",
    label: "Easing",
    properties: EASING_OPTIONS,
  },
];

export const SLIDER_PROPERTIES = {
  duration: {
    id: "duration",
    label: "Duration",
    description: "Tiempo total que tarda la animación en completarse.",
    example: "0.5s = media segundo",
    min: 0.1,
    max: 3,
    step: 0.1,
    unit: "s",
  },
  delay: {
    id: "delay",
    label: "Delay",
    description: "Tiempo de espera antes de que inizi la animación.",
    example: "0.2s = espera 200ms",
    min: 0,
    max: 2,
    step: 0.05,
    unit: "s",
  },
  distance: {
    id: "distance",
    label: "Distance",
    description: "Distancia en píxeles que recorre el elemento.",
    example: "40px = se mueve 40px",
    min: 0,
    max: 200,
    step: 5,
    unit: "px",
  },
  stiffness: {
    id: "stiffness",
    label: "Stiffness",
    description: "Rigidez del resorte. Controla la velocidad de rebote.",
    example: "100 = suave, 300 = explosivo",
    min: 1,
    max: 300,
    step: 1,
    unit: "",
  },
  damping: {
    id: "damping",
    label: "Damping",
    description:
      "Amortiguación. Controla cuántos rebotes hace antes de detenerse.",
    example: "5 = mucho rebote, 25 = sin rebote",
    min: 1,
    max: 30,
    step: 1,
    unit: "",
  },
  staggerCount: {
    id: "staggerCount",
    label: "Count",
    description: "Número de elementos que se animarán en secuencia.",
    example: "3 = 3 cards",
    min: 2,
    max: 6,
    step: 1,
    unit: "",
  },
  stagger: {
    id: "stagger",
    label: "Stagger",
    description: "Tiempo entre el inicio de cada elemento.",
    example: "0.1s = 100ms entre cada uno",
    min: 0.05,
    max: 1,
    step: 0.05,
    unit: "s",
  },
};

export const SLIDER_IDS = {
  PRESET: ["duration", "delay", "distance"],
  SPRING: ["stiffness", "damping", "delay", "distance"],
  STAGGER: ["staggerCount", "stagger"],
};
