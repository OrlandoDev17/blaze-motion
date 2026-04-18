import { Playground } from "#/components/Playground/Playground";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="snap-container bg-dark">
      {/* SECCION 1: EL EDITOR / PLAYGROUND */}
      <section className="snap-section h-dvh border-b border-white/5">
        <Playground />
      </section>
    </main>
  );
}
