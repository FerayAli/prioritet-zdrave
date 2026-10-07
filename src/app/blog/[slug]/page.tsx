import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { proseMarkdown } from "@/components/markdown-prose";
import { t } from "@/i18n/messages";
import { getOilBySlug } from "@/lib/content/oils";
import { toSearchHref } from "@/lib/content/query";
import { getPostBySlug, listPosts } from "@/lib/content/posts";
import { focusLabelKey, formatLabelKey } from "@/lib/hero";

export function generateStaticParams() {
  return listPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: post?.title ?? t("notFound.title") };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const published = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${post.date}T00:00:00Z`));

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <p>
        <Link
          href="/search"
          className="font-sans text-xs font-bold uppercase tracking-widest text-plum hover:underline"
        >
          {t("post.back")}
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-ink/60">{published}</p>
      <p className="mt-3 text-sm text-ink/70">
        <Link href={toSearchHref({ format: post.format })} className="underline-offset-4 hover:underline">
          {t(formatLabelKey[post.format])}
        </Link>
        {post.focus.map((focus) => (
          <span key={focus}>
            {" · "}
            <Link
              href={toSearchHref({ focus: [focus] })}
              className="underline-offset-4 hover:underline"
            >
              {t(focusLabelKey[focus])}
            </Link>
          </span>
        ))}
      </p>
      {post.cover ? (
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[1.4rem]">
          <Image
            src={post.cover}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 42rem, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      {post.oils.length > 0 ? (
        <p className="mt-4 text-sm text-ink/70">
          {t("book.oilsUsed")}
          {": "}
          {post.oils.map((slug, index) => {
            const oil = getOilBySlug(slug);
            return (
              <span key={slug}>
                {index > 0 ? ", " : null}
                <Link
                  href={`/book/${slug}`}
                  className="text-plum underline-offset-4 hover:underline"
                >
                  {oil?.title ?? slug}
                </Link>
              </span>
            );
          })}
        </p>
      ) : null}
      <div className="mt-8">
        <ReactMarkdown components={proseMarkdown}>{post.body}</ReactMarkdown>
      </div>
    </article>
  );
}
