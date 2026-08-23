import type { NextFunction, Request, Response } from "express";

import type { DecksService } from "../services/decks.service.js";
import { ApiResponse } from "../utils/api-response.js";

export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  getAll = (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = this.decksService.getAll();

      res.json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  };
}
