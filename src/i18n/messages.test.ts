import { describe, expect, it } from "vitest";
import { t } from "@/i18n/messages";

describe("messages", () => {
  it("uses the agreed slogan and disclaimer", () => {
    expect(t("hero.slogan")).toBe(
      "Prioritize your health, one simple step at a time.",
    );
    expect(t("footer.disclaimer")).toBe(
      "For education only. Not medical advice.",
    );
    expect(t("footer.copyright", { year: "2026", name: "prioritet-zdrave" })).toBe(
      "© 2026 prioritet-zdrave",
    );
  });

  it("fills a result count", () => {
    expect(t("search.resultCount", { count: "3" })).toBe("3 results");
  });
});
