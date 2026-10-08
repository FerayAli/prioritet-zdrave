import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadEvents, readEvent, splitEvents } from "@/lib/content/events";

const fixtureDirectory = path.join(process.cwd(), "test/fixtures/events");

describe("events", () => {
  it("loads date, place, cover, and body from markdown", () => {
    const events = loadEvents(fixtureDirectory);
    expect(events.map((event) => event.slug).sort()).toEqual([
      "autumn-walk-in-borisova",
      "oils-evening-in-sofia",
      "spring-circle-in-the-park",
    ]);

    const walk = events.find((event) => event.slug === "autumn-walk-in-borisova");
    expect(walk?.date).toBe("2026-11-15");
    expect(walk?.time).toBe("10:00");
    expect(walk?.location).toContain("Sofia");
    expect(walk?.cover).toMatch(/^\/images\//);
    expect(walk?.body.length).toBeGreaterThan(0);
  });

  it("splits upcoming and past by calendar day", () => {
    const events = loadEvents(fixtureDirectory);
    const { upcoming, past } = splitEvents(events, "2026-10-08");
    expect(upcoming.map((event) => event.slug)).toEqual([
      "autumn-walk-in-borisova",
      "oils-evening-in-sofia",
    ]);
    expect(past.map((event) => event.slug)).toEqual(["spring-circle-in-the-park"]);
  });

  it("requires a location and a body", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-events-"));
    const filePath = path.join(directory, "missing-place.md");
    fs.writeFileSync(
      filePath,
      [
        "---",
        "title: Missing place",
        'date: "2026-11-01"',
        "excerpt: No address.",
        "---",
        "",
        "Body text.",
        "",
      ].join("\n"),
    );
    expect(() => readEvent(filePath)).toThrow(/location/);
  });
});
