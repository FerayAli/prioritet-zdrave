import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getDisclaimerPage, readDisclaimer } from "@/lib/content/disclaimer";

describe("disclaimer page", () => {
  it("loads disclaimer copy from markdown", () => {
    const page = getDisclaimerPage();
    expect(page.title).toBe("Educational disclaimer");
    expect(page.body.length).toBeGreaterThan(100);
  });

  it("requires a title and a body", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-disclaimer-"));
    const filePath = path.join(directory, "disclaimer.md");
    fs.writeFileSync(
      filePath,
      ["---", "title: Disclaimer", "---", "", ""].join("\n"),
    );
    expect(() => readDisclaimer(filePath)).toThrow(/body/);
  });
});
