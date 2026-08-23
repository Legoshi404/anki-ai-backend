import { Router } from "express";

import { DecksController } from "../controllers/decks.controller.js";
import { DecksRepository } from "../repositories/decks.repositories.js";
import { DecksService } from "../services/decks.service.js";

const decksRouter = Router();

const decksRepository = new DecksRepository();
const decksService = new DecksService(decksRepository);
const decksController = new DecksController(decksService);

decksRouter.get("/decks", decksController.getAll);

export default decksRouter;
