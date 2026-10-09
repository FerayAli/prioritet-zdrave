import { t } from "@/i18n/messages";
import { BlendTable } from "@/components/blend-table";
import type { Oil } from "@/lib/content/oils";
import type { ApplicationMethod, Symptom } from "@/lib/content/types";

const methodLabelKey: Record<ApplicationMethod, "symptoms.method.diffuse" | "symptoms.method.topicalDiluted" | "symptoms.method.inhale"> = {
  diffuse: "symptoms.method.diffuse",
  "topical-diluted": "symptoms.method.topicalDiluted",
  inhale: "symptoms.method.inhale",
};

export function SymptomBlendCard({
  symptom,
  oilsBySlug,
}: {
  symptom: Pick<Symptom, "oils" | "schedule" | "method">;
  oilsBySlug: Map<string, Oil>;
}) {
  return (
    <section className="mt-8 border border-line bg-band/40 p-5 sm:p-6">
      <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-ink/50">
        {t("symptoms.blend")}
      </h2>
      <BlendTable lines={symptom.oils} oilsBySlug={oilsBySlug} />
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="font-sans text-xs font-bold uppercase tracking-widest text-ink/50">
            {t("symptoms.schedule")}
          </dt>
          <dd className="mt-1 text-lg text-ink">{symptom.schedule}</dd>
        </div>
        <div>
          <dt className="font-sans text-xs font-bold uppercase tracking-widest text-ink/50">
            {t("symptoms.method")}
          </dt>
          <dd className="mt-1 text-lg text-ink">{t(methodLabelKey[symptom.method])}</dd>
        </div>
      </dl>
    </section>
  );
}
