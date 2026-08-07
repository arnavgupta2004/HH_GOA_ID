"use client";

import { useCallback, useState, type RefObject } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, slugify } from "@/lib/utils";
import { exportNodeToPngBlob } from "@/lib/exportImage";

export type ShareButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  name?: string;
  filenamePrefix?: string;
  text?: string;
  className?: string;
};

const DEFAULT_TWEET_TEXT =
  "Heading to Hacker House Goa 🌴\n\nHere's my Builder ID.\n\n#FrameInGoa";

export function ShareButton({
  targetRef,
  name = "",
  filenamePrefix = "builder-id",
  text = DEFAULT_TWEET_TEXT,
  className,
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = useCallback(async () => {
    const node = targetRef.current;
    if (!node) return;

    setError(null);
    setIsSharing(true);
    try {
      const blob = await exportNodeToPngBlob(node);
      const slug = slugify(name);
      const filename = slug ? `${filenamePrefix}-${slug}.png` : `${filenamePrefix}.png`;
      const file = new File([blob], filename, { type: "image/png" });

      // On devices that support sharing files (most mobile browsers),
      // this hands the real image + caption straight to the OS share
      // sheet, so sharing to X attaches the actual graphic.
      if (typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
        await navigator.share({ text, files: [file] });
        return;
      }

      // Desktop fallback: X's web intent has no way to attach a file, so
      // open a prefilled compose window and let the user attach the PNG
      // they've already downloaded.
      const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(intentUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // User dismissed the native share sheet — not an error.
        return;
      }
      console.error(err);
      setError("Couldn't share. Try downloading instead.");
    } finally {
      setIsSharing(false);
    }
  }, [targetRef, name, filenamePrefix, text]);

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleShare}
        disabled={isSharing}
        className={cn("gap-2", className)}
      >
        {isSharing ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        ) : (
          <XLogo className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        Share on X
      </Button>
      {error && (
        <p role="alert" className="text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
