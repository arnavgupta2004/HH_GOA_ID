import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { getRoleMeta, type Role } from "@/components/RoleSelector";

export type ProfileFrameProps = {
  imageSrc: string;
  roleType: Role;
  gradientIndex?: number;
  className?: string;
};

export const ProfileFrame = forwardRef<HTMLDivElement, ProfileFrameProps>(
  function ProfileFrame({ imageSrc, roleType, className }, ref) {
    const roleMeta = getRoleMeta(roleType);

    return (
      <div
        ref={ref}
        className={cn(
          "relative aspect-square w-full max-w-sm overflow-hidden border-2 border-[#17372a] bg-[#0b6839] shadow-[8px_8px_0_#e46647]",
          className,
        )}
      >
        <div aria-hidden="true" className="absolute -right-[18%] -top-[15%] h-[53%] w-[53%] rounded-full border-[22px] border-[#f4d35e]/80" />
        <div aria-hidden="true" className="absolute bottom-[13%] left-0 h-px w-full bg-[#fff9ed]/35" />
        <div aria-hidden="true" className="absolute bottom-[15%] left-0 h-px w-full border-t border-dashed border-[#fff9ed]/35" />

        <div className="relative flex h-full flex-col items-center px-[9%] pb-[8%] pt-[8%]">
          <div className="flex w-full items-start justify-between text-[#fff9ed]">
            <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.18em]">
              Hacker House<br />Goa 2026
            </p>
            <span
              style={{ backgroundColor: roleMeta.bg, color: roleMeta.text }}
              className="px-2 py-1 text-[8px] font-bold uppercase tracking-[0.14em]"
            >
              {roleMeta.label}
            </span>
          </div>

          <div className="relative mt-auto mb-auto aspect-square w-[72%] rounded-full border-[13px] border-[#f4d35e] bg-[#fff9ed] p-[3%] shadow-[5px_5px_0_rgba(23,55,42,0.35)]">
            <div className="h-full w-full overflow-hidden rounded-full border-2 border-[#17372a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc} alt="Profile" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex w-full items-end justify-between text-[#fff9ed]">
            <p className="max-w-32 font-heading text-lg font-semibold leading-none">Meet me where ideas get sunburnt.</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hh-logo.jpg"
              alt="Hacker House Goa 2026"
              className="h-11 w-11 rounded-sm border-2 border-[#fff9ed]"
            />
          </div>
        </div>
      </div>
    );
  },
);
