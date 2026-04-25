import { Code, Weight, Zap, CheckCircle2, LayoutGrid } from "lucide-react";
import { FpsVisualizer } from "@/components/home/FpsVisualizer";
import { CodePreview } from "@/components/playground/display/CodePreview";
import { TextAnimate } from "@blaze-motion/motion";

export interface BentoCardConfig {
  id?: string;
  className?: string;
  content: React.ReactNode;
  animation?: "up" | "down" | "left" | "right" | "none";
}

export const BentoCards: BentoCardConfig[] = [
  {
    id: "60-fps",
    className: "flex flex-col gap-4 hover:shadow-radical-red-400/20",
    animation: "right",
    content: (
      <div className="flex flex-col gap-2.5">
        <Zap className=" text-radical-red-400 bg-radical-red-500/10 p-2 rounded-lg size-10" />
        <h3 className="text-2xl font-mono uppercase">60 FPS</h3>
        <p className="text-sm text-white/60 text-balance">
          Animaciones fluidas y sin tirones impulsadas por la potencia de{" "}
          <strong>@motion/react</strong>. Aprovechamos la aceleración por
          hardware para transiciones perfectas en cualquier dispositivo.
        </p>
        <div className="w-full">
          <FpsVisualizer />
        </div>
      </div>
    ),
  },
  {
    id: "lightweight",
    className:
      "col-span-2 flex flex-col justify-center hover:shadow-selective-yellow-400/20",
    animation: "down",
    content: (
      <div className="flex flex-row items-center justify-between gap-6 h-full w-full">
        <div className="flex flex-col gap-2 max-w-xl">
          <Weight className="text-selective-yellow-400 bg-selective-yellow-500/10 p-2 rounded-lg size-10" />
          <h3 className="text-3xl">Ultra Ligero</h3>
          <p className="text-sm text-white/60 text-balance">
            Construido directamente sobre <strong>@motion/react</strong> como
            única dependencia. Te ofrecemos componentes y utilidades avanzadas
            con un impacto mínimo extra en tu bundle.
          </p>
        </div>
        <aside className="text-6xl font-mono font-extrabold">
          <h3>
            &lt;15<span className="text-selective-yellow-500 text-2xl">KB</span>
          </h3>
        </aside>
      </div>
    ),
  },
  {
    id: "implementation",
    className: "md:col-span-2 flex hover:shadow-radical-red-400/20",
    animation: "right",
    content: (
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="bg-dark-200/50 w-fit p-3 rounded-xl border border-white/5">
            <Code className="text-radical-red-400 size-6" />
          </div>
          <h3 className="text-3xl font-medium tracking-tight mt-2">
            Fácil de <br />
            implementar
          </h3>
          <p className="text-sm text-white/60 text-balance leading-relaxed">
            API declarativa basada en props. Integra animaciones complejas en
            tus componentes de React en cuestión de segundos.
          </p>
          <ul className="flex flex-col gap-3 mt-4">
            <li className="flex items-center gap-2 text-sm text-white/70">
              <CheckCircle2 className="size-4 text-radical-red-400 fill-radical-red-400/20" />
              Tipado estricto con TypeScript
            </li>
            <li className="flex items-center gap-2 text-sm text-white/70">
              <CheckCircle2 className="size-4 text-radical-red-400 fill-radical-red-400/20" />
              Documentación completa
            </li>
          </ul>
        </div>
        <aside className="flex-1 w-full max-w-[400px] pointer-events-none">
          <CodePreview
            className="w-full relative shadow-2xl rounded-xl"
            settings={{
              type: "fade-up",
              easing: "backOut",
              duration: 0.6,
              distance: 80,
              scale: 1,
              blur: 5,
            }}
          />
        </aside>
      </div>
    ),
  },
  {
    id: "animated-components",
    className: "flex flex-col h-full hover:shadow-selective-yellow-400/20",
    animation: "up",
    content: (
      <div className="flex flex-col h-full gap-4">
        <div className="w-fit">
          <LayoutGrid className="text-selective-yellow-400 bg-selective-yellow-500/10 p-2 rounded-lg size-10" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-medium tracking-tight">
            Componentes Animados
          </h3>
          <p className="text-sm text-white/60 text-balance leading-relaxed">
            Accede a una biblioteca de componentes UI pre-construidos y listos
            para producción. Botones, modales, sliders y más con animaciones
            fluidas integradas.
          </p>
        </div>
        <div className="flex items-center justify-center h-full bg-dark-200 rounded-lg border border-white/10 p-4">
          <TextAnimate
            text="Este texto se anima por palabras"
            by="word"
            className="text-xl"
            startDelay={1.2}
          />
        </div>
        <div className="mt-auto pt-4">
          <button className="inline-block w-full px-4 py-2.5 bg-linear-to-r from-radical-red-700 to-radical-red-500 rounded-lg hover:-translate-y-1 hover:from-radical-red-800 hover:to-radical-red-600 transition-all duration-300">
            Ver componentes
          </button>
        </div>
      </div>
    ),
  },
];
