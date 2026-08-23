import type { DeckDto } from "../dto/deck.js";
import { DecksRepository } from "../repositories/decks.repositories.js";

export class DecksService {
  constructor(private readonly decksRepository: DecksRepository) {}

  getAll(): DeckDto[] {
    return this.decksRepository.getAll();
  }
}
