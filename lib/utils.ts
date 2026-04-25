import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clampSliderMax(value: number, currentMax: number): number {
  if (value > currentMax) return value * 2;
  return currentMax;
}
