"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UploadSection } from "@/components/UploadSection";
import { CropEditor } from "@/components/CropEditor";
import { Button } from "@/components/ui/button";

type Step = "upload" | "crop" | "preview";

export default function Home() {
  const [step, setStep] = useState<Step>("upload");
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleImageReady = (imageSrc: string) => {
    setRawImage(imageSrc);
    setStep("crop");
  };

  const handleCropComplete = (result: string) => {
    setCroppedImage(result);
    setStep("preview");
  };

  const handleReset = () => {
    if (rawImage) URL.revokeObjectURL(rawImage);
    setRawImage(null);
    setCroppedImage(null);
    setStep("upload");
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Builder ID — Hacker House Goa 2026
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload a photo to get started.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === "upload" && (
          <UploadSection key="upload" onImageReady={handleImageReady} />
        )}

        {step === "crop" && rawImage && (
          <CropEditor
            key={rawImage}
            imageSrc={rawImage}
            aspect={1}
            cropShape="round"
            onCropComplete={handleCropComplete}
            onCancel={handleReset}
          />
        )}

        {step === "preview" && croppedImage && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={croppedImage}
              alt="Cropped preview"
              className="h-56 w-56 rounded-full object-cover ring-1 ring-white/10"
            />
            <Button type="button" variant="outline" onClick={handleReset}>
              Upload a different photo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
