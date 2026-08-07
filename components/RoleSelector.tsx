"use client";

import { cn } from "@/lib/utils";

export type Role = "hacker" | "organizer" | "volunteer" | "other";

export type RoleMeta = {
  value: Role;
  label: string;
  bg: string;
  text: string;
};

export const ROLES: RoleMeta[] = [
  { value: "hacker", label: "Hacker", bg: "#0b6839", text: "#fff9ed" },
  { value: "organizer", label: "Organizer", bg: "#f4d35e", text: "#17372a" },
  { value: "volunteer", label: "Volunteer", bg: "#e46647", text: "#fff9ed" },
  { value: "other", label: "Other", bg: "#5c7a89", text: "#fff9ed" },
];

export function getRoleMeta(role: Role): RoleMeta {
  return ROLES.find((r) => r.value === role) ?? ROLES[0];
}

export type RoleSelectorProps = {
  value: Role;
  onChange: (value: Role) => void;
  className?: string;
};

export function RoleSelector({ value, onChange, className }: RoleSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Your role"
      className={cn("flex flex-wrap justify-center gap-2", className)}
    >
      {ROLES.map((role) => {
        const isSelected = value === role.value;
        return (
          <button
            key={role.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(role.value)}
            style={
              isSelected ? { backgroundColor: role.bg, color: role.text } : undefined
            }
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors",
              isSelected
                ? "border-transparent"
                : "border-[#17372a]/20 text-[#17372a]/60 hover:border-[#17372a]/40 hover:text-[#17372a]",
            )}
          >
            {role.label}
          </button>
        );
      })}
    </div>
  );
}
