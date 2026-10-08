import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { proseMarkdown } from "@/components/markdown-prose";
import { t } from "@/i18n/messages";
import { getEventBySlug, listEvents } from "@/lib/content/events";

export const dynamic = "force-static";

export function generateStaticParams() {
  return listEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  return { title: event?.title ?? t("notFound.title") };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const when = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${event.date}T00:00:00Z`));

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <p>
        <Link
          href="/events"
          className="font-sans text-xs font-bold uppercase tracking-widest text-plum hover:underline"
        >
          {t("events.back")}
        </Link>
      </p>
      <p className="mt-6 font-nav text-[0.6875rem] font-bold tracking-[0.12em] text-yellow uppercase">
        {event.time ? `${when} · ${event.time}` : when}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
        {event.title}
      </h1>
      <p className="mt-3 text-lg">
        {t("events.location")}: {event.location}
      </p>
      {event.cover ? (
        <div className="relative mt-8 aspect-[16/10] overflow-hidden bg-band">
          <Image
            src={event.cover}
            alt={event.title}
            fill
            priority
            sizes="(min-width: 768px) 42rem, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="mt-8">
        <ReactMarkdown components={proseMarkdown()}>{event.body}</ReactMarkdown>
      </div>
    </article>
  );
}
