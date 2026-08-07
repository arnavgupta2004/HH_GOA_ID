"use client";

export type CropEditorProps = {
  imageSrc: string;
  aspect: number;
  onCropComplete: (croppedImage: string) => void;
};

// Implemented in the upload/crop step: react-easy-crop wrapper with
// auto-centering, zoom, and reposition controls.
export function CropEditor(_props: CropEditorProps) {
  return null;
}
