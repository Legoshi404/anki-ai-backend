import { NotesRepository } from "../repositories/notes.repository.js";

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
}
