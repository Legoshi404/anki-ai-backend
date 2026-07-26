import { db } from "../database/anki.database.js";
import { mapNoteRowToDto } from "../mappers/note.mapper.js";
import type { AnkiNoteRow, NoteDto } from "../types/anki.js";

export class NotesRepository {
  getAll(page: number, pageSize: number): NoteDto[] {
    const offset = (page - 1) * pageSize;

    const notes = db
      .prepare("SELECT id, flds, tags FROM notes LIMIT ? OFFSET ?")
      .all(pageSize, offset) as AnkiNoteRow[];

    return notes.map(mapNoteRowToDto);
  }

  count(): number {
    const result = db.prepare("SELECT COUNT(*) as total FROM notes").get() as {
      total: number;
    };

    return result.total;
  }
}
