import { describe, expect, it } from "vitest";
import { estimateReadingMinutes } from "@/lib/content/read-time";

describe("estimateReadingMinutes", () => {
  it("returns at least one minute", () => {
    expect(estimateReadingMinutes("Hello world.")).toBe(1);
  });

  it("scales with word count", () => {
    const words = Array.from({ length: 400 }, () => "word").join(" ");
    expect(estimateReadingMinutes(words)).toBe(2);
  });
});
