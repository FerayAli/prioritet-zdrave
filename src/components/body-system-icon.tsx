import type { BodySystem } from "@/lib/content/types";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BodySystemIcon({ id }: { id: BodySystem }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7">
      {id === "nervous" ? (
        <>
          <path d="M9.2 18.4c-1.8-.2-3.2-1.6-3.2-3.3 0-.5.1-1 .3-1.4A2.7 2.7 0 0 1 5 11.2c0-1.1.6-2 1.5-2.5A2.6 2.6 0 0 1 6.2 6.4 2.8 2.8 0 0 1 8.8 4.6C9.6 3.6 10.7 3.2 12 3.2" {...stroke} />
          <path d="M14.8 18.4c1.8-.2 3.2-1.6 3.2-3.3 0-.5-.1-1-.3-1.4A2.7 2.7 0 0 0 19 11.2c0-1.1-.6-2-1.5-2.5a2.6 2.6 0 0 0 .3-2.3 2.8 2.8 0 0 0-2.6-1.8C14.4 3.6 13.3 3.2 12 3.2" {...stroke} />
          <path d="M12 3.2v15.6" {...stroke} />
          <path d="M9.3 8.4c.7.5 1.5.7 2.7.7M9.2 11.6c.8.4 1.6.5 2.8.4M14.7 8.4c-.7.5-1.5.7-2.7.7M14.8 11.6c-.8.4-1.6.5-2.8.4" {...stroke} />
        </>
      ) : null}
      {id === "respiratory" ? (
        <>
          <path fill="currentColor" d="M11.4 4.2h1.2v2.2h-1.2z" />
          <path fill="currentColor" d="M8.2 7.2c-2.4.3-4 2.2-3.7 5.1.3 3.2 1.5 6.4 3.2 7.5.9.6 2 .1 2.1-1 .3-2.4.5-5 .1-7.4C9.5 9.6 8.8 8 8.2 7.2z" />
          <path fill="currentColor" d="M15.8 7.2c2.4.3 4 2.2 3.7 5.1-.3 3.2-1.5 6.4-3.2 7.5-.9.6-2 .1-2.1-1-.3-2.4-.5-5-.1-7.4.4-1.8 1.1-3.4 1.7-4.2z" />
        </>
      ) : null}
      {id === "cardiovascular" ? (
        <path fill="currentColor" d="M12 20.2s-6.6-4.2-6.6-8.6A3.6 3.6 0 0 1 12 8.2a3.6 3.6 0 0 1 6.6 3.4c0 4.4-6.6 8.6-6.6 8.6z" />
      ) : null}
      {id === "digestive" ? (
        <path fill="currentColor" d="M8.4 6.2c-2.6 1.8-3.6 4.4-2.8 7.2.8 3.2 3.2 5.4 6.4 5.6 2.6.2 5-.8 6.2-2.8.5-.8 0-1.6-.8-1.7-1.8-.3-2.8-1.6-3-3.2-.2-1.8.6-3.4 1.6-4.6.5-.6.2-1.5-.6-1.7-2.2-.6-4.6-.4-7 .2z" />
      ) : null}
      {id === "urinary" ? (
        <>
          <path fill="currentColor" d="M7.6 4.8c-2 .8-3.2 2.8-2.6 5.6.5 2.8 1.8 5.8 3.6 6.8 1 .6 2.2-.3 2.1-1.6-.2-2.6-.6-5.2-1.2-7.2-.5-1.6-1.1-3-1.9-3.6z" />
          <path fill="currentColor" d="M16.4 4.8c2 .8 3.2 2.8 2.6 5.6-.5 2.8-1.8 5.8-3.6 6.8-1 .6-2.2-.3-2.1-1.6.2-2.6.6-5.2 1.2-7.2.5-1.6 1.1-3 1.9-3.6z" />
        </>
      ) : null}
      {id === "endocrine" ? (
        <path fill="currentColor" d="M12 7.8c.7-2.6 2-4.2 3.4-4.6 2 2.2 2.4 4.8 1.4 7.6-.7 2-2 3.4-3.4 4-.4-1.8-.8-3.6-1.4-5 .6 1.4 1 3.2 1.4 5-1.4-.6-2.7-2-3.4-4-.1-2.8-.6-5.4 1.4-7.6 1.4.4 2.7 2 3.4 4.6-.7-2.6-2-4.2-3.4-4.6z" />
      ) : null}
      {id === "immune" ? (
        <path fill="currentColor" d="M12 3.2 5.2 6v5.8c0 4.2 2.8 7 6.8 8.6 4-1.6 6.8-4.4 6.8-8.6V6L12 3.2z" />
      ) : null}
      {id === "musculoskeletal" ? (
        <path fill="currentColor" d="M4.8 9.2a2 2 0 1 0 2.3 2.8l2.2-.2h5.4l2.2.2a2 2 0 1 0 .4-2.2 2 2 0 1 0-2.6-2.4L12 8.2l-2.7-.8a2 2 0 1 0-2.6 2.4 2 2 0 0 0-1.9-.6z" />
      ) : null}
      {id === "skin" ? (
        <>
          <path d="M4.5 8c2.2-1.2 4-1.2 6.3.3 2.3 1.5 4.1 1.5 6.3.3" {...stroke} strokeWidth={1.7} />
          <path d="M4.5 12c2.2-1.2 4-1.2 6.3.3 2.3 1.5 4.1 1.5 6.3.3" {...stroke} strokeWidth={1.7} />
          <path d="M4.5 16c2.2-1.2 4-1.2 6.3.3 2.3 1.5 4.1 1.5 6.3.3" {...stroke} strokeWidth={1.7} />
        </>
      ) : null}
      {id === "womens-health" ? (
        <>
          <circle cx="12" cy="8" r="3.3" {...stroke} strokeWidth={1.8} />
          <path d="M12 11.3V19.2M8.6 16h6.8" {...stroke} strokeWidth={1.8} />
        </>
      ) : null}
    </svg>
  );
}
