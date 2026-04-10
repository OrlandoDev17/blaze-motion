"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { PlaygroundAnimation } from "./PlaygroundAnimation";

export function PlaygroundElement() {
  const settings = useSelector((state: RootState) => state.animation);

  return <PlaygroundAnimation settings={settings} />;
}
