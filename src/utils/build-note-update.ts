import type { NoteUpdate } from "../models/note.js";
import type { NoteDto } from "../types/anki.js";
import { buildFields, calculateChecksum, currentMod } from "./anki-note.js";

export function buildNoteUpdate(note: NoteDto, dto: NoteDto): NoteUpdate {
  const sfld = dto.title ?? note.title;
  const content = dto.content ?? note.content;
  const tags = dto.tags ?? note.tags;
  const flds = buildFields(sfld, content);
  const csum = calculateChecksum(sfld);
  const mod = currentMod();

  return {
    flds,
    tags,
    sfld,
    csum,
    mod,
    usn: -1,
  };
}
