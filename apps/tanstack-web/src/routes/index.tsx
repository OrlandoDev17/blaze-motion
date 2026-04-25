import { Features } from "@/components/home/sections/Features";
import { Hero } from "@/components/home/sections/Hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="flex flex-col  min-h-dvh relative z-10 justify-center items-center max-w-7xl mx-auto w-full px-8 ">
      <Hero />
      <Features />
    </main>
  );
}
