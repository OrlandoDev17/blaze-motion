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
    id: "docs",
    label: "Docs",
    href: "/",
  },
  {
    id: "components",
    label: "Componentes",
    href: "/components",
  },
  {
    id: "presets",
    label: "Presets",
    href: "/presets",
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
