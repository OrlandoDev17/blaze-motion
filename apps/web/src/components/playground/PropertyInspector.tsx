"use client";

import { useSelector, useDispatch } from "react-redux";
import { motion } from "motion/react";
import type { RootState } from "@/store";
import { SELECTABLE_PROPERTIES, SLIDER_PROPERTIES } from "@/lib/constants";
import { PropertySelector } from "./PropertySelector";
import { Slider } from "./Slider";
import { StaggerToggle } from "./StaggerToggle";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  setType,
  setEasing,
  setDuration,
  setDistance,
  setDelay,
  setStiffness,
  setDamping,
  setStaggerEnabled,
  setStaggerCount,
  setStagger,
} from "@/store/animationSlice";
import { useState } from "react";

function TimingSection({
  easing,
  stiffness,
  damping,
  dispatch,
}: {
  easing: string;
  stiffness: number;
  damping: number;
  dispatch: ReturnType<typeof useDispatch>;
}) {
  if (easing === "custom") {
    return (
      <>
        <Slider
          key="stiffness"
          label={SLIDER_PROPERTIES.stiffness.label}
          description={SLIDER_PROPERTIES.stiffness.description}
          example={SLIDER_PROPERTIES.stiffness.example}
          value={stiffness}
          min={SLIDER_PROPERTIES.stiffness.min}
          max={SLIDER_PROPERTIES.stiffness.max}
          step={SLIDER_PROPERTIES.stiffness.step}
          unit={SLIDER_PROPERTIES.stiffness.unit}
          onChange={(v) => dispatch(setStiffness(v))}
        />
        <Slider
          key="damping"
          label={SLIDER_PROPERTIES.damping.label}
          description={SLIDER_PROPERTIES.damping.description}
          example={SLIDER_PROPERTIES.damping.example}
          value={damping}
          min={SLIDER_PROPERTIES.damping.min}
          max={SLIDER_PROPERTIES.damping.max}
          step={SLIDER_PROPERTIES.damping.step}
          unit={SLIDER_PROPERTIES.damping.unit}
          onChange={(v) => dispatch(setDamping(v))}
        />
      </>
    );
  }

  return (
    <Slider
      key="duration"
      label={SLIDER_PROPERTIES.duration.label}
      description={SLIDER_PROPERTIES.duration.description}
      example={SLIDER_PROPERTIES.duration.example}
      value={useSelector((state: RootState) => state.animation.duration)}
      min={SLIDER_PROPERTIES.duration.min}
      max={SLIDER_PROPERTIES.duration.max}
      step={SLIDER_PROPERTIES.duration.step}
      unit={SLIDER_PROPERTIES.duration.unit}
      onChange={(v) => dispatch(setDuration(v))}
    />
  );
}

