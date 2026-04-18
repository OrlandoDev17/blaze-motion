import { PlaygroundAnimation } from "./PlaygroundAnimation";
import { useStore } from "@tanstack/react-store";
import { animationStore } from "@/store/animationStore";

export function PlaygroundElement() {
  // Suscripcion al estado completo de la animacion
  const settings = useStore(animationStore, (state) => state);

  return <PlaygroundAnimation settings={settings} />;
}
