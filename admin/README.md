# Highlights Admin

Local-only React admin app for syncing highlight images from S3 and managing captions.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the app and API server together:

```bash
npm run dev
```

This starts:

- Vite client on `http://localhost:5173`
- Express API on `http://localhost:8787`

## Required environment variables

The API reads S3 credentials from `../.env` (repo root), using the same variables as the website highlights page:

- `S3_ENDPOINT`
- `S3_PUBLIC_URL`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `S3_REGION`
- `S3_BUCKET`
- `S3_FOLDER`

## Data file

Caption data is stored in:

`data/highlight-captions.json`

Each item has this shape:

```ts
type HighlightImage = {
  id: string;
  url: string;
  caption?: string;
};
```

## API endpoints

- `GET /api/images` - load caption data from JSON file
- `POST /api/sync-images` - list images from S3 and merge into JSON file
- `POST /api/update-caption` - update one caption by `{ id, caption }`
