# AGENTS.md

## Purpose

- This file is guidance for autonomous coding agents working in this repository.
- Follow existing patterns in SvelteKit + TypeScript + Tailwind code.
- Prefer minimal, targeted changes over broad refactors.

## Repository Snapshot

- Framework: SvelteKit 2 + Svelte 5 + Vite 5.
- Language mode: TypeScript strict (`tsconfig.json` has `strict: true`).
- Styling: Tailwind CSS with custom colors in `tailwind.config.ts`.
- i18n: `sveltekit-i18n` with locale files under `src/lib/i18n/`.
- Deployment adapter: Netlify (`@sveltejs/adapter-netlify`).
- Package manager: `pnpm` (lockfile is `pnpm-lock.yaml`).

## Environment and Secrets

- Copy `.env.example` to `.env` for local development.
- Expected env vars include S3 and Spotify credentials.
- Do not hardcode secrets or commit real credential values.
- Server-only secrets must be imported from `$env/static/private`.

## Install and Run Commands

- Install dependencies: `pnpm install`
- Start dev server: `pnpm run dev`
- Build production bundle: `pnpm run build`
- Preview production build locally: `pnpm run preview`

## Lint, Format, and Typecheck Commands

- Full lint pass: `pnpm run lint`
- Formatting check only: `pnpm exec prettier --check .`
- Auto-format all files: `pnpm run format`
- ESLint only: `pnpm exec eslint .`
- Typecheck/Svelte diagnostics: `pnpm run check`
- Watch mode typecheck: `pnpm run check:watch`

## Test Commands (Current State)

- There is currently no `test` script in `package.json`.
- There are currently no `*.test.*` or `*.spec.*` files in the repo.
- Use `pnpm run check` as the primary quality gate for now.
- If you add a test framework, add scripts to `package.json` and update this file.

## Single-Test Guidance

- A true "run one test" command is not available yet because no test runner is configured.
- When introducing Vitest, prefer this shape:
- `pnpm exec vitest path/to/file.test.ts`
- `pnpm exec vitest path/to/file.test.ts -t "test name"`
- After adding test tooling, document exact project commands in this section.

## Directory Conventions

- Routes/pages: `src/routes/**` using SvelteKit file conventions.
- Shared components: `src/lib/components/**`.
- Utilities and shared types: `src/lib/utils.ts`, `src/lib/types.ts`.
- Spotify API helpers and schemas: `src/lib/spotify/**`.
- Translation setup: `src/lib/translations.ts`.
- Locale JSON files: `src/lib/i18n/en/*.json` and `src/lib/i18n/sl/*.json`.
- Static public assets: `static/**`.

## Svelte and Route Patterns

- Use `+page.svelte` for page UI.
- Use `+page.server.ts` for server data loading requiring secrets.
- Use `+layout.server.ts` for locale negotiation and shared server data.
- Keep `load` return shapes explicit with interfaces/types when useful.
- In Svelte components, use `lang="ts"` scripts.
- Use `$props()` patterns consistent with existing Svelte 5 components.

## Imports and Module Style

- Prefer absolute aliases (`$lib`, `$app`, `$env`) over deep relative paths.
- Keep type-only imports explicit with `import type { ... }`.
- Keep imports grouped logically:
- framework/runtime imports
- third-party packages
- `$lib` / `$app` imports
- local relative imports
- Use ESM syntax only; package is configured with `"type": "module"`.

## TypeScript Guidelines

- Maintain strict typing; avoid weakening `tsconfig` options.
- Add explicit return types for exported functions in shared/server modules.
- Prefer `interface` for object contracts used across files.
- Prefer narrowed `unknown` + schema validation over unchecked `any`.
- Current code has a few `any` usages in Spotify parsing; avoid adding new ones.
- Use `zod` schemas for untrusted external API payloads.

## Naming Conventions

- Files: follow existing route conventions (`+page`, `+layout`) and kebab/camel mix already used.
- Spotify helper filenames currently use dotted names (e.g. `currently.playing.ts`); stay consistent nearby.
- Variables/functions: `camelCase`.
- Types/interfaces/components: `PascalCase`.
- Constants: `UPPER_SNAKE_CASE` for endpoint keys and fixed limits.

## Error Handling and Logging

- For network calls, check `res.ok` before consuming payloads.
- Fail safely in data loaders/helpers by returning `null` when data is unavailable.
- Validate external responses with `zod.safeParse` before mapping.
- Catch external API failures and log concise context (`console.error`) without secrets.
- Do not expose secret values in error messages.

## Formatting and Lint Rules

- Prettier is authoritative for formatting.
- Project Prettier rules include:
- single quotes
- trailing commas
- semicolons enabled
- print width 100
- `prettier-plugin-svelte`
- `prettier-plugin-tailwindcss` (Tailwind class sorting)
- ESLint uses JS + TypeScript + Svelte recommended flat configs.
- `eslint-config-prettier` is enabled to avoid rule conflicts with formatting.
- Ignore generated output directories (`build/`, `.svelte-kit/`, `dist/`).

## Styling/UI Guidelines

- Use Tailwind utility classes first; follow existing visual language.
- Reuse defined theme colors (`aipink`, `aiblack`) when appropriate.
- Keep custom CSS in `src/app.css` focused on reusable special effects.
- Preserve responsive behavior patterns used in existing components.

## i18n Guidelines

- Use translation store `t` from `src/lib/translations.ts` instead of hardcoding copy.
- Add keys to both `en` and `sl` locale JSON files.
- Keep key structure consistent by page/feature namespace.
- Locale selection currently relies on cookie `lang` and Accept-Language fallback.

## Date/Time Guidance

- For new TypeScript date formatting/manipulation, use `date-fns`.
- Do not introduce new Moment.js usage.
- Existing Moment usage may be migrated incrementally when touching relevant code.

## Change Scope and Safety

- Do not rename routes/files or translation keys unless required by the task.
- Avoid broad aesthetic rewrites when task is functional.
- Keep PR-sized changes focused and easy to review.
- Update docs/scripts when introducing new tooling (especially tests).

## Cursor/Copilot Rule Files

- `.cursor/rules/`: not present at time of writing.
- `.cursorrules`: not present at time of writing.
- `.github/copilot-instructions.md`: not present at time of writing.
- If any of these are added later, treat them as higher-priority agent instructions and update this file.

## Recommended Pre-PR Checklist

- Run `pnpm run format` (or ensure formatter made no unintended changes).
- Run `pnpm run lint`.
- Run `pnpm run check`.
- Run `pnpm run build` for changes that may impact bundling/runtime.
- Verify locale/content updates in both supported languages when applicable.
