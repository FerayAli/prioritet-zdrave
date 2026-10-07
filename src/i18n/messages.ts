import fs from "node:fs";
import path from "node:path";
import { messageKeys, type MessageKey } from "@/i18n/keys";

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (inQuotes) {
      if (character === '"') {
        if (text[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += character;
      }
      continue;
    }

    if (character === '"') {
      inQuotes = true;
    } else if (character === ",") {
      row.push(cell);
      cell = "";
    } else if (character === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (character !== "\r") {
      cell += character;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((entry) => entry.some((value) => value.length > 0));
}

export function loadMessages(
  csvPath = path.join(process.cwd(), "locales/messages.csv"),
): Record<MessageKey, string> {
  const text = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "");
  const [header, ...rows] = parseCsv(text);

  if (!header || header[0] !== "key" || header[1] !== "en" || header[2] !== "bg") {
    throw new Error("locales/messages.csv must start with key,en,bg");
  }

  const english = new Map<string, string>();

  for (const row of rows) {
    const key = row[0] ?? "";
    const value = row[1] ?? "";
    if (!key) continue;
    if (!value.trim()) {
      throw new Error(`Missing English copy for ${key}`);
    }
    english.set(key, value);
  }

  const messages = {} as Record<MessageKey, string>;

  for (const key of messageKeys) {
    const value = english.get(key);
    if (!value) {
      throw new Error(`Missing English copy for ${key}`);
    }
    messages[key] = value;
  }

  return messages;
}

let cache: Record<MessageKey, string> | null = null;

export function t(key: MessageKey, vars?: Record<string, string>): string {
  cache ??= loadMessages();
  let value = cache[key];

  if (vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replaceAll(`{${name}}`, replacement);
    }
  }

  return value;
}
