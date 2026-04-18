import { Store } from "@tanstack/store";
import { AnimationStoreSchema } from "@blaze-motion/motion";

// Creas el store usando los valores por defecto del esquema
export const animationStore = new Store(AnimationStoreSchema.parse({}));

// Las funciones para actualizar (tus viejos reducers)
export const updateAnimation = (values: any) => {
  animationStore.setState((state) => ({
    ...state,
    ...values,
  }));
};

export const resetAnimation = () => {
  animationStore.setState(() => AnimationStoreSchema.parse({}));
};
