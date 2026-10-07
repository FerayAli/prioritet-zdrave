import { describe, expect, it } from "vitest";
import { toSearchHref } from "@/lib/content/query";
import { heroCircles, heroTiles, navLinks } from "@/lib/hero";

describe("hero links", () => {
  it("sends each tile to search with one format", () => {
    expect(heroTiles.map((tile) => toSearchHref(tile.query))).toEqual([
      "/search?format=essential-oils",
      "/search?format=recipes",
      "/search?format=movement",
      "/search?format=stories",
    ]);
  });

  it("opens back and mobility with movement and back already selected", () => {
    const back = heroCircles.find((circle) => circle.labelKey === "topic.back");
    expect(back).toBeDefined();
    expect(toSearchHref(back!.query)).toBe(
      "/search?format=movement&focus=back",
    );
  });

  it("lists header routes in Pinch-of-Yum order", () => {
    expect(navLinks.map((link) => link.href)).toEqual([
      "/",
      "/about",
      "/recipes",
      "/start-here",
      "/search",
    ]);
  });
});
