# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── fitboom/            # Expo React Native mobile app
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages


### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.

### `artifacts/fitboom` (`@workspace/fitboom`)

Expo React Native mobile app for FitBoom - an Uzbekistan gym booking platform.

**Design System (Dark Theme)**:
- Background: `#0e0e1a` (dark navy)
- Surface: `#151525`
- Card: `#1a1a2e` with border `#252542`
- Primary: `#F97316` (orange) with light variant `rgba(249,115,22,0.15)`
- Text: `#FFFFFF` / secondary `rgba(255,255,255,0.55)`
- Courses accent: `#7C3AED` (purple)
- All modals/sheets use dark card background, never white
- All Colors constants defined in `constants/Colors.ts`

**Navigation**: 5-tab layout (Asosiy, Zallar, Skaner center raised, Video darslar, Bronlar) with dark `#10101e` tab bar. Map and Profile tabs hidden via `href: null`.

**Key Screens**: auth.tsx (welcome + phone entry), complete-profile.tsx, home (tabs/index), gyms, bookings, scanner, courses, profile, map, gym/[id], payment, courses/[id]

**Branding**: FitBoom logo = "Fit" dark slate + "Boom" blue (#2563EB). Blue gradient credit card on Home (Clean Light design, graduated 2026-05). Tab bar uses `BRAND_BLUE` (formerly misnamed `ORANGE`) constant in `app/(tabs)/_layout.tsx`. Dark theme toggle is NOT yet implemented — `Colors.ts` ships only the light palette.

**Localization**: 3 languages (uz/ru/en) via `contexts/LanguageContext.tsx`

**API**: `services/api.ts` is the ONLY API client. Always connects to `https://fitboom.replit.app/api/mobile/v1`. No local backend — all requests go directly to the production FitBoom API. `lib/api.ts` is a backward-compat shim that delegates to `services/api.ts`.

**Auth flow**: SMS OTP (`POST /auth/sms/send` → `POST /auth/sms/verify`) returns `{ accessToken (30d), refreshToken (90d), isNewUser, user }`. Telegram OTP via `@uzfitboom_bot`. Tokens stored in AsyncStorage as `fitboom_access_token` / `fitboom_refresh_token`. Auto-refreshes on 401.

**Booking statuses**: `pending` (yellow, active/upcoming), `completed` (green, visited), `missed` (orange), `cancelled` (red). NO `confirmed` status exists.

**Scanner**: Uses `expo-camera` (v17.x) CameraView with QR barcode scanning. User scans gym's physical QR code → `POST /bookings/verify-qr` with `{ qrData }` → shows success/error result. Cancel booking via `POST /bookings/{id}/cancel`.

**Key API endpoints**: `verifyQr(qrData)` and `cancelBooking(id)` defined in `services/api.ts`.

**Response format**: All API responses use `{ success: true, data: { ... } }` or `{ success: false, error: "..." }`. The `request()` function in `services/api.ts` auto-unwraps `data`.

**Gender**: Values sent directly as `"Erkak"` or `"Ayol"` — no conversion. Production API accepts these values natively.
