"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { User, CreditCard, Bell, Shield } from "lucide-react"

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
]

export default function AccountPage() {
  const [active, setActive] = useState("profile")

  return (
    <div className="max-w-3xl mx-auto animate-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your profile and preferences</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              active === tab.id ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {active === "profile" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-xl font-bold text-violet-700">
              SC
            </div>
            <div>
              <Button variant="outline" size="sm">Change photo</Button>
              <p className="text-xs text-gray-400 mt-1">JPG or PNG, max 5MB</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First name" defaultValue="Sarah" />
            <Input label="Last name" defaultValue="Chen" />
          </div>
          <Input label="Email" defaultValue="sarah@example.com" type="email" />
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Bio</label>
            <textarea rows={3} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="Tell us a bit about yourself..." />
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save changes</Button>
          </div>
        </div>
      )}

      {active === "billing" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-sm font-semibold text-emerald-900">You have access to 3 products</p>
            <p className="text-xs text-emerald-600 mt-0.5">View your active subscriptions and purchases below.</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
            {[
              { name: "The Creator Blueprint", type: "One-time purchase", date: "Jan 15, 2024", amount: "$497" },
              { name: "Inner Circle Membership", type: "Monthly subscription", date: "Renews Apr 1, 2026", amount: "$97/mo" },
              { name: "Content Calendar Pack", type: "One-time purchase", date: "Mar 1, 2024", amount: "$27" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.type} · {p.date}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">{p.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(active === "notifications" || active === "security") && (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <p className="text-sm">{tabs.find((t) => t.id === active)?.label} settings coming soon</p>
        </div>
      )}
    </div>
  )
}
