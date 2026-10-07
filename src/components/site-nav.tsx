"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type TextLink = {
  href: string;
  label: string;
};

function SearchIcon() {
  return (
    <svg
      className="ml-4 size-5"
      viewBox="0 0 18.5 18.5"
      aria-hidden="true"
    >
      <path
        fill="#734060"
        d="M17.2 18.5 12.3 13.6a8.1 8.1 0 0 1-4.7 1.6A7.9 7.9 0 0 1 2.2 13 7.9 7.9 0 0 1 0 7.6 7.9 7.9 0 0 1 2.2 2.2 7.9 7.9 0 0 1 7.6 0 7.9 7.9 0 0 1 13 2.2a7.9 7.9 0 0 1 2.2 5.4 8.1 8.1 0 0 1-1.6 4.7l4.9 4.9ZM7.6 13.3a6.2 6.2 0 0 0 4.1-1.6 6.2 6.2 0 0 0 1.6-4.1 6.2 6.2 0 0 0-1.6-4.1 5.8 5.8 0 1 0-8.2 8.2 6.2 6.2 0 0 0 4.1 1.6Z"
      />
    </svg>
  );
}

const navLinkClassName =
  "mx-4 block pb-7 font-nav text-[0.9375rem] font-bold uppercase tracking-wider text-ink no-underline sm:-mb-7 md:border-b-[3px] max-sm:mx-0 max-sm:border-0 max-sm:py-3 max-sm:pb-3 max-sm:text-base";

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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        className="burger-btn z-10 sm:hidden"
        aria-label={menuLabel}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={() => setMenuOpen((open) => !open)}
      />
      <ul
        id="site-menu"
        className={`sm:mt-2 sm:flex sm:shadow-none max-sm:absolute max-sm:top-[4.75rem] max-sm:left-0 max-sm:z-[1000] max-sm:h-[calc(100vh-4.75rem)] max-sm:w-full max-sm:flex-col max-sm:overflow-y-auto max-sm:bg-white/95 max-sm:px-6 max-sm:pt-4 max-sm:shadow-md ${
          menuOpen ? "max-sm:flex" : "max-sm:hidden"
        }`}
      >
        {links.map((link) => {
          const current = pathname === link.href;
          return (
            <li key={link.href} className="max-sm:mt-1">
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`${navLinkClassName} ${
                  current ? "md:border-plum" : "md:border-transparent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li className="max-sm:mt-1">
          <Link
            href={searchHref}
            aria-label={searchLabel}
            className="block pb-7 sm:-mb-7 max-sm:py-3"
          >
            <SearchIcon />
          </Link>
        </li>
      </ul>
    </>
  );
}
