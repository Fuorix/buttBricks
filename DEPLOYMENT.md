# Deployment Runbook

Complete setup from zero to a live site, covering Cloudinary, Firebase, Resend and Vercel.

Written for the setup where you already hold a Resend account and the domain sits in Hostinger.

Budget about two hours of hands-on work. Two steps touch DNS and depend on propagation, so start Phase 1 first and let it verify in the background. Neither one blocks the deploy: Phase 1 has a same-day path that needs no DNS at all, and the site can go live on its Vercel address before the domain is connected.

---

## Phase 0. Before you touch anything

### Account ownership

All service accounts stay under your control. Firebase, Cloudinary, Resend and
Vercel are yours, and the domain is already registered in your Hostinger
account. This is the managed-service arrangement, where the client pays for the
site and you run the infrastructure.

Two things follow from it, and both are worth settling in writing now rather
than during a disagreement later:

- **Say so in the contract.** The client should know they are buying a running
  website, not the accounts underneath it. Spell out what happens if they leave:
  whether you export the data, hand over the domain, or assist a migration.
- **Keep an exit path.** Firestore holds the entire catalog and Cloudinary holds
  every image. A scheduled Firestore backup plus the Cloudinary media library
  means the content can be handed over on request, even though the accounts are
  not transferring. Phase 3 turns the backup on.

If the client ever does want the domain, Hostinger supports a standard registrar
transfer. Plan for around a week, since transfers are rate-limited by policy.

### Collect from the client

| Item | Used for |
|---|---|
| Business email address for inquiries | Where contact forms are delivered |
| Email address for the admin login | Signing in to `/admin` |
| Confirmation of the domain to use | Site address and sender identity |

You already hold the domain and the service accounts, so this list is short.

### Check your machine

```bash
node --version    # must be 22.12 or newer
git --version
```

---

## Phase 1. Resend, using your existing account

You already have a Resend account serving another domain, so there is no signup
step. What you need is a sending identity for this site.

### 1.1 Pick your sending path

There are two options and they differ mainly in how quickly you can go live.

**Option A, add the new domain.** Best long-term. Inquiry emails come from the
client's own domain, which looks right and lands better. Requires DNS records
and a verification wait.

**Option B, send from your already-verified domain.** Works immediately with no
DNS at all. Set `CONTACT_FROM_EMAIL` to an address on the domain you have
already verified, and point `CONTACT_TO_EMAIL` at the client's inbox. The email
arrives from your domain rather than theirs.

A practical sequence is to launch on Option B so nothing blocks the deploy, then
move to Option A once the DNS records have verified. Changing it later is a
single environment variable and a redeploy.

The free plan covers **three verified domains**, 100 emails per day and 3,000 per
month, at a rate limit of 10 requests per second. Your existing domain plus this
one stays inside that, and a contact form will not come close to the volume
limits.

### 1.2 Add the domain, for Option A

1. In Resend open **Domains** and choose **Add Domain**.
2. Enter the client's domain and pick the region nearest the audience.
3. Resend displays DNS records, normally a DKIM record plus an SPF record. Copy
   exactly what is shown; never invent these values.

### 1.3 Add the records in Hostinger

1. Sign in to **hPanel** at <https://hpanel.hostinger.com>.
2. Open **Domains**, choose the domain, then **DNS / Nameservers**.
3. Confirm the domain is using **Hostinger nameservers**. If it points somewhere
   else, such as Cloudflare, the records must be added there instead. The DNS
   editor here only takes effect when Hostinger is authoritative.
4. Under **Manage DNS records**, add each record Resend gave you.

Two Hostinger quirks worth knowing:

- Hostinger appends the domain to record names automatically. If Resend asks for
  `resend._domainkey.buttbricks.com`, enter only `resend._domainkey`. Entering
  the full name produces a doubled record that never verifies.
- If an SPF record already exists, do not add a second one. A domain may only
  have one. Merge Resend's `include:` directive into the existing record.

### 1.4 Verify

Return to Resend and press **Verify**. Propagation is usually well under an hour.
Hostinger's own guidance allows up to 24 hours, so retry rather than assuming
failure.

### 1.5 Create the API key

1. Open **API Keys** and choose **Create API Key**.
2. Name it `buttbricks-production` and give it send permission.
3. Copy it immediately. It is shown once and begins with `re_`.

Create a separate key rather than reusing the one serving your other domain.
Separate keys can be revoked independently if one leaks.

```
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=website@verified-domain.com   # must be on a verified domain
CONTACT_TO_EMAIL=sales@clientdomain.com          # the client's real inbox
```

The sending address does not need a real mailbox behind it. It only needs to sit
on a verified domain. The receiving address must be a real, monitored inbox.

