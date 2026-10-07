import { t } from "@/i18n/messages";

export function generateMetadata() {
  return { title: t("recipes.title") };
}

export default function RecipesPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {t("recipes.title")}
      </h1>
      <p className="mt-6 text-lg leading-relaxed">{t("recipes.body")}</p>
    </article>
  );
}
