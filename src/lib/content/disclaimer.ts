import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type DisclaimerPage = {
  title: string;
  body: string;
};

const realFile = path.join(process.cwd(), "content/disclaimer.md");
const fixtureFile = path.join(process.cwd(), "test/fixtures/disclaimer.md");

export const getDisclaimerPage = cache(function getDisclaimerPage(): DisclaimerPage {
  const filePath = fs.existsSync(realFile) ? realFile : fixtureFile;
  if (!fs.existsSync(filePath)) {
    throw new Error("Missing content/disclaimer.md");
  }
  return readDisclaimer(filePath);
});

export function readDisclaimer(filePath: string): DisclaimerPage {
  const label = path.basename(filePath);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const data = parsed.data as Record<string, unknown>;
  const body = parsed.content.trim();

  if (!body) {
    throw new Error(`${label}: body is empty`);
  }

  return {
    title: requiredString(data.title, label, "title"),
    body,
  };
}

function requiredString(value: unknown, label: string, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label}: ${field} is required`);
  }
  return value.trim();
}
