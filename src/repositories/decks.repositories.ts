import { db } from "../database/anki.database.js";
import type { DeckDto, DeckShortDto } from "../dto/deck.js";

interface AnkiDeck {
  id: number;
  name: string;
  conf: number;
  newLimit: number | null;
  reviewLimit: number | null;
  newToday: [number, number];
  revToday: [number, number];
}

interface CollectionRow {
  decks: string;
  dconf: string;
}

interface CardRow {
  did: number;
  queue: number;
}

interface DeckConfig {
  id: number;
  new: {
    perDay: number;
  };
  rev: {
    perDay: number;
  };
}

export class DecksRepository {
  getAll(): DeckDto[] {
    const row = db
      .prepare("SELECT decks, dconf FROM col LIMIT 1")
      .get() as CollectionRow;

    const decks = JSON.parse(row.decks) as Record<string, AnkiDeck>;
    const deckConfigs = JSON.parse(row.dconf) as Record<string, DeckConfig>;

    const cards = db
      .prepare(
        `
        SELECT did, queue
        FROM cards
        `,
      )
      .all() as CardRow[];

    const counts = new Map<
      number,
      {
        total: number;
        newCount: number;
        learningCount: number;
        reviewCount: number;
      }
    >();

    for (const card of cards) {
      const current = counts.get(card.did) ?? {
        total: 0,
        newCount: 0,
        learningCount: 0,
        reviewCount: 0,
      };

      current.total++;

      if (card.queue === 0) {
        current.newCount++;
      } else if (card.queue === 1 || card.queue === 3) {
        current.learningCount++;
      } else if (card.queue === 2) {
        current.reviewCount++;
      }

      counts.set(card.did, current);
    }

    return Object.values(decks)
      .map((deck) => {
        const count = counts.get(deck.id) ?? {
          total: 0,
          newCount: 0,
          learningCount: 0,
          reviewCount: 0,
        };

        const config = deckConfigs[String(deck.conf)];

        const newLimit = deck.newLimit ?? config!.new.perDay;
        const reviewLimit = deck.reviewLimit ?? config!.rev.perDay;

        const newToday = deck.newToday[1];
        const reviewToday = deck.revToday[1];

        return {
          id: deck.id,
          name: deck.name,
          ...count,
          newLimit,
          newToday,
          newRemaining: Math.max(newLimit - newToday, 0),
          reviewLimit,
          reviewToday,
          reviewRemaining: Math.max(reviewLimit - reviewToday, 0),
        };
      })
      .filter((deck) => deck.id !== 1 || deck.total > 0);
  }

  getById(id: number): DeckShortDto | null {
    const row = db.prepare("SELECT decks FROM col LIMIT 1").get() as {
      decks: string;
    };

    const decks = JSON.parse(row.decks) as Record<
      string,
      {
        id: number;
        name: string;
      }
    >;

    const deck = decks[String(id)];

    if (!deck) {
      return null;
    }

    return {
      id: deck.id,
      name: deck.name,
    };
  }
}
