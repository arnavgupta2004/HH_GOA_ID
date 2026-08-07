// Palette sampled directly from the official Hacker House Goa 2026 logo:
// forest green background, gold lettering, magenta Devanagari script.
export const BRAND = {
  green: "#0B6839",
  greenDeep: "#04140B",
  gold: "#FAE323",
  magenta: "#EA0A60",
} as const;

export const GOA_GRADIENTS = [
  `linear-gradient(135deg, ${BRAND.greenDeep} 0%, ${BRAND.green} 55%, #16A34A 100%)`,
  `linear-gradient(135deg, #1a0a12 0%, #6b0f3d 50%, ${BRAND.magenta} 100%)`,
  `linear-gradient(135deg, ${BRAND.greenDeep} 0%, ${BRAND.green} 45%, ${BRAND.gold} 100%)`,
] as const;

export function getGradient(index = 0): string {
  return GOA_GRADIENTS[index % GOA_GRADIENTS.length];
}

export const RING_GRADIENT = `conic-gradient(from 180deg, ${BRAND.green}, #16A34A, ${BRAND.gold}, ${BRAND.magenta}, #6b0f3d, ${BRAND.green})`;
