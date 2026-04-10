interface CardContentProps {
  isSmall?: boolean;
}

export function CardContent({ isSmall = false }: CardContentProps) {
  return (
    <div
      className={`flex flex-col gap-6 max-w-xs w-full bg-neutral card-shadow rounded-2xl overflow-hidden ${isSmall ? "scale-[0.8] origin-top" : ""}`}
    >
      <picture>
        <img className="w-full" src="/card-image.png" alt="Imagen" />
      </picture>
      <div className={`flex flex-col gap-4 ${isSmall ? "px-5" : "px-6"}`}>
        <span className="w-2/5 h-2 bg-radical-red-400/30"></span>
        <div className="flex flex-col gap-2">
          <span className="w-full h-6 rounded-lg bg-black/30"></span>
          <span className="w-4/5 h-6 rounded-lg bg-black/30"></span>
        </div>
      </div>
      <footer className={`flex ${isSmall ? "px-5 pb-5" : "px-6 pb-6"}`}>
        <span className="w-2/4 h-8 bg-linear-to-r from-radical-red-200 to-radical-red-500"></span>
      </footer>
    </div>
  );
}
