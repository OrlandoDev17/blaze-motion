export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  {
    id: "playground",
    label: "Playground",
    href: "/playground",
  },
  {
    id: "animations",
    label: "Animaciones",
    href: "/animations",
  },
  {
    id: "docs",
    label: "Documentación",
    href: "/docs",
  },
];
