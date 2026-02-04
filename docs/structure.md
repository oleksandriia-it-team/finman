# Project Structure

FinMan is a complex application that leverages a **Hybrid Architecture** to ensure scalability, maintainability, and a clear separation of concerns.

The project is structured to strictly separate **Client-side logic** (Browser, IndexedDB, React) from **Server-side logic** (Node.js, PostgreSQL, API handlers), while providing a safe space for shared contracts.

## High Level Overview

All source code is located in the `src` directory to keep configuration files separate. The `src` directory is divided into four main layers:

* **`app/`**: **The Routing Layer**. Contains only Next.js specific routing files. It acts as a "Thin Layer" connecting the user/request to the logic.
* **`client/`**: **The Frontend Layer**. Contains all code that runs in the browser. It follows **Feature-Sliced Design (FSD)** principles.
* **`server/`**: **The Backend Layer**. Contains all business logic, database interactions, and use cases. It follows **Domain-Driven Design (DDD)** principles.
* **`common/`**: **The Shared Contract Layer**. Contains code shared between Client and Server (Types, Interfaces, Constants). **NO** business logic, runtime libraries (like Zod), or database access allowed here.

---

## 1. App Directory (`src/app`)
**Purpose:** Routing and Entry Points only.
This directory connects the URL to the application logic. It should not contain complex business logic or UI components.

* **Pages & Layouts (`page.tsx`, `layout.tsx`)**: Acts as a composition point. Includes global providers (`init-application.tsx`) and layout components (`client-layout.tsx`, `load-popover.tsx`).
* **API Routes (`api/.../route.ts`)**: Should only parse the request and call **Services/UseCases** from `server/features`.

---

## 2. Client Directory (`src/client`)
**Architecture:** Feature-Sliced Design (FSD).
**Responsibility:** Browser-side logic, UI, IndexedDB interactions.

### Structure
* **`widgets/`**: Independent, self-contained UI blocks (e.g., `Header`, `BudgetDashboard`). They combine Features and Entities to form a complete functional unit.
* **`features/`**: User scenarios (e.g., `RegistrationPage`).
  * *Rule:* A feature **cannot** import another feature.
* **`entities/`**: Business entities, data logic, and global state (e.g., `BudgetPlan`, `UserInformation`).
  * Contains `services/`, `models/`, and Zustand stores.
* **`database/`**: **Client-side Database** (IndexedDB wrapper).
  * Contains `DatabaseService` and base `CrudService` for local data storage.
  * *Note:* Strictly separated from server-side databases.
* **`shared/`**: Reusable infrastructure code.
  * **`components/`**: Reusable UI components (Buttons, Inputs, Dropdowns).
  * **`hooks/`**: Generic hooks (e.g., `usePopover`).
  * **`utils/`**: Helper functions (e.g., `format-date.util.ts`).
  * **`models/`**: Shared data models and types.
  * **`props/`**: Shared component prop interfaces.
  * **`constants/`**: Global constants.
  * **`enums/`**: Shared enumerations.
  * **`styles/`**: Global styles, SCSS variables, and Tailwind configuration.

---

## 3. Server Directory (`src/server`)
**Architecture:** Domain-Driven Design (DDD).
**Responsibility:** Business logic, PostgreSQL/ORM interactions, API processing.

### Structure
* **`features/`**: Isolated business modules (e.g., `budget`, `auth`).
  Each feature folder is divided into strict layers:
  * **`domain/`**: Pure business rules and types. Independent of external tools.
  * **`application/`**: Use Cases, Services, and Validation (Zod). Coordinates data flow.
  * **`infrastructure/`**: Direct interaction with the database (ORM, SQL) or external APIs.
* **`entities/`**: Core domain objects shared across multiple features (e.g., `User` entity used in both Auth and Budget features).
* **`shared/`**: Server-side utilities.
  * `logger/`
  * *...other infrastructure tools*.

---

## 4. Common Directory (`src/common`)
**Purpose:** Pure Type Safety.
**Contents:**
* **`models/`**: Shared TypeScript interfaces/types (e.g., `ApiResultOperation`).
* **`constants/`**: Shared constants (e.g., `ErrorTexts`).
* **`utils/`**: Shared utility functions (e.g., `getErrorMessage`).

---

## Public Directory (`public/`)
Stores static assets served directly by Next.js:
-   **`json/`**: Static data files (`countries.json`, `currencies.json`).
-   **`themes/`**: CSS themes and font files.

---

## Dependency Rules (Strict)

To maintain modularity and prevent circular dependencies, the following import rules must be observed:

1.  **Client vs Server:**
  * `client/` **MUST NOT** import from `server/`.
  * `server/` **MUST NOT** import from `client/`.
  * Both can import from `common/`.

2.  **FSD (Client-side):**
  * `widgets` can import `features`, `entities`, and `shared`.
  * `features` can import `entities` and `shared`.
  * `features` **MUST NOT** import other `features`.
  * `entities` can import `shared`.
  * **ALL layers** can import `shared`.

3.  **DDD (Server-side):**
  * `application` depends on `domain`, `infrastructure`, and `shared`.
  * `domain` **MUST NOT** depend on `infrastructure` or `application`.

4.  **Low-level Utilities:**
  * Low-level code (inside `shared`) **must not** depend on high-level code (`features`, `widgets`, `application`).