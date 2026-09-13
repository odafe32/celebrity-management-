# Celebrity Booking Platform — Build Phases

> Prototype reference: https://www.mycelebritybookings.com/ (and https://ashencrest.com/)
> Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · PostgreSQL + Prisma 8 (RC) · Stripe · Resend · NextAuth 5 (beta)
> Goal: Build a celebrity booking platform that mirrors the reference site's structure (Celebrity directory, Celebrity Services, Promotion, Book a Celebrity) but with real payment, real admin, real email/chat follow-up, and a purpose-built dashboard.
>
> **Key decisions:**
> - **No customer login/register.** Visitors never create accounts. User info (name, email, phone) is captured via the booking inquiry form when they request a celebrity.
> - **Only admin auth.** Staff log in to manage the platform. No public-facing authentication.
> - **Live chat = external system.** We embed a third-party live chat widget (e.g. Tawk.to, Intercom, Chatwoot). We do not build chat from scratch.

---

## Phase 0 — Foundation & Project Setup
**Goal:** A runnable, typed, styled, deployed empty shell.

- [x] Initialize Next.js 16 App Router project (already scaffolded)
- [x] Configure Tailwind CSS 4 + design tokens (colors, spacing, typography) — DONE, see brand palette below
- [x] Set up TypeScript paths (`@/components`, `@/lib`, `@/app` — already configured via `@/*` alias)
- [x] Install core dependencies (DONE — all installed):
  - `prisma` ^8.0.0-rc + `@prisma/client` ^7.10.0 (database ORM — uses `prisma.config.ts`, new format)
  - `next-auth` ^5.0.0-beta (Auth.js v5 — admin-only auth)
  - `stripe` ^22.6.2 (payments)
  - `resend` ^6.27.0 (transactional email)
  - `zod` ^4.6.1 (validation)
  - `@tanstack/react-query` ^5.102.8 (data fetching)
  - `lucide-react` ^1.44.0 (icons)
  - `@radix-ui/*` (dialog, dropdown, label, slot, toast, select, tabs, checkbox, popover, tooltip)
  - `clsx`, `tailwind-merge`, `class-variance-authority`, `date-fns` (utilities)
  - `motion` (Framer Motion, imported as `motion/react`) — for animations
  - `shadcn` CLI (v4, "base-nova" style, uses `@base-ui/react` + `cn` package) — add components via `npx shadcn@latest add <component>`
  - `next-themes` — dark/light theme toggling
  - `@types/stripe` (dev)
- [x] Run `npx prisma init` (DONE — created `prisma.config.ts` with skills config)
- [x] Run `npx shadcn@latest init -d` (DONE — created `components.json`, `components/ui/button.tsx`, `lib/utils.ts`)
- [x] Brand theme set up in `app/globals.css` (DONE):
  - **Gold / Espresso / Cream luxury palette** matching the MyCelebrityBookings + Ashencrest logos
  - Dark mode (default): espresso background `#241209`, cream foreground `#f5ecd7`, gold primary `#d4a854`, orange-gold accent `#f5a623`
  - Light mode: cream background `#fbf6ec`, espresso foreground `#2b1810`, same gold/accent tones
  - Heading font: `Playfair Display` (serif, `--font-heading`) — matches the elegant serif wordmark in the logo
  - Body font: `Geist Sans` (`--font-sans`)
  - `ThemeProvider` (next-themes) wraps the app in `app/layout.tsx`, defaults to dark mode; toggle via `<ThemeToggle />` (`components/theme-toggle.tsx`)
  - Verified live on `/` — color swatches, animated hero (Framer Motion `motion/react`), shadcn `Button`
- [ ] Set up PostgreSQL database (local Docker + Neon/Supabase for prod)
- [ ] Create base Prisma schema in `prisma.config.ts` (Prisma 8 format — NOT the old `prisma/schema.prisma`)
- [ ] Create app layout: `<RootLayout>` with header, footer, nav shell
- [ ] Set up environment variables (`.env.local` + `.env.example`):
  - `DATABASE_URL`, `NEXTAUTH_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `WHATSAPP_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- [ ] Deploy empty shell to Vercel (CI/CD via Git)

**Deliverable:** A live URL with header/footer/nav placeholder, connected DB, working `npm run dev`.

---

## Phase 1 — Database & Data Models
**Goal:** All tables created and seeded.

