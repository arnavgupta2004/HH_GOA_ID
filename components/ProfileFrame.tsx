import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { getGradient, RING_GRADIENT } from "@/lib/gradients";

export type ProfileFrameProps = {
  imageSrc: string;
  gradientIndex?: number;
  className?: string;
};

export const ProfileFrame = forwardRef<HTMLDivElement, ProfileFrameProps>(
  function ProfileFrame({ imageSrc, gradientIndex = 1, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn("relative aspect-square w-full max-w-sm", className)}
        style={{ background: "#050608" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-[4%] rounded-full opacity-70 blur-3xl"
          style={{ background: getGradient(gradientIndex) }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "url(/decorative-pattern.svg)",
            backgroundSize: "140px 140px",
          }}
        />

        <PalmAccent className="absolute top-[6%] left-[4%] h-8 w-8 -rotate-12 text-white/20 sm:h-10 sm:w-10" />
        <PalmAccent className="absolute right-[5%] bottom-[10%] h-8 w-8 rotate-[160deg] text-white/15 sm:h-10 sm:w-10" />

        <div
          className="absolute inset-[6%] rounded-full p-[3.5%] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
          style={{ background: RING_GRADIENT }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full bg-black ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt="Profile" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]" />
          </div>
        </div>

        <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3.5 py-1.5 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.7)] backdrop-blur-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hh-logo.svg"
              alt="Hacker House Goa 2026"
              className="h-3.5 w-auto opacity-95"
            />
          </div>
        </div>
      </div>
    );
  },
);

function PalmAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 36c0-10 1-16 5-20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M25 16c-3-4-3-8 0-12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M25 16c1-5 4-8 9-9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M25 16c-2-5-6-7-11-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M25 16c3-3 7-3 11-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
