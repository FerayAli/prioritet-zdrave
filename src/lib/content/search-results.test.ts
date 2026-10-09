import path from "node:path";
import { describe, expect, it } from "vitest";
import { filterProtocols, filterSymptoms } from "@/lib/content/filter";
import { loadProtocols } from "@/lib/content/protocols";
import { loadSymptoms } from "@/lib/content/symptoms";
import { searchContent, searchResultCount } from "@/lib/content/search-results";

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
    expect(results.symptoms.some((item) => item.slug === "headache")).toBe(true);
    expect(results.protocols.some((item) => item.slug === "acne-support")).toBe(true);
  });
});