- [ ] Define Prisma models in `prisma.config.ts` (Prisma 8 format — see PDF §20 for full schema):
  - `Educator` (was: celebrity) — name, slug, photo, bio, extLink, status, featured, sortOrder, basePrice, currency
  - `Category` — name, slug, parentId, type (talent_type | subject | level)
  - `ServiceType` — name, slug, description, formConfig, sortOrder
  - `Lead` — serviceTypeId, educatorId (nullable), date, time, numPersons, name, email, phone, specialRequests, stage, assignedTo, quotedAmount, wonAmount, lostReason
  - `LeadEvent` — leadId, type (email | call | note | status_change | whatsapp | chat), body, createdBy
  - `Booking` — leadId, educatorId, customerId, serviceTypeId, date, time, numPersons, status, totalAmount
  - `Customer` — name, email, phone (captured from booking form, **no password, no login**)
  - `AdminUser` — name, email, passwordHash, role (admin, sales_agent, moderator — **staff only**)
  - `Payment` — bookingId, amount, currency, gateway, gatewayRef, status, method
  - `Invoice` — bookingId, number, amount, tax, status, pdfUrl, issuedAt, dueAt
  - `EmailLog` — to, from, template, subject, leadId, bookingId, status, espMessageId
  - `EmailEvent` — emailLogId, eventType, payload, occurredAt
  - `FollowUpRule` — triggerStage, delay, emailTemplateId, active
  - `Review` — educatorId, customerId, rating, body, status
  - `Comment` — educatorId, authorName, authorEmail, body, status, parentId
  - `Page` — title, slug, body, status (CMS)
  - `Availability` — educatorId, date, available, slots (JSON)
  - `AuditLog` — userId, action, entity, entityId, meta
  - `Message` (in-app chat) — conversationId, senderId, body, readAt
  - `Conversation` — leadId or bookingId, participantIds
- [ ] Run migration
- [ ] Create seed script (`prisma/seed.ts`) with:
  - 6 sample service types (Autograph Signing, Meet & Greet, Corporate Events, Private Reservations, Product Endorsements, Nightclub Appearances)
  - 10 sample educators with bios + photos
  - 5 sample categories (actors, musicians, comedians, hosts, athletes)
  - 1 admin user
- [ ] Run seed

**Deliverable:** `npx prisma studio` shows all tables with seed data.

---

## Phase 2 — Public Site: Layout & Navigation
**Goal:** The shared chrome every page uses.

- [x] `<SiteHeader>` — logo, primary nav, search box, mobile menu (DONE — `components/site-header.tsx`)
  - Nav items: Celebrities, About, Celebrity Services ▾ (dropdown of 9 services), Promotion, Book a Celebrity
  - Animated dropdown (Framer Motion), animated mobile slide-in menu, active link highlighting
- [x] `<SiteFooter>` — repeat nav, contact info, legal links, social (DONE — `components/site-footer.tsx`)
  - 4-column layout: brand, navigation, legal, contact (email, phone, WhatsApp, address)
  - Animated reveal on scroll
- [x] `<Sidebar>` — Celebrity Services list, Categories list (with counts), Testimonials widget (DONE — `components/sidebar.tsx`)
  - All 9 services, 16 categories with counts, 3 testimonials with star ratings
  - Staggered animations on scroll
- [x] `<SearchBar>` — client-side search over educators (DONE — `components/search-bar.tsx`, upgraded to server search in Phase 8)
- [x] `<DisclaimerBlock>` — reusable legal disclaimer component (DONE — `components/disclaimer-block.tsx`)
- [x] `<TestimonialWidget>` — shows approved reviews (5-star, name, date, text) (DONE — integrated in Sidebar)
- [x] `<CategoryFilter>` — implemented as category chips on homepage + category list in sidebar
- [x] Responsive: mobile hamburger nav, stacked sidebar (DONE — mobile menu slides in from right, sidebar stacks below on mobile)
- [x] Dark mode toggle (DONE — `components/theme-toggle.tsx` in header, defaults to dark/espresso theme)

**Deliverable:** Every page renders inside a consistent shell; nav works; mobile responsive. ✓ Verified live on http://localhost:3000.

---

## Phase 3 — Public Site: Celebrity Directory & Profiles
**Goal:** Browseable, searchable directory + individual profile pages (mirrors reference site §5–6).

### 3a. Celebrity Directory (`/celebrities`)
- [ ] Server component fetches paginated educators (12 per page)
- [ ] `<EducatorCard>` — photo, name, category tags, "View Profile" link
- [ ] Pagination controls (1 2 3 4 →)
- [ ] Category filter sidebar (click category → filter list)
- [ ] Search bar filters by name
- [ ] Featured educators row at top (optional)
- [ ] Empty state ("No celebrities found")

