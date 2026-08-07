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
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium transition-colors",
                  isActive && "border-emerald-400/60 bg-emerald-400/15 text-emerald-300",
                  isDone && "border-white/25 bg-white/10 text-white/70",
                  !isActive && !isDone && "border-white/10 text-white/30",
                )}
              >
                {isDone ? <Check className="h-3 w-3" aria-hidden="true" /> : index + 1}
              </span>
              <span
                className={cn(
                  "text-xs whitespace-nowrap",
                  isActive ? "text-white" : "hidden text-white/40 sm:inline",
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
                  isDone ? "bg-white/25" : "bg-white/10",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
