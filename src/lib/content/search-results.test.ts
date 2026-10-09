import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { filterProtocols, filterSymptoms } from "@/lib/content/filter";
import * as postsModule from "@/lib/content/posts";
import * as protocolsModule from "@/lib/content/protocols";
import * as symptomsModule from "@/lib/content/symptoms";
import { loadProtocols } from "@/lib/content/protocols";
import { loadSymptoms } from "@/lib/content/symptoms";
import type { Post } from "@/lib/content/types";
import {
  hasActiveFilters,
  SEARCH_BROAD_CATALOG_LIMIT,
  SEARCH_PAGE_SIZES,
  searchContent,
  searchResultCount,
} from "@/lib/content/search-results";

describe("searchContent", () => {
  const symptoms = loadSymptoms(path.join(process.cwd(), "test/fixtures/symptoms"));
  const protocols = loadProtocols(path.join(process.cwd(), "test/fixtures/protocols"));

  it("includes symptoms and protocols when format is essential-oils", () => {
    const filteredSymptoms = filterSymptoms(symptoms, { format: "essential-oils" });
    const filteredProtocols = filterProtocols(protocols, { format: "essential-oils" });
    expect(filteredSymptoms.length).toBeGreaterThan(0);
    expect(filteredProtocols.length).toBeGreaterThan(0);
  });

  it("excludes symptoms and protocols when format is recipes", () => {
    expect(filterSymptoms(symptoms, { format: "recipes" })).toEqual([]);
    expect(filterProtocols(protocols, { format: "recipes" })).toEqual([]);
  });

  it("filters symptoms by focus", () => {
    const digestion = filterSymptoms(symptoms, { focus: ["digestion"] });
    expect(digestion.map((item) => item.slug)).toEqual(["upset-stomach"]);
  });

  it("counts unified search results", () => {
    const results = searchContent({ focus: ["stress"] });
    expect(searchResultCount(results)).toBeGreaterThan(0);
    expect(results.symptoms.items.some((item) => item.slug === "headache")).toBe(true);
    expect(results.protocols.items.some((item) => item.slug === "acne-support")).toBe(true);
  });

  it("paginates each section independently", () => {
    const results = searchContent({ focus: ["stress"], page: 1 });
    expect(results.posts.items.length).toBeLessThanOrEqual(SEARCH_PAGE_SIZES.posts);
    expect(results.symptoms.items.length).toBeLessThanOrEqual(SEARCH_PAGE_SIZES.symptoms);
    expect(results.protocols.items.length).toBeLessThanOrEqual(SEARCH_PAGE_SIZES.protocols);
  });

  it("requires filters before searching a very large catalog", () => {
    const stubPost = (index: number): Post => ({
      title: `Post ${index}`,
      slug: `post-${index}`,
      date: "2026-01-01",
      excerpt: "Sample",
      body: "Sample",
      format: "stories",
      guide: false,
      focus: [],
      oils: [],
      everyday: false,
      featured: false,
    });

    const posts = Array.from(
      { length: SEARCH_BROAD_CATALOG_LIMIT + 1 },
      (_, index) => stubPost(index),
    );

    vi.spyOn(postsModule, "listPosts").mockReturnValue(posts);
    vi.spyOn(symptomsModule, "listSymptoms").mockReturnValue([]);
    vi.spyOn(protocolsModule, "listProtocols").mockReturnValue([]);

    expect(hasActiveFilters({})).toBe(false);
    const blocked = searchContent({});
    expect(blocked.needsFilters).toBe(true);
    expect(searchResultCount(blocked)).toBe(0);

    const allowed = searchContent({ format: "stories" });
    expect(allowed.needsFilters).toBe(false);
    expect(allowed.posts.total).toBe(SEARCH_BROAD_CATALOG_LIMIT + 1);

    vi.restoreAllMocks();
  });
});
