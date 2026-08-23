import { Router } from "express";

import { aiController, notesController } from "../container.js";
import { validate } from "../middlewares/validate.js";
import {
  deckCardIdParamSchema,
  deckIdParamSchema,
} from "../validators/common.validator.js";
import { updateNoteSchema } from "../validators/note.validator.js";

const router = Router();

router.get(
  "/decks/:deckId/cards",
  validate(deckIdParamSchema, "params"),
  notesController.getAll,
);
router.get(
  "/decks/:deckId/cards/:id",
  validate(deckCardIdParamSchema, "params"),
  notesController.getNote,
);
router.delete(
  "/decks/:deckId/cards/:id",
  validate(deckCardIdParamSchema, "params"),
  notesController.deleteNote,
);
router.patch(
  "/decks/:deckId/cards/:id",
  validate(deckCardIdParamSchema, "params"),
  validate(updateNoteSchema),
  notesController.updateById,
);
// AI route
router.post(
  "/decks/:deckId/cards/:id/improve",
  validate(deckCardIdParamSchema, "params"),
  aiController.improveNote,
);

export default router;
