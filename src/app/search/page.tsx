import { PostList } from "@/components/post-list";
import { SearchForm } from "@/components/search-form";
import { SearchToolbar } from "@/components/search-toolbar";
import { t } from "@/i18n/messages";
import { filterPosts } from "@/lib/content/filter";
import { listPosts } from "@/lib/content/posts";
import { parsePostQuery, searchChips } from "@/lib/content/query";

export function generateMetadata() {
  return { title: t("search.title") };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parsePostQuery(await searchParams);
  const posts = filterPosts(listPosts(), query);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {t("search.title")}
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed">
        {t("search.intro")}
      </p>
      <SearchToolbar
        chips={searchChips(query).map((chip) => {
          const label = t(chip.labelKey);
          return {
            id: chip.id,
            href: chip.href,
            label,
            removeLabel: t("search.removeFilter", { label }),
          };
        })}
        resultCount={t("search.resultCount", { count: String(posts.length) })}
        refineLabel={t("search.refine")}
        closeLabel={t("search.closeFilters")}
        clearLabel={t("search.clearFilters")}
        clearHref="/search"
      >
        <SearchForm query={query} />
      </SearchToolbar>
      <PostList posts={posts} />
    </div>
  );
}
