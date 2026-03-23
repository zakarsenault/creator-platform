# CreatorOS

An all-in-one creator business platform — courses, memberships, email marketing, sales funnels, community, CRM, and analytics from a single dashboard.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** — auth, database, storage, RLS
- **Stripe** — payments, subscriptions, webhooks
- **Recharts** — analytics charts
- **Lucide React** — icons

## Features

| Area | What's built |
|------|-------------|
| Dashboard | Overview stats, revenue charts, recent orders, top offers |
| Products | Course, coaching, membership, download, community, bundle |
| Course Builder | Modules, lessons (video/text/audio/pdf/quiz), drip scheduling |
| Email Marketing | Broadcasts, sequences, templates |
| Funnels | Visual funnel builder with step conversion tracking |
| Community | Channels, posts, comments, likes, announcements |
| Contacts / CRM | Full contact table, tags, filters, segmentation |
| Sales | Orders table with status, revenue stats |
| Analytics | Revenue, funnel conversions, email perf, membership growth |
| Website | Pages list, domain management |
| Blog | Posts manager |
| Automations | Trigger-based workflow builder |
| Settings | Profile, workspace, billing, team |
| Auth | Login + multi-step signup with plan selection |
| Marketing Site | Homepage, features, pricing, testimonials |

## Project Structure

```
app/
  (auth)/         — login, signup
  (dashboard)/    — all dashboard routes
  (marketing)/    — public site layout
  page.tsx        — marketing homepage
  layout.tsx      — root layout

components/
  ui/             — badge, button, card, avatar, input, modal, stat-card, empty-state
  layout/         — sidebar, topbar
  dashboard/      — dashboard-specific components

lib/
  types.ts        — all TypeScript types
  utils.ts        — formatCurrency, formatDate, cn, etc.
  mock-data.ts    — realistic seed data
  supabase/       — client.ts, server.ts

supabase/
  schema.sql      — full Supabase schema with RLS
```

## Getting Started

```bash
# 1. Clone and install
git clone https://github.com/zakarsenault/creator-platform.git
cd creator-platform
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your Supabase and Stripe keys

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the marketing site.
Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the app.
Open [http://localhost:3000/login](http://localhost:3000/login) for auth.

## Database Setup

1. Create a new Supabase project
2. Run `supabase/schema.sql` in the SQL editor
3. Add your Supabase URL and anon key to `.env.local`

## Roadmap

- [ ] Supabase auth integration (replace mock)
- [ ] Stripe checkout + webhooks
- [ ] Drag-and-drop page/course builder
- [ ] Real email sending (Resend)
- [ ] Member-facing portal
- [ ] Mobile responsive polish
- [ ] Onboarding flow
