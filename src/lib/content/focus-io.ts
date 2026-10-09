import { isFocus, type Focus } from "@/lib/content/types";

export function readFocus(value: unknown, label: string): Focus[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) {
    throw new Error(`${label}: focus must be a list`);
  }

  return value.map((item) => {
    if (typeof item !== "string" || !isFocus(item)) {
      throw new Error(
        `${label}: focus entries must be blood-sugar, sleep, stress, back, energy, or digestion`,
      );
    }
    return item;
  });
}
