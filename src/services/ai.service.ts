import { AppError } from "../errors/app-error.js";
import { buildImprovePrompt } from "../prompts/improve-card.prompt.js";
import type { NotesRepository } from "../repositories/notes.repository.js";
import type { GeminiService } from "./gemini.service.js";

export class AiService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly geminiService: GeminiService,
  ) {}

  async improveNote(noteId: number): Promise<void> {
    const note = this.notesRepository.getById(noteId);

    if (!note) {
      throw new AppError(`Note with ID ${noteId} not found`, 404);
    }

    return this.geminiService.generateJson(buildImprovePrompt(note));
  }
}
