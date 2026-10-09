import Link from "next/link";
import { PostList } from "@/components/post-list";
import { t } from "@/i18n/messages";
import type { SearchResults } from "@/lib/content/search-results";
import { focusLabelKey } from "@/lib/hero";

function SimpleCardList({
  items,
  hrefFor,
}: {
  items: { slug: string; title: string; excerpt: string; focus: import("@/lib/content/types").Focus[] }[];
  hrefFor: (slug: string) => string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-4 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            href={hrefFor(item.slug)}
            className="block border border-line bg-white p-5 transition-opacity hover:opacity-90"
          >
            <h3 className="font-serif text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed">{item.excerpt}</p>
            {item.focus.length > 0 ? (
              <p className="mt-3 text-sm text-ink/60">
                {item.focus.map((focus) => t(focusLabelKey[focus])).join(" · ")}
              </p>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SearchResultList({ results }: { results: SearchResults }) {
  const total =
    results.posts.length + results.symptoms.length + results.protocols.length;

  if (total === 0) {
    return <p className="mt-8 text-lg text-ink/75">{t("search.empty")}</p>;
  }

  return (
    <div className="mt-8 space-y-12">
      {results.symptoms.length > 0 ? (
        <section>
          <h2 className="font-slab text-sm font-bold uppercase tracking-[0.25em] text-ink">
            {t("search.section.symptoms")}
          </h2>
          <SimpleCardList
            items={results.symptoms}
            hrefFor={(slug) => `/symptoms/${slug}`}
          />
        </section>
      ) : null}
      {results.protocols.length > 0 ? (
        <section>
          <h2 className="font-slab text-sm font-bold uppercase tracking-[0.25em] text-ink">
            {t("search.section.protocols")}
          </h2>
          <SimpleCardList
            items={results.protocols}
            hrefFor={(slug) => `/protocols/${slug}`}
          />
        </section>
      ) : null}
      {results.posts.length > 0 ? (
        <section>
          <h2 className="font-slab text-sm font-bold uppercase tracking-[0.25em] text-ink">
            {t("search.section.posts")}
          </h2>
          <PostList posts={results.posts} />
        </section>
      ) : null}
    </div>
  );
}
