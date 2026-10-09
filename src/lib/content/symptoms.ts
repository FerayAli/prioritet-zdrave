import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import {
  readApplicationMethod,
  readBlendLines,
  oilSlugsFromBlend,
} from "@/lib/content/blend-io";
import { readFocus } from "@/lib/content/focus-io";
import {
  contentSlugPattern,
  listMarkdown,
  optionalString,
  requiredString,
} from "@/lib/content/markdown-io";
import { listOilSlugs } from "@/lib/content/oils";
import { listProtocolSlugs } from "@/lib/content/protocols";
import type { Symptom } from "@/lib/content/types";

const realDirectory = path.join(process.cwd(), "content/symptoms");
const fixtureDirectory = path.join(process.cwd(), "test/fixtures/symptoms");

export const listSymptoms = cache(function listSymptoms(): Symptom[] {
  const realFiles = listMarkdown(realDirectory);
  return loadSymptoms(realFiles.length > 0 ? realDirectory : fixtureDirectory);
});

export const getSymptomBySlug = cache(function getSymptomBySlug(
  slug: string,
): Symptom | null {
  return listSymptoms().find((symptom) => symptom.slug === slug) ?? null;
});

export const listSymptomsUsingOil = cache(function listSymptomsUsingOil(
  oilSlug: string,
): Symptom[] {
  return listSymptoms().filter((symptom) =>
    symptom.oils.some((line) => line.slug === oilSlug),
  );
});

export function loadSymptoms(directory: string): Symptom[] {
  const knownOils = new Set(listOilSlugs());
  const knownProtocols = new Set(listProtocolSlugs());
  return listMarkdown(directory)
    .map((filePath) => readSymptom(filePath, knownOils, knownProtocols))
    .sort((left, right) => left.title.localeCompare(right.title));
}

export function readSymptom(
  filePath: string,
  knownOils: Set<string>,
  knownProtocols: Set<string>,
): Symptom {
  const slug = path.basename(filePath, ".md");
  const label = path.basename(filePath);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const data = parsed.data as Record<string, unknown>;
  const body = parsed.content.trim();

  if (!contentSlugPattern.test(slug)) {
    throw new Error(`${label}: filename must be a lowercase slug`);
  }

  const title = requiredString(data.title, label, "title");
  const excerpt = requiredString(data.excerpt, label, "excerpt");
  const schedule = requiredString(data.schedule, label, "schedule");
  const oils = readBlendLines(data.oils, label, knownOils, "oils");
  const method = readApplicationMethod(data.method, label, "method");
  const focus = readFocus(data.focus, label);
  const relatedProtocol = optionalString(data.relatedProtocol, label, "relatedProtocol");

  if (relatedProtocol !== undefined && !knownProtocols.has(relatedProtocol)) {
    throw new Error(`${label}: unknown relatedProtocol "${relatedProtocol}"`);
  }

  if (!body) {
    throw new Error(`${label}: body is empty`);
  }

  return {
    title,
    slug,
    excerpt,
    body,
    focus,
    oils,
    schedule,
    method,
    relatedProtocol,
  };
}

export function listSymptomSlugs(): string[] {
  return listSymptoms().map((symptom) => symptom.slug);
}

export function symptomOilSlugs(symptom: Symptom): string[] {
  return oilSlugsFromBlend(symptom.oils);
}
