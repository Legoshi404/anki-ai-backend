import { AppError } from "../errors/app-error.js";
import type { DecksRepository } from "../repositories/decks.repositories.js";
import { NotesRepository } from "../repositories/notes.repository.js";
import type { NoteDto } from "../types/anki.js";

export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly decksRepository: DecksRepository,
  ) {}

  getAll(deckId: number, page: number, pageSize: number) {
    const deck = this.decksRepository.getById(deckId);

    if (!deck) {
      throw new AppError("Deck not found", 404);
    }

    const notes = this.notesRepository.getAll(deckId, page, pageSize);
    const total = this.notesRepository.count(deckId);

    return {
      data: { deck, cards: notes },
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  deleteNote(id: number) {
    const deleted = this.notesRepository.deleteById(id);

    if (!deleted) {
      throw new AppError("Note not found", 404);
    }

    return {
      id,
    };
  }

  updateById(id: number, dto: NoteDto) {
    const note = this.notesRepository.updateById(id, dto);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    return note;
  }

  getNote(id: number) {
    const note = this.notesRepository.getById(id);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    return note;
  }
}
