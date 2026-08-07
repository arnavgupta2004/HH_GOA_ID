"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Palmtree } from "lucide-react";
import { UploadSection } from "@/components/UploadSection";
import { CropEditor } from "@/components/CropEditor";
import { ProfileFrame } from "@/components/ProfileFrame";
import { BuilderCard } from "@/components/BuilderCard";
import { StackSelector } from "@/components/StackSelector";
import { DownloadButton } from "@/components/DownloadButton";
import { ShareButton } from "@/components/ShareButton";
import { ToggleFormat, type Format } from "@/components/ToggleFormat";
import { RoleSelector, type Role } from "@/components/RoleSelector";
import { StepIndicator, type StepIndicatorStep } from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRandomBuilderTitle, type BuilderTitle } from "@/lib/builderTitles";
import { cn, PRIMARY_CTA_CLASS } from "@/lib/utils";

type Step = "upload" | "crop" | "format" | "details" | "profile" | "card";

function getSteps(format: Format): StepIndicatorStep[] {
  const base: StepIndicatorStep[] = [
    { key: "upload", label: "Upload" },
    { key: "crop", label: "Crop" },
    { key: "format", label: "Format" },
  ];
  if (format === "profile") {
    return [...base, { key: "profile", label: "Frame" }];
  }
  return [...base, { key: "details", label: "Details" }, { key: "card", label: "Card" }];
}

export default function Home() {
  const [step, setStep] = useState<Step>("upload");
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [format, setFormat] = useState<Format>("profile");
  const [roleType, setRoleType] = useState<Role>("hacker");
  const cardRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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
    setStep("format");
  };

  const handleContinueFromFormat = () => {
    if (format === "card") {
      setBuilderTitle((prev) => prev ?? getRandomBuilderTitle());
      setStep("details");
    } else {
      setStep("profile");
    }
  };

  const handleReset = () => {
    if (rawImage) URL.revokeObjectURL(rawImage);
    setRawImage(null);
    setCroppedImage(null);
    setFormat("profile");
    setRoleType("hacker");
    setName("");
    setRole("");
    setStack([]);
    setBuilderTitle(null);
    setStep("upload");
  };

  return (
    <main className="flex flex-1 flex-col items-center gap-10 px-6 py-12 sm:gap-12 sm:py-20">
      <div className="flex max-w-2xl flex-col items-center gap-5 text-center">
        <span className="inline-flex items-center gap-2 border border-[#17372a]/25 bg-[#fff9ed] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#17372a]/70">
          <Palmtree className="h-3.5 w-3.5 text-[#0B6839]" aria-hidden="true" />
          Hacker House Goa · 2026
        </span>
        <h1 className="max-w-xl font-heading text-5xl leading-[0.92] font-semibold tracking-[-0.045em] text-[#17372a] sm:text-7xl">
          Make your mark<br />
          <span className="text-[#e46647]">before Goa.</span>
        </h1>
        <p className="max-w-md text-balance text-sm leading-6 text-[#17372a]/70 sm:text-base">
          Bring your face, your stack, and your curious energy. We’ll make the badge for the people you’re about to meet.
        </p>
        <ArrowDown className="mt-1 h-4 w-4 text-[#e46647]" aria-hidden="true" />
      </div>

      <StepIndicator steps={getSteps(format)} currentKey={step} />

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

        {step === "format" && croppedImage && (
          <motion.div
            key="format"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-sm space-y-6 border border-[#17372a]/20 bg-[#fff9ed] p-6 text-center shadow-[6px_6px_0_rgba(23,55,42,0.12)]"
          >
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={croppedImage}
                alt="Your cropped photo"
                className="h-20 w-20 rounded-full object-cover ring-2 ring-[#e46647]/60"
              />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#17372a]/50">
                I&rsquo;m here as a
              </p>
              <RoleSelector value={roleType} onChange={setRoleType} />
            </div>

            <div className="flex justify-center">
              <ToggleFormat value={format} onChange={setFormat} />
            </div>

            <p className="text-sm text-[#17372a]/65">
              {format === "card"
                ? "A shareable card with your name, role, and stack."
                : "A circular frame, ready for your profile picture."}
            </p>

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
                onClick={handleContinueFromFormat}
                className={cn("flex-[2]", PRIMARY_CTA_CLASS)}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {step === "details" && croppedImage && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-sm space-y-5 border border-[#17372a]/20 bg-[#fff9ed] p-6 shadow-[6px_6px_0_rgba(23,55,42,0.12)]"
          >
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={croppedImage}
                alt="Your cropped photo"
                className="h-20 w-20 rounded-full object-cover ring-2 ring-[#e46647]/60"
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
                onClick={() => setStep("format")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep("card")}
                disabled={!name.trim()}
                className={cn("flex-[2]", PRIMARY_CTA_CLASS)}
              >
                Generate card
              </Button>
            </div>
          </motion.div>
        )}

        {step === "profile" && croppedImage && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex w-full max-w-sm flex-col items-center gap-6"
          >
            <ProfileFrame ref={profileRef} imageSrc={croppedImage} roleType={roleType} />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <DownloadButton targetRef={profileRef} filenamePrefix="profile-frame" />
              <ShareButton targetRef={profileRef} filenamePrefix="profile-frame" />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep("format")}>
                Change format
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Start over
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
              roleType={roleType}
              builderTitle={builderTitle}
              stack={stack}
            />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <DownloadButton targetRef={cardRef} name={name} filenamePrefix="builder-id" />
              <ShareButton targetRef={cardRef} name={name} filenamePrefix="builder-id" />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep("format")}>
                Change format
              </Button>
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
