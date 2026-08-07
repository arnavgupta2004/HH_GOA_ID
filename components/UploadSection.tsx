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
        "group relative flex w-full max-w-md cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed px-8 py-16 text-center outline-none transition-all duration-200",
        "border-[#0B6839]/45 bg-[#fff9ed]/80 shadow-[6px_6px_0_rgba(23,55,42,0.12)]",
        "hover:border-[#0B6839] hover:bg-[#fff9ed] hover:shadow-[8px_8px_0_rgba(228,102,71,0.3)]",
        "focus-visible:ring-2 focus-visible:ring-[#e46647]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4ead6]",
        isDragging && "border-[#e46647] bg-[#f4d35e]/20",
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
          "flex h-16 w-16 items-center justify-center rounded-sm bg-[#0B6839] text-[#fff9ed] transition-transform duration-200",
          "group-hover:scale-105",
        )}
        aria-hidden="true"
      >
        {isProcessing ? (
          <Loader2 className="h-7 w-7 animate-spin" />
        ) : (
          <ImageUp className="h-7 w-7" />
        )}
      </div>

      <div className="space-y-1">
        <p className="font-heading text-xl font-semibold text-[#17372a]">
          {isProcessing ? "Preparing your photo…" : "Drop your photo here"}
        </p>
        <p className="text-sm text-[#17372a]/60">
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
