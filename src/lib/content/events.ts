import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type SiteEvent = {
  title: string;
  slug: string;
  date: string;
  time?: string;
  location: string;
  excerpt: string;
  cover?: string;
  body: string;
};

const realDirectory = path.join(process.cwd(), "content/events");
const fixtureDirectory = path.join(process.cwd(), "test/fixtures/events");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const timePattern = /^\d{2}:\d{2}$/;

export const listEvents = cache(function listEvents(): SiteEvent[] {
  const realFiles = listMarkdown(realDirectory);
  return loadEvents(realFiles.length > 0 ? realDirectory : fixtureDirectory);
});

export const getEventBySlug = cache(function getEventBySlug(
  slug: string,
): SiteEvent | null {
  return listEvents().find((event) => event.slug === slug) ?? null;
});

export function loadEvents(directory: string): SiteEvent[] {
  return listMarkdown(directory)
    .map((filePath) => readEvent(filePath))
    .sort(byDateThenTitle);
}

export function splitEvents(
  events: SiteEvent[],
  today: string,
): { upcoming: SiteEvent[]; past: SiteEvent[] } {
  const upcoming = events
    .filter((event) => event.date >= today)
    .sort(byDateAscending);
  const past = events
    .filter((event) => event.date < today)
    .sort(byDateThenTitle);
  return { upcoming, past };
}

export function readEvent(filePath: string): SiteEvent {
  const slug = path.basename(filePath, ".md");
  const label = path.basename(filePath);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const data = parsed.data as Record<string, unknown>;
  const body = parsed.content.trim();

  if (!slugPattern.test(slug)) {
    throw new Error(`${label}: filename must be a lowercase slug`);
  }
  if (!body) {
    throw new Error(`${label}: body is empty`);
  }

  const cover = data.cover;
  if (cover !== undefined && typeof cover !== "string") {
    throw new Error(`${label}: cover must be a path`);
  }

  return {
    title: requiredString(data.title, label, "title"),
    slug,
    date: readDate(data.date, label),
    time: readTime(data.time, label),
    location: requiredString(data.location, label, "location"),
    excerpt: requiredString(data.excerpt, label, "excerpt"),
    cover: typeof cover === "string" ? cover.trim() : undefined,
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

function readDate(value: unknown, label: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  throw new Error(`${label}: date must be YYYY-MM-DD`);
}

function readTime(value: unknown, label: string): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || !timePattern.test(value.trim())) {
    throw new Error(`${label}: time must be HH:MM`);
  }
  return value.trim();
}

function byDateThenTitle(left: SiteEvent, right: SiteEvent): number {
  if (left.date !== right.date) return left.date < right.date ? 1 : -1;
  return left.title.localeCompare(right.title);
}

function byDateAscending(left: SiteEvent, right: SiteEvent): number {
  if (left.date !== right.date) return left.date < right.date ? -1 : 1;
  const leftTime = left.time ?? "00:00";
  const rightTime = right.time ?? "00:00";
  if (leftTime !== rightTime) return leftTime < rightTime ? -1 : 1;
  return left.title.localeCompare(right.title);
}