> **The rule that catches everyone.** If `CONTACT_FROM_EMAIL` is not on a domain
> verified in Resend, delivery is restricted to your own Resend account inbox,
> and customer inquiries silently vanish. This is exactly why Option B is safe
> and a half-configured Option A is not.

---

## Phase 2. Cloudinary

This is the quickest of the four services.

1. Sign up at <https://cloudinary.com>, or sign in if you already have an account. The free tier is ample for this site. If you reuse an existing account, keep `CLOUDINARY_UPLOAD_FOLDER` set so this site's images stay in their own folder.
2. Land on the **Dashboard**. The **Product Environment Credentials** panel shows three values.
3. Copy the cloud name, the API key, and reveal and copy the API secret.

```
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_UPLOAD_FOLDER=buttbricks
```

The folder variable is optional and defaults to `buttbricks`. Every image the admin uploads is filed underneath it, which keeps the media library tidy if the account is ever reused.

Treat the API secret like a password. It is what lets the server sign uploads and delete images.

---

## Phase 3. Firebase

Firebase provides two things here: the Firestore database that stores the catalog, and the authentication that guards the admin.

### 3.1 Create the project

1. Go to <https://console.firebase.google.com> and choose **Create a project**.
2. Name it, for example `buttbricks`.
3. Google Analytics is not required. The site uses Vercel Analytics instead, so decline it.

### 3.2 Create the database

1. Open **Build → Firestore Database** and choose **Create database**.
2. Select **Production mode**. The app never reads Firestore from the browser, so locked-down rules are correct.
3. Choose a region close to the audience. For Pakistan, `asia-south1` in Mumbai is the nearest.

### 3.3 Apply the security rules

1. Open the **Rules** tab.
2. Replace the contents with the `firestore.rules` file from this repository, then **Publish**.

The rules deny all direct client access on purpose. Every read and write goes through the Firebase Admin SDK on the server, which bypasses rules by design. If a browser could reach the database directly, the catalog would be editable by anyone.

### 3.4 Enable admin sign-in

1. Open **Build → Authentication** and choose **Get started**.
2. Under **Sign-in method**, enable **Email/Password**. Leave the passwordless link option off.
3. Open the **Users** tab, choose **Add user**, and create the client's admin account with a strong password.

### 3.5 Collect the credentials

Two separate sets are needed.

**Service account**, which lets the server read and write:

1. Open **Project settings**, the gear icon, then the **Service accounts** tab.
2. Choose **Generate new private key** and confirm. A JSON file downloads.
3. Open that file and take three fields: `project_id`, `client_email` and `private_key`.

**Web API key**, which verifies the admin's password at sign-in:

1. Open **Project settings → General**.
2. Copy the **Web API Key** value.

```
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@....iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
FIREBASE_WEB_API_KEY=AIza...
ADMIN_EMAILS=admin@clientdomain.com
```

Notes on these values:

- The private key must stay wrapped in double quotes. Keep the `\n` sequences exactly as they appear in the JSON file. The app converts them to real newlines at runtime.
- `ADMIN_EMAILS` is an optional comma-separated allow-list. Leave it unset and any Firebase Auth user can reach the admin; set it and only those addresses can. Set it.
- The downloaded JSON grants full access to the project. Never commit it, and delete it from the Downloads folder once the values are stored.

### 3.6 Turn on backups

1. Open **Firestore → Backups**.
2. Enable a scheduled backup, daily, with a retention window the client is comfortable with.

Someone will eventually delete a product by accident. This is the difference between a thirty-second restore and rebuilding the catalog by hand.

---

## Phase 4. Configure and seed locally

Do this before deploying. Seeding from your machine is faster to debug than seeding through a failed build.

### 4.1 Create the environment file

In the project root create `.env.local` and fill in everything collected so far. Use `.env.example` as the template.

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=sales@clientdomain.com
CONTACT_FROM_EMAIL=website@clientdomain.com

FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_WEB_API_KEY=AIza...
ADMIN_EMAILS=admin@clientdomain.com

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_UPLOAD_FOLDER=buttbricks

