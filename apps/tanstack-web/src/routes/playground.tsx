import { PlaygroundContainer } from "@playground/display/PlaygroundContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
  component: PlaygroundPage,
});

function PlaygroundPage() {
  return (
    <main className="snap-container bg-dark">
      {/* SECCION 1: EL EDITOR / PLAYGROUND */}
      <section className="snap-section h-dvh border-b border-white/5">
        <PlaygroundContainer />
      </section>
    </main>
  );
}
