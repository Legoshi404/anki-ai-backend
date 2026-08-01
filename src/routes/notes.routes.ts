import { Router } from "express";

import { notesController } from "../container.js";
import { validate } from "../middlewares/validate.js";
import { idParamSchema } from "../validators/common.validator.js";
import { updateNoteSchema } from "../validators/note.validator.js";

const router = Router();

router.get("/decks/1/cards", notesController.getAll);
router.delete("/decks/1/cards/:id", notesController.deleteNote);
router.patch(
  "/decks/1/cards/:id",
  validate(idParamSchema, "params"),
  validate(updateNoteSchema),
  notesController.updateById,
);

export default router;
