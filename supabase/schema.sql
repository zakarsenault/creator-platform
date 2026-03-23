-- ============================================================
-- CreatorOS — Supabase Schema
-- ============================================================
-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ──────────────────────────────────────────────────────────
-- WORKSPACES (multi-tenant root)
-- ──────────────────────────────────────────────────────────
create table workspaces (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  slug         text not null unique,
  logo_url     text,
  owner_id     uuid not null references auth.users(id) on delete cascade,
  custom_domain text,
  plan         text not null default 'starter', -- starter | growth | pro
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────
-- PROFILES (extends auth.users)
-- ──────────────────────────────────────────────────────────
create table profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text,
  avatar_url   text,
  bio          text,
  updated_at   timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────
-- WORKSPACE MEMBERS (team + roles)
-- ──────────────────────────────────────────────────────────
create type workspace_role as enum ('owner', 'admin', 'editor', 'viewer');

create table workspace_members (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  role         workspace_role not null default 'viewer',
  created_at   timestamptz not null default now(),
  unique(workspace_id, user_id)
);

-- ──────────────────────────────────────────────────────────
-- CONTACTS (CRM)
-- ──────────────────────────────────────────────────────────
create table contacts (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  email        text not null,
  full_name    text,
  avatar_url   text,
  phone        text,
  lead_source  text,
  tags         text[] not null default '{}',
  custom_fields jsonb not null default '{}',
  total_spent  numeric(10,2) not null default 0,
  orders_count int not null default 0,
  last_active  timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique(workspace_id, email)
);

create index contacts_workspace_id_idx on contacts(workspace_id);
create index contacts_email_idx on contacts(email);

-- ──────────────────────────────────────────────────────────
-- PRODUCTS
-- ──────────────────────────────────────────────────────────
create type product_type as enum ('course', 'coaching', 'membership', 'download', 'community', 'bundle');
create type product_status as enum ('draft', 'published', 'archived');

create table products (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  type         product_type not null,
  title        text not null,
  subtitle     text,
  description  text,
  cover_image  text,
  status       product_status not null default 'draft',
  slug         text not null,
  tags         text[] not null default '{}',
  metadata     jsonb not null default '{}',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique(workspace_id, slug)
);

create index products_workspace_id_idx on products(workspace_id);

-- ──────────────────────────────────────────────────────────
-- OFFERS (pricing variants for products)
-- ──────────────────────────────────────────────────────────
create type pricing_type as enum ('free', 'one_time', 'subscription', 'payment_plan');

create table offers (
  id               uuid primary key default gen_random_uuid(),
  workspace_id     uuid not null references workspaces(id) on delete cascade,
  product_id       uuid not null references products(id) on delete cascade,
  name             text not null,
  pricing_type     pricing_type not null,
  price            numeric(10,2) not null default 0,
  billing_interval text, -- month | year
  trial_days       int not null default 0,
  is_active        boolean not null default true,
  created_at       timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────
-- COURSES (modules + lessons)
-- ──────────────────────────────────────────────────────────
create table courses (
  id           uuid primary key default gen_random_uuid(),
  product_id   uuid not null references products(id) on delete cascade,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  title        text not null,
  description  text,
  cover_image  text,
  created_at   timestamptz not null default now()
);

create table modules (
  id        uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title     text not null,
  position  int not null default 0,
  created_at timestamptz not null default now()
);

create type lesson_type as enum ('video', 'text', 'audio', 'pdf', 'quiz');

create table lessons (
  id                uuid primary key default gen_random_uuid(),
  module_id         uuid not null references modules(id) on delete cascade,
  title             text not null,
  type              lesson_type not null default 'video',
  content           text,
  video_url         text,
  duration_seconds  int,
  position          int not null default 0,
  is_locked         boolean not null default false,
  is_free_preview   boolean not null default false,
  drip_days         int,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────
-- LESSON PROGRESS (per member)
-- ──────────────────────────────────────────────────────────
create table lesson_progress (
  id            uuid primary key default gen_random_uuid(),
  contact_id    uuid not null references contacts(id) on delete cascade,
  lesson_id     uuid not null references lessons(id) on delete cascade,
  completed     boolean not null default false,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  unique(contact_id, lesson_id)
);

-- ──────────────────────────────────────────────────────────
-- ORDERS
-- ──────────────────────────────────────────────────────────
create type order_status as enum ('pending', 'completed', 'refunded', 'failed');

create table orders (
  id                  uuid primary key default gen_random_uuid(),
  workspace_id        uuid not null references workspaces(id) on delete cascade,
  contact_id          uuid not null references contacts(id) on delete cascade,
  offer_id            uuid not null references offers(id),
  amount              numeric(10,2) not null,
  currency            text not null default 'usd',
  status              order_status not null default 'pending',
  stripe_payment_id   text,
  stripe_customer_id  text,
  metadata            jsonb not null default '{}',
  created_at          timestamptz not null default now()
);

create index orders_workspace_id_idx on orders(workspace_id);
create index orders_contact_id_idx on orders(contact_id);

-- ──────────────────────────────────────────────────────────
-- SUBSCRIPTIONS
-- ──────────────────────────────────────────────────────────
create type subscription_status as enum ('active', 'cancelled', 'past_due', 'trialing');

create table subscriptions (
  id                    uuid primary key default gen_random_uuid(),
  workspace_id          uuid not null references workspaces(id) on delete cascade,
  contact_id            uuid not null references contacts(id) on delete cascade,
  offer_id              uuid not null references offers(id),
  status                subscription_status not null default 'active',
  stripe_subscription_id text,
  current_period_start  timestamptz,
  current_period_end    timestamptz,
  cancelled_at          timestamptz,
  created_at            timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────
-- PRODUCT ACCESS (who can access what)
-- ──────────────────────────────────────────────────────────
create table product_access (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  contact_id   uuid not null references contacts(id) on delete cascade,
  product_id   uuid not null references products(id) on delete cascade,
  order_id     uuid references orders(id),
  granted_at   timestamptz not null default now(),
  revoked_at   timestamptz,
  unique(contact_id, product_id)
);

-- ──────────────────────────────────────────────────────────
-- COUPONS
-- ──────────────────────────────────────────────────────────
create type coupon_type as enum ('percent', 'fixed');

create table coupons (
  id             uuid primary key default gen_random_uuid(),
  workspace_id   uuid not null references workspaces(id) on delete cascade,
  code           text not null,
  type           coupon_type not null,
  amount         numeric(10,2) not null,
  max_uses       int,
  uses_count     int not null default 0,
  expires_at     timestamptz,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now(),
  unique(workspace_id, code)
);

-- ──────────────────────────────────────────────────────────
-- EMAIL CAMPAIGNS
-- ──────────────────────────────────────────────────────────
create type email_status as enum ('draft', 'scheduled', 'sent');

create table email_campaigns (
  id                uuid primary key default gen_random_uuid(),
  workspace_id      uuid not null references workspaces(id) on delete cascade,
  subject           text not null,
  preview_text      text,
  body              text not null default '',
  status            email_status not null default 'draft',
  scheduled_at      timestamptz,
  sent_at           timestamptz,
  recipients_count  int,
  opens_count       int,
  clicks_count      int,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────
-- EMAIL SEQUENCES + AUTOMATION
-- ──────────────────────────────────────────────────────────
create table email_sequences (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name         text not null,
  trigger      text not null,
  is_active    boolean not null default false,
  created_at   timestamptz not null default now()
);

create table sequence_emails (
  id          uuid primary key default gen_random_uuid(),
  sequence_id uuid not null references email_sequences(id) on delete cascade,
  subject     text not null,
  body        text not null default '',
  delay_days  int not null default 0,
  position    int not null default 0,
  created_at  timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────
-- FUNNELS
-- ──────────────────────────────────────────────────────────
create type funnel_step_type as enum ('optin', 'sales', 'checkout', 'upsell', 'downsell', 'thankyou', 'webinar');

create table funnels (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name         text not null,
  description  text,
  created_at   timestamptz not null default now()
);

create table funnel_steps (
  id           uuid primary key default gen_random_uuid(),
  funnel_id    uuid not null references funnels(id) on delete cascade,
  name         text not null,
  type         funnel_step_type not null,
  position     int not null default 0,
  page_id      uuid,
  views        int not null default 0,
  conversions  int not null default 0,
  created_at   timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────
-- PAGES (website / page builder)
-- ──────────────────────────────────────────────────────────
create table pages (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  title           text not null,
  slug            text not null,
  status          text not null default 'draft',
  content         jsonb not null default '{}',
  seo_title       text,
  seo_description text,
  views           int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique(workspace_id, slug)
);

-- ──────────────────────────────────────────────────────────
-- BLOG POSTS
-- ──────────────────────────────────────────────────────────
create table blog_posts (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  title        text not null,
  slug         text not null,
  body         text not null default '',
  cover_image  text,
  status       text not null default 'draft',
  tags         text[] not null default '{}',
  views        int not null default 0,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique(workspace_id, slug)
);

-- ──────────────────────────────────────────────────────────
-- COMMUNITY
-- ──────────────────────────────────────────────────────────
create table community_channels (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name         text not null,
  description  text,
  position     int not null default 0,
  created_at   timestamptz not null default now()
);

create table community_posts (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  channel_id      uuid references community_channels(id) on delete set null,
  author_id       uuid not null references auth.users(id) on delete cascade,
  title           text,
  body            text not null,
  is_pinned       boolean not null default false,
  is_announcement boolean not null default false,
  likes_count     int not null default 0,
  comments_count  int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table community_comments (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references community_posts(id) on delete cascade,
  author_id  uuid not null references auth.users(id) on delete cascade,
  body       text not null,
  created_at timestamptz not null default now()
);

create table community_likes (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references community_posts(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(post_id, user_id)
);

-- ──────────────────────────────────────────────────────────
-- ANALYTICS EVENTS
-- ──────────────────────────────────────────────────────────
create table analytics_events (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  contact_id   uuid references contacts(id) on delete set null,
  event_type   text not null, -- page_view | purchase | email_open | email_click | lesson_complete
  metadata     jsonb not null default '{}',
  created_at   timestamptz not null default now()
);

create index analytics_events_workspace_id_idx on analytics_events(workspace_id);
create index analytics_events_created_at_idx on analytics_events(created_at desc);

-- ──────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ──────────────────────────────────────────────────────────
alter table workspaces enable row level security;
alter table contacts enable row level security;
alter table products enable row level security;
alter table offers enable row level security;
alter table orders enable row level security;
alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table funnels enable row level security;
alter table pages enable row level security;
alter table blog_posts enable row level security;
alter table community_posts enable row level security;
alter table email_campaigns enable row level security;
alter table analytics_events enable row level security;

-- Workspace access via membership
create or replace function is_workspace_member(ws_id uuid)
returns boolean language sql security definer as $$
  select exists (
    select 1 from workspace_members
    where workspace_id = ws_id
    and user_id = auth.uid()
  );
$$;

-- RLS policies (workspace-scoped)
create policy "Members can view their workspace"
  on workspaces for select using (is_workspace_member(id));

create policy "Members can view contacts"
  on contacts for select using (is_workspace_member(workspace_id));

create policy "Members can manage contacts"
  on contacts for all using (is_workspace_member(workspace_id));

create policy "Members can view products"
  on products for select using (is_workspace_member(workspace_id));

create policy "Members can manage products"
  on products for all using (is_workspace_member(workspace_id));

create policy "Members can view orders"
  on orders for select using (is_workspace_member(workspace_id));

create policy "Members can view analytics"
  on analytics_events for select using (is_workspace_member(workspace_id));

-- ──────────────────────────────────────────────────────────
-- TRIGGERS: updated_at
-- ──────────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_workspaces_updated_at before update on workspaces
  for each row execute function set_updated_at();
create trigger set_contacts_updated_at before update on contacts
  for each row execute function set_updated_at();
create trigger set_products_updated_at before update on products
  for each row execute function set_updated_at();
create trigger set_lessons_updated_at before update on lessons
  for each row execute function set_updated_at();
create trigger set_pages_updated_at before update on pages
  for each row execute function set_updated_at();
create trigger set_blog_posts_updated_at before update on blog_posts
  for each row execute function set_updated_at();
