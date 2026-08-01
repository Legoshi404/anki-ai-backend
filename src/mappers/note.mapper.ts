import { FIELD_SEPARATOR } from "../constants/anki.js";
import type { AnkiNoteRow, NoteDto } from "../types/anki.js";

export function mapNoteRowToDto({ id, flds, tags }: AnkiNoteRow): NoteDto {
  const [title = "", content = ""] = flds.split(FIELD_SEPARATOR);

  return {
    id,
    title,
    content,
    tags: tags.split(" "),
  };
}
