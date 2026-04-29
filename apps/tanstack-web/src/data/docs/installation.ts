import type { DocPageData } from "@/types/docs";

export const installationData: DocPageData = {
  title: "Instalación",
  description:
    "Instala Blaze Motion y comienza a añadir animaciones en segundos.",
  content: [
    {
      id: "install",
      type: "h2",
      text: "Instalación",
    },
    {
      id: "install-command",
      type: "command",
      commands: [
        { label: "npm", code: "npm install @blaze-motion/motion" },
        { label: "pnpm", code: "pnpm add @blaze-motion/motion" },
        { label: "yarn", code: "yarn add @blaze-motion/motion" },
        { label: "bun", code: "bun add @blaze-motion/motion" },
      ],
      defaultIndex: 0,
    },
    {
      id: "peer-deps",
      type: "h2",
      text: "Dependencias",
    },
    {
      id: "peer-deps-desc",
      type: "p",
      text: "React 18+ y Motion 12+.",
    },
    {
      id: "peer-install",
      type: "command",
      commands: [
        { label: "npm", code: "npm install react motion" },
        { label: "pnpm", code: "pnpm add react motion" },
        { label: "yarn", code: "yarn add react motion" },
        { label: "bun", code: "bun add react motion" },
      ],
      defaultIndex: 0,
    },
    {
      id: "fade",
      type: "h2",
      text: "Fade",
    },
    {
      id: "fade-desc",
      type: "p",
      text: "Preset base. Soporta: direction, distance, duration, delay, scale, blur.",
    },
    {
      id: "fade-ejemplo",
      type: "code-split",
      importCode: `import { motion } from "motion/react";
import { fade } from "@blaze-motion/motion";`,
      animationCode: `<motion.div
  variants={fade({ direction: "up", distance: 50 })}
  initial="initial"
  animate="animate"
>
  Contenido
</motion.div>`,
      language: "tsx",
    },
    {
      id: "parent",
      type: "h2",
      text: "Parent Variants",
    },
    {
      id: "parent-desc",
      type: "p",
      text: "Controla el stagger de hijos. Props: delayChildren, startDelay.",
    },

    {
      id: "parent-ejemplo",
      type: "code-split",
      importCode: `import { motion } from "motion/react";
import { parentVariants, fade } from "@blaze-motion/motion";`,
      animationCode: `<motion.div variants={parentVariants({ delayChildren: 0.2 })}>
  {items.map(i => (
    <motion.div key={i} variants={fade({ direction: "up" })} />
  ))}
</motion.div>`,
      language: "tsx",
    },
    {
      id: "textanimate",
      type: "h2",
      text: "TextAnimate",
    },
    {
      id: "textanimate-desc",
      type: "p",
      text: "Animaciones de texto. Props: animation (typewriter, wave, slide, scale, fade), delay.",
    },
    {
      id: "textanimate-import",
      type: "code-split",
      importCode: `import { TextAnimate } from "@blaze-motion/motion";`,
      animationCode: `<TextAnimate type="typewriter" by="letter">
  Hola mundo
</TextAnimate>`,
      language: "tsx",
    },
    {
      id: "marquee",
      type: "h2",
      text: "Marquee",
    },
    {
      id: "marquee-desc",
      type: "p",
      text: "Carrusel infinito. Props: items, direction (left/right), speed, gap.",
    },
    {
      id: "marquee-import",
      type: "code-split",
      importCode: `import { Marquee } from "@blaze-motion/motion";`,
      animationCode: `<Marquee items={["A", "B", "C"]} speed={50} />`,
      language: "tsx",
    },
    {
      id: "learn-more",
      type: "callout",
      intent: "info",
      text: "Ve la documentación de Presets para ver todas las propiedades de cada preset.",
    },
  ],
  nextPage: {
    label: `Presets: Fade`,
    href: "/docs/presets/fade",
  },
  prevPage: {
    label: "Introducción",
    href: "/docs/introduction",
  },
};