### 3b. Celebrity Profile (`/celebrities/[slug]`)
- [ ] Server component fetches educator by slug
- [ ] `<EducatorHeader>` — name, photo, categories
- [ ] `<EducatorBio>` — rich text bio, external link (Wikipedia/IMDb)
- [ ] `<BookThisCelebrity>` CTA button (×2 — top and bottom) → opens booking form modal or routes to `/book?educator=slug`
- [ ] `<EducatorReviews>` — approved reviews, average rating, star display
- [ ] `<CommentsSection>` — list approved comments + "Leave a Reply" form (Comment, Name*, Email*, Website)
- [ ] Post navigation (prev/next educator)
- [ ] 404 page if slug not found
- [ ] SEO: generateMetadata (title, description, OG image)

**Deliverable:** User can browse → search → filter → open a profile → read bio → see reviews → click "Book This Celebrity".

---

## Phase 4 — Public Site: Static Pages (About, Services, Promotion, Book)
**Goal:** All the content pages from the reference nav.

### 4a. About (`/about`)
- [ ] Rich-text page from `Page` CMS table (or hardcoded for v1)
- [ ] Agency description, experience, named agent, talent types, event types
- [ ] CTA: "Contact us NOW" → `/book`
- [ ] CTA: "Contact us for fees & availability" → `/contact`

### 4b. Celebrity Services Hub (`/celebrity-services`)
- [ ] Grid of 9 service-type cards (icon, title, short desc, "Learn more" → service page)
- [ ] Booking form embedded at bottom (shared component)
- [ ] Agency boilerplate (editable via CMS in later phase)

### 4c. Service Sub-Pages (`/autograph-signing`, `/private-reservations`, etc.)
- [ ] Dynamic route `/services/[slug]` reading from `ServiceType` table
- [ ] H1: "Book a Celebrity for [Service]"
- [ ] Service-specific description (NOT duplicate boilerplate — each unique)
- [ ] List of talent types bookable
- [ ] Contact line (email + phone)
- [ ] "Contact us NOW" CTA
- [ ] Booking form embedded (passes `serviceTypeId` with submission — fixes reference site gap)

### 4d. Promotion (`/promotion`)
- [ ] Active promotions/banners from DB
- [ ] Discount codes table
- [ ] Featured bundles / seasonal offers
- [ ] "Apply code" flow (used at checkout in Phase 7)

### 4e. Book a Celebrity (`/book-a-celebrity`)
- [ ] Full booking-inquiry form (see Phase 5)
- [ ] Educator selector (dropdown/search — fixes reference site gap)
- [ ] Service type selector (dropdown — fixes reference site gap)
- [ ] Budget field (optional — fixes reference site gap)
- [ ] Event location field (fixes reference site gap)
- [ ] reCAPTCHA / Turnstile spam protection

### 4f. Contact (`/contact`)
- [ ] Contact form (name, email, subject, message)
- [ ] Display email + phone + WhatsApp + business hours
- [ ] Map / address (optional)

### 4g. Legal Pages
- [ ] `/terms` — Terms of Service
- [ ] `/privacy` — Privacy Policy
- [ ] `/refund` — Refund & Cancellation Policy
- [ ] `/cookies` — Cookie Policy
- [ ] Disclaimer block (reusable component, already in Phase 2)

**Deliverable:** All nav links resolve to real pages; no 404s (unlike reference site).

---

## Phase 5 — Booking Inquiry Form & Lead Capture
**Goal:** The core conversion mechanism (mirrors reference site §11, but better).

- [ ] `<BookingForm>` reusable component (used on `/book` and every service page)
- [ ] Fields:
  - Educator (select — required) ← NEW vs reference
  - Service type (select — required, pre-filled if on service page) ← NEW
  - Date (date picker — required)
  - Time (dropdown: 11 AM – 10:30 PM in 30-min slots)
  - Number of persons (1–8, or "9+ call us")
  - Name (required)
  - Email (required, validated)
  - Phone (required)
  - Budget (optional) ← NEW
  - Event location (optional) ← NEW
  - Special requests (textarea)
  - reCAPTCHA / Turnstile ← NEW
  - Terms checkbox ← NEW
