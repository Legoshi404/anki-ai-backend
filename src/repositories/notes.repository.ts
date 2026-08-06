import { db } from "../database/anki.database.js";
import { mapNoteRowToDto } from "../mappers/note.mapper.js";
import type { AnkiNoteRow, NoteDto } from "../types/anki.js";
import { parseFields } from "../utils/anki-note.js";
import { buildNoteUpdate } from "../utils/build-note-update.js";

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

  getById(id: number): NoteDto | null {
    const row = db
      .prepare(
        `
        SELECT
          id,
          flds,
          tags
        FROM notes
        WHERE id = ?
        `,
      )
      .get(id) as
      | {
          id: number;
          flds: string;
          tags: string;
        }
      | undefined;

    if (!row) {
      return null;
    }

    const { title, content } = parseFields(row.flds);

    return {
      id: row.id,
      title,
      content,
      tags: row.tags.trim() === "" ? [] : row.tags.trim().split(/\s+/),
    };
  }

  updateById(id: number, dto: NoteDto): NoteDto | null {
    return db.transaction(() => {
      const note = this.getById(id);

      if (!note) {
        return null;
      }

      const { flds, tags, csum, sfld, mod } = buildNoteUpdate(note, dto);

      const result = db
        .prepare(
          `
        UPDATE notes
        SET
          flds = ?,
          tags = ?,
          sfld = ?,
          csum = ?,
          mod = ?,
          usn = -1
        WHERE id = ?
        `,
        )
        .run(flds, tags, sfld, csum, mod, id);

      if (result.changes === 0) {
        return null;
      }

      db.prepare(
        `
          UPDATE cards
          SET mod = ?
          WHERE nid = ?`,
      ).run(mod, id);

      return this.getById(id);
    })();
  }
}
