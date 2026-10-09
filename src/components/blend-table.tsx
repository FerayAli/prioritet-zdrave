import Link from "next/link";
import { t } from "@/i18n/messages";
import type { Oil } from "@/lib/content/oils";
import type { BlendLine } from "@/lib/content/types";

const oilLinkClassName =
  "text-plum underline decoration-plum/30 underline-offset-4 transition-opacity hover:opacity-60";

export function BlendTable({
  lines,
  oilsBySlug,
}: {
  lines: BlendLine[];
  oilsBySlug: Map<string, Oil>;
}) {
  return (
    <table className="mt-4 w-full text-left text-sm">
      <thead>
        <tr className="border-b border-line font-sans text-xs font-bold uppercase tracking-widest text-ink/50">
          <th className="py-2 pr-4 font-bold">{t("blend.oil")}</th>
          <th className="py-2 font-bold">{t("blend.drops")}</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((line) => {
          const oil = oilsBySlug.get(line.slug);
          return (
            <tr key={line.slug} className="border-b border-line/60">
              <td className="py-3 pr-4 font-serif text-lg text-ink">
                {oil ? (
                  <Link href={`/book/${oil.slug}`} className={oilLinkClassName}>
                    {oil.title}
                  </Link>
                ) : (
                  line.slug
                )}
              </td>
              <td className="py-3 tabular-nums text-ink">{line.drops}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
