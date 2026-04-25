import React, { useId, memo } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  gap?: string;
  className?: string;
  direction?: "left" | "right";
}

export const Marquee = ({
  children,
  speed = 20,
  pauseOnHover = true,
  gap = "2rem",
  className = "",
  direction = "left",
}: MarqueeProps) => {
  const rawId = useId();
  const id = rawId.replace(/(:)/g, "");
  const animationName = `scroll-${id}`;

  return (
    <>
      <style>
        {`
          @keyframes ${animationName} {
            from { 
              transform: translateX(${direction === "left" ? "0" : `calc(-100% - ${gap})`}); 
            }
            to { 
              transform: translateX(${direction === "left" ? `calc(-100% - ${gap})` : "0"}); 
            }
          }

          .marquee-list-${id} {
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-shrink: 0;
            min-width: 100%;
            padding: 1rem 0;
            gap: ${gap};
            animation: ${animationName} ${speed}s linear infinite;
            /* Optimización de rendimiento */
            will-change: transform;
            backface-visibility: hidden;
          }

          .marquee-parent-${id} {
            display: flex;
            gap: ${gap};
          }

          ${pauseOnHover ? `.marquee-parent-${id}:hover .marquee-list-${id} { animation-play-state: paused; }` : ""}
        `}
      </style>

      <section
        aria-roledescription="marquee"
        className={`marquee-parent-${id} relative flex overflow-hidden w-full ${className}`}
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* Renderizamos dos listas iguales para el bucle infinito */}
        <div className={`marquee-list-${id}`}>{children}</div>
        <div className={`marquee-list-${id}`} aria-hidden="true">
          {children}
        </div>
      </section>
    </>
  );
};

Marquee.displayName = "Marquee";
