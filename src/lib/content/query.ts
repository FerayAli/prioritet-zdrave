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
