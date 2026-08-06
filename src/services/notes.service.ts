import { AppError } from "../errors/app-error.js";
import { NotesRepository } from "../repositories/notes.repository.js";
import type { NoteDto } from "../types/anki.js";

export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  getAll(page: number, pageSize: number) {
    const notes = this.notesRepository.getAll(page, pageSize);
    const total = this.notesRepository.count();

    return {
      data: notes,
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
