# API Vault

API Vault is a SvelteKit app for storing and managing API keys with Prisma.

## Setup

1. Install dependencies:

```sh
bun install
```

2. Set up your database connection in `.env` (`DATABASE_URL`).

3. Run Prisma migrations:

```sh
bunx prisma migrate dev
```

## Development

```sh
bun run dev
```

## Quality check

```sh
bun run check
```

## Production

```sh
bun run build
bun run preview
```
