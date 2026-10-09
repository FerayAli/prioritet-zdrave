import type { Post, PostQuery, Protocol, Symptom } from "@/lib/content/types";

export function filterPosts(posts: Post[], query: PostQuery): Post[] {
  return posts.filter((post) => {
    if (query.format && post.format !== query.format) return false;

    if (query.focus) {
      for (const focus of query.focus) {
        if (!post.focus.includes(focus)) return false;
      }
    }

    if (query.everyday && !post.everyday) return false;
    if (query.featured && !post.featured) return false;

    return true;
  });
}

function matchesFocus<T extends { focus: Post["focus"] }>(
  item: T,
  query: PostQuery,
): boolean {
  if (!query.focus) return true;
  for (const focus of query.focus) {
    if (!item.focus.includes(focus)) return false;
  }
  return true;
}

export function filterSymptoms(symptoms: Symptom[], query: PostQuery): Symptom[] {
  if (query.everyday || query.featured) return [];
  if (query.format && query.format !== "essential-oils") return [];

  return symptoms.filter((symptom) => matchesFocus(symptom, query));
}

export function filterProtocols(protocols: Protocol[], query: PostQuery): Protocol[] {
  if (query.everyday || query.featured) return [];
  if (query.format && query.format !== "essential-oils") return [];

  return protocols.filter((protocol) => matchesFocus(protocol, query));
}
