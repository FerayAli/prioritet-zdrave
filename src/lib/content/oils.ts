import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Oil = {
  title: string;
  slug: string;
  latin?: string;
  aroma?: string;
  excerpt: string;
  body: string;
};

export const aromaOrder = [
  "Citrus",
  "Floral",
  "Herbaceous",
  "Camphoraceous",
  "Spicy",
  "Resinous",
  "Woody",
  "Earthy",
] as const;

export function groupOilsByAroma(oils: Oil[]): { aroma: string; oils: Oil[] }[] {
  const groups = new Map<string, Oil[]>();
  for (const oil of oils) {
    const aroma = oil.aroma ?? "Other";
    const list = groups.get(aroma) ?? [];
    list.push(oil);
    groups.set(aroma, list);
  }

  const ordered = aromaOrder
    .filter((aroma) => groups.has(aroma))
    .map((aroma) => ({ aroma, oils: groups.get(aroma)! }));

  for (const [aroma, list] of groups) {
    if (!(aromaOrder as readonly string[]).includes(aroma)) {
      ordered.push({ aroma, oils: list });
    }
  }

  return ordered;
}

const realDirectory = path.join(process.cwd(), "content/oils");
const fixtureDirectory = path.join(process.cwd(), "test/fixtures/oils");
const oilSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function listOils(): Oil[] {
  const realFiles = listMarkdown(realDirectory);
  return loadOils(realFiles.length > 0 ? realDirectory : fixtureDirectory);
}

export function getOilBySlug(slug: string): Oil | null {
  return listOils().find((oil) => oil.slug === slug) ?? null;
}

export function listOilSlugs(): string[] {
  return listOils().map((oil) => oil.slug);
}

export function loadOils(directory: string): Oil[] {
  return listMarkdown(directory)
    .map((filePath) => readOil(filePath))
    .sort((left, right) => left.title.localeCompare(right.title));
}

export function readOil(filePath: string): Oil {
  const slug = path.basename(filePath, ".md");
  const label = path.basename(filePath);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const data = parsed.data as Record<string, unknown>;
  const body = parsed.content.trim();

  if (!oilSlugPattern.test(slug)) {
    throw new Error(`${label}: filename must be a lowercase slug`);
  }

  const title = requiredString(data.title, label, "title");
  const excerpt = requiredString(data.excerpt, label, "excerpt");
  const latin = optionalString(data.latin, label, "latin");
  const aroma = optionalString(data.aroma, label, "aroma");

  if (!body) {
    throw new Error(`${label}: body is empty`);
  }

  return {
    title,
    slug,
    latin,
    aroma,
    excerpt,
    body,
  };
}

function listMarkdown(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(directory, name));
}

function requiredString(value: unknown, label: string, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label}: ${field} is required`);
  }
  return value.trim();
}

function optionalString(
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
