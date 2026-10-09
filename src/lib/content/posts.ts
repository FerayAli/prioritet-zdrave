import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { listOilSlugs } from "@/lib/content/oils";
import {
  bodySystems,
  isBodySystem,
  isFocus,
  isFormat,
  formats,
  type BodySystem,
  type Focus,
  type Format,
  type Post,
} from "@/lib/content/types";

const fixtureDirectory = path.join(process.cwd(), "test/fixtures/posts");
const realDirectory = path.join(process.cwd(), "content/posts");

export const listPosts = cache(function listPosts(): Post[] {
  const realFiles = listMarkdown(realDirectory);
  return loadPosts(realFiles.length > 0 ? realDirectory : fixtureDirectory);
});

export const getPostBySlug = cache(function getPostBySlug(slug: string): Post | null {
  return listPosts().find((post) => post.slug === slug) ?? null;
});

export const listPostsUsingOil = cache(function listPostsUsingOil(slug: string): Post[] {
  return listPosts().filter((post) => post.oils.includes(slug));
});

export function loadPosts(directory: string): Post[] {
  const knownOils = new Set(listOilSlugs());
  const posts = listMarkdown(directory)
    .map((filePath) => readPost(filePath, knownOils))
    .sort(byDateThenTitle);
  validateBodyMapGuides(posts);
  return posts;
}

function listMarkdown(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(directory, name));
}

function readPost(filePath: string, knownOils: Set<string>): Post {
  const slug = path.basename(filePath, ".md");
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const label = path.basename(filePath);

  const format = data.format;
  if (typeof format !== "string" || !isFormat(format)) {
    throw new Error(`${label}: format must be one of ${formats.join(", ")}`);
  }

  const system = readSystem(data.system, format, label);
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
    system,
    guide: readGuide(data.guide, system, label),
    focus,
    oils: readOils(data.oils, label, knownOils),
    everyday: data.everyday === true,
    featured: data.featured === true,
  };
}

function readOils(value: unknown, label: string, knownOils: Set<string>): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) {
    throw new Error(`${label}: oils must be a list of oil slugs`);
  }

  return value.map((item) => {
    if (typeof item !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item)) {
      throw new Error(`${label}: oils entries must be lowercase slugs`);
    }
    if (!knownOils.has(item)) {
      throw new Error(`${label}: unknown oil "${item}"`);
    }
    return item;
  });
}

function readSystem(
  value: unknown,
  format: Format,
  label: string,
): BodySystem | undefined {
  if (value === undefined || value === "") {
    if (format === "body-map") {
      throw new Error(`${label}: body-map posts need a system`);
    }
    return undefined;
  }

  if (typeof value !== "string" || !isBodySystem(value)) {
    throw new Error(`${label}: system must be one of ${bodySystems.join(", ")}`);
  }

  if (format !== "body-map") {
    throw new Error(`${label}: system is only used on body-map posts`);
  }

  return value;
}

function readGuide(
  value: unknown,
  system: BodySystem | undefined,
  label: string,
): boolean {
  if (value === undefined) return false;
  if (typeof value !== "boolean") {
    throw new Error(`${label}: guide must be true or false`);
  }
  if (value && !system) {
    throw new Error(`${label}: guide requires a system`);
  }
  return value;
}

function validateBodyMapGuides(posts: Post[]): void {
  for (const system of bodySystems) {
    const matches = posts.filter((post) => post.system === system);
    if (matches.length === 0) continue;
    const guides = matches.filter((post) => post.guide).length;
    if (guides !== 1) {
      throw new Error(
        `body map: "${system}" needs exactly one guide post, found ${guides}`,
      );
    }
  }
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
