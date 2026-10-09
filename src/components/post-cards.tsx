import Image from "next/image";
import Link from "next/link";
import type { Focus, Format } from "@/lib/content/types";

export type PostCardItem = {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;
  format: Format;
  focus: Focus[];
  everyday: boolean;
  featured: boolean;
};

export function PostCards({
  posts,
  emptyLabel,
  tagsFor,
}: {
  posts: PostCardItem[];
  emptyLabel: string;
  tagsFor: (post: PostCardItem) => string;
}) {
  if (posts.length === 0) {
    return <p className="mt-8 text-lg text-ink/75">{emptyLabel}</p>;
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
              <p className="mt-3 text-sm">{tagsFor(post)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
