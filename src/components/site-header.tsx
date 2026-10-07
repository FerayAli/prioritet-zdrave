import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { t } from "@/i18n/messages";
import { navLinks } from "@/lib/hero";

export function SiteHeader() {
  const textLinks = navLinks
    .filter((link) => link.href !== "/search")
    .map((link) => ({ href: link.href, label: t(link.labelKey) }));
  const search = navLinks.find((link) => link.href === "/search");

  return (
    <header className="relative border-b border-line">
      <nav
        aria-label={t("nav.main")}
        id="global-navigation"
        className="relative mx-auto flex max-w-6xl items-center justify-between px-4 pb-4 pt-4 sm:items-center sm:justify-between md:pt-8"
      >
        <Link
          href="/"
          className="font-logo relative z-10 block w-60 text-[1.71875rem] leading-none tracking-tight text-plum sm:w-80 sm:text-[2.03125rem]"
        >
          {t("brand.name")}
        </Link>
        {search ? (
          <SiteNav
            links={textLinks}
            searchHref={search.href}
            searchLabel={t(search.labelKey)}
            menuLabel={t("nav.menu")}
          />
        ) : null}
      </nav>
    </header>
  );
}
