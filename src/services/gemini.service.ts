import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

import { improveNoteSchema } from "../validators/improve-note.validator.js";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class GeminiService {
  private readonly ai: GoogleGenAI;

  private shouldRetry(error: unknown): boolean {
    if (error instanceof SyntaxError) {
      return true;
    }

    if (error instanceof z.ZodError) {
      return true;
    }

    if (typeof error === "object" && error !== null && "status" in error) {
      const status = error.status;

      return (
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504
      );
    }

    return false;
  }

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateJson<T>(prompt: string): Promise<T> {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await this.ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        return improveNoteSchema.parse(JSON.parse(response.text ?? "")) as T;
      } catch (error) {
        const shouldRetry = this.shouldRetry(error);

        if (!shouldRetry || attempt === MAX_RETRIES) {
          throw error;
        }

        const delayMs = RETRY_DELAY_MS * attempt;

        console.log(
          `Attempt ${attempt} failed. Retrying in ${RETRY_DELAY_MS} ms...`,
        );

        await delay(delayMs);
      }
    }
    throw new Error("Failed to generate JSON after multiple attempts.");
  }
}
