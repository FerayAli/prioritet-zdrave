import Image from "next/image";
import Link from "next/link";
import { t } from "@/i18n/messages";
import type { Oil } from "@/lib/content/oils";

export function OilChips({ oils }: { oils: Oil[] }) {
  if (oils.length === 0) return null;

  return (
    <section className="mt-6">
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-ink/50">
        {t("book.oilsUsed")}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {oils.map((oil) => (
          <li key={oil.slug}>
            <Link
              href={`/book/${oil.slug}`}
              className="inline-flex items-center gap-2 bg-band py-1 pr-3 pl-1 text-sm text-ink transition-opacity hover:opacity-60"
            >
              {oil.photo ? (
                <span className="relative size-8 overflow-hidden">
                  <Image
                    src={oil.photo}
                    alt=""
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </span>
              ) : null}
              {oil.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
