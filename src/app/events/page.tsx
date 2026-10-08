import { EventCard } from "@/components/event-card";
import { t } from "@/i18n/messages";
import { listEvents, splitEvents } from "@/lib/content/events";

export const dynamic = "force-static";

export function generateMetadata() {
  return { title: t("events.title") };
}

export default function EventsPage() {
  const today = new Date().toISOString().slice(0, 10);
  const { upcoming, past } = splitEvents(listEvents(), today);

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {t("events.title")}
      </h1>
      <p className="mt-6 text-lg leading-relaxed">{t("events.intro")}</p>
      <section className="mt-12">
        <h2 className="font-slab text-sm font-bold uppercase tracking-[0.25em] text-ink">
          {t("events.upcoming")}
        </h2>
        {upcoming.length > 0 ? (
          <ul className="mt-2">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-lg leading-relaxed">{t("events.emptyUpcoming")}</p>
        )}
      </section>
      {past.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-slab text-sm font-bold uppercase tracking-[0.25em] text-ink">
            {t("events.past")}
          </h2>
          <ul className="mt-2">
            {past.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
