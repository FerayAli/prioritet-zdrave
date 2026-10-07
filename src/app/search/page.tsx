import { PostList } from "@/components/post-list";
import { SearchForm } from "@/components/search-form";
import { t } from "@/i18n/messages";
import { filterPosts } from "@/lib/content/filter";
import { listPosts } from "@/lib/content/posts";
import { parsePostQuery } from "@/lib/content/query";

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
      <div className="mt-8">
        <SearchForm query={query} />
      </div>
      <p className="mt-8 font-slab text-xs uppercase tracking-widest text-muted">
        {t("search.resultCount", { count: String(posts.length) })}
      </p>
      <PostList posts={posts} />
    </div>
  );
}
