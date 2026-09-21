export interface AnkiNoteRow {
  id: number;
  guid: string;
  mid: number;
  mod: number;
  usn: number;
  tags: string;
  flds: string;
  sfld: string;
  csum: number;
  flags: number;
  data: string;
  deckId: number;
}

export interface NoteDto {
  id: number;
  title: string;
  content: string;
  tags: string[];
}
