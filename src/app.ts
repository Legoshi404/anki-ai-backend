import cors from "cors";
import express from "express";

import { errorHandler } from "./middlewares/error-handler.js";
import notesRouter from "./routes/notes.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler); // last

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

export default app;
