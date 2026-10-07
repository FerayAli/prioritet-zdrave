import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  isFocus,
  isFormat,
  type Focus,
  type Post,
} from "@/lib/content/types";

const fixtureDirectory = path.join(process.cwd(), "test/fixtures/posts");
const realDirectory = path.join(process.cwd(), "content/posts");

export function listPosts(): Post[] {
  const realFiles = listMarkdown(realDirectory);
  return loadPosts(realFiles.length > 0 ? realDirectory : fixtureDirectory);
}

export function getPostBySlug(slug: string): Post | null {
  return listPosts().find((post) => post.slug === slug) ?? null;
}

export function loadPosts(directory: string): Post[] {
  return listMarkdown(directory)
    .map((filePath) => readPost(filePath))
    .sort(byDateThenTitle);
}

function listMarkdown(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(directory, name));
}

function readPost(filePath: string): Post {
  const slug = path.basename(filePath, ".md");
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const label = path.basename(filePath);

  const format = data.format;
  if (typeof format !== "string" || !isFormat(format)) {
    throw new Error(`${label}: format must be one of essential-oils, recipes, movement, stories`);
  }

  const focus = readFocus(data.focus, label);
  const title = requiredString(data.title, label, "title");
  const excerpt = requiredString(data.excerpt, label, "excerpt");
  const body = parsed.content.trim();

  if (!body) {
    throw new Error(`${label}: body is empty`);
  }

  const cover = data.cover;
  if (cover !== undefined && typeof cover !== "string") {
    throw new Error(`${label}: cover must be a path`);
  }

  return {
    title,
    slug,
    date: readDate(data.date, label),
    excerpt,
    body,
    cover,
    format,
    focus,
    everyday: data.everyday === true,
    featured: data.featured === true,
  };
}

function readFocus(value: unknown, label: string): Focus[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) {
    throw new Error(`${label}: focus must be a list`);
  }

  return value.map((item) => {
    if (typeof item !== "string" || !isFocus(item)) {
      throw new Error(
        `${label}: focus entries must be blood-sugar, sleep, stress, back, energy, or digestion`,
      );
    }
    return item;
  });
}

function requiredString(value: unknown, label: string, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label}: ${field} is required`);
  }
  return value.trim();
}

function readDate(value: unknown, label: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  throw new Error(`${label}: date must be YYYY-MM-DD`);
}

function byDateThenTitle(left: Post, right: Post): number {
  if (left.date !== right.date) return left.date < right.date ? 1 : -1;
  return left.title.localeCompare(right.title);
}
