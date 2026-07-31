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

  deleteById(id: number): boolean {
    const transaction = db.transaction(() => {
      const note = db.prepare("SELECT id FROM notes WHERE id = ?").get(id);

      if (!note) {
        return false;
      }

      const cards = db
        .prepare("SELECT id FROM cards WHERE nid = ?")
        .all(id) as { id: number }[];

      const cardIds = cards.map((card) => card.id);

      if (cardIds.length > 0) {
        const placeholders = cardIds.map(() => "?").join(",");

        db.prepare(`DELETE FROM revlog WHERE cid IN (${placeholders})`).run(
          ...cardIds,
        );

        db.prepare(`DELETE FROM cards WHERE nid = ?`).run(id);

        db.prepare("DELETE FROM notes WHERE id = ?").run(id);

        return true;
      }
    });

    return transaction() as boolean;
  }
}
