import Link from "next/link";
import { t } from "@/i18n/messages";
import { listSymptoms } from "@/lib/content/symptoms";
import { focusLabelKey } from "@/lib/hero";

export const dynamic = "force-static";

export function generateMetadata() {
  return { title: t("symptoms.title") };
}

export default function SymptomsIndexPage() {
  const symptoms = listSymptoms();

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {t("symptoms.title")}
      </h1>
      <p className="mt-6 text-lg leading-relaxed">{t("symptoms.intro")}</p>
      <ul className="mt-10 divide-y divide-line">
        {symptoms.map((symptom) => (
          <li key={symptom.slug} className="py-5">
            <Link href={`/symptoms/${symptom.slug}`} className="group block">
              <h2 className="font-serif text-2xl font-semibold text-ink group-hover:text-plum">
                {symptom.title}
              </h2>
              <p className="mt-2 leading-relaxed">{symptom.excerpt}</p>
              {symptom.focus.length > 0 ? (
                <p className="mt-2 text-sm text-ink/60">
                  {symptom.focus.map((focus) => t(focusLabelKey[focus])).join(" · ")}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
