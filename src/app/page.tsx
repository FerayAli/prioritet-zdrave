import { FeaturedPosts, StartHereCue } from "@/components/featured-posts";
import { Hero } from "@/components/hero";
import { filterPosts } from "@/lib/content/filter";
import { listPosts } from "@/lib/content/posts";

export const dynamic = "force-static";

export default function HomePage() {
  const featured = filterPosts(listPosts(), { featured: true }).slice(0, 3);

  return (
    <>
      <Hero />
      <FeaturedPosts posts={featured} />
      <StartHereCue />
    </>
  );
}
