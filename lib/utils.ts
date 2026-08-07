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
  "rounded-md bg-[#0B6839] text-[#FFF9ED] shadow-[3px_3px_0_#E46647] hover:bg-[#07552e] hover:shadow-[1px_1px_0_#E46647]";
