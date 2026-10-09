import { describe, expect, it } from "vitest";
import { parsePostQuery, searchChips, toSearchHref } from "@/lib/content/query";

describe("search query", () => {
  it("reads repeated focus params and flags", () => {
    expect(
      parsePostQuery({
        format: "movement",
        focus: ["back", "stress"],
        everyday: "1",
      }),
    ).toEqual({
      format: "movement",
      focus: ["stress", "back"],
      everyday: true,
    });
  });

  it("accepts a comma-separated focus list", () => {
    expect(parsePostQuery({ focus: "sleep,stress" }).focus).toEqual([
      "sleep",
      "stress",
    ]);
  });

  it("ignores unknown values instead of failing the page", () => {
    expect(parsePostQuery({ format: "training", focus: "nope" })).toEqual({});
  });

  it("reads page numbers above 1", () => {
    expect(parsePostQuery({ page: "3", format: "science" })).toEqual({
      format: "science",
      page: 3,
    });
    expect(parsePostQuery({ page: "1", format: "science" })).toEqual({
      format: "science",
    });
  });

  it("builds the back and mobility link with movement and back", () => {
    expect(
      toSearchHref({ format: "movement", focus: ["back"] }),
    ).toBe("/search?format=movement&focus=back");
  });

  it("opens science posts with the science format", () => {
    expect(toSearchHref({ format: "science" })).toBe("/search?format=science");
  });

  it("keeps page in search links when beyond the first page", () => {
    expect(toSearchHref({ format: "recipes", page: 2 })).toBe(
      "/search?format=recipes&page=2",
    );
  });

  it("builds removable chips that drop one filter at a time", () => {
    expect(
      searchChips({
        format: "recipes",
        focus: ["blood-sugar"],
        everyday: true,
      }).map((chip) => chip.href),
    ).toEqual([
      "/search?focus=blood-sugar&everyday=1",
      "/search?format=recipes&everyday=1",
      "/search?format=recipes&focus=blood-sugar",
    ]);
  });
});
