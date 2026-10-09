import {
  isApplicationMethod,
  type ApplicationMethod,
  type BlendLine,
} from "@/lib/content/types";

export function readBlendLines(
  value: unknown,
  label: string,
  knownOils: Set<string>,
  field: string,
): BlendLine[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label}: ${field} must be a non-empty list`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`${label}: ${field}[${index}] must be an object`);
    }
    const record = item as Record<string, unknown>;
    const slug = record.slug;
    if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(`${label}: ${field}[${index}].slug must be a lowercase oil slug`);
    }
    if (!knownOils.has(slug)) {
      throw new Error(`${label}: unknown oil "${slug}" in ${field}`);
    }
    const drops = record.drops;
    if (typeof drops !== "number" || !Number.isInteger(drops) || drops < 1) {
      throw new Error(`${label}: ${field}[${index}].drops must be a positive integer`);
    }
    return { slug, drops };
  });
}

export function readApplicationMethod(
  value: unknown,
  label: string,
  field: string,
): ApplicationMethod {
  if (typeof value !== "string" || !isApplicationMethod(value)) {
    throw new Error(
      `${label}: ${field} must be one of diffuse, topical-diluted, inhale`,
    );
  }
  return value;
}

export function oilSlugsFromBlend(lines: BlendLine[]): string[] {
  return lines.map((line) => line.slug);
}
