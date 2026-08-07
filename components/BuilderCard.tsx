import { forwardRef } from "react";
import { QrCode, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRoleMeta, type Role } from "@/components/RoleSelector";

export type BuilderCardProps = {
  imageSrc: string;
  name: string;
  role: string;
  roleType: Role;
  builderTitle: string;
  stack: string[];
  gradientIndex?: number;
  className?: string;
};

export const BuilderCard = forwardRef<HTMLDivElement, BuilderCardProps>(
  function BuilderCard({ imageSrc, name, role, roleType, builderTitle, stack, className }, ref) {
    const displayName = name.trim() || "Your Name";
    const displayRole = role.trim() || "Builder";
    const roleMeta = getRoleMeta(roleType);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex aspect-[4/5] w-full max-w-sm flex-col overflow-hidden border-2 border-[#17372a] bg-[#fff9ed] text-[#17372a] shadow-[9px_9px_0_#e46647]",
          className,
        )}
      >
        {/* Header zone: height follows its own content, with a floor that
            matches the intended proportions for short names. Wrapped
            two-line names simply grow this section instead of spilling
            past a fixed-height overlay. */}
        <div className="relative min-h-[39%] shrink-0 border-b border-[#17372a]/20 bg-[#0b6839] px-5 pt-5 pb-6 text-[#fff9ed] sm:px-6 sm:pt-6">
          <div
            aria-hidden="true"
            className="absolute -right-12 top-8 h-40 w-40 rounded-full border-[18px] border-[#f4d35e]/70"
          />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 overflow-hidden rounded-sm ring-1 ring-white/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hh-logo.jpg"
                  alt="Hacker House Goa 2026"
                  data-export-photo
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-[10px] font-bold uppercase leading-tight tracking-[0.16em] text-[#fff9ed]">
                Hacker House<br />Goa 2026
              </p>
            </div>
            <span
              style={{ backgroundColor: roleMeta.bg, color: roleMeta.text }}
              className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
            >
              {roleMeta.label}
            </span>
          </div>

          <div className="relative mt-7 flex items-end gap-4">
            <div className="shrink-0 border-2 border-[#fff9ed] bg-[#f4d35e] p-1 shadow-[3px_3px_0_rgba(23,55,42,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={`${displayName}'s photo`}
                data-export-photo
                className="h-24 w-24 object-cover sm:h-28 sm:w-28"
              />
            </div>
            <div className="pb-1 text-[#fff9ed]">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f4d35e]">
                Here to build
              </p>
              <h2 className="mt-1 break-words font-heading text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
                {displayName}
              </h2>
            </div>
          </div>
        </div>

        {/* Body zone: fills whatever height remains. */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#17372a]/50">
              What I do
            </p>
            <p className="mt-1 break-words text-base font-semibold leading-tight">{displayRole}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 bg-[#f4d35e] px-2.5 py-1 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {builderTitle}
            </div>
          </div>

          {stack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {stack.slice(0, 6).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#17372a]/30 px-2.5 py-1 text-[10px] font-semibold"
                >
                  {item}
                </span>
              ))}
              {stack.length > 6 && (
                <span className="rounded-full border border-[#17372a]/30 px-2.5 py-1 text-[10px] font-semibold">
                  +{stack.length - 6}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-end justify-between border-t border-dashed border-[#17372a]/35 pt-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#e46647]">Arrival note</p>
              <p className="mt-0.5 font-heading text-lg font-semibold">See you in Goa.</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center border border-[#17372a] bg-[#fff9ed]" aria-hidden="true">
              <QrCode className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
