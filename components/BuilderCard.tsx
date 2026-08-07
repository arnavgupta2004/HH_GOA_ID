import { forwardRef } from "react";
import { QrCode, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGradient } from "@/lib/gradients";

export type BuilderCardProps = {
  imageSrc: string;
  name: string;
  role: string;
  builderTitle: string;
  stack: string[];
  gradientIndex?: number;
  className?: string;
};

export const BuilderCard = forwardRef<HTMLDivElement, BuilderCardProps>(
  function BuilderCard(
    { imageSrc, name, role, builderTitle, stack, gradientIndex = 0, className },
    ref,
  ) {
    const displayName = name.trim() || "Your Name";
    const displayRole = role.trim() || "Builder";

    return (
      <div
        ref={ref}
        className={cn(
          "relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]",
          className,
        )}
        style={{ background: getGradient(gradientIndex) }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-fuchsia-500/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-teal-400/25 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: "url(/decorative-pattern.svg)",
              backgroundSize: "160px 160px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />
        </div>

        <div className="relative flex h-full flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hh-logo.svg"
              alt="Hacker House Goa 2026"
              className="h-5 w-auto opacity-90"
            />
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
              Builder
            </span>
          </div>

          <div className="mt-2 flex flex-1 flex-col items-center justify-center text-center">
            <div className="relative shrink-0">
              <div
                className="absolute inset-0 -z-10 rounded-3xl bg-white/25 blur-2xl"
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={`${displayName}'s photo`}
                className="h-24 w-24 rounded-3xl object-cover ring-2 ring-white/40 sm:h-36 sm:w-36"
              />
            </div>

            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:mt-4 sm:text-2xl sm:text-[1.7rem]">
              {displayName}
            </h2>
            <p className="mt-0.5 text-sm text-white/70">{displayRole}</p>

            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm sm:mt-3">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {builderTitle}
            </div>

            {stack.length > 0 && (
              <div className="mt-3 flex flex-wrap justify-center gap-1.5 px-2 sm:mt-4">
                {stack.slice(0, 6).map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-medium text-white/85 ring-1 ring-white/15"
                  >
                    {item}
                  </span>
                ))}
                {stack.length > 6 && (
                  <span className="rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-medium text-white/85 ring-1 ring-white/15">
                    +{stack.length - 6}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div className="text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Hacker House
              </p>
              <p className="text-sm font-semibold text-white">Goa 2026</p>
            </div>
            <div
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/95"
              aria-hidden="true"
            >
              <QrCode className="h-7 w-7 text-black" />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
