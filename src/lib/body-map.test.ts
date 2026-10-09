import { describe, expect, it } from "vitest";
import { groupBodyMapPosts, guideHref } from "@/lib/body-map";
import type { Post } from "@/lib/content/types";

function post(overrides: Partial<Post> & Pick<Post, "slug">): Post {
  return {
    title: overrides.slug,
    date: "2026-01-01",
    excerpt: "Sample",
    body: "Sample",
    format: "body-map",
    guide: false,
    focus: [],
    oils: [],
    everyday: false,
    featured: false,
    ...overrides,
  };
}

describe("body map groups", () => {
  it("lists every note on a system and sends the icon to the guide", () => {
    const guide = post({
      slug: "guide",
      title: "Guide",
      date: "2026-09-01",
      system: "nervous",
      guide: true,
    });
    const extra = post({
      slug: "extra",
      title: "Extra",
      date: "2026-10-01",
      system: "nervous",
    });
    const other = post({ slug: "recipe", format: "recipes" });

    expect(groupBodyMapPosts([extra, other, guide])).toEqual([
      { id: "nervous", posts: [guide, extra] },
    ]);
    expect(guideHref([extra, guide], "nervous")).toBe("/blog/guide");
    expect(guideHref([other], "digestive")).toBeNull();
  });
});
