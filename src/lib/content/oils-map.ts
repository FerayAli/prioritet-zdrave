import type { Oil } from "@/lib/content/oils";
import { listOils } from "@/lib/content/oils";

export function oilsBySlugMap(slugs: string[]): Map<string, Oil> {
  const catalog = listOils();
  const bySlug = new Map(catalog.map((oil) => [oil.slug, oil]));
  const map = new Map<string, Oil>();
  for (const slug of slugs) {
    const oil = bySlug.get(slug);
    if (oil) map.set(slug, oil);
  }
  return map;
}
