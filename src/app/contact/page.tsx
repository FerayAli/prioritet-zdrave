import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getContactPage } from "@/lib/content/contact";

export const dynamic = "force-static";

export function generateMetadata() {
  const contact = getContactPage();
  return { title: contact.title };
}

export default function ContactPage() {
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
    <article className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-10">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {contact.photo ? (
          <div className="relative aspect-[4/3] overflow-hidden lg:sticky lg:top-28">
            <Image
              src={contact.photo}
              alt={contact.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[center_35%]"
            />
          </div>
        ) : null}
        <div>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {contact.name}
          </h1>
          {contact.role ? <p className="mt-3 text-lg">{contact.role}</p> : null}
          {details.length > 0 ? (
            <ul className="mt-6 space-y-2 text-lg">
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
          <div className="mt-8">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mt-4 text-lg leading-relaxed text-ink/90">
                    {children}
                  </p>
                ),
                h2: ({ children }) => (
                  <h2 className="mt-8 font-serif text-2xl font-semibold text-ink">
                    {children}
                  </h2>
                ),
                ul: ({ children }) => (
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-lg leading-relaxed">
                    {children}
                  </ul>
                ),
              }}
            >
              {contact.body}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
}
