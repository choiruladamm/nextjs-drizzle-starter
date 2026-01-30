# Postgres Connection Issue Summary

## The Problem

During the setup of the Dockerized PostgreSQL database, we encountered a **"Password authentication failed for user 'postgres'"** error when trying to run `bun run db:push`.

### Symptoms

- The Docker container was running.
- The credentials in `docker-compose.yml` (`postgres/postgres`) matched the connection string.
- Drizzle Kit consistently reported an authentication failure (FATAL code `28P01`).

### Root Cause Analysis

The issue was caused by a **Port Conflict** on the host machine (port `5432`).

When connecting to `localhost:5432`, the connection was likely being intercepted by:

1.  **Another PostgreSQL instance**: A local Homebrew installation or another background service was listening on port 5432.
2.  **Ambiguity**: Even though Docker mapped the port, the client might have been routing to the local instance instead of the Docker container, and the local instance had different credentials (or none).

## The Solution

To resolve this, we took the following steps:

1.  **Changed the Host Port**:
    We modified `docker-compose.yml` to map the container's PostgreSQL port (5432) to a different unused port on the host (**5435**).

    ```yaml
    ports:
      - '5435:5432'
    ```

2.  **Updated Connection String**:
    We pointed the application to the new port in the `.env` file.

    ```bash
    DATABASE_URL="postgresql://postgres:postgres@localhost:5435/postgres"
    ```

3.  **Reset Database State**:
    We ran `docker-compose down -v` to destroy the container and its volumes, ensuring a clean initialization of the database with the correct password.

## Result

After these changes, `bun run db:push` successfully connected to the container and applied the schema changes.
