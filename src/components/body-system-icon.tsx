import type { BodySystem } from "@/lib/content/types";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.55,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const iconClass = {
  sm: "size-[1.875rem]",
  md: "size-10",
  lg: "size-11",
} as const;

/** Line icons in site plum — same weight as header / body-map UI marks. */
export function BodySystemIcon({
  id,
  size = "md",
}: {
  id: BodySystem;
  size?: keyof typeof iconClass;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass[size]}>
      {id === "nervous" ? (
        <>
          <path
            d="M8.8 18.6c-1.6-.2-2.9-1.4-2.9-3 0-.4.1-.8.2-1.2A2.4 2.4 0 0 1 5 12.4c0-1 .5-1.8 1.3-2.2a2.3 2.3 0 0 1 .2-2.1A2.5 2.5 0 0 1 8.8 7.2c.7-.9 1.7-1.2 3.2-1.2s2.5.3 3.2 1.2a2.5 2.5 0 0 1 2.3 1.9 2.3 2.3 0 0 1 .2 2.1c.8.4 1.3 1.2 1.3 2.2a2.4 2.4 0 0 1-1.1 2 2.6 2.6 0 0 1-2.9 3"
            {...stroke}
          />
          <path d="M12 7.2v11.4M9.4 10.2c.6.4 1.3.6 2.6.6M9.3 12.8c.7.3 1.5.4 2.7.3M14.6 10.2c-.6.4-1.3.6-2.6.6M14.7 12.8c-.7.3-1.5.4-2.7.3" {...stroke} />
        </>
      ) : null}
      {id === "respiratory" ? (
        <>
          <path d="M11.5 4.8h1v2.4h-1z" fill="currentColor" stroke="none" />
          <path
            d="M8.4 8.2c-2.1.2-3.5 1.8-3.2 4.4.3 2.8 1.4 5.6 3 6.6.8.5 1.8-.1 1.9-1.2.2-2 .3-4.2-.1-6.2-.4-1.6-1.1-2.8-1.6-3.4"
            {...stroke}
          />
          <path
            d="M15.6 8.2c2.1.2 3.5 1.8 3.2 4.4-.3 2.8-1.4 5.6-3 6.6-.8.5-1.8-.1-1.9-1.2-.2-2-.3-4.2.1-6.2.4-1.6 1.1-2.8 1.6-3.4"
            {...stroke}
          />
        </>
      ) : null}
      {id === "cardiovascular" ? (
        <path
          d="M12 20.4s-6.2-4-6.2-8.2C5.8 9.2 8.8 6.4 12 6.4s6.2 2.8 6.2 5.8c0 4.2-6.2 8.2-6.2 8.2z"
          {...stroke}
        />
      ) : null}
      {id === "digestive" ? (
        <path
          d="M9.2 6.6c-2.2 1.6-3 3.8-2.4 6.2.6 2.6 2.6 4.4 5.2 4.6 2.2.2 4.2-.6 5.2-2.4.4-.7 0-1.4-.7-1.5-1.6-.3-2.4-1.4-2.6-2.8-.2-1.6.6-3 1.4-3.8.4-.5.2-1.3-.6-1.4-2-.5-4.2-.4-6.5 0z"
          {...stroke}
        />
      ) : null}
      {id === "urinary" ? (
        <>
          <path
            d="M8 5.2c-1.6.8-2.6 2.4-2.2 4.8.4 2.6 1.4 5.4 2.8 6.4.8.6 1.8-.2 1.7-1.4-.2-2.4-.6-4.8-1.2-6.6-.4-1.4-1-2.6-1.3-3.2z"
            {...stroke}
          />
          <path
            d="M16 5.2c1.6.8 2.6 2.4 2.2 4.8-.4 2.6-1.4 5.4-2.8 6.4-.8.6-1.8-.2-1.7-1.4.2-2.4.6-4.8 1.2-6.6.4-1.4 1-2.6 1.3-3.2z"
            {...stroke}
          />
          <path d="M12.2 17.2h3.2v2.2a1 1 0 0 1-1 1h-1.2a1 1 0 0 1-1-1v-2.2z" {...stroke} />
        </>
      ) : null}
      {id === "endocrine" ? (
        <>
          <path d="M8.2 12.4c0-2.2 1.7-4 3.8-4s3.8 1.8 3.8 4-1.7 4-3.8 4-3.8-1.8-3.8-4z" {...stroke} />
          <path d="M12 8.4V6.2M9.6 7.2l1.2 1M14.4 7.2l-1.2 1" {...stroke} />
          <path d="M9.4 14.8c1 1.2 2.4 1.8 4 1.8" {...stroke} />
        </>
      ) : null}
      {id === "immune" ? (
        <>
          <path d="M12 4.2 6 7v5.2c0 3.6 2.4 6 6 7.4 3.6-1.4 6-3.8 6-7.4V7L12 4.2z" {...stroke} />
          <path d="M12 9.2v3.6M12 12.8h2.2M10 10.8h4" {...stroke} />
        </>
      ) : null}
      {id === "lymphatic" ? (
        <>
          <circle cx="8.4" cy="9.2" r="2" {...stroke} />
          <circle cx="15.6" cy="9.2" r="2" {...stroke} />
          <circle cx="12" cy="16.8" r="2" {...stroke} />
          <path d="M9.8 10.6 10.8 15M14.2 10.6 13.2 15M10.8 15h2.4" {...stroke} />
        </>
      ) : null}
      {id === "musculoskeletal" ? (
        <>
          <path d="M11.2 5.4c0-.6.5-1 1-1h1.6c.6 0 1 .4 1 1v2.2" {...stroke} />
          <path d="M10.4 7.6h5.2v12.8a.8.8 0 0 1-.8.8h-3.6a.8.8 0 0 1-.8-.8V7.6z" {...stroke} />
          <path d="M9.6 10.4h6.8M9.6 13.6h6.8" {...stroke} />
        </>
      ) : null}
      {id === "skin" ? (
        <>
          <path d="M5 9h14v10H5z" {...stroke} />
          <path d="M5 12h14M5 15h14M5 18h14" {...stroke} />
        </>
      ) : null}
      {id === "womens-health" ? (
        <>
          <circle cx="12" cy="8.2" r="3.2" {...stroke} />
          <path d="M12 11.4V19M9.2 16h5.6" {...stroke} />
        </>
      ) : null}
      {id === "sensory" ? (
        <>
          <path d="M8.8 11.2c0-1.8 1.4-3.2 3.2-3.2s3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2z" {...stroke} />
          <path d="M12 14.4v2.4M9.6 18.4h4.8" {...stroke} />
          <path d="M6.4 12.8h1.2M16.4 12.8h1.2" {...stroke} />
        </>
      ) : null}
    </svg>
  );
}
