import type { NextFunction, Request, Response } from "express";

import type { AiService } from "../services/ai.service.js";

export class AiController {
  constructor(private readonly aiService: AiService) {}

  improveNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.aiService.improveNote(Number(req.params.id));

      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
