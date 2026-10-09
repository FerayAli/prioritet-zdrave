import {
  filterPosts,
  filterProtocols,
  filterSymptoms,
} from "@/lib/content/filter";
import { listPosts } from "@/lib/content/posts";
import { listProtocols } from "@/lib/content/protocols";
import { listSymptoms } from "@/lib/content/symptoms";
import type { Post, PostQuery, Protocol, Symptom } from "@/lib/content/types";

export type SearchResults = {
  posts: Post[];
  symptoms: Symptom[];
  protocols: Protocol[];
};

export function searchContent(query: PostQuery): SearchResults {
  const posts = filterPosts(listPosts(), query);
  const symptoms = filterSymptoms(listSymptoms(), query);
  const protocols = filterProtocols(listProtocols(), query);

  return { posts, symptoms, protocols };
}

export function searchResultCount(results: SearchResults): number {
  return results.posts.length + results.symptoms.length + results.protocols.length;
}
