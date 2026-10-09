import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { OilChips } from "@/components/oil-chips";
import { proseMarkdown } from "@/components/markdown-prose";
import { SymptomBlendCard } from "@/components/symptom-blend-card";
import { t } from "@/i18n/messages";
import { oilsBySlugMap } from "@/lib/content/oils-map";
import { getProtocolBySlug } from "@/lib/content/protocols";
import {
  getSymptomBySlug,
  listSymptoms,
  symptomOilSlugs,
} from "@/lib/content/symptoms";

export const dynamic = "force-static";

export function generateStaticParams() {
  return listSymptoms().map((symptom) => ({ slug: symptom.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symptom = getSymptomBySlug(slug);
  return { title: symptom?.title ?? t("notFound.title") };
}

export default async function SymptomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symptom = getSymptomBySlug(slug);
  if (!symptom) notFound();

  const oilSlugs = symptomOilSlugs(symptom);
  const oilsMap = oilsBySlugMap(oilSlugs);
  const mentionedOils = oilSlugs
    .map((oilSlug) => oilsMap.get(oilSlug))
    .filter((oil): oil is NonNullable<typeof oil> => oil !== undefined);

  const related =
    symptom.relatedProtocol !== undefined
      ? getProtocolBySlug(symptom.relatedProtocol)
      : null;

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <p>
        <Link
          href="/symptoms"
          className="font-sans text-xs font-bold uppercase tracking-widest text-plum hover:underline"
        >
          {t("symptoms.title")}
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
        {symptom.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink/80">{symptom.excerpt}</p>
      <SymptomBlendCard symptom={symptom} oilsBySlug={oilsMap} />
      <OilChips oils={mentionedOils} />
      <div className="prose prose-pz mt-10 max-w-none">
        <ReactMarkdown components={proseMarkdown()}>{symptom.body}</ReactMarkdown>
      </div>
      {related ? (
        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {t("symptoms.relatedProtocol")}
          </h2>
          <p className="mt-2">
            <Link
              href={`/protocols/${related.slug}`}
              className="text-plum underline-offset-4 hover:underline"
            >
              {related.title}
            </Link>
          </p>
        </section>
      ) : null}
    </article>
  );
}
