import Image from "next/image";
import Link from "next/link";
import { t } from "@/i18n/messages";
import { toSearchHref } from "@/lib/content/query";

const scienceImage = "/images/home/science.jpg";

const filledCtaClassName =
  "mt-6 inline-flex items-center rounded-md bg-plum px-5 py-2.5 font-nav text-[0.6875rem] font-bold tracking-[0.18em] text-white uppercase md:hover:opacity-80";

const outlineCtaClassName =
  "mt-6 inline-flex items-center rounded-md border border-plum px-5 py-2.5 font-nav text-[0.6875rem] font-bold tracking-[0.18em] text-ink uppercase md:hover:opacity-80";

export function ScienceAbout({
  aboutPhoto,
  aboutPhotoAlt,
}: {
  aboutPhoto?: string;
  aboutPhotoAlt: string;
}) {
  return (
    <section className="mt-12 border-t border-line bg-band">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <article className="grid items-center gap-6 px-4 py-12 sm:grid-cols-2 lg:px-0 lg:pr-10">
          <div className="min-w-0">
            <h2 className="font-serif text-3xl font-semibold leading-tight text-ink">
              {t("home.science.title")}
            </h2>
            <p className="mt-4 leading-relaxed">{t("home.science.body")}</p>
            <Link href={toSearchHref({ format: "science" })} className={filledCtaClassName}>
              {t("home.science.cta")}
            </Link>
          </div>
          <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src={scienceImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </span>
        </article>
        <article className="grid items-center gap-6 border-t border-line px-4 py-12 sm:grid-cols-2 lg:border-t-0 lg:border-l lg:px-0 lg:pl-10">
          <div className="min-w-0">
            <h2 className="font-serif text-3xl font-semibold leading-tight text-ink">
              {t("home.about.title")}
            </h2>
            <p className="mt-4 leading-relaxed">{t("home.about.body")}</p>
            <Link href="/contact" className={outlineCtaClassName}>
              {t("home.about.cta")}
            </Link>
          </div>
          {aboutPhoto ? (
            <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={aboutPhoto}
                alt={aboutPhotoAlt}
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-[center_20%]"
              />
            </span>
          ) : null}
        </article>
      </div>
    </section>
  );
}
