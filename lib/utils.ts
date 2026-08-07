import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Primary CTA treatment shared across buttons — gold-to-magenta gradient
// lifted from the Hacker House Goa logo.
export const PRIMARY_CTA_CLASS =
  "bg-gradient-to-r from-[#FAE323] to-[#EA0A60] text-black shadow-[0_8px_24px_-8px_rgba(234,10,96,0.5)] hover:brightness-105";
