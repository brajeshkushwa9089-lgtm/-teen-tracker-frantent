# TeenSpend

> Track it. Understand it. Spend smarter.

TeenSpend is a full-stack expense tracker designed for teenagers and students. This repository keeps the React client and Express API separate, with Supabase/PostgreSQL planned as the data layer.

## Phase 1: project setup

This initial phase provides a runnable React + Vite frontend and a secure Express foundation using ES modules, CORS, Helmet, rate limiting, environment configuration, and a basic MVC directory structure. Feature APIs and the Supabase schema come in subsequent phases.

## Structure

```text
teen-expense-tracker/
├── frontend/       # React + Vite client
├── backend/        # Express REST API (MVC)
├── package.json    # Workspace helper scripts
└── .gitignore
```

## Prerequisites

- Node.js 20 LTS or newer
- npm 10 or newer
- A Supabase project (needed from Phase 2 onward)

## Install and run

```bash
cd teen-expense-tracker
npm install
npm run install:all
copy backend\\.env.example backend\\.env
copy frontend\\.env.example frontend\\.env
npm run dev
```

Open `http://127.0.0.1:5173`. The API health endpoint is at `http://127.0.0.1:5000/api/health`.

Alternatively, run each app separately:

```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

## Environment variables

Never commit `.env` files. Start from the supplied `.env.example` files. `SUPABASE_SERVICE_ROLE_KEY` remains on the backend only and will be used in Phase 2.

## Architecture

The browser will communicate only with `/api` REST endpoints. Controllers will coordinate requests, services will hold business logic, and models will own Supabase data access. Authentication and authorization will be added before any user financial data endpoints.

## Database setup

The Phase 2 schema is ready in [backend/database/schema.sql](backend/database/schema.sql). Follow [backend/database/README.md](backend/database/README.md) to create the tables, default categories, indexes, automatic `updated_at` timestamps, and row-level security policies in Supabase.

## Next phase

Phase 3 will add registration, login, bcrypt password hashing, JWT middleware, and protected frontend routes.
