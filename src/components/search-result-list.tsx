import Link from "next/link";
import { PostList } from "@/components/post-list";
import { SearchPagination } from "@/components/search-pagination";
import { t } from "@/i18n/messages";
import { toSearchHref } from "@/lib/content/query";
import type { PostQuery } from "@/lib/content/types";
import type { SearchResults } from "@/lib/content/search-results";
import { searchHasMorePages } from "@/lib/content/search-results";
import { focusLabelKey } from "@/lib/hero";

function SectionHeading({
  title,
  shown,
  total,
}: {
  title: string;
  shown: number;
  total: number;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="font-slab text-sm font-bold uppercase tracking-[0.25em] text-ink">
        {title}
      </h2>
      {total > 0 ? (
        <p className="font-slab text-xs uppercase tracking-widest text-muted">
          {t("search.sectionCount", {
            shown: String(shown),
            total: String(total),
          })}
        </p>
      ) : null}
    </div>
  );
}

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

export function SearchResultList({
  results,
  query,
}: {
  results: SearchResults;
  query: PostQuery;
}) {
  if (results.needsFilters) {
    return (
      <div className="mt-8 rounded-2xl border border-line bg-band px-6 py-8">
        <p className="text-lg leading-relaxed text-ink">{t("search.needsFilters")}</p>
        <p className="mt-3 text-sm text-muted">{t("search.needsFiltersHint")}</p>
      </div>
    );
  }

  const total =
    results.posts.total + results.symptoms.total + results.protocols.total;

  if (total === 0) {
    return <p className="mt-8 text-lg text-ink/75">{t("search.empty")}</p>;
  }

  const page = results.page;
  const hasPrev = page > 1;
  const hasNext = searchHasMorePages(results);

  return (
    <div className="mt-8 space-y-12">
      {results.symptoms.total > 0 ? (
        <section>
          <SectionHeading
            title={t("search.section.symptoms")}
            shown={results.symptoms.items.length}
            total={results.symptoms.total}
          />
          <SimpleCardList
            items={results.symptoms.items}
            hrefFor={(slug) => `/symptoms/${slug}`}
          />
          {results.symptoms.hasMore ? (
            <p className="mt-4 text-sm">
              <Link
                href={toSearchHref({ ...query, page: page + 1 })}
                className="text-plum underline-offset-4 hover:underline"
              >
                {t("search.moreInSection")}
              </Link>
              {" · "}
              <Link href="/symptoms" className="text-muted underline-offset-4 hover:underline">
                {t("search.browseAllBlends")}
              </Link>
            </p>
          ) : null}
        </section>
      ) : null}
      {results.protocols.total > 0 ? (
        <section>
          <SectionHeading
            title={t("search.section.protocols")}
            shown={results.protocols.items.length}
            total={results.protocols.total}
          />
          <SimpleCardList
            items={results.protocols.items}
            hrefFor={(slug) => `/protocols/${slug}`}
          />
          {results.protocols.hasMore ? (
            <p className="mt-4 text-sm">
              <Link
                href={toSearchHref({ ...query, page: page + 1 })}
                className="text-plum underline-offset-4 hover:underline"
              >
                {t("search.moreInSection")}
              </Link>
              {" · "}
              <Link href="/protocols" className="text-muted underline-offset-4 hover:underline">
                {t("search.browseAllProtocols")}
              </Link>
            </p>
          ) : null}
        </section>
      ) : null}
      {results.posts.total > 0 ? (
        <section>
          <SectionHeading
            title={t("search.section.posts")}
            shown={results.posts.items.length}
            total={results.posts.total}
          />
          <PostList posts={results.posts.items} />
        </section>
      ) : null}

      <SearchPagination query={query} page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
}
