import { describe, expect, it } from "vitest";
import { filterPosts } from "@/lib/content/filter";
import type { Post } from "@/lib/content/types";

function post(overrides: Partial<Post> & Pick<Post, "slug" | "format">): Post {
  return {
    title: overrides.slug,
    date: "2026-01-01",
    excerpt: "Sample",
    body: "Sample post for filter checks.",
    focus: [],
    oils: [],
    everyday: false,
    featured: false,
    ...overrides,
  };
}

const posts: Post[] = [
  post({
    slug: "lavender",
    format: "essential-oils",
    focus: ["sleep", "stress"],
    everyday: true,
    featured: true,
  }),
  post({
    slug: "walk",
    format: "movement",
    focus: ["energy", "blood-sugar"],
    everyday: true,
  }),
  post({
    slug: "stretch",
    format: "movement",
    focus: ["back"],
    everyday: true,
  }),
  post({
    slug: "story",
    format: "stories",
    focus: ["stress"],
    featured: true,
  }),
  post({
    slug: "study",
    format: "science",
    focus: ["sleep"],
  }),
];

describe("filterPosts", () => {
  it("requires every selected facet", () => {
    expect(
      filterPosts(posts, { format: "movement", focus: ["back"] }).map(
        (entry) => entry.slug,
      ),
    ).toEqual(["stretch"]);
  });

  it("keeps a focus match across formats when no format is selected", () => {
    expect(
      filterPosts(posts, { focus: ["stress"] }).map((entry) => entry.slug),
    ).toEqual(["lavender", "story"]);
  });

  it("keeps science posts out of other formats", () => {
    expect(
      filterPosts(posts, { format: "science" }).map((entry) => entry.slug),
    ).toEqual(["study"]);
    expect(
      filterPosts(posts, { format: "stories" }).map((entry) => entry.slug),
    ).toEqual(["story"]);
  });

  it("treats everyday and most loved as separate flags", () => {
    expect(
      filterPosts(posts, { featured: true }).map((entry) => entry.slug),
    ).toEqual(["lavender", "story"]);
    expect(
      filterPosts(posts, { everyday: true, format: "stories" }),
    ).toEqual([]);
  });
});