NEXT_PUBLIC_SITE_URL=https://clientdomain.com
```

This file is git-ignored and must stay that way.

### 4.2 Seed the catalog

```bash
npm ci
npm run seed
```

This writes the six products and their categories into Firestore and uploads every product photo to Cloudinary. It prints each upload as it goes.

The script is safe to re-run. Documents are keyed by slug and merged, and uploads overwrite rather than duplicate. If it fails partway, fix the cause and run it again.

To rewrite the database records without re-uploading images:

```bash
npm run seed -- --no-images
```

### 4.3 Verify locally

```bash
npm run dev
```

Check each of these before going further:

- The home page and `/products` show products with images served from `res.cloudinary.com`.
- A product detail page loads.
- `/admin/login` accepts the Firebase user you created.
- In the admin, edit a product title and save. Reload the public page and confirm the change appears.
- Submit the contact form and confirm the email arrives at `CONTACT_TO_EMAIL`.

If the contact form does not arrive, revisit Phase 1. It is almost always unverified domain or a sender address that is not on it.

---

## Phase 5. Deploy to Vercel

### 5.1 Push the code

```bash
git status
git add -A
git commit -m "Production configuration"
git push origin main
```

### 5.2 Import the project

1. Go to <https://vercel.com> and sign in, using **Continue with GitHub** so the repository is available to import.
2. Choose **Add New → Project** and import the repository.
3. Vercel detects Next.js. Leave the build and output settings untouched.

### 5.3 Add the environment variables

**Do this before the first deploy.** The build reads Firestore to prerender product pages, so a build without credentials produces a site with an empty catalog.

1. Expand **Environment Variables** on the import screen, or open **Settings → Environment Variables** afterwards.
2. Add every variable from your `.env.local`, one at a time.
3. Tick **Production** and **Preview** for each.

For `FIREBASE_PRIVATE_KEY`, paste the value exactly as it appears in your `.env.local`, including the surrounding quotes and the `\n` sequences. Real newlines also work. The app handles both.

Do not add `NODE_ENV`. Vercel sets it.

### 5.4 Deploy

Press **Deploy** and watch the log. A healthy build ends with a route table listing the static and dynamic routes.

If the log contains `Firebase is not configured`, a variable is missing or misspelled. Fix it and redeploy.

### 5.5 First check

Open the `.vercel.app` URL and confirm products and images load. The custom domain comes next.

---

## Phase 6. Connect the domain, Hostinger

### 6.1 Add it in Vercel

1. In the Vercel project open **Settings → Domains**.
2. Add the domain and the `www` variant. Let Vercel set one as the redirect
   target for the other; serving both at once splits your search ranking.
3. Vercel then displays the exact DNS records to create. Use what it shows you
   rather than any values written down elsewhere, because Vercel has changed its
   published addresses before.

### 6.2 Choose how Hostinger points at Vercel

**Keep Hostinger nameservers and add records.** Recommended here. Your Resend
DKIM and SPF records already live in Hostinger, so leaving DNS there keeps
everything in one editor. You add an A record for the root and a CNAME for
`www`, using the values Vercel gave you.

**Or switch nameservers to Vercel.** Vercel then manages DNS. If you do this you
must recreate the Resend records inside Vercel, or email delivery breaks the
moment the nameservers cut over. Only worth it if you want everything in one
dashboard.

### 6.3 Add the records in hPanel

1. Open **Domains**, choose the domain, then **DNS / Nameservers**.
2. Under **Manage DNS records**, add what Vercel asked for.
3. For the root domain use `@` as the name. For the `www` record use `www`.
4. Delete any pre-existing A or CNAME record for the same name first. Hostinger
   points new domains at a parking page, and that record will win if left in
   place.

Leave the Resend records alone. They serve a different purpose and do not
conflict with the website records.

### 6.4 Finish

1. Wait for Vercel to report the domain as **Valid**. Certificates are issued
   automatically once it resolves.
2. Update `NEXT_PUBLIC_SITE_URL` to the final address, for example
   `https://buttbricks.com`, then redeploy so canonical URLs, the sitemap and
   social share cards point at the real domain.

> **HTTPS is required, not cosmetic.** The admin session cookie is marked secure
> in production. Over plain HTTP the browser refuses to store it and the login
> page loops forever.

---

## Phase 7. Verify the live site

Work through this list on the real domain.

**Public site**

- [ ] Home, products, a product detail page, heritage, projects and contact all load over HTTPS.
- [ ] Product images are served from `res.cloudinary.com`.
- [ ] `/sitemap.xml` lists the product URLs.
- [ ] `/robots.txt` disallows `/admin/`.
- [ ] Pasting the URL into WhatsApp shows the share card image.
- [ ] A made-up URL such as `/nope` shows the branded 404 page.

**Contact forms**

- [ ] The home page quote form delivers to the client's inbox.
- [ ] The contact page project brief form delivers.
- [ ] Both arrive with readable content and no broken formatting.

**Admin**

- [ ] `/admin` redirects to the login page when signed out.
- [ ] The client's account signs in.
- [ ] Creating a product works, including uploading a cover image and gallery images.
- [ ] Editing and deleting work.
- [ ] Category create, rename and delete work, and deleting a category that still has products is refused.
- [ ] After any save, the public page reflects the change within a few seconds without a redeploy.

