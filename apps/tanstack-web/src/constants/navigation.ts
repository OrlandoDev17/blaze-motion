export interface NavLink {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  subLinks?: NavLink[];
}

const NAV_LINKS: NavLink[] = [
  {
    id: "home",
    label: "Inicio",
    href: "/",
  },
  {
    id: "docs",
    label: "Docs",
    href: "/docs/introduction",
  },
  {
    id: "presets",
    label: "Presets",
    href: "/docs/presets/fade",
  },
  {
    id: "components",
    label: "Componentes",
    href: "/docs/components/text-animate",
  },
  {
    id: "playground",
    label: "Playground",
    href: "/playground",
  },
];

const SIDEBAR_LINKS: NavLink[] = [
  {
    id: "getting-started",
    label: "Primeros Pasos",
    icon: "lucide:sparkle",
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
  {
    id: "presets",
    label: "Presets",
    icon: "lucide:layout-dashboard",
    subLinks: [
      {
        id: "fade",
        label: "Fade",
        href: "/docs/presets/fade",
      },
      {
        id: "parent-variants",
        label: "Parent Variants",
        href: "/docs/presets/parent-variants",
      },
    ],
  },
  {
    id: "components",
    label: "Componentes",
    icon: "lucide:layout-grid",
    subLinks: [
      {
        id: "text-animate",
        label: "Text Animate",
        href: "/docs/components/text-animate",
      },
      {
        id: "marquee",
        label: "Marquee",
        href: "/docs/components/marquee",
      },
    ],
  },
];

export { NAV_LINKS, SIDEBAR_LINKS };
