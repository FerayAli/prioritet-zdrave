import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { filterPosts } from "@/lib/content/filter";
import { loadPosts } from "@/lib/content/posts";
import { heroCircles, heroTiles } from "@/lib/hero";

const fixtureDirectory = path.join(process.cwd(), "test/fixtures/posts");

describe("fixture posts", () => {
  const posts = loadPosts(fixtureDirectory);

  it("loads a markdown post for every hero link", () => {
    expect(posts.length).toBeGreaterThan(0);

    for (const link of [...heroTiles, ...heroCircles]) {
      expect(
        filterPosts(posts, link.query).length,
        link.labelKey,
      ).toBeGreaterThan(0);
    }
  });

  it("keeps the after-lunch walk out of back and mobility", () => {
    const matches = filterPosts(posts, {
      format: "movement",
      focus: ["back"],
    }).map((post) => post.slug);

    expect(matches).toContain("floor-stretch-for-the-back");
    expect(matches).not.toContain("walk-after-lunch");
  });

  it("keeps oil slugs on recipes that name them", () => {
    const blend = posts.find((post) => post.slug === "ginger-and-mint-blend");
    expect(blend?.oils).toEqual(["ginger", "peppermint"]);
  });

  it("rejects a fixture that uses an unknown format", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-posts-"));
    fs.writeFileSync(
      path.join(directory, "bad.md"),
      `---
title: Bad
date: "2026-01-01"
excerpt: Nope
format: training
focus: []
---

Sample body.
`,
    );

    expect(() => loadPosts(directory)).toThrow(/format/);
  });

  it("rejects a post that names an oil that is not in the book", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-posts-"));
    fs.writeFileSync(
      path.join(directory, "bad.md"),
      `---
title: Bad
date: "2026-01-01"
excerpt: Nope
format: recipes
focus: []
oils:
  - not-an-oil
---

Sample body.
`,
    );

    expect(() => loadPosts(directory)).toThrow(/unknown oil/);
  });
});
