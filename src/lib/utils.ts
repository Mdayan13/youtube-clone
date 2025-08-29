import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function snakeToTitle(str: string): string {
  return str
    .replace(/_/g, " ")                // replace _ with space
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize first letter of each word
}

