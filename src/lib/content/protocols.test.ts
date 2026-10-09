import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadProtocols, readProtocol } from "@/lib/content/protocols";

describe("protocols", () => {
  it("loads fixture protocols with phases", () => {
    const directory = path.join(process.cwd(), "test/fixtures/protocols");
    const protocols = loadProtocols(directory);
    expect(protocols.map((item) => item.slug)).toEqual(["acne-support"]);
    expect(protocols[0]?.phases).toHaveLength(2);
    expect(protocols[0]?.phases[0]?.oils[0]?.slug).toBe("tea-tree");
  });

  it("rejects protocols without phases", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-protocol-"));
    const filePath = path.join(directory, "flat.md");
    fs.writeFileSync(
      filePath,
      ["---", "title: Flat", "excerpt: Flat", "phases: []", "---", "Body."].join("\n"),
    );
    expect(() => loadProtocols(directory)).toThrow(/phases/);
  });

  it("requires a non-empty body", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-protocol-"));
    const filePath = path.join(directory, "empty.md");
    fs.writeFileSync(
      filePath,
      [
        "---",
        "title: Empty",
        "excerpt: Empty",
        "phases:",
        "  - title: One",
        "    duration: 7 days",
        "    schedule: daily",
        "    method: diffuse",
        "    oils:",
        "      - slug: lavender",
        "        drops: 1",
        "---",
        "",
      ].join("\n"),
    );
    expect(() => readProtocol(filePath, new Set(["lavender"]))).toThrow(/body/);
  });
});
