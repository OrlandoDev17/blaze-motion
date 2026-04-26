import { Sparkle } from "lucide-react";
import type { ComponentType } from "react";

export interface NavLink {
  id: string;
  label: string;
  href: string;
  icon?: ComponentType;
  subLinks?: NavLink[];
}

export const NAV_LINKS: NavLink[] = [
  {
    id: "home",
    label: "Inicio",
    href: "/",
  },
  {
    id: "docs",
    label: "Docs",
    href: "/docs",
  },
  {
    id: "components",
    label: "Componentes",
    href: "/docs/components",
  },
  {
    id: "presets",
    label: "Presets",
    href: "/docs/presets",
  },
  {
    id: "playground",
    label: "Playground",
    href: "/playground",
  },
];

export const SIDEBAR_LINKS: NavLink[] = [
  {
    id: "getting-started",
    label: "Primeros Pasos",
    href: "#getting-started",
    icon: Sparkle,
    subLinks: [
      {
        id: "introduction",
        label: "Introducción",
        href: "/docs/introduction",
      },
      {
        id: "installation",
        label: "Instalación",
        href: "/docs/installation",
      },
    ],
  },
];
