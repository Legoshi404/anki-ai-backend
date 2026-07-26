import Database from "better-sqlite3";

const db = new Database("data/collection.anki21", { readonly: false });

export { db };
