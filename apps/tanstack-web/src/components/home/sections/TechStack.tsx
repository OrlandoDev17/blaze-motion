import { Marquee, TextAnimate } from "@blaze-motion/motion";
import { TooltipIcon } from "@/components/common/TooltipIcon";

export function TechStack() {
  const DEPENDENCIES = [
    { id: "react", brand: "simple-icons:react", name: "React" },
    { id: "motion", brand: "simple-icons:framer", name: "Motion" },
    {
      id: "tailwindcss",
      brand: "simple-icons:tailwindcss",
      name: "TailwindCSS",
    },
    { id: "typescript", brand: "simple-icons:typescript", name: "TypeScript" },
    { id: "zod", brand: "simple-icons:zod", name: "Zod" },
    { id: "vite", brand: "simple-icons:vite", name: "Vite" },
  ];

  const TECHS = [
    { id: "react2", brand: "simple-icons:react", name: "React" },
    { id: "nextjs", brand: "simple-icons:nextdotjs", name: "Next.js" },
    { id: "tanstack", brand: "simple-icons:tanstack", name: "TanStack" },
    { id: "astro", brand: "simple-icons:astro", name: "Astro" },
    { id: "remix", brand: "simple-icons:remix", name: "Remix" },
  ];

  return (
    <section className="flex flex-col gap-8 items-center justify-center w-full mb-8">
      <div className="flex flex-col gap-2 items-center">
        <TextAnimate
          as="h2"
          type="typeWriter"
          by="letter"
          text="Construido para el Ecosistema Moderno"
          className="text-[clamp(1.5rem,2vw,3rem)]"
          highlight={["Ecosistema", "Moderno"]}
          highlightClassName="text-radical-red-500"
        />
        <TextAnimate
          text="Blaze Motion se integra perfectamente con las herramientas que ya amas y utilizas en tu flujo diario."
          className="text-lg max-w-2xl text-center text-white/50"
          type="slideUp"
          by="word"
          duration={0.3}
          startDelay={0.4}
        />
      </div>
      <div className="flex flex-col">
        <Marquee className="max-w-4xl mx-auto w-full pt-16 pb-4">
          {DEPENDENCIES.map((tech) => (
            <TooltipIcon key={tech.id} tech={tech} />
          ))}
        </Marquee>
        <Marquee
          direction="right"
          className="max-w-4xl mx-auto w-full pt-16 pb-4"
        >
          {TECHS.map((tech) => (
            <TooltipIcon key={tech.id} tech={tech} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
