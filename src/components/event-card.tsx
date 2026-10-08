import Image from "next/image";
import Link from "next/link";
import { t } from "@/i18n/messages";
import type { SiteEvent } from "@/lib/content/events";

function formatDay(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function EventCard({ event }: { event: SiteEvent }) {
  const when = event.time
    ? `${formatDay(event.date)} · ${event.time}`
    : formatDay(event.date);

  return (
    <li className="border-b border-line py-6">
      <Link href={`/events/${event.slug}`} className="group flex gap-4 sm:gap-6">
        {event.cover ? (
          <span className="relative size-24 shrink-0 overflow-hidden bg-band sm:size-36">
            <Image
              src={event.cover}
              alt=""
              fill
              sizes="144px"
              className="object-cover"
            />
          </span>
        ) : null}
        <span className="min-w-0">
          <p className="font-nav text-[0.6875rem] font-bold tracking-[0.12em] text-yellow uppercase">
            {when}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-ink group-hover:text-plum">
            {event.title}
          </h3>
          <p className="mt-1 text-sm text-ink/70">
            {t("events.location")}: {event.location}
          </p>
          <p className="mt-2 leading-relaxed">{event.excerpt}</p>
        </span>
      </Link>
    </li>
  );
}
