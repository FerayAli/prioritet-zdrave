import Link from "next/link";
import { t } from "@/i18n/messages";
import { listProtocols } from "@/lib/content/protocols";
import { focusLabelKey } from "@/lib/hero";

export const dynamic = "force-static";

export function generateMetadata() {
  return { title: t("protocols.title") };
}

export default function ProtocolsIndexPage() {
  const protocols = listProtocols();

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {t("protocols.title")}
      </h1>
      <p className="mt-6 text-lg leading-relaxed">{t("protocols.intro")}</p>
      <ul className="mt-10 divide-y divide-line">
        {protocols.map((protocol) => (
          <li key={protocol.slug} className="py-5">
            <Link href={`/protocols/${protocol.slug}`} className="group block">
              <h2 className="font-serif text-2xl font-semibold text-ink group-hover:text-plum">
                {protocol.title}
              </h2>
              <p className="mt-2 leading-relaxed">{protocol.excerpt}</p>
              {protocol.focus.length > 0 ? (
                <p className="mt-2 text-sm text-ink/60">
                  {protocol.focus.map((focus) => t(focusLabelKey[focus])).join(" · ")}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
