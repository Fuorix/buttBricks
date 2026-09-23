# Butt Bricks

Marketing site and product catalog for Butt Bricks, built with Next.js 16 (App Router), with a private admin module for managing products and categories.

- **Public site**: `/`, `/products`, `/products/[slug]`, `/heritage`, `/projects`, `/contact`
- **Admin**: `/admin` (sign in at `/admin/login`)
- **Data**: Firestore (via the Firebase Admin SDK, server-side only)
- **Images**: Cloudinary (direct browser uploads from the admin, signed on the server)
- **Email**: Resend (contact forms)
- **Hosting**: Vercel

## 1. Local setup

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

### Firebase

1. Create a Firebase project and enable **Cloud Firestore** (production mode).
2. Enable **Authentication → Sign-in method → Email/Password** and add the admin user(s) under **Authentication → Users**.
3. **Project settings → Service accounts → Generate new private key**. Copy `project_id`, `client_email` and `private_key` into `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`.
4. **Project settings → General → Web API Key** goes into `FIREBASE_WEB_API_KEY` (used only to verify the admin password).
5. Optionally restrict who can sign in with `ADMIN_EMAILS=a@x.com,b@x.com`.
6. Publish `firestore.rules` (Firestore → Rules). It denies all client access; the app only uses the Admin SDK.

### Cloudinary

Create a Cloudinary account and copy **Cloud name**, **API key** and **API secret** from the dashboard into the `CLOUDINARY_*` variables. Uploads land in the `buttbricks/` folder (configurable with `CLOUDINARY_UPLOAD_FOLDER`).

### Resend (contact forms)

1. Create a Resend account and add the client's domain under **Domains**, then add the DNS records it gives you and wait for verification.
2. Set `CONTACT_FROM_EMAIL` to an address on that verified domain, for example `website@buttbricks.com`.
3. Set `CONTACT_TO_EMAIL` to wherever inquiries should land.

> **This step is not optional.** Until the domain is verified, Resend's sandbox sender can only deliver to the Resend account owner's own inbox, so real customer inquiries will never arrive. If `CONTACT_TO_EMAIL` is unset the forms fail closed and log an error.

### Seed the catalog

Migrates the original hard-coded products into Firestore and uploads their photos from `public/` to Cloudinary:

```bash
npm run seed              # categories + products + image upload
npm run seed -- --no-images   # Firestore docs only
```

The script is idempotent (documents are keyed by slug, uploads overwrite).

## 2. Admin module

Sign in at `/admin/login` with a Firebase Auth user.

- **Dashboard** – counts and recently updated products.
- **Products** – create, edit, delete. Each product has a cover image, a gallery, features, narrative paragraphs, a technical-spec table, related products, a category, SKU, badge and a featured flag (featured products appear on the home page).
- **Categories** – create, rename, reorder, delete (blocked while products still use the category).

Every mutation revalidates the public pages, so changes are live within seconds without a redeploy.

Security model: a Firebase **session cookie** (httpOnly, 5 days) is issued after a password check. `src/proxy.ts` redirects unauthenticated requests away from `/admin`; every admin page and server action verifies the cookie again on the server.

## 3. Deploy and hand over

Setting up the four services from scratch, deploying, connecting the domain and
handing the project to the client is documented step by step in
**[DEPLOYMENT.md](DEPLOYMENT.md)**. It also carries the go-live verification
list and a troubleshooting section.

Two things that catch people out:

- The build reads Firestore to prerender product pages, so the environment
  variables must be set in Vercel **before** the first deploy.
- The admin session cookie is marked secure in production, so the site must be
  served over HTTPS or the login page will loop.

## Scripts

| Command             | Purpose                              |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Development server                   |
| `npm run build`     | Production build                     |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | ESLint                               |
| `npm run typecheck` | TypeScript                           |
| `npm run seed`      | Migrate legacy catalog to Firestore  |

## Project layout

```
src/
  app/
    layout.tsx            root shell (fonts, metadata, global CSS)
    not-found.tsx         branded 404
    global-error.tsx      last-resort error boundary
    sitemap.ts            sitemap.xml, includes every product
    robots.ts             robots.txt, disallows /admin
    opengraph-image.tsx   social share card
    (site)/               public pages, wrapped with Header/Footer
      error.tsx           public error boundary
      products/           catalog + detail, each with a loading skeleton
    admin/                admin module (login + dashboard)
    actions/              server actions (contact email, admin CRUD, uploads)
  components/             UI components (CSS Modules), admin UI under components/admin
  lib/
    firebase/admin.ts     Firebase Admin singleton
    cloudinary.ts         signing, deletion, server uploads
    cloudinaryUrl.ts      delivery-URL transformations (client-safe)
    auth/session.ts       session cookie create/verify/destroy
    data/catalog.ts       Firestore reads (products, categories)
    data/sampleCatalog.ts dev-only fallback when Firebase is unconfigured
    validation.ts         zod schemas shared by forms and actions
    types.ts              domain types
  proxy.ts                optimistic auth redirect for /admin
scripts/seed.ts           one-off migration of the legacy data
firestore.rules           deny-all client rules
next.config.ts            security headers, image hosts
DEPLOYMENT.md             full setup, deploy and handover runbook
```
