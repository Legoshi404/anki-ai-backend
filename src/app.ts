import cors from "cors";
import express from "express";

// import { delay } from "./middlewares/delay.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { validate } from "./middlewares/validate.js";
import notesRouter from "./routes/notes.routes.js";
import { idParamSchema } from "./validators/common.validator.js";
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

app.get("/decks/1/cards", notesRouter);
app.get("/decks/1/cards/:id", validate(idParamSchema, "params"), notesRouter);
app.delete("/decks/1/cards/:id", notesRouter);
app.patch(
  "/decks/1/cards/:id",
  validate(idParamSchema, "params"),
  validate(updateNoteSchema),
  notesRouter,
);
app.use(errorHandler); // last

export default app;
