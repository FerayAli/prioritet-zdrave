import { redirect } from "next/navigation";
import { toSearchHref } from "@/lib/content/query";

export default function RecipesRedirect() {
  redirect(toSearchHref({ format: "recipes" }));
}
