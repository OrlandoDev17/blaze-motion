import { PlaygroundElement } from "@/components/playground/PlaygroundElement";
import { PropertyInspector } from "@/components/playground/PropertyInspector";

export function Playground() {
  return (
    <section className="relative flex h-full w-full overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-size-[30px_30px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <PlaygroundElement />
      </div>

      <div className="relative z-10 h-full">
        <PropertyInspector />
      </div>
    </section>
  );
}