function CustomEasingSection({
  stiffness,
  damping,
  dispatch,
  isOpen,
  onToggle,
}: {
  stiffness: number;
  damping: number;
  dispatch: ReturnType<typeof useDispatch>;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
      >
        <span>Spring Settings</span>
        {isOpen ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <div className="flex flex-col gap-4 p-4">
          <Slider
            label={SLIDER_PROPERTIES.stiffness.label}
            description={SLIDER_PROPERTIES.stiffness.description}
            example={SLIDER_PROPERTIES.stiffness.example}
            value={stiffness}
            min={SLIDER_PROPERTIES.stiffness.min}
            max={SLIDER_PROPERTIES.stiffness.max}
            step={SLIDER_PROPERTIES.stiffness.step}
            unit={SLIDER_PROPERTIES.stiffness.unit}
            onChange={(v) => dispatch(setStiffness(v))}
          />
          <Slider
            label={SLIDER_PROPERTIES.damping.label}
            description={SLIDER_PROPERTIES.damping.description}
            example={SLIDER_PROPERTIES.damping.example}
            value={damping}
            min={SLIDER_PROPERTIES.damping.min}
            max={SLIDER_PROPERTIES.damping.max}
            step={SLIDER_PROPERTIES.damping.step}
            unit={SLIDER_PROPERTIES.damping.unit}
            onChange={(v) => dispatch(setDamping(v))}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function PropertyInspector() {
  const dispatch = useDispatch();
  const animationType = useSelector((state: RootState) => state.animation.type);
  const easing = useSelector((state: RootState) => state.animation.easing);
  const distance = useSelector((state: RootState) => state.animation.distance);
  const delay = useSelector((state: RootState) => state.animation.delay);
  const stiffness = useSelector((state: RootState) => state.animation.stiffness);
  const dampingValue = useSelector((state: RootState) => state.animation.damping);
  const stagger = useSelector((state: RootState) => state.animation.stagger);

  const [showCustomEasing, setShowCustomEasing] = useState(false);

  const isXAxis = animationType === "fade-left" || animationType === "fade-right";

  const handleEasingChange = (value: string) => {
    dispatch(setEasing(value));
    if (value === "custom") {
      setShowCustomEasing(true);
    } else {
      setShowCustomEasing(false);
    }
  };

  return (
    <aside className="w-md 2xl:w-lg bg-neutral flex flex-col h-full border-l border-selective-yellow-600/30 shrink-0 shadow-lg">
      <header className="flex items-center justify-between border-b border-slate-600/30 px-6 py-6">
        <h2 className="text-xl font-bold">Inspector de propiedades</h2>
      </header>

      <section className="flex-1 flex flex-col gap-6 px-6 py-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-6 2xl:gap-12">
          {SELECTABLE_PROPERTIES.map((property) => {
            const selected = property.id === "type" ? animationType : easing;

            return (
              <PropertySelector
                key={property.id}
                label={property.label}
                properties={property.properties}
                selectedProperty={selected}
                onSelectProperty={(value) => {
                  if (property.id === "type") {
                    dispatch(setType(value));
                  } else if (property.id === "easing") {
                    handleEasingChange(value);
                  }
                }}
              />
            );
          })}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
              Timing
            </h3>
            <TimingSection
              easing={easing}
              stiffness={stiffness}
              damping={dampingValue}
              dispatch={dispatch}
            />
          </div>

          {easing !== "custom" && (
            <Slider
              label={SLIDER_PROPERTIES.delay.label}
              description={SLIDER_PROPERTIES.delay.description}
              example={SLIDER_PROPERTIES.delay.example}
              value={delay}
              min={SLIDER_PROPERTIES.delay.min}
              max={SLIDER_PROPERTIES.delay.max}
              step={SLIDER_PROPERTIES.delay.step}
              unit={SLIDER_PROPERTIES.delay.unit}
              onChange={(v) => dispatch(setDelay(v))}
            />
          )}

          <Slider
            label={isXAxis ? "Distance X" : "Distance Y"}
            description={SLIDER_PROPERTIES.distance.description}
            example={SLIDER_PROPERTIES.distance.example}
            value={distance}
            min={SLIDER_PROPERTIES.distance.min}
            max={SLIDER_PROPERTIES.distance.max}
            step={SLIDER_PROPERTIES.distance.step}
            unit={SLIDER_PROPERTIES.distance.unit}
            onChange={(v) => dispatch(setDistance(v))}
          />
        </div>

        {easing === "custom" && (
          <CustomEasingSection
            stiffness={stiffness}
            damping={dampingValue}
            dispatch={dispatch}
            isOpen={showCustomEasing}
            onToggle={() => setShowCustomEasing(!showCustomEasing)}
          />
        )}

        <StaggerToggle
          label="Stagger"
          enabled={stagger.enabled}
          onToggle={(enabled) => dispatch(setStaggerEnabled(enabled))}
        >
          <div className="flex flex-col gap-4 pt-2">
            <Slider
              label={SLIDER_PROPERTIES.staggerCount.label}
              description={SLIDER_PROPERTIES.staggerCount.description}
              example={SLIDER_PROPERTIES.staggerCount.example}
              value={stagger.count}
              min={SLIDER_PROPERTIES.staggerCount.min}
              max={SLIDER_PROPERTIES.staggerCount.max}
              step={SLIDER_PROPERTIES.staggerCount.step}
              unit={SLIDER_PROPERTIES.staggerCount.unit}
              onChange={(v) => dispatch(setStaggerCount(v))}
            />
            <Slider
              label={SLIDER_PROPERTIES.stagger.label}
              description={SLIDER_PROPERTIES.stagger.description}
              example={SLIDER_PROPERTIES.stagger.example}
              value={stagger.value}
              min={SLIDER_PROPERTIES.stagger.min}
              max={SLIDER_PROPERTIES.stagger.max}
              step={SLIDER_PROPERTIES.stagger.step}
              unit={SLIDER_PROPERTIES.stagger.unit}
              onChange={(v) => dispatch(setStagger(v))}
            />
          </div>
        </StaggerToggle>
      </section>
    </aside>
  );
}
