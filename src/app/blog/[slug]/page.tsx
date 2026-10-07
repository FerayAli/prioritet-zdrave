import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { t } from "@/i18n/messages";
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
      <div className="mt-8">
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="mt-4 text-lg leading-relaxed text-ink/90">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className="mt-8 font-serif text-2xl font-semibold text-ink">{children}</h2>
            ),
            ul: ({ children }) => (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-lg leading-relaxed">{children}</ul>
            ),
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>
    </article>
  );
}
