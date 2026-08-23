import cors from "cors";
import express from "express";

// import { delay } from "./middlewares/delay.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { validate } from "./middlewares/validate.js";
import decksRouter from "./routes/decks.routes.js";
import notesRouter from "./routes/notes.routes.js";
import {
  deckCardIdParamSchema,
  deckIdParamSchema,
} from "./validators/common.validator.js";
import { updateNoteSchema } from "./validators/note.validator.js";

const app = express();

// app.use(delay(1000));
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Anki Ai backend s running",
  });
});

app.get("/health", (_, res) => {
  res.json({
    status: "OK",
  });
});
// Decks
app.get("/decks", decksRouter);
// Cards
app.get(
  "/decks/:deckId/cards",
  validate(deckIdParamSchema, "params"),
  notesRouter,
);
app.get(
  "/decks/:deckId/cards/:id",
  validate(deckCardIdParamSchema, "params"),
  notesRouter,
);
app.delete(
  "/decks/:deckId/cards/:id",
  validate(deckCardIdParamSchema, "params"),
  notesRouter,
);
app.patch(
  "/decks/:deckId/cards/:id",
  validate(deckCardIdParamSchema, "params"),
  validate(updateNoteSchema),
  notesRouter,
);
// AI
app.post(
  "/decks/:deckId/cards/:id/improve",
  validate(deckCardIdParamSchema, "params"),
  notesRouter,
);

app.use(errorHandler); // last

export default app;
