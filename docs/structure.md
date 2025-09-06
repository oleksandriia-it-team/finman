# Structure requirements

FinMan is a large project which needs specific rules to store UI, utilities, services, etc., to make maintenance and extension easier.  
The article is about how developers have to organize the project structure to ensure **clarity, modularity, and proper separation of responsibilities**, so that every module knows exactly what it can depend on and how it can be extended without breaking other parts of the application.

## High level
In the high level we have `shared`, `data-access` and `app` directories:
- **Data-access directory** is responsible for storing global services which can be used across the entire application:
    - `data-access/local-storage.service`
    - `data-access/user-information`
    - etc.
- **Shared directory** is responsible for storing global utilities, components, models, constants, which can be used across the entire application:
    - `utils/is-empty.util.ts`
    - `constants/error-texts.constant.ts`
    - `models/database-result-operation.model.ts`
    - etc.
- **App directory** includes reserved filenames from App Router structure:
    - `layout.tsx`
    - `page.tsx`
    - etc.
- **App/api directory** is a reserved folder name to store endpoints:
    - `api/route.ts`
    - `api/folder-name/route.ts`
    - `api/[param]/route.ts`

## Low level
Low-level utilities are those which are used only within a specific feature or module.
- They **must not depend on utilities, services, or modules from higher-level directories** (`shared`, `data-access`, etc.); instead, higher-level modules may depend on them if needed.
- They **should be self-contained**, so changes in other parts of the project do not break their functionality.
- They **must not be imported or used outside their own feature/module**, ensuring clear boundaries between features and avoiding unintended coupling.
- Examples include internal helper functions, feature-specific components, or localized constants that are relevant only within one feature.

## Public directory
The public directory is responsible for storing JSON files, themes, and images. Each of them has the following folders:
- **JSON files:** `public/json`
- **Theme files:** `public/themes`
- etc.

Rules of naming conventions are described in [code_style.md](./code_style.md).
