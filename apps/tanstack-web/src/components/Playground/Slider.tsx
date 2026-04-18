import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { InfoTooltip } from "./InfoTooltip";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  description?: string;
  example?: string;
  onChange: (value: number) => void;
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  description,
  example,
  onChange,
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const trackRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const decimals = String(step).includes(".")
    ? String(step).split(".")[1].length
    : 0;

  const formatValue = useCallback(
    (v: number) => Number(v.toFixed(decimals)),
    [decimals],
  );

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return value;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );
      const rawValue = min + ratio * (max - min);
      return formatValue(Math.round(rawValue / step) * step);
    },
    [value, min, max, step, formatValue],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      onChange(getValueFromPosition(e.clientX));
    },
    [getValueFromPosition, onChange],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      onChange(getValueFromPosition(e.clientX));
    },
    [isDragging, getValueFromPosition, onChange],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      const stepped = formatValue(Math.round(clamped / step) * step);
      onChange(stepped);
    }
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue("");
    }
  };

  const handleThumbKeyDown = (e: React.KeyboardEvent) => {
    const stepMultiplier = e.shiftKey ? 10 : 1;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const newValue = Math.min(max, value + step * stepMultiplier);
      onChange(formatValue(newValue));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const newValue = Math.max(min, value - step * stepMultiplier);
      onChange(formatValue(newValue));
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
            {label}
          </span>
          {description && (
            <InfoTooltip content={description} example={example} />
          )}
        </div>
        {isEditing ? (
          <input
            ref={inputRef}
            type="number"
            className="w-16 bg-transparent text-right text-sm text-neutral-300 outline-none border-b border-selective-yellow-500"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            aria-label={`${label} value`}
            autoComplete="off"
            name={label.toLowerCase().replace(/\s+/g, "-")}
          />
        ) : (
          <button
            className="text-sm text-neutral-300 font-mono hover:text-selective-yellow-400 transition-colors cursor-text"
            onClick={() => {
              setIsEditing(true);
              setInputValue(String(value));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsEditing(true);
                setInputValue(String(value));
              }
            }}
            aria-label={`Edit ${label} value`}
          >
            {formatValue(value)}
            {unit && <span className="text-neutral-500 ml-0.5">{unit}</span>}
          </button>
        )}
      </div>

      <div
        ref={trackRef}
        className="relative w-full h-1.5 bg-neutral-700 rounded-full cursor-pointer select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-selective-yellow-500"
          style={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-selective-yellow-400 rounded-full shadow-md cursor-grab active:cursor-grabbing"
          style={{ left: `${percentage}%` }}
          animate={{
            scale: isDragging ? 1.25 : 1,
            boxShadow: isDragging
              ? "0 0 12px rgba(255, 200, 50, 0.5)"
              : "0 2px 6px rgba(0, 0, 0, 0.3)",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            scale: { duration: 0.15 },
            boxShadow: { duration: 0.15 },
          }}
          onKeyDown={handleThumbKeyDown}
          tabIndex={0}
          role="slider"
          aria-label={`${label} slider`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
        {isDragging && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 rounded-md text-xs text-white font-mono pointer-events-none"
            style={{ left: `${percentage}%` }}
          >
            {formatValue(value)}
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}
