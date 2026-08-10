import dotenv from "dotenv";

import { AiController } from "./controllers/ai.controller.js";
import { NotesController } from "./controllers/notes.controller.js";
import { NotesRepository } from "./repositories/notes.repository.js";
import { AiService } from "./services/ai.service.js";
import { GeminiService } from "./services/gemini.service.js";
import { NotesService } from "./services/notes.service.js";

dotenv.config({ override: true });

const notesRepository = new NotesRepository();
const notesService = new NotesService(notesRepository);
export const notesController = new NotesController(notesService);

// AI
const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
const geminiService = new GeminiService(GEMINI_API_KEY);
const aiService = new AiService(notesRepository, geminiService);
export const aiController = new AiController(aiService);
