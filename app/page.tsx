"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { UploadSection } from "@/components/UploadSection";
import { CropEditor } from "@/components/CropEditor";
import { BuilderCard } from "@/components/BuilderCard";
import { StackSelector } from "@/components/StackSelector";
import { DownloadButton } from "@/components/DownloadButton";
import { StepIndicator, type StepIndicatorStep } from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRandomBuilderTitle, type BuilderTitle } from "@/lib/builderTitles";

type Step = "upload" | "crop" | "details" | "card";

const STEPS: StepIndicatorStep[] = [
  { key: "upload", label: "Upload" },
  { key: "crop", label: "Crop" },
  { key: "details", label: "Details" },
  { key: "card", label: "Card" },
];

export default function Home() {
  const [step, setStep] = useState<Step>("upload");
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [stack, setStack] = useState<string[]>([]);
  const [builderTitle, setBuilderTitle] = useState<BuilderTitle | null>(null);

  const handleImageReady = (imageSrc: string) => {
    setRawImage(imageSrc);
    setStep("crop");
  };

  const handleCropComplete = (result: string) => {
    setCroppedImage(result);
    setBuilderTitle(getRandomBuilderTitle());
    setStep("details");
  };

  const handleReset = () => {
    if (rawImage) URL.revokeObjectURL(rawImage);
    setRawImage(null);
    setCroppedImage(null);
    setName("");
    setRole("");
    setStack([]);
    setBuilderTitle(null);
    setStep("upload");
  };

  return (
    <main className="flex flex-1 flex-col items-center gap-12 px-6 py-16 sm:py-24">
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
          Hacker House Goa 2026
        </span>
        <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Craft your{" "}
          <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-fuchsia-300 bg-clip-text text-transparent">
            Builder ID
          </span>
        </h1>
        <p className="max-w-sm text-balance text-sm text-white/50 sm:text-base">
          Upload a photo, add your details, and generate a shareable card before you land in Goa.
        </p>
      </div>

      <StepIndicator steps={STEPS} currentKey={step} />

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

        {step === "details" && croppedImage && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-sm space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
          >
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={croppedImage}
                alt="Your cropped photo"
                className="h-20 w-20 rounded-full object-cover ring-1 ring-white/15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ada Lovelace"
                maxLength={40}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="ML Engineer"
                maxLength={40}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label>Stack</Label>
              <StackSelector value={stack} onChange={setStack} />
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("crop")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep("card")}
                disabled={!name.trim()}
                className="flex-[2] bg-gradient-to-r from-teal-300 to-emerald-400 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.5)] hover:brightness-105"
              >
                Generate card
              </Button>
            </div>
          </motion.div>
        )}

        {step === "card" && croppedImage && builderTitle && (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex w-full max-w-sm flex-col items-center gap-6"
          >
            <BuilderCard
              ref={cardRef}
              imageSrc={croppedImage}
              name={name}
              role={role}
              builderTitle={builderTitle}
              stack={stack}
            />
            <DownloadButton targetRef={cardRef} name={name} filenamePrefix="builder-id" />
            <div className="flex gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep("details")}>
                Edit details
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Start over
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
