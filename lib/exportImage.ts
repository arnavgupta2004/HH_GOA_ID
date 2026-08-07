import { toBlob } from "html-to-image";

const DEFAULT_MIN_WIDTH = 2048;

// Rasterizes a DOM node to a PNG blob at a resolution that guarantees at
// least `minWidth` pixels wide, regardless of how large it's rendered
// on-screen.
export async function exportNodeToPngBlob(
  node: HTMLElement,
  minWidth = DEFAULT_MIN_WIDTH,
): Promise<Blob> {
  const width = node.getBoundingClientRect().width || node.offsetWidth;
  const pixelRatio = Math.max(2, Math.ceil(minWidth / width));

  const blob = await toBlob(node, { pixelRatio, cacheBust: true });
  if (!blob) throw new Error("Failed to generate image");

  return blob;
}
