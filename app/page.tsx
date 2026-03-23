import Link from "next/link"
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  Mail,
  BarChart3,
  Workflow,
  MessagesSquare,
  Check,
  Star,
  ChevronRight,
} from "lucide-react"

const features = [
  { icon: BookOpen, title: "Course & Product Builder", description: "Build beautiful online courses, coaching programs, memberships, and digital downloads — all in one place.", color: "bg-blue-50 text-blue-600" },
  { icon: Mail, title: "Email Marketing", description: "Send broadcasts, build automated sequences, and segment your audience to maximize every send.", color: "bg-violet-50 text-violet-600" },
  { icon: Workflow, title: "Sales Funnels", description: "Drag-and-drop funnel builder with opt-in pages, sales pages, checkouts, upsells, and more.", color: "bg-amber-50 text-amber-600" },
  { icon: MessagesSquare, title: "Community", description: "Build a private community with channels, announcements, member profiles, and moderation tools.", color: "bg-emerald-50 text-emerald-600" },
  { icon: Users, title: "CRM & Contacts", description: "Track every contact, their purchase history, tags, and engagement in one clean dashboard.", color: "bg-pink-50 text-pink-600" },
  { icon: BarChart3, title: "Analytics", description: "Deep insights into revenue, conversions, email performance, funnel stats, and membership health.", color: "bg-cyan-50 text-cyan-600" },
]

const plans = [
  { name: "Starter", price: 49, description: "Perfect for creators just getting started.", features: ["3 products", "1,000 contacts", "Email broadcasts", "Basic analytics", "1 funnel"] },
  { name: "Growth", price: 99, description: "Everything you need to scale.", features: ["Unlimited products", "10,000 contacts", "Email automation", "Unlimited funnels", "Community", "Course builder"], popular: true },
  { name: "Pro", price: 199, description: "For serious creators doing serious volume.", features: ["Everything in Growth", "Unlimited contacts", "Custom domain", "White-label portal", "Team seats (5)", "Priority support"] },
]

