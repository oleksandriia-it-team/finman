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
*   **Extraction**: Use the `getErrorMessage(error)` utility in UI components to ensure safe string rendering.

---

## 3. Responsibility Split: Guards vs. Use Cases
*Architectural "intent" requires manual review:*
*   **Guards**: Handle "Entry Level" checks (Authentication, resource existence, top-level ownership via URL IDs).
*   **Use Cases**: Handle "Integrity Level" logic (Deep ownership of nested IDs in request bodies, data diffing, transactions).
    *   *Rule of thumb*: If you need to map/filter an array from the `body` to check IDs, do it in the **Use Case**, not the Guard.

---

## 4. CSS & Design Tokens
*ESLint ignores styles in your config. These are manual rules:*
*   **No Hardcoded Tailwind Colors**: Do not use `text-red-500` or `bg-blue-200`.
*   **Design Tokens**: Use semantic variables only: `text-foreground`, `bg-primary`, `text-destructive`.
*   **Variants**: If a component has multiple color themes (e.g., "Success", "Danger"), define these styles in **SCSS**, not via conditional Tailwind classes in JSX.

---

## 5. TypeORM Specifics
*The provided ESLint does not check decorator arguments:*
*   **String Relations**: To prevent circular dependencies, always use string literals in decorators:
    *   ✅ `@ManyToOne('UserOrm', 'items')`
    *   ❌ `@ManyToOne(() => UserOrm, (user) => user.items)`

---

## 6. Business Symmetry & UI Components
*   **Online/Offline Symmetry**: When modifying a Use Case, ensure the logic is updated in both the API version and the Local (IndexedDB) version.
*   **Screen Handlers**: Avoid manual loading spinners. Use `FinListScreenHandler` or `FinFormScreenHandler` for consistent state rendering.
*   **Service Access**: Never import `*.local.repository` or `*.api.client` directly into features. Always go through the `BasicDataSource` wrapper.

---