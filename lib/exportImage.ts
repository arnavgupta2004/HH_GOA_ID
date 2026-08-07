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

  const blob = await toBlob(node, {
    pixelRatio,
    cacheBust: true,
    filter: (n: HTMLElement) => {
      // Avoid letting html-to-image render the photo, which causes
      // square corners in Safari due to a bug with border-radius and overflow.
      if (n.tagName === "IMG" && n.hasAttribute("data-export-photo")) {
        return false;
      }
      return true;
    },
  });
  if (!blob) throw new Error("Failed to generate image");

  // `html-to-image` occasionally loses data-URL images while cloning a DOM
  // tree (most noticeably after a canvas crop). Draw marked user photos over
  // the rasterized template as a final, deterministic export step.
  const photos = Array.from(node.querySelectorAll<HTMLImageElement>("img[data-export-photo]"))
    .map((image) => {
      const rect = image.getBoundingClientRect();
      const rootRect = node.getBoundingClientRect();
      return {
        src: image.currentSrc || image.src,
        x: rect.left - rootRect.left,
        y: rect.top - rootRect.top,
        width: rect.width,
        height: rect.height,
        shape: image.dataset.exportShape ?? "rect",
      };
    })
    .filter((photo) => photo.src && photo.width > 0 && photo.height > 0);

  if (photos.length === 0) return blob;

  const [template, ...sourceImages] = await Promise.all([
    loadImage(URL.createObjectURL(blob)),
    ...photos.map((photo) => loadImage(photo.src)),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = template.naturalWidth;
  canvas.height = template.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D context unavailable");

  context.drawImage(template, 0, 0);
  const scale = canvas.width / width;

  photos.forEach((photo, index) => {
    const x = photo.x * scale;
    const y = photo.y * scale;
    const targetWidth = photo.width * scale;
    const targetHeight = photo.height * scale;

    context.save();
    if (photo.shape === "circle") {
      context.beginPath();
      context.ellipse(
        x + targetWidth / 2,
        y + targetHeight / 2,
        targetWidth / 2,
        targetHeight / 2,
        0,
        0,
        Math.PI * 2,
      );
      context.clip();
    }
    drawCover(context, sourceImages[index], x, y, targetWidth, targetHeight);
    context.restore();
  });

  return canvasToBlob(canvas);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load export image"));
    image.src = src;
  });
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > targetRatio) {
    sourceWidth = image.naturalHeight * targetRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / targetRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create export image"));
    }, "image/png");
  });
}
