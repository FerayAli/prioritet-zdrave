import Image from "next/image";
import Link from "next/link";
import { t } from "@/i18n/messages";
import type { Post } from "@/lib/content/types";
import { formatLabelKey } from "@/lib/hero";

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="px-4 pt-12 pb-4 lg:px-0">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-slab text-sm font-bold uppercase tracking-[0.25em] text-ink">
          {t("home.featured")}
        </h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block md:hover:opacity-60">
                {post.cover ? (
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="object-cover"
                    />
                  </span>
                ) : null}
                <p className="mt-4 font-nav text-[0.6875rem] font-bold tracking-[0.12em] text-yellow uppercase">
                  {t(formatLabelKey[post.format])}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-ink">
                  {post.title}
                </h3>
                <p className="mt-2 leading-relaxed">{post.excerpt}</p>
              </Link>
            </li>
          ))}
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
