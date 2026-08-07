export type CroppedAreaPixels = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const HEIC_EXTENSION = /\.(heic|heif)$/i;

function isHeicFile(file: File): boolean {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    HEIC_EXTENSION.test(file.name)
  );
}

// HEIC/HEIF (the default iPhone photo format) can't be decoded by <img> or
// canvas in any browser, so it has to be transcoded to JPEG before we can
// crop or render it.
export async function convertHeicIfNeeded(file: File): Promise<File> {
  if (!isHeicFile(file)) return file;

  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.92,
  });
  const blob = Array.isArray(result) ? result[0] : result;
  const name = file.name.replace(HEIC_EXTENSION, ".jpg") || "converted.jpg";

  return new File([blob], name, { type: "image/jpeg" });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load image"));
    image.src = src;
  });
}

const MIN_OUTPUT_SIZE = 1200;
const MAX_UPSCALE = 3;

// Rasterizes the cropped region at a resolution good enough for a
// high-res PNG export, upscaling small source photos and leaving large
// ones alone.
export async function getCroppedImage(
  imageSrc: string,
  croppedAreaPixels: CroppedAreaPixels,
): Promise<string> {
  const image = await loadImage(imageSrc);
  const { x, y, width, height } = croppedAreaPixels;

  const scale = Math.min(
    Math.max(MIN_OUTPUT_SIZE / Math.max(width, height), 1),
    MAX_UPSCALE,
  );
  const outputWidth = Math.round(width * scale);
  const outputHeight = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, x, y, width, height, 0, 0, outputWidth, outputHeight);

  return canvas.toDataURL("image/png", 1);
}
