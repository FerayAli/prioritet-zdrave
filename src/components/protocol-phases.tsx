import { t } from "@/i18n/messages";
import { BlendTable } from "@/components/blend-table";
import type { Oil } from "@/lib/content/oils";
import type { ApplicationMethod, ProtocolPhase } from "@/lib/content/types";

const methodLabelKey: Record<
  ApplicationMethod,
  "symptoms.method.diffuse" | "symptoms.method.topicalDiluted" | "symptoms.method.inhale"
> = {
  diffuse: "symptoms.method.diffuse",
  "topical-diluted": "symptoms.method.topicalDiluted",
  inhale: "symptoms.method.inhale",
};

export function ProtocolPhases({
  phases,
  oilsBySlug,
}: {
  phases: ProtocolPhase[];
  oilsBySlug: Map<string, Oil>;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold text-ink">{t("protocols.phases")}</h2>
      <ol className="mt-6 space-y-10">
        {phases.map((phase, index) => (
          <li key={`${phase.title}-${index}`} className="relative border-l-2 border-plum/30 pl-6">
            <span
              className="absolute -left-[0.5625rem] top-0 flex size-[1.125rem] items-center justify-center rounded-full bg-plum text-[0.625rem] font-bold text-white"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <h3 className="font-serif text-xl font-semibold text-ink">{phase.title}</h3>
            <p className="mt-1 text-sm text-ink/70">
              {t("protocols.duration")}: {phase.duration}
            </p>
            <BlendTable lines={phase.oils} oilsBySlug={oilsBySlug} />
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-sans text-xs font-bold uppercase tracking-widest text-ink/50">
                  {t("symptoms.schedule")}
                </dt>
                <dd className="mt-1 text-ink">{phase.schedule}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs font-bold uppercase tracking-widest text-ink/50">
                  {t("symptoms.method")}
                </dt>
                <dd className="mt-1 text-ink">{t(methodLabelKey[phase.method])}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}
