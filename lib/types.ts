export type UserRole = "super_admin" | "owner" | "member" | "staff"

export type ProductType =
  | "course"
  | "coaching"
  | "membership"
  | "download"
  | "community"
  | "bundle"

export type ProductStatus = "draft" | "published" | "archived"

export type PricingType = "free" | "one_time" | "subscription" | "payment_plan"

export type OrderStatus = "pending" | "completed" | "refunded" | "failed"

export type EmailStatus = "draft" | "scheduled" | "sent"

export type FunnelStepType = "optin" | "sales" | "checkout" | "upsell" | "downsell" | "thankyou" | "webinar"

// ─── User & Auth ──────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: UserRole
  workspace_id: string
  created_at: string
}

export interface Workspace {
  id: string
  name: string
  slug: string
  logo_url?: string
  owner_id: string
  custom_domain?: string
  created_at: string
}

// ─── Products ─────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  workspace_id: string
  type: ProductType
  title: string
  subtitle?: string
  description?: string
  cover_image?: string
  status: ProductStatus
  pricing_type: PricingType
  price?: number
  slug: string
  tags?: string[]
  created_at: string
  updated_at: string
  // stats
  members_count?: number
  revenue?: number
}

export interface Offer {
  id: string
  workspace_id: string
  product_id: string
  name: string
  pricing_type: PricingType
  price: number
  billing_interval?: "month" | "year"
  trial_days?: number
  coupon_id?: string
  order_bump_id?: string
  upsell_id?: string
  created_at: string
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export interface Course {
  id: string
  product_id: string
  workspace_id: string
  title: string
  description?: string
  cover_image?: string
  modules: Module[]
}

export interface Module {
  id: string
  course_id: string
  title: string
  position: number
  lessons: Lesson[]
}

export type LessonType = "video" | "text" | "audio" | "pdf" | "quiz"

export interface Lesson {
  id: string
  module_id: string
  title: string
  type: LessonType
  content?: string
  video_url?: string
  duration_seconds?: number
  position: number
  is_locked: boolean
  drip_days?: number
  created_at: string
}

// ─── Community ────────────────────────────────────────────────────────────────

export interface CommunityPost {
  id: string
  workspace_id: string
  author_id: string
  author: User
  channel: string
  title?: string
  body: string
  is_pinned: boolean
  is_announcement: boolean
  likes_count: number
  comments_count: number
  created_at: string
}

export interface Comment {
  id: string
  post_id: string
  author_id: string
  author: User
  body: string
  created_at: string
}

// ─── Email ────────────────────────────────────────────────────────────────────

export interface EmailCampaign {
  id: string
  workspace_id: string
  subject: string
  preview_text?: string
  body: string
  status: EmailStatus
  sent_at?: string
  recipients_count?: number
  open_rate?: number
  click_rate?: number
  created_at: string
}

export interface EmailSequence {
  id: string
  workspace_id: string
  name: string
  trigger: string
  emails: SequenceEmail[]
  is_active: boolean
  created_at: string
}

export interface SequenceEmail {
  id: string
  sequence_id: string
  subject: string
  body: string
  delay_days: number
  position: number
}

// ─── Funnels ──────────────────────────────────────────────────────────────────

export interface Funnel {
  id: string
  workspace_id: string
  name: string
  description?: string
  steps: FunnelStep[]
  views: number
  conversions: number
  created_at: string
}

export interface FunnelStep {
  id: string
  funnel_id: string
  name: string
  type: FunnelStepType
  page_id?: string
  position: number
  views?: number
  conversions?: number
}

// ─── CRM / Contacts ───────────────────────────────────────────────────────────

export interface Contact {
  id: string
  workspace_id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  tags: string[]
  lead_source?: string
  total_spent: number
  orders_count: number
  created_at: string
  last_active?: string
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export interface Order {
  id: string
  workspace_id: string
  contact_id: string
  contact: Contact
  offer_id: string
  offer_name: string
  amount: number
  status: OrderStatus
  stripe_payment_id?: string
  created_at: string
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface AnalyticsOverview {
  revenue: number
  revenue_change: number
  orders: number
  orders_change: number
  contacts: number
  contacts_change: number
  active_members: number
  active_members_change: number
}

export interface RevenueDataPoint {
  date: string
  revenue: number
  orders: number
}

export interface TopOffer {
  id: string
  name: string
  revenue: number
  orders: number
  conversion_rate: number
}

// ─── Website / Pages ──────────────────────────────────────────────────────────

export interface Page {
  id: string
  workspace_id: string
  title: string
  slug: string
  status: "draft" | "published"
  template?: string
  seo_title?: string
  seo_description?: string
  views?: number
  created_at: string
  updated_at: string
}
