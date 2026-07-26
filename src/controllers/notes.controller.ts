import type { NextFunction,Request, Response } from "express";

import { NotesService } from "../services/notes.service.js";
import { ApiResponse } from "../utils/api-response.js";

export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  getAll = (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parsePositiveInt(req.query.page, 1);
      const pageSize = Math.min(parsePositiveInt(req.query.pageSize, 20), 100);
      const result = this.notesService.getAll(page, pageSize);

      res.json(ApiResponse.success(result));
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
