import React, { useId, useMemo, memo } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  gap?: string;
  className?: string;
  direction?: "left" | "right";
}

export const Marquee = memo(({
  children,
  speed = 20,
  pauseOnHover = true,
  gap = "2rem",
  className = "",
  direction = "left",
}: MarqueeProps) => {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, "");

  const { listClass, parentClass, cssContent } = useMemo(() => {
    const animName = `scroll-${id}`;
    const fromX = direction === "left" ? "0" : `calc(-100% - ${gap})`;
    const toX = direction === "left" ? `calc(-100% - ${gap})` : "0";
    const lClass = `marquee-list-${id}`;
    const pClass = `marquee-parent-${id}`;

    return {
      listClass: lClass,
      parentClass: pClass,
      cssContent: `
        @keyframes ${animName} {
          from { transform: translateX(${fromX}); }
          to { transform: translateX(${toX}); }
        }

        .${lClass} {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-shrink: 0;
          min-width: 100%;
          padding: 1rem 0;
          gap: ${gap};
          animation: ${animName} ${speed}s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }

        .${pClass} {
          display: flex;
          gap: ${gap};
        }

        ${pauseOnHover ? `.${pClass}:hover .${lClass} { animation-play-state: paused; }` : ""}
      `,
    };
  }, [id, direction, gap, speed, pauseOnHover]);

  const maskStyle = useMemo(
    () => ({
      maskImage:
        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      WebkitMaskImage:
        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
    }),
    [],
  );

  return (
    <>
      <style>{cssContent}</style>
      <section
        aria-roledescription="marquee"
        className={`${parentClass} relative flex overflow-hidden w-full ${className}`}
        style={maskStyle}
      >
        <div className={listClass}>{children}</div>
        <div className={listClass} aria-hidden="true">
          {children}
        </div>
      </section>
    </>
  );
});

Marquee.displayName = "Marquee";
