# GitHub Copilot Project Instructions

Purpose: Enable AI coding agents to be productive quickly in this repository by documenting real, current patterns and workflows.

## 1. High-Level Architecture

Kontexto is a German context-based word guessing game.

- Frontend: Vue 3 + Vite + Vuetify + Tailwind located in `code/frontend/`. State managed with Pinia stores (game state, settings). Supabase provides persistence. Types generated for DB access under `src/generated-sources`. Vue Router handles client-side routing. Vercel Analytics integrated for production tracking.
- Backend scripts (no long-running API yet): Python (Poetry) in `code/python/` used to prepare data (games, words, similarity scores) and interact with Supabase DB.
- Database: Supabase (PostgreSQL) with two environments: local (`.env.local`) and production (`.env`). Python scripts pre-compute similarity rankings and seed tables; frontend consumes precomputed data.

## 2. Key Directories & Files

- `code/frontend/vite.config.mts`: Vite config (plugins: tailwindcss, Vue, Vuetify, unplugin-vue-components, unplugin-fonts). Dev server runs on port 3000.
- `code/frontend/vitest.config.ts`: Vitest config for testing with Vue plugin support.
- `code/frontend/tsconfig.vitest.json`: TypeScript config for tests with path aliases and vitest globals.
- `code/frontend/src/components/`: Vue components (Game, GuessHistory, Stats, Settings, ConfirmDialog, HowToPlay, PreviousGames, ClosestWords, ContextMenu, AppFooter, etc.).
- `code/frontend/src/views/`: Route-level components (Home, DataProtection, Contact).
- `code/frontend/src/router/`: Vue Router configuration with legal page routes.
- `code/frontend/tests/spec/`: Component tests using Vitest + Vue Test Utils.
- `code/frontend/tests/test-setup.ts`: Global test setup file with Vuetify plugin registration and mocks.
- `code/frontend/src/stores/`: Pinia stores for game logic & settings (naming convention: `*.store.ts`).
- `code/frontend/src/services/`: Supabase client/service abstractions.
- `code/frontend/src/generated-sources/`: Generated TS types from Supabase schema; DO NOT hand-edit.
- `code/python/pyproject.toml`: Poetry project definition.
- `code/python/src/scripts/`: One-off executable scripts (init/fill/reset/new game operations). Designed to be run via `python` not as imported libs.
- `.env` / `.env.local` in `code/frontend/`: Environment variables for Supabase keys; local vs production selection logic mirrored in Python scripts.
- `CLAUDE.md`: Existing higher-level architectural & workflow reference (keep in sync when changing workflows).

## 3. Environment & Dependency Management

- Node tooling uses pnpm (lockfile present). Use `pnpm` not npm/yarn for adding deps: `pnpm add <pkg>` or `pnpm add -D <dev-pkg>` from `code/frontend`.
- Python uses Poetry. Run inside `code/python`: `poetry install`, then execute scripts with the virtual env (`poetry run python src/scripts/<script>.py`). If calling directly, ensure `.venv` is active.
- Supabase local dev controlled from `code/frontend` directory (`supabase start|stop|reset`).

## 4. Running & Building

Frontend:

- Dev: `pnpm dev` (http://localhost:3000, auto-increments if port taken)
- Type check: `pnpm type-check`
- Build: `pnpm build` then `pnpm preview` to serve production bundle.
- Test: `pnpm test` (watch mode) or `pnpm test --run` (single run)
- Test UI: `pnpm test:ui` (web interface)
  Python data prep:
- Initialize tables: `python src/scripts/init_tables.py --local`
- Fill words: `python src/scripts/fill_words_table.py --local`
- New game: `python src/scripts/new_game.py --local`
  Use `--production` for production DB or omit flag for auto-detect logic (see CLAUDE.md).

## 5. Conventions & Patterns

- Component auto-import via unplugin-vue-components; explicit imports often unnecessary. Follow existing naming (PascalCase `.vue`).
- Aliases: `@` resolves to `src/` (see `vite.config.mts`). Use `@/components/...` etc.
- Styling: Combination of Tailwind utility classes + Vuetify components. Prefer Tailwind for layout/spacing, Vuetify for complex widgets.
- State: Centralize cross-component state in Pinia stores; avoid prop drilling for game progress.
- Types: Always reference generated Supabase types rather than redefining DB row shapes.
- Python scripts: Intended to be idempotent where reasonable. Add new scripts under `code/python/src/scripts/` with CLI flags mirroring existing ones for environment selection.
- Dialog Components: Separate reusable dialog content from container components. Use mobile-responsive patterns with `$vuetify.display` breakpoints.
- German Localization: All user-facing text should be in German with proper terminology.
- Testing: Use real components without mocking, leverage global Vuetify setup, test props/events rather than rendered text for dialogs.

## 6. Adding Dependencies

- Frontend runtime dep: `pnpm add some-lib`
- Frontend dev dep: `pnpm add -D types-for-lib`
- Python dep: `poetry add <package>` (updates `pyproject.toml` and lock file). Keep versions pinned by Poetry, do not hand-edit lock file.

## 7. Common Pitfalls

- Running Poetry commands from repo root will fail (pyproject is in `code/python`). cd first.
- Forgetting `--local` leads to production Supabase usage if `.env.local` missing.
- Editing generated types under `generated-sources`—regenerate instead (process not yet scripted; if adding, document command here).
- Mixing package managers—stick to pnpm.

## 8. Extending the Project

- New frontend feature: create component in `src/components`, add any persistent state to a Pinia store, leverage auto-import.
- New component test: create test file in `tests/spec/` following existing patterns (use real components without mocking, use Pinia stores, leverage global Vuetify setup).
- New dialog component: separate reusable content from container, implement mobile-responsive design with Vuetify breakpoints, follow established styling patterns.
- New DB interaction: update Supabase schema (via SQL migration outside this repo) then regenerate TS types and update Python scripts if needed.
- New data prep logic: create Python service/repository modules; expose via script under `src/scripts` maintaining flag pattern.
- Component styling: follow established patterns with primary color headers, outlined card sections, proper German localization, and mobile-first responsive design.

## 9. Security & Secrets

- Do not commit `.env` or `.env.local` with real keys. Local keys live in untracked env files. Scripts auto-select environment; do not hardcode keys in source.

## 10. When Unsure

Consult `CLAUDE.md` for broader architecture. Mirror patterns you see; do not invent new frameworks or structures without explicit instruction.

---

Provide improvements or request clarifications if something seems outdated or ambiguous before large refactors.
