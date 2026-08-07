export type CroppedAreaPixels = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// Implemented in the upload/crop step: converts HEIC files to JPEG,
// and rasterizes a cropped region of an image into a data URL.
export async function convertHeicIfNeeded(_file: File): Promise<File> {
  throw new Error("Not implemented yet");
}

export async function getCroppedImage(
  _imageSrc: string,
  _croppedAreaPixels: CroppedAreaPixels,
): Promise<string> {
  throw new Error("Not implemented yet");
}
