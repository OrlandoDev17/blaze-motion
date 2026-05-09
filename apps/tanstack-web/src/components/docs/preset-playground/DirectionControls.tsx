import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface DirectionControlsProps {
  direction: "up" | "down" | "left" | "right";
  onChange: (dir: "up" | "down" | "left" | "right") => void;
}

interface DirectionButtonProps {
  dir: "up" | "down" | "left" | "right";
  currentDirection: "up" | "down" | "left" | "right";
  onChange: (dir: "up" | "down" | "left" | "right") => void;
}

function DirectionButton({ dir, currentDirection, onChange }: DirectionButtonProps) {
  const icons = {
    up: ArrowUp,
    down: ArrowDown,
    left: ArrowLeft,
    right: ArrowRight,
  };
  const labels = {
    up: "Arriba",
    down: "Abajo",
    left: "Izquierda",
    right: "Derecha",
  };
  const Icon = icons[dir];
  const isActive = currentDirection === dir;

  return (
    <button
      onClick={() => onChange(dir)}
      className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-radical-red-500/50 ${
        isActive
          ? "bg-radical-red-500/20 border-radical-red-500 text-radical-red-400 shadow-lg shadow-radical-red-500/20"
          : "bg-dark-100 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20 hover:text-white/70"
      }`}
      aria-label={labels[dir]}
      aria-pressed={isActive}
    >
      <Icon className="size-5" strokeWidth={isActive ? 2.5 : 1.5} />
    </button>
  );
}

export function DirectionControls({ direction, onChange }: DirectionControlsProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 w-fit">
      {/* Row 1: empty, up, empty */}
      <div />
      <DirectionButton dir="up" currentDirection={direction} onChange={onChange} />
      <div />
      
      {/* Row 2: left, empty, right */}
      <DirectionButton dir="left" currentDirection={direction} onChange={onChange} />
      <div className="w-10 h-10" />
      <DirectionButton dir="right" currentDirection={direction} onChange={onChange} />
      
      {/* Row 3: empty, down, empty */}
      <div />
      <DirectionButton dir="down" currentDirection={direction} onChange={onChange} />
      <div />
    </div>
  );
}