- [ ] Client-side validation (zod schema)
- [ ] Server action `submitLead()`:
  - Validate input
  - Create `Lead` record (stage: `new`)
  - Create `LeadEvent` (type: `form_submission`)
  - Enqueue auto-ack email to customer (Email #1)
  - Enqueue lead notification to admin (Email #2)
  - Return success state
- [ ] Success screen: "Thanks {name}, we'll be in touch within 24 hours" + reference number
- [ ] Error handling: field errors, spam rejection, rate limiting

**Deliverable:** Submitting the form creates a lead in the DB and fires two emails.

---

## Phase 6 — Admin Authentication (Staff Only)
**Goal:** Only staff can log in. Customers never log in — their info is captured via the booking form (Phase 5).

- [ ] Configure Auth.js with:
  - Credentials provider (email + password) — **admin/sales staff only**
  - **No customer signup, no customer login, no public accounts**
  - Roles: `admin`, `sales_agent`, `moderator` (staff roles only)
- [ ] `/admin/login` — staff login page (not on public nav)
- [ ] `/forgot-password` + `/reset-password` — email reset flow for staff
- [ ] `<AdminAuthGuard>` wrapper for all `/admin/*` routes
- [ ] Session provider in root layout
- [ ] Password hashing (bcrypt/argon2)
- [ ] Admin accounts created by super admin only (no self-signup)

### How customer info is captured (no login needed)
- [ ] When a visitor submits the booking inquiry form (Phase 5), their name + email + phone are saved to the `Customer` table (or matched to an existing customer by email)
- [ ] Admin can view all customers in `/admin/customers` — built from form submissions, not signups
- [ ] A customer's booking history, communication timeline, and payment records are all linked by their email address
- [ ] If the same email submits multiple bookings, they're grouped under one customer record

**Deliverable:** Staff can log in to admin. Customers are tracked by email from form submissions — no accounts, no login, no friction.

---

## Phase 7 — Payments & Checkout
**Goal:** Real money flow (reference site has none).

### 7a. Pricing setup
- [ ] Each `Educator` has `basePrice` + `currency`
- [ ] Each `ServiceType` can have a price modifier (multiplier or fixed add-on)
- [ ] Admin can set custom prices per educator × service combination
- [ ] Tax config per region (settings)

### 7b. Checkout flow
- [ ] From a lead (stage: `quoted`), admin sends a payment link → Stripe Checkout
- [ ] OR direct checkout from an educator profile: pick service → see price → "Book & Pay"
- [ ] Stripe Checkout session creation (server action)
- [ ] Stripe Webhook endpoint `/api/stripe/webhook`:
  - `checkout.session.completed` → create `Payment` (status: paid), update `Booking` (status: confirmed)
  - `payment_intent.payment_failed` → mark payment failed, notify admin
  - `charge.refunded` → update payment status, trigger refund emails
- [ ] Order confirmation page after redirect
- [ ] Deposit + balance support (two Stripe PaymentIntents) — optional for v1

### 7c. Invoices & receipts
- [ ] Auto-generate invoice PDF on booking confirmation (using `react-pdf` or a PDF service)
- [ ] Auto-generate receipt PDF on payment success
- [ ] Store PDFs in S3/R2, save URL on `Invoice` record
- [ ] Email PDFs as attachments (Email #4, #5)
- [ ] Downloadable from customer dashboard

### 7d. Refunds
- [ ] Admin can initiate refund → Stripe API refund → webhook updates record → emails fire
- [ ] Refund policy enforced (time-based rules from `/refund` page)

**Deliverable:** A learner can book + pay online; admin sees the transaction; invoices/receipts auto-generated and emailed.

---

## Phase 8 — Search, Filtering & Performance
**Goal:** Fast, scalable directory (reference site is basic).

- [ ] Server-side search (name, category, service type) via Prisma `where` + full-text
- [ ] Faceted filters: category, service type, price range, availability, rating
- [ ] URL-based filter state (shareable links: `/celebrities?category=actors&service=meet-greet`)
- [ ] Pagination via cursor (for scale)
- [ ] ISR / static generation for educator profile pages (`generateStaticParams`)
- [ ] Image optimization (`next/image`) for educator photos
- [ ] Loading skeletons + Suspense boundaries
- [ ] Sitemap.xml auto-generated (`/sitemap.ts`)
- [ ] `robots.txt`
- [ ] SEO metadata per page (title, description, OG, Twitter cards, canonical)
- [ ] Structured data (JSON-LD) for educator profiles (Person schema)

**Deliverable:** Directory loads fast, filters work, SEO is solid.

---

## Phase 9 — Admin Dashboard
**Goal:** The purpose-built admin (reference site uses default WP admin — we build better). See PDF §19.

### 9a. Admin shell
- [ ] `/admin` layout with sidebar nav (Dashboard, Leads, Bookings, Educators, Categories, Services, Customers, Payments, Invoices, Emails, Follow-up, Reviews, Comments, Pages, Media, Promotions, Users, Settings, Audit)
- [ ] Admin auth guard (role: admin or sales_agent)
- [ ] Global search across all entities
- [ ] Dark/light mode

### 9b. Dashboard (`/admin`)
- [ ] KPI cards: leads today, bookings this week, revenue MTD, pending follow-ups, email delivery rate
- [ ] Charts: leads over time, conversion funnel (new→contacted→quoted→won), revenue trend
- [ ] Recent activity feed (latest leads, bookings, emails)
- [ ] Overdue follow-ups alert

### 9c. Leads module (`/admin/leads`) — THE HEART
- [ ] Kanban board view (columns: new, contacted, quoted, negotiating, won, lost)
- [ ] List view with filters (stage, assignedTo, date, source)
- [ ] Lead detail page:
  - All form data
  - Requested educator + service type
  - Lifecycle stage (changeable with drag or dropdown)
  - Timeline of every event (emails, calls, notes, status changes, WhatsApp, chat)
  - Assigned staff member
  - SLA timers (time since last contact, next follow-up due, overdue flag in red)
  - Quoted amount, won amount
  - "Send quote" button → generates invoice + payment link
  - "Add note" / "Log call" / "Send email" / "Send WhatsApp" actions
  - "Convert to booking" action (when won)
- [ ] Bulk actions: assign, change stage, export CSV
- [ ] Lead assignment rules (round-robin or manual)

### 9d. Educators module (`/admin/educators`)
- [ ] CRUD: create, edit, archive, restore
- [ ] Rich-text bio editor
- [ ] Photo upload (drag-drop, multiple)
- [ ] Category multi-select
- [ ] Pricing per service type
- [ ] Availability calendar editor
- [ ] Status toggle (published / draft / archived)
- [ ] Featured flag, sort order
- [ ] Linked user account (for self-managed educators)

### 9e. Categories module (`/admin/categories`)
- [ ] Tree view (parent/child)
- [ ] CRUD with slug auto-generation
- [ ] Type assignment (talent_type, subject, level)
- [ ] Reorder

### 9f. Services module (`/admin/services`)
- [ ] CRUD service types
- [ ] Per-service description (rich text)
- [ ] Form config (which fields to show)
- [ ] Pricing modifiers
- [ ] Sort order

### 9g. Bookings module (`/admin/bookings`)
- [ ] List with filters (status, date, educator, customer)
- [ ] Booking detail: linked lead, educator, customer, payment, invoice, messages
- [ ] Status management (confirmed, completed, cancelled, no-show)
- [ ] Reschedule / cancel actions

### 9h. Customers module (`/admin/customers`)
- [ ] List with search (built from booking form submissions, not signups)
- [ ] Customer detail: profile, booking history, payment history, communication timeline
- [ ] Customers matched by email — no accounts, no login
- [ ] Merge duplicates (optional)

### 9i. Payments module (`/admin/payments`)
- [ ] Transaction list (status, gateway, amount, date)
- [ ] Payment detail with gateway reference
- [ ] Reconciliation view (match gateway reports)
- [ ] Refund initiation

### 9j. Invoices module (`/admin/invoices`)
- [ ] List (status: draft, issued, paid, overdue, void)
- [ ] Generate / regenerate PDF
- [ ] Send invoice (email)
- [ ] Mark as paid (manual, for offline payments)

### 9k. Pages / CMS module (`/admin/pages`)
- [ ] Edit About, Promotion, Book a Celebrity, legal pages
- [ ] Rich-text editor (TipTap or similar)
- [ ] Slug management
- [ ] Publish / draft

### 9l. Media module (`/admin/media`)
- [ ] Upload, browse, delete images
- [ ] Folders / tags
- [ ] Used-in indicator (which pages/profiles use this image)

### 9m. Promotions module (`/admin/promotions`)
- [ ] Create discount codes (% or fixed)
- [ ] Schedule banners / popups
- [ ] Usage tracking (redemptions, revenue impact)

### 9n. Users & Roles module (`/admin/users`)
- [ ] CRUD internal staff users (admin, sales_agent, moderator — **no customer accounts**)
- [ ] Role assignment
- [ ] Deactivate / reactivate
- [ ] Password reset trigger

### 9o. Settings (`/admin/settings`)
- [ ] Site name, logo, contact info, business hours
- [ ] Payment gateway keys (Stripe)
- [ ] Email provider keys (Resend)
- [ ] WhatsApp API config
- [ ] Tax config
- [ ] Legal page content
- [ ] Follow-up rule config (see Phase 10)

### 9p. Audit Log (`/admin/audit`)
- [ ] Filterable log of every admin action (who, what, when, entity, before/after)
- [ ] Export

**Deliverable:** Admin can manage every entity; leads flow through lifecycle with full visibility.

---

## Phase 10 — Email System & Follow-Up Automation
**Goal:** Trackable, automated, multi-channel follow-up (reference site does this manually). See PDF §18.

### 10a. Email infrastructure
- [ ] Configure Resend (or Postmark) with domain verification
- [ ] Create React Email templates for all 12 email events:
  1. Inquiry received (auto-ack to customer)
  2. New lead notification (to admin/sales)
  3. New booking notification (to educator)
  4. Booking confirmation (to customer)
  5. Payment receipt (to customer, with PDF)
  6. Invoice issued (to customer, with PDF)
  7. Booking reminder (24h / 1h before, to customer + educator)
  8. Follow-up #1 (no response, to customer)
  9. Follow-up #2 (quote sent no reply, to customer)
  10. Post-event review request (to customer)
  11. Cancellation / refund confirmation (to all parties)
  12. Password reset (to user)
- [ ] Email sending service (`/lib/email/send.ts`) — logs every send to `EmailLog`

### 10b. Delivery tracking ("did the email go through?")
- [ ] Resend/Postmark webhook endpoint `/api/email/webhook`
- [ ] Handle events: `delivered`, `bounce`, `opened`, `clicked`, `complained`, `failed`
- [ ] Store each event in `EmailEvent` table
- [ ] Update `EmailLog.status` to latest event
- [ ] Surface status in admin lead timeline: ✅ delivered, 👁 opened, 🔗 clicked, ❌ bounced, ⚠ failed

### 10c. Follow-up automation rules
- [ ] `FollowUpRule` config: triggerStage, delay (hours), emailTemplate, active
- [ ] Default rules:
  - Lead `new` + 2h no admin action → escalation email to manager
  - Lead `contacted` + 24h no reply → follow-up email #1
  - Lead `contacted` + 3 days no reply → follow-up email #2
  - Lead `contacted` + 7 days no reply → mark `lost`
  - Lead `quoted` + 7 days → quote-expiry reminder
- [ ] Background worker (BullMQ / Inngest / Vercel Cron) checks rules hourly
- [ ] Every auto-follow-up logged in `LeadEvent` with email delivery status
- [ ] Admin can pause/edit rules per lead

### 10d. Email log viewer (`/admin/emails`)
- [ ] List all emails sent (filter by status, template, recipient, date)
- [ ] Email detail: full content, delivery events timeline, linked lead/booking
- [ ] Resend failed emails button
- [ ] Delivery rate dashboard widget

**Deliverable:** Every email is tracked from send → delivery → open → click (or bounce); follow-ups happen automatically; admin sees it all.

---

## Phase 11 — Multi-Channel Follow-Up (WhatsApp + External Live Chat)
**Goal:** Follow up via the channel the client actually responds on. Live chat is an external embedded system, not built from scratch.

### 11a. WhatsApp Business API integration
- [ ] Connect via Twilio / 360dialog / MessageBird
- [ ] `/api/whatsapp/webhook` — receive inbound messages
- [ ] Send message service (`/lib/whatsapp/send.ts`) — logs to `LeadEvent`
- [ ] WhatsApp templates (pre-approved): booking confirmation, reminder, follow-up
- [ ] Auto-send WhatsApp on lead creation if phone is WhatsApp-enabled
- [ ] WhatsApp follow-up rules (alongside email rules)
- [ ] Admin can send manual WhatsApp from lead detail page
- [ ] Inbound messages appear in lead timeline + create a `LeadEvent`

### 11b. Live chat widget (external system — embed only)
- [ ] Choose a third-party live chat provider (Tawk.to free, Intercom, Chatwoot, Crisp, etc.)
- [ ] Embed their widget script in the site layout (`<head>` or before `</body>`)
- [ ] Configure the widget: branding colors, welcome message, offline form
- [ ] Offline form submissions should be routed to create a `Lead` in our system (via webhook or manual entry)
- [ ] **We do NOT build the chat backend** — the provider handles message storage, agent inbox, and UI
- [ ] If the provider has a webhook/API, optionally sync chat transcripts to our `LeadEvent` timeline
- [ ] No in-app messaging build (customers have no accounts, so no in-app chat between users)

### 11c. Unified inbox (`/admin/inbox`)
- [ ] Single view: all conversations across email, WhatsApp, and (optionally) live chat via provider API
- [ ] Filter by channel, lead, status
- [ ] Reply from inbox (auto-routes to correct channel — email or WhatsApp)
- [ ] Assign conversations to staff
- [ ] SLA timers per conversation
- [ ] Note: live chat replies happen in the provider's own dashboard; our inbox shows email + WhatsApp natively, and links to the chat provider for chat threads

**Deliverable:** Staff follow up via email and WhatsApp from our admin. Live chat runs on an external embedded widget. All channels visible in one inbox view.

---

## Phase 12 — Reviews & Comments
**Goal:** Social proof (mirrors reference site §13–14, but verified-only).

### 12a. Reviews
- [ ] After a completed booking → auto-send review request email (Phase 10, Email #10)
- [ ] `/review/[token]` — one-time-use review form (rating 1–5, body)
- [ ] Only customers with a completed booking can review that educator
- [ ] Reviews default to `pending` → admin approves in `/admin/reviews`
- [ ] Approved reviews show on educator profile + sidebar widget
- [ ] Average rating calculated and displayed
- [ ] Reject / edit / respond (educator reply) features

### 12b. Comments (public Q&A on profiles)
- [ ] "Leave a Reply" form on educator profiles (Comment, Name*, Email*, Website)
- [ ] Comments default to `pending` → admin moderates in `/admin/comments`
- [ ] Threaded replies (parent_id)
- [ ] Spam protection (Akismet or rate-limit + Turnstile)
- [ ] Auto-approve for previously-approved emails (optional)

**Deliverable:** Verified reviews on profiles; moderated public comments.

---

## Phase 13 — Educator Management (Admin-Managed, No Self-Service Portal)
**Goal:** Educators/celebrities are managed by admin. No educator login (admin-only auth model).

- [ ] All educator management happens in `/admin/educators` (Phase 9d)
- [ ] Admin sets: bio, photo, pricing, availability, categories, status
- [ ] Admin can upload availability calendars on behalf of celebrities
- [ ] Admin can respond to reviews on behalf of celebrities
- [ ] If a celebrity later needs self-service access, add an optional `educator` role to AdminUser in a future phase
- [ ] Celebrity contact info (agent, manager, phone, email) stored in admin-only fields
- [ ] Booking notifications to celebrities sent by admin via email/WhatsApp (Phase 10/11)

**Deliverable:** Admin fully manages celebrity profiles, availability, and communications. No celebrity login needed.

---

## Phase 14 — Polish, Notifications & Extras
**Goal:** Production-ready feel.

- [ ] In-app notification bell (bookings, messages, lead assignments)
- [ ] Push notifications (optional — web push via OneSignal)
- [ ] Toast notifications for all actions
- [ ] Loading states, empty states, error boundaries everywhere
- [ ] 404 / 500 custom pages
- [ ] Accessibility audit (keyboard nav, ARIA, color contrast)
- [ ] Performance audit (Lighthouse, Core Web Vitals)
- [ ] Rate limiting on all forms + API routes
- [ ] CSRF protection
- [ ] Security headers (next.config.js)
- [ ] Analytics (PostHog or Plausible)
- [ ] Error tracking (Sentry)
- [ ] AI chatbot for off-hours FAQ (optional)
- [ ] Video session integration (Zoom / Google Meet auto-link on booking)
- [ ] Multi-currency + i18n (optional)
- [ ] Mobile app (React Native, optional — Phase 16)

**Deliverable:** Feels like a real product; secure; monitored; accessible.

---

## Phase 15 — Testing, CI/CD & Launch
**Goal:** Ship with confidence.

- [ ] Unit tests (Vitest) for: validation schemas, email templates, payment logic, follow-up rules
- [ ] Integration tests for: lead submission, checkout flow, webhook handlers
- [ ] E2E tests (Playwright): browse → profile → book → pay → confirmation
- [ ] Admin E2E: lead lifecycle new → won
- [ ] Stripe webhook testing (local CLI + production)
- [ ] Email webhook testing (Resend test events)
- [ ] Pre-commit hooks (lint, typecheck, format)
- [ ] GitHub Actions CI: lint → typecheck → test → build
- [ ] Preview deploys per PR (Vercel)
- [ ] Production deploy on merge to main
- [ ] Database backup strategy (Neon/Supabase automated)
- [ ] Runbook: what to do if Stripe webhook fails, email provider down, etc.
- [ ] Soft launch → gather feedback → iterate
- [ ] Hard launch

**Deliverable:** Live, tested, monitored, documented product.

---

## Phase 16 — Future / Optional
- [ ] Mobile apps (React Native — learner + educator)
- [ ] AI matching (recommend educator based on needs)
- [ ] Affiliate / referral program
- [ ] Gift cards
- [ ] Group bookings with split payments
- [ ] Waitlist for sold-out sessions
- [ ] Loyalty / rewards program
- [ ] White-label for other agencies
- [ ] Marketplace mode (anyone can apply to be an educator)
- [ ] Advanced analytics / data warehouse
- [ ] API for third-party integrations

---

## Quick Reference — Phase Summary

| Phase | Name | Key Deliverable | Depends on |
|-------|------|-----------------|------------|
| 0 | Foundation | Running app + DB + deploy | — |
| 1 | Data Models | All tables + seed | 0 |
| 2 | Layout & Nav | Shared chrome | 0 |
| 3 | Directory & Profiles | Browseable celebrities | 1, 2 |
| 4 | Static Pages | About, Services, Promotion, Book, Legal | 2 |
| 5 | Booking Form & Leads | Form creates leads + emails | 1, 4 |
| 6 | Admin Auth | Staff-only login (no customer accounts) | 1 |
| 7 | Payments | Stripe checkout + invoices | 5, 6 |
| 8 | Search & Performance | Fast filtered directory + SEO | 3 |
| 9 | Admin Dashboard | Full admin (leads, bookings, CRUD) | 1, 5, 6, 7 |
| 10 | Email & Follow-Up | Trackable email + automation | 5, 9 |
| 11 | Multi-Channel | WhatsApp + live chat + in-app | 10 |
| 12 | Reviews & Comments | Social proof | 3, 6 |
| 13 | Educator Mgmt | Admin-managed celebrity profiles | 9 |
| 14 | Polish | Notifications, a11y, security | all |
| 15 | Testing & Launch | CI/CD + E2E + ship | all |
| 16 | Future | Mobile, AI, marketplace | 15 |

---

## Quick Reference — What Maps to the Reference Site

| Reference site section | Built in phase(s) |
|------------------------|-------------------|
| Celebrity directory (homepage) | Phase 3a |
| Celebrity profile page | Phase 3b |
| About page | Phase 4a |
| Celebrity Services hub | Phase 4b |
| 9 service sub-pages | Phase 4c |
| Promotion page | Phase 4d |
| Book a Celebrity page | Phase 4e |
| Booking inquiry form | Phase 5 |
| Categories / taxonomy | Phase 1, 3a |
| Testimonials widget | Phase 12a |
| Comments on profiles | Phase 12b |
| Disclaimer block | Phase 2 |
| Contact (email/phone) | Phase 4f |
| (no payment on reference) | Phase 7 ← we add this |
| (no admin visible on reference) | Phase 9 ← we build this |
| (manual email on reference) | Phase 10 ← we automate this |
| (no chat on reference) | Phase 11 ← we add this |

---

## Quick Reference — Payment Models (choose per service type)

| Model | Phase | Use when |
|-------|-------|----------|
| Instant checkout | 7 | Fixed-price sessions |
| Inquiry → invoice → pay link | 5 + 7 + 9c | Custom/B2B quotes |
| Deposit + balance | 7 (extended) | Expensive packages |
| Escrow (hold & release) | 7 (extended) | Marketplace trust |
| Subscription | 7 (extended) | Ongoing access |

Configure per `ServiceType` in admin settings (Phase 9o).

---

## Quick Reference — Follow-Up Channels

| Channel | Phase | Best for |
|---------|-------|----------|
| Email | 10 | Formal records, invoices, receipts |
| WhatsApp | 11a | Quick follow-up, reminders, high response |
| Live chat | 11b | On-site browsing questions (external widget) |
| In-app messaging | — | *(removed — no customer accounts)* |
| Unified inbox | 11d | Staff manages all channels in one place |

---

*Reference: MyCelebrityBookings-Site-Analysis.pdf (in this repo) for full section-by-section analysis, admin spec, data models, and payment/email flow details.*
