import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { OilChips } from "@/components/oil-chips";
import { proseMarkdown } from "@/components/markdown-prose";
import { ProtocolPhases } from "@/components/protocol-phases";
import { t } from "@/i18n/messages";
import { oilsBySlugMap } from "@/lib/content/oils-map";
import {
  getProtocolBySlug,
  listProtocols,
  protocolOilSlugs,
} from "@/lib/content/protocols";

export const dynamic = "force-static";

export function generateStaticParams() {
  return listProtocols().map((protocol) => ({ slug: protocol.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const protocol = getProtocolBySlug(slug);
  return { title: protocol?.title ?? t("notFound.title") };
}

export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const protocol = getProtocolBySlug(slug);
  if (!protocol) notFound();

  const oilSlugs = protocolOilSlugs(protocol);
  const oilsMap = oilsBySlugMap(oilSlugs);
  const mentionedOils = oilSlugs
    .map((oilSlug) => oilsMap.get(oilSlug))
    .filter((oil): oil is NonNullable<typeof oil> => oil !== undefined);

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <p>
        <Link
          href="/protocols"
          className="font-sans text-xs font-bold uppercase tracking-widest text-plum hover:underline"
        >
          {t("protocols.title")}
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
        {protocol.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink/80">{protocol.excerpt}</p>
      <ProtocolPhases phases={protocol.phases} oilsBySlug={oilsMap} />
      <OilChips oils={mentionedOils} />
      <div className="prose prose-pz mt-10 max-w-none">
        <ReactMarkdown components={proseMarkdown()}>{protocol.body}</ReactMarkdown>
      </div>
    </article>
  );
}
