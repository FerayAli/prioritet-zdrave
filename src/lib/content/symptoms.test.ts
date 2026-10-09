import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadSymptoms, readSymptom } from "@/lib/content/symptoms";

describe("symptoms", () => {
  it("loads fixture symptoms with validated blends", () => {
    const directory = path.join(process.cwd(), "test/fixtures/symptoms");
    const symptoms = loadSymptoms(directory);
    expect(symptoms.map((item) => item.slug).sort()).toEqual(["headache", "upset-stomach"]);
    const headache = symptoms.find((item) => item.slug === "headache");
    expect(headache?.oils).toEqual([
      { slug: "lavender", drops: 3 },
      { slug: "wild-orange", drops: 1 },
    ]);
    expect(headache?.method).toBe("diffuse");
  });

  it("rejects unknown oils", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-symptom-"));
    const filePath = path.join(directory, "bad.md");
    fs.writeFileSync(
      filePath,
      [
        "---",
        "title: Bad",
        "excerpt: Bad",
        "schedule: daily",
        "method: diffuse",
        "oils:",
        "  - slug: not-an-oil",
        "    drops: 1",
        "---",
        "Body.",
      ].join("\n"),
    );
    expect(() => loadSymptoms(directory)).toThrow(/unknown oil/);
  });

  it("requires a non-empty body", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-symptom-"));
    const filePath = path.join(directory, "empty.md");
    fs.writeFileSync(
      filePath,
      [
        "---",
        "title: Empty",
        "excerpt: Empty",
        "schedule: daily",
        "method: inhale",
        "oils:",
        "  - slug: lavender",
        "    drops: 1",
        "---",
        "",
      ].join("\n"),
    );
    expect(() => readSymptom(filePath, new Set(["lavender"]), new Set())).toThrow(/body/);
  });
});