const testimonials = [
  { name: "Sarah Chen", role: "Business coach", avatar: "SC", quote: "I switched from Kajabi and I'm never going back. The UX is leagues ahead and I'm saving $200/month.", stat: "$12K/mo" },
  { name: "Marcus Williams", role: "Online educator", avatar: "MW", quote: "Launched my first course in a week. The course builder is intuitive and my students love the experience.", stat: "4,200 students" },
  { name: "Priya Patel", role: "Health coach", avatar: "PP", quote: "Finally, a platform that has everything — I cancelled 4 other tools the day I signed up.", stat: "642 members" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">CreatorOS</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="#features" className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="#testimonials" className="hover:text-gray-900 transition-colors">Stories</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors">Sign in</Link>
            <Link href="/signup" className="rounded-lg bg-violet-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors">Start free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-100/60 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700">
            <Sparkles className="h-3.5 w-3.5" /> The all-in-one creator platform
          </div>
          <h1 className="text-5xl font-black text-gray-900 leading-tight tracking-tight">
            Build, sell, and grow{" "}
            <span className="relative">
              <span className="relative z-10 text-violet-600">your entire business</span>
              <span className="absolute inset-x-0 bottom-1 h-3 -z-10 bg-violet-100 rounded" />
            </span>
            {" "}from one dashboard.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500 leading-relaxed">
            CreatorOS combines your course platform, email marketing, sales funnels, community, CRM, and analytics into one beautiful platform — at a fraction of the cost.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5">
              Start your free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              View live demo
            </Link>
          </div>
          <p className="mt-3 text-xs text-gray-400">14-day free trial · No credit card required · Cancel anytime</p>

          {/* Dashboard mockup */}
          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/80 overflow-hidden">
              <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="ml-3 h-5 flex-1 max-w-xs rounded-md bg-gray-200" />
              </div>
              <div className="flex h-[400px] bg-gray-50">
                <div className="w-44 bg-[#0f0f11] p-3 space-y-1 shrink-0">
                  {["Dashboard", "Products", "Courses", "Community", "Email", "Analytics"].map((item, i) => (
                    <div key={item} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${i === 0 ? "bg-white/10 text-white" : "text-zinc-500"}`}>
                      <div className="h-3 w-3 rounded bg-zinc-700" />
                      <span className="text-xs">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-5 space-y-4 overflow-hidden">
                  <div className="grid grid-cols-4 gap-3">
                    {[["Revenue", "$48,320"], ["Orders", "312"], ["Contacts", "2,847"], ["Members", "1,204"]].map(([label, val]) => (
                      <div key={label} className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                        <p className="text-[10px] text-gray-400">{label}</p>
                        <p className="text-sm font-bold text-gray-900 mt-0.5">{val}</p>
                        <p className="text-[10px] text-emerald-500 mt-0.5">+18% ↑</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm h-40">
                      <p className="text-xs font-medium text-gray-500 mb-3">Revenue Over Time</p>
                      <div className="flex items-end gap-1 h-24">
                        {[40,55,45,65,75,60,85,95,80,100,88,110].map((h, i) => (
                          <div key={i} className="flex-1 rounded-sm bg-violet-200" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm h-40">
                      <p className="text-xs font-medium text-gray-500 mb-2">Top Offers</p>
                      <div className="space-y-2.5">
                        {["Blueprint Course", "Inner Circle", "Templates"].map((name, i) => (
                          <div key={name} className="flex items-center gap-1.5">
                            <span className="text-[10px] text-gray-300 font-bold w-2">{i+1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] text-gray-600 truncate">{name}</p>
                              <div className="h-1 mt-0.5 rounded-full bg-violet-200" style={{ width: `${90 - i * 25}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-gray-100 py-7">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-5">Trusted by independent creators</p>
          <div className="flex items-center justify-center gap-12 opacity-30">
            {["Notion", "Stripe", "Figma", "Linear", "Vercel"].map((name) => (
              <span key={name} className="text-base font-black text-gray-700">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">One platform. Every tool.</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">Replace Kajabi, Teachable, Mailchimp, Circle, and ClickFunnels with one seamlessly connected platform.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {features.map((feature) => (
              <div key={feature.title} className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.color}`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">Creators love CreatorOS</h2>
            <div className="mt-3 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              <span className="ml-2 text-sm text-gray-400">4.9/5 from 800+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3 border-t border-gray-50 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 shrink-0">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.stat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">Simple, honest pricing</h2>
            <p className="mt-3 text-gray-500">No hidden fees. No transaction cuts. One flat price.</p>
          </div>
          <div className="grid grid-cols-3 gap-5 items-start">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl border p-7 ${plan.popular ? "border-violet-500 shadow-xl shadow-violet-100 bg-white scale-[1.03]" : "border-gray-100 bg-white shadow-sm"}`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-violet-600 px-4 py-1 text-xs font-bold text-white">Most Popular</span>
                  </div>
                )}
                <p className="font-bold text-gray-900 text-lg">{plan.name}</p>
                <p className="mt-1 text-sm text-gray-400">{plan.description}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-4xl font-black text-gray-900">${plan.price}</span>
                  <span className="mb-1.5 text-sm text-gray-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`mt-7 flex w-full items-center justify-center rounded-xl py-2.5 text-sm font-semibold transition-colors ${plan.popular ? "bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-200" : "border border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0f0f11] py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-2xl px-6 text-center text-white">
          <h2 className="text-3xl font-black">Ready to build your creator business?</h2>
          <p className="mt-4 text-zinc-400">Join thousands of creators using CreatorOS to grow.</p>
          <div className="mt-8">
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500 shadow-lg shadow-violet-900/50 transition-all hover:-translate-y-0.5">
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-zinc-600">No credit card · 14 days free · Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-800 text-sm">CreatorOS</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <Link href="#" className="hover:text-gray-700">Privacy</Link>
            <Link href="#" className="hover:text-gray-700">Terms</Link>
            <Link href="#" className="hover:text-gray-700">Support</Link>
            <span>© 2026 CreatorOS</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
