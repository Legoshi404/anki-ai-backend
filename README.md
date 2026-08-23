# Anki AI Backend

Backend service for an Anki card management application.

The goal of this project is to create an application similar to Anki, but with additional features preferred by the author.

Currently, the application is in active development. At the moment, the backend supports basic flashcard management functionality and AI-powered card improvement.

## Features

Currently available:

- Viewing Anki decks
- Viewing Anki cards
- Viewing individual cards
- Pagination for card lists
- Editing existing cards
- Deleting cards
- Improving cards using AI

## Tech Stack

- Node.js
- TypeScript
- Express
- SQLite
- better-sqlite3
- Google Gemini API
- ESLint

## Requirements

- Node.js 22+

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd anki-ai-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Gemini API key

The project already contains a `.env` file.

Open the `.env` file and add your Gemini API key after `GEMINI_API_KEY=`:

```env
GEMINI_API_KEY=your_api_key
```

Replace `your_api_key` with your Google Gemini API key.

### 4. Start the application

```bash
npm run dev
```

The backend will start in development mode.

## Notes

The application currently uses a hardcoded Anki database. Support for loading a custom Anki database is planned for the future.
