import Image from "next/image";
import Link from "next/link";
import { BodySystemIcon } from "@/components/body-system-icon";
import { t } from "@/i18n/messages";
import {
  bodySystemColor,
  bodySystemLabelKey,
  bodySystemSpots,
  guideHref,
} from "@/lib/body-map";
import { toSearchHref } from "@/lib/content/query";
import { bodySystems, type BodySystem, type Post } from "@/lib/content/types";

const howSteps = [
  "bodyMap.how.works",
  "bodyMap.how.emotions",
  "bodyMap.how.aroma",
  "bodyMap.how.daily",
  "bodyMap.how.sources",
] as const;

export function BodyMap({ posts }: { posts: Post[] }) {
  if (!posts.some((post) => post.system)) return null;

  return (
    <section
      id="body-map"
      aria-label={t("bodyMap.label")}
      className="scroll-mt-28 border-t border-line px-4 py-10 lg:py-14"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[15rem_minmax(0,1.35fr)_14.5rem] lg:items-center lg:gap-6">
        <aside>
          <h2 className="font-serif text-4xl font-semibold leading-tight text-ink">
            {t("bodyMap.introTitle")}
          </h2>
          <p className="mt-4 leading-relaxed">{t("bodyMap.intro")}</p>
          <Link
            href={toSearchHref({ format: "body-map" })}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-plum px-4 py-2.5 font-nav text-[0.6875rem] font-bold tracking-[0.14em] text-white uppercase md:hover:opacity-80"
          >
            {t("bodyMap.seeAll")}
            <span aria-hidden="true">→</span>
          </Link>
        </aside>

        <BodyFigure posts={posts} />

        <aside className="rounded-2xl bg-band px-6 py-7">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-paper text-plum">
            <BookIcon />
          </div>
          <h2 className="mt-4 text-center font-serif text-3xl font-semibold text-ink">
            {t("bodyMap.howTitle")}
          </h2>
          <ul className="mt-5 space-y-3">
            {howSteps.map((key) => (
              <li key={key} className="flex gap-2.5 text-sm leading-snug text-ink">
                <CheckIcon />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center font-script text-3xl leading-none text-plum">
            {t("bodyMap.how.close")}
          </p>
        </aside>
      </div>
    </section>
  );
}

function BodyFigure({ posts }: { posts: Post[] }) {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="relative mx-auto w-64 sm:w-72 lg:w-[62%]">
        <Image
          src="/images/body-map/female-anatomy-front.webp"
          alt={t("bodyMap.figureAlt")}
          width={864}
          height={1152}
          sizes="(min-width: 1024px) 420px, 288px"
          className="h-auto w-full"
        />
      </div>

      <ul className="pointer-events-none absolute inset-0 hidden lg:block">
        {bodySystemSpots.map((spot) => {
          const href = guideHref(posts, spot.id);
          if (!href) return null;
          const label = t(bodySystemLabelKey[spot.id]);
          return (
            <li key={spot.id}>
              <Link
                href={href}
                style={{ top: spot.top }}
                className={`group pointer-events-auto absolute z-10 flex w-[22%] -translate-y-1/2 items-center gap-2 ${
                  spot.side === "left" ? "left-0 justify-end" : "right-0 justify-start"
                }`}
              >
                {spot.side === "right" ? <IconBadge id={spot.id} /> : null}
                <span
                  className={`min-w-0 font-nav text-[0.6875rem] leading-tight font-bold text-ink group-hover:text-plum ${
                    spot.side === "left" ? "text-right" : "text-left"
                  }`}
                >
                  {label}
                </span>
                {spot.side === "left" ? <IconBadge id={spot.id} /> : null}
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4 lg:hidden">
        {bodySystems.map((id) => {
          const href = guideHref(posts, id);
          if (!href) return null;
          return (
            <li key={id}>
              <Link href={href} className="group flex items-center gap-2.5">
                <IconBadge id={id} />
                <span className="font-nav text-xs leading-tight font-bold text-ink group-hover:text-plum">
                  {t(bodySystemLabelKey[id])}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function IconBadge({ id }: { id: BodySystem }) {
  const color = bodySystemColor[id];
  return (
    <span
      className="flex size-12 shrink-0 items-center justify-center rounded-full border bg-paper shadow-sm"
      style={{ color, borderColor: color }}
    >
      <BodySystemIcon id={id} />
    </span>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="size-7">
      <path
        d="M6 9c3.2-1.4 6.2-.2 10 1.6V24c-3.8-1.8-6.8-3-10-1.6V9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M26 9c-3.2-1.4-6.2-.2-10 1.6V24c3.8-1.8 6.8-3 10-1.6V9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-plum">
      <path
        d="M3 8.2 6.2 11.4 13 4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
