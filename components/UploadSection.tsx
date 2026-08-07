"use client";

import { useCallback, useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ImageUp, Loader2 } from "lucide-react";
import { convertHeicIfNeeded } from "@/lib/imageUtils";
import { cn } from "@/lib/utils";

export type UploadSectionProps = {
  onImageReady: (imageSrc: string) => void;
};

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/heic", "image/heif"];
const ACCEPTED_EXTENSIONS = /\.(jpe?g|png|heic|heif)$/i;

export function UploadSection({ onImageReady }: UploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);

      const isAccepted =
        ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.test(file.name);
      if (!isAccepted) {
        setError("Please upload a JPG, PNG, or HEIC photo.");
        return;
      }

      setIsProcessing(true);
      try {
        const converted = await convertHeicIfNeeded(file);
        const objectUrl = URL.createObjectURL(converted);
        onImageReady(objectUrl);
      } catch (err) {
        console.error(err);
        setError("Couldn't read that photo. Please try a different file.");
      } finally {
        setIsProcessing(false);
      }
    },
    [onImageReady],
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files?.[0];
      if (file) void processFile(file);
    },
    [processFile],
  );

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="button"
      tabIndex={0}
      aria-label="Upload a photo. Accepts JPG, PNG, or HEIC."
      aria-busy={isProcessing}
      onClick={() => inputRef.current?.click()}
      onKeyDown={handleKeyDown}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "group relative flex w-full max-w-md cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border border-dashed px-8 py-16 text-center outline-none transition-all duration-200",
        "border-white/15 bg-white/[0.03] backdrop-blur-xl",
        "hover:border-white/25 hover:bg-white/[0.05]",
        "focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        isDragging && "border-emerald-400/60 bg-emerald-400/[0.06]",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/png,image/heic,image/heif"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void processFile(file);
          event.target.value = "";
        }}
      />

      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/20 via-cyan-400/10 to-fuchsia-500/20 ring-1 ring-white/10 transition-transform duration-200",
          "group-hover:scale-105",
        )}
        aria-hidden="true"
      >
        {isProcessing ? (
          <Loader2 className="h-7 w-7 animate-spin text-white/90" />
        ) : (
          <ImageUp className="h-7 w-7 text-white/90" />
        )}
      </div>

      <div className="space-y-1">
        <p className="text-base font-medium text-white">
          {isProcessing ? "Preparing your photo…" : "Drop your photo here"}
        </p>
        <p className="text-sm text-white/50">
          or click to browse — JPG, PNG, HEIC
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-400">
          {error}
        </p>
      )}
    </motion.div>
  );
}
