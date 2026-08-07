"use client";

import { useCallback, type RefObject } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  text = DEFAULT_TWEET_TEXT,
  className,
}: ShareButtonProps) {
  const handleShare = useCallback(() => {
    // An intent URL cannot attach a browser-generated image, but it can
    // reliably open X's post composer with the message prefilled. Navigating
    // the current tab avoids popup blockers swallowing window.open().
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.location.assign(intentUrl);
  }, [text]);

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleShare}
      className={cn("gap-2", className)}
    >
      <XLogo className="h-3.5 w-3.5" aria-hidden="true" />
      Post on X
    </Button>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
