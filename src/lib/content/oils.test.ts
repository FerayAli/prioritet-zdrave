import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getOilBySlug, groupOilsByAroma, listOils, readOil } from "@/lib/content/oils";
import { listPostsUsingOil } from "@/lib/content/posts";

describe("oil book", () => {
  it("loads the oil book from markdown", () => {
    const slugs = listOils().map((oil) => oil.slug);
    expect(slugs).toContain("ginger");
    expect(slugs).toContain("lavender");
    expect(slugs).toContain("peppermint");
    expect(slugs.length).toBeGreaterThan(40);
    expect(getOilBySlug("peppermint")?.title).toBe("Peppermint");
    expect(getOilBySlug("peppermint")?.aroma).toBe("Camphoraceous");
  });

  it("groups oils by aroma family", () => {
    const groups = groupOilsByAroma(listOils());
    expect(groups.map((group) => group.aroma)[0]).toBe("Citrus");
    expect(groups.some((group) => group.oils.some((oil) => oil.slug === "lemon"))).toBe(
      true,
    );
  });

  it("lists recipe posts that use an oil", () => {
    expect(listPostsUsingOil("peppermint").map((post) => post.slug)).toEqual([
      "ginger-and-mint-blend",
    ]);
  });

  it("requires a title and a body", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-oil-"));
    const filePath = path.join(directory, "empty.md");
    fs.writeFileSync(filePath, ["---", "excerpt: Hi", "---", "", ""].join("\n"));
    expect(() => readOil(filePath)).toThrow(/title/);
  });
});
