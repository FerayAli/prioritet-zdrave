import Image from "next/image";
import Link from "next/link";
import { t } from "@/i18n/messages";
import { groupOilsByAroma, listOils } from "@/lib/content/oils";

export const dynamic = "force-static";

export function generateMetadata() {
  return { title: t("book.title") };
}

export default function BookPage() {
  const groups = groupOilsByAroma(listOils());

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {t("book.title")}
      </h1>
      <p className="mt-6 text-lg leading-relaxed">{t("book.intro")}</p>
      {groups.map((group) => (
        <section key={group.aroma} className="mt-12">
          <h2 className="font-slab text-sm font-bold uppercase tracking-[0.25em] text-ink">
            {group.aroma}
          </h2>
          <ul className="mt-4 divide-y divide-line">
            {group.oils.map((oil) => (
              <li key={oil.slug} className="py-5">
                <Link href={`/book/${oil.slug}`} className="group flex gap-4">
                  {oil.photo ? (
                    <span className="size-20 shrink-0 overflow-hidden bg-band sm:size-24">
                      <Image
                        src={oil.photo}
                        alt=""
                        width={192}
                        height={192}
                        sizes="96px"
                        quality={65}
                        className="size-full object-cover"
                      />
                    </span>
                  ) : null}
                  <span className="min-w-0">
                    <h3 className="font-serif text-2xl font-semibold text-ink group-hover:text-plum">
                      {oil.title}
                    </h3>
                    {oil.latin ? (
                      <p className="mt-1 text-sm italic text-ink/60">{oil.latin}</p>
                    ) : null}
                    <p className="mt-2 leading-relaxed">{oil.excerpt}</p>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
