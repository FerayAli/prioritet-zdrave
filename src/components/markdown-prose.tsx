import Link from "next/link";
import type { ReactNode } from "react";
import type { Components } from "react-markdown";
import { linkOilMentions } from "@/lib/content/oil-links";
import type { Oil } from "@/lib/content/oils";

const linkClassName =
  "text-plum underline decoration-plum/30 underline-offset-4 transition-opacity hover:opacity-60";

export function proseMarkdown(oils: Oil[] = []): Components {
  const withOils = (children: ReactNode) => linkOilMentions(children, oils);

  return {
    p: ({ children }) => (
      <p className="mt-4 text-lg leading-relaxed text-ink/90">{withOils(children)}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 font-serif text-2xl font-semibold text-ink">
        {withOils(children)}
      </h2>
    ),
    li: ({ children }) => <li>{withOils(children)}</li>,
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-1 pl-5 text-lg leading-relaxed">{children}</ul>
    ),
    a: ({ href, children }) => {
      if (href?.startsWith("/")) {
        return (
          <Link href={href} className={linkClassName}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} className={linkClassName}>
          {children}
        </a>
      );
    },
  };
}
