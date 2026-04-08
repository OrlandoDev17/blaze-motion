import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  duration: 0.6,
  distance: 40,
  delay: 0,
  type: "fade-up",
  easing: "easeOut",
  stiffness: 100,
  damping: 14,
  stagger: {
    enabled: false,
    count: 3,
    value: 0.15,
  },
};

const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
    setDelay: (state, action: PayloadAction<number>) => {
      state.delay = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setEasing: (state, action: PayloadAction<string>) => {
      state.easing = action.payload;
    },
    setStiffness: (state, action: PayloadAction<number>) => {
      state.stiffness = action.payload;
    },
    setDamping: (state, action: PayloadAction<number>) => {
      state.damping = action.payload;
    },
    setStaggerEnabled: (state, action: PayloadAction<boolean>) => {
      state.stagger.enabled = action.payload;
    },
    setStaggerCount: (state, action: PayloadAction<number>) => {
      state.stagger.count = action.payload;
    },
    setStagger: (state, action: PayloadAction<number>) => {
      state.stagger.value = action.payload;
    },
  },
});

export const {
  setDuration,
  setDistance,
  setDelay,
  setType,
  setEasing,
  setStiffness,
  setDamping,
  setStaggerEnabled,
  setStaggerCount,
  setStagger,
} = animationSlice.actions;
export default animationSlice.reducer;
