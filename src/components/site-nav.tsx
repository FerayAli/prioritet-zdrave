"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type TextLink = {
  href: string;
  label: string;
};

function SearchIcon({ fill }: { fill: string }) {
  return (
    <svg className="size-5" viewBox="0 0 18.5 18.5" aria-hidden="true">
      <path
        fill={fill}
        d="M17.2 18.5 12.3 13.6a8.1 8.1 0 0 1-4.7 1.6A7.9 7.9 0 0 1 2.2 13 7.9 7.9 0 0 1 0 7.6 7.9 7.9 0 0 1 2.2 2.2 7.9 7.9 0 0 1 7.6 0 7.9 7.9 0 0 1 13 2.2a7.9 7.9 0 0 1 2.2 5.4 8.1 8.1 0 0 1-1.6 4.7l4.9 4.9ZM7.6 13.3a6.2 6.2 0 0 0 4.1-1.6 6.2 6.2 0 0 0 1.6-4.1 6.2 6.2 0 0 0-1.6-4.1 5.8 5.8 0 1 0-8.2 8.2 6.2 6.2 0 0 0 4.1 1.6Z"
      />
    </svg>
  );
}

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navLinkClassName =
  "mx-2 inline-block shrink-0 whitespace-nowrap px-2 py-2 font-nav text-[0.9375rem] font-bold uppercase tracking-wider no-underline max-lg:mx-0 max-lg:text-base";

export function SiteNav({
  links,
  searchHref,
  searchLabel,
  menuLabel,
}: {
  links: TextLink[];
  searchHref: string;
  searchLabel: string;
  menuLabel: string;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const searchCurrent = isCurrentPath(pathname, searchHref);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        className="burger-btn z-20 lg:hidden"
        aria-label={menuLabel}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={() => setMenuOpen((open) => !open)}
      />
      <ul
        id="site-menu"
        className={`relative z-20 lg:flex lg:shrink-0 lg:items-center lg:shadow-none max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:z-[1000] max-lg:h-[calc(100vh-100%)] max-lg:w-full max-lg:flex-col max-lg:overflow-y-auto max-lg:bg-white/95 max-lg:px-6 max-lg:pt-4 max-lg:shadow-md ${
          menuOpen ? "max-lg:flex" : "max-lg:hidden"
        }`}
      >
        {links.map((link) => {
          const current = isCurrentPath(pathname, link.href);
          return (
            <li key={link.href} className="max-lg:mt-1">
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`${navLinkClassName} ${
                  current ? "bg-yellow text-white" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li className="max-lg:mt-1">
          <Link
            href={searchHref}
            aria-label={searchLabel}
            aria-current={searchCurrent ? "page" : undefined}
            className={`ml-2 inline-flex shrink-0 px-2 py-2 max-lg:ml-0 ${
              searchCurrent ? "bg-yellow" : ""
            }`}
          >
            <SearchIcon fill={searchCurrent ? "#ffffff" : "#734060"} />
          </Link>
        </li>
      </ul>
    </>
  );
}
