import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type ContactPage = {
  title: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  location?: string;
  photo?: string;
  body: string;
};

const realFile = path.join(process.cwd(), "content/contact.md");
const fixtureFile = path.join(process.cwd(), "test/fixtures/contact.md");

export const getContactPage = cache(function getContactPage(): ContactPage {
  const filePath = fs.existsSync(realFile) ? realFile : fixtureFile;
  if (!fs.existsSync(filePath)) {
    throw new Error("Missing content/contact.md");
  }
  return readContact(filePath);
});

export function readContact(filePath: string): ContactPage {
  const label = path.basename(filePath);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const data = parsed.data as Record<string, unknown>;
  const body = parsed.content.trim();

  if (!body) {
    throw new Error(`${label}: body is empty`);
  }

  const photo = optionalString(data.photo, label, "photo");

  return {
    title: requiredString(data.title, label, "title"),
    name: requiredString(data.name, label, "name"),
    role: optionalString(data.role, label, "role"),
    email: optionalString(data.email, label, "email"),
    phone: optionalString(data.phone, label, "phone"),
    location: optionalString(data.location, label, "location"),
    photo,
    body,
  };
}

function requiredString(value: unknown, label: string, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label}: ${field} is required`);
  }
  return value.trim();
}

function optionalString(
  value: unknown,
  label: string,
  field: string,
): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label}: ${field} must be text`);
  }
  return value.trim();
}
