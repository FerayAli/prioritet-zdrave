import Image from "next/image";
import Link from "next/link";
import { t } from "@/i18n/messages";
import { estimateReadingMinutes } from "@/lib/content/read-time";
import type { Format, Post } from "@/lib/content/types";
import { formatLabelKey } from "@/lib/hero";

const formatPillClassName: Record<Format, string> = {
  "essential-oils": "bg-yellow",
  recipes: "bg-yellow",
  movement: "bg-yellow",
  stories: "bg-plum",
  science: "bg-plum",
};

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="px-4 pt-12 pb-4 lg:px-0">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-slab text-sm font-bold uppercase tracking-[0.25em] text-ink">
          {t("home.featured")}
        </h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {posts.map((post) => {
            const readMinutes = estimateReadingMinutes(post.body);
            const readTime = t("post.readMinutes", { minutes: String(readMinutes) });
            const formatLabel = t(formatLabelKey[post.format]);

            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper md:hover:opacity-60"
                >
                  {post.cover ? (
                    <span className="relative block aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.cover}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 360px, 100vw"
                        className="object-cover"
                      />
                      <span
                        className={`absolute top-3 left-3 rounded-full px-3 py-1 font-nav text-[0.625rem] font-bold tracking-[0.12em] text-white uppercase ${formatPillClassName[post.format]}`}
                      >
                        {formatLabel}
                      </span>
                    </span>
                  ) : (
                    <span
                      className={`mx-5 mt-5 w-fit rounded-full px-3 py-1 font-nav text-[0.625rem] font-bold tracking-[0.12em] text-white uppercase ${formatPillClassName[post.format]}`}
                    >
                      {formatLabel}
                    </span>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-2xl font-semibold leading-tight text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{readTime}</p>
                    <p className="mt-2 leading-relaxed text-muted">{post.excerpt}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function StartHereCue() {
  return (
    <p className="mx-auto max-w-6xl px-4 pt-12 text-center text-lg leading-relaxed lg:px-0">
      {t("home.startHereCue")}{" "}
      <Link
        href="/start-here"
        className="font-nav text-sm font-bold tracking-widest text-plum uppercase"
      >
        {t("nav.startHere")}
      </Link>
    </p>
  );
}
