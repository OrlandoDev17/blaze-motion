import { fade } from "@/presets/fade";
import { parentVariants } from "@/presets/parentVariants";
import { motion, type HTMLMotionProps } from "motion/react";
import type { JSX } from "react";

// Definimos los tipos de animación que quieres soportar
type AnimationType =
  | "blurIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "typeWriter";

interface TextAnimateProps extends HTMLMotionProps<any> {
  // Obligatorias
  text: string;
  // Semanticas
  as?: keyof JSX.IntrinsicElements;
  // Composicion
  by?: "word" | "letter";
  type?: AnimationType;
  // Props para las animaciones
  duration?: number;
  startDelay?: number;
  // Props para el diseño
  highlight?: string[];
  highlightClassName?: string;
  className?: string;
}

export const TextAnimate = ({
  // Obligatorias
  text,
  // Semanticas
  as: Component = "p",
  // Composicion
  by = "word",
  type = "slideUp",
  // Props para la animacion
  startDelay = 0,
  duration = 0.4,
  // Props para el diseño
  className,
  highlight = [],
  highlightClassName = "",
  ...props
}: TextAnimateProps): JSX.Element => {
  // 1. Decidimos la partición
  const items = by === "word" ? text.split(" ") : text.split("");

  // 2. Mapeamos tu tipo de animación a las props de tu preset 'fade'
  const getVariantProps = () => {
    switch (type) {
      case "blurIn":
        return { direction: "none" as any, distance: 0, blur: 8 };
      case "slideUp":
        return { direction: "up", distance: 20, blur: 4 };
      case "slideDown":
        return { direction: "down", distance: 20, blur: 4 };
      case "typeWriter":
        return { direction: "none" as any, distance: 0, blur: 0 };
      default:
        return { direction: "up", distance: 10, blur: 4 };
    }
  };

  const MotionComponent = motion.create(Component as any);

  const highlightRanges: [number, number][] = [];
  if (by === "letter" && highlight.length > 0) {
    const lowerText = text.toLowerCase();
    highlight.forEach((h) => {
      if (!h) return;
      const lowerH = h.toLowerCase();
      let startIndex = 0;
      while (startIndex < lowerText.length) {
        const index = lowerText.indexOf(lowerH, startIndex);
        if (index === -1) break;
        highlightRanges.push([index, index + lowerH.length]);
        startIndex = index + lowerH.length;
      }
    });
  }

  return (
    <MotionComponent
      variants={parentVariants({
        delayChildren: type === "typeWriter" && by === "letter" ? 0.05 : 0.08,
        startDelay: startDelay,
      })}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={className}
      {...props}
    >
      {items.map((item, i) => {
        let isHighlighted = false;
        if (by === "word") {
          isHighlighted = highlight.some((h) =>
            item.toLowerCase().includes(h.toLowerCase()),
          );
        } else {
          isHighlighted = highlightRanges.some(
            ([start, end]) => i >= start && i < end,
          );
        }

        return (
          <motion.span
            key={`${item}-${i}`}
            variants={fade({
              ...getVariantProps(),
              excludeDelay: true,
              duration: type === "typeWriter" ? 0.05 : duration,
            })}
            className={isHighlighted ? highlightClassName : ""}
            style={{
              display: "inline-block",
              whiteSpace: "pre-wrap",
              marginRight: by === "word" ? "0.25em" : "0",
            }}
          >
            {item === "" ? "\u00A0" : item}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
};
