import crypto from "node:crypto";

import { FIELD_SEPARATOR } from "../constants/anki.js";
import type { NoteDto } from "../types/anki.js";

export function parseFields(
  fields: string,
): Pick<NoteDto, "title" | "content"> {
  const [title = "", content = ""] = fields.split(FIELD_SEPARATOR);

  return {
    title,
    content,
  };
}

export function buildFields(title: string, content: string): string {
  return [title, content].join(FIELD_SEPARATOR);
}

export function buildTags(tags: string[]): string {
  return tags.length === 0 ? "" : `${tags.join(" ")}`;
}

export function calculateChecksum(text: string): number {
  const hash = crypto.createHash("sha1").update(text, "utf8").digest();

  return hash.readUInt32BE(0);
}

export function currentMod(): number {
  return Math.floor(Date.now() / 1000);
}
