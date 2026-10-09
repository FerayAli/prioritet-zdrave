import { PostCards } from "@/components/post-cards";
import { t } from "@/i18n/messages";
import type { PostCardItem } from "@/components/post-cards";
import { focusLabelKey, formatLabelKey } from "@/lib/hero";

export function PostList({ posts }: { posts: PostCardItem[] }) {
  return (
    <PostCards
      posts={posts}
      emptyLabel={t("search.empty")}
      tagsFor={(post) =>
        [
          t(formatLabelKey[post.format]),
          ...post.focus.map((focus) => t(focusLabelKey[focus])),
          post.everyday ? t("topic.everyday") : null,
          post.featured ? t("topic.mostLoved") : null,
        ]
          .filter(Boolean)
          .join(" · ")
      }
    />
  );
}
