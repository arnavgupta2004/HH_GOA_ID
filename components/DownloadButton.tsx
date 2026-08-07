"use client";

import { useCallback, useState, type RefObject } from "react";
import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";

export type DownloadButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  name: string;
  filenamePrefix?: string;
  label?: string;
  minWidth?: number;
};

const DEFAULT_MIN_WIDTH = 2048;

export function DownloadButton({
  targetRef,
  name,
  filenamePrefix = "builder-id",
  label = "Download PNG",
  minWidth = DEFAULT_MIN_WIDTH,
}: DownloadButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    const node = targetRef.current;
    if (!node) return;

    setError(null);
    setIsExporting(true);
    try {
      const width = node.getBoundingClientRect().width || node.offsetWidth;
      const pixelRatio = Math.max(2, Math.ceil(minWidth / width));

      const dataUrl = await toPng(node, {
        pixelRatio,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${filenamePrefix}-${slugify(name) || "builder"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      setError("Couldn't generate the image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [targetRef, name, filenamePrefix, minWidth]);

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        type="button"
        onClick={handleDownload}
        disabled={isExporting}
        className="gap-2 bg-gradient-to-r from-teal-300 to-emerald-400 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.5)] hover:brightness-105"
      >
        {isExporting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Generating…
          </>
        ) : (
          <>
            <Download className="h-4 w-4" aria-hidden="true" />
            {label}
          </>
        )}
      </Button>
      {error && (
        <p role="alert" className="text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
