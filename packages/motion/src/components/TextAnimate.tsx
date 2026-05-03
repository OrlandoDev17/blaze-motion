import { fade } from "@/presets/fade";
import { parentVariants } from "@/presets/parentVariants";
import { motion, type HTMLMotionProps } from "motion/react";
import { useMemo, type JSX } from "react";

const componentCache = new Map<string, ReturnType<typeof motion.create>>();

const getMotionComponent = (component: keyof JSX.IntrinsicElements) => {
  const key = String(component);
  if (!componentCache.has(key)) {
    const MotionComp = motion.create(component as any);
    componentCache.set(key, MotionComp as any);
  }
  return componentCache.get(key)!;
};

const SPAN_STYLE = {
  display: "inline-block",
  whiteSpace: "pre-wrap",
} as const;

const WORD_STYLE = { ...SPAN_STYLE, marginRight: "0.25em" } as const;
const LETTER_STYLE = { ...SPAN_STYLE, marginRight: "0" } as const;

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
  text,
  as: Component = "p",
  by = "word",
  type = "slideUp",
  startDelay = 0,
  duration = 0.4,
  className,
  highlight = [],
  highlightClassName = "",
  ...props
}: TextAnimateProps): JSX.Element => {
  const MotionComponent = useMemo(
    () => getMotionComponent(Component),
    [Component],
  );

  const items = useMemo(
    () => (by === "word" ? text.split(" ") : text.split("")),
    [by, text],
  );

  const variantProps = useMemo(() => {
    switch (type) {
      case "blurIn":
        return { direction: "none" as const, distance: 0, blur: 8 };
      case "slideUp":
        return { direction: "up" as const, distance: 20, blur: 4 };
      case "slideDown":
        return { direction: "down" as const, distance: 20, blur: 4 };
      case "typeWriter":
        return { direction: "none" as const, distance: 0, blur: 0 };
      default:
        return { direction: "up" as const, distance: 10, blur: 4 };
    }
  }, [type]);

  const parentVariant = useMemo(
    () =>
      parentVariants({
        delayChildren:
          type === "typeWriter" && by === "letter" ? 0.05 : 0.08,
        startDelay,
      }),
    [type, by, startDelay],
  );

  const childVariant = useMemo(
    () =>
      fade({
        ...variantProps,
        excludeDelay: true,
        duration: type === "typeWriter" ? 0.05 : duration,
      }),
    [variantProps, type, duration],
  );

  const highlightRanges = useMemo<[number, number][]>(() => {
    if (by !== "letter" || highlight.length === 0) return [];
    const lowerText = text.toLowerCase();
    const ranges: [number, number][] = [];
    for (const h of highlight) {
      if (!h) continue;
      const lowerH = h.toLowerCase();
      let startIndex = 0;
      while (startIndex < lowerText.length) {
        const index = lowerText.indexOf(lowerH, startIndex);
        if (index === -1) break;
        ranges.push([index, index + lowerH.length]);
        startIndex = index + lowerH.length;
      }
    }
    return ranges;
  }, [by, highlight, text]);

  const isWord = by === "word";
  const itemStyle = isWord ? WORD_STYLE : LETTER_STYLE;

  const MotionWrapper = MotionComponent as any;

  return (
    <MotionWrapper
      variants={parentVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={className}
      {...props}
    >
      {items.map((item, i) => {
        const isHighlighted = isWord
          ? highlight.some((h) =>
              item.toLowerCase().includes(h.toLowerCase()),
            )
          : highlightRanges.some(([start, end]) => i >= start && i < end);

        return (
          <motion.span
            key={`${item}-${i}`}
            variants={childVariant}
            className={isHighlighted ? highlightClassName : ""}
            style={itemStyle}
          >
            {item === "" ? "\u00A0" : item}
          </motion.span>
        );
      })}
    </MotionWrapper>
  );
};
