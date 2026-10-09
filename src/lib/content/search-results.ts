import {
  filterPosts,
  filterProtocols,
  filterSymptoms,
} from "@/lib/content/filter";
import * as posts from "@/lib/content/posts";
import * as protocols from "@/lib/content/protocols";
import * as symptoms from "@/lib/content/symptoms";
import type { Focus, Format, PostQuery } from "@/lib/content/types";

export const SEARCH_PAGE_SIZES = {
  symptoms: 12,
  protocols: 12,
  posts: 24,
} as const;

/** When the catalog is larger than this, /search without filters asks for refinement first. */
export const SEARCH_BROAD_CATALOG_LIMIT = 36;

export type SearchCard = {
  slug: string;
  title: string;
  excerpt: string;
  focus: Focus[];
};

export type PostSearchCard = SearchCard & {
  cover?: string;
  format: Format;
  everyday: boolean;
  featured: boolean;
};

export type PaginatedSlice<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

export type SearchResults = {
  needsFilters: boolean;
  page: number;
  symptoms: PaginatedSlice<SearchCard>;
  protocols: PaginatedSlice<SearchCard>;
  posts: PaginatedSlice<PostSearchCard>;
};

export function hasActiveFilters(query: PostQuery): boolean {
  return Boolean(
    query.format ||
      (query.focus && query.focus.length > 0) ||
      query.everyday ||
      query.featured,
  );
}

export function searchContent(query: PostQuery): SearchResults {
  const page = query.page ?? 1;

  if (
    !hasActiveFilters(query) &&
    totalCatalogSize() > SEARCH_BROAD_CATALOG_LIMIT
  ) {
    return emptyResults(page, true);
  }

  const allPosts = filterPosts(posts.listPosts(), query).map(postToCard);
  const allSymptoms = filterSymptoms(symptoms.listSymptoms(), query).map(symptomToCard);
  const allProtocols = filterProtocols(protocols.listProtocols(), query).map(protocolToCard);

  return {
    needsFilters: false,
    page,
    symptoms: paginate(allSymptoms, page, SEARCH_PAGE_SIZES.symptoms),
    protocols: paginate(allProtocols, page, SEARCH_PAGE_SIZES.protocols),
    posts: paginate(allPosts, page, SEARCH_PAGE_SIZES.posts),
  };
}

export function searchResultCount(results: SearchResults): number {
  if (results.needsFilters) return 0;
  return (
    results.symptoms.total +
    results.protocols.total +
    results.posts.total
  );
}

export function searchHasMorePages(results: SearchResults): boolean {
  return (
    results.symptoms.hasMore ||
    results.protocols.hasMore ||
    results.posts.hasMore
  );
}

function totalCatalogSize(): number {
  return (
    posts.listPosts().length +
    symptoms.listSymptoms().length +
    protocols.listProtocols().length
  );
}

function paginate<T>(items: T[], page: number, pageSize: number): PaginatedSlice<T> {
  const total = items.length;
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  const slice = items.slice(start, start + pageSize);
  return {
    items: slice,
    total,
    page: safePage,
    pageSize,
    hasMore: start + slice.length < total,
  };
}

function postToCard(post: ReturnType<typeof posts.listPosts>[number]): PostSearchCard {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    focus: post.focus,
    cover: post.cover,
    format: post.format,
    everyday: post.everyday,
    featured: post.featured,
  };
}

function symptomToCard(symptom: ReturnType<typeof symptoms.listSymptoms>[number]): SearchCard {
  return {
    slug: symptom.slug,
    title: symptom.title,
    excerpt: symptom.excerpt,
    focus: symptom.focus,
  };
}

function protocolToCard(protocol: ReturnType<typeof protocols.listProtocols>[number]): SearchCard {
  return {
    slug: protocol.slug,
    title: protocol.title,
    excerpt: protocol.excerpt,
    focus: protocol.focus,
  };
}

function emptyResults(page: number, needsFilters: boolean): SearchResults {
  const empty = <T,>(): PaginatedSlice<T> => ({
    items: [],
    total: 0,
    page,
    pageSize: 0,
    hasMore: false,
  });

  return {
    needsFilters,
    page,
    symptoms: empty(),
    protocols: empty(),
    posts: empty(),
  };
}
