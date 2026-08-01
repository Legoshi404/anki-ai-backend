import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

import { AppError } from "../errors/app-error.js";

export function validate(
  schema: ZodType,
  target: "body" | "params" | "query" = "body",
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return next(new AppError("Invalid request body", 400));
    }

    req[target] = result.data;

    next();
  };
}
