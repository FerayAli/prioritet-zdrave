import Link from "next/link";
import type { Components } from "react-markdown";

export const proseMarkdown: Components = {
  p: ({ children }) => (
    <p className="mt-4 text-lg leading-relaxed text-ink/90">{children}</p>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 font-serif text-2xl font-semibold text-ink">{children}</h2>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-1 pl-5 text-lg leading-relaxed">{children}</ul>
  ),
  a: ({ href, children }) => {
    const className = "text-plum underline-offset-4 hover:underline";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  },
};
