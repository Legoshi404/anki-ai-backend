import { NotesController } from "./controllers/notes.controller.js";
import { NotesRepository } from "./repositories/notes.repository.js";
import { NotesService } from "./services/notes.service.js";

const notesRepository = new NotesRepository();
const notesService = new NotesService(notesRepository);
export const notesController = new NotesController(notesService);
