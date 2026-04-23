// Hooks
import { useSelector } from "@tanstack/react-store";
// Store
import {
  animationStore,
  updateAnimation,
  resetAnimation,
} from "@/store/animationStore";
// Constants
import {
  SELECTABLE_PROPERTIES,
  SLIDER_PROPERTIES_MAP,
} from "@/constants/inspector";
// Components
import { PropertySelector } from "@playground/ui-controls/PropertySelector";
import { Slider } from "@playground/ui-controls/Slider";
import { StaggerToggle } from "@playground/ui-controls/StaggerToggle";

export function PropertyInspector() {
  const animationType = useSelector(animationStore, (s) => s.type);
  const easing = useSelector(animationStore, (s) => s.easing);
  const staggerSettings = useSelector(animationStore, (s) => s.staggerDelay);

  const duration = useSelector(animationStore, (s) => s.duration);
  const distance = useSelector(animationStore, (s) => s.distance);
  const scale = useSelector(animationStore, (s) => s.scale);
  const blur = useSelector(animationStore, (s) => s.blur);
  const delay = useSelector(animationStore, (s) => s.delay);
  const stiffness = useSelector(animationStore, (s) => s.stiffness);
  const damping = useSelector(animationStore, (s) => s.damping);

  const isCustom = easing === "custom";
  const isNone = animationType === "fade";
  const sliderValues = isCustom
    ? { stiffness, damping }
    : { duration, ...(isNone ? {} : { distance }), scale, blur, delay };

  const handleTypeChange = (type: string) => updateAnimation({ type });
  const handleEasingChange = (value: string) =>
    updateAnimation({ easing: value });

  return (
    <aside className="w-md 2xl:w-lg bg-dark-200 flex flex-col h-full border-l border-selective-yellow-600/30 shrink-0 shadow-lg">
      <header className="flex items-center justify-between border-b border-slate-600/30 px-6 py-6">
        <h2 className="text-xl font-bold">Inspector de propiedades</h2>
        <button
          type="button"
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
          {Object.entries(sliderValues).map(([propId, value]) => {
            const prop =
              SLIDER_PROPERTIES_MAP[
                propId as keyof typeof SLIDER_PROPERTIES_MAP
              ];
            return (
              <Slider
                key={propId}
                label={prop.label}
                value={value}
                min={prop.min}
                max={prop.max}
                onChange={(v) => updateAnimation({ [propId]: v })}
                step={prop.step}
                unit={prop.unit}
              />
            );
          })}
        </div>

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
            {["staggerCount", "stagger"].map((propId) => {
              const prop =
                SLIDER_PROPERTIES_MAP[
                  propId as keyof typeof SLIDER_PROPERTIES_MAP
                ];
              const value =
                propId === "staggerCount"
                  ? (staggerSettings?.count ?? 3)
                  : (staggerSettings?.value ?? 0.15);
              return (
                <Slider
                  key={propId}
                  label={prop.label}
                  value={value}
                  min={prop.min}
                  max={prop.max}
                  onChange={(v) =>
                    updateAnimation({
                      staggerDelay: {
                        ...staggerSettings,
                        enabled: true,
                        count:
                          propId === "staggerCount"
                            ? v
                            : (staggerSettings?.count ?? 3),
                        value:
                          propId === "stagger"
                            ? v
                            : (staggerSettings?.value ?? 0.15),
                      },
                    })
                  }
                  step={prop.step}
                />
              );
            })}
          </div>
        </StaggerToggle>
      </section>
    </aside>
  );
}
