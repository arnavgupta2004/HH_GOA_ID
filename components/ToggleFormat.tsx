"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Format = "profile" | "card";

export type ToggleFormatProps = {
  value: Format;
  onChange: (value: Format) => void;
  className?: string;
};

const OPTIONS: { value: Format; label: string }[] = [
  { value: "profile", label: "Profile Frame" },
  { value: "card", label: "Builder Card" },
];

export function ToggleFormat({ value, onChange, className }: ToggleFormatProps) {
  return (
    <div
      role="tablist"
      aria-label="Choose a format"
      className={cn(
        "inline-flex items-center border border-[#17372a]/20 bg-[#efe2c9] p-1",
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative rounded-sm px-4 py-1.5 text-sm font-medium transition-colors",
              isSelected ? "text-[#fff9ed]" : "text-[#17372a]/60 hover:text-[#17372a]",
            )}
          >
            {isSelected && (
              <motion.span
                layoutId="toggle-format-pill"
                className="absolute inset-0 rounded-sm bg-[#e46647]"
                transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
