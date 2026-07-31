import type { NextFunction, Request, Response } from "express";

export function delay(ms: number) {
  return (_req: Request, _res: Response, next: NextFunction) => {
    setTimeout(next, ms);
  };
}
