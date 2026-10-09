import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { proseMarkdown } from "@/components/markdown-prose";
import { t } from "@/i18n/messages";
import { getDisclaimerPage } from "@/lib/content/disclaimer";
import { estimateReadingMinutes } from "@/lib/content/read-time";

export const dynamic = "force-static";

export function generateMetadata() {
  const page = getDisclaimerPage();
  return { title: page.title };
}

export default function DisclaimerPage() {
  const page = getDisclaimerPage();
  const readMinutes = estimateReadingMinutes(page.body);
  const readTime = t("post.readMinutes", { minutes: String(readMinutes) });

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <p>
        <Link
          href="/"
          className="font-sans text-xs font-bold uppercase tracking-widest text-plum hover:underline"
        >
          {t("disclaimer.back")}
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
        {page.title}
      </h1>
      <p className="mt-3 text-sm text-ink/60">{readTime}</p>
      <div className="mt-8">
        <ReactMarkdown components={proseMarkdown()}>{page.body}</ReactMarkdown>
      </div>
    </article>
  );
}
