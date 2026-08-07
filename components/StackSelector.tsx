"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

export type StackSelectorProps = {
  value: string[];
  onChange: (value: string[]) => void;
  max?: number;
};

const SUGGESTIONS = [
  "Python",
  "TypeScript",
  "Rust",
  "Go",
  "React",
  "Next.js",
  "PyTorch",
  "TensorFlow",
  "CUDA",
  "LLMs",
  "WebGPU",
  "AWS",
  "Docker",
  "Kubernetes",
  "Node.js",
];

export function StackSelector({ value, onChange, max = 8 }: StackSelectorProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = useCallback(
    (raw: string) => {
      const tag = raw.trim();
      if (!tag || value.length >= max) return;
      const alreadyAdded = value.some((v) => v.toLowerCase() === tag.toLowerCase());
      if (alreadyAdded) return;
      onChange([...value, tag]);
    },
    [value, onChange, max],
  );

  const removeTag = useCallback(
    (tag: string) => {
      onChange(value.filter((v) => v !== tag));
    },
    [value, onChange],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(inputValue);
      setInputValue("");
    } else if (event.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const isFull = value.length >= max;
  const available = SUGGESTIONS.filter(
    (s) => !value.some((v) => v.toLowerCase() === s.toLowerCase()),
  );

  return (
    <div className="w-full space-y-3">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2" role="list" aria-label="Selected stack">
          {value.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-sm text-white"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
                className="rounded-full text-white/50 transition-colors hover:text-white"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isFull ? `Max ${max} reached` : "Type a skill and press Enter…"}
        disabled={isFull}
        aria-label="Add a stack or skill"
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus-visible:border-emerald-400/50 focus-visible:ring-2 focus-visible:ring-emerald-400/20 disabled:opacity-50"
      />

      {!isFull && available.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {available.slice(0, 10).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addTag(suggestion)}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/60 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
