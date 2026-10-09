import Link from "next/link";
import { t } from "@/i18n/messages";
import { toSearchHref } from "@/lib/content/query";
import type { PostQuery } from "@/lib/content/types";

export function SearchPagination({
  query,
  page,
  hasPrev,
  hasNext,
}: {
  query: PostQuery;
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  if (!hasPrev && !hasNext) return null;

  const prevHref =
    page > 2
      ? toSearchHref({ ...query, page: page - 1 })
      : toSearchHref({ ...query, page: undefined });

  const nextHref = toSearchHref({ ...query, page: page + 1 });

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8"
      aria-label={t("search.pagination.label")}
    >
      {hasPrev ? (
        <Link
          href={prevHref}
          className="font-nav text-sm font-bold tracking-widest text-plum uppercase hover:underline"
        >
          {t("search.pagination.prev")}
        </Link>
      ) : (
        <span />
      )}
      <p className="font-slab text-xs uppercase tracking-widest text-muted">
        {t("search.pagination.page", { page: String(page) })}
      </p>
      {hasNext ? (
        <Link
          href={nextHref}
          className="font-nav text-sm font-bold tracking-widest text-plum uppercase hover:underline"
        >
          {t("search.pagination.next")}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
