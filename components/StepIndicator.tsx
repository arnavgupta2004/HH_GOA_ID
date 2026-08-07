import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepIndicatorStep = {
  key: string;
  label: string;
};

export type StepIndicatorProps = {
  steps: StepIndicatorStep[];
  currentKey: string;
};

export function StepIndicator({ steps, currentKey }: StepIndicatorProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentKey);

  return (
    <ol className="flex items-center" aria-label="Progress">
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isDone = index < currentIndex;

        return (
          <li key={step.key} className="flex items-center">
            <div className="flex items-center gap-2">
              <span
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors",
                  isActive && "border-[#0B6839] bg-[#0B6839] text-[#fff9ed]",
                  isDone && "border-[#17372a]/35 bg-[#e8d9bc] text-[#17372a]",
                  !isActive && !isDone && "border-[#17372a]/20 text-[#17372a]/40",
                )}
              >
                {isDone ? <Check className="h-3 w-3" aria-hidden="true" /> : index + 1}
              </span>
              <span
                className={cn(
                  "text-xs whitespace-nowrap",
                  isActive ? "text-[#17372a]" : "hidden text-[#17372a]/45 sm:inline",
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "mx-2 h-px w-4 shrink-0 sm:mx-3 sm:w-10",
                  isDone ? "bg-[#17372a]/35" : "bg-[#17372a]/15",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
