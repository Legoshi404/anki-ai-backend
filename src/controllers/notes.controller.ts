import type { NextFunction, Request, Response } from "express";

import { NotesService } from "../services/notes.service.js";
import { ApiResponse } from "../utils/api-response.js";

export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  getAll = (req: Request, res: Response, next: NextFunction) => {
    try {
      const deckId = Number(req.params.deckId);
      const page = parsePositiveInt(req.query.page, 1);
      const pageSize = Math.min(parsePositiveInt(req.query.pageSize, 20), 100);
      const result = this.notesService.getAll(deckId, page, pageSize);

      res.json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  };

  deleteNote = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const result = this.notesService.deleteNote(id);

      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateById = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const result = this.notesService.updateById(id, req.body);

      res.json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getNote = (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = this.notesService.getNote(Number(req.params.id));

      res.json({
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };
}

function parsePositiveInt(value: unknown, defaultValue: number) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return defaultValue;
  }

  return parsed;
}
