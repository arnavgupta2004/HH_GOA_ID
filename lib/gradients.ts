export const GOA_GRADIENTS = [
  "linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #0d9488 100%)",
  "linear-gradient(135deg, #1a1033 0%, #4c1d95 45%, #db2777 100%)",
  "linear-gradient(135deg, #0a1f1c 0%, #065f46 50%, #f59e0b 100%)",
] as const;

export function getGradient(index = 0): string {
  return GOA_GRADIENTS[index % GOA_GRADIENTS.length];
}
