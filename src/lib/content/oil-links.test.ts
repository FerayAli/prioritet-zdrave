import { describe, expect, it } from "vitest";
import { findOilsInText, oilsForPost } from "@/lib/content/oil-links";
import type { Oil } from "@/lib/content/oils";

const oils: Oil[] = [
  {
    title: "Ginger",
    slug: "ginger",
    excerpt: "Warm",
    body: "Warm",
  },
  {
    title: "Peppermint",
    slug: "peppermint",
    excerpt: "Cool",
    body: "Cool",
  },
  {
    title: "Cinnamon bark",
    slug: "cinnamon-bark",
    excerpt: "Spice",
    body: "Spice",
  },
];

describe("oil mentions in posts", () => {
  it("finds oil titles in plain text", () => {
    expect(
      findOilsInText("A digestion recipe with ginger and peppermint.", oils).map(
        (oil) => oil.slug,
      ),
    ).toEqual(["ginger", "peppermint"]);
  });

  it("does not match oil names inside other words", () => {
    expect(findOilsInText("The baseline gingerly avoided oils.", oils)).toEqual([]);
  });

  it("keeps frontmatter oils first, then names found in the body", () => {
    const mentioned = oilsForPost(
      {
        oils: ["peppermint"],
        body: "Add ginger after the peppermint.",
      },
      oils,
    ).map((oil) => oil.slug);
    expect(mentioned).toEqual(["peppermint", "ginger"]);
  });
});
