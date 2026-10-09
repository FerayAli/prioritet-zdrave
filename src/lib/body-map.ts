import type { MessageKey } from "@/i18n/keys";
import { bodySystems, type BodySystem, type Post } from "@/lib/content/types";

export const bodySystemLabelKey: Record<BodySystem, MessageKey> = {
  nervous: "bodyMap.system.nervous",
  endocrine: "bodyMap.system.endocrine",
  respiratory: "bodyMap.system.respiratory",
  cardiovascular: "bodyMap.system.cardiovascular",
  immune: "bodyMap.system.immune",
  digestive: "bodyMap.system.digestive",
  urinary: "bodyMap.system.urinary",
  musculoskeletal: "bodyMap.system.musculoskeletal",
  skin: "bodyMap.system.skin",
  "womens-health": "bodyMap.system.womensHealth",
};

export type BodySystemSpot = {
  id: BodySystem;
  side: "left" | "right";
  /** Center of the icon, as a percentage of the figure height. */
  top: string;
};

/** Flanking icons. No connector lines — the circles sit beside the figure. */
export const bodySystemSpots: BodySystemSpot[] = [
  { id: "nervous", side: "left", top: "14%" },
  { id: "respiratory", side: "left", top: "32%" },
  { id: "cardiovascular", side: "left", top: "44%" },
  { id: "digestive", side: "left", top: "60%" },
  { id: "urinary", side: "left", top: "76%" },
  { id: "endocrine", side: "right", top: "22%" },
  { id: "immune", side: "right", top: "38%" },
  { id: "skin", side: "right", top: "54%" },
  { id: "womens-health", side: "right", top: "68%" },
  { id: "musculoskeletal", side: "right", top: "82%" },
];

/** Icon ink, matched to the reference badges rather than the site plum. */
export const bodySystemColor: Record<BodySystem, string> = {
  nervous: "#e07a93",
  respiratory: "#3d8fd4",
  cardiovascular: "#e23b3b",
  digestive: "#e06a45",
  urinary: "#c4473e",
  endocrine: "#e08a32",
  immune: "#1f8f86",
  musculoskeletal: "#d4a017",
  skin: "#c47a3a",
  "womens-health": "#c43d86",
};

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
