# API Vault

API Vault is a SvelteKit app for storing and managing API keys with Prisma.

## Setup

1. Install dependencies:

```sh
npm install
```

2. Set up your database connection in `.env` (`DATABASE_URL`).

3. Run Prisma migrations:

```sh
npx prisma migrate dev
```

## Development

```sh
npm run dev
```

## Quality check

```sh
npm run check
```

## Production

```sh
npm run build
npm run preview
```
