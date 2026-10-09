import { BodySystemIcon } from "@/components/body-system-icon";
import type { BodySystem } from "@/lib/content/types";

const sizes = {
  sm: "size-11",
  md: "size-14",
  lg: "size-16",
} as const;

const iconSizes = {
  sm: "sm" as const,
  md: "md" as const,
  lg: "lg" as const,
};

export function BodySystemBadge({
  id,
  size = "md",
}: {
  id: BodySystem;
  size?: keyof typeof sizes;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border border-line bg-paper text-plum shadow-sm ${sizes[size]}`}
    >
      <BodySystemIcon id={id} size={iconSizes[size]} />
    </span>
  );
}
