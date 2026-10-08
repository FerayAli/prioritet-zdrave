import Link from "next/link";
import { cloneElement, isValidElement, type ReactNode } from "react";
import type { Oil } from "@/lib/content/oils";

const oilLinkClassName =
  "text-plum underline decoration-plum/30 underline-offset-4 transition-opacity hover:opacity-60";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function byTitle(oils: Oil[]): Map<string, Oil> {
  const map = new Map<string, Oil>();
  for (const oil of oils) {
    map.set(oil.title.toLowerCase(), oil);
  }
  return map;
}

function oilNamePattern(oils: Oil[]): RegExp | null {
  const names = [...new Set(oils.map((oil) => oil.title))]
    .filter((title) => title.trim().length > 0)
    .sort((left, right) => right.length - left.length)
    .map(escapeRegExp);

  if (names.length === 0) return null;
  return new RegExp(`\\b(${names.join("|")})\\b`, "gi");
}

export function findOilsInText(text: string, oils: Oil[]): Oil[] {
  const pattern = oilNamePattern(oils);
  if (!pattern) return [];

  const lookup = byTitle(oils);
  const found = new Map<string, Oil>();
  for (const match of text.matchAll(pattern)) {
    const oil = lookup.get(match[0].toLowerCase());
    if (oil) found.set(oil.slug, oil);
  }
  return [...found.values()];
}

export function oilsForPost(post: { oils: string[]; body: string }, catalog: Oil[]): Oil[] {
  const bySlug = new Map(catalog.map((oil) => [oil.slug, oil]));
  const ordered = new Map<string, Oil>();

  for (const slug of post.oils) {
    const oil = bySlug.get(slug);
    if (oil) ordered.set(oil.slug, oil);
  }
  for (const oil of findOilsInText(post.body, catalog)) {
    ordered.set(oil.slug, oil);
  }
  return [...ordered.values()];
}

export function linkOilNames(text: string, oils: Oil[]): ReactNode {
  const pattern = oilNamePattern(oils);
  if (!pattern || text.length === 0) return text;

  const lookup = byTitle(oils);
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let index = 0;

  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    const oil = lookup.get(match[0].toLowerCase());
    if (oil) {
      nodes.push(
        <Link
          key={`${oil.slug}-${index}`}
          href={`/book/${oil.slug}`}
          className={oilLinkClassName}
        >
          {match[0]}
        </Link>,
      );
    } else {
      nodes.push(match[0]);
    }
    index += 1;
    cursor = start + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.length === 1 ? nodes[0] : nodes;
}

export function linkOilMentions(node: ReactNode, oils: Oil[]): ReactNode {
  if (oils.length === 0 || node == null || typeof node === "boolean") return node;
  if (typeof node === "string" || typeof node === "number") {
    return linkOilNames(String(node), oils);
  }
  if (Array.isArray(node)) {
    return node.map((child, index) => {
      const linked = linkOilMentions(child, oils);
      if (isValidElement(linked) && linked.key == null) {
        return cloneElement(linked, { key: index });
      }
      return linked;
    });
  }
  if (isValidElement<{ children?: ReactNode; href?: string }>(node)) {
    const type = node.type;
    const skip =
      type === "a" ||
      type === "code" ||
      type === "pre" ||
      (typeof type === "function" &&
        ((type as { displayName?: string }).displayName === "Link" ||
          type.name === "Link"));
    if (skip) return node;
    if (node.props.children == null) return node;
    return cloneElement(node, {
      children: linkOilMentions(node.props.children, oils),
    });
  }
  return node;
}
