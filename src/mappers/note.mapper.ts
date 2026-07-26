import type { AnkiNoteRow, NoteDto } from "../types/anki.js";

const FIELD_SEPARATOR = "\x1f";

export function mapNoteRowToDto({ id, flds, tags }: AnkiNoteRow): NoteDto {
  const fldsArray = flds.split(FIELD_SEPARATOR);

  let title = "",
    content = "";

  switch (fldsArray.length) {
    case 1:
      title = fldsArray[0] || "";
      content = "";
      break;
    case 2:
      title = fldsArray[0] || "";
      content = fldsArray[1] || "";
      break;
  }

  return {
    id,
    title,
    content,
    tags: tags.split(" "),
  };
}
