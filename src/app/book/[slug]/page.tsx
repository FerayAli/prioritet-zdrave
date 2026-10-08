import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { proseMarkdown } from "@/components/markdown-prose";
import { t } from "@/i18n/messages";
import { getOilBySlug, listOils } from "@/lib/content/oils";
import { listPostsUsingOil } from "@/lib/content/posts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return listOils().map((oil) => ({ slug: oil.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const oil = getOilBySlug(slug);
  return { title: oil?.title ?? t("notFound.title") };
}

export default async function OilPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const oil = getOilBySlug(slug);
  if (!oil) notFound();

  const usedIn = listPostsUsingOil(oil.slug);

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <p>
        <Link
          href="/book"
          className="font-sans text-xs font-bold uppercase tracking-widest text-plum hover:underline"
        >
          {t("book.title")}
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
        {oil.title}
      </h1>
      {oil.latin ? (
        <p className="mt-3 text-sm italic text-ink/60">{oil.latin}</p>
      ) : null}
      {oil.aroma ? (
        <p className="mt-2 font-nav text-[0.6875rem] font-bold tracking-[0.12em] text-plum uppercase">
          {oil.aroma}
        </p>
      ) : null}
      {oil.photo ? (
        <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-band">
          <Image
            src={oil.photo}
            alt={oil.title}
            fill
            priority
            sizes="(min-width: 768px) 42rem, 100vw"
            className="object-contain"
          />
        </div>
      ) : null}
      <div className="mt-8">
        <ReactMarkdown components={proseMarkdown}>{oil.body}</ReactMarkdown>
      </div>
      {usedIn.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            {t("book.usedIn")}
          </h2>
          <ul className="mt-4 space-y-2">
            {usedIn.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-plum underline-offset-4 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
