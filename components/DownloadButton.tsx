"use client";

import { useCallback, useState, type RefObject } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, PRIMARY_CTA_CLASS, slugify } from "@/lib/utils";
import { exportNodeToPngBlob } from "@/lib/exportImage";

export type DownloadButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  name?: string;
  filenamePrefix?: string;
  label?: string;
  minWidth?: number;
};

export function DownloadButton({
  targetRef,
  name = "",
  filenamePrefix = "builder-id",
  label = "Download PNG",
  minWidth,
}: DownloadButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    const node = targetRef.current;
    if (!node) return;

    setError(null);
    setIsExporting(true);
    try {
      const blob = await exportNodeToPngBlob(node, minWidth);
      const slug = slugify(name);
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = slug ? `${filenamePrefix}-${slug}.png` : `${filenamePrefix}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
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
        className={cn("gap-2", PRIMARY_CTA_CLASS)}
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
