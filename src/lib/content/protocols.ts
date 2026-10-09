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
import type { Protocol, ProtocolPhase } from "@/lib/content/types";

const realDirectory = path.join(process.cwd(), "content/protocols");
const fixtureDirectory = path.join(process.cwd(), "test/fixtures/protocols");

export const listProtocols = cache(function listProtocols(): Protocol[] {
  const realFiles = listMarkdown(realDirectory);
  return loadProtocols(realFiles.length > 0 ? realDirectory : fixtureDirectory);
});

export const getProtocolBySlug = cache(function getProtocolBySlug(
  slug: string,
): Protocol | null {
  return listProtocols().find((protocol) => protocol.slug === slug) ?? null;
});

export const listProtocolsUsingOil = cache(function listProtocolsUsingOil(
  oilSlug: string,
): Protocol[] {
  return listProtocols().filter((protocol) =>
    protocol.phases.some((phase) =>
      phase.oils.some((line) => line.slug === oilSlug),
    ),
  );
});

export function loadProtocols(directory: string): Protocol[] {
  const knownOils = new Set(listOilSlugs());
  return listMarkdown(directory)
    .map((filePath) => readProtocol(filePath, knownOils))
    .sort((left, right) => left.title.localeCompare(right.title));
}

export function readProtocol(filePath: string, knownOils: Set<string>): Protocol {
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
  const focus = readFocus(data.focus, label);
  const severity = optionalString(data.severity, label, "severity");
  const phases = readPhases(data.phases, label, knownOils);

  if (!body) {
    throw new Error(`${label}: body is empty`);
  }

  return {
    title,
    slug,
    excerpt,
    body,
    focus,
    severity,
    phases,
  };
}

function readPhases(
  value: unknown,
  label: string,
  knownOils: Set<string>,
): ProtocolPhase[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label}: phases must be a non-empty list`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`${label}: phases[${index}] must be an object`);
    }
    const record = item as Record<string, unknown>;
    const phaseLabel = `${label}: phases[${index}]`;
    return {
      title: requiredString(record.title, phaseLabel, "title"),
      duration: requiredString(record.duration, phaseLabel, "duration"),
      oils: readBlendLines(record.oils, phaseLabel, knownOils, "oils"),
      schedule: requiredString(record.schedule, phaseLabel, "schedule"),
      method: readApplicationMethod(record.method, phaseLabel, "method"),
    };
  });
}

export function listProtocolSlugs(): string[] {
  return listProtocols().map((protocol) => protocol.slug);
}

export function protocolOilSlugs(protocol: Protocol): string[] {
  const slugs = new Set<string>();
  for (const phase of protocol.phases) {
    for (const slug of oilSlugsFromBlend(phase.oils)) {
      slugs.add(slug);
    }
  }
  return [...slugs];
}
