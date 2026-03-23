"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Plus, Zap, Mail, Tag, Users, ArrowRight, CircleCheck } from "lucide-react"

const automations = [
  {
    id: "a1",
    name: "Welcome new subscriber",
    trigger: "Contact subscribes",
    actions: ["Wait 0 days", "Send email: Welcome to the list!", "Add tag: subscriber"],
    status: "active",
    runs: 1840,
  },
  {
    id: "a2",
    name: "Purchase thank you",
    trigger: "Purchase completed",
    actions: ["Send email: Thank you for purchasing!", "Add tag: customer", "Grant product access"],
    status: "active",
    runs: 342,
  },
  {
    id: "a3",
    name: "Abandoned checkout follow-up",
    trigger: "Checkout abandoned (1h)",
    actions: ["Send email: You left something behind...", "Wait 24h", "Send email: Last chance offer"],
    status: "inactive",
    runs: 0,
  },
  {
    id: "a4",
    name: "Course completion celebration",
    trigger: "Course completed",
    actions: ["Send email: Congratulations!", "Add tag: course-graduate", "Unlock bonus content"],
    status: "active",
    runs: 87,
  },
]

export default function AutomationsPage() {
  return (
    <div className="space-y-5 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Automations</h2>
          <p className="text-sm text-gray-500 mt-0.5">Trigger-based workflows that run automatically</p>
        </div>
        <Button><Plus className="h-4 w-4" /> New automation</Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active automations", value: automations.filter((a) => a.status === "active").length.toString() },
          { label: "Total runs", value: automations.reduce((s, a) => s + a.runs, 0).toLocaleString() },
          { label: "Inactive", value: automations.filter((a) => a.status === "inactive").length.toString() },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {automations.map((auto) => (
          <div
            key={auto.id}
            className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl shrink-0", auto.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400")}>
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{auto.name}</p>
                  <p className="text-xs text-gray-400">{auto.runs.toLocaleString()} runs</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-medium", auto.status === "active" ? "text-emerald-600" : "text-gray-400")}>
                  {auto.status === "active" ? "Active" : "Inactive"}
                </span>
                <div className={cn("h-5 w-9 cursor-pointer rounded-full transition-colors relative", auto.status === "active" ? "bg-emerald-500" : "bg-gray-200")}>
                  <div className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform", auto.status === "active" ? "left-4" : "left-0.5")} />
                </div>
              </div>
            </div>

            {/* Flow visualization */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <div className="flex items-center gap-1 rounded-lg bg-violet-50 border border-violet-100 px-3 py-1.5 shrink-0">
                <Zap className="h-3 w-3 text-violet-600" />
                <span className="text-xs font-medium text-violet-700">{auto.trigger}</span>
              </div>
              {auto.actions.map((action, i) => (
                <div key={i} className="flex items-center gap-1 shrink-0">
                  <ArrowRight className="h-3 w-3 text-gray-300" />
                  <div className="flex items-center gap-1 rounded-lg bg-gray-50 border border-gray-100 px-2.5 py-1.5">
                    <CircleCheck className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-4 text-sm text-gray-400 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/20 transition-colors">
          <Plus className="h-4 w-4" /> Create new automation
        </button>
      </div>
    </div>
  )
}
