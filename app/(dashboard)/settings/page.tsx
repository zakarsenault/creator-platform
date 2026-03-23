"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { User, Globe, CreditCard, Bell, Shield, Users, Palette } from "lucide-react"

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Globe },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "team", label: "Team", icon: Users },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="animate-in flex gap-6">
      {/* Sidebar tabs */}
      <aside className="w-48 shrink-0">
        <nav className="space-y-0.5">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                activeTab === tab.id
                  ? "bg-violet-50 text-violet-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <tab.icon className="h-4 w-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 max-w-2xl">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-gray-900">Profile</h3>
              <p className="text-sm text-gray-500 mt-0.5">Manage your personal information</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-pink-400 text-xl font-bold text-white">
                  AR
                </div>
                <div>
                  <Button variant="outline" size="sm">Change photo</Button>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First name" defaultValue="Alex" />
                <Input label="Last name" defaultValue="Rivera" />
              </div>
              <Input label="Email address" defaultValue="alex@example.com" type="email" />
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  defaultValue="Creator, coach, and educator helping people build businesses they love."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
              </div>
              <div className="flex justify-end">
                <Button size="sm">Save changes</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "workspace" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-gray-900">Workspace</h3>
              <p className="text-sm text-gray-500 mt-0.5">Your business workspace settings</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
              <Input label="Business name" defaultValue="Alex Rivera" />
              <Input label="Workspace URL" defaultValue="alexrivera" hint="alexrivera.creatorplatform.io" />
              <Input label="Custom domain" defaultValue="alexrivera.com" />
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Business description</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  defaultValue="Helping creators build profitable online businesses."
                />
              </div>
              <div className="flex justify-end">
                <Button size="sm">Save changes</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-gray-900">Billing</h3>
              <p className="text-sm text-gray-500 mt-0.5">Manage your subscription and payment methods</p>
            </div>
            <div className="rounded-xl border border-violet-100 bg-violet-50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-violet-900">Growth Plan</p>
                  <p className="text-xs text-violet-600">$99/month · Next billing March 23, 2026</p>
                </div>
                <Button variant="outline" size="sm">Manage plan</Button>
              </div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-900 mb-3">Payment method</p>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                <div className="flex h-8 w-12 items-center justify-center rounded bg-white border border-gray-200 text-xs font-bold text-blue-600">VISA</div>
                <div>
                  <p className="text-sm text-gray-700">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-400">Expires 12/26</p>
                </div>
              </div>
              <button className="mt-3 text-xs text-violet-600 hover:underline">+ Add payment method</button>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-gray-900">Team</h3>
              <p className="text-sm text-gray-500 mt-0.5">Manage team members and permissions</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              {[
                { name: "Alex Rivera", email: "alex@example.com", role: "Owner", initials: "AR" },
                { name: "Jamie Lee", email: "jamie@example.com", role: "Editor", initials: "JL" },
              ].map((member) => (
                <div key={member.email} className="flex items-center gap-3 border-b border-gray-50 last:border-0 px-5 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">{member.initials}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.email}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{member.role}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm">Invite team member</Button>
          </div>
        )}

        {(activeTab === "notifications" || activeTab === "branding" || activeTab === "security") && (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <p className="text-sm">{settingsTabs.find((t) => t.id === activeTab)?.label} settings — coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
