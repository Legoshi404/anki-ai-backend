import { Router } from "express";

import { aiController, notesController } from "../container.js";
import { validate } from "../middlewares/validate.js";
import { idParamSchema } from "../validators/common.validator.js";
import { updateNoteSchema } from "../validators/note.validator.js";

const router = Router();

router.get("/decks/1/cards", notesController.getAll);
router.get(
  "/decks/1/cards/:id",
  validate(idParamSchema, "params"),
  notesController.getNote,
);
router.delete("/decks/1/cards/:id", notesController.deleteNote);
router.patch(
  "/decks/1/cards/:id",
  validate(idParamSchema, "params"),
  validate(updateNoteSchema),
  notesController.updateById,
);
// AI route
router.post(
  "/decks/1/cards/:id/improve",
  validate(idParamSchema, "params"),
  aiController.improveNote,
);

export default router;
