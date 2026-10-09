import type { MessageKey } from "@/i18n/keys";
import {
  isFocus,
  isFormat,
  type Focus,
  type PostQuery,
} from "@/lib/content/types";

type SearchParams = Record<string, string | string[] | undefined>;

function valuesOf(
  params: SearchParams,
  name: string,
): string[] {
  const value = params[name];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return [value];
  return [];
}

export function parsePostQuery(params: SearchParams): PostQuery {
  const formatValue = valuesOf(params, "format").find((value) => value.length > 0);
  const format = formatValue && isFormat(formatValue) ? formatValue : undefined;

  const focus = valuesOf(params, "focus")
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(isFocus);

  const query: PostQuery = {};

  if (format) query.format = format;
  if (focus.length > 0) query.focus = uniqueFocus(focus);
  if (valuesOf(params, "everyday").includes("1")) query.everyday = true;
  if (valuesOf(params, "featured").includes("1")) query.featured = true;

  return query;
}

function uniqueFocus(focus: Focus[]): Focus[] {
  return focusesInOrder.filter((item) => focus.includes(item));
}

const focusesInOrder: Focus[] = [
  "blood-sugar",
  "sleep",
  "stress",
  "back",
  "energy",
  "digestion",
];

export function toSearchHref(query: PostQuery): string {
  const params = new URLSearchParams();

  if (query.format) params.set("format", query.format);
  for (const focus of query.focus ?? []) params.append("focus", focus);
  if (query.everyday) params.set("everyday", "1");
  if (query.featured) params.set("featured", "1");

  const search = params.toString();
  return search ? `/search?${search}` : "/search";
}

export type SearchChip = {
  id: string;
  href: string;
  labelKey: MessageKey;
};

export function searchChips(query: PostQuery): SearchChip[] {
  const chips: SearchChip[] = [];

  if (query.format) {
    chips.push({
      id: `format-${query.format}`,
      href: toSearchHref({ ...query, format: undefined }),
      labelKey: formatChipKey[query.format],
    });
  }

  for (const focus of query.focus ?? []) {
    chips.push({
      id: `focus-${focus}`,
      href: toSearchHref({
        ...query,
        focus: (query.focus ?? []).filter((item) => item !== focus),
      }),
      labelKey: focusChipKey[focus],
    });
  }

  if (query.everyday) {
    chips.push({
      id: "everyday",
      href: toSearchHref({ ...query, everyday: undefined }),
      labelKey: "topic.everyday",
    });
  }

  if (query.featured) {
    chips.push({
      id: "featured",
      href: toSearchHref({ ...query, featured: undefined }),
      labelKey: "topic.mostLoved",
    });
  }

  return chips;
}

const formatChipKey = {
  "essential-oils": "hero.tile.oils",
  recipes: "hero.tile.recipes",
  movement: "hero.tile.movement",
  stories: "hero.tile.stories",
  science: "hero.tile.science",
  "body-map": "format.bodyMap",
} as const;

const focusChipKey = {
  "blood-sugar": "topic.bloodSugar",
  sleep: "topic.sleep",
  stress: "topic.stress",
  back: "topic.back",
  energy: "topic.energy",
  digestion: "topic.digestion",
} as const;
