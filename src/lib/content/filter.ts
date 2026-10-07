import type { Post, PostQuery } from "@/lib/content/types";

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
