import Image from "next/image";
import Link from "next/link";
import { t } from "@/i18n/messages";
import type { Post } from "@/lib/content/types";
import { focusLabelKey, formatLabelKey } from "@/lib/hero";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="mt-8 text-lg text-ink/75">{t("search.empty")}</p>;
  }

  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="block overflow-hidden border border-line bg-white"
          >
            {post.cover ? (
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.cover}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="p-5">
              <h2 className="font-serif text-2xl font-semibold leading-tight text-ink">
                {post.title}
              </h2>
              <p className="mt-2 leading-relaxed">{post.excerpt}</p>
              <p className="mt-3 text-sm">
                {[
                  t(formatLabelKey[post.format]),
                  ...post.focus.map((focus) => t(focusLabelKey[focus])),
                  post.everyday ? t("topic.everyday") : null,
                  post.featured ? t("topic.mostLoved") : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
