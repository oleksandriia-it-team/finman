# Project Structure

FinMan leverages a **Hybrid Architecture** to ensure scalability, maintainability, and a clear separation of concerns.
The project strictly separates **Client-side logic** (Browser, IndexedDB, React) from **Server-side logic** (Node.js, PostgreSQL, API handlers), while providing a safe space for shared contracts.

## High Level Overview

The `src` directory is divided into four main layers:

* **`app/`**: **Routing Layer**. Next.js routing files only. Connects requests to logic.
* **`client/`**: **Frontend Layer**. Follows **Feature-Sliced Design (FSD)** principles.
* **`server/`**: **Backend Layer**. Follows **Domain-Driven Design (DDD)** principles.
* **`common/`**: **Shared Contract Layer**. Types, Interfaces, Constants, Records. **NO** business logic or runtime libraries here.

---

## 1. Terminology & Data Models

To avoid confusion between Frontend, Backend, and Database layers:

| Term | Location | Responsibility | Example |
| :--- | :--- | :--- | :--- |
| **Record** | `common/records/` | **Database Shape**. Pure interfaces reflecting the DB table structure 1-to-1. Shared between FE and BE. | `UserRecord`, `BudgetPlanRecord` |
| **Entity (FE)** | `client/entities/` | **FSD Slice**. A module containing UI, Store, and Data Access for a business unit. | `client/entities/budget-plan/` |
| **Entity (BE)** | `server/entities/` | **DDD Class**. A class with methods/behavior encapsulating business rules on the server. | `UserOrm` class |
| **DTO** | `common/models/` | **Data Transfer Object**. Contracts for API requests/responses (if different from Record). | `CreateUserDto` |

---

## 2. Client Directory (`src/client`)
**Architecture:** Feature-Sliced Design (FSD).

### Core Structure
* **`widgets/`**: Independent, self-contained UI blocks.
* **`features/`**: User scenarios (e.g., `RegistrationPage`).
* **`database/`**: **Global Infrastructure**. Contains the Dexie.js instance and generic DB config. *No business logic here.*
* **`entities/`**: **Business Entities (FSD Slices)**.
  This is where the main logic lives. Each entity folder (e.g., `budget-plan`) follows this **Co-location** pattern:

    ```text
    src/client/entities/budget-plan/
    ├── ui/                     # Components (Visuals)
    │   ├── BudgetCard.tsx      # Dumb components, receive data via props or hooks
    │   └── BudgetList.tsx
    │
    ├── model/                  # State & Logic (The Brain)
    │   ├── store.ts            # Zustand store
    │   └── useBudget.ts        # Custom hooks connecting Data and Store
    │
    └── data/                   # Data Access Layer (The Hands)
        ├── index.ts            # Public API (exports the repository)
        ├── budget.repository.ts# Facade: Switches between API and Local DB
        ├── budget.api.ts       # Axios/Fetch client
        └── budget.local.ts     # IndexedDB client (uses global database/)
    ```
* **`shared/`**: Reusable infrastructure code (components, hooks, utils).

---

## 3. Server Directory (`src/server`)
**Architecture:** Domain-Driven Design (DDD).

### Structure
* **`entities/`**: **Shared Kernel (Core Domain)**.
  * Shared business classes used across multiple features (e.g., `UserOrm`).
  * Contain pure business logic.
  * Use `Records` from `common/` as internal data state.
* **`features/`**: Isolated business modules (e.g., `budget`, `auth`).
  * **`domain/`**: Local business rules and entities.
  * **`application/`**: Use Cases, Services, and Validation.
  * **`infrastructure/`**: Direct interaction with the database or external APIs.
* **`shared/`**: Server-side utilities.

---

## 4. Common Directory (`src/common`)
**Purpose:** Pure Type Safety & Shared Contracts.

* **`records/`**: **Primary source of truth.** Database table definitions (e.g., `BudgetPlanRecord`).
* **`models/`**: Shared DTOs and Types.
* **`constants/`**: Shared constants.
* **`utils/`**: Shared utility functions (pure JS/TS only).

---

## Dependency Rules (Strict)

To maintain modularity and prevent circular dependencies, the following import rules must be observed:

1.  **Client vs Server (Absolute Barrier):**
* `client/` **MUST NOT** import from `server/`.
* `server/` **MUST NOT** import from `client/`.
* **Exception:** Both layers interact only via API calls (HTTP) and share contracts from `common/`.

2.  **Common Layer (The Foundation):**
* `common/` **MUST NOT** import from `client/` or `server/`.
* It must remain pure.

3.  **Records vs Entities (Data vs Behavior):**
* `server/entities` (DDD Classes) depend on `common/records` (Data Shape).
* `client/entities` (FSD Slices) depend on `common/records` (Data Shape).

4.  **Client-side (FSD Hierarchy):**
* Rule: **"Can only import from below"**.
* `app` -> imports `widgets`, `features`, `entities`, `shared`.
* `widgets` -> import `features`, `entities`, `shared`.
* `features` -> import `entities`, `shared`. (**Cannot** import other features).
* `entities` -> import `shared`, `repositories`, `database`. (**Cannot** import other entities).
* `shared` -> imports nothing from upper layers.

5.  **Server-side (DDD & Modularity):**
* **Shared Kernel:** Features (`server/features/*`) **CAN** import from `server/entities` (Shared Entities) and `server/shared`.
* **Feature Isolation:** One feature (e.g., `budget`) **SHOULD NOT** directly import code from another feature (e.g., `auth`).
* **DDD Layers:**
  * `infrastructure` depends on `domain` and `application`.
  * `application` depends on `domain`.
  * `domain` is **independent** (depends only on `common/` and `server/entities`).