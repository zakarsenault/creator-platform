"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Sparkles, ArrowRight, Check } from "lucide-react"

const plans = [
  { id: "starter", name: "Starter", price: 49, features: ["3 products", "1,000 contacts", "Basic email", "Core analytics"] },
  { id: "growth", name: "Growth", price: 99, features: ["Unlimited products", "10,000 contacts", "Email automation", "Funnels + checkout", "Community"], popular: true },
  { id: "pro", name: "Pro", price: 199, features: ["Everything in Growth", "Unlimited contacts", "Custom domain", "White-label", "Priority support"] },
]

export default function SignupPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedPlan, setSelectedPlan] = useState("growth")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) { setStep((s) => (s + 1) as 1 | 2 | 3); return }
    setLoading(true)
    setTimeout(() => { window.location.href = "/dashboard" }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-gray-900">CreatorOS</span>
      </Link>

      {/* Steps */}
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              step > s ? "bg-violet-600 text-white" : step === s ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-400"
            }`}>
              {step > s ? <Check className="h-3.5 w-3.5" /> : s}
            </div>
            {s < 3 && <div className={`h-px w-8 transition-colors ${step > s ? "bg-violet-600" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm space-y-5">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Create your account</h1>
                <p className="text-sm text-gray-500 mt-1">Start building your creator business today.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First name" placeholder="Alex" required />
                <Input label="Last name" placeholder="Rivera" required />
              </div>
              <Input label="Email address" type="email" placeholder="you@example.com" required />
              <Input label="Password" type="password" placeholder="Min 8 characters" required hint="Use a strong password with letters, numbers, and symbols." />
              <Button type="submit" className="w-full">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-gray-400">
                By signing up you agree to our{" "}
                <Link href="#" className="text-violet-600 hover:underline">Terms</Link> and{" "}
                <Link href="#" className="text-violet-600 hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm space-y-5">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Set up your workspace</h1>
                <p className="text-sm text-gray-500 mt-1">This is your business home base.</p>
              </div>
              <Input label="Business name" placeholder="Alex Rivera" required />
              <Input label="Workspace URL" placeholder="alexrivera" hint="alexrivera.creatorplatform.io" required />
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">What do you primarily sell?</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Online courses", "Coaching", "Memberships", "Digital downloads"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 transition-colors text-left"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900">Choose your plan</h1>
                <p className="text-sm text-gray-500 mt-1">Start free for 14 days. No credit card required.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative rounded-2xl border p-5 text-left transition-all ${
                      selectedPlan === plan.id
                        ? "border-violet-500 bg-violet-50 shadow-md"
                        : "border-gray-100 bg-white hover:border-gray-200 shadow-sm"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-violet-600 px-3 py-0.5 text-xs font-semibold text-white">Most popular</span>
                      </div>
                    )}
                    <p className="font-bold text-gray-900">{plan.name}</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      ${plan.price}<span className="text-sm font-normal text-gray-400">/mo</span>
                    </p>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <Button type="submit" loading={loading} className="w-full" size="lg">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-gray-400">14-day free trial · Cancel anytime · No credit card needed</p>
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
