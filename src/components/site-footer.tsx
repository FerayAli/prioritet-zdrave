import Link from "next/link";
import { t } from "@/i18n/messages";
import { getContactPage } from "@/lib/content/contact";
import { navLinks } from "@/lib/hero";

export function SiteFooter() {
  const year = String(new Date().getFullYear());
  const contact = getContactPage();
  const details = [
    contact.email
      ? { href: `mailto:${contact.email}`, label: contact.email }
      : null,
    contact.phone
      ? { href: `tel:${contact.phone.replace(/\s+/g, "")}`, label: contact.phone }
      : null,
    contact.location ? { href: null, label: contact.location } : null,
  ].filter((item) => item !== null);

  return (
    <footer className="border-t border-line bg-band">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-logo text-[1.71875rem] leading-none tracking-tight text-plum">
              {t("brand.name")}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>
          <nav aria-label={t("footer.nav")}>
            <p className="font-slab text-xs font-bold uppercase tracking-[0.25em] text-ink">
              {t("footer.explore")}
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-slab text-xs font-bold uppercase tracking-[0.25em] text-ink">
              {t("nav.contacts")}
            </p>
            <p className="mt-4 text-sm text-ink">{contact.name}</p>
            {contact.role ? (
              <p className="mt-1 text-sm">{contact.role}</p>
            ) : null}
            {details.length > 0 ? (
              <ul className="mt-3 space-y-1.5 text-sm">
                {details.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-plum underline-offset-4 hover:underline"
                      >
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm sm:flex-row sm:items-baseline sm:justify-between">
          <p>
            {t("footer.copyright", { year, name: t("brand.name") })}
          </p>
          <p>{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