**Search**

- [ ] Add the site to Google Search Console and submit the sitemap.

---

## Phase 8. Hand over

The infrastructure stays with you, so handover here means giving the client
everything they need to run the site day to day, and nothing they could use to
lock themselves out of it.

### What the client receives

1. **Admin access only.** Create their user in Firebase Authentication and add
   the address to `ADMIN_EMAILS`. That is the entire surface they need.
2. **Credentials through a password manager**, never email or chat. Have them
   change the password on first sign-in.
3. **A one-page operating guide** covering how to add a product, how to change
   an image, and who to contact when something breaks. This README is written
   for developers and is not a substitute.
4. **A live walkthrough** in which they add a real product themselves while you
   watch. This surfaces confusion that documentation never will.

### What you keep and must maintain

Because the accounts are yours, these become your standing responsibilities
rather than the client's:

- **Billing.** Firebase, Cloudinary and Resend all have free tiers that this
  site fits inside comfortably today. Watch for growth, particularly Cloudinary
  bandwidth if traffic climbs. Set a budget alert in Firebase.
- **Secret rotation and renewals.** Nothing expires on its own here, but the
  domain does. Keep auto-renew on in Hostinger, because a lapsed domain takes
  the site and the email sender down together.
- **Availability of the content.** Firestore backups from Phase 3 are what let
  you hand the catalog over if the relationship ever ends. Confirm they are
  actually running rather than merely enabled.

### Tidy up before you call it done

- [ ] Remove every test user from Firebase Authentication.
- [ ] Trim `ADMIN_EMAILS` to the real administrators.
- [ ] Delete the downloaded Firebase service account JSON from your machine.
- [ ] Confirm no `.env.local` was ever committed: `git log --all -- .env.local`
      should print nothing.

### Content still owed by the client

- A second leadership portrait. Two people currently share `public/leader04.jpg`.
- The Instagram profile URL. The icon is hidden until one is supplied. See the
  note in `src/components/Footer/Footer.tsx`.
- Higher resolution replacements for the five site photos in `public/`. They are
  512 pixels square and look soft when displayed full width.

---

## Routine operations

**Content changes** are made in the admin and go live within seconds. They never need a deploy.

**Code changes** deploy automatically on every push to `main`. Vercel builds a preview for every other branch and every pull request.

**Rolling back** is done from **Deployments** in Vercel. Open a previous successful deployment and promote it. This reverts code only. Firestore content is unaffected.

**Rotating a secret**, such as the Cloudinary API secret or the Firebase private key, means updating it in Vercel's environment variables and redeploying. Changing values without redeploying has no effect, because they are read at build and boot.

---

## Troubleshooting

**Build fails, or the live catalog is empty.**
A Firebase variable is missing or malformed. The build log prints `Firebase is not configured`. Check `FIREBASE_PRIVATE_KEY` first, as it is the easiest to paste incorrectly. It must keep its quotes and its `\n` sequences.

**Admin login rejects a correct password.**
Confirm the user exists in Firebase Authentication, that Email/Password sign-in is enabled, and that the address appears in `ADMIN_EMAILS` if that variable is set. Also confirm `FIREBASE_WEB_API_KEY` is the web API key from project settings and not the service account key.

**Login succeeds but immediately returns to the login page.**
The session cookie is not being stored. This is almost always the site being served over HTTP rather than HTTPS. Confirm the certificate is issued and the domain is valid in Vercel.

**Contact form reports success but nothing arrives.**
The Resend domain is not verified, or `CONTACT_FROM_EMAIL` is not on the verified domain. Check the Resend dashboard for the delivery attempt and the reason for the rejection.

**Images fail to load after an admin upload.**
Confirm the three Cloudinary variables in Vercel match the dashboard. The uploader signs requests on the server, so a wrong secret fails the upload rather than the display.

**Admin login returns a 500 and the page shows "Something went wrong".**
If the Vercel runtime log shows `ERR_REQUIRE_ESM` for `jose` via `jwks-rsa`, this
is the known dependency conflict. `firebase-admin` pulls in `jwks-rsa`, which is
CommonJS and calls `require('jose')`, but `jose` 6 is ESM-only. `package.json`
pins `jose` to the 4.x line through an `overrides` entry, because 4.x ships a
CommonJS build. Do not remove that override while `jwks-rsa` still uses `require`.
Note the build succeeds either way: prerendering only touches
`firebase-admin/firestore`, and the admin login is the first code path to import
`firebase-admin/auth`.

**A product edit does not appear on the public site.**
Hard-refresh once to rule out the browser cache. If it persists, redeploy, which rebuilds every page.
