import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { filterPosts } from "@/lib/content/filter";
import { loadPosts } from "@/lib/content/posts";
import { bodySystems } from "@/lib/content/types";
import { heroCircles, heroTiles } from "@/lib/hero";

const howItWorksSections = [
  "## How does the system work?",
  "## Emotions and psychosomatics",
  "## Aromatherapy",
  "## Daily care",
  "## Scientific sources",
];

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
    expect(
      posts.find((post) => post.slug === "citrus-morning-blend")?.oils,
    ).toEqual(["bergamot", "wild-orange", "lemon"]);
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

  it("rejects a body-map note without a system", () => {
    const directory = writePost(
      `---
title: Bad
date: "2026-01-01"
excerpt: Nope
format: body-map
---

Sample body.
`,
    );

    expect(() => loadPosts(directory)).toThrow(/system/);
  });

  it("rejects an unknown system and a system on another format", () => {
    expect(() =>
      loadPosts(
        writePost(
          `---
title: Bad
date: "2026-01-01"
excerpt: Nope
format: body-map
system: aura
guide: true
---

Sample body.
`,
        ),
      ),
    ).toThrow(/system/);

    expect(() =>
      loadPosts(
        writePost(
          `---
title: Bad
date: "2026-01-01"
excerpt: Nope
format: science
system: skin
---

Sample body.
`,
        ),
      ),
    ).toThrow(/body-map/);
  });

  it("requires exactly one guide when a system has notes", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-posts-"));
    fs.writeFileSync(
      path.join(directory, "one.md"),
      `---
title: One
date: "2026-01-01"
excerpt: Nope
format: body-map
system: skin
---

Sample body.
`,
    );

    expect(() => loadPosts(directory)).toThrow(/guide/);
  });
});

describe("published body map", () => {
  const posts = loadPosts(path.join(process.cwd(), "content/posts"));

  it("gives every system one guide in the how-it-works shape", () => {
    const guides = posts.filter((post) => post.guide);
    expect(guides.map((post) => post.system).sort()).toEqual([...bodySystems].sort());

    for (const post of guides) {
      expect(post.format, post.slug).toBe("body-map");
      for (const heading of howItWorksSections) {
        expect(post.body, `${post.slug} ${heading}`).toContain(heading);
      }
    }
  });
});

function writePost(markdown: string): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-posts-"));
  fs.writeFileSync(path.join(directory, "bad.md"), markdown);
  return directory;
}
