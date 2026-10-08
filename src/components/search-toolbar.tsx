"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

function FilterIcon() {
  return (
    <svg
      className="size-4 shrink-0"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 4.5h16l-6 7.2V16l-4 2v-6.3L2 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchToolbar({
  chips,
  resultCount,
  refineLabel,
  closeLabel,
  clearLabel,
  clearHref,
  children,
}: {
  chips: { id: string; href: string; label: string; removeLabel: string }[];
  resultCount: string;
  refineLabel: string;
  closeLabel: string;
  clearLabel: string;
  clearHref: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 border border-plum bg-plum px-4 py-2 font-nav text-sm font-bold tracking-widest text-white uppercase"
          aria-expanded={open}
          aria-controls={titleId}
          onClick={() => setOpen(true)}
        >
          <FilterIcon />
          {refineLabel}
        </button>
        {chips.length > 0 ? (
          <Link
            href={clearHref}
            className="text-sm text-muted underline-offset-4 hover:underline"
          >
            {clearLabel}
          </Link>
        ) : null}
        <p className="ml-auto font-slab text-xs uppercase tracking-widest text-muted">
          {resultCount}
        </p>
      </div>
      {chips.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li key={chip.id}>
              <Link
                href={chip.href}
                aria-label={chip.removeLabel}
                className="inline-flex items-center gap-2 border border-line px-3 py-1.5 text-sm text-ink"
              >
                {chip.label}
                <span aria-hidden="true" className="text-muted">
                  ×
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-ink/30"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
          />
          <div
            id={titleId}
            role="dialog"
            aria-modal="true"
            aria-label={refineLabel}
            className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-paper shadow-md"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="inline-flex items-center gap-2 font-slab text-sm uppercase tracking-widest text-ink">
                <FilterIcon />
                {refineLabel}
              </p>
              <button
                type="button"
                className="font-nav text-sm font-bold tracking-widest text-plum uppercase"
                onClick={() => setOpen(false)}
              >
                {closeLabel}
              </button>
            </div>
            <div className="p-5 sm:p-8">{children}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
