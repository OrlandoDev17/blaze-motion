// Hooks
import { useStore } from "@tanstack/react-store";
import { useState } from "react";
// Store
import { animationStore, updateAnimation, resetAnimation } from "@/store/animationStore";
// Constants
import {
  SELECTABLE_PROPERTIES,
  SLIDER_PROPERTIES,
} from "@/constants/inspector";
// Components
import { PropertySelector } from "./PropertySelector";
import { Slider } from "./Slider";
import { StaggerToggle } from "./StaggerToggle";

function TimingSection({ easing }: { easing: string }) {
  const stiffness = useStore(animationStore, (s) => s.stiffness);
  const damping = useStore(animationStore, (s) => s.damping);

  if (easing !== "custom") {
    return null;
  }

  return (
    <>
      <Slider
        label={SLIDER_PROPERTIES.stiffness.label}
        value={stiffness}
        min={SLIDER_PROPERTIES.stiffness.min}
        max={SLIDER_PROPERTIES.stiffness.max}
        onChange={(v) => updateAnimation({ stiffness: v })}
        step={SLIDER_PROPERTIES.stiffness.step}
        unit={SLIDER_PROPERTIES.stiffness.unit}
      />
      <Slider
        label={SLIDER_PROPERTIES.damping.label}
        value={damping}
        min={SLIDER_PROPERTIES.damping.min}
        max={SLIDER_PROPERTIES.damping.max}
        onChange={(v) => updateAnimation({ damping: v })}
        step={SLIDER_PROPERTIES.damping.step}
        unit={SLIDER_PROPERTIES.damping.unit}
      />
    </>
  );
}

export function PropertyInspector() {
  // 1. Selectores Granulares
  const animationType = useStore(animationStore, (s) => s.type);
  const easing = useStore(animationStore, (s) => s.easing);
  const distance = useStore(animationStore, (s) => s.distance);
  const delay = useStore(animationStore, (s) => s.delay);
  const staggerSettings = useStore(animationStore, (s) => s.staggerDelay);

  const [_showCustomEasing, setShowCustomEasing] = useState(false);

  // 2. Handlers
  const handleTypeChange = (type: string) => updateAnimation({ type });

  const handleEasingChange = (value: string) => {
    updateAnimation({ easing: value });
    setShowCustomEasing(value === "custom");
  };

  const isXAxis =
    animationType === "fade-left" || animationType === "fade-right";

  return (
    <aside className="w-md 2xl:w-lg bg-dark-200 flex flex-col h-full border-l border-selective-yellow-600/30 shrink-0 shadow-lg">
      <header className="flex items-center justify-between border-b border-slate-600/30 px-6 py-6">
        <h2 className="text-xl font-bold">Inspector de propiedades</h2>
        <button
          onClick={resetAnimation}
          className="px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
        >
          Resetear
        </button>
      </header>

      <section className="flex-1 flex flex-col gap-6 px-6 py-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-6 2xl:gap-12">
          {SELECTABLE_PROPERTIES.map((property) => {
            const isType = property.id === "type";

            return (
              <PropertySelector
                key={property.id}
                label={property.label}
                properties={property.properties}
                selectedProperty={isType ? animationType : easing}
                onSelectProperty={
                  isType ? handleTypeChange : handleEasingChange
                }
              />
            );
          })}
        </div>

        <div className="flex flex-col gap-5">
          {/* Duration */}
          <Slider
            label={SLIDER_PROPERTIES.duration.label}
            value={useStore(animationStore, (s) => s.duration)}
            min={SLIDER_PROPERTIES.duration.min}
            max={SLIDER_PROPERTIES.duration.max}
            onChange={(v) => updateAnimation({ duration: v })}
            step={SLIDER_PROPERTIES.duration.step}
            unit={SLIDER_PROPERTIES.duration.unit}
          />

          {/* Distance */}
          <Slider
            label={isXAxis ? "Distancia X" : "Distancia Y"}
            value={distance}
            min={0}
            max={200}
            onChange={(v) => updateAnimation({ distance: v })}
            step={1}
            unit="px"
          />

          {/* Delay */}
          {!staggerSettings?.enabled && (
            <Slider
              label="Delay"
              value={delay}
              min={0}
              max={5}
              step={0.1}
              onChange={(v) => updateAnimation({ delay: v })}
            />
          )}

          {/* Spring parameters */}
          <TimingSection easing={easing} />
        </div>

        {/* Stagger Toggle */}
        <StaggerToggle
          label="Stagger"
          enabled={staggerSettings?.enabled || false}
          onToggle={(enabled) =>
            updateAnimation({
              staggerDelay: {
                enabled,
                count: staggerSettings?.count ?? 3,
                value: staggerSettings?.value ?? 0.15,
              },
            })
          }
        >
          <div className="flex flex-col gap-4 pt-2">
            <Slider
              label="Cantidad de elementos"
              value={staggerSettings?.count ?? 3}
              min={2}
              max={6}
              onChange={(v) =>
                updateAnimation({
                  staggerDelay: {
                    ...staggerSettings,
                    enabled: true,
                    count: v,
                    value: staggerSettings?.value ?? 0.15,
                  },
                })
              }
              step={1}
            />
            <Slider
              label="Intervalo"
              value={staggerSettings?.value ?? 0.15}
              min={SLIDER_PROPERTIES.stagger.min}
              max={SLIDER_PROPERTIES.stagger.max}
              step={SLIDER_PROPERTIES.stagger.step}
              onChange={(v) =>
                updateAnimation({
                  staggerDelay: {
                    ...staggerSettings,
                    enabled: true,
                    count: staggerSettings?.count ?? 3,
                    value: v,
                  },
                })
              }
            />
          </div>
        </StaggerToggle>
      </section>
    </aside>
  );
}
