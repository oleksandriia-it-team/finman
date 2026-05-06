# Code Style Requirements — FinMan (Manual & Logic Rules)

This document covers rules that are **not** enforced by ESLint. For architectural boundaries and naming conventions of types/classes, refer to `eslint.config.mjs`.

---

## 1. File System & CSS Naming
*While ESLint checks code symbols, it does not enforce file system or CSS rules in your config:*
*   **Files & Folders**: Always use `kebab-case`.
    *   ✅ `budget-plan.use-case.ts`
    *   ❌ `budgetPlan.useCase.ts`
*   **CSS Classes**: Always use `kebab-case`.
    *   ✅ `.submit-button`
    *   ❌ `.submitButton` or `.SubmitButton`

---

## 2. Error Handling (Runtime Logic)
*ESLint cannot easily distinguish between throwing an object and an Error instance:*
*   **Strict Instance Rule**: Never `throw { status, message }`. Always throw an instance:
    *   ✅ `throw new AppError('Message', 400)`
    *   ✅ `throw new Error('Unexpected crash')`
*   **Extraction**: Use the `getSafeErrorMessage(error)` utility in UI components to ensure safe string rendering.

---

## 3. Responsibility Split: Guards vs. Use Cases

*Architectural "intent" requires manual review:*

*   **Guards**: Handle "Entry Level" checks:
    *   Authentication (is the user logged in?)
    *   Resource existence (does this record exist?)
    *   Top-level ownership via URL IDs (does this record belong to this user?)

*   **Use Cases**: Handle "Integrity Level" logic:
    *   Deep ownership of nested IDs in request bodies
    *   Data diffing and transactions
    *   Business uniqueness rules (e.g., duplicate title check)
    *   Domain validation (e.g., does a budget plan already exist for this month?)
    *   *Rule of thumb*: If you need to map/filter an array from the `body` to check IDs, do it in the **Use Case**, not the Guard.

*   **Quick decision criteria**:
    *   "Does this user have **access** to this resource?" → **Guard**
    *   "Is this action **valid** according to domain rules?" → **Use Case**

    | Check | Where |
        |---|---|
    | Is user authenticated? | Guard |
    | Does regularEntry with this id exist? | Guard |
    | Does regularEntry belong to this user? | Guard |
    | Is regularEntry title unique? | Use Case |
    | Does budget plan already exist for this month? | Use Case |
    | Are nested entry IDs valid? | Use Case |

---

## 4. CSS & Design Tokens
*ESLint ignores styles in your config. These are manual rules:*
*   **No Hardcoded Tailwind Colors**: Do not use `text-red-500` or `bg-blue-200`.
*   **Design Tokens**: Use semantic variables only: `text-foreground`, `bg-primary`, `text-destructive`.
*   **Variants**: If a component has multiple color themes (e.g., "Success", "Danger"), define these styles in **SCSS**, not via conditional Tailwind classes in JSX.

---

## 5. DTO & Input Naming (Schema-Derived Types)

*Types inferred or derived from Zod/validation schemas follow a strict suffix convention:*

*   **`...Dto`** — use for data flowing **out of a layer** or representing a **neutral data shape** (responses, repository results, service return values, mapped/transformed objects):
    *   ✅ `BudgetPlanDto` — what the service returns to the controller
    *   ✅ `RegularEntryDto` — what the repository returns to the use case
    *   ❌ Do **not** use `Dto` for raw incoming request payloads

*   **`...Input`** — use for data flowing **into a layer** from an **external boundary** (HTTP request body, form submission, IPC/RPC call arguments):
    *   ✅ `CreateBudgetPlanInput` — parsed request body that enters the use case
    *   ✅ `UpdateRegularEntryInput` — validated form payload passed to a service method
    *   ❌ Do **not** use `Input` for objects that are already transformed or enriched internally

*   **Quick decision criteria**:

    | Situation | Suffix |
    |---|---|
    | Type returned by a service/repository | `Dto` |
    | Type returned from a use case to a controller | `Dto` |
    | Mapped/transformed intermediate shape | `Dto` |
    | Raw request body entering a use case | `Input` |
    | Form data passed into a service method | `Input` |
    | Argument type of a mutation / RPC call | `Input` |

---

## 6. TypeORM Specifics
*The provided ESLint does not check decorator arguments:*
*   **String Relations**: To prevent circular dependencies, always use string literals in decorators:
    *   ✅ `@ManyToOne('UserOrm', 'items')`
    *   ❌ `@ManyToOne(() => UserOrm, (user) => user.items)`

---

## 7. Business Symmetry & UI Components
*   **Online/Offline Symmetry**: When modifying a Use Case, ensure the logic is updated in both the API version and the Local (IndexedDB) version.
*   **Screen Handlers**: Avoid manual loading spinners. Use `FinListScreenHandler` or `FinFormScreenHandler` for consistent state rendering.
*   **Service Access**: Never import `*.local.repository` or `*.api.client` directly into features. Always go through the `BasicDataSource` wrapper.

---