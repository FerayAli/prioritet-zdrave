import type { MessageKey } from "@/i18n/keys";
import { bodySystems, type BodySystem, type Post } from "@/lib/content/types";

export const bodySystemLabelKey: Record<BodySystem, MessageKey> = {
  nervous: "bodyMap.system.nervous",
  endocrine: "bodyMap.system.endocrine",
  respiratory: "bodyMap.system.respiratory",
  cardiovascular: "bodyMap.system.cardiovascular",
  immune: "bodyMap.system.immune",
  lymphatic: "bodyMap.system.lymphatic",
  digestive: "bodyMap.system.digestive",
  urinary: "bodyMap.system.urinary",
  musculoskeletal: "bodyMap.system.musculoskeletal",
  skin: "bodyMap.system.skin",
  "womens-health": "bodyMap.system.womensHealth",
  sensory: "bodyMap.system.sensory",
};

/** Six rows flanking the figure — left and right share the same row for alignment. */
export const bodyMapRows: readonly [left: BodySystem, right: BodySystem][] = [
  ["nervous", "endocrine"],
  ["sensory", "immune"],
  ["respiratory", "lymphatic"],
  ["cardiovascular", "musculoskeletal"],
  ["digestive", "skin"],
  ["urinary", "womens-health"],
];

/**
 * Even steps from head to feet on the figure (same span as the original five-row map,
 * with one extra row for the two added systems).
 */
export const bodyMapRowTops = ["12%", "27%", "42%", "57%", "72%", "87%"] as const;

export type BodyMapGroup = {
  id: BodySystem;
  posts: Post[];
};

export function groupBodyMapPosts(posts: Post[]): BodyMapGroup[] {
  return bodySystems
    .map((id) => ({
      id,
      posts: posts.filter((post) => post.system === id).sort(byGuideThenDate),
    }))
    .filter((group) => group.posts.length > 0);
}

export function guideHref(posts: Post[], id: BodySystem): string | null {
  const matches = posts.filter((post) => post.system === id);
  const guide = matches.find((post) => post.guide) ?? matches[0];
  return guide ? `/blog/${guide.slug}` : null;
}

function byGuideThenDate(left: Post, right: Post): number {
  if (left.guide !== right.guide) return left.guide ? -1 : 1;
  if (left.date !== right.date) return left.date < right.date ? 1 : -1;
  return left.title.localeCompare(right.title);
}
