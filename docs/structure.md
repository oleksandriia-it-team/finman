# Project Structure

FinMan is a complex application that leverages a **Hybrid Architecture** to ensure scalability, maintainability, and a clear separation of concerns.
The project is structured to strictly separate **Client-side logic** (Browser, IndexedDB, React) from **Server-side logic** (Node.js, PostgreSQL, API handlers), while providing a safe space for shared contracts.

## High Level Overview

All source code is located in the `src` directory to keep configuration files separate.
The `src` directory is divided into four main layers:

* **`app/`**: **The Routing Layer**. Contains only Next.js specific routing files.
  It acts as a "Thin Layer" connecting the user/request to the logic.
* **`client/`**: **The Frontend Layer**.
  Contains all code that runs in the browser. It follows **Feature-Sliced Design (FSD)** principles.
* **`server/`**: **The Backend Layer**.
  Contains all business logic, database interactions, and use cases. It follows **Domain-Driven Design (DDD)** principles.
* **`common/`**: **The Shared Contract Layer**. Contains code shared between Client and Server (Types, Interfaces, Constants, Records).
  **NO** business logic, runtime libraries (like Zod), or database access allowed here.

---

## 1. Terminology & Data Models (Crucial)

To avoid confusion between Frontend, Backend, and Database layers, we use specific suffixes:

| Term | Location | Responsibility | Example |
| :--- | :--- | :--- | :--- |
| **Record** | `common/records/` | **Database Shape**. Pure interfaces reflecting the DB table structure 1-to-1. Shared between FE and BE. | `UserRecord`, `BudgetPlanRecord` |
| **Entity (FE)** | `client/entities/` | **FSD Slice**. A directory containing UI, Store, and client-side logic for a business unit. | `client/entities/user-profile/` |
| **Entity (BE)** | `server/entities/` | **DDD Class**. A class with methods and behavior encapsulating business rules on the server. | `UserOrm` class |
| **DTO** | `common/models/` | **Data Transfer Object**. Contracts for API requests/responses (if different from Record). | `CreateUserDto` |

---

## 2. App Directory (`src/app`)
**Purpose:** Routing and Entry Points only.
This directory connects the URL to the application logic. It should not contain complex business logic or UI components.

* **Pages & Layouts**: Acts as a composition point.
* **API Routes**: Should only parse the request and call **Services/UseCases** from `server/features`.

---

## 3. Client Directory (`src/client`)
**Architecture:** Feature-Sliced Design (FSD).
**Responsibility:** Browser-side logic, UI, IndexedDB interactions.

### Structure
* **`widgets/`**: Independent, self-contained UI blocks.
* **`features/`**: User scenarios (e.g., `RegistrationPage`).
* **`entities/`**: Business entities (FSD Slices).
  * Contains `services/`, `models/`, and Zustand stores.
  * *Note:* Uses `Records` to type raw data from API/DB.
* **`repositories/`**: Abstraction layer for data access (Switching between API and LocalDB).
* **`database/`**: **Client-side Database** (IndexedDB wrapper).
* **`shared/`**: Reusable infrastructure code (components, hooks, utils).

---

## 4. Server Directory (`src/server`)
**Architecture:** Domain-Driven Design (DDD).
**Responsibility:** Business logic, PostgreSQL/ORM interactions, API processing.

### Structure
* **`entities/`**: **Core Domain Objects (Shared Kernel)**.
  * Shared business classes used across multiple features (e.g., `UserOrm`).
  * Contain pure business logic.
  * Use `Records` from `common/` as internal data state.
* **`features/`**: Isolated business modules (e.g., `budget`, `auth`).
  Each feature folder is divided into strict layers:
  * **`domain/`**: Local business rules and entities specific *only* to this feature.
  * **`application/`**: Use Cases, Services, and Validation. Coordinates data flow.
  * **`infrastructure/`**: Direct interaction with the database or external APIs.
* **`shared/`**: Server-side utilities.

---

## 5. Common Directory (`src/common`)
**Purpose:** Pure Type Safety & Shared Contracts.

**Contents:**
* **`records/`**: Database table definitions (e.g., `BudgetPlanRecord`). **Primary source of truth for data shape.**
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