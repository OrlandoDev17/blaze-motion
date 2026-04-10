import { Playground } from "@/components/sections/Playground";
import { Catalog } from "@/components/sections/Catalog";

export default function Home() {
  return (
    <main className="snap-container bg-dark">
      {/* SECCION 1: EL EDITOR / PLAYGROUND */}
      <section className="snap-section h-dvh border-b border-white/5">
        <Playground />
      </section>

      {/* SECCION 2: EL CATÁLOGO */}
      <section className="snap-section bg-selective-yellow-800">
        <Catalog />
      </section>
    </main>
  );
}
