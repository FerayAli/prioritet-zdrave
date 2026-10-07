import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getContactPage, readContact } from "@/lib/content/contact";

describe("contact page", () => {
  it("loads example owner fields from markdown", () => {
    const contact = getContactPage();
    expect(contact.name).toBe("Example Owner");
    expect(contact.email).toBe("hello@example.com");
    expect(contact.body.length).toBeGreaterThan(0);
  });

  it("requires a name and a body", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pz-contact-"));
    const filePath = path.join(directory, "contact.md");
    fs.writeFileSync(
      filePath,
      ["---", "title: Contacts", "---", "", "A short bio with no owner name.", ""].join(
        "\n",
      ),
    );
    expect(() => readContact(filePath)).toThrow(/name/);
  });
});
