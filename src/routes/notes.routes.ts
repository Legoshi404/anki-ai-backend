import { Router } from "express";

import { notesController } from "../container.js";

const router = Router();

router.get("/decks/1/cards", notesController.getAll);

export default router;
