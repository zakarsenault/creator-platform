"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockFunnels } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { FunnelStepType } from "@/lib/types"
import {
  Plus,
  Workflow,
  ArrowRight,
  BarChart2,
  Eye,
  MousePointer,
  TrendingUp,
} from "lucide-react"

const stepTypeColors: Record<FunnelStepType, string> = {
  optin: "bg-blue-50 border-blue-200 text-blue-700",
  sales: "bg-violet-50 border-violet-200 text-violet-700",
  checkout: "bg-emerald-50 border-emerald-200 text-emerald-700",
  upsell: "bg-amber-50 border-amber-200 text-amber-700",
  downsell: "bg-orange-50 border-orange-200 text-orange-700",
  thankyou: "bg-pink-50 border-pink-200 text-pink-700",
  webinar: "bg-cyan-50 border-cyan-200 text-cyan-700",
}

const stepTypeLabels: Record<FunnelStepType, string> = {
  optin: "Opt-in",
  sales: "Sales Page",
  checkout: "Checkout",
  upsell: "Upsell",
  downsell: "Downsell",
  thankyou: "Thank You",
  webinar: "Webinar",
}

export default function FunnelsPage() {
  const [expanded, setExpanded] = useState<string | null>("f1")

  return (
    <div className="space-y-5 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Funnels</h2>
          <p className="text-sm text-gray-500 mt-0.5">Build and track your conversion funnels</p>
        </div>
        <Button><Plus className="h-4 w-4" /> New Funnel</Button>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total funnel views", value: mockFunnels.reduce((s, f) => s + f.views, 0).toLocaleString(), icon: Eye },
          { label: "Total conversions", value: mockFunnels.reduce((s, f) => s + f.conversions, 0).toLocaleString(), icon: MousePointer },
          { label: "Avg conversion rate", value: `${((mockFunnels.reduce((s, f) => s + f.conversions, 0) / mockFunnels.reduce((s, f) => s + f.views, 0)) * 100).toFixed(1)}%`, icon: TrendingUp },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 shrink-0">
              <s.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-lg font-bold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Funnels list */}
      {mockFunnels.map((funnel) => (
        <div key={funnel.id} className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          {/* Funnel header */}
          <button
            onClick={() => setExpanded(expanded === funnel.id ? null : funnel.id)}
            className="flex w-full items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Workflow className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">{funnel.name}</p>
                <p className="text-xs text-gray-400">{funnel.steps.length} steps · {funnel.views.toLocaleString()} views</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-right">
                <p className="text-xs text-gray-400">Conversions</p>
                <p className="text-sm font-bold text-emerald-600">{funnel.conversions.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Conv. rate</p>
                <p className="text-sm font-bold text-gray-800">{((funnel.conversions / funnel.views) * 100).toFixed(1)}%</p>
              </div>
              <Button variant="outline" size="sm"><BarChart2 className="h-3.5 w-3.5" /> Stats</Button>
            </div>
          </button>

          {/* Funnel steps visual */}
          {expanded === funnel.id && (
            <div className="border-t border-gray-50 px-5 py-5 overflow-x-auto">
              <div className="flex items-center gap-1 min-w-max">
                {funnel.steps.map((step, i) => (
                  <div key={step.id} className="flex items-center gap-1">
                    <div className="w-36 rounded-xl border p-3 relative group cursor-pointer hover:shadow-md transition-shadow">
                      <div className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium mb-2", stepTypeColors[step.type])}>
                        {stepTypeLabels[step.type]}
                      </div>
                      <p className="text-xs font-semibold text-gray-800 leading-snug">{step.name}</p>
                      {step.views !== undefined && (
                        <div className="mt-2 space-y-0.5">
                          <div className="flex justify-between text-[10px] text-gray-400">
                            <span>{step.views?.toLocaleString()} views</span>
                          </div>
                          {step.conversions !== undefined && (
                            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-violet-400 rounded-full"
                                style={{ width: `${(step.conversions / (step.views || 1)) * 100}%` }}
                              />
                            </div>
                          )}
                          {step.conversions !== undefined && (
                            <div className="text-[10px] text-emerald-600 font-medium">
                              {step.conversions?.toLocaleString()} → {((step.conversions / (step.views || 1)) * 100).toFixed(0)}%
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {i < funnel.steps.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-300 shrink-0" />
                    )}
                  </div>
                ))}
                <button className="ml-2 flex h-10 w-10 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-violet-300 hover:text-violet-500 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Create funnel */}
      <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-5 text-sm text-gray-400 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/20 transition-colors">
        <Plus className="h-4 w-4" /> Create new funnel
      </button>
    </div>
  )
}
