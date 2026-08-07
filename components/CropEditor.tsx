"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { motion } from "framer-motion";
import { RotateCcw, ZoomIn } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { getCroppedImage, type CroppedAreaPixels } from "@/lib/imageUtils";

export type CropEditorProps = {
  imageSrc: string;
  aspect?: number;
  cropShape?: "rect" | "round";
  onCropComplete: (croppedImage: string) => void;
  onCancel?: () => void;
};

export function CropEditor({
  imageSrc,
  aspect = 1,
  cropShape = "round",
  onCropComplete,
  onCancel,
}: CropEditorProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleReset = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const result = await getCroppedImage(imageSrc, croppedAreaPixels);
      onCropComplete(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [croppedAreaPixels, imageSrc, onCropComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/60 ring-1 ring-white/10">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={cropShape}
          objectFit="cover"
          showGrid={cropShape === "rect"}
          restrictPosition
          zoomSpeed={0.5}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <ZoomIn className="h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
        <Slider
          value={[zoom]}
          min={1}
          max={3}
          step={0.01}
          onValueChange={(value) => {
            const next = Array.isArray(value) ? value[0] : value;
            if (typeof next === "number") setZoom(next);
          }}
          aria-label="Zoom"
          className="flex-1"
        />
        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset position and zoom"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flex gap-3">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
            Back
          </Button>
        )}
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={!croppedAreaPixels || isProcessing}
          className="flex-[2]"
        >
          {isProcessing ? "Processing…" : "Confirm crop"}
        </Button>
      </div>
    </motion.div>
  );
}
