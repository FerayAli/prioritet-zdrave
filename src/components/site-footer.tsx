import { t } from "@/i18n/messages";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-8 text-sm leading-relaxed text-muted sm:px-8">
        <p>{t("footer.disclaimer")}</p>
      </div>
    </footer>
  );
}
