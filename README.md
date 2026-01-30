# Next.js Modular API with Drizzle, Better Auth & Scalar

A modern, scalable API starter template built with Next.js App Router, Drizzle ORM, and Better Auth.

## Features

- 🏗️ **Architecture**: Modular "Vertical Slice" architecture (`features/`, `db/`, `lib/`).
- 🗄️ **Database**: Postgres with Drizzle ORM.
- 🔐 **Authentication**: Better Auth (Email/Password) + Drizzle Adapter.
- 📜 **Documentation**: OpenAPI 3.0 spec + Scalar UI (Interactive Docs).
- ✅ **Validation**: Zod for runtime validation.
- 🛡️ **Type Safety**: End-to-end TypeScript.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Auth**: Better Auth
- **Docs**: @scalar/nextjs-api-reference, zod-to-openapi
- **Validation**: Zod
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js & pnpm
- PostgreSQL Database

### 1. Installation

```bash
pnpm install
```

### 2. Environment Variables

Create `.env` file:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
BETTER_AUTH_SECRET=generate_with_openssl_rand_base64_32
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

```bash
# Push schema to database
pnpm db:push

# (Optional) Open Drizzle Studio
pnpm db:studio
```

### 4. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000).

## API Documentation

Interactive API documentation is available at:
👉 **[http://localhost:3000/reference](http://localhost:3000/reference)**

Raw OpenAPI JSON:
👉 `/api/openapi.json`

## Modules

### Users

- **List Users**: `GET /api/users` (Paginated)
- **Create User**: `POST /api/users`
- **Get User**: `GET /api/users/:id`

## Scripts

- `pnpm dev`: Start dev server
- `pnpm build`: Build for production
- `pnpm tsc`: Type check
- `pnpm db:push`: Push schema changes
- `pnpm db:studio`: Open database GUI
