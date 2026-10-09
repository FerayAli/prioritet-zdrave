import fs from "node:fs";
import path from "node:path";

export const contentSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function listMarkdown(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(directory, name));
}

export function requiredString(value: unknown, label: string, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label}: ${field} is required`);
  }
  return value.trim();
}

export function optionalString(
  value: unknown,
  label: string,
  field: string,
): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label}: ${field} must be text`);
  }
  return value.trim();
}
