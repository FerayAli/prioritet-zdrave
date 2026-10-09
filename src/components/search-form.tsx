import { t } from "@/i18n/messages";
import { focuses, formats, type PostQuery } from "@/lib/content/types";
import { focusLabelKey, formatLabelKey } from "@/lib/hero";

export function SearchForm({ query }: { query: PostQuery }) {
  return (
    <form action="/search" method="get">
      <div className="grid gap-8 md:grid-cols-3">
        <fieldset>
          <legend className="font-slab text-sm uppercase tracking-widest text-ink">
            {t("search.type")}
          </legend>
          <div className="mt-4 flex flex-col gap-2.5">
            <label className="flex items-center gap-2.5">
              <input
                type="radio"
                name="format"
                value=""
                defaultChecked={!query.format}
                className="size-4 accent-plum"
              />
              {t("search.anyType")}
            </label>
            {formats.map((format) => (
              <label key={format} className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="format"
                  value={format}
                  defaultChecked={query.format === format}
                  className="size-4 accent-plum"
                />
                {t(formatLabelKey[format])}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-slab text-sm uppercase tracking-widest text-ink">
            {t("search.focus")}
          </legend>
          <div className="mt-4 flex flex-col gap-2.5">
            {focuses.map((focus) => (
              <label key={focus} className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  name="focus"
                  value={focus}
                  defaultChecked={query.focus?.includes(focus) ?? false}
                  className="size-4 accent-plum"
                />
                {t(focusLabelKey[focus])}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-slab text-sm uppercase tracking-widest text-ink">
            {t("search.also")}
          </legend>
          <div className="mt-4 flex flex-col gap-2.5">
            <label className="flex items-center gap-2.5">
              <input
                type="checkbox"
                name="everyday"
                value="1"
                defaultChecked={query.everyday === true}
                className="size-4 accent-plum"
              />
              {t("topic.everyday")}
            </label>
            <label className="flex items-center gap-2.5">
              <input
                type="checkbox"
                name="featured"
                value="1"
                defaultChecked={query.featured === true}
                className="size-4 accent-plum"
              />
              {t("topic.mostLoved")}
            </label>
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        className="mt-8 bg-plum px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-white"
      >
        {t("search.submit")}
      </button>
    </form>
  );
}
