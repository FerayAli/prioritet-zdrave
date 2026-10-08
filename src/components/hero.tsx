import Image from "next/image";
import Link from "next/link";
import { t } from "@/i18n/messages";
import { toSearchHref } from "@/lib/content/query";
import { heroCircles, heroTiles, type HeroLink } from "@/lib/hero";

const tileLabelClassName = {
  featured:
    "relative z-10 -mt-4 mx-auto w-fit bg-yellow px-2 py-2 font-body text-[0.6875rem] font-bold tracking-[0.12em] text-white uppercase",
  compact:
    "relative z-10 -mt-4 mx-auto max-w-full bg-yellow px-2 py-2 font-body text-[0.625rem] font-bold tracking-normal text-white uppercase",
  desktop:
    "relative z-10 -mt-4 mx-auto w-fit bg-yellow px-6 py-2 font-body text-xs font-bold tracking-[0.25em] text-white uppercase",
} as const;

function HeroTile({
  tile,
  layout,
  priority,
}: {
  tile: HeroLink;
  layout: "featured" | "compact" | "desktop";
  priority?: boolean;
}) {
  const imageFrameClassName =
    layout === "featured"
      ? "relative block h-80 w-full overflow-hidden"
        : layout === "compact"
        ? "relative mx-auto block aspect-square w-full max-w-56 overflow-hidden"
        : "relative block aspect-[7/10] w-full overflow-hidden";

  return (
    <Link
      href={toSearchHref(tile.query)}
      className="group flex h-full flex-col md:hover:opacity-60"
    >
      <span className={imageFrameClassName}>
        <Image
          src={tile.image}
          alt=""
          fill
          quality={90}
          priority={priority}
          sizes={
            layout === "featured"
              ? "(max-width: 767px) 100vw, 32px"
              : layout === "compact"
                ? "(max-width: 767px) 420px, 32px"
                : "(min-width: 768px) 720px, 32px"
          }
          className="object-cover"
          style={
            tile.imageObjectPosition
              ? { objectPosition: tile.imageObjectPosition }
              : undefined
          }
        />
      </span>
      <p className={tileLabelClassName[layout]}>{t(tile.labelKey)}</p>
    </Link>
  );
}

export function Hero() {
  const slogan = t("hero.slogan");
  const splitAt = slogan.indexOf(",");
  const kicker = splitAt >= 0 ? slogan.slice(0, splitAt) : slogan;
  const script = splitAt >= 0 ? slogan.slice(splitAt + 1).trim() : "";
  const [featuredTile, ...compactTiles] = heroTiles;
  const mobileCompactTiles = compactTiles.filter((tile) => !tile.hideOnMobile);

  return (
    <div>
      <section className="px-4 pt-8 pb-6">
        <div className="mb-2 flex justify-center text-center md:mb-3">
          <h1 className="font-slab text-[0.938rem] leading-6 font-bold tracking-[0.25em] text-ink uppercase md:flex md:flex-wrap md:items-baseline md:justify-center">
            <span className="block md:mr-2 md:inline">{kicker}</span>
            {script ? (
              <span className="mt-1 block font-script text-[2.35rem] leading-none font-normal tracking-normal text-plum lowercase md:-mt-2 md:inline md:text-[3.5rem] md:whitespace-nowrap">
                {script}
              </span>
            ) : null}
          </h1>
        </div>
      </section>

      <section className="home-hero md:bg-band md:pt-6 md:pb-8 lg:pt-8 lg:pb-10">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 md:grid-cols-4 lg:px-0">
          <li className="col-span-2 -mx-4 min-w-0 text-center md:hidden">
            <HeroTile tile={featuredTile} layout="featured" />
          </li>
          {mobileCompactTiles.map((tile) => (
            <li key={tile.labelKey} className="min-w-0 overflow-visible text-center md:hidden">
              <HeroTile tile={tile} layout="compact" />
            </li>
          ))}
          {heroTiles.map((tile, index) => (
            <li
              key={`${tile.labelKey}-desktop`}
              className="hidden min-w-0 text-center md:block"
            >
              <HeroTile tile={tile} layout="desktop" priority={index === 0} />
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-6 max-w-6xl bg-band px-4 pt-4 pb-4 md:mt-0 md:pb-0 lg:px-0">
          <ul className="flex w-full gap-x-6 overflow-x-auto py-4">
            {heroCircles.map((circle) => (
              <li
                key={circle.labelKey}
                className="w-[5.5rem] shrink-0 grow text-center md:w-[6.6rem]"
              >
                <Link
                  href={toSearchHref(circle.query)}
                  className="flex flex-col items-center md:hover:opacity-60"
                >
                  <span className="relative mb-2 block size-[5.5rem] overflow-hidden rounded-full md:size-[6.6rem]">
                    <Image
                      src={circle.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 106px, 88px"
                      className="object-cover"
                    />
                  </span>
                  <span className="font-nav text-sm leading-tight font-bold text-ink">
                    {t(circle.labelKey)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
