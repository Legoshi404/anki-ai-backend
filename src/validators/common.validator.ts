import { z } from "zod";

export const cardIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const deckIdParamSchema = z.object({
  deckId: z.coerce.number().int().positive(),
});

export const deckCardIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
  deckId: z.coerce.number().int().positive(),
});